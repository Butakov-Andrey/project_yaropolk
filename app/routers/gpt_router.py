from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from schemas import UserText
from services import ChatAssistant

gpt_router = APIRouter(
    prefix="/api/v1",
    tags=["gpt"],
    responses={404: {"description": "Not found"}},
)


@gpt_router.post("/gpt/", status_code=200, response_class=StreamingResponse)
async def gpt_handler(user_text: UserText) -> StreamingResponse:
    """
    Handles requests to the OpenAI API.

    Parameters:
    -----------
    user_text : UserText.
        The user's input message.

    Returns:
    --------
    StreamingResponse.
        A streaming response object containing the API response chunks.
    """
    chat_assistant = ChatAssistant()
    return StreamingResponse(
        chat_assistant.make_request_to_gpt_api(user_text.message),
        media_type="text/plain",
    )
