# TITANOBOVA SITE - QUICK PUBLIC ACCESS SETUP

## ✅ EVERYTHING IS READY!

Your Titanobova site is now running and ready to share with friends!

### 🎯 QUICK START (Copy & Paste)

**Terminal 1 - Backend:**
```
cd "C:\Users\Rajkumar\OneDrive\Desktop\Titanobova company website\titanobova-django"
python manage.py runserver 0.0.0.0:8000
```

**Terminal 2 - Frontend:**
```
cd "C:\Users\Rajkumar\OneDrive\Desktop\Titanobova company website\titanobova-website\app\frontend"
npm run dev
```

**Terminal 3 - Frontend Public Tunnel:**
```
npx localtunnel --port 5173
```

**Terminal 4 - Backend Public Tunnel:**
```
npx localtunnel --port 8000
```

---

### 🔗 SHARE THIS LINK WITH FRIENDS

After running the tunnels, you'll see URLs like:
```
https://loud-tools-grab.loca.lt  ← Share this with friends!
```

---

### 📱 LOCAL TESTING

- **Site**: http://localhost:5173
- **Admin**: http://localhost:8000/admin
  - Username: Rajkumar
  - Password: [Your password]
- **API**: http://localhost:8000/api/v1/auth/token/

---

### ✨ WORKING FEATURES

✅ Frontend loads correctly
✅ Backend API responds
✅ Admin panel accessible
✅ CORS enabled for external access
✅ Ready for production deployment

---

### 🆘 IF YOU GET ERRORS

**502 Bad Gateway?**
- Restart tunnel: Press Ctrl+C and run again
- Ensure backend is running

**Frontend not loading?**
- Check: http://localhost:5173 works locally
- Restart: npm run dev

**API Connection Failed?**
- Check: http://localhost:8000/admin loads
- Verify CORS settings in settings.py (already configured)

---

### 📤 NEXT STEPS TO DEPLOY

When ready for production:

```bash
cd titanobova-django
git add .
git commit -m "Deployed: Fixed CORS for external access"
git push origin main
```

Then deploy to:
- **Heroku** (free tier)
- **Railway.app** (recommended)
- **AWS** or **DigitalOcean** (scalable)
- **Render.com** (simple)

---

### 📞 SUPPORT

For issues:
1. Check terminal output for errors
2. Verify both servers (8000 & 5173) are running
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private window

---

**Your site is LIVE! Share and impress! 🚀**
