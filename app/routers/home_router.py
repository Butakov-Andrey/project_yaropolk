from dependencies import logging
from fastapi import APIRouter, Depends, Request
from loguru import logger

home_router = APIRouter()


@home_router.get("/", status_code=200, dependencies=[Depends(logging)])
async def home(request: Request) -> dict[str, str]:
    logger.info(f"Request: {request.method} {request.url} {request.headers}")
    return {"msg": "Welcome to Project Yaropolk"}
