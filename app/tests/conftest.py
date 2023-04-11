import main
import pytest_asyncio
from config import settings
from httpx import AsyncClient


@pytest_asyncio.fixture()
async def async_client():
    async with AsyncClient(
        app=main.app, base_url=settings.PYTEST_BASE_URL
    ) as async_client:
        yield async_client
