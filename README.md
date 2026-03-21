# Astral Nexus

AI-powered Vedic Astrology platform with Claude Sonnet integration for birth record extraction and Kundali generation.

## Features

- **Celestial UI**: Dark mode with glassmorphism effects and cosmic gold accents
- **AI Birth Clerk**: Claude 3.5 Sonnet extracts birth details from uploaded documents
- **Kundali Generation**: Professional PDF reports with charts and analysis
- **Modern Tech Stack**: Vanilla JavaScript, FastAPI, No build tools required

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend
Simply open `index.html` in your web browser or serve it with any HTTP server:
```bash
# Python 3
python -m http.server 8080

# Or any other HTTP server
# The frontend will connect to the backend at http://localhost:8000
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/analyze-birth-record` - Extract birth details from documents
- `POST /api/generate-kundali` - Generate Kundali PDF

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