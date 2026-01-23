# Titanobova Setup & Launch Checklist

Quick reference checklist for getting the admin portal up and running.

## ✅ Pre-Launch Checklist

### Environment Setup
- [ ] Node.js v14+ installed
- [ ] npm or yarn installed
- [ ] MySQL installed (optional - SQLite works by default)
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/CLI access

### Code Setup
- [ ] Repository cloned/downloaded
- [ ] Backend dependencies: `cd app/backend && npm install`
- [ ] Frontend dependencies: `cd app/frontend && npm install`
- [ ] `.env` file copied from `.env.example` (if needed)
- [ ] Reviewed configuration values in `.env`

### Database Setup
- [ ] (Optional) MySQL server running if using MySQL
- [ ] (Optional) Created MySQL database: `CREATE DATABASE titanobova;`
- [ ] Updated MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD in `.env` (if using MySQL)

### Credential Setup
- [ ] Reviewed default credentials in `.env` (admin/admin123)
- [ ] Planned to change credentials before production
- [ ] Reviewed JWT_SECRET values

### Email Setup (Optional)
- [ ] (Optional) Configured SMTP in `.env`
- [ ] (Optional) Generated Gmail app password (if using Gmail)
- [ ] (Optional) Set NOTIFY_EMAIL value
- [ ] (Optional) Run `npm run verify-smtp` to test

---

## 🚀 Quick Start Steps

### Step 1: Start Backend
```bash
cd app/backend
npm run dev
```
**Expected Output**:
```
✓ Backend running on port 4000
✓ CORS enabled for: http://localhost:5173
✓ Database: SQLite (or MySQL)
```

### Step 2: Start Frontend
```bash
# New terminal window
cd app/frontend
npm run dev
```
**Expected Output**:
```
VITE v... ready in ... ms
➜ Local: http://localhost:5173/
```

### Step 3: Access Website
- Open browser to: **http://localhost:5173**
- Everything loads without errors? ✅

### Step 4: Test Founder Login
1. Click **"Founder"** button in top navigation
2. Login with: `admin` / `admin123`
3. Should see **Admin Dashboard** with contact stats
4. No errors? ✅

### Step 5: Test Complete Flow
1. Go to **Contact** page (`/contact`)
2. Fill in and submit contact form
3. Return to **Admin Dashboard** (login if needed)
4. New contact appears in table? ✅

---

## ✅ Verification Checklist

After startup, verify:

### Frontend (http://localhost:5173)
- [ ] Home page loads without errors
- [ ] Navigation menu visible with all links
- [ ] "Founder" button present in navigation
- [ ] Contact form visible on /contact page
- [ ] All pages load without 404 errors
- [ ] Mobile responsive (DevTools F12)

### Backend (http://localhost:4000)
- [ ] Health check works: `http://localhost:4000/api/health`
- [ ] No error messages in console
- [ ] Database initialized (see logs)
- [ ] CORS configuration correct

### Login Flow
- [ ] Click "Founder" → redirects to `/founder-login`
- [ ] Login form displays with username/password fields
- [ ] Demo credentials shown on page
- [ ] Enter admin/admin123 → successful login
- [ ] Redirected to `/admin-dashboard`
- [ ] Dashboard displays correctly

### Admin Dashboard
- [ ] Header shows "Admin Dashboard"
- [ ] Logout button visible and functional
- [ ] Contact stats displayed (initially 0)
- [ ] Search box present
- [ ] Empty table message shows (no contacts yet)

### Security
- [ ] Token stored in localStorage after login
- [ ] Cannot access dashboard without token
- [ ] Logout clears token
- [ ] Invalid credentials rejected

---

## 🔧 Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Port 4000 in use | See [ADMIN_SETUP.md](ADMIN_SETUP.md#troubleshooting) |
| Cannot connect backend | Verify backend running on 4000 |
| CORS error | Check CORS_ORIGIN in `.env` |
| Login fails | Verify credentials in `.env` |
| Database error | Check database connection settings |
| Email not sending | See email setup in [ADMIN_SETUP.md](ADMIN_SETUP.md) |

**Need more help?** → Check [QUICK_START.md](QUICK_START.md) or [ADMIN_SETUP.md](ADMIN_SETUP.md)

---

## 📋 Configuration Reference

### Essential `.env` Variables

#### Authentication
```
HOST_USERNAME=admin
HOST_PASSWORD=admin123
JWT_SECRET=your_secure_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

#### Database (SQLite - Default)
```
# No setup needed! Uses app/backend/data/contacts.db
```

#### Database (MySQL - Optional)
```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=titanobova
```

#### Frontend
```
CORS_ORIGIN=http://localhost:5173
```

#### Email (Optional)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password
NOTIFY_EMAIL=founder@email.com
```

---

## 📁 Important Files

| File | Purpose | Edit Before Production? |
|------|---------|------------------------|
| `app/backend/.env` | Configuration & secrets | **YES** - Change credentials |
| `app/frontend/src/pages/FounderLogin.jsx` | Login page | Only if customizing |
| `app/frontend/src/pages/AdminDashboard.jsx` | Dashboard | Only if customizing |
| `app/backend/index.js` | API server | Usually no |
| `app/backend/db.js` | Database layer | Usually no |

---

## 🎯 Next Steps After Verification

### Immediate (Before Testing)
- [ ] Change default credentials in `.env`
- [ ] Generate strong JWT secrets
- [ ] Test on multiple browsers

### Short Term (Next 24 hours)
- [ ] Test contact form submission workflow
- [ ] Verify contacts appear in dashboard
- [ ] Test email notifications (if enabled)
- [ ] Test mobile responsiveness
- [ ] Review error handling

### Medium Term (Before Production)
- [ ] Read [DEPLOYMENT.md](DEPLOYMENT.md)
- [ ] Plan your deployment strategy
- [ ] Set up production server
- [ ] Configure production `.env`
- [ ] Set up SSL/HTTPS
- [ ] Plan database backups

### Long Term (Ongoing)
- [ ] Monitor server logs
- [ ] Regular backups
- [ ] Keep dependencies updated
- [ ] Review contact submissions
- [ ] Respond to contact inquiries

---

## 🆘 Emergency Commands

### If Something Goes Wrong

**Restart Backend**
```bash
# Ctrl+C to stop
npm run dev  # to restart
```

**Restart Frontend**
```bash
# Ctrl+C to stop
npm run dev  # to restart
```

**Clear Browser Cache**
1. Press F12 (DevTools)
2. Right-click Reload button → Empty cache and hard refresh
3. Or: Ctrl+Shift+Delete to open clear cache dialog

**Reset Local Storage**
```javascript
// In browser console:
localStorage.clear()
```

**Check What's Running**
```bash
# On Windows:
netstat -ano | findstr :4000

# On Mac/Linux:
lsof -i :4000
```

---

## 📚 Documentation Quick Links

| Document | Purpose | Read When |
|----------|---------|-----------|
| [README.md](README.md) | Project overview | First-time setup |
| [QUICK_START.md](QUICK_START.md) | 5-minute setup | Getting started |
| [ADMIN_SETUP.md](ADMIN_SETUP.md) | Detailed guide | Detailed help needed |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment | Ready to deploy |
| [TESTING.md](TESTING.md) | Testing guide | Full QA testing |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | What was built | Understanding changes |

---

## ⚡ Power User Tips

### Faster Startup
```bash
# Start both in one command (if you have 2 terminals open)
# Terminal 1:
cd app/backend && npm run dev

# Terminal 2:
cd app/frontend && npm run dev

# Use npm start instead of npm run dev for production mode
```

### Monitor Logs
```bash
# See backend errors in real-time
npm run dev  # Watch the output

# In another terminal, test API:
curl http://localhost:4000/api/health
```

### Debug Mode
```javascript
// In browser console:
localStorage.getItem('authToken')  // Check your token
localStorage.getItem('refreshToken')  // Check refresh token
```

### Database Testing
```bash
# If using SQLite:
sqlite3 app/backend/data/contacts.db
SELECT * FROM contacts;
.exit
```

---

## 🔒 Security Reminder

**CRITICAL**: Before deploying to production:

- [ ] Change HOST_USERNAME and password
- [ ] Use bcrypt hash for password (not plaintext)
- [ ] Generate new JWT_SECRET and REFRESH_TOKEN_SECRET
- [ ] Do NOT commit `.env` to git
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Use strong MySQL password (if using MySQL)
- [ ] Configure secure SMTP credentials

---

## 💡 Common Questions

**Q: Should I use MySQL or SQLite?**
A: SQLite for development/testing. MySQL for production with multiple users.

**Q: How do I change the admin password?**
A: Edit `HOST_PASSWORD` in `.env` and restart backend.

**Q: How do I deploy this?**
A: Read [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

**Q: Will my contacts be saved if I restart?**
A: Yes! They're stored in the database (SQLite or MySQL).

**Q: How do I enable email notifications?**
A: Configure SMTP in `.env` with your email provider settings.

**Q: Is this secure for production?**
A: Yes, but follow security checklist in `.env` and [DEPLOYMENT.md](DEPLOYMENT.md).

---

## ✨ You're All Set!

Everything is configured and ready to run. Follow the **Quick Start Steps** above to launch the system.

**Estimated time**: 5-10 minutes
**Difficulty**: Beginner-friendly
**Support**: Check documentation files if stuck

---

**Good luck! 🚀 Happy coding!**

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Ready to Launch
