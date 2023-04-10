import json
import os
import subprocess

from pydub import AudioSegment
from vosk import KaldiRecognizer, Model, SetLogLevel


class TranscribingService:
    def mp4_to_wav(self, audio_file_name):
        subprocess.run(
            [
                "ffmpeg",
                "-i",
                f"{audio_file_name}.mp4",
                "-acodec",
                "pcm_s16le",
                "-ar",
                "16000",
                f"{audio_file_name}.wav",
            ]
        )

        self.delete_file(f"{audio_file_name}.mp4")

        return f"{audio_file_name}.wav"

    def wav_to_text(self, wav_file):
        SetLogLevel(0)
        # Устанавливаем Frame Rate
        FRAME_RATE = 16000
        CHANNELS = 1

        model = Model(model_path="/code/services/model")
        rec = KaldiRecognizer(model, FRAME_RATE)
        rec.SetWords(True)
        rec.SetPartialWords(True)

        wav = AudioSegment.from_file(wav_file)
        wav = wav.set_channels(CHANNELS)
        wav = wav.set_frame_rate(FRAME_RATE)

        rec.AcceptWaveform(wav.raw_data)
        result = rec.Result()
        text = json.loads(result)["text"]

        self.delete_file(wav_file)

        return text

    def delete_file(self, file_name):
        if os.path.exists(file_name):
            os.remove(file_name)
            print(f"{file_name} has been deleted.")
        else:
            print(f"{file_name} does not exist.")
