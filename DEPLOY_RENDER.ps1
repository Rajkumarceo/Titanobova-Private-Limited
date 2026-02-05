# Render Backend Deployment Script
# This script provides steps to deploy Django backend to Render

Write-Host "=== Titanobova Backend Deployment to Render ===" -ForegroundColor Green

# Check Django health
Write-Host "`nChecking Django setup..." -ForegroundColor Yellow
$djangoPath = ".\titanobova-django"
Push-Location $djangoPath

python manage.py check
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Django check failed!" -ForegroundColor Red
    Pop-Location
    exit 1
}
Write-Host "✓ Django checks passed" -ForegroundColor Green

# Check requirements.txt
Write-Host "`nVerifying requirements.txt..." -ForegroundColor Yellow
if (Test-Path "requirements.txt") {
    Write-Host "✓ requirements.txt found" -ForegroundColor Green
    Select-String "gunicorn" requirements.txt | ForEach-Object { Write-Host "  ✓ $_" -ForegroundColor Cyan }
} else {
    Write-Host "✗ requirements.txt not found!" -ForegroundColor Red
    Pop-Location
    exit 1
}

# Check Procfile
Write-Host "`nVerifying Procfile..." -ForegroundColor Yellow
if (Test-Path "Procfile") {
    Write-Host "✓ Procfile found:" -ForegroundColor Green
    Get-Content Procfile | ForEach-Object { Write-Host "  $_" -ForegroundColor Cyan }
} else {
    Write-Host "✗ Procfile not found!" -ForegroundColor Red
    Pop-Location
    exit 1
}

# Check runtime.txt
Write-Host "`nVerifying runtime.txt..." -ForegroundColor Yellow
if (Test-Path "runtime.txt") {
    Write-Host "✓ runtime.txt found:" -ForegroundColor Green
    Get-Content runtime.txt | ForEach-Object { Write-Host "  $_" -ForegroundColor Cyan }
} else {
    Write-Host "✗ runtime.txt not found!" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location

Write-Host "`n" -ForegroundColor Green
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║           NEXT STEPS: Deploy to Render                         ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host @"

Step 1: Git Push
───────────────
Code is already on GitHub. Render will auto-deploy on push.

To ensure latest changes are pushed:
  git status
  git add -A
  git commit -m "Backend deployment ready"
  git push origin main

Step 2: Create PostgreSQL Database
──────────────────────────────────
1. Go to https://render.com
2. Click "New+" → "PostgreSQL"
3. Name: titanobova-db
4. Database: titanobova_db
5. Accept defaults
6. Click "Create Database"
7. Save the Internal Database URL from connection info

Step 3: Create Web Service
──────────────────────────
1. Click "New+" → "Web Service"
2. Select your GitHub repo: Rajkumarceo/Titanobova-Private-Limited
3. Settings:
   - Name: titanobova-api
   - Root Directory: titanobova-django
   - Runtime: Python 3
   - Build command:
     pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
   - Start command:
     gunicorn titanobova_project.wsgi:application --bind 0.0.0.0:\$PORT
4. Select Environment (Free tier available)
5. Click "Create Web Service"

Step 4: Add Environment Variables
──────────────────────────────────
In Render dashboard, go to "Environment" tab and add:

CRITICAL VARIABLES:
  DEBUG = False
  SECRET_KEY = (Generate at: https://djecrety.ir/)
  ALLOWED_HOSTS = your-service-name.onrender.com,localhost
  
CORS CONFIGURATION:
  CORS_ALLOWED_ORIGINS = https://your-netlify-domain.netlify.app

DATABASE VARIABLES (from PostgreSQL service):
  DB_ENGINE = django.db.backends.postgresql
  DB_NAME = titanobova_db
  DB_USER = (from Postgres connection info)
  DB_PASSWORD = (from Postgres connection info)
  DB_HOST = (Internal host from Postgres)
  DB_PORT = 5432

OPTIONAL (for email/monitoring):
  SENDGRID_API_KEY = (if using SendGrid)
  SENTRY_DSN = (if using Sentry error tracking)

Step 5: Deploy
──────────────
After adding environment variables, Render will auto-deploy.
Monitor the deployment in Render dashboard (5-10 minutes).

Step 6: Test Backend
────────────────────
Once deployed:
  1. Visit: https://your-service-name.onrender.com/admin/
     Username: admin
     Password: titanobova

  2. Test API:
     curl https://your-service-name.onrender.com/api/v1/courses/

Step 7: Update Netlify
──────────────────────
1. Go to Netlify site settings
2. Environment variables
3. Set VITE_API_URL = https://your-service-name.onrender.com/api/v1
4. Netlify will auto-redeploy

✓ YOU'RE LIVE!
──────────────
After both Netlify and Render are deployed:
  Frontend: https://your-site.netlify.app
  Backend: https://your-api.onrender.com
  Admin: https://your-api.onrender.com/admin/

"@ -ForegroundColor Cyan

Write-Host "`nOpen Render dashboard?" -ForegroundColor Yellow
Write-Host "Command line instructions provided above." -ForegroundColor Green
