# Titanobova Site - Sharing with Friends

Your site is now ready to share! Follow these steps:

## 🚀 Step 1: Start Everything

### Start Backend (Terminal 1)
```bash
cd titanobova-django
python manage.py runserver 0.0.0.0:8000
```

### Start Frontend (Terminal 2)
```bash
cd titanobova-website\app\frontend
npm run dev
```

### Create Public Tunnels (Terminal 3 & 4)

**For Frontend (Port 5173):**
```bash
npx localtunnel --port 5173
```

**For Backend (Port 8000):**
```bash
npx localtunnel --port 8000
```

---

## 📱 Share These Links with Friends

After running the tunnel commands, you'll get URLs like:

```
Frontend: https://loud-tools-grab.loca.lt
Backend: https://some-domain.loca.lt
```

Share the **Frontend URL** with your friends!

---

## 🔌 Connection Information

### Local Testing
- Frontend: http://localhost:5173
- Admin: http://localhost:8000/admin
- API: http://localhost:8000/api/v1

### Admin Credentials
```
Username: Rajkumar
Password: [Your password]
```

---

## ⚙️ Configuration

The following files have been updated for external access:

### Django Settings (`titanobova_project/settings.py`)
- ✅ CORS enabled for external domains
- ✅ CSP headers updated for tunnels
- ✅ Allowed hosts expanded

### Frontend Environment (`.env.local`)
- ✅ API URL configured
- ✅ Backend URL configured

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Tunnel Connection Issues
- Restart tunnel: Ctrl+C and run command again
- Check internet connection
- Try different subdomain name

### CORS Errors
Check browser console for specific origin issues, update CORS_ALLOWED_ORIGINS in settings.py

### API Not Responding
Verify backend is running: http://localhost:8000/api/v1/

---

## 📝 Notes

- Localtunnel URLs change each session
- Keep terminal windows open to maintain tunnels
- Share the public URL, not localhost
- First time setup takes 1-2 minutes

---

## ✨ Features Available

- User Registration
- Admin Panel (http://localhost:8000/admin)
- Payment Integration (Stripe)
- Course Management
- Contact Form
- JWT Authentication

---

**Your site is live and ready to impress your friends! 🎉**
