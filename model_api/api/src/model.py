"""
    This module contais a class of a model with the necessary funtions to make the prediction
"""
import cv2
import boto3


class Model:
    def __init__(self):
        self.model = self._get_model()
        self.face_detector = self._get_detector()

    def _download_model(self):
        s3 = boto3.client('s3')

        bucket_name = 'seekinglost-modelos'
        object_name = 'model/'
        file_name = 'trainer/trainer.yml'

        s3.download_file(bucket_name, object_name, file_name)

    def _get_model(self):
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        recognizer.read('trainer/trainer.yml')
        return recognizer
    
    def _get_detector(self):
        return cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

    def _detec_faces(self, img):
        return self.face_detector.detectMultiScale(img, scaleFactor=2.4, minNeighbors=5, minSize=(30, 30))

    def predict(self, img):
        imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = self._detec_faces(imgGray)

        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
            id, confidence = self.model.predict(imgGray[y:y+h, x:x+w])
            return id, round(100 - confidence)
