from typing import Callable

from fastapi import Request
from fastapi.responses import JSONResponse
from loguru import logger


async def logging_middleware(request: Request, call_next: Callable) -> JSONResponse:
    logger.debug("REQUEST:")
    logger.debug(f"{request.method} {request.url}")
    logger.debug("Params:")
    for name, value in request.path_params.items():
        logger.debug(f"\t{name}: {value}")
    logger.debug("Headers:")
    for name, value in request.headers.items():
        logger.debug(f"\t{name}: {value}")

    response = await call_next(request)

    logger.info("RESPONSE:")
    logger.info(f"{request.method} {request.url}")
    logger.info(f"Status code: {response.status_code}")
    logger.info("Headers:")
    for name, value in response.headers.items():
        logger.info(f"\t{name}: {value}")

    return response
