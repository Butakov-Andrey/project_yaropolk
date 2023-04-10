import main
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse

home_router = APIRouter(
    tags=["home page"],
    responses={404: {"description": "Not found"}},
)


@home_router.get("/", status_code=200)
async def home(request: Request) -> HTMLResponse:
    """
    Returns the main page of app
    """
    return main.templates.TemplateResponse("home.html", {"request": request})
