from pathlib import Path
from openai import OpenAI

client = OpenAI()
speech_file_path = Path(__file__).parent / "audio-segments" / "01.mp3"

with client.audio.speech.with_streaming_response.create(
        model="gpt-4o-mini-tts",
        voice="sol",
        input="Once upon a time, there was an e‑commerce store. They used an external payment service to handle orders.",
        instructions="Speak as if you were a teacher explaining technical content.",
) as response:
    response.stream_to_file(speech_file_path)