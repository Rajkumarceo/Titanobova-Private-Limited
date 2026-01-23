# Titanobova Website - Complete Setup Guide

## What Has Been Done ✓

Your website now has a **professional full-stack setup** with:

### Frontend (React + Tailwind)
✓ Modern minimalist design with golden branding
✓ 6 pages: Home, About, Services, Contact, Login, Admin
✓ Responsive (mobile + desktop)
✓ Contact form connected to backend API
✓ Secure admin portal with JWT login
✓ Beautiful yellow accent color scheme (#FBBF24)

### Backend (Express.js)
✓ RESTful API with security middleware
✓ JWT authentication (1 hour tokens + 7 day refresh)
✓ Contact form submission & storage
✓ Admin dashboard (view all contacts)
✓ Email notifications (automatically sends to Gmail)
✓ Input validation & sanitization
✓ Rate limiting (prevents abuse)
✓ HTTPS enforcement (production)

### Database
✓ **MySQL** (required)
✓ Connection pooling for reliability
✓ Automatic table creation on startup
✓ Contact form data persistence
✓ Production-ready setup

### Security
✓ Helmet.js (HTTP security headers)
✓ Bcrypt password hashing support
✓ CORS restriction to frontend origin
✓ Body size limits (10KB max)
✓ XSS & SQL injection protection
✓ HTTPS enforcement in production

---

## How to Set Up & Run

### Step 1: MySQL Setup

**Ensure MySQL is running on your machine:**

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS titanobova;

-- Create table (auto-created on backend startup, or run manually):
USE titanobova;
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created (created_at)
);
```

### Step 2: Backend Configuration

Open `app/backend/.env` and set MySQL connection:

```env
# MySQL Configuration (REQUIRED)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=titanobova
```

# Authentication (keep as is, or change password)
HOST_USERNAME=Rajkumar
HOST_PASSWORD=Preethi

# Frontend URL (don't change for local testing)
CORS_ORIGIN=http://localhost:5173

# Email Notifications (IMPORTANT: set this to receive contact notifications)
SMTP_HOST=smtp.gmail.com
SMTP_USER=titanobovapvt@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD   # <- Get this from Gmail account
NOTIFY_EMAIL=titanobovapvt@gmail.com
```

### Step 2: Start Backend

```powershell
cd C:\Users\Rajkumar\OneDrive\Desktop\VILSON\titanobova-website\app\backend
npm run dev
```

Expected output:
```
✓ Backend running on port 4000
✓ CORS enabled for: http://localhost:5173
✓ Email transporter configured (SMTP ready)
```

### Step 3: Start Frontend

In a new terminal:
```powershell
cd C:\Users\Rajkumar\OneDrive\Desktop\VILSON\titanobova-website\app\frontend
npm run dev
```

Expected output:
```
✓ Local: http://localhost:5173
```

### Step 4: Test It

1. Open browser: http://localhost:5173
2. Click "Contact" → Fill form → Submit
3. Backend logs should show: "✓ Contact notification email sent"
4. Check Gmail: You should receive the contact notification
5. Click "Portal" → Login with `Rajkumar` / `Preethi`
6. View submitted contacts in admin dashboard

---

## How Email Notifications Work

### When User Submits Contact Form:
```
User fills form on website
    ↓
POST /api/contacts (sends to backend)
    ↓
Backend validates input
    ↓
Saves to MySQL database
    ↓
Sends email to NOTIFY_EMAIL (titanobovapvt@gmail.com)
    ↓
Email contains: Name, Email, Phone, Subject, Message
```

### Gmail Setup (to receive emails):

1. **Enable 2-Step Verification** (required for app passwords)
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification" → Enable

2. **Create App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select: "Mail" + "Windows Computer"
   - Copy the 16-character password
   - Paste into `.env` as `SMTP_PASS`

3. **Restart Backend**
   ```powershell
   # Stop current backend (Ctrl+C)
   # Then restart:
   npm run dev
   ```

4. **Test**
   - Submit contact form from website
   - Email should arrive in seconds to titanobovapvt@gmail.com

---

## How to Access Submitted Contacts

### Option 1: Admin Dashboard (Easiest)
1. Open http://localhost:5173
2. Click "Portal" button (top right)
3. Enter credentials: `Rajkumar` / `Preethi`
4. View all submitted contacts

### Option 2: API Call (For developers)

**Login first:**
```powershell
$creds = @{ username='Rajkumar'; password='Preethi' } | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:4000/api/auth/login -Method Post -Body $creds -ContentType 'application/json'
$token = $response.token
```

**Fetch contacts:**
```powershell
Invoke-RestMethod -Uri http://localhost:4000/api/admin/contacts -Headers @{ Authorization="Bearer $token" }
```

### Option 3: Database (Direct Access - MySQL)

**Using MySQL CLI:**
```powershell
# Connect to MySQL
mysql -h localhost -u root -p

# Once connected:
USE titanobova;
SELECT * FROM contacts;
```

---

## MySQL Configuration Details
```powershell
cd app/backend
node migrations/create_mysql_contacts.js
```

3. **Restart backend:**
```powershell
npm run dev
```
---

## Deployment Checklist (For Live Server)

### Before Going Live:
- [ ] Change MySQL password in `.env` (not default)
- [ ] Generate strong `JWT_SECRET` and `REFRESH_TOKEN_SECRET`
- [ ] Use bcrypt hash for password (not plaintext)
- [ ] Configure domain (not localhost)
- [ ] Enable HTTPS (SSL certificate required)
- [ ] Set up reverse proxy (nginx, Azure, AWS)
- [ ] Configure firewall rules
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Set up monitoring/logging
- [ ] Configure MySQL backups

### Hosting Options:
- **Azure App Service** (recommended)
- **Heroku** (simple, uses git)
- **DigitalOcean** (affordable VPS)
- **AWS** (scalable)
- **Your own server** (with nginx + SSL)

---

## File Structure

```
VILSON/titanobova-website/
│
├── app/
│   ├── backend/
│   │   ├── index.js              ← Main server
│   │   ├── db.js                 ← Database handler (MySQL)
│   │   ├── .env                  ← Configuration (keep private!)
│   │   ├── .env.example          ← Template
│   │   ├── README.md             ← Backend docs
│   │   └── migrations/
│   │       └── create_mysql_contacts.js
│   │
│   └── frontend/
│       ├── src/
│       │   ├── App.jsx           ← Main layout
│       │   ├── pages/            ← Pages (Home, About, Services, Contact, Login, Admin)
│       │   ├── components/
│       │   │   └── Logo.jsx      ← Brand logo
│       │   └── index.css         ← Tailwind
│       ├── index.html
│       └── vite.config.js
│
└── README.md                      ← This file
```

---

## API Summary

| Endpoint | Method | Public | Description |
|----------|--------|--------|-------------|
| `/api/health` | GET | ✓ | Health check |
| `/api/contacts` | POST | ✓ | Submit contact form |
| `/api/auth/login` | POST | ✓ | Login (get token) |
| `/api/auth/refresh` | POST | ✓ | Refresh token |
| `/api/auth/logout` | POST | ✓ | Logout |
| `/api/admin/contacts` | GET | ✗ | Get all contacts (auth required) |

---

## Troubleshooting

### "Can't connect to MySQL"
- Verify MySQL server is running
- Check `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD` in `.env`
- Run: `mysql -h localhost -u root -p titanobova`
- Verify database `titanobova` exists

### "Can't connect to backend"
- Check backend is running: `npm run dev` in `app/backend`
- Verify port 4000 is open
- Check `CORS_ORIGIN` in `.env`

### "Email not sending"
- Verify `SMTP_USER` and `SMTP_PASS` in `.env`
- For Gmail: Use App Password (not regular password)
- 2-Step Verification must be enabled
- Check spam folder

### "Login fails"
- Verify `HOST_USERNAME` and `HOST_PASSWORD` in `.env`
- Check backend logs

### "Contact form not submitting"
- Check network tab in browser dev tools
- Verify backend is running
- Check backend logs for errors

### "Frontend not loading"
- Check frontend is running: `npm run dev` in `app/frontend`
- Verify Vite started on port 5173

---

## Useful Commands

```powershell
# Start both servers (need 2 terminals)
cd app/backend && npm run dev      # Terminal 1
cd app/frontend && npm run dev     # Terminal 2

# Stop servers
# Press Ctrl+C in each terminal

# Kill processes on ports
Get-Process node | Stop-Process -Force

# Check if ports are in use
netstat -ano | findstr :4000       # Backend
netstat -ano | findstr :5173       # Frontend

# Generate random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate bcrypt password hash
node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('Preethi',10));"
```

---

## Security Features Explained

### JWT Authentication
- User logs in → Gets access token (1 hour) + refresh token (7 days)
- Token sent in `Authorization: Bearer <token>` header
- Protects admin endpoints

### Password Security
- Optional bcrypt hashing (recommended for production)
- Plaintext supported for development

### Input Validation
- All inputs checked & sanitized
- Prevents XSS (cross-site scripting) attacks
- Prevents SQL injection

### Rate Limiting
- Login: 10 attempts per 15 minutes
- General: 200 requests per 15 minutes
- Prevents brute force attacks

### HTTPS Enforcement
- In production mode, redirects HTTP to HTTPS
- Secure cookies only sent over HTTPS

---

## Next Steps

1. ✓ Set up Gmail app password and email configuration
2. ✓ Test contact form submission and email notification
3. ✓ Login to admin portal and verify contacts appear
4. ✓ Plan deployment (choose hosting provider)
5. ✓ Configure production environment
6. ✓ Deploy backend and frontend to live server
7. ✓ Set up domain name and SSL certificate
8. ✓ Monitor and maintain application

---

## Support & Documentation

- **Backend docs:** `app/backend/README.md`
- **Frontend code:** `app/frontend/src/`
- **Environment template:** `app/backend/.env.example`
- **Contact:** support@titanobova.com

Congratulations! Your Titanobova website is ready. 🎉
