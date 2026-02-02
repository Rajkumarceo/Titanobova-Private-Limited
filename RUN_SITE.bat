@echo off
REM Start Titanobova Website - Frontend + Backend on Single Port
REM
REM This script starts the unified Django server on localhost:8000
REM Visit http://localhost:8000 in your browser
REM
REM Press CTRL+C to stop the server

cd titanobova-django
echo.
echo ========================================
echo Starting Titanobova SaaS Platform
echo ========================================
echo.
echo Frontend:  http://localhost:8000
echo API:       http://localhost:8000/api/v1
echo Admin:     http://localhost:8000/admin
echo.
echo Login: admin / titanobova
echo.
echo Press CTRL+C to stop the server
echo ========================================
echo.

python manage.py runserver localhost:8000

pause
