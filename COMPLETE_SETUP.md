# ✅ TITANOBOVA WEBSITE - COMPLETE SETUP SUMMARY

## What Has Been Completed

### ✓ Backend (Express.js) - Ready to Use
- **Location:** `app/backend/`
- **Security:** Helmet, rate-limiting, input validation, JWT auth, CORS
- **Features:** Contact API, host authentication, email notifications
- **Database:** MySQL (required)
- **Email:** Integrated with Gmail SMTP (nodemailer)
- **Dependencies:** All installed and ready

### ✓ Frontend (React + Tailwind) - Modern Design
- **Location:** `app/frontend/`
- **Pages:** Home, About, Services, Contact, Login, Admin
- **Design:** Modern minimalist with golden branding (#FBBF24)
- **Responsive:** Mobile and desktop optimized
- **Features:** Contact form, admin login, secure portal

### ✓ Database (MySQL)
- **Location:** localhost:3306
- **Database:** `titanobova`
- **Table:** `contacts` (auto-created on startup)
- **Connection:** Configured in `app/backend/.env`

### ✓ Documentation
- **QUICKSTART.md** - Quick reference guide (MySQL setup)
- **SETUP_GUIDE.md** - Complete setup & deployment
- **app/backend/README.md** - API documentation
- **app/backend/.env** - Configuration with full comments
- **app/backend/.env.example** - Template reference

---

## 🚀 How to Run (4 Steps)

### Step 0: MySQL Setup
```sql
CREATE DATABASE IF NOT EXISTS titanobova;
```
Configure in `app/backend/.env`:
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=titanobova
```

### Step 1: Backend
```powershell
cd C:\Users\Rajkumar\OneDrive\Desktop\VILSON\titanobova-website\app\backend
npm run dev
# Should show: ✓ Backend running on port 4000
#              ✓ MySQL contacts table ready.
```

### Step 2: Frontend (new terminal)
```powershell
cd C:\Users\Rajkumar\OneDrive\Desktop\VILSON\titanobova-website\app\frontend
npm run dev
# Should show: ✓ Local: http://localhost:5173
```

### Step 3: Open Browser
```
http://localhost:5173
```

---

## 📧 Email Setup - IMPORTANT

When users submit the contact form, an email notification is sent to `titanobovapvt@gmail.com`.

### To Enable Emails:

1. **Get Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password

2. **Update .env:**
   - File: `app/backend/.env`
   - Find: `SMTP_PASS=`
   - Replace with your app password

3. **Restart Backend:**
   ```powershell
   # Stop (Ctrl+C)
   # Then restart:
   npm run dev
   ```

4. **Test:**
   - Submit contact form on website
   - Check email at titanobovapvt@gmail.com

---

## 📊 How Data Flows

```
User on Website (http://localhost:5173)
        ↓
User fills contact form and clicks "Send"
        ↓
Frontend sends POST to http://localhost:4000/api/contacts
        ↓
Backend receives and validates data
        ↓
Saves to SQLite database (app/backend/data/contacts.db)
        ↓
Sends email via Gmail SMTP
        ↓
Email arrives at titanobovapvt@gmail.com
        ↓
Host logs in to admin portal to view all contacts
```

---

## 🔐 Security Features Implemented

✓ **Helmet.js** - HTTP security headers
✓ **Rate Limiting** - Prevents brute force attacks
✓ **Input Validation** - XSS/SQL injection protection
✓ **CORS** - Restricted to frontend origin
✓ **JWT Auth** - Secure token-based login
✓ **Bcrypt Support** - Password hashing
✓ **HTTPS Ready** - Production-mode support
✓ **HttpOnly Cookies** - Secure token storage

---

## 📁 File Locations

**Configuration:**
- `.env` - Backend settings (passwords, email, database)

**Backend:**
- `app/backend/index.js` - Main server
- `app/backend/db.js` - Database handler
- `app/backend/migrations/create_mysql_contacts.js` - MySQL setup

**Frontend:**
- `app/frontend/src/App.jsx` - Main layout & routing
- `app/frontend/src/pages/` - All page components

**Documentation:**
- `QUICKSTART.md` - 1-minute overview
- `SETUP_GUIDE.md` - Complete guide
- `app/backend/README.md` - API docs
- `app/backend/.env.example` - Config template

---

## 🔌 API Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/contacts` | POST | No | Submit contact form |
| `/api/auth/login` | POST | No | Host login |
| `/api/auth/logout` | POST | No | Host logout |
| `/api/admin/contacts` | GET | Yes | View all contacts |
| `/api/health` | GET | No | Health check |

---

## 💾 Database

**Default: SQLite**
- File: `app/backend/data/contacts.db`
- Auto-created on first run
- No setup needed

**Optional: MySQL**
- Set `DB_TYPE=mysql` in `.env`
- Run: `node migrations/create_mysql_contacts.js`
- Update connection details in `.env`

---

## 👤 Default Credentials

**Admin Portal:**
- Username: `Rajkumar`
- Password: `Preethi`

**Gmail (to receive notifications):**
- Email: `titanobovapvt@gmail.com`
- Password:tit@n0b0v@2025

---

## 🚨 Important Files (Keep Private!)

🔒 `.env` - Contains passwords and secrets
- NEVER commit to git
- NEVER share publicly
- Store securely on production server

---

## ✅ Checklist for Going Live

- [ ] Change default credentials in `.env`
- [ ] Generate strong JWT secrets
- [ ] Use bcrypt password hash (not plaintext)
- [ ] Configure production domain (not localhost)
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set up MySQL (recommended for production)
- [ ] Configure reverse proxy (nginx, Azure, AWS)
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Set up monitoring and logging

---

## 🆘 Troubleshooting

**Backend won't start?**
- Check port 4000 is available
- Verify `.env` file exists
- Check dependencies: `npm list`

**Frontend not loading?**
- Check port 5173 is available
- Verify Vite started correctly
- Check browser console for errors

**Email not sending?**
- Verify Gmail app password in `.env`
- Check 2-Step Verification is enabled
- Verify `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`
- Check spam folder

**Login not working?**
- Verify username: `Rajkumar`
- Verify password: `Preethi`
- Check backend logs

---

## 📞 Support Resources

**Documentation Files:**
- `QUICKSTART.md` - Quick reference
- `SETUP_GUIDE.md` - Detailed setup
- `app/backend/README.md` - API documentation
- `app/backend/.env` - Configuration reference

**Commands to Remember:**
```powershell
# Start backend
cd app/backend && npm run dev

# Start frontend
cd app/frontend && npm run dev

# Stop servers
# Press Ctrl+C in each terminal

# Kill stuck Node processes
Get-Process node | Stop-Process -Force

# Check port usage
netstat -ano | findstr :4000
```

---

## 🎉 Next Steps

1. ✅ Follow QUICKSTART.md to run servers
2. ✅ Set up Gmail app password for email notifications
3. ✅ Test contact form submission
4. ✅ Login to admin portal
5. ✅ Review SETUP_GUIDE.md for deployment info
6. ✅ Prepare for production deployment

---

**Titanobova Website Setup Complete!** 🚀

All files are ready. Just follow the QUICKSTART.md to get running immediately.

For questions, refer to the documentation files or review the code comments.
