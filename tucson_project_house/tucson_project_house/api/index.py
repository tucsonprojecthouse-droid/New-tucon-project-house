"""
api/index.py
------------
Vercel's Python runtime looks for a file under /api and expects it to
expose a WSGI-compatible "app" object. This file just imports the real
Flask app created in app.py at the project root — no logic lives here.
"""

import sys
import os

# Make the project root importable (so "from app import create_app" works).
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from app import create_app

app = create_app()
