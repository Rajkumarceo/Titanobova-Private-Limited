# DEPLOYMENT ENVIRONMENT VARIABLES TEMPLATE
# Copy these variables to your deployment platforms

# ============================================================================
# FRONTEND ENVIRONMENT VARIABLES (Netlify)
# ============================================================================
# Set these in Netlify Dashboard → Site Settings → Build & Deploy → Environment

# Backend API URL (set after Render backend is deployed)
VITE_API_URL=https://<your-render-service>.onrender.com/api/v1

# Optional: Direct backend URL (used for specific API calls)
VITE_BACKEND_URL=https://<your-render-service>.onrender.com


# ============================================================================
# BACKEND ENVIRONMENT VARIABLES (Render)
# ============================================================================
# Set these in Render Dashboard → Web Service → Environment

## SECURITY & DEBUG
DEBUG=False
SECRET_KEY=<GENERATE_AT: https://djecrety.ir/ - copy 50+ char string>
ALLOWED_HOSTS=<your-service>.onrender.com,localhost,127.0.0.1

## CORS - CROSS-ORIGIN REQUESTS
# Allow frontend to call backend
CORS_ALLOWED_ORIGINS=https://<your-netlify-domain>.netlify.app
# Optional: Add multiple domains if needed
# CORS_ALLOWED_ORIGIN_REGEXES=https://.*\.netlify\.app

## DATABASE CONFIGURATION (PostgreSQL)
# Get these values from your Render PostgreSQL service
DB_ENGINE=django.db.backends.postgresql
DB_NAME=titanobova_db
DB_USER=<username_from_postgres_service>
DB_PASSWORD=<password_from_postgres_service>
DB_HOST=<internal_hostname_from_postgres_service>  # Important: Use Internal URL, NOT external
DB_PORT=5432

## MEDIA & STATIC FILES
STATIC_ROOT=staticfiles_collected
MEDIA_ROOT=media

## OPTIONAL: EMAIL & MONITORING
# Uncomment and fill if using third-party services

# SendGrid Email Service
# SENDGRID_API_KEY=<your_sendgrid_key>
# DEFAULT_FROM_EMAIL=noreply@titanobova.com

# Sentry Error Tracking
# SENTRY_DSN=<your_sentry_dsn>

# AWS S3 for Static/Media Files (Optional, for large deployments)
# USE_S3=True
# AWS_ACCESS_KEY_ID=<key>
# AWS_SECRET_ACCESS_KEY=<secret>
# AWS_STORAGE_BUCKET_NAME=<bucket>
# AWS_S3_REGION_NAME=us-east-1

# Stripe (if integrating payments)
# STRIPE_PUBLIC_KEY=<public_key>
# STRIPE_SECRET_KEY=<secret_key>


# ============================================================================
# HOW TO GENERATE SECRET_KEY
# ============================================================================
# Option 1: Online generator: https://djecrety.ir/
# Option 2: Python command:
#   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
# Option 3: 50+ random characters of mixed case, numbers, symbols


# ============================================================================
# DEPLOYMENT CHECKLIST
# ============================================================================
# 
# NETLIFY Frontend:
#   [ ] VITE_API_URL = https://<render-service>.onrender.com/api/v1
#   [ ] VITE_BACKEND_URL = https://<render-service>.onrender.com (optional)
#   [ ] Build runs successfully
#   [ ] Site deployed
#
# RENDER Backend:
#   [ ] PostgreSQL database created
#   [ ] DB_NAME, DB_USER, DB_PASSWORD, DB_HOST set correctly
#   [ ] DEBUG = False
#   [ ] SECRET_KEY updated
#   [ ] ALLOWED_HOSTS includes render domain
#   [ ] CORS_ALLOWED_ORIGINS includes netlify domain
#   [ ] Web Service created and deployed
#   [ ] Build/start commands verified
#   [ ] Database migrations completed
#
# TESTING:
#   [ ] Visit https://<render-service>.onrender.com/admin/ (login works)
#   [ ] GET https://<render-service>.onrender.com/api/v1/courses/ (returns JSON)
#   [ ] Visit Netlify frontend (loads without errors)
#   [ ] Enrollment flow works end-to-end
#   [ ] Check browser console (no CORS errors)
#
# TROUBLESHOOTING:
#   [ ] If CORS error: Check CORS_ALLOWED_ORIGINS in Render
#   [ ] If 404 on API: Check ALLOWED_HOSTS in Render
#   [ ] If infinite redirect: Check VITE_API_URL in Netlify
#   [ ] Migrations failed: Check DB credentials
#   [ ] Build failed: Check requirements.txt and Procfile


# ============================================================================
# QUICK REFERENCE URLs (after deployment)
# ============================================================================
# Netlify Frontend: https://<your-netlify-site>.netlify.app
# Render Backend:   https://<your-render-service>.onrender.com
# Django Admin:     https://<your-render-service>.onrender.com/admin/
# API Root:         https://<your-render-service>.onrender.com/api/v1/
# Courses API:      https://<your-render-service>.onrender.com/api/v1/courses/
# Enrollment API:   https://<your-render-service>.onrender.com/api/v1/courses/enrollment-requests/
