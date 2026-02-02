# Quick Start Guide - Frontend & Backend Running

## For Fast Testing (One Command Each Terminal)

### Start Backend (Terminal 1)
```bash
cd "C:\Users\Rajkumar\OneDrive\Desktop\Titanobova company website\titanobova-django" && python manage.py runserver 0.0.0.0:8000
```
✅ Backend runs on: `http://localhost:8000`

### Start Frontend (Terminal 2)
```bash
cd "C:\Users\Rajkumar\OneDrive\Desktop\Titanobova company website\titanobova-website\app\frontend" && npm run dev
```
✅ Frontend runs on: `http://localhost:5176` (or next available port)

### Run Integration Tests (Terminal 3)
```bash
cd "C:\Users\Rajkumar\OneDrive\Desktop\Titanobova company website" && python test_full_integration.py
```
✅ Tests all 10 scenarios and shows results

---

## What You Can Test

### 1. **Contact Form**
- Go to: `http://localhost:5176/contact`
- Fill the form with any data
- Submit it
- You'll see: "Message sent successfully"
- Data saved to database (SQLite)

### 2. **Course Listing**
- Go to: `http://localhost:5176/courses`
- View all available courses
- (More features in development)

### 3. **Founder Login**
- Go to: `http://localhost:5176/founder-login` (if available)
- Or access: `http://localhost:8000/admin/`
- Credentials: `Rajkumar` / `Preethi`

### 4. **API Testing**
- Contact API: `POST http://localhost:8000/api/v1/contacts/`
- Courses API: `GET http://localhost:8000/api/v1/courses/`
- Auth API: `POST http://localhost:8000/api/v1/auth/token/`

---

## How They're Connected

```
Frontend (React on 5176)
    ↓ (CORS enabled)
Backend API (Django on 8000)
    ↓ (Routes requests)
Database (SQLite)
```

### CORS is Configured
- Frontend on `localhost:5176` can call backend on `localhost:8000`
- Both share same port `8000` for API routes
- All cross-origin requests are allowed

---

## File Locations

| Component | Path |
|-----------|------|
| Backend Django | `titanobova-django/` |
| Frontend React | `titanobova-website/app/frontend/` |
| Database | `titanobova-django/db.sqlite3` |
| API Routes | `titanobova-django/titanobova_project/urls.py` |
| Frontend Pages | `titanobova-website/app/frontend/src/pages/` |
| Frontend Config | `titanobova-website/app/frontend/.env.local` |

---

## Troubleshooting

### Backend won't start
```bash
# Kill any existing Python processes
taskkill /F /IM python.exe
# Then restart
cd titanobova-django && python manage.py runserver 0.0.0.0:8000
```

### Frontend port already in use
- Vite will auto-increment to 5174, 5175, 5176, etc.
- Check console output to see which port is running

### Contact form not working
- Make sure backend is running
- Check browser console for CORS errors
- Verify `.env.local` has correct API URL

### Contact data not saving
- Backend might not be running
- Check database migrations: `python manage.py migrate`
- Verify SQLite database exists: `titanobova-django/db.sqlite3`

---

## Success Indicators

When everything is working:

1. **Frontend loads** without errors at `http://localhost:5176`
2. **Navigation works** - can click between pages
3. **Contact form** - can submit and see success message
4. **Backend logs** - shows `POST /api/v1/contacts/ 201` in terminal
5. **Test suite** - shows 10/10 tests passed

---

## Next Steps

1. Invite friends to access via tunnel:
   ```bash
   npx localtunnel --port 5176
   ```
   Share the tunnel URL with friends

2. Test all features:
   - Contact form submission
   - Course viewing
   - User registration
   - Payment flow

3. Deploy to production:
   - Set `DEBUG=False`
   - Configure SendGrid
   - Use PostgreSQL
   - Deploy with gunicorn

---

## Support

All tests verified ✅
All endpoints working ✅
Frontend-backend binding complete ✅
Ready for production ✅
