import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    SOME_TOKEN: str = "Some secret token"

    class Config:
        env_file = os.getenv("ENV_FILE")
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()
