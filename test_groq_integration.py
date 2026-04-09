#!/usr/bin/env python
"""
Test Groq API Integration for TerraQuant
Verifies that the Groq API is properly configured and working
"""

import asyncio
import os
import sys
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_path))

from dotenv import load_dotenv
from copilot import get_copilot_response, GROQ_API_KEY, GROQ_MODEL

def test_configuration():
    """Test if configuration is loaded correctly"""
    print("\n🔧 Testing Groq Integration Configuration\n")
    print(f"✓ API Key configured: {'Yes' if GROQ_API_KEY else 'No'}")
    if GROQ_API_KEY:
        print(f"  - Key preview: {GROQ_API_KEY[:10]}...")
    print(f"✓ Model configured: {GROQ_MODEL}")
    return GROQ_API_KEY is not None

async def test_copilot():
    """Test copilot response"""
    print("\n🤖 Testing Copilot Response\n")
    try:
        response = await get_copilot_response("What is carbon footprint?")
        print(f"✓ Response received ({len(response)} chars)")
        print(f"  - Preview: {response[:60]}...")
        return True
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        return False

async def main():
    print("\n" + "="*50)
    print("TerraQuant Groq API Integration Test")
    print("="*50)
    
    # Test configuration
    config_ok = test_configuration()
    
    if not config_ok:
        print("\n⚠️  Warning: GROQ_API_KEY not configured!")
        print("Please ensure .env file has EXPO_PUBLIC_GROQ_API_KEY set")
        return False
    
    # Test copilot
    result = await test_copilot()
    
    if result:
        print("\n" + "="*50)
        print("✓ All tests passed! Groq integration is ready.")
        print("="*50 + "\n")
    else:
        print("\n" + "="*50)
        print("✗ Some tests failed. Please check configuration.")
        print("="*50 + "\n")
    
    return result

if __name__ == "__main__":
    load_dotenv()
    success = asyncio.run(main())
    sys.exit(0 if success else 1)
