import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    DEEPL_API_KEY: str = "Deepl APIKey"
    LOGURU_FORMAT: str = (
        "<green>{time:HH:mm:ss}</green> | {level} | <level>{message}</level>"
    )
    PYTEST_BASE_URL: str = "http://test"

    class Config:
        env_file = os.getenv("ENV_FILE")
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()
