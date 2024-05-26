"""
    This module contais a class of a model with the necessary funtions to make the prediction
"""
import os
import cv2
import boto3
import shutil


class Model:
    def __init__(self):
        self.s3 = boto3.client('s3')
        self.model = self._get_model()
        self.face_detector = self._get_detector()
        self.names = self._get_names()

    def _get_names(self):
        self._check_dir('file_name')
        self._download_from_s3('seekinglost-modelos', 'person-names/names.txt', 'file_name/names.txt')
        with open('file_name/names.txt', 'r', encoding='latin-1') as file:
            lines = file.readlines()
            lines = [line.strip() for line in lines]
        return lines

    def _download_from_s3(self, bucket_name, object_name, file_name):
        self.s3.download_file(bucket_name, object_name, file_name)

    def _get_model(self):
        self._check_dir('trainer')
        self._download_from_s3(        
                                bucket_name = 'seekinglost-modelos',
                                object_name = 'trainer/trainer.yml',
                                file_name = 'trainer/trainer.yml'
        )
        
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        recognizer.read('trainer/trainer.yml')
        return recognizer
    
    def _get_detector(self):
        return cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

    def _detec_faces(self, img):
        return self.face_detector.detectMultiScale(img, scaleFactor=2.4, minNeighbors=5, minSize=(30, 30))

    def _check_dir(self, directory):
        if not os.path.exists(directory):
            os.makedirs(directory)

    def _get_imgs(self, token):
        self._check_dir(f'temp_imgs/{token}')
        bucket_name = 'seekinglost-dados-treino-raw'
        objects = self.s3.list_objects_v2(Bucket=bucket_name, Prefix=token)

        # Baixar cada arquivo da pasta
        for obj in objects['Contents']:
             if obj['Size'] > 0:
                key = obj['Key']
                file_name = os.path.join(f'temp_imgs/{token}', os.path.basename(key))
                self._download_from_s3(bucket_name, key, file_name)

    def _save_img(self, img, token):
        _, buffer = cv2.imencode('.jpg', img)
        img_bytes = buffer.tobytes()
        self.s3.put_object(Bucket='seekinglost-results', Key=token, Body=img_bytes, ContentType='image/jpeg')

    def predict(self, token):
        self._get_imgs(token)
        files = os.listdir(f'temp_imgs/{token}')
        result = []

        for file in files:
            img = cv2.imread(f'temp_imgs/{token}/{file}')
            imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = self._detec_faces(imgGray)

            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
                id, confidence = self.model.predict(imgGray[y:y+h, x:x+w])
                id = self.names[id]
                result.append({'ID':id, 
                               'CONFIDENCE':round(100 - confidence)})
                cv2.putText(img, str(id), (x + 5, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
                cv2.putText(img, str(confidence), (x + 5, y + h - 5), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 1)
                self._save_img(img)

        shutil.rmtree(f'temp_imgs/{token}')
        return result
