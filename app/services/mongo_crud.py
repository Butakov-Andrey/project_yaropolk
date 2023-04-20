from datetime import datetime

from mongo_db import context_db
from schemas import Message
from services import Gpt3_5Constants


class ContextManager:
    def add_message_to_context(self, role: str, text: str) -> None:
        """
        Creates a new message with the given role and text, and inserts it into the
        messages collection.

        Parameters:
        -----------
        role: str.
            Representing the role of the message.
        text: str
            Representing the text of the message.
        """
        message = Message(role=role, text=text, timestamp=datetime.now())
        context_db.messages.insert_one(message.dict())

    def get_context(self) -> str:
        """
        Retrieve the last 50 messages from the MongoDB collection 'messages',
        sorted by timestamp in descending order.

        Returns:
        -----------
        list[str].
            A list of strings representing the text of the last 50 messages.
        """
        messages = (
            context_db.messages.find({}, {"text": 1, "role": 1})
            .sort("timestamp", -1)
            .limit(Gpt3_5Constants.CONTEXT_LIMIT_MESSAGES)
        )

        context = [f"{msg['role']}: {msg['text']} \n" for msg in messages][::-1]
        return "".join(context)

    def delete_all_context(self) -> int:
        """
        Deletes all messages from the MongoDB collection 'messages'.
        """
        result = context_db.messages.delete_many({})
        return result.deleted_count
