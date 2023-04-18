from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from schemas import ContextDeleted, UserText
from services import chat_assistant

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
    return StreamingResponse(
        chat_assistant.make_request_to_gpt_api(user_text.message),
        media_type="text/plain",
    )


@gpt_router.delete("/delete_context/", status_code=200, response_model=ContextDeleted)
async def gpt_delete_context() -> ContextDeleted:
    """
    Delete all context from the chat assistant.

    Returns:
    --------
    ContextDeleted.
        A response model containing the number of deleted messages in context.
    """
    deleted_count = chat_assistant.delete_all_context()
    return ContextDeleted(deleted_count=deleted_count)
