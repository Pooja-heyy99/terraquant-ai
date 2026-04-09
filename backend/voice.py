"""
TerraQuant AI - Voice Command Service
Process voice input and generate responses with navigation
"""

def process_voice_command(text: str) -> dict:
    """Process voice commands and return text response with optional navigation"""
    text_lower = text.lower()
    
    if "dashboard" in text_lower or "home" in text_lower:
        return {
            "response": "Opening the dashboard. You can see your real-time emissions and key metrics there.",
            "route": "/"
        }
    
    elif "calculate" in text_lower or "predict" in text_lower or "emission" in text_lower:
        return {
            "response": "Opening the emission predictor. Enter your company's energy usage, employee count, and revenue to calculate your carbon footprint.",
            "route": "/emission-predictor"
        }
    
    elif "map" in text_lower:
        return {
            "response": "Opening the carbon emissions map showing global emissions hotspots and climate risk zones.",
            "route": "/map"
        }
    
    elif "buy" in text_lower or "credit" in text_lower or "marketplace" in text_lower:
        return {
            "response": "Opening the carbon credit marketplace where you can purchase verified credits from renewable energy and forestry projects.",
            "route": "/marketplace"
        }
    
    elif "leaderboard" in text_lower or "ranking" in text_lower:
        return {
            "response": "Opening the sustainability leaderboard. See how top companies are performing on ESG metrics.",
            "route": "/leaderboard"
        }
    
    elif "optimize" in text_lower or "reduce" in text_lower:
        return {
            "response": "Opening the optimization tool for AI-powered strategies to reduce your carbon emissions.",
            "route": "/optimize"
        }
    
    elif "risk" in text_lower or "climate" in text_lower:
        return {
            "response": "Opening climate risk assessment to evaluate how climate change may impact your operations.",
            "route": "/climate-risk"
        }
    
    elif "fraud" in text_lower or "detect" in text_lower:
        return {
            "response": "Opening fraud detection for carbon credit verification and anomaly detection.",
            "route": "/fraud-detector"
        }
    
    elif "image" in text_lower or "satellite" in text_lower or "upload" in text_lower:
        return {
            "response": "Opening satellite image analysis for land cover and carbon density assessment.",
            "route": "/image-upload"
        }
    
    elif "copilot" in text_lower or "ai" in text_lower or "assistant" in text_lower:
        return {
            "response": "Opening the AI Copilot. Ask me anything about carbon intelligence and sustainability.",
            "route": "/copilot"
        }
    
    elif "monitor" in text_lower or "real" in text_lower or "realtime" in text_lower:
        return {
            "response": "Opening real-time emission monitoring dashboard.",
            "route": "/realtime-monitor"
        }
    
    elif "forecast" in text_lower or "future" in text_lower:
        return {
            "response": "Opening the forecast dashboard to predict future emissions trends.",
            "route": "/forecast"
        }
    
    else:
        return {
            "response": f"I heard: {text}. You can ask me to open dashboard, map, marketplace, leaderboard, predictor, optimizer, fraud detector, or any other feature.",
            "route": None
        }
