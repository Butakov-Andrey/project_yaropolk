from deep_translator import GoogleTranslator
from deep_translator.exceptions import NotValidPayload
from fastapi import HTTPException


async def translate_text(text: str, from_lang: str, to_lang: str) -> str:
    try:
        translated_by_google = GoogleTranslator(
            source=from_lang,
            target=to_lang,
        ).translate(text)
    except NotValidPayload as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return translated_by_google
