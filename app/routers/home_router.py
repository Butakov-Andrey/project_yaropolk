import main
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse

home_router = APIRouter(
    tags=["home page"],
    responses={404: {"description": "Not found"}},
)


@home_router.get("/", status_code=200, response_class=HTMLResponse)
async def home(request: Request) -> HTMLResponse:
    """
    Renders the main page of the app.

    Parameters:
    -----------
    request : Request.
        The HTTP request object.

    Returns:
    --------
    HTMLResponse.
        The HTML response object containing the rendered template.
    """
    return main.templates.TemplateResponse("home.html", {"request": request})
