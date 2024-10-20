"""
    This module contais a class of a model with the necessary funtions to make the prediction
"""
import os
import uuid

import cv2
import boto3
import shutil
import numpy as np
from PIL import Image
from mtcnn import MTCNN
from keras.models import load_model
from keras.utils import load_img, img_to_array
from collections import Counter


class Model:
    def __init__(self):
        self.s3 = boto3.client('s3')
        self.model = self._get_model()
        self.face_detector = self._get_detector()
        self.names = self._get_names()

    def _get_names(self):
        self._check_dir('file_name')
        self._download_from_s3('bucket-seekinglost-modelos', 'person-names/names.txt', 'file_name/names.txt')
        with open('file_name/names.txt', 'r', encoding='latin-1') as file:
            lines = file.readlines()
            lines = [line.strip() for line in lines]
        return lines

    def _download_from_s3(self, bucket_name, object_name, file_name):
        self.s3.download_file(bucket_name, object_name, file_name)

    def _get_model(self):
        self._check_dir('trainer')
        self._download_from_s3(        
                                bucket_name = 'bucket-seekinglost-modelos',
                                object_name = 'trainer/trainer.h5',
                                file_name = 'trainer/trainer.h5'
        )
        
        return load_model('trainer/trainer.h5')
    
    def _get_detector(self):
        return MTCNN()

    def _extract_faces(self, image):
        """Detecta e extrai faces da imagem usando MTCNN"""
        pixels = np.asarray(image)
        results = self.face_detector.detect_faces(pixels)
        faces = []
        for result in results:
            x, y, width, height = result['box']
            x, y = abs(x), abs(y)
            face = pixels[y:y+height, x:x+width]
            face = Image.fromarray(face).resize((224, 224))
            face = np.asarray(face)
            faces.append(face)
        return faces

    def _get_boxes_from_image(self, image):
        """Detecta e extrai faces da imagem usando MTCNN"""
        pixels = np.asarray(image)
        results = self.face_detector.detect_faces(pixels)
        boxes = []
        for result in results:
            x, y, width, height = result['box']
            x, y = abs(x), abs(y)
            boxes.append((x, y, width, height))
        
        return boxes

    def _preprocess_image(self, image_path):
        """Aplica pré-processamento básico à imagem"""
        img = load_img(image_path, target_size=(224, 224))
        img_array = img_to_array(img)
        return img_array.astype('uint8')

    def _check_dir(self, directory):
        if not os.path.exists(directory):
            os.makedirs(directory)

    def _get_imgs(self, token):
        self._check_dir(f'temp_imgs/{token}')
        bucket_name = 'bucket-seekinglost-dados-treino-raw'
        objects = self.s3.list_objects_v2(Bucket=bucket_name, Prefix=token)

        for obj in objects['Contents']:
             if obj['Size'] > 0:
                key = obj['Key']
                file_name = os.path.join(f'temp_imgs/{token}', os.path.basename(key))
                self._download_from_s3(bucket_name, key, file_name)

    def _save_img(self, img, token):
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        _, buffer = cv2.imencode('.jpg', img_rgb)
        img_bytes = buffer.tobytes()
        
        self.s3.put_object(
            Bucket='bucket-seekinglost-results',
            Key=f'{token}/{uuid.uuid4()}',
            Body=img_bytes,
            ContentType='image/jpeg'
        )
        
    def _delete_s3_directory(self, bucket_name, prefix):
        objects = self.s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
        if 'Contents' in objects:
            delete_keys = {'Objects': [{'Key': obj['Key']} for obj in objects['Contents']]}
            self.s3.delete_objects(Bucket=bucket_name, Delete=delete_keys)

    def _augment_image(self, image):
        """Aumenta a imagem aplicando várias transformações"""
        augmented_images = [image]

        augmented_images.append(cv2.flip(image, 1))

        rows, cols = image.shape[:2]
        M = cv2.getRotationMatrix2D((cols/2, rows/2), 10, 1)
        augmented_images.append(cv2.warpAffine(image, M, (cols, rows)))

        M = cv2.getRotationMatrix2D((cols/2, rows/2), -10, 1)
        augmented_images.append(cv2.warpAffine(image, M, (cols, rows)))

        bright_image = cv2.convertScaleAbs(image, alpha=1.2, beta=30)
        augmented_images.append(bright_image)

        contrast_image = cv2.convertScaleAbs(image, alpha=1.5, beta=0)
        augmented_images.append(contrast_image)

        zoom_factor = 1.2
        zoomed_image = cv2.resize(image, None, fx=zoom_factor, fy=zoom_factor)
        center_x, center_y = zoomed_image.shape[1]//2, zoomed_image.shape[0]//2
        crop_x, crop_y = cols//2, rows//2
        zoomed_image = zoomed_image[center_y-crop_y:center_y+crop_y, center_x-crop_x:center_x+crop_x]
        augmented_images.append(zoomed_image)

        shift_x, shift_y = 20, 20
        M = np.float32([[1, 0, shift_x], [0, 1, shift_y]])
        shifted_image = cv2.warpAffine(image, M, (cols, rows))
        augmented_images.append(shifted_image)

        blurred_image = cv2.GaussianBlur(image, (5, 5), 0)
        augmented_images.append(blurred_image)

        return augmented_images

    def predict(self, token):
        self._get_imgs(token)
        files = os.listdir(f'temp_imgs/{token}')
        result = []

        for file in files:
            image_original = cv2.imread(f'temp_imgs/{token}/{file}')
            image_original_rgb = cv2.cvtColor(image_original, cv2.COLOR_BGR2RGB)
            img = self._preprocess_image(f'temp_imgs/{token}/{file}')
            faces = self._extract_faces(img)
            boxes = self._get_boxes_from_image(image_original)

            if not faces:
                print(f"Not found face for {f'temp_imgs/{token}/{file}'}")
            else:
                all_predictions = []
                confidence_values = {} 

                for i, face in enumerate(faces):
                    augmented_faces = self._augment_image(face)
                    for j, aug_face in enumerate(augmented_faces):
                        face_batch = np.expand_dims(aug_face, axis=0)
                        predictions = self.model.predict(face_batch)
                        predicted_class_index = np.argmax(predictions)
                        confidence = predictions[0][predicted_class_index]
                        confidence_value = confidence * 100
                        all_predictions.append(predicted_class_index)
                        
                        if predicted_class_index not in confidence_values:
                            confidence_values[predicted_class_index] = []
                        confidence_values[predicted_class_index].append(confidence_value)

                prediction_counts = Counter(all_predictions)

                most_frequent_class = None
                most_frequent_count = 0

                for class_index, count in prediction_counts.items():
                    if count > most_frequent_count:
                        most_frequent_class = class_index
                        most_frequent_count = count

                if most_frequent_class is not None:
                    confidences = confidence_values[most_frequent_class] 
                    value_counts = Counter(confidences)

                    most_common_value, most_common_count = value_counts.most_common(1)[0]

                    if most_common_count <= 6:
                        predicted_class = "Desconhecido"
                    else:
                        predicted_class = self.names[most_frequent_class]
                else:
                    print("Not found predictions for {f'temp_imgs/{token}/{file}'}")

                if boxes:
                    for (x, y, width, height) in boxes:
                        cv2.rectangle(image_original_rgb, (x, y), (x+width, y+height), (0, 255, 0), 2)
                        cv2.putText(image_original_rgb, predicted_class, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
                else:
                    cv2.putText(image_original_rgb, predicted_class, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                
                self._save_img(image_original_rgb, token)

        shutil.rmtree(f'temp_imgs/{token}')
        return result