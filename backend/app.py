"""
TerraQuant AI - The Global Operating System for the Carbon Economy
Main FastAPI Backend Server
"""

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import uvicorn
import os
import math
from datetime import datetime, timezone

# Import our services
from ai_services import (
    predict_emission, 
    predict_risk, 
    detect_fraud,
    optimize_emissions,
    forecast_emissions
)
from copilot import get_copilot_response
from marketplace import get_listings, purchase_credits
from leaderboard import get_leaderboard_data
from image_analysis import analyze_satellite_image
from voice import process_voice_command

# Initialize FastAPI app
app = FastAPI(
    title="TerraQuant AI",
    description="The Global Operating System for the Carbon Economy",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== PYDANTIC MODELS ====================

class EmissionPredictRequest(BaseModel):
    energy_use: float
    employees: int
    revenue: float
    transport_km: float
    industry: str
    country: str

class RiskPredictRequest(BaseModel):
    location: str
    industry: str
    assets_value: float
    timeframe: str

class FraudDetectRequest(BaseModel):
    emission_value: float
    company_size: str
    industry: str
    verification_documents: str

class OptimizeRequest(BaseModel):
    current_emission: float
    budget: float
    industry: str
    target_reduction: float

class ForecastRequest(BaseModel):
    current_emission: float
    growth_rate: float
    reduction_target: float
    years: int

class CopilotRequest(BaseModel):
    message: str

class VoiceRequest(BaseModel):
    text: str

class PurchaseRequest(BaseModel):
    listing_id: int
    quantity: int

# ==================== API ENDPOINTS ====================

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "TerraQuant AI",
        "tagline": "The Global Operating System for the Carbon Economy",
        "version": "1.0.0",
        "status": "operational",
        "models_loaded": True
    }

@app.post("/predict-emission")
async def predict_emission_endpoint(data: EmissionPredictRequest):
    """
    Predict carbon emissions using trained Random Forest Regressor
    Model: emission_model.pkl
    """
    try:
        result = predict_emission(
            energy_use=data.energy_use,
            employees=data.employees,
            revenue=data.revenue,
            transport_km=data.transport_km,
            industry=data.industry,
            country=data.country
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/predict-risk")
async def predict_risk_endpoint(data: RiskPredictRequest):
    """
    Predict climate risk using trained Random Forest Classifier
    Model: risk_model.pkl
    """
    try:
        result = predict_risk(
            location=data.location,
            industry=data.industry,
            assets_value=data.assets_value,
            timeframe=data.timeframe
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk prediction error: {str(e)}")

@app.post("/detect-fraud")
async def detect_fraud_endpoint(data: FraudDetectRequest):
    """
    Detect fraudulent emission reports using Isolation Forest
    Model: fraud_model.pkl
    """
    try:
        result = detect_fraud(
            emission_value=data.emission_value,
            company_size=data.company_size,
            industry=data.industry,
            verification_documents=data.verification_documents
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fraud detection error: {str(e)}")

@app.post("/optimize")
async def optimize_endpoint(data: OptimizeRequest):
    """Generate emission reduction strategies"""
    try:
        result = optimize_emissions(
            current_emission=data.current_emission,
            budget=data.budget,
            industry=data.industry,
            target_reduction=data.target_reduction
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Optimization error: {str(e)}")

@app.post("/forecast")
async def forecast_endpoint(data: ForecastRequest):
    """Generate emission forecasts"""
    try:
        result = forecast_emissions(
            current_emission=data.current_emission,
            growth_rate=data.growth_rate,
            reduction_target=data.reduction_target,
            years=data.years
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Forecast error: {str(e)}")

@app.post("/copilot")
async def copilot_endpoint(data: CopilotRequest):
    """AI Copilot chat endpoint"""
    try:
        response = await get_copilot_response(data.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Copilot error: {str(e)}")

@app.post("/voice")
async def voice_endpoint(data: VoiceRequest):
    """Process voice commands"""
    try:
        result = process_voice_command(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Voice processing error: {str(e)}")

@app.get("/map-data")
async def map_data_endpoint():
    """Get emission map data"""
    # This would typically come from a database.
    return {
        "locations": [
            {"lat": 28.6139, "lng": 77.2090, "emission": 1320, "name": "Delhi Operations Hub", "risk": "high", "country": "India"},
            {"lat": 19.0760, "lng": 72.8777, "emission": 1185, "name": "Mumbai Logistics Cluster", "risk": "medium", "country": "India"},
            {"lat": 12.9716, "lng": 77.5946, "emission": 940, "name": "Bengaluru Tech Campus", "risk": "low", "country": "India"},
            {"lat": 13.0827, "lng": 80.2707, "emission": 1240, "name": "Chennai Manufacturing Unit", "risk": "high", "country": "India"},
            {"lat": 22.5726, "lng": 88.3639, "emission": 990, "name": "Kolkata Distribution Node", "risk": "medium", "country": "India"},
            {"lat": 17.3850, "lng": 78.4867, "emission": 905, "name": "Hyderabad Innovation Park", "risk": "low", "country": "India"},
            {"lat": 40.7128, "lng": -74.0060, "emission": 1200, "name": "New York Facility", "risk": "medium", "country": "USA"},
            {"lat": 51.5074, "lng": -0.1278, "emission": 950, "name": "London Office", "risk": "low", "country": "UK"},
            {"lat": 35.6762, "lng": 139.6503, "emission": 1500, "name": "Tokyo Plant", "risk": "high", "country": "Japan"},
            {"lat": -33.8688, "lng": 151.2093, "emission": 750, "name": "Sydney Center", "risk": "low", "country": "Australia"},
            {"lat": 37.7749, "lng": -122.4194, "emission": 1100, "name": "San Francisco HQ", "risk": "medium", "country": "USA"},
        ]
    }

@app.get("/climate-risk-zones")
async def risk_zones_endpoint():
    """Get climate risk zones"""
    return {
        "zones": [
            {"lat": 28.6139, "lng": 77.2090, "risk": "critical", "name": "Delhi Heat Stress Belt", "country": "India"},
            {"lat": 19.0760, "lng": 72.8777, "risk": "high", "name": "Mumbai Coastal Flood Zone", "country": "India"},
            {"lat": 13.0827, "lng": 80.2707, "risk": "high", "name": "Chennai Cyclone Exposure Zone", "country": "India"},
            {"lat": 26.8467, "lng": 80.9462, "risk": "medium", "name": "Lucknow Heatwave Corridor", "country": "India"},
            {"lat": 34.0522, "lng": -118.2437, "risk": "medium", "name": "Los Angeles Area", "country": "USA"},
        ]
    }

@app.get("/leaderboard")
async def leaderboard_endpoint():
    """Get sustainability leaderboard"""
    try:
        return get_leaderboard_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Leaderboard error: {str(e)}")

@app.get("/marketplace/listings")
async def marketplace_listings_endpoint():
    """Get carbon credit listings"""
    try:
        listings = get_listings()
        return {"listings": listings}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Marketplace error: {str(e)}")

@app.post("/marketplace/purchase")
async def marketplace_purchase_endpoint(data: PurchaseRequest):
    """Purchase carbon credits"""
    try:
        result = purchase_credits(data.listing_id, data.quantity)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Purchase error: {str(e)}")

@app.post("/upload-image")
async def upload_image_endpoint(file: UploadFile = File(...)):
    """Analyze satellite imagery"""
    try:
        # Save uploaded file temporarily
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Analyze image
        result = analyze_satellite_image(temp_path)
        
        # Clean up
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image analysis error: {str(e)}")

@app.get("/realtime-emission")
async def realtime_emission_endpoint(city: str = "New York"):
    """Get real-time emission data for a specific city"""
    # City emission baselines (realistic hourly emissions in tCO2e/hour)
    city_data = {
        "New York": {"base": 1250, "country": "USA", "lat": 40.7128, "lon": -74.0060},
        "Tokyo": {"base": 980, "country": "Japan", "lat": 35.6762, "lon": 139.6503},
        "London": {"base": 850, "country": "UK", "lat": 51.5074, "lon": -0.1278},
        "Mumbai": {"base": 910, "country": "India", "lat": 19.0760, "lon": 72.8777},
        "Delhi": {"base": 1020, "country": "India", "lat": 28.6139, "lon": 77.2090},
        "Bengaluru": {"base": 780, "country": "India", "lat": 12.9716, "lon": 77.5946}
    }
    
    if city not in city_data:
        city = "New York"  # Default to New York
    
    city_info = city_data[city]
    now = datetime.now(timezone.utc)
    seconds_in_day = (now.hour * 3600) + (now.minute * 60) + now.second

    # Time-based waveform so data changes continuously while staying realistic.
    base = city_info["base"]
    daily_wave = 45.0 * math.sin((2 * math.pi * seconds_in_day) / 86400)
    minute_wave = 12.0 * math.sin((2 * math.pi * now.second) / 60)
    emission = base + daily_wave + minute_wave

    return {
        "emission": round(emission, 2),
        "unit": "tCO2e/hour",
        "city": city,
        "country": city_info["country"],
        "coordinates": {"lat": city_info["lat"], "lon": city_info["lon"]},
        "source": "live-simulated",
        "timestamp": now.isoformat()
    }

# ==================== SERVER STARTUP ====================

if __name__ == "__main__":
    print("=" * 60)
    print("🌍 TerraQuant AI")
    print("The Global Operating System for the Carbon Economy")
    print("=" * 60)
    print("\n📊 Loading ML Models...")
    print("   ✓ emission_model.pkl (Random Forest Regressor)")
    print("   ✓ risk_model.pkl (Random Forest Classifier)")
    print("   ✓ fraud_model.pkl (Isolation Forest)")
    print("\n🚀 Starting server at http://127.0.0.1:8000")
    print("📚 API Docs: http://127.0.0.1:8000/docs")
    print("=" * 60 + "\n")
    
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
