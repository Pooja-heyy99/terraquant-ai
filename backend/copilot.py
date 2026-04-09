"""
TerraQuant AI - Copilot Service
AI-powered chatbot using Groq API
"""

import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Configure Groq API
GROQ_API_KEY = os.getenv("EXPO_PUBLIC_GROQ_API_KEY")
GROQ_MODEL = os.getenv("EXPO_PUBLIC_GROQ_MODEL", "openai/gpt-oss-20b")

if GROQ_API_KEY:
    client = Groq(api_key=GROQ_API_KEY)
else:
    client = None
    print("⚠ Warning: EXPO_PUBLIC_GROQ_API_KEY not found in .env file")

async def get_copilot_response(message: str) -> str:
    """
    Get AI response from Groq with carbon intelligence context
    """
    try:
        if client is None:
            return get_fallback_response(message)
        
        # System context for carbon intelligence
        system_prompt = """You are TerraQuant AI Copilot, an expert in carbon emissions,
        sustainability, ESG compliance, and climate science. You help companies reduce
        their carbon footprint and achieve net-zero goals.

        Format every response in Markdown.
        Use:
        - Short headings when they improve clarity
        - Bulleted or numbered lists for steps and recommendations
        - Tables for comparisons when helpful
        - Fenced code blocks for examples, queries, or formulas
        - Bold emphasis for important terms

        Keep responses practical, structured, and easy to scan.
        Provide accurate, actionable advice on emission calculations, carbon offsetting,
        renewable energy, and sustainability strategies."""
        
        # Generate response using Groq
        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": message
                }
            ],
            temperature=0.7,
            max_tokens=1024
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"Copilot error: {str(e)}")
        return get_fallback_response(message)

def get_fallback_response(message: str) -> str:
    """Fallback responses when Groq is unavailable."""
    message_lower = message.lower()

    if "reduce" in message_lower or "lower" in message_lower:
        return """## Reduce Your Carbon Footprint

Use these strategies to lower emissions:

1. **Energy efficiency**: Upgrade to LED lighting and optimize HVAC systems.
2. **Renewable energy**: Install solar panels or buy green electricity.
3. **Transportation**: Electrify fleet vehicles and promote remote work.
4. **Circular economy**: Reduce waste and increase recycling rates.
5. **Measurement**: Track emissions in real time to identify hotspots."""

    elif "scope" in message_lower:
        return """## Carbon Emissions Scopes

| Scope | Description |
| --- | --- |
| **Scope 1** | Direct emissions from owned or controlled sources, such as company vehicles and facilities. |
| **Scope 2** | Indirect emissions from purchased electricity, heat, or cooling. |
| **Scope 3** | All other indirect emissions in the value chain, including suppliers, products, and travel. |

Most companies find **70-90%** of emissions are in Scope 3."""

    elif "offset" in message_lower or "credit" in message_lower:
        return """## Carbon Offsetting Basics

1. Calculate your unavoidable emissions.
2. Purchase verified carbon credits from quality projects:
   - Reforestation and afforestation
   - Renewable energy projects
   - Methane capture
   - Direct air capture

Prefer verified credits such as **Gold Standard** or **Verra VCS**, and prioritize permanent removals over avoidance."""

    elif "esg" in message_lower:
        return """## ESG Best Practices

| Pillar | Focus |
| --- | --- |
| **Environmental** | Measure emissions, set science-based targets, and transition to renewables. |
| **Social** | Fair labor practices, community engagement, and diversity & inclusion. |
| **Governance** | Transparent reporting, ethical leadership, and stakeholder engagement. |

Strong ESG performance attracts investors and improves long-term value."""

    else:
        return """## Carbon Intelligence Assistant

I can help with:

- Emission calculations and predictions
- Carbon reduction strategies
- ESG compliance and reporting
- Climate risk assessment
- Carbon credit marketplace guidance
- Sustainability optimization

What specific aspect of carbon management can I help you with?"""
