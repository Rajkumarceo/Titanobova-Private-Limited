# Titanobova Website - Complete Project Guide

Welcome to the Titanobova website with integrated founder admin portal for contact management!

## 📖 Project Overview

**Titanobova** is a modern, professional website featuring:
- **Beautiful Frontend**: Clean, minimalistic design with calm blue/green color palette
- **Contact Form**: Allow visitors to submit inquiries
- **Founder Admin Portal**: Secure authentication to view all contact submissions
- **Database Integration**: Store contacts securely in MySQL (or SQLite)
- **Email Notifications**: Automatic email alerts when new contacts arrive
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

## 🗂️ Directory Structure

```
titanobova-website/
├── index.html                      # Main landing page (static)
├── QUICK_START.md                  # Quick 5-minute setup guide (START HERE)
├── ADMIN_SETUP.md                  # Detailed admin portal documentation
├── DEPLOYMENT.md                   # Production deployment guide
├── README.md                        # This file
│
├── app/
│   ├── backend/                    # Node.js/Express backend server
│   │   ├── index.js               # Main server with API endpoints
│   │   ├── db.js                  # Database layer (MySQL + SQLite)
│   │   ├── package.json           # Backend dependencies
│   │   ├── .env                   # Configuration (NEVER commit to git)
│   │   ├── .env.example           # Configuration template
│   │   ├── verify-smtp.js         # Email setup verification tool
│   │   └── data/                  # Database files (SQLite)
│   │       └── contacts.db        # Auto-created SQLite database
│   │
│   └── frontend/                   # React frontend application
│       ├── package.json           # Frontend dependencies
│       ├── postcss.config.cjs     # PostCSS configuration
│       ├── tailwind.config.cjs    # Tailwind CSS configuration
│       ├── index.html             # React root HTML
│       ├── src/
│       │   ├── App.jsx            # Main React app with routing
│       │   ├── main.jsx           # React entry point
│       │   ├── index.css          # Global CSS
│       │   ├── pages/
│       │   │   ├── Home.jsx       # Landing page
│       │   │   ├── About.jsx      # About the company
│       │   │   ├── Services.jsx   # Services offered
│       │   │   ├── Contact.jsx    # Contact form
│       │   │   ├── Login.jsx      # Portal login (general)
│       │   │   ├── Admin.jsx      # Portal page
│       │   │   ├── FounderLogin.jsx       # 🆕 Founder authentication
│       │   │   └── AdminDashboard.jsx     # 🆕 Admin dashboard
│       │   └── components/
│       │       └── Logo.jsx       # Logo component
│       └── public/                # Static assets
│
├── assets/                          # Static resources
│   └── [images, downloads, etc]
│
├── css/
│   ├── styles.css                 # Main stylesheet (rewritten with new colors)
│   ├── professional.css           # Professional styles
│   └── minimal.css                # Minimal styles
│
├── js/
│   └── script.js                  # Utility scripts
│
└── pages/                           # Static HTML pages (alternatives to React)
    ├── about.html
    ├── contact.html
    └── services.html
```

## 🚀 Quick Start (5 Minutes)

1. **Start Backend** (Terminal 1):
   ```bash
   cd app/backend
   npm install
   npm run dev
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd app/frontend
   npm install
   npm run dev
   ```

3. **Access Website**: http://localhost:5173

4. **Try Founder Portal**:
   - Click "Founder" button in navigation
   - Login: `admin` / `admin123`
   - View all contact submissions

**For detailed setup**: See [QUICK_START.md](QUICK_START.md)

---

## 🔑 Key Features

### 👥 Public Website
- ✅ Beautiful landing page with hero section
- ✅ About company page
- ✅ Services showcase
- ✅ Contact form with validation
- ✅ Responsive mobile design
- ✅ Calm blue/green color scheme
- ✅ Smooth hover animations

### 🔐 Founder Admin Portal
- ✅ Secure JWT-based authentication
- ✅ Admin dashboard with contact statistics
- ✅ Searchable contact table (by name/email)
- ✅ View all contact submissions
- ✅ Auto-logout on token expiration
- ✅ Protect admin routes with authentication
- ✅ Clean, professional UI

### 🗄️ Backend Features
- ✅ Express.js REST API
- ✅ MySQL or SQLite database
- ✅ Bcrypt password hashing
- ✅ JWT token authentication
- ✅ Email notifications via SMTP
- ✅ Input validation & sanitization
- ✅ CORS & security headers
- ✅ Rate limiting on auth endpoints
- ✅ Automatic database initialization

### 🎨 Design
- ✅ Minimalistic, clean aesthetic
- ✅ Calm blue (#5B8DEE) & sage green (#A8D5BA) palette
- ✅ Smooth 0.3s transitions
- ✅ Professional shadows & borders
- ✅ Mobile-first responsive design
- ✅ Accessible color contrast
- ✅ No emojis (professional look)

---

## 📋 Credentials & Configuration

### Default Demo Credentials
```
Username: admin
Password: admin123
```
⚠️ **Change these in production!** Edit `app/backend/.env`

### Configuration Files
- `app/backend/.env` - Backend configuration (secrets, database, email)
- `app/backend/.env.example` - Template for configuration
- `app/frontend/.env` - Frontend config (if needed)

---

## 🔗 API Endpoints

### Authentication
```
POST /api/auth/login
  Body: { username, password }
  Returns: { token }

POST /api/auth/refresh
  Headers: Authorization: Bearer <refreshToken>
  Returns: { token }

POST /api/auth/logout
  Headers: Authorization: Bearer <token>
```

### Contacts (Public)
```
POST /api/contacts
  Body: { name, email, phone, subject, message }
  Returns: { id, message }

GET /api/health
  Returns: { status: "ok" }
```

### Admin (Protected)
```
GET /api/admin/contacts
  Headers: Authorization: Bearer <token>
  Returns: { contacts: [...] }
  Required role: "host" (founder/admin)
```

---

## 🛠️ Technologies Used

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18+ | UI framework |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Backend** | Node.js/Express | REST API server |
| **Database** | MySQL/SQLite | Data persistence |
| **Auth** | JWT + bcryptjs | Secure authentication |
| **Email** | Nodemailer | Email notifications |
| **Validation** | express-validator | Input validation |
| **Security** | Helmet | HTTP security headers |
| **CORS** | cors middleware | Cross-origin requests |
| **Routing** | React Router | Frontend routing |

---

## 📚 Documentation

### For Setup & Configuration
→ **[QUICK_START.md](QUICK_START.md)** - Get running in 5 minutes

### For Advanced Admin Portal Setup
→ **[ADMIN_SETUP.md](ADMIN_SETUP.md)** - Complete configuration guide

### For Production Deployment
→ **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to servers, Docker, cloud

---

## 🔐 Security Features

### Authentication
- ✅ JWT tokens (1-hour expiration)
- ✅ Refresh tokens (7-day expiration)
- ✅ Bcrypt password hashing (10 rounds)
- ✅ Secure cookie flags (httpOnly, secure, sameSite)
- ✅ Token revocation on logout

### API Security
- ✅ Input validation & escaping
- ✅ SQL injection prevention (prepared statements)
- ✅ CORS whitelisting
- ✅ Rate limiting on auth endpoints
- ✅ Helmet.js security headers
- ✅ HTTPS in production (enforced)

### Data Protection
- ✅ Passwords never stored in plaintext
- ✅ Database connection pooling
- ✅ Parameterized queries
- ✅ Regular backup support
- ✅ Environment variables for secrets

---

## 📱 Responsive Design

All pages are fully responsive:
- ✅ Mobile phones (320px+)
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)
- ✅ Large screens (1400px+)

Test on different devices at: http://localhost:5173

---

## 🌐 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🚀 Development Commands

### Backend
```bash
cd app/backend

npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
npm run verify-smtp # Test email configuration
```

### Frontend
```bash
cd app/frontend

npm install         # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Check code style
```

---

## 📊 Database Schema

### Contacts Table
```sql
CREATE TABLE contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ✅ Testing Checklist

After setup, verify:
- [ ] Frontend loads at http://localhost:5173
- [ ] Backend health check: http://localhost:4000/api/health
- [ ] Navigation menu shows "Founder" button
- [ ] Click "Founder" → login page loads
- [ ] Login with admin/admin123 → dashboard loads
- [ ] Contact form submits successfully
- [ ] New contact appears in admin dashboard
- [ ] Search filter works
- [ ] Logout returns to login page
- [ ] (Optional) Email notification received

---

## 🐛 Common Issues & Solutions

### Backend Won't Start
```
Error: Port 4000 already in use
Solution: Kill the process or change PORT in .env
```

### Frontend Can't Connect to Backend
```
Error: CORS error or connection refused
Solution: Verify backend is running, check CORS_ORIGIN in .env
```

### Login Not Working
```
Error: Invalid credentials
Solution: Verify HOST_USERNAME and HOST_PASSWORD in .env
```

### Database Errors
```
For MySQL: Verify MySQL is running, credentials correct
For SQLite: Check file permissions on data/ folder
```

See **[ADMIN_SETUP.md](ADMIN_SETUP.md#troubleshooting)** for more solutions.

---

## 📈 Scaling & Performance

### Optimizations
- ✅ Gzip compression for API responses
- ✅ Connection pooling for database
- ✅ JWT caching to reduce validation time
- ✅ Static file caching in frontend
- ✅ Database query optimization

### For High Traffic
1. Add Redis for session caching
2. Use multiple backend instances with load balancer
3. Enable CDN for static files
4. Create database read replicas
5. Monitor with APM tools (New Relic, DataDog)

---

## 📞 Support & Troubleshooting

### Check These First
1. **Backend console** - `npm run dev` output
2. **Browser console** - F12 → Console tab
3. **Network tab** - Check API request/response
4. **.env file** - Verify all values are set

### Debug Mode
```bash
# Verbose backend logs
DEBUG=* npm run dev

# Check JWT token in browser console
localStorage.getItem('authToken')

# Verify API endpoint
curl http://localhost:4000/api/health
```

---

## 🔄 Updates & Maintenance

### Regular Tasks
- ✅ Weekly: Review error logs
- ✅ Monthly: Update dependencies (`npm update`)
- ✅ Monthly: Check for security vulnerabilities (`npm audit`)
- ✅ Quarterly: Backup database
- ✅ Quarterly: Review access logs

### Dependency Updates
```bash
# Check outdated packages
npm outdated

# Update packages safely
npm update

# Security audit
npm audit fix
```

---

## 📄 License & Attribution

This project includes:
- Custom frontend design (React)
- Custom backend API (Node.js/Express)
- Open source dependencies (see package.json files)

---

## 🎯 Future Enhancements

Potential features to add:
- [ ] Multiple admin users with roles
- [ ] Contact response/status tracking
- [ ] Export contacts to CSV/PDF
- [ ] Advanced search filters
- [ ] Message categories/tags
- [ ] Automated follow-up reminders
- [ ] Analytics dashboard
- [ ] Two-factor authentication
- [ ] Audit logs for admin actions
- [ ] Integration with CRM systems

---

## 📝 Notes

### Important
- Never commit `.env` file to git (contains secrets)
- Always use HTTPS in production
- Change default credentials before deploying
- Regular database backups are essential
- Monitor server logs regularly

### Development Tips
- Use `.env.example` as a template
- Keep JWT_SECRET unique and secure
- Test on mobile devices frequently
- Monitor browser console for errors
- Use browser DevTools for debugging

---

## 🤝 Contributing

To make improvements:
1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

---

## 📞 Contact

For questions or issues:
- Check documentation files above
- Review error messages in console
- Consult ADMIN_SETUP.md for detailed help

---

**Welcome to Titanobova! 🚀 Happy coding!**

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready
