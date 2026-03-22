# Astral Nexus

AI-powered Vedic Astrology platform with Claude Sonnet integration for birth record extraction and Kundali generation.

## Features

- **Celestial UI**: Dark mode with glassmorphism effects and cosmic gold accents
- **AI Birth Clerk**: Claude 3.5 Sonnet extracts birth details from uploaded documents
- **Manual Entry**: Enter birth details manually without file upload
- **Interactive Kundali PDF**: Comprehensive 4-page astrology reports with:
  - Calculated ascendant and planetary positions
  - Visual birth chart with house placements
  - Dasha periods and predictions
  - Yogas, doshas, and remedies
- **Modern Tech Stack**: Vanilla JavaScript, FastAPI, No build tools required

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend runs on http://localhost:8002

### Frontend
Simply open `index.html` in your web browser or serve it with any HTTP server:
```bash
# Python 3
python -m http.server 8080

# Or any other HTTP server
# The frontend will connect to the backend at http://localhost:8002
```

## Usage

1. **AI Extraction**: Upload birth record images/PDFs → AI extracts data → Generate PDF
2. **Manual Entry**: Fill the form fields for name, date of birth, time of birth, and place of birth
3. **Generate PDF**: Click "Generate Kundali PDF" to download a comprehensive astrology report

## PDF Report Contents

The generated Kundali PDF includes:
- **Page 1**: Personal details with calculated ascendant
- **Page 2**: Lagna (D1) chart visualization and planetary positions
- **Page 3**: Dasha periods and life predictions
- **Page 4**: Beneficial yogas, potential doshas, and remedies

## Example Data Tested

Successfully tested with:
- Name: sumit khopade
- DOB: 09/02/1997
- TOB: 12:00
- Place: saswad

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/analyze-birth-record` - Extract birth details from documents
- `POST /api/generate-kundali` - Generate comprehensive Kundali PDF

## Environment Variables

Create `.env` file in the backend directory:
```
ANTHROPIC_API_KEY=your_key_here
```

## Project Structure

```
├── index.html           # Main frontend (vanilla HTML/CSS/JS)
├── backend/
│   ├── main.py         # FastAPI server
│   ├── claude_agent.py # Claude integration
│   ├── requirements.txt
│   └── test_endpoints.py
├── .gitignore
└── README.md
```

## License

MIT