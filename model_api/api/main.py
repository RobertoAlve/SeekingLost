"""
This is the module to host the api calls
"""
from src.model import Model
from fastapi import FastAPI

app = FastAPI()
model = Model()

@app.get("/predict/{token}")
async def predict(token:str) -> list:
    """
        API to get the model prediction

        Args:
        - token (str): token of the image path in s3  

        Returns:
            tuple: returns the prediction of the model, id and confidence  
    """
    return model.predict(token)
