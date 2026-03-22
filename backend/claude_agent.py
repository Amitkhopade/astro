import anthropic
import base64
import json
import os
from fastapi import HTTPException

api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    print("Warning: ANTHROPIC_API_KEY environment variable not set. AI extraction will use fallback data.")
    api_key = None

client = None
if api_key:
    client = anthropic.Anthropic(api_key=api_key)

async def extract_birth_details_with_claude(file_bytes: bytes, mime_type: str):
    # If no API key, return fallback data
    if not client or not api_key:
        return {
            'name': 'Demo User',
            'dob': '15/03/1990',
            'tob': '14:30',
            'place': 'Mumbai, Maharashtra, India'
        }

    base64_image = base64.b64encode(file_bytes).decode("utf-8")

    prompt = """
Extract birth details from this document for a Vedic Astrology report.
Please find and extract:
- Full Name (person's complete name)
- Date of Birth (in DD/MM/YYYY format)
- Time of Birth (in 24-hour format HH:MM)
- Place of Birth (City, State/Country)

IMPORTANT: Output ONLY valid JSON inside <json> tags. Do not include any other text.
Format: <json>{"name": "John Doe", "dob": "15/03/1990", "tob": "14:30", "place": "Mumbai, Maharashtra, India"}</json>

If you cannot find certain information, use "Unknown" for that field.
"""

    try:
        message = client.messages.create(
            model="claude-3-5-sonnet-20241022",
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

        text = message.content[0].text.strip()
        print(f"Claude response: {text}")  # Debug logging

        if "<json>" not in text or "</json>" not in text:
            print("No JSON tags found in response")
            raise HTTPException(status_code=502, detail="Claude response missing <json> content")

        json_str = text.split("<json>")[1].split("</json>")[0].strip()
        print(f"Extracted JSON: {json_str}")  # Debug logging

        try:
            data = json.loads(json_str)
            # Validate required fields
            required_fields = ['name', 'dob', 'tob', 'place']
            for field in required_fields:
                if field not in data:
                    data[field] = 'Unknown'

            return data
        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}")
            raise HTTPException(status_code=502, detail=f"Invalid JSON from Claude: {str(e)}")

    except Exception as e:
        print(f"Claude API error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Claude Extraction Failed: {str(e)}")
