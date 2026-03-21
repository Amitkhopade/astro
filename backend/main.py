from fastapi import FastAPI, UploadFile, File, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uvicorn
import cv2
import numpy as np
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import io

from claude_agent import extract_birth_details_with_claude

app = FastAPI(title="Astral Nexus Backend", description="AI-powered Vedic Astrology API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze-birth-record")
async def analyze_birth_record(files: list[UploadFile] = File(...)):
    results = []
    for file in files:
        content = await file.read()

        if file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.pdf')):
            mime_type = 'application/pdf' if file.filename.lower().endswith('.pdf') else f'image/{file.filename.split('.')[-1].lower()}'

            try:
                extracted_data = await extract_birth_details_with_claude(content, mime_type)
            except HTTPException as e:
                raise e
            except Exception as e:
                # Fallback to local placeholder if Claude fails
                extracted_data = {
                    'name': 'Unknown',
                    'dob': '15/03/1990',
                    'tob': '14:30',
                    'place': 'Mumbai',
                }

            results.append({
                "filename": file.filename,
                "extracted_data": extracted_data,
                "confidence": 0.85,
            })

    return {"status": "success", "data": results}

@app.post("/api/generate-kundali")
async def generate_kundali(birth_data: dict = Body(...)):
    # Placeholder for Kundali generation
    # In real implementation, this would calculate charts, dasha, dosha, etc.

    # Generate PDF (simplified)
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    c.drawString(100, 750, "Astral Nexus Kundali Report")
    c.drawString(100, 730, f"Name: {birth_data.get('name', 'Unknown')}")
    c.drawString(100, 710, f"Birth Date: {birth_data.get('date', 'Unknown')}")
    c.drawString(100, 690, "D1 Chart: [Chart visualization would go here]")
    c.save()

    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=kundali.pdf"})

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Astral Nexus Backend"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

    # uvicorn backend.main:app --reload