"""Vercel serverless entrypoint for TerraQuant FastAPI backend."""

import os
import sys

# Make backend modules importable when running in Vercel serverless runtime.
CURRENT_DIR = os.path.dirname(__file__)
BACKEND_DIR = os.path.abspath(os.path.join(CURRENT_DIR, "..", "backend"))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from app import app  # noqa: E402,F401
