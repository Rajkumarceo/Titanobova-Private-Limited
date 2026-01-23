# Django SaaS Backend for Titanobova

Production-ready Django backend with enterprise security features.

## Quick Start

### Development
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Production (Docker)
```bash
docker-compose up -d
```

## Features

✅ JWT Authentication with 2FA  
✅ Role-based Access Control  
✅ Stripe Payment Integration  
✅ SendGrid Email Service  
✅ Comprehensive Audit Logging  
✅ Rate Limiting & DDoS Protection  
✅ HTTPS & Security Headers  
✅ PostgreSQL with Redis Caching  
✅ Celery for Async Tasks  
✅ Sentry Error Tracking  

## API Documentation

See [DEPLOYMENT.md](DEPLOYMENT.md) for full API endpoints and deployment guide.

## Security Features

- Argon2 password hashing
- TOTP-based 2FA
- Backup codes for recovery
- Login attempt tracking
- IP-based rate limiting
- CSRF token protection
- Content Security Policy headers
- HTTPS enforcement
- Session timeout management
- Comprehensive audit trails

## Directory Structure

```
titanobova-django/
├── titanobova_project/      # Django project settings
├── apps/
│   ├── users/              # User management
│   ├── contacts/           # Contact forms
│   ├── courses/            # Course management
│   ├── payments/           # Stripe payments
│   └── admin_panel/        # Admin functions
├── requirements.txt        # Python dependencies
├── docker-compose.yml      # Docker orchestration
├── Dockerfile             # Production image
└── DEPLOYMENT.md          # Deployment guide
```

## Admin Panel

Access at `/admin/` with superuser credentials.

Default: admin@titanobova.com / ChangeMe123!

## Support

For issues and documentation, see DEPLOYMENT.md
