import json

import pytest
from httpx import AsyncClient


class TestRecorder:
    TRANSLATED_TEXT_HANDLER = "/api/v1/translate-text/"
    RUS_REQUEST = "Тестовый перевод"
    ENG_RESPONSE = "Test translation"
    ONLY_DIGIT_REQUEST = "123"
    ONLY_DIGIT_RESPONSE = "123 --> text must be a valid text with maximum 5000 character, otherwise it cannot be translated"

    @pytest.mark.asyncio
    async def test_translation(self, async_client: AsyncClient) -> None:
        data = {"message": self.RUS_REQUEST}
        response = await async_client.post(
            self.TRANSLATED_TEXT_HANDLER, content=json.dumps(data)
        )
        assert response.status_code == 200
        assert "application/json" in response.headers["content-type"]
        assert "message" in response.text
        assert self.ENG_RESPONSE in response.text

    @pytest.mark.asyncio
    async def test_translation_only_digits(self, async_client: AsyncClient) -> None:
        data = {"message": self.ONLY_DIGIT_REQUEST}
        response = await async_client.post(
            self.TRANSLATED_TEXT_HANDLER, content=json.dumps(data)
        )
        assert response.status_code == 400
        assert "application/json" in response.headers["content-type"]
        assert "detail" in response.text
        assert self.ONLY_DIGIT_RESPONSE in response.text
