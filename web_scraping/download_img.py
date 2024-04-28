# The script responsible for mining data from images of actors

import os
import json
import boto3
import shutil
import requests

from tqdm import tqdm
from bs4 import BeautifulSoup


def get_search(actor:str):
    response = requests.get(f"https://www.google.com.br/search?q={actor}&tbm=isch")
    soup = BeautifulSoup(response.text, 'html.parser')
    return soup.find_all('img')


def download_img(img_tags, num_imgs:int, actor:str)->None:
    for i in tqdm(range(1,num_imgs)):
        img_tag = img_tags[i]
        img_url = img_tag.get('src')

        if not img_url:
            continue
        
        img_data = requests.get(img_url).content

        with open(f'temp_imagens/{actor}_{i}.jpeg', 'wb') as img_file:
            img_file.write(img_data)

def upload_s3(ator:str)->None:
    s3 = boto3.client("s3")
    bucket_name = "seekinglost-dados-treino-raw"

    for img_path in tqdm(os.listdir("temp_imagens")):
        img_name = os.path.basename(img_path)
        s3.upload_file(f"temp_imagens/{img_name}", bucket_name, f"{ator}/{img_name}")


def main(list_actors:list, num_imgs:int)->None:
    for actor in list_actors:
        actor = actor.lower().replace(' ','_')
        img_tags = get_search(actor)

        download_img(img_tags, num_imgs, actor)
        upload_s3(actor)

    shutil.rmtree('temp_imagens')


if __name__ == '__main__':
    with open('parameters_crawler.json','r') as file:
        actors = json.load(file) 
    list_actors = list(actors.keys())
    del actors

    if not os.path.exists('temp_imagens'):
        os.makedirs('temp_imagens')
    
    main(list_actors, 200)