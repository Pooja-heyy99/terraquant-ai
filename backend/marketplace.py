"""
TerraQuant AI - Marketplace Service
Carbon credit trading platform
"""

def get_listings():
    """Get available carbon credit listings"""
    return [
        {
            "id": 1,
            "name": "Amazon Rainforest Conservation",
            "price": 45.50,
            "credits": 100,
            "location": "Brazil",
            "region": "LATAM",
            "type": "Forestry",
            "verified": True,
            "description": "Protect 500 hectares of Amazon rainforest",
            "certification": "Verra VCS",
            "vintage": 2023,
            "methodology": "REDD+",
            "impact_score": 89,
            "risk_band": "Medium"
        },
        {
            "id": 2,
            "name": "Solar Farm Development",
            "price": 32.75,
            "credits": 75,
            "location": "California, USA",
            "region": "North America",
            "type": "Renewable Energy",
            "verified": True,
            "description": "50MW solar installation replacing coal power",
            "certification": "Gold Standard",
            "vintage": 2022,
            "methodology": "Grid Displacement",
            "impact_score": 78,
            "risk_band": "Low"
        },
        {
            "id": 3,
            "name": "Wind Energy Project",
            "price": 38.20,
            "credits": 85,
            "location": "Denmark",
            "region": "Europe",
            "type": "Renewable Energy",
            "verified": True,
            "description": "Offshore wind farm generating clean energy",
            "certification": "Gold Standard",
            "vintage": 2024,
            "methodology": "Wind Baseload Substitution",
            "impact_score": 83,
            "risk_band": "Low"
        },
        {
            "id": 4,
            "name": "Mangrove Restoration",
            "price": 28.90,
            "credits": 60,
            "location": "Indonesia",
            "region": "APAC",
            "type": "Coastal Protection",
            "verified": True,
            "description": "Restore 300 hectares of mangrove forests",
            "certification": "Verra VCS",
            "vintage": 2021,
            "methodology": "Blue Carbon",
            "impact_score": 92,
            "risk_band": "Medium"
        },
        {
            "id": 5,
            "name": "Community Cookstoves",
            "price": 18.50,
            "credits": 40,
            "location": "Kenya",
            "region": "Africa",
            "type": "Community",
            "verified": True,
            "description": "Distribute efficient cookstoves to 5,000 families",
            "certification": "Gold Standard",
            "vintage": 2020,
            "methodology": "Household Energy Efficiency",
            "impact_score": 74,
            "risk_band": "Medium"
        },
        {
            "id": 6,
            "name": "Biogas Plant",
            "price": 52.00,
            "credits": 120,
            "location": "India",
            "region": "India",
            "type": "Waste Management",
            "verified": True,
            "description": "Convert agricultural waste to clean energy",
            "certification": "Verra VCS",
            "vintage": 2024,
            "methodology": "Methane Avoidance",
            "impact_score": 87,
            "risk_band": "Low"
        },
        {
            "id": 7,
            "name": "Rajasthan Solar Storage Cluster",
            "price": 34.10,
            "credits": 95,
            "location": "Rajasthan, India",
            "region": "India",
            "type": "Renewable Energy",
            "verified": True,
            "description": "Hybrid solar and storage micro-grid replacing diesel backup",
            "certification": "Gold Standard",
            "vintage": 2025,
            "methodology": "Grid and Diesel Replacement",
            "impact_score": 85,
            "risk_band": "Low"
        },
        {
            "id": 8,
            "name": "Gujarat Industrial Waste Heat Recovery",
            "price": 26.80,
            "credits": 150,
            "location": "Gujarat, India",
            "region": "India",
            "type": "Waste Management",
            "verified": True,
            "description": "Capture industrial waste heat to reduce fossil fuel dependence",
            "certification": "Verra VCS",
            "vintage": 2023,
            "methodology": "Industrial Energy Efficiency",
            "impact_score": 81,
            "risk_band": "Medium"
        }
    ]

def purchase_credits(listing_id: int, quantity: int):
    """Purchase carbon credits"""
    listings = get_listings()
    listing = next((l for l in listings if l["id"] == listing_id), None)
    
    if not listing:
        raise ValueError(f"Listing {listing_id} not found")
    
    if quantity > listing["credits"]:
        raise ValueError(f"Only {listing['credits']} credits available")
    
    total_cost = quantity * listing["price"]
    
    return {
        "success": True,
        "transaction_id": f"TXN-{listing_id}-{quantity}",
        "quantity": quantity,
        "total_cost": total_cost,
        "credits_remaining": listing["credits"] - quantity,
        "message": f"Successfully purchased {quantity} carbon credits for ${total_cost:.2f}"
    }
