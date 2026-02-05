# DEPLOYMENT VERIFICATION SCRIPT - SIMPLIFIED
# Quick checks that your application is ready for production deployment

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║     Titanobova Pre-Deployment Verification                    ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green

$passCount = 0
$failCount = 0

# ============================================================================
# SECTION 1: Key Files Check
# ============================================================================
Write-Host "`n[1] CRITICAL FILES" -ForegroundColor Cyan
Write-Host "─":*60

$criticalFiles = @(
    "titanobova-django/Procfile",
    "titanobova-django/runtime.txt",
    "titanobova-website/app/frontend/netlify.toml",
    "DEPLOYMENT_GUIDE_NETLIFY_RENDER.md",
    "ENV_VARIABLES_TEMPLATE.md"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "  ✗ $file (MISSING!)" -ForegroundColor Red
        $failCount++
    }
}

# ============================================================================
# SECTION 2: Git Status
# ============================================================================
Write-Host "`n[2] GIT REPOSITORY" -ForegroundColor Cyan
Write-Host "─":*60

$gitCheck = git status 2>$null | Select-String "fatal" -NotMatch
if ($gitCheck) {
    Write-Host "  ✓ Git repository initialized" -ForegroundColor Green
    $branch = git rev-parse --abbrev-ref HEAD 2>$null
    Write-Host "    Branch: $branch" -ForegroundColor Gray
    $passCount++
} else {
    Write-Host "  ✗ Git repository not initialized" -ForegroundColor Red
    $failCount++
}

# ============================================================================
# SECTION 3: Django Check
# ============================================================================
Write-Host "`n[3] DJANGO SETUP" -ForegroundColor Cyan
Write-Host "─":*60

Push-Location "titanobova-django" -ErrorAction SilentlyContinue
$djangoCheck = python manage.py check 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Django system check passed" -ForegroundColor Green
    $passCount++
} else {
    Write-Host "  ✗ Django system check failed" -ForegroundColor Red
    Write-Host "    Error: $($djangoCheck -split "`n" | Select-Object -First 1)" -ForegroundColor Gray
    $failCount++
}
Pop-Location

# ============================================================================
# SECTION 4: Dependencies
# ============================================================================
Write-Host "`n[4] DEPENDENCIES" -ForegroundColor Cyan
Write-Host "─":*60

if (Test-Path "titanobova-django/requirements.txt") {
    $reqs = Get-Content "titanobova-django/requirements.txt"
    
    if ($reqs -match "gunicorn") {
        Write-Host "  ✓ Gunicorn (production server)" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "  ✗ Gunicorn missing" -ForegroundColor Red
        $failCount++
    }
    
    if ($reqs -match "Django") {
        Write-Host "  ✓ Django" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "  ✗ Django missing" -ForegroundColor Red
        $failCount++
    }
    
    if ($reqs -match "djangorestframework") {
        Write-Host "  ✓ Django REST Framework" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "  ✗ DRF missing" -ForegroundColor Red
        $failCount++
    }
}

# ============================================================================
# SECTION 5: Frontend
# ============================================================================
Write-Host "`n[5] FRONTEND SETUP" -ForegroundColor Cyan
Write-Host "─":*60

$frontendPath = ".\titanobova-website\app\frontend"
if (Test-Path "$frontendPath/package.json") {
    Write-Host "  ✓ package.json present" -ForegroundColor Green
    $passCount++
} else {
    Write-Host "  ✗ package.json missing" -ForegroundColor Red
    $failCount++
}

if (Test-Path "$frontendPath/netlify.toml") {
    Write-Host "  ✓ netlify.toml configured" -ForegroundColor Green
    $passCount++
} else {
    Write-Host "  ✗ netlify.toml missing" -ForegroundColor Red
    $failCount++
}

# ============================================================================
# SECTION 6: Migrations
# ============================================================================
Write-Host "`n[6] DATABASE MIGRATIONS" -ForegroundColor Cyan
Write-Host "─":*60

$migrations = @(
    "titanobova-django/apps/courses/migrations/0003_enrollmentrequest.py",
    "titanobova-django/apps/courses/migrations/0004_alter_enrollmentrequest_course_level.py"
)

foreach ($mig in $migrations) {
    if (Test-Path $mig) {
        Write-Host "  ✓ $(Split-Path $mig -Leaf)" -ForegroundColor Green
        $passCount++
    } else {
        Write-Host "  ✗ $(Split-Path $mig -Leaf) (MISSING!)" -ForegroundColor Red
        $failCount++
    }
}

# ============================================================================
# SUMMARY
# ============================================================================
Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                    VERIFICATION SUMMARY                         ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green

$total = $passCount + $failCount

$passColor = if ($passCount -eq $total) { 'Green' } else { 'Yellow' }
$failColor = if ($failCount -eq 0) { 'Green' } else { 'Red' }

Write-Host "`nTests Passed:  $passCount / $total" -ForegroundColor $passColor
Write-Host "Tests Failed:  $failCount / $total" -ForegroundColor $failColor

if ($failCount -eq 0) {
    Write-Host "`n✓ APPLICATION IS READY FOR DEPLOYMENT!" -ForegroundColor Green
    Write-Host "`nNext Steps:" -ForegroundColor Cyan
    Write-Host "  1. Read: COMPLETE_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
    Write-Host "  2. Deploy Frontend: DEPLOY_NETLIFY.ps1" -ForegroundColor Cyan
    Write-Host "  3. Deploy Backend: DEPLOY_RENDER.ps1" -ForegroundColor Cyan
} else {
    Write-Host "`n⚠ ISSUES FOUND - Please fix before deploying" -ForegroundColor Yellow
}

Write-Host "`nFor detailed information, see:" -ForegroundColor Gray
Write-Host "  • COMPLETE_DEPLOYMENT_GUIDE.md" -ForegroundColor Gray
Write-Host "  • DEPLOYMENT_GUIDE_NETLIFY_RENDER.md" -ForegroundColor Gray
Write-Host "  • ENV_VARIABLES_TEMPLATE.md" -ForegroundColor Gray
