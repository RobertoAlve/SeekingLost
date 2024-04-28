import json
import boto3
from tqdm import tqdm
from imdb import Cinemagoer


def main(im:Cinemagoer, list_actors:list)->None:
    """
    Coleta atraves de um api os filmes em que os atores da lista passada estrearam
    """

    actors_info = {}

    for actor in tqdm(list_actors):
        print(actor)
        search_actor = im.search_person(actor)
        for result in search_actor:
            person = im.get_person(result.personID)
            if 'filmography' in person.data.keys() and ('actor' or 'actress') in person.data['filmography'].keys():
                list_films = person.data['filmography']['actor'] if 'actor' in person.data['filmography'] else person.data['filmography']['actress']

                actors_info[result['name']] = {
                    'img': person['headshot'] if 'headshot' in person.data.keys() else 'None',
                    'films': [film['title'] for film in list_films]
                }

            pass

    with open('parameters_crawler.json', "a") as arquivo:
        json.dump(actors_info, arquivo)

    s3 = boto3.client("s3")
    bucket_name = "testaaaaapapepipo"
    s3.upload_file("parameters/parameters_crawler.json", bucket_name, "parameters_crawler.json")


if __name__ == '__main__':
    with open('list_actors.json', 'r', encoding='utf8') as file:
        list_actors = json.load(file)['list_actors']

    main(Cinemagoer(), list_actors)