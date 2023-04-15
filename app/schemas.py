from pydantic import BaseModel


class UserText(BaseModel):
    message: str
