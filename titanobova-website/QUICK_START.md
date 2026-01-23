# Quick Start - Titanobova Admin Portal

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js installed (v14 or higher)
- MySQL running (optional - SQLite works out of the box)
- Git (to pull code)

### Step 1: Start Backend (Terminal 1)
```bash
cd app/backend
npm install
npm run dev
```

Expected output:
```
✓ Backend running on port 4000
✓ CORS enabled for: http://localhost:5173
✓ Database: SQLite
✓ Notify email: titanobovapvt@gmail.com
```

### Step 2: Start Frontend (Terminal 2)
```bash
cd app/frontend
npm install
npm run dev
```

Expected output:
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

### Step 3: Access the Admin Portal

1. **Open your browser**: http://localhost:5173
2. **Click "Founder"** button in the navigation
3. **Login with demo credentials**:
   - Username: `admin`
   - Password: `admin123`

You should now see the **Admin Dashboard** with contact submissions!

---

## 🧪 Test the Complete Flow

### 1. Submit a Contact Form
1. Go to http://localhost:5173/contact
2. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: 555-1234
   - Subject: Test Message
   - Message: This is a test message
3. Click Submit

### 2. View in Admin Dashboard
1. Go to http://localhost:5173/founder-login
2. Login with admin/admin123
3. Your contact appears in the dashboard!

### 3. Test Search Filter
- Type "John" or "john@example.com" in search box
- Watch the table filter in real-time

### 4. Test Logout
- Click "Logout" button
- You're redirected to login page
- Try accessing /admin-dashboard directly (redirects to login)

---

## 📝 Change Admin Credentials

### Option 1: Simple (Development)
Edit `app/backend/.env`:
```dotenv
HOST_USERNAME=your_username
HOST_PASSWORD=your_password
```

### Option 2: Secure (Production)
1. Generate bcrypt hash:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourNewPassword123', 10, (err, hash) => console.log(hash))"
   ```

2. Copy the hash output and update `app/backend/.env`:
   ```dotenv
   HOST_USERNAME=your_username
   HOST_PASSWORD_HASH=<paste_hash_here>
   ```

3. Restart backend

---

## 🗄️ Database Info

### Current Setup
- **Default**: SQLite (automatic, no setup needed)
- **Location**: `app/backend/data/contacts.db`
- **Files**: Automatically created on first run

### Switch to MySQL (Optional)
1. Install MySQL if not already installed
2. Create database:
   ```bash
   mysql -u root -p
   CREATE DATABASE titanobova;
   EXIT;
   ```

3. Update `app/backend/.env`:
   ```dotenv
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=titanobova
   ```

4. Restart backend

---

## 📧 Email Setup (Optional)

### Enable Contact Form Notifications
Update `app/backend/.env`:

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@titanobova.com
NOTIFY_EMAIL=founder@email.com
```

**For Gmail**:
1. Go to https://myaccount.google.com/apppasswords
2. Generate app password (select Mail + Windows Computer)
3. Copy 16-character password to `SMTP_PASS`
4. Restart backend

---

## 🔧 Troubleshooting

### Backend Won't Start
```bash
# Check if port 4000 is in use
# Windows:
netstat -ano | findstr :4000

# Kill process using port 4000
taskkill /PID <PID> /F

# Or change PORT in .env
PORT=5000
```

### Frontend Won't Connect to Backend
1. Verify backend is running: http://localhost:4000/api/health
2. Check `CORS_ORIGIN` in `app/backend/.env` includes `http://localhost:5173`
3. Check browser console for error messages

### Login Not Working
1. Verify backend is running
2. Check credentials in `app/backend/.env`
3. Look at backend console for error messages

### No Contacts Appearing
1. Verify you submitted a contact form first
2. Check browser Network tab to see if API call succeeded
3. Check backend logs for database errors

### Database Errors
- **SQLite**: Check write permissions on `app/backend/data/` folder
- **MySQL**: Verify MySQL is running and credentials are correct

---

## 📱 Mobile Testing

The admin portal is fully responsive:
1. Open http://localhost:5173 on mobile/tablet
2. Navigate to "Founder" (appears in mobile menu)
3. Login and use dashboard
4. All features work on mobile!

---

## 🔐 Important Notes

### Development vs Production
| Setting | Development | Production |
|---------|-------------|-----------|
| Database | SQLite | MySQL |
| Password | Plaintext OK | Bcrypt hash REQUIRED |
| HTTPS | Not required | REQUIRED |
| Credentials | demo OK | Secure, unique |

### Security Checklist
- [ ] Change admin username and password
- [ ] Use bcrypt hash for password (production)
- [ ] Set unique JWT secrets
- [ ] Configure HTTPS (production)
- [ ] Whitelist only your domain in CORS_ORIGIN
- [ ] Keep .env file out of git
- [ ] Regular database backups
- [ ] Monitor access logs

---

## 📊 What's Included

✅ Founder login page with JWT authentication  
✅ Admin dashboard to view all contacts  
✅ Real-time search/filter for contacts  
✅ Contact statistics (total, new, read)  
✅ Secure token storage and refresh  
✅ Responsive design (mobile-friendly)  
✅ Email notifications (optional)  
✅ SQLite database (auto-setup)  
✅ MySQL support (optional)  
✅ Rate limiting and input validation  
✅ CORS protection  
✅ Full error handling  

---

## 🎯 Next Steps

1. ✅ Run the quick start steps above
2. 🔐 Change admin credentials in `.env`
3. 📧 (Optional) Set up email notifications
4. 🗄️ (Optional) Switch to MySQL
5. 🚀 Deploy to production
6. 📈 Monitor contacts and follow up

---

## 📚 Learn More

- See `ADMIN_SETUP.md` for detailed documentation
- Backend source: `app/backend/index.js`
- Frontend components: `app/frontend/src/pages/`

---

**Everything is ready! Start the backend and frontend, then visit http://localhost:5173 to begin.** 🚀
