import anthropic
import base64
import json
import os
from fastapi import HTTPException

api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    raise ValueError("ANTHROPIC_API_KEY environment variable not set")
client = anthropic.Anthropic(api_key=api_key)

async def extract_birth_details_with_claude(file_bytes: bytes, mime_type: str):
    base64_image = base64.b64encode(file_bytes).decode("utf-8")

    prompt = """
Extract birth details from this document for a Vedic Astrology report.
Please find:
- Full Name
- Date of Birth (DD/MM/YYYY)
- Time of Birth (24hr format)
- Place of Birth (City/State/Country)

Output the result in strictly valid JSON format inside <json> tags.
Example: <json>{\"name\": \"...\", \"dob\": \"...\", \"tob\": \"...\", \"place\": \"...\"}</json>
"""

    try:
        message = client.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": mime_type,
                                "data": base64_image,
                            },
                        },
                        {
                            "type": "text",
                            "text": prompt,
                        },
                    ],
                }
            ],
        )

        text = message.content[0].text
        if "<json>" not in text or "</json>" not in text:
            raise HTTPException(status_code=502, detail="Claude response missing <json> content")

        json_str = text.split("<json>")[1].split("</json>")[0].strip()
        return json.loads(json_str)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Claude Extraction Failed: {str(e)}")
