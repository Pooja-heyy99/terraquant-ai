# TerraQuant AI

TerraQuant AI is a carbon intelligence platform that helps enterprises monitor emissions, model climate risks, discover carbon credits, and execute decarbonization decisions from one interface.

## Problem Statement

Climate and sustainability teams face fragmented workflows:
- Emission measurement is often delayed and spreadsheet-driven.
- Climate risk analysis is disconnected from operations.
- Carbon credit discovery is opaque for investors and procurement teams.
- Decision-makers lack a unified, real-time view across global and India operations.

## Our Solution

TerraQuant AI combines a React frontend with a FastAPI backend to provide:
- Real-time emission monitoring.
- AI-backed prediction and risk assessment.
- India-specific plus global carbon map intelligence.
- Investor-grade carbon credit marketplace search and filtering.
- Actionable optimization recommendations and forecasting.

## Why This Platform Is Useful

- Converts sustainability data into operational decisions.
- Improves confidence through model-driven scoring and transparent metadata.
- Helps investors and buyers compare carbon projects by impact, certification, vintage, and risk.
- Supports India-focused analysis while retaining global coverage.
- Can be deployed as a single Vercel link for demo and pilot rollouts.

## Key Features

### 1) Dashboard
- KPI cards for emissions and ESG insights.
- Live emission ticker from backend every 2 seconds.

### 2) Emission Predictor
- Predicts total emissions and scope breakdown.
- Uses trained model files when present.

### 3) Carbon Map (Global + India Focus)
- Toggle between Global and India views.
- Risk filtering (low, medium, high, critical).
- India-specific facilities and climate risk overlays.

### 4) Climate Risk Assessment
- Scores risk level and risk factors.
- Provides recommended mitigation actions.

### 5) Fraud Detection
- Detects anomalies in submitted emission reports.
- Returns confidence and issue flags.

### 6) Carbon Credit Marketplace
- Investor search by keyword, methodology, certification, location.
- Filters by project type and region.
- Sort by impact score, price, or available credits.
- Purchase flow with quantity and total cost computation.

### 7) AI Copilot
- Sustainability Q&A and strategic guidance endpoint.

### 8) Optimization + Forecast
- Recommends emission reduction strategies.
- Simulates long-term trajectory.

### 9) Image Analysis
- Upload-based land cover and carbon density analysis.

### 10) Voice Commands
- Voice route parsing for navigation and actions.

## Investor Discovery Flow in Marketplace

Investors typically evaluate credits in three stages:
1. Discover: search by geography, project type, methodology.
2. Due diligence: compare certification, vintage, risk band, and impact score.
3. Allocate and purchase: select quantity and complete transaction.

TerraQuant implements this directly in the marketplace UX.

## Real-Time Design

- Backend endpoint: `/realtime-emission`
- Frontend polling interval: 2 seconds
- Emission values update continuously using a time-based simulation waveform.

## Dataset and Model Usage

### Runtime dataset usage
- No CSV/XLSX files are currently read at runtime.

### Runtime ML model usage
- `backend/models/emission_model.pkl`
- `backend/models/risk_model.pkl`
- `backend/models/fraud_model.pkl`

If models are missing, services fall back to demo logic for continuity.

## Project Structure

```text
TerraQuant/
├── api/
│   └── index.py                     # Vercel Python serverless entrypoint
├── backend/
│   ├── app.py                       # FastAPI routes
│   ├── ai_services.py               # ML model loading + inference
│   ├── marketplace.py               # Carbon project inventory + purchase logic
│   ├── leaderboard.py               # Ranking data
│   ├── image_analysis.py            # Satellite analysis logic
│   ├── copilot.py                   # AI copilot logic
│   ├── voice.py                     # Voice command logic
│   ├── requirements.txt             # Backend dependencies
│   └── models/
│       ├── emission_model.pkl
│       ├── risk_model.pkl
│       └── fraud_model.pkl
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/api.js               # Axios client
│   │   ├── components/
│   │   └── pages/
│   │       ├── Dashboard.js
│   │       ├── EmissionPredictor.js
│   │       ├── MapPage.js
│   │       ├── Marketplace.js
│   │       ├── Copilot.js
│   │       ├── Optimize.js
│   │       └── OtherPages.js
│   └── package.json
├── requirements.txt                 # Root requirements for Vercel Python build
├── vercel.json                      # Single-link deployment config
└── README.md
```

## Tech Stack

### Frontend
- React 18
- React Router
- Recharts
- React Leaflet
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Uvicorn
- Scikit-learn
- NumPy
- Pandas
- Python-dotenv

## Local Run

### Backend
```bash
cd backend
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Frontend URL: `http://localhost:3000`

## Single-Link Vercel Deployment

This repository is configured so frontend and backend run under one domain.

### What is already configured
- `vercel.json` builds frontend and rewrites `/api/*` to Python serverless entry.
- `api/index.py` exposes FastAPI app for Vercel.
- Frontend API client defaults to `/api` for same-origin requests.

### Deploy steps
1. Push this repository to GitHub.
2. Import project in Vercel from root directory.
3. Deploy.

Result example:
- App: `https://your-project.vercel.app`
- API: `https://your-project.vercel.app/api/*`

## API Endpoints

- `GET /api/` health/root metadata
- `POST /api/predict-emission`
- `POST /api/predict-risk`
- `POST /api/detect-fraud`
- `POST /api/optimize`
- `POST /api/forecast`
- `POST /api/copilot`
- `POST /api/voice`
- `GET /api/map-data`
- `GET /api/climate-risk-zones`
- `GET /api/leaderboard`
- `GET /api/marketplace/listings`
- `POST /api/marketplace/purchase`
- `POST /api/upload-image`
- `GET /api/realtime-emission`

## Current Limitations

- Marketplace and leaderboard are static inventory/rank feeds in code (not yet DB-backed).
- Image analysis uses deterministic-demo logic unless upgraded to a CV model pipeline.
- Real-time emissions are simulated live values; integrate IoT/SCADA stream for production.

## Future Enhancements

- Multi-tenant auth and role-based dashboards.
- Database-backed project registry and transactions.
- Event streaming (Kafka/WebSocket) for true telemetry ingestion.
- Third-party registry integrations (Verra/Gold Standard APIs).
- India regulatory reporting templates and compliance exports.
