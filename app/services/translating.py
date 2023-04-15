from config import settings
from deep_translator import DeeplTranslator, GoogleTranslator
from deep_translator.exceptions import NotValidPayload
from fastapi import HTTPException


async def translate_text(text: str, from_lang: str, to_lang: str) -> str:
    """
    Translates the input text using either the Google or Deepl API.

    Parameters:
    -----------
    text : str.
        The text to be translated.
    from_lang : str.
        The source language code.
    to_lang : str.
        The target language code.

    Returns:
    --------
    str.
        The translated text.
    """
    try:
        if settings.DEEPL_API_KEY == "Deepl APIKey":
            translated_text = GoogleTranslator(
                source=from_lang,
                target=to_lang,
            ).translate(text)
        else:
            translated_text = DeeplTranslator(
                api_key=settings.DEEPL_API_KEY,
                source=from_lang,
                target=to_lang,
                use_free_api=True,
            ).translate(text)
    except NotValidPayload as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return translated_text
