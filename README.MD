# Project Yaropolk
Voice Assistant

## Features
- voice text input
- keyboard text input
- text translation

## Requirements
To install the required dependencies, run the following commands:
```
$ pip install pip-tools
$ pip-compile ./app/requirements.in
$ pip-sync ./app/requirements.txt
```
## Pre-commit
Install pre-commit to ensure code quality and consistency:
```
$ pip install pre-commit
$ pre-commit install
```
[Specify the app directory](.pre-commit-config.yaml) in which the pre-commit hooks will run:  
```
files: ^(app)
```
[Specify the app directory](.pre-commit-config.yaml) that pre-commit hooks should ignore:  
```
exclude: (?x).*/alembic($|/.*)
```
## Build containers
To set env-file and build the Docker containers, run:
```
$ export ENV_FILE=./.env
$ docker-compose up -d --build
```

## Testing
Run tests with the following command:  
```
$ docker-compose exec app python -m pytest
```
To check test coverage, run:
```
$ docker-compose exec app coverage run -m pytest
$ docker-compose exec app coverage report -m
```

STT
https://github.com/openai/whisper
https://github.com/alphacep/vosk-api/
https://github.com/sovaai/sova-asr

## TODO
- добавление файлов или ссылок для поиска по ним
- второй бот чисто для общения с воспроизведением звука
- добавление изображений
