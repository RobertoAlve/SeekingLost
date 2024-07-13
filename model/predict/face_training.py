#!/usr/bin/env python
# coding: utf-8

# In[9]:


import os
import cv2
import numpy as np
from PIL import Image 
import boto3


# In[10]:


session = boto3.Session(
    )

s3 = session.client('s3')
local_dir = './images'
bucket_name = 'seekinglost-dados-treino-raw'
response = s3.list_objects_v2(Bucket=bucket_name, Prefix='timothée_chalamet/')

user_count = 0
image_count_start = 10
current_prefix = None
names = [""]

if 'Contents' in response:
    for item in response['Contents']:
        file_name = item['Key']

        prefix = file_name.split('/')[0]

        if prefix != current_prefix:
            current_prefix = prefix
            user_count += 1
            user_image_count = 10
            user_image_count = image_count_start
            names.append(prefix)

        
        # Define o caminho completo para o arquivo de destino
        destination_path = os.path.join(local_dir, f"User.{user_count}.{user_image_count}.jpg")
        
        # Cria diretórios se não existirem
        os.makedirs(os.path.dirname(destination_path), exist_ok=True)
        
        # Baixa o arquivo
        s3.download_file(bucket_name, file_name, destination_path)
        
        print(f"Arquivo {file_name} baixado para {destination_path}")
        user_image_count += 1
else:
    print("O bucket está vazio ou não contém arquivos.")

print("Download concluído.")
print(names)


# In[11]:


input_path = 'images'
output_path = 'processed_images'

if not os.path.exists(output_path):
    os.makedirs(output_path)

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


def resize_face(image, face_coordinates):
    x, y, w, h = face_coordinates
    face_roi = image[y:y+h, x:x+w]
    resized_face = cv2.resize(face_roi, (100, 100))
    return resized_face


def resize_face_with_margin(image, face_coordinates, margin):
    x, y, w, h = face_coordinates

    x -= margin
    y -= margin
    w += 2 * margin
    h += 2 * margin

    x = max(0, x)
    y = max(0, y)

    w = min(w, image.shape[1] - x)
    h = min(h, image.shape[0] - y)

    face_roi = image[y:y+h, x:x+w]
    resized_face = cv2.resize(face_roi, (260, 260))
    return resized_face


for filename in os.listdir(input_path):
    input_image_path = os.path.join(input_path, filename)
    image = cv2.imread(input_image_path)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    equalized_gray_image = cv2.equalizeHist(gray_image)
    
    faces = face_cascade.detectMultiScale(
        gray_image,
        scaleFactor=1.5,
        minNeighbors=8,
        minSize=(30, 30)
        )

    for i, (x, y, w, h) in enumerate(faces):
        resized_face = resize_face_with_margin(gray_image, (x, y, w, h), margin=80)
        output_filename = f"{os.path.splitext(filename)[0]}_face_{i}.png"
        output_image_path = os.path.join(output_path, output_filename)

        cv2.imwrite(output_image_path, resized_face)

        
print("Processamento concluído. As imagens processadas foram salvas em:", output_path)


# In[12]:


path = 'processed_images'

recognizer = cv2.face.LBPHFaceRecognizer_create()
detector = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml");

def trainingModel(path):
    paths = [os.path.join(path, f) for f in os.listdir(path)]     
    faceSamples = []
    ids = []

    for imagePath in paths:
        PIL_img = Image.open(imagePath).convert('L')
        img_uint8 = np.array(PIL_img, 'uint8')

        id = int(os.path.split(imagePath)[-1].split(".")[1])
        faces = detector.detectMultiScale(img_uint8)

        for (x, y, w, h) in faces:
            faceSamples.append(img_uint8[y:y+h, x:x+w])
            ids.append(id)

    return faceSamples, ids

print ("Treinando modelo...")
faces, ids = trainingModel(path)
recognizer.train(faces, np.array(ids))

recognizer.write('trainer/trainer.yml')

print("{0} rostos treinados.".format(len(np.unique(ids))))


# In[13]:


get_ipython().system('jupyter nbconvert --to script face_training.ipynb')


# In[ ]:




