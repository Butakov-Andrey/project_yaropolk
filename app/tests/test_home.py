import pytest
from httpx import AsyncClient


class TestHomePage:
    HOME = "/"

    @pytest.mark.asyncio
    async def test_root(self, async_client: AsyncClient) -> None:
        response = await async_client.get(self.HOME)
        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]
        assert "Hello, world!" in response.text
