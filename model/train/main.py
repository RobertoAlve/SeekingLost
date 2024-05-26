import os
from src.pipeline import download_imgs, process_imgs, training_model, upload_data


def main(folders_paths):
    names = download_imgs(folders_paths ,'./images')
    process_imgs('./images', 'processed_images')
    training_model('processed_images', names)
    upload_data()
    

if __name__ == '__main__':
    folders_paths = ['timothée_chalamet/']
    os.makedirs('trainer', exist_ok=True)
    os.makedirs('person-names', exist_ok=True)
    
    main(folders_paths)
