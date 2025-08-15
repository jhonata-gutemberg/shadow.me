from pathlib import Path
from openai import OpenAI
import json

client = OpenAI()

articles_path = Path(__file__).parent / "../../articles"
for f in articles_path.iterdir():
    with open(articles_path / f.name / "transcripts/transcript.json", 'r') as file:
        transcript = json.load(file)
    for i, segment in enumerate(transcript['segments']):
        speech_file_path = articles_path / f.name / "audios" / f"{i}.mp3"
        with client.audio.speech.with_streaming_response.create(
                model="gpt-4o-mini-tts",
                voice="onyx",
                input=' '.join(segment['sentences']),
                instructions="Speak as if you were a teacher explaining technical content.",
        ) as response:
            response.stream_to_file(speech_file_path)
