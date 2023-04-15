import json

import pytest
from httpx import AsyncClient


class TestRecorder:
    GPT_HANDLER = "/api/v1/gpt/"
    REQUEST_MESSAGE = "say hi"

    @pytest.mark.asyncio
    async def test_gpt(self, async_client: AsyncClient) -> None:
        data = {"message": self.REQUEST_MESSAGE}
        response = await async_client.post(self.GPT_HANDLER, content=json.dumps(data))
        assert response.status_code == 200
        assert "text/plain" in response.headers["content-type"]
