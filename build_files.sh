#!/bin/bash

# Build script for Vercel deployment
pip install -r requirements.txt

# Collect static files
cd portfolio
python ../manage.py collectstatic --noinput
