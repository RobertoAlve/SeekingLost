"""
This is the module to host the api calls
"""
from src.model import Model
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    
    model._delete_s3_directory('seekinglost-results', token)
    return model.predict(token)
