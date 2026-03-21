# Astral Nexus

AI-powered Vedic Astrology platform with Claude Sonnet integration for birth record extraction and Kundali generation.

## Features

- **Celestial UI**: Dark mode with glassmorphism effects and cosmic gold accents
- **AI Birth Clerk**: Claude 3.5 Sonnet extracts birth details from uploaded documents
- **Kundali Generation**: Professional PDF reports with charts and analysis
- **Modern Tech Stack**: Next.js 14, FastAPI, Tailwind CSS, Framer Motion

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend
```bash
npm install
npm run dev
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/analyze-birth-record` - Extract birth details from documents
- `POST /api/generate-kundali` - Generate Kundali PDF

## Environment Variables

Create `.env` file:
```
ANTHROPIC_API_KEY=your_key_here
```

## License

MIT