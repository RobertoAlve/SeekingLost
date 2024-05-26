FROM python:3-slim

WORKDIR /app

COPY main.py main.py
COPY src src
COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

CMD ["python", "main.py"]
