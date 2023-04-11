from config import settings
from deep_translator import DeeplTranslator
from deep_translator.exceptions import NotValidPayload
from fastapi import HTTPException


async def translate_text(text: str, from_lang: str, to_lang: str) -> str:
    try:
        translated_by_deepl = DeeplTranslator(
            api_key=settings.DEEPL_API_KEY,
            source=from_lang,
            target=to_lang,
            use_free_api=True,
        ).translate(text)
    except NotValidPayload as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return translated_by_deepl
