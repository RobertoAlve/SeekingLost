FROM python:3-slim

WORKDIR /app

COPY api/main.py main.py
COPY api/src src
COPY api/requirements.txt requirements.txt

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

RUN pip install --no-cache-dir --upgrade -r requirements.txt

EXPOSE 80
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
