"""
This is the module to host the api calls
"""
import io
from PIL import Image
from src.model import Model
from fastapi import FastAPI, File, UploadFile

app = FastAPI()
model = Model()

@app.get("/predict/")
async def predict(file: UploadFile = File(...)) -> (tuple | None):
    """
        API to get the model prediction

        Args:
        - file (File): image of a person  

        Returns:
            tuple: returns the prediction of the model, id and confidence  
    """
    contents = await file.read()
    img = Image.open(io.BytesIO(contents))
    return model.predict(img)
