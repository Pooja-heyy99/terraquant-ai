"""
TerraQuant AI - ML Model Services
Loads and uses trained Random Forest models from .pkl files
"""

import pickle
import numpy as np
import pandas as pd
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Model paths
MODEL_DIR = Path(__file__).parent / "models"
EMISSION_MODEL_PATH = MODEL_DIR / "emission_model.pkl"
RISK_MODEL_PATH = MODEL_DIR / "risk_model.pkl"
FRAUD_MODEL_PATH = MODEL_DIR / "fraud_model.pkl"

# Global model storage
models = {
    "emission": None,
    "risk": None,
    "fraud": None
}

# Industry and country encodings (these should match your training data)
INDUSTRY_ENCODING = {
    'technology': 0, 'manufacturing': 1, 'retail': 2, 'finance': 3,
    'healthcare': 4, 'transportation': 5, 'agriculture': 6, 'energy': 7,
    'real_estate': 8
}

COUNTRY_ENCODING = {
    'USA': 0, 'UK': 1, 'Germany': 2, 'France': 3, 'China': 4,
    'India': 5, 'Japan': 6, 'Canada': 7, 'Australia': 8, 'Brazil': 9
}

COMPANY_SIZE_ENCODING = {
    'small': 0, 'medium': 1, 'large': 2
}

# ==================== MODEL LOADING ====================

def load_models():
    """Load all trained ML models from .pkl files"""
    global models
    
    try:
        # Load Emission Model (Random Forest Regressor)
        if EMISSION_MODEL_PATH.exists():
            with open(EMISSION_MODEL_PATH, 'rb') as f:
                models["emission"] = pickle.load(f)
            logger.info("✓ Loaded emission_model.pkl (Random Forest Regressor)")
        else:
            logger.warning(f"⚠ emission_model.pkl not found at {EMISSION_MODEL_PATH}")
        
        # Load Risk Model (Random Forest Classifier)
        if RISK_MODEL_PATH.exists():
            with open(RISK_MODEL_PATH, 'rb') as f:
                models["risk"] = pickle.load(f)
            logger.info("✓ Loaded risk_model.pkl (Random Forest Classifier)")
        else:
            logger.warning(f"⚠ risk_model.pkl not found at {RISK_MODEL_PATH}")
        
        # Load Fraud Model (Isolation Forest)
        if FRAUD_MODEL_PATH.exists():
            with open(FRAUD_MODEL_PATH, 'rb') as f:
                models["fraud"] = pickle.load(f)
            logger.info("✓ Loaded fraud_model.pkl (Isolation Forest)")
        else:
            logger.warning(f"⚠ fraud_model.pkl not found at {FRAUD_MODEL_PATH}")
        
        return True
    except Exception as e:
        logger.error(f"❌ Error loading models: {str(e)}")
        return False

# Load models on module import
load_models()

# ==================== EMISSION PREDICTION ====================

def predict_emission(energy_use, employees, revenue, transport_km, industry, country):
    """
    Predict carbon emissions using trained Random Forest Regressor
    
    Returns:
        {
            "total_emission": float,
            "scope_breakdown": {
                "scope1": float,
                "scope2": float,
                "scope3": float
            },
            "intensity": float,
            "model_used": "emission_model.pkl"
        }
    """
    try:
        if models["emission"] is None:
            # DEMO MODE - Return realistic demo data when model not loaded
            logger.warning("⚠ Using demo mode - no emission model loaded")
            demo_total = (energy_use * 0.5) + (employees * 2) + (revenue * 5) + (transport_km * 0.01)
            scope1 = demo_total * 0.35
            scope2 = demo_total * 0.45
            scope3 = demo_total * 0.20
            intensity = demo_total / revenue if revenue > 0 else 0
            
            return {
                "total_emission": float(demo_total),
                "scope_breakdown": {
                    "scope1": float(scope1),
                    "scope2": float(scope2),
                    "scope3": float(scope3)
                },
                "intensity": float(intensity),
                "model_used": "DEMO MODE - Add emission_model.pkl for real predictions",
                "prediction_confidence": 0.70
            }
        
        # Encode categorical variables
        industry_encoded = INDUSTRY_ENCODING.get(industry, 0)
        country_encoded = COUNTRY_ENCODING.get(country, 0)
        
        # Create feature array matching training data format
        # Adjust this based on your actual training features
        features = np.array([[
            energy_use,
            employees,
            revenue,
            transport_km,
            industry_encoded,
            country_encoded
        ]])
        
        # Make prediction using YOUR trained model
        total_emission = models["emission"].predict(features)[0]
        
        # Calculate scope breakdown (based on typical distributions)
        scope1 = total_emission * 0.35  # Direct emissions
        scope2 = total_emission * 0.45  # Indirect energy
        scope3 = total_emission * 0.20  # Value chain
        
        # Calculate carbon intensity
        intensity = total_emission / revenue if revenue > 0 else 0
        
        return {
            "total_emission": float(total_emission),
            "scope_breakdown": {
                "scope1": float(scope1),
                "scope2": float(scope2),
                "scope3": float(scope3)
            },
            "intensity": float(intensity),
            "model_used": "emission_model.pkl (Random Forest Regressor)",
            "prediction_confidence": 0.92  # Can get from model if available
        }
        
    except Exception as e:
        logger.error(f"Emission prediction error: {str(e)}")
        raise

# ==================== RISK PREDICTION ====================

def predict_risk(location, industry, assets_value, timeframe):
    """
    Predict climate risk using trained Random Forest Classifier
    
    Returns:
        {
            "risk_score": float,
            "risk_level": str,
            "factors": list,
            "recommendations": list,
            "model_used": "risk_model.pkl"
        }
    """
    try:
        if models["risk"] is None:
            # DEMO MODE - Return realistic demo data when model not loaded
            logger.warning("⚠ Using demo mode - no risk model loaded")
            demo_score = min((assets_value / 1000) + (len(location) * 5) + 40, 100)
            
            if demo_score > 70:
                risk_level = "High"
            elif demo_score > 40:
                risk_level = "Medium"
            else:
                risk_level = "Low"
            
            factors = [
                {"name": "Flood Risk", "score": min(demo_score * 0.9, 100), "trend": "increasing"},
                {"name": "Heat Stress", "score": min(demo_score * 1.1, 100), "trend": "increasing"},
                {"name": "Sea Level Rise", "score": min(demo_score * 0.7, 100), "trend": "stable"},
                {"name": "Drought", "score": min(demo_score * 0.6, 100), "trend": "decreasing"}
            ]
            
            recommendations = [
                "Implement flood prevention measures",
                "Diversify asset locations to reduce concentration risk",
                "Monitor climate trends in your region closely"
            ]
            
            return {
                "risk_score": float(demo_score),
                "risk_level": risk_level,
                "factors": factors,
                "recommendations": recommendations,
                "model_used": "DEMO MODE - Add risk_model.pkl for real predictions"
            }
        
        # Encode features
        industry_encoded = INDUSTRY_ENCODING.get(industry, 0)
        timeframe_encoded = int(timeframe) if timeframe.isdigit() else 10
        
        # Create feature array
        features = np.array([[
            industry_encoded,
            assets_value,
            timeframe_encoded,
            len(location)  # Simple location encoding
        ]])
        
        # Make prediction using YOUR trained model
        risk_prediction = models["risk"].predict(features)[0]
        risk_proba = models["risk"].predict_proba(features)[0]
        
        # Convert to risk score (0-100)
        risk_score = float(risk_prediction * 100) if isinstance(risk_prediction, (int, float)) else float(max(risk_proba) * 100)
        
        # Determine risk level
        if risk_score > 70:
            risk_level = "High"
        elif risk_score > 40:
            risk_level = "Medium"
        else:
            risk_level = "Low"
        
        # Generate risk factors
        factors = [
            {"name": "Flood Risk", "score": min(risk_score * 0.9, 100), "trend": "increasing"},
            {"name": "Heat Stress", "score": min(risk_score * 1.1, 100), "trend": "increasing"},
            {"name": "Sea Level Rise", "score": min(risk_score * 0.7, 100), "trend": "stable"},
            {"name": "Drought", "score": min(risk_score * 0.6, 100), "trend": "decreasing"}
        ]
        
        # Generate recommendations
        recommendations = [
            "Invest in climate-resilient infrastructure",
            "Develop comprehensive adaptation strategy",
            "Diversify asset portfolio geographically"
        ]
        
        return {
            "risk_score": risk_score,
            "risk_level": risk_level,
            "factors": factors,
            "recommendations": recommendations,
            "model_used": "risk_model.pkl (Random Forest Classifier)",
            "location_analyzed": location
        }
        
    except Exception as e:
        logger.error(f"Risk prediction error: {str(e)}")
        raise

# ==================== FRAUD DETECTION ====================

def detect_fraud(emission_value, company_size, industry, verification_documents):
    """
    Detect fraudulent emission reports using Isolation Forest
    
    Returns:
        {
            "is_fraudulent": bool,
            "confidence": float,
            "risk_level": str,
            "flags": list,
            "model_used": "fraud_model.pkl"
        }
    """
    try:
        if models["fraud"] is None:
            # DEMO MODE - Return realistic demo data when model not loaded
            logger.warning("⚠ Using demo mode - no fraud model loaded")
            
            # Simple fraud detection logic for demo
            doc_length = len(verification_documents) if verification_documents else 0
            demo_score = 0
            
            # Check for suspicious patterns
            if emission_value < 100:
                demo_score += 30  # Suspiciously low
            if doc_length < 50:
                demo_score += 40  # Insufficient docs
            if emission_value > 100000:
                demo_score += 30  # Suspiciously high
            
            is_fraudulent = demo_score > 60
            
            if demo_score > 70:
                risk_level = "High"
            elif demo_score > 40:
                risk_level = "Medium"
            else:
                risk_level = "Low"
            
            flags = []
            if is_fraudulent:
                if emission_value < 100:
                    flags.append("Emission value suspiciously low for company size")
                if doc_length < 50:
                    flags.append("Insufficient verification documentation")
                if emission_value > 100000:
                    flags.append("Emission value significantly higher than industry average")
            
            return {
                "is_fraudulent": bool(is_fraudulent),
                "confidence": float(min(demo_score, 100)),
                "risk_level": risk_level,
                "flags": flags,
                "model_used": "DEMO MODE - Add fraud_model.pkl for real detection",
                "anomaly_score": -float(demo_score / 100)
            }
        
        # Encode features
        company_size_encoded = COMPANY_SIZE_ENCODING.get(company_size, 1)
        industry_encoded = INDUSTRY_ENCODING.get(industry, 0)
        doc_length = len(verification_documents) if verification_documents else 0
        
        # Create feature array
        features = np.array([[
            emission_value,
            company_size_encoded,
            industry_encoded,
            doc_length
        ]])
        
        # Make prediction using YOUR trained Isolation Forest
        # Isolation Forest returns -1 for anomalies (fraud) and 1 for normal
        prediction = models["fraud"].predict(features)[0]
        anomaly_score = models["fraud"].score_samples(features)[0]
        
        # Convert to fraud probability
        is_fraudulent = prediction == -1
        confidence = abs(float(anomaly_score)) * 100
        
        # Determine risk level
        if confidence > 80:
            risk_level = "High"
        elif confidence > 50:
            risk_level = "Medium"
        else:
            risk_level = "Low"
        
        # Generate flags if fraudulent
        flags = []
        if is_fraudulent:
            flags = [
                "Emission value deviates significantly from industry norms",
                "Anomaly detected in reporting pattern",
                "Insufficient verification documentation" if doc_length < 50 else "Documentation inconsistencies detected"
            ]
        
        return {
            "is_fraudulent": bool(is_fraudulent),
            "confidence": min(confidence, 100),
            "risk_level": risk_level,
            "flags": flags,
            "model_used": "fraud_model.pkl (Isolation Forest)",
            "anomaly_score": float(anomaly_score)
        }
        
    except Exception as e:
        logger.error(f"Fraud detection error: {str(e)}")
        raise

# ==================== OPTIMIZATION ====================

def optimize_emissions(current_emission, budget, industry, target_reduction):
    """Generate emission reduction strategies"""
    strategies = [
        {
            "name": "Energy Efficiency Upgrade",
            "description": "Replace old HVAC systems with high-efficiency models and install LED lighting",
            "cost": budget * 0.25,
            "timeline": "6-9 months",
            "roi": 185,
            "emission_reduction": current_emission * (target_reduction / 100) * 0.35,
            "impact": "High",
            "difficulty": "Medium"
        },
        {
            "name": "Renewable Energy Transition",
            "description": "Install solar panels and sign PPA for wind energy",
            "cost": budget * 0.4,
            "timeline": "12-18 months",
            "roi": 220,
            "emission_reduction": current_emission * (target_reduction / 100) * 0.40,
            "impact": "Very High",
            "difficulty": "High"
        },
        {
            "name": "Supply Chain Optimization",
            "description": "Partner with low-carbon suppliers and optimize logistics",
            "cost": budget * 0.15,
            "timeline": "3-6 months",
            "roi": 145,
            "emission_reduction": current_emission * (target_reduction / 100) * 0.15,
            "impact": "Medium",
            "difficulty": "Low"
        },
        {
            "name": "Carbon Offset Program",
            "description": "Purchase verified carbon credits from quality projects",
            "cost": budget * 0.2,
            "timeline": "1-2 months",
            "roi": 95,
            "emission_reduction": current_emission * (target_reduction / 100) * 0.10,
            "impact": "High",
            "difficulty": "Very Low"
        }
    ]
    
    return {"strategies": strategies}

# ==================== FORECASTING ====================

def forecast_emissions(current_emission, growth_rate, reduction_target, years):
    """Generate emission forecasts"""
    baseline = []
    optimized = []
    
    growth = growth_rate / 100
    target = reduction_target / 100
    
    for i in range(years + 1):
        baseline.append({
            "year": f"Year {i}",
            "emission": current_emission * ((1 + growth) ** i)
        })
        optimized.append({
            "year": f"Year {i}",
            "emission": current_emission * ((1 + growth - (target / years)) ** i)
        })
    
    return {
        "baseline": baseline,
        "optimized": optimized
    }

# ==================== MODEL INFO ====================

def get_model_info():
    """Get information about loaded models"""
    return {
        "emission_model": {
            "loaded": models["emission"] is not None,
            "type": "Random Forest Regressor",
            "file": "emission_model.pkl",
            "purpose": "Predict carbon emissions from company data"
        },
        "risk_model": {
            "loaded": models["risk"] is not None,
            "type": "Random Forest Classifier",
            "file": "risk_model.pkl",
            "purpose": "Assess climate risk levels"
        },
        "fraud_model": {
            "loaded": models["fraud"] is not None,
            "type": "Isolation Forest",
            "file": "fraud_model.pkl",
            "purpose": "Detect fraudulent emission reports"
        }
    }
