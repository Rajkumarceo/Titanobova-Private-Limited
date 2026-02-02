#!/usr/bin/env pwsh
<#
.SYNOPSIS
Start Titanobova Website - Frontend + Backend on Single Port

.DESCRIPTION
This script starts the unified Django server on localhost:8000
Visit http://localhost:8000 in your browser

Press CTRL+C to stop the server
#>

Write-Host ""
Write-Host "========================================"
Write-Host "Starting Titanobova SaaS Platform"
Write-Host "========================================"
Write-Host ""
Write-Host "Frontend:  http://localhost:8000"
Write-Host "API:       http://localhost:8000/api/v1"
Write-Host "Admin:     http://localhost:8000/admin"
Write-Host ""
Write-Host "Login: admin / titanobova"
Write-Host ""
Write-Host "Press CTRL+C to stop the server"
Write-Host "========================================"
Write-Host ""

Set-Location "titanobova-django"
python manage.py runserver localhost:8000
