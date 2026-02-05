# 🚀 NETLIFY + RENDER DEPLOYMENT - COMPLETE AUTOMATION GUIDE

## 📋 Table of Contents
1. [Pre-Deployment Verification](#pre-deployment-verification)
2. [Deploy to Netlify (Frontend)](#deploy-to-netlify-frontend)
3. [Deploy to Render (Backend)](#deploy-to-render-backend)
4. [Post-Deployment Testing](#post-deployment-testing)
5. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Verification

Before deploying, verify everything is ready:

```powershell
# Run the verification script
.\VERIFY_DEPLOYMENT.ps1
```

**What this checks:**
- ✓ Git repository and commits
- ✓ Frontend & backend directories
- ✓ Deployment configuration files (Procfile, runtime.txt, netlify.toml)
- ✓ Django system health
- ✓ Database migrations
- ✓ Security settings
- ✓ All required files present

**Fix any issues before proceeding!**

---

## 🌐 Deploy to Netlify (Frontend)

### Option A: Automatic Deployment (Recommended)

```powershell
# Run the Netlify deployment script
.\DEPLOY_NETLIFY.ps1
```

This script will:
1. ✓ Install dependencies
2. ✓ Build the frontend
3. ✓ Prompt you to deploy using Netlify CLI
4. ✓ Authenticate with GitHub
5. ✓ Deploy to Netlify

**Your Netlify URL will look like:** `https://your-site-name.netlify.app`

### Option B: Manual Deployment (Using UI)

1. Go to https://app.netlify.com
2. Log in with GitHub
3. Click "New site from Git"
4. Select your repo: `Rajkumarceo/Titanobova-Private-Limited`
5. Configure build settings:
   - **Base directory:** `titanobova-website/app/frontend`
   - **Build command:** `npm ci && npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"
7. Wait for build (usually 2-3 minutes)
8. **Copy your Netlify URL** from the dashboard

### Configure Netlify Environment Variables

After deployment, set environment variables:

1. Go to Netlify Dashboard → Your Site → Site Settings
2. Navigate to **Build & deploy** → **Environment**
3. Add these variables:

```
VITE_API_URL = https://<your-render-service>.onrender.com/api/v1
VITE_BACKEND_URL = https://<your-render-service>.onrender.com
```

*(You'll set the actual Render URL after backend deployment)*

4. Netlify will **auto-redeploy** when you save

---

## 🔧 Deploy to Render (Backend)

### Prerequisites

1. Create free Render account at https://render.com
2. Connect your GitHub account
3. Have your GitHub repo ready (already done!)

### Step 1: Create PostgreSQL Database

1. Go to https://render.com dashboard
2. Click **"New+" → "PostgreSQL"**
3. Fill in:
   - **Name:** `titanobova-db` (or your preference)
   - **Database:** `titanobova_db` (required for Django)
   - **User:** postgres (auto-filled)
4. Select **Free** plan
5. Click **"Create Database"**
6. **Wait for database to be created** (~1 minute)
7. Once created, click on the database to view credentials
8. **Copy these values:**
   - Database name: `titanobova_db`
   - User: (your postgres user)
   - Password: (copy the password)
   - Host: (copy the Internal Database URL hostname)
   - Port: 5432

**IMPORTANT:** Use the **Internal hostname** for Django config, NOT the external URL!

### Step 2: Create Web Service

1. From Render dashboard, click **"New+" → "Web Service"**
2. Click **"Connect GitHub repo"**
3. Search for: `Titanobova-Private-Limited`
4. Click **"Connect"**
5. Choose deployment settings:
   - **Name:** `titanobova-api` (will be: titanobova-api.onrender.com)
   - **Root Directory:** `titanobova-django` ⚠️ IMPORTANT!
   - **Runtime:** Python 3
   - **Region:** Select closest to you
   - **Branch:** main
   - **Build Command:**
     ```
     pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
     ```
   - **Start Command:**
     ```
     gunicorn titanobova_project.wsgi:application --bind 0.0.0.0:$PORT
     ```
6. Select **Free** plan
7. Click **"Create Web Service"**

### Step 3: Add Environment Variables

1. In Render dashboard, go to your Web Service
2. Click **"Environment"** tab
3. Click **"Add Environment Variable"** for each:

**CRITICAL - Copy exactly:**

```
DEBUG = False
SECRET_KEY = <GENERATE_NEW_SECRET_KEY>
ALLOWED_HOSTS = titanobova-api.onrender.com,localhost,127.0.0.1
```

**Generate SECRET_KEY:**
- Option 1: Go to https://djecrety.ir/ and copy the generated key
- Option 2: Run this locally:
  ```powershell
  python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
  ```

**DATABASE - Copy from PostgreSQL service credentials:**

```
DB_ENGINE = django.db.backends.postgresql
DB_NAME = titanobova_db
DB_USER = postgres
DB_PASSWORD = <your_postgres_password>
DB_HOST = <internal_hostname_from_postgres>
DB_PORT = 5432
```

**CORS - For frontend communication:**

```
CORS_ALLOWED_ORIGINS = https://<your-netlify-site>.netlify.app
```

*(Replace with your actual Netlify URL)*

4. Click **"Save"**
5. Render will **auto-deploy** with the new environment variables

### Monitor Deployment

1. Go to "Logs" tab in Render
2. Watch for:
   - ✓ Dependencies installing
   - ✓ Database migrations running
   - ✓ Static files collecting
   - ✓ "Listening on 0.0.0.0:xxxx"

**Your backend URL:** `https://titanobova-api.onrender.com`

---

## 🔗 Link Frontend & Backend

### Update Netlify with Backend URL

Now that Render is deployed:

1. Go to Netlify Dashboard → Your Site → Site Settings
2. **Build & deploy** → **Environment**  
3. Update `VITE_API_URL`:
   ```
   VITE_API_URL = https://titanobova-api.onrender.com/api/v1
   ```
4. Also set:
   ```
   VITE_BACKEND_URL = https://titanobova-api.onrender.com
   ```
5. Click "Save"
6. Netlify will **auto-redeploy** with the correct backend URL ✓

---

## 🧪 Post-Deployment Testing

### Test 1: Frontend Loads

```
Visit: https://<your-netlify-site>.netlify.app
```

- ✓ Page should load
- ✓ No console errors (check DevTools F12)
- ✓ Navigation works

### Test 2: Backend API

```powershell
# Test API endpoint
curl https://titanobova-api.onrender.com/api/v1/courses/ -v
```

Should return:
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Web Development Fundamentals",
      ...
    }
  ]
}
```

### Test 3: Admin Panel

```
Visit: https://titanobova-api.onrender.com/admin/
Username: admin
Password: titanobova
```

Should show Django admin interface with all your data

### Test 4: Full Enrollment Flow

1. Visit your Netlify frontend
2. Go to **Courses**
3. Click **"Enroll Now"** on any course
4. Fill enrollment form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: +919876543210
   - Experience Level: **Beginner** (or Intermediate/Advanced)
5. Click **Submit**
6. Should see:
   - ✓ Success message
   - ✓ Redirect to Payment page
   - ✓ Enrollment data saved

### Test 5: Check Database

1. Go to Render admin: https://titanobova-api.onrender.com/admin/
2. Click **Enrollment Requests**
3. Should see your test enrollment ✓

---

## 🚀 DEPLOYMENT COMPLETE!

Your application is now **LIVE**:

| Component | URL |
|-----------|-----|
| **Frontend** | https://your-site-name.netlify.app |
| **Backend API** | https://titanobova-api.onrender.com |
| **Admin Panel** | https://titanobova-api.onrender.com/admin |
| **Courses API** | https://titanobova-api.onrender.com/api/v1/courses/ |
| **Enrollment API** | https://titanobova-api.onrender.com/api/v1/courses/enrollment-requests/ |

---

## ⚠️ Troubleshooting

### CORS Error in Browser

**Error:** "Access to XMLHttpRequest blocked by CORS policy"

**Fix:**
1. Go to Render Web Service → Environment
2. Check `CORS_ALLOWED_ORIGINS` exactly matches your Netlify URL
3. Format must be: `https://yourdomain.netlify.app` (with https)
4. Save and Render will redeploy
5. Hard refresh browser (Ctrl+Shift+Del)

### 404 on API Endpoints

**Error:** "Not Found" when calling backend API

**Fix:**
1. Check `VITE_API_URL` in Netlify is correct
2. Test directly with curl:
   ```powershell
   curl https://titanobova-api.onrender.com/api/v1/courses/
   ```
3. If curl fails, check Render logs for errors
4. Check `ALLOWED_HOSTS` includes your Render domain

### Infinite Redirect Loop

**Error:** Page keeps redirecting forever

**Fix:**
1. Check `VITE_API_URL` doesn't point to frontend domain
2. Should be: `https://titanobova-api.onrender.com/api/v1` NOT frontend URL
3. Update Netlify environment variables
4. Clear browser cache and hard refresh

### Database Connection Errors

**Error:** "could not translate host name"

**Fix:**
1. Check `DB_HOST` is the **Internal** hostname from Postgres
2. Should look like: `dpg-xxxxx-a.oregon-postgres.render.com`
3. NOT the external URL provided
4. Check `DB_PASSWORD` matches exactly (copy-paste)
5. Regenerate Postgres password if unsure

### Build Fails on Render

**Error:** "pip install failed" or "dependency not found"

**Fix:**
1. Check `requirements.txt` is in root of `titanobova-django`
2. Ensure all packages have versions specified
3. Check local build works:
   ```powershell
   cd titanobova-django
   pip install -r requirements.txt
   python manage.py check
   ```
4. Push any fixes to GitHub
5. Render will auto-deploy on git push

### Static Files Not Loading

**Error:** CSS/JS files return 404

**Fix:**
1. Ensure build command includes: `python manage.py collectstatic --noinput`
2. Check `STATIC_ROOT` is configured in Django settings
3. WhiteNoise middleware should serve static files automatically
4. Render redeploys to refresh

---

## 📞 Need Help?

### Quick Links
- **Netlify Docs:** https://docs.netlify.com
- **Render Docs:** https://render.com/docs
- **Django Docs:** https://docs.djangoproject.com
- **Deployment Guide:** See DEPLOYMENT_GUIDE_NETLIFY_RENDER.md

### Common Commands

```powershell
# Check Django health locally
cd titanobova-django
python manage.py check

# Test local API
python manage.py runserver

# Make migrations locally
python manage.py makemigrations

# Apply migrations locally  
python manage.py migrate

# Create superuser manually (local)
python manage.py createsuperuser

# Run tests
python manage.py test
```

---

## ✅ Final Checklist

- [ ] Ran `VERIFY_DEPLOYMENT.ps1` - all checks passed
- [ ] Frontend deployed to Netlify
- [ ] Backend deployed to Render
- [ ] PostgreSQL database created and working
- [ ] Netlify environment variables set with correct backend URL
- [ ] Render environment variables set (SECRET_KEY, DB config, CORS)
- [ ] Frontend loads without errors
- [ ] Backend API responds (curl test passed)
- [ ] Admin panel accessible
- [ ] Enrollment test completed successfully
- [ ] No CORS errors in browser console

**CONGRATULATIONS! Your site is live! 🎉**

Share your Netlify URL with the world:
```
https://your-site-name.netlify.app
```
