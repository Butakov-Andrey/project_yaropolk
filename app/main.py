from dependencies import logging
from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

app = FastAPI(
    title="Project Yaropolk",
    version="0.0.1",
    contact={
        "name": "Andrey Butakov",
        "email": "6669.butakov@gmail.com",
    },
    openapi_url="/openapi.json",
    docs_url="/docs",
    redoc_url=None,
)


# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# home
@app.get("/", status_code=200, dependencies=[Depends(logging)])
async def home(request: Request) -> dict[str, str]:
    logger.info(f"Request: {request.method} {request.url} {request.headers}")
    return {"msg": "Welcome to Project Yaropolk"}
