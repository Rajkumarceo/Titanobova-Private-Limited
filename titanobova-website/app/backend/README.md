# Titanobova Backend API

## Overview
This is the Express.js backend server for the Titanobova company website. It handles:
- Contact form submissions (stored in database)
- Host authentication (JWT-based login)
- Email notifications (SMTP-based)
- Admin dashboard API (protected routes)

## Quick Start

### 1. Install Dependencies
```bash
cd app/backend
npm install
```

### 2. Configure Environment
Open `.env` in the backend folder and set your MySQL connection details:
```
# MySQL Configuration (REQUIRED)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=titanobova

# Authentication
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
HOST_USERNAME=Rajkumar
HOST_PASSWORD=Preethi

# Frontend CORS
CORS_ORIGIN=http://localhost:5173

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_USER=titanobovapvt@gmail.com
SMTP_PASS=your_gmail_app_password
NOTIFY_EMAIL=titanobovapvt@gmail.com

# Server
NODE_ENV=development
PORT=4000
```

### 3. Create Database

The `contacts` table will be created automatically on first run. To create it manually:
```bash
node migrations/create_mysql_contacts.js
```

Or use MySQL CLI:
```sql
CREATE DATABASE IF NOT EXISTS titanobova;
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

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Output should show:
```
✓ Backend running on port 4000
✓ MySQL contacts table ready.
✓ CORS enabled for: http://localhost:5173
✓ Email transporter configured (SMTP ready)
```

---

## API Endpoints

### Public Endpoints

#### POST /api/contacts
**Submit a contact form** - Stores in database and sends email to `NOTIFY_EMAIL`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry",
  "message": "I have a question..."
}
```

**Response (201):**
```json
{
  "id": 1,
  "message": "Contact submitted successfully"
}
```

**Validation:**
- `name` (required): Non-empty string
- `email` (required): Valid email
- `message` (required): Non-empty string
- `phone`, `subject` (optional): Strings

**When submitted:**
✓ Data saved to database (SQLite or MySQL)
✓ Email sent to `NOTIFY_EMAIL` with form details

---

#### POST /api/auth/login
**Host login** - Get JWT access token and refresh token

**Request:**
```json
{
  "username": "Rajkumar",
  "password": "Preethi"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Notes:**
- Rate limited: max 10 attempts per 15 minutes
- Access token expires: 1 hour
- Refresh token (in HttpOnly cookie) expires: 7 days

---

#### GET /api/health
**Health check** - Verify server is running

**Response (200):**
```json
{
  "status": "ok",
  "server": "Titanobova Backend"
}
```

---

### Protected Endpoints
**Require:** `Authorization: Bearer <access_token>` header

#### GET /api/admin/contacts
**Get all contacts** - View all submitted contact forms (host only)

**Request:**
```
GET /api/admin/contacts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "contacts": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "subject": "Inquiry",
      "message": "I have a question...",
      "created_at": "2025-11-21T10:30:00Z"
    }
  ]
}
```

---

#### POST /api/auth/refresh
**Refresh access token** - Get new token using refresh token (in cookie)

**Request:**
```
POST /api/auth/refresh
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### POST /api/auth/logout
**Logout** - Revoke refresh token

**Request:**
```
POST /api/auth/logout
```

**Response (200):**
```json
{
  "message": "Logged out"
}
```

---

## Email Setup (Gmail)

### Step 1: Enable 2-Step Verification
1. Go to https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow prompts

### Step 2: Create App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 3: Update `.env`
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=titanobovapvt@gmail.com
SMTP_PASS=abcdefghijklmnop
NOTIFY_EMAIL=titanobovapvt@gmail.com
```

### Step 4: Test
- Submit a contact form from frontend
- Check email inbox for notification
- If not received, check spam folder

---

## Database Setup (MySQL Required)

This backend uses **MySQL only** (SQLite no longer supported).

### Prerequisites
- MySQL server running locally or remote
- Database name: `titanobova`
- User with create/insert/select permissions

### Setup Steps

**Step 1: Create Database**
```sql
CREATE DATABASE IF NOT EXISTS titanobova;
```

**Step 2: Set Environment Variables in `.env`**
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=titanobova
```

Or use a connection string:
```env
MYSQL_URL=mysql://root:password@localhost:3306/titanobova
```

**Step 3: Run Backend**
The `contacts` table will be created automatically on first startup.

**Step 4: Verify Connection**
```bash
mysql -h localhost -u root -p
# Once connected:
USE titanobova;
SHOW TABLES;
SELECT * FROM contacts;
```

---

## Security Features

### Already Implemented ✓
- **Helmet.js** - HTTP security headers
- **Rate Limiting** - Login: 10/15min, General: 200/15min
- **Input Validation** - express-validator (XSS, SQL injection protection)
- **CORS** - Restricted to frontend origin only
- **Body Size Limits** - 10KB max (prevents abuse)
- **JWT Authentication** - 1 hour expiry + 7 day refresh
- **HttpOnly Cookies** - Secure refresh token storage
- **HTTPS Enforcement** - In production mode (`NODE_ENV=production`)
- **Bcrypt Support** - Optional password hashing

### Production Checklist
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Use HTTPS (nginx reverse proxy, Azure, AWS, etc.)
- [ ] Generate strong secrets:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Use `HOST_PASSWORD_HASH` (bcrypt) instead of plaintext:
  ```bash
  node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('Preethi',10));"
  ```
- [ ] Store secrets securely (not in git):
  - Azure Key Vault
  - AWS Secrets Manager
  - Environment variables from hosting provider
- [ ] Restrict MySQL firewall access (if applicable)
- [ ] Use verified SMTP service (Gmail, SendGrid, Mailgun)
- [ ] Replace in-memory `refreshTokens` with Redis/DB
- [ ] Enable SSL for database connections
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Set up monitoring and logging

---

## Troubleshooting

### "Address already in use :::4000"
Another process is using port 4000.
```bash
# Kill the process
Get-Process node | Stop-Process -Force

# Or change port in .env
PORT=5000
```

### Email not sending
✓ Check `.env`: `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` set?
✓ For Gmail: Using App Password (not regular password)?
✓ 2-Step Verification enabled?
✓ Check spam folder
✓ Backend logs should show "Email transporter configured"

### MySQL connection error
✓ MySQL server running?
✓ Correct `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`?
✓ Test: `mysql -h localhost -u root -p titanobova`

### Login not working
✓ `HOST_USERNAME` and `HOST_PASSWORD` correct?
✓ If using hash: is `HOST_PASSWORD_HASH` valid bcrypt?
✓ Check backend console for errors

---

## Development Commands

### Generate Random Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Generate Bcrypt Hash
```bash
node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync(process.argv[1],10));" "Preethi"
```

### Test Endpoints (PowerShell)
```powershell
# Submit contact
$body = @{ name='Test'; email='test@example.com'; message='Hello' } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:4000/api/contacts -Method Post -Body $body -ContentType 'application/json'

# Login
$creds = @{ username='Rajkumar'; password='Preethi' } | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:4000/api/auth/login -Method Post -Body $creds -ContentType 'application/json'

# Get contacts
Invoke-RestMethod -Uri http://localhost:4000/api/admin/contacts -Headers @{ Authorization="Bearer $($response.token)" }
```

---

## Project Structure
```
app/backend/
├── index.js                      # Main server (routes, middleware)
├── db.js                         # Database interface (SQLite/MySQL)
├── .env                          # Configuration (secrets, DO NOT commit)
├── .env.example                  # Template for .env
├── README.md                     # This file
├── package.json                  # Dependencies
├── migrations/
│   └── create_mysql_contacts.js  # MySQL table creation script
└── data/
    └── contacts.db               # SQLite database (auto-created)
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 4000 in use | Kill process or change PORT in .env |
| MySQL won't connect | Verify server running, check credentials |
| Gmail not sending emails | Use app password, enable 2FA, check spam |
| "Invalid credentials" | Check HOST_USERNAME/PASSWORD in .env |
| CORS errors from frontend | Verify CORS_ORIGIN matches frontend URL |
| Contact not saving | Check database connectivity, logs |

---

## License & Contact
**Titanobova Pvt Limited**  
For support: contact@titanobova.com
