from datetime import datetime

from pydantic import BaseModel


class UserText(BaseModel):
    message: str


class Message(BaseModel):
    role: str
    text: str
    timestamp: datetime


class ContextDeleted(BaseModel):
    deleted_count: int
