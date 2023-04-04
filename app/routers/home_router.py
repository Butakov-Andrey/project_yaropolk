import main
from dependencies import logging
from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse
from loguru import logger

home_router = APIRouter()


@home_router.get(
    "/",
    status_code=200,
    response_class=HTMLResponse,
    dependencies=[Depends(logging)],
)
async def home(request: Request) -> dict[str, str]:
    logger.info(f"Request: {request.method} {request.url} {request.headers}")
    return main.templates.TemplateResponse("home.html", {"request": request})
