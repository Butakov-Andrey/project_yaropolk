from typing import Callable

from fastapi import Request
from fastapi.responses import JSONResponse
from loguru import logger


async def logging_middleware(request: Request, call_next: Callable) -> JSONResponse:
    """
    Middleware that logs incoming requests and outgoing responses.

    Parameters:
    -----------
    request : Request.
        The incoming HTTP request object.
    call_next : Callable.
        The next callable in the chain.

    Returns:
    --------
    JSONResponse.
        The HTTP response object.
    """
    logger.debug("REQUEST:")
    logger.debug(f"{request.method} {request.url}")
    logger.debug("Params:")
    for name, value in request.path_params.items():
        logger.debug(f"\t{name}: {value}")
    logger.debug("Headers:")
    for name, value in request.headers.items():
        logger.debug(f"\t{name}: {value}")

    response = await call_next(request)

    logger.debug("RESPONSE:")
    logger.debug(f"{request.method} {request.url}")
    logger.debug(f"Status code: {response.status_code}")
    logger.debug("Headers:")
    for name, value in response.headers.items():
        logger.debug(f"\t{name}: {value}")

    return response
