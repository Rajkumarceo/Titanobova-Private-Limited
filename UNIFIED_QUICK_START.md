# 🚀 UNIFIED DEPLOYMENT - QUICK START

## One Command to Run Everything

```bash
cd titanobova-django
python manage.py runserver 0.0.0.0:8000
```

Then visit: **http://localhost:8000**

That's it! ✅

## What You Get

| Feature | URL | Status |
|---------|-----|--------|
| 🏠 Frontend (React) | http://localhost:8000 | ✅ Working |
| 📱 All Pages | http://localhost:8000/* | ✅ Working |
| 📧 Contact Form | http://localhost:8000 → Contact | ✅ Working |
| 📚 Courses | http://localhost:8000/courses | ✅ Working |
| 🔌 API | http://localhost:8000/api/v1/ | ✅ Working |
| 🛡️ Admin Panel | http://localhost:8000/admin/ | ✅ Working |
| 💾 Database | Contacts saved automatically | ✅ Working |

## Admin Credentials

- **Username:** `admin`  
- **Password:** `titanobova`

## Test Everything

```bash
python TEST_UNIFIED_DEPLOYMENT.py
```

**Expected output:** ✅ **10/10 tests passed (100%)**

## File Locations

- **Frontend code:** `titanobova-website/app/frontend/`
- **Backend code:** `titanobova-django/`
- **Backend settings:** `titanobova-django/titanobova_project/settings.py`
- **Frontend built:** `titanobova-django/staticfiles/frontend/`

## Make Changes to Frontend

1. **Edit source:** `titanobova-website/app/frontend/src/`
2. **Build:** `npm run build`
3. **Copy:** Built files go to `titanobova-django/staticfiles/frontend/`
4. **Restart Django server**

## Troubleshooting

### Port 8000 already in use?
```bash
# Find process using port 8000
netstat -ano | findstr :8000
# Kill it (replace PID with actual number)
taskkill /PID <PID> /F
```

### Frontend not updating after changes?
```bash
# Rebuild and copy
cd titanobova-website/app/frontend
npm run build
# Copy dist/ contents to titanobova-django/staticfiles/frontend/
```

### Contact form not working?
1. Check Django is running
2. Check console for errors
3. Run test suite to diagnose

## Next Steps

### For Personal Use
✅ You're done! Just run the Django server whenever you need it.

### For Friends Access
Create a tunnel:
```bash
npx localtunnel --port 8000
```

Share the HTTPS URL with friends!

### For Production
See [UNIFIED_DEPLOYMENT_COMPLETE.md](UNIFIED_DEPLOYMENT_COMPLETE.md) for production deployment steps.

## Key Changes Made

1. ✅ Built React frontend to production bundle
2. ✅ Copied built files to Django staticfiles
3. ✅ Updated Django to serve React app
4. ✅ Added SPA routing (catch-all for React Router)
5. ✅ Tested all features (10/10 tests passing)
6. ✅ Pushed to GitHub

## Architecture

```
User accesses http://localhost:8000
        ↓
Django server on port 8000
        ├─ GET / → Serves React index.html
        ├─ GET /about, /courses, /services, etc. → React Router handles in browser
        ├─ POST /api/v1/contacts/ → Contact form API
        ├─ GET /api/v1/courses/ → Courses API
        ├─ GET /admin/ → Django Admin
        └─ /static/* → Serves assets (CSS, JS, images)
```

## Single Server Benefits

- ✅ No CORS issues (same origin)
- ✅ Easy to deploy (one server to manage)
- ✅ Better performance (no inter-server latency)
- ✅ Simpler infrastructure (one port)
- ✅ No dev server needed (production build)

---

**Status:** ✅ **READY TO USE**  
**Tests:** 10/10 passing  
**Deployment:** Unified (single port)

Need help? Check [UNIFIED_DEPLOYMENT_COMPLETE.md](UNIFIED_DEPLOYMENT_COMPLETE.md) for detailed info.
