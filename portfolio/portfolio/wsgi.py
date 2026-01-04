"""
WSGI config for portfolio project.

It exposes the WSGI callable as a module-level variable named ``application``.
"""

import os
import sys
from pathlib import Path

# Add the portfolio directory to Python path for Vercel
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT_DIR / "portfolio"))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio.settings")

application = get_wsgi_application()

# Vercel requires this to be named 'app'
app = application
