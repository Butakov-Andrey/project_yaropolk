import functools
import time
from typing import Any, Callable

from loguru import logger


def sync_timed():
    """
    A decorator that logs the execution time of a function.

    Usage:
    ------
    @sync_timed()
        def my_function():
        ...

    Returns:
    --------
    Callable.
        The wrapper function.
    """

    def wrapper(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapped(*args, **kwargs) -> Any:
            logger.info(f"Выполняется {func} с аргументами {args} {kwargs}")
            start = time.time()
            try:
                return func(*args, **kwargs)
            finally:
                end = time.time()
                total = end - start
                logger.info(f"{func} завершилась за {total:.4f} с.")

        return wrapped

    return wrapper


def async_timed():
    """
    A decorator that logs the execution time of a async function.

    Usage:
    ------
    @async_timed()
        async def my_function():
        ...

    Returns:
    --------
    Callable.
        The wrapper function.
    """

    def wrapper(func: Callable) -> Callable:
        @functools.wraps(func)
        async def wrapped(*args, **kwargs) -> Any:
            logger.info(f"Выполняется {func} с аргументами {args} {kwargs}")
            start = time.time()
            try:
                return await func(*args, **kwargs)
            finally:
                end = time.time()
                total = end - start
                logger.info(f"{func} завершилась за {total:.4f} с.")

        return wrapped

    return wrapper
