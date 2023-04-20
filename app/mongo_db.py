from config import settings
from pymongo import MongoClient


class ContextDatabase:
    def __init__(self) -> None:
        self.client: MongoClient = MongoClient(
            host=settings.MONGO_HOST,
            port=settings.MONGO_PORT,
        )
        self.db = self.client["context_database"]
        self.messages = self.db["messages"]


context_db = ContextDatabase()
