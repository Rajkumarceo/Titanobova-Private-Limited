# Netlify Frontend Deployment Script
# This script automates Netlify deployment using Netlify CLI

Write-Host "=== Titanobova Frontend Deployment to Netlify ===" -ForegroundColor Green

# Check if Netlify CLI is installed
Write-Host "`nChecking for Netlify CLI..." -ForegroundColor Yellow
$netlifyCheck = netlify --version 2>$null
if (-not $netlifyCheck) {
    Write-Host "Netlify CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g netlify-cli
}

# Check if Node/npm is available
Write-Host "`nChecking Node.js and npm..." -ForegroundColor Yellow
node --version
npm --version

# Navigate to frontend directory
$frontendPath = ".\titanobova-website\app\frontend"
Push-Location $frontendPath
Write-Host "`nWorking in: $(Get-Location)" -ForegroundColor Cyan

# Install dependencies
Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Yellow
npm ci

# Build frontend
Write-Host "`nBuilding frontend for production..." -ForegroundColor Yellow
npm run build

# Check if build succeeded
if (Test-Path "dist") {
    Write-Host "`n✓ Build successful! Output: dist/" -ForegroundColor Green
} else {
    Write-Host "`n✗ Build failed!" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location

# Netlify CLI commands
Write-Host "`n" -ForegroundColor Green
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║           NEXT STEPS: Deploy to Netlify                        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host @"

Option 1: AUTOMATIC DEPLOYMENT (Recommended)
─────────────────────────────────────────────
Run this command to connect to Netlify and deploy:

  netlify deploy --prod --dir=titanobova-website/app/frontend/dist

This will:
1. Open browser for GitHub authentication
2. Connect your GitHub repo
3. Deploy to Netlify with production URL

Option 2: MANUAL DEPLOYMENT (Using UI)
──────────────────────────────────────
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Select your GitHub repo: Rajkumarceo/Titanobova-Private-Limited
4. Base directory: titanobova-website/app/frontend
5. Build command: npm ci && npm run build
6. Publish directory: dist
7. Click Deploy to see your site

After deployment:
1. Note your Netlify domain (e.g., https://yoursite.netlify.app)
2. Add environment variable: VITE_API_URL
3. Set value to: https://<your-render-backend-domain>/api/v1
4. Redeploy

"@ -ForegroundColor Cyan

Write-Host "Ready to deploy? Press Enter to continue..." -ForegroundColor Yellow
Read-Host

Write-Host "`nStarting Netlify deployment..." -ForegroundColor Green
netlify deploy --prod --dir=titanobova-website/app/frontend/dist

Write-Host "`n✓ Frontend deployment complete!" -ForegroundColor Green
