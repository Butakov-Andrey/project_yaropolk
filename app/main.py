from dependencies import logging
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import home_router

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

app.include_router(home_router, dependencies=[Depends(logging)])
