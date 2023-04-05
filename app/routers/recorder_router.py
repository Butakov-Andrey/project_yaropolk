from dependencies import logging
from fastapi import APIRouter, Depends, File
from fastapi.responses import JSONResponse

recorder_router = APIRouter()


@recorder_router.post(
    "/audio/",
    status_code=201,
    response_class=JSONResponse,
    dependencies=[Depends(logging)],
)
async def save_audio_file(audio: bytes = File(...)) -> dict[str, str]:
    with open("recording.mp4", "wb") as f:
        f.write(audio)

    return {"message": "Audio file saved successfully."}
