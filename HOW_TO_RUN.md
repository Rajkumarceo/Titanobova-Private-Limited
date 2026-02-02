# 🚀 QUICK START - RUN YOUR SITE

## Windows (Easy)

### Option 1: Double-click batch file
```
Double-click: RUN_SITE.bat
```

### Option 2: PowerShell
```powershell
.\RUN_SITE.ps1
```

### Option 3: Command line
```bash
cd titanobova-django
python manage.py runserver localhost:8000
```

## Then Visit

**http://localhost:8000** ✅

## What You Get

- 🏠 **Frontend** - React app at http://localhost:8000
- 📧 **Contact Form** - Works and saves to database
- 📚 **Courses** - Displays all courses
- 🔌 **API** - All endpoints at http://localhost:8000/api/v1
- 🛡️ **Admin** - Panel at http://localhost:8000/admin/

## Admin Login

- **Username:** `admin`
- **Password:** `titanobova`

## Stop the Server

Press `CTRL+C` in the terminal

## Troubleshooting

**Port 8000 already in use?**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Frontend not showing?**
- Make sure you're visiting `http://localhost:8000`
- NOT `http://0.0.0.0:8000` (that won't work in browser)
- NOT `http://127.0.0.1:8000` (use localhost instead)

**Contact form not working?**
- Run the test: `python TEST_UNIFIED_DEPLOYMENT.py`
- Check console for errors

## What Changed

✅ Frontend and backend now run on **single port (8000)**
✅ No need for separate Vite dev server
✅ No CORS issues
✅ Single command to start everything
✅ All features working together

---

**Everything is unified and ready to use!** 🎉
