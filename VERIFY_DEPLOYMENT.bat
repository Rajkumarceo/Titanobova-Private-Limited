@echo off
REM Quick Deployment Verification Script

echo.
echo ============================================================
echo         Titanobova Pre-Deployment Verification
echo ============================================================
echo.

setlocal enabledelayedexpansion
set "pass=0"
set "fail=0"

REM Check critical files
echo [1] CRITICAL FILES
echo ────────────────────────────────────────────────────────────

set files=titanobova-django\Procfile titanobова-django\runtime.txt titanobova-website\app\frontend\netlify.toml DEPLOYMENT_GUIDE_NETLIFY_RENDER.md ENV_VARIABLES_TEMPLATE.md

for %%F in (%files%) do (
    if exist "%%F" (
        echo   √ %%F
        set /a "pass+=1"
    ) else (
        echo   X %%F (MISSING)
        set /a "fail+=1"
    )
)

REM Check git
echo.
echo [2] GIT REPOSITORY
echo ────────────────────────────────────────────────────────────
git status > nul 2>&1
if !errorlevel! equ 0 (
    echo   √ Git repository found
    set /a "pass+=1"
) else (
    echo   X Git repository not found
    set /a "fail+=1"
)

REM Check Django
echo.
echo [3] DJANGO SETUP
echo ────────────────────────────────────────────────────────────
cd titanobova-django
python manage.py check > nul 2>&1
if !errorlevel! equ 0 (
    echo   √ Django system check passed
    set /a "pass+=1"
) else (
    echo   X Django system check failed
    set /a "fail+=1"
)
cd ..

REM Check requirements
echo.
echo [4] DEPENDENCIES
echo ────────────────────────────────────────────────────────────
findstr /M "gunicorn" titanobova-django\requirements.txt > nul 2>&1
if !errorlevel! equ 0 (
    echo   √ Gunicorn found
    set /a "pass+=1"
) else (
    echo   X Gunicorn missing
    set /a "fail+=1"
)

REM Summary
echo.
echo ============================================================
echo                     SUMMARY
echo ============================================================
echo Tests Passed: !pass!
echo Tests Failed: !fail!

if !fail! equ 0 (
    echo.
    echo √ YOU'RE READY TO DEPLOY!
    echo.
    echo Next Steps:
    echo   1. COMPLETE_DEPLOYMENT_GUIDE.md
    echo   2. DEPLOY_NETLIFY.ps1
    echo   3. DEPLOY_RENDER.ps1
) else (
    echo.
    echo ! Please fix the issues above before deploying
)

pause
