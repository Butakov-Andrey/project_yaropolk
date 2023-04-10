from pydantic import BaseModel


class UserText(BaseModel):
    message: str


class TranslatedText(BaseModel):
    message: str
