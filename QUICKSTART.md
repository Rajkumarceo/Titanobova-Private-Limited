# QUICK START - Titanobova Website (MySQL)

## Prerequisites
✓ MySQL server running (localhost:3306)
✓ Database: `titanobova` created
✓ User: `root` with password configured in `.env`

## What You Need to Know

### 1️⃣ Configure MySQL in .env
Edit `app/backend/.env`:
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=titanobova
```

### 2️⃣ Start Both Servers (Use 2 Terminals)

**Terminal 1 - Backend:**
```powershell
cd C:\Users\Rajkumar\OneDrive\Desktop\VILSON\titanobova-website\app\backend
npm run dev
```
Should print: `✓ Backend running on port 4000` and `✓ MySQL contacts table ready.`

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\Rajkumar\OneDrive\Desktop\VILSON\titanobova-website\app\frontend
npm run dev
```
Should print: `✓ Local: http://localhost:5173`

### 3️⃣ Visit Website
Open browser: **http://localhost:5173**

### 4️⃣ Test Contact Form
1. Click "Contact" menu
2. Fill form (Name, Email, Message, etc.)
3. Click "Send"
4. Should see: "Message sent successfully!"

### 5️⃣ Check Email Notification
- Log into **titanobovapvt@gmail.com**
- Check inbox for notification email
- Email contains the contact form details

### 6️⃣ Admin Portal
1. Click "Portal" button (top right)
2. Login with:
   - Username: `Rajkumar`
   - Password: `Preethi`
3. View all submitted contacts

---

## Email Not Working? ⚠️

If you're not receiving emails to `titanobovapvt@gmail.com`:

### Check Gmail Setup
1. Go to https://myaccount.google.com/apppasswords
2. Look for "Mail" and "Windows Computer" app password
3. Copy the 16-character password
4. Open `app/backend/.env`
5. Update: `SMTP_PASS=your_16_char_app_password`
6. Restart backend (Ctrl+C, then `npm run dev`)

### If You Don't Have App Password
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Then go to https://myaccount.google.com/apppasswords
4. Create password for "Mail" + "Windows Computer"
5. Copy and paste into `.env`

---

## .env File Location
`C:\Users\Rajkumar\OneDrive\Desktop\VILSON\titanobova-website\app\backend\.env`

**Key Settings:**
```
# Leave as is (for local testing):
CORS_ORIGIN=http://localhost:5173
HOST_USERNAME=Rajkumar
HOST_PASSWORD=Preethi

# IMPORTANT - Set your Gmail app password:
SMTP_PASS=your_gmail_app_password_here
```

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Port 4000/5173 in use | `Get-Process node \| Stop-Process -Force` |
| No email received | Check Gmail app password in `.env` |
| Login doesn't work | Verify username: `Rajkumar`, password: `Preethi` |
| Frontend not loading | Make sure `npm run dev` is running in `app/frontend` |
| Backend errors | Check `.env` file, restart with `npm run dev` |

---

## Database
- **Type:** SQLite (default, no setup needed)
- **Location:** `app/backend/data/contacts.db`
- **Auto-created** when you run backend first time

Contacts are saved here when users submit the form.

---

## Files You Edited
✓ `app/backend/.env` - Configuration (Gmail, passwords, etc.)
✓ `app/backend/index.js` - Server code (security, email, API)
✓ `app/backend/db.js` - Database handler (SQLite/MySQL)

---

## Full Documentation
See:
- `SETUP_GUIDE.md` - Complete setup & deployment guide
- `app/backend/README.md` - Backend API documentation
- `app/backend/.env.example` - Environment template with comments

---

## Stop Servers
Press **Ctrl+C** in each terminal window

---

## Need Help?
Check logs in the terminal where you ran `npm run dev`
