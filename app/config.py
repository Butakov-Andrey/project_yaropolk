import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    # deepl
    DEEPL_API_KEY: str = "Deepl APIKey"
    # openai
    ORGANIZATION: str = "OpenAI Organization ID"
    OPENAI_API_KEY: str = "OpenAI APIKey"
    # logging
    LOGURU_FORMAT: str = (
        "<green>{time:HH:mm:ss}</green> | {level} | <level>{message}</level>"
    )
    # tests
    PYTEST_BASE_URL: str = "http://test"

    class Config:
        env_file = os.getenv("ENV_FILE")
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()
