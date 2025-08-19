from pathlib import Path
from openai import OpenAI
import json

client = OpenAI()

articles_path = Path(__file__).parent / "../../articles"
for f in articles_path.iterdir():
    with open(articles_path / f.name / "transcripts/transcript.json", 'r') as file:
        transcript = json.load(file)
        segments = transcript['segments']
        print(f"Generating audios for article {transcript['title']}...")
    for i, segment in enumerate(segments):
        speech_file_path = articles_path / f.name / "audios" / f"{i}.mp3"
        print(f"Audio {i} from {len(segments)}")
        with client.audio.speech.with_streaming_response.create(
                model="gpt-4o-mini-tts",
                voice="onyx",
                input=' '.join(segment['sentences']),
                instructions="Speak as if you were a teacher explaining technical content.",
        ) as response:
            response.stream_to_file(speech_file_path)
    print("Generation finished")