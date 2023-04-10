FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

# перевод аудио файлов в нужный формат для модели распознавания голоса
# RUN apt-get update && apt-get install -y ffmpeg libavcodec-extra

COPY app/requirements.txt /code/requirements.txt

RUN pip install --upgrade pip \
                --no-cache-dir -r requirements.txt

COPY ./app /code/
