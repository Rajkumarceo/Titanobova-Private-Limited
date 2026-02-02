# Titanobova Security & Performance Configuration

## Admin Access
- **Username**: Rajkumar
- **Password**: Titanobova
- **URL**: http://localhost:8000/admin/

## Security Enhancements Implemented ✅

### 1. Django Security (Backend)
- ✅ CSRF protection enabled with HttpOnly cookies
- ✅ SECURE_BROWSER_XSS_FILTER enabled
- ✅ X-FRAME-OPTIONS set to DENY (clickjacking protection)
- ✅ SECURE_CONTENT_SECURITY_POLICY configured
- ✅ HSTS (HTTP Strict Transport Security) enabled for 1 year
- ✅ Session cookies set to HttpOnly and Secure
- ✅ CORS properly configured for React frontend
- ✅ SameSite cookie policy set to Strict
- ✅ Password hashing with PBKDF2 (industry standard)
- ✅ Rate limiting middleware enabled (100 req/hr anonymous, 1000 authenticated)
- ✅ Security headers middleware active

### 2. Admin User Management
- ✅ Superuser "Rajkumar" can create/manage other admin users
- ✅ Admin panel accessible at http://localhost:8000/admin/
- ✅ Full user management capabilities enabled
- ✅ Permission system integrated with Django's auth

### 3. React Frontend Performance Optimization
- ✅ Vite configured with code splitting (vendor, api chunks)
- ✅ Lazy loading for route components
- ✅ Terser minification for production builds
- ✅ ES2020 target for modern browsers
- ✅ API proxy configured for seamless backend communication
- ✅ Tailwind CSS for optimized styling
- ✅ Development hot-reload enabled

## Running the Site

### Start Backend (Django)
```bash
cd titanobova-django
python manage.py runserver 0.0.0.0:8000
```

### Start Frontend (React)
```bash
cd titanobova-website/app/frontend
npm run dev
```

### Access
- **Frontend**: http://localhost:5173
- **Admin**: http://localhost:8000/admin/
- **API**: http://localhost:8000/api/v1/

## Adding New Admin Users

1. Go to http://localhost:8000/admin/
2. Login with Rajkumar / Titanobova
3. Click "Users" in the left menu
4. Click "Add User"
5. Create new user and check "Staff status" and "Superuser status" checkboxes
6. Save

## Security Best Practices

### Development
- Keep DEBUG=True for development (auto-reload)
- Use localhost addresses only

### Production (when deploying)
```env
DEBUG=False
SECRET_KEY=<generate-new-key>
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

## Performance Metrics

### Frontend Optimization
- **Code Splitting**: Separate vendor and API chunks
- **Minification**: Terser compression enabled
- **Caching**: Long-term cache busting with content hash
- **Network**: API proxy configured for single origin

### Backend Optimization
- **Static Files**: WhiteNoise middleware for efficient serving
- **Database**: SQLite for dev, PostgreSQL recommended for production
- **Caching**: In-memory cache configured for development
- **Rate Limiting**: Prevents brute force attacks

## Security Headers Configured

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Database Protection

- User passwords hashed with PBKDF2
- Login attempts tracked and limited
- Audit logging for all user actions
- Account lockout after multiple failed attempts
- 2FA (TOTP) support available

## API Security

- JWT token-based authentication
- Token expiration set to 24 hours
- Refresh tokens for extended sessions
- Rate limiting per endpoint
- Input validation on all endpoints
- CORS properly configured

## Monitoring & Logging

- Admin login tracking
- API request logging
- Error reporting (Sentry optional)
- System event logging

---

**Last Updated**: January 28, 2026
**Status**: Production-Ready
