# Migration Guide: Node.js to Django Backend

This guide explains how to migrate from the existing Node.js/Express backend to the new Django backend with enhanced security.

## Overview of Changes

### Architecture Migration
```
OLD: Node.js + Express
├── SQLite/MySQL database
├── JWT auth (basic)
├── Manual security
└── Limited audit logging

NEW: Django + DRF
├── PostgreSQL + Redis
├── JWT + 2FA
├── Built-in security
└── Comprehensive audit logging
```

## Step-by-Step Migration

### Phase 1: Setup Django Backend (DONE)

Your new Django backend is located at:
```
titanobova-django/
```

It includes:
- ✅ Custom User model with 2FA support
- ✅ PostgreSQL database setup
- ✅ Redis caching
- ✅ Stripe payment integration
- ✅ Email service (SendGrid)
- ✅ Audit logging
- ✅ Rate limiting
- ✅ Production Docker setup

### Phase 2: Database Migration

#### Old Node.js Contacts (MySQL/SQLite)
```sql
-- Export from old database
SELECT * FROM contacts;
SELECT * FROM users;
SELECT * FROM enrollments;
```

#### Import to Django
```python
# Create a management command to import data
python manage.py import_from_nodejs old_db_connection_string
```

### Phase 3: Frontend Integration

Update your React frontend to use new API endpoints:

#### Old Endpoints → New Endpoints
```
POST /api/auth/login → POST /api/v1/auth/token/
POST /api/auth/register → POST /api/v1/users/register/
GET /api/users/profile → GET /api/v1/users/profile/
POST /api/contacts → POST /api/v1/contacts/contacts/
GET /api/courses → GET /api/v1/courses/courses/
POST /api/payments → POST /api/v1/payments/create_payment_intent/
```

#### Update API Client
```javascript
// src/services/api.js (React)
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE}/auth/token/`, {
    email,
    password
  });
  return response.data;
};

export const refreshToken = async (refresh) => {
  const response = await axios.post(`${API_BASE}/auth/token/refresh/`, {
    refresh
  });
  return response.data.access;
};

export const submitContact = async (formData) => {
  const response = await axios.post(
    `${API_BASE}/contacts/contacts/`,
    formData,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    }
  );
  return response.data;
};
```

### Phase 4: Environment Configuration

#### Update .env files

**Frontend (.env)**
```
VITE_API_URL=http://localhost:8000/api/v1
VITE_STRIPE_PUBLIC_KEY=pk_live_your_key
```

**Backend (.env.production)**
```
DEBUG=False
SECRET_KEY=your-production-secret
DB_HOST=your-postgres-host
REDIS_HOST=your-redis-host
SENDGRID_API_KEY=your-sendgrid-key
STRIPE_SECRET_KEY=your-stripe-key
```

### Phase 5: Deployment

#### Local Testing
```bash
# Terminal 1: Django
cd titanobova-django
python manage.py migrate
python manage.py runserver

# Terminal 2: Frontend
cd titanobova-website/app/frontend
npm run dev
```

#### Production with Docker
```bash
cd titanobova-django
docker-compose -f docker-compose.yml up -d
```

## Security Enhancements

### User Authentication
```python
# Old: Basic JWT
# POST /api/auth/login
# Returns: { token }

# New: JWT + 2FA
# POST /api/v1/auth/token/
# Returns: { access, refresh, requires_2fa }
# If 2FA enabled: verify with TOTP token

# POST /api/v1/users/verify_2fa/
# Body: { token: "123456" }
# OR { token: "backup-code" }
```

### Two-Factor Authentication Setup
```bash
# User enables 2FA
POST /api/v1/users/enable_2fa/

# Response:
{
  "secret": "JBSWY3DPEBLW64TMMQ======",
  "qr_code_url": "otpauth://...",
  "backup_codes": [
    "abcd1234",
    "efgh5678",
    ...
  ]
}

# Confirm with authenticator app
POST /api/v1/users/confirm_2fa/
{
  "token": "123456"
}
```

### Audit Logging
Every user action is logged:
```python
# Accessible via Django admin or API
/admin/users/auditlog/

# Fields logged:
- user
- action (login, logout, create, update, delete)
- resource_type
- ip_address
- user_agent
- timestamp
- details (JSON)
```

## Payment Processing

### Stripe Integration
```javascript
// Frontend implementation
import { loadStripe } from '@stripe/js';

const createPaymentIntent = async (amount) => {
  const response = await axios.post(
    `${API_BASE}/payments/create_payment_intent/`,
    {
      amount,
      description: 'Course enrollment'
    }
  );
  return response.data.client_secret;
};

// Handle payment
const handlePayment = async (amount) => {
  const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
  const clientSecret = await createPaymentIntent(amount);
  
  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: {
        card: cardElement
      }
    }
  );
};
```

## Data Models Comparison

### Users
```python
# Old Node.js
{
  id, email, password, name, userType, createdAt
}

# New Django
{
  id (UUID), email, password (Argon2), 
  first_name, last_name, phone_number,
  user_type, profile_picture, bio, date_of_birth,
  totp_enabled, totp_secret, backup_codes,
  email_verified, failed_login_attempts,
  account_locked_until,
  created_at, updated_at, last_password_change,
  last_login_ip
}
```

### Contacts
```python
# Old Node.js
{
  id, name, email, subject, message, createdAt
}

# New Django (Enhanced)
{
  id (UUID), name, email, phone, subject, message,
  status (new/read/responded/closed),
  user (foreign key),
  internal_notes, response_message,
  responded_by (admin user),
  ip_address, user_agent,
  created_at, updated_at
}
```

## API Rate Limits

```
Anonymous Users: 100 requests/hour per IP
Authenticated Users: 1000 requests/hour
Admin Users: Unlimited (recommended)
```

## Rollback Plan

If needed, keep the old Node.js backend running:

```bash
# Run both in parallel
Port 4000: Node.js backend (old)
Port 8000: Django backend (new)

# Gradually migrate traffic
- Keep API v1 on Node.js
- Deploy Django as API v2
- Update frontend to use v2
- Decommission Node.js when ready
```

## Testing the Migration

### Test User Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@titanobova.com",
    "password": "ChangeMe123!"
  }'
```

### Test Contact Submission
```bash
curl -X POST http://localhost:8000/api/v1/contacts/contacts/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "Testing new backend"
  }'
```

### Test Payment Intent
```bash
curl -X POST http://localhost:8000/api/v1/payments/create_payment_intent/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "99.99",
    "description": "Course enrollment"
  }'
```

## Monitoring & Support

### View Logs
```bash
# Application logs
tail -f titanobova-django/logs/titanobova.log

# Security logs
tail -f titanobova-django/logs/security.log

# Docker logs
docker-compose logs -f web
```

### Admin Panel
- URL: http://localhost:8000/admin/
- View: Users, Contacts, Courses, Payments, Audit Logs, Login Attempts

### Common Issues

**CORS Error**: Update CORS_ALLOWED_ORIGINS in settings.py
**Auth Failed**: Verify token in Authorization header
**Payment Error**: Check STRIPE_SECRET_KEY in .env
**Email Failed**: Verify SENDGRID_API_KEY

## Timeline

- Week 1: Setup Django backend (DONE ✅)
- Week 2: Migrate user data, test authentication
- Week 3: Update frontend, test payment flows
- Week 4: Load testing, performance optimization
- Week 5: Production deployment, monitoring
- Week 6: Decommission old backend

## Support

For questions or issues:
1. Check logs: `logs/` directory
2. Django admin: `http://localhost:8000/admin/`
3. API docs: http://localhost:8000/api/v1/
4. Error tracking: Sentry dashboard

---

**Migration Status**: ✅ Backend Ready | ⏳ Frontend Integration | ⏳ Data Migration | ⏳ Production Deployment
