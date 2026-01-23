# Titanobova - Founder Admin Portal Setup Guide

## Overview
The Titanobova website now includes a secure founder/admin portal for managing contact submissions from the contact form. This guide explains how to set up and use the system.

## Architecture

### Backend
- **Framework**: Node.js/Express.js (port 4000)
- **Database**: MySQL (recommended) or SQLite (fallback)
- **Authentication**: JWT-based with bcrypt password hashing
- **Email**: Nodemailer with SMTP (Gmail configured)
- **Security**: Helmet, CORS, rate limiting, input validation

### Frontend
- **Framework**: React 18+ with React Router
- **UI**: Tailwind CSS with calm blue/green color palette
- **Auth Storage**: localStorage for JWT token
- **Components**:
  - `FounderLogin.jsx` - Login page for founder authentication
  - `AdminDashboard.jsx` - Dashboard to view all contact submissions

## Getting Started

### Step 1: Database Setup

#### Option A: Using MySQL (Recommended for Production)

1. **Ensure MySQL is installed and running**
   ```bash
   # Windows: Start MySQL service
   net start MySQL80
   
   # macOS: Using Homebrew
   brew services start mysql
   
   # Linux: Using systemctl
   sudo systemctl start mysql
   ```

2. **Create the database**
   ```bash
   mysql -u root -p
   # Enter your MySQL root password
   
   CREATE DATABASE titanobova;
   EXIT;
   ```

3. **Update `.env` file** in `app/backend/`:
   ```dotenv
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=titanobova
   ```

#### Option B: Using SQLite (Default - No Setup Needed)
- SQLite is automatic and creates a local database file
- Default location: `app/backend/data/contacts.db`
- Perfect for development and small deployments

### Step 2: Configure Credentials

Edit `app/backend/.env`:

```dotenv
# Set your founder username and password
HOST_USERNAME=Rajkumar
HOST_PASSWORD=Preethi

# Or use bcrypt hash for production (recommended):
# Generate a bcrypt hash:
# node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123', 10, (err, hash) => console.log(hash))"
# Then use: HOST_PASSWORD_HASH=$2a$10$your_bcrypt_hash_here
```

**For Production**: Always use bcrypt hash instead of plaintext password:
```bash
cd app/backend
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash(process.argv[1], 10, (err, hash) => console.log(hash));" "YourSecurePassword123"
```

### Step 3: Configure Email Notifications (Optional)

Edit `app/backend/.env`:

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_specific_password
SMTP_FROM=noreply@titanobova.com
NOTIFY_EMAIL=founder@email.com
```

**For Gmail Setup**:
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Create app password: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Copy the 16-character password to `SMTP_PASS`

### Step 4: Start the Application

```bash
# Terminal 1: Start Backend
cd app/backend
npm install
npm run dev
# Backend running on http://localhost:4000

# Terminal 2: Start Frontend
cd app/frontend
npm install
npm run dev
# Frontend running on http://localhost:5173
```

## Using the Admin Portal

### Accessing the Portal

1. **Navigate to login**: http://localhost:5173/founder-login
2. **Demo Credentials** (during development):
   - Username: `admin`
   - Password: `admin123`

Or use credentials you configured in `.env`

### Founder Login Page Features
- Clean, professional login form
- Error messages for failed attempts
- Demo credentials display for testing
- Responsive design (mobile-friendly)
- Secure token storage in localStorage

### Admin Dashboard Features
- **Contact Statistics**: Total contacts, new messages, read messages
- **Contact Table**: View all submissions with:
  - Name, Email, Phone
  - Subject, Submission Date
  - Full Message (expandable)
- **Search Filter**: Filter by name or email in real-time
- **Logout**: Securely clear token and return to login
- **Auto-redirect**: Redirects to login if token is missing

## API Endpoints

### Authentication

```
POST /api/auth/login
Body: { username, password }
Response: { token, refreshToken }
```

```
POST /api/auth/refresh
Headers: Authorization: Bearer <refreshToken>
Response: { token }
```

```
POST /api/auth/logout
Headers: Authorization: Bearer <token>
Response: { message: "Logged out" }
```

### Contact Management

```
GET /api/admin/contacts
Headers: Authorization: Bearer <token>
Response: [{ id, name, email, phone, subject, message, created_at }, ...]
```

```
POST /api/contacts (Public)
Body: { name, email, phone, subject, message }
Response: { id, message: "Contact saved" }
```

## Navigation

The website now includes a "Founder" button in the navigation:
- **Desktop**: Top right navigation menu
- **Mobile**: Mobile menu (hamburger)
- Clicking "Founder" takes you to `/founder-login`

## Security Features

### 1. JWT Token Authentication
- Tokens expire after 1 hour
- Refresh tokens valid for 7 days
- Stored securely in localStorage
- Sent in Authorization header for API requests

### 2. Password Protection
- Passwords hashed with bcrypt (10 rounds)
- Never stored in plaintext
- Verified server-side on each login

### 3. API Security
- Rate limiting on authentication endpoints
- Input validation and sanitization
- CORS configuration to whitelist only your frontend
- Helmet.js for HTTP security headers
- Refresh token blacklisting on logout

### 4. Database Security
- Prepared statements to prevent SQL injection
- Connection pooling for efficiency
- Automatic schema initialization

## Troubleshooting

### Login Not Working
1. Verify backend is running: http://localhost:4000/api/health
2. Check `.env` credentials: `HOST_USERNAME` and `HOST_PASSWORD`
3. Check browser console for error messages
4. Verify CORS_ORIGIN in `.env` includes your frontend URL

### Database Connection Error
1. For MySQL: Verify database exists and credentials are correct
   ```bash
   mysql -h localhost -u root -p titanobova
   ```
2. For SQLite: Check file permissions on `app/backend/data/` directory
3. Check backend console for detailed error messages

### Email Notifications Not Working
1. Verify SMTP_USER and SMTP_PASS are correct
2. Check email spam folder
3. Ensure NOTIFY_EMAIL is set correctly
4. For Gmail: Verify app password (not regular password) is used
5. Check backend logs for SMTP errors

### Token Expired/Invalid
- Token expires after 1 hour
- Manually logout and login again to get fresh token
- Refresh token should auto-extend for 7 days

### CORS Errors
1. Verify `CORS_ORIGIN` in `.env` matches frontend URL exactly
2. Default: `http://localhost:5173`
3. For production: Update to your actual domain

## File Structure

```
app/
├── backend/
│   ├── index.js              # Express server
│   ├── db.js                 # Database layer
│   ├── package.json
│   ├── .env                  # Configuration (not in git)
│   ├── .env.example          # Configuration template
│   └── data/
│       └── contacts.db       # SQLite database (if used)
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main app with routes
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── FounderLogin.jsx      # NEW: Founder login
│   │   │   └── AdminDashboard.jsx    # NEW: Admin dashboard
│   │   └── components/
│   │       └── Logo.jsx
│   └── package.json
```

## Deployment Checklist

Before deploying to production:

- [ ] Change `HOST_USERNAME` and `HOST_PASSWORD_HASH` to secure values
- [ ] Generate strong `JWT_SECRET` and `REFRESH_TOKEN_SECRET`
- [ ] Set `NODE_ENV=production`
- [ ] Use MySQL database (not SQLite for production)
- [ ] Configure SMTP with your actual email provider
- [ ] Update `CORS_ORIGIN` to your production domain
- [ ] Enable HTTPS (required in production)
- [ ] Set secure database password
- [ ] Test authentication flow end-to-end
- [ ] Monitor logs for errors
- [ ] Set up email notifications testing
- [ ] Create database backups

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review backend logs: `npm run dev` output
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

## Next Steps

1. **Enhance Dashboard**:
   - Add contact response/status tracking
   - Export contacts to CSV/PDF
   - Mark contacts as read/archived
   - Add user notes to contacts

2. **Additional Features**:
   - Multiple admin users
   - Audit logs for admin actions
   - Contact follow-up reminders
   - Advanced search and filtering

3. **Email Features**:
   - Auto-reply to contact submissions
   - Admin notification customization
   - Contact form templates

---

**Setup Time**: ~15 minutes
**Difficulty**: Beginner to Intermediate
**Support**: Check error messages in backend console for detailed diagnostics
