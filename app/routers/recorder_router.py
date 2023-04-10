from fastapi import APIRouter
from schemas import TranslatedText, UserText
from services import translate_text

recorder_router = APIRouter(
    prefix="/api/v1",
    tags=["recorder"],
    responses={404: {"description": "Not found"}},
)


@recorder_router.post("/translate-text/", status_code=200)
async def translated_text_handler(user_text: UserText) -> TranslatedText:
    """
    Translates incoming text message from Russian to English
    """
    translated_text = await translate_text(user_text.message, "ru", "en")
    return TranslatedText(message=translated_text)
