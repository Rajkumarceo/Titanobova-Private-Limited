@echo off
REM Titanobova Public Access Setup

echo ========================================
echo Titanobova Site Public Access
echo ========================================
echo.

echo Starting localtunnel for Frontend (Port 5173)...
start cmd /k "npx localtunnel --port 5173 --print-requests --subdomain titanobova-frontend"

timeout /t 3 /nobreak

echo Starting localtunnel for Backend (Port 8000)...
start cmd /k "npx localtunnel --port 8000 --print-requests --subdomain titanobova-api"

echo.
echo ========================================
echo Tunnels are starting...
echo Check the opened terminals for public URLs
echo ========================================
echo.
echo Keep these terminals open to maintain access
pause
