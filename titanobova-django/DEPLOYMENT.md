# Production Deployment Guide for Titanobova SaaS

## Overview
This is a production-ready Django SaaS application with enterprise-grade security.

## Security Features Implemented

### 1. **Authentication & Authorization**
- JWT token-based authentication
- Two-Factor Authentication (TOTP)
- Backup codes for account recovery
- Session management with secure cookies
- Account lockout after failed attempts
- Password hashing with Argon2

### 2. **Data Protection**
- HTTPS enforcement in production
- CSRF protection with secure tokens
- SQL injection prevention (Django ORM)
- XSS protection via template escaping
- Content Security Policy (CSP) headers
- Secure password validation

### 3. **Rate Limiting**
- IP-based rate limiting (100 req/min)
- User-based throttling (1000 req/hour)
- Endpoint-specific rate limits

### 4. **Audit Logging**
- All user actions logged (login, logout, updates)
- IP address and user agent tracking
- Comprehensive audit trails
- Login attempt monitoring
- Security event logging

### 5. **SaaS Production Setup**
- PostgreSQL for scalable database
- Redis for caching and sessions
- Celery for async tasks
- Docker containerization
- Load balancing ready
- Multi-tenant capable

## Deployment Instructions

### Prerequisites
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+
- Python 3.11+

### Local Development
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### Docker Deployment
```bash
# Build and start all services
docker-compose up -d

# Run migrations
docker-compose exec web python manage.py migrate

# Create superuser
docker-compose exec web python manage.py createsuperuser

# Collect static files
docker-compose exec web python manage.py collectstatic --noinput
```

### Production Deployment (AWS, Heroku, DigitalOcean)

#### Environment Variables Required
```
SECRET_KEY=<strong-random-key>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DB_ENGINE=django.db.backends.postgresql
DB_HOST=<database-host>
DB_NAME=titanobova_db
DB_USER=<database-user>
DB_PASSWORD=<secure-password>
REDIS_HOST=<redis-host>
SENDGRID_API_KEY=<api-key>
STRIPE_SECRET_KEY=<api-key>
SENTRY_DSN=<sentry-dsn>
```

#### Gunicorn Configuration
```bash
gunicorn --bind 0.0.0.0:8000 \
         --workers 4 \
         --threads 2 \
         --timeout 60 \
         --access-logfile - \
         --error-logfile - \
         titanobova_project.wsgi:application
```

#### Nginx Configuration
```nginx
upstream django {
    server web:8000;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    client_max_body_size 10M;

    location /static/ {
        alias /app/staticfiles_collected/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /app/media/;
        expires 7d;
    }

    location / {
        proxy_pass http://django;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/token/` - Obtain JWT token
- `POST /api/v1/auth/token/refresh/` - Refresh JWT token

### Users
- `POST /api/v1/users/login/` - User login
- `POST /api/v1/users/logout/` - User logout
- `GET /api/v1/users/profile/` - Get user profile
- `PUT /api/v1/users/update_profile/` - Update profile
- `POST /api/v1/users/enable_2fa/` - Enable 2FA
- `POST /api/v1/users/confirm_2fa/` - Confirm 2FA
- `POST /api/v1/users/verify_2fa/` - Verify 2FA token

### Contacts
- `GET /api/v1/contacts/` - List contacts
- `POST /api/v1/contacts/` - Submit contact form
- `POST /api/v1/contacts/subscribe/` - Subscribe to newsletter
- `POST /api/v1/contacts/unsubscribe/` - Unsubscribe

### Courses
- `GET /api/v1/courses/` - List published courses
- `GET /api/v1/courses/{id}/` - Get course details
- `GET /api/v1/enrollments/` - Get user enrollments
- `POST /api/v1/enrollments/` - Enroll in course

### Payments
- `POST /api/v1/payments/create_payment_intent/` - Create Stripe payment intent
- `GET /api/v1/payments/` - List user payments

### Admin
- `GET /api/v1/admin/dashboard/` - Admin dashboard (admin only)

## Monitoring & Logging

### Sentry Integration
- Automatic error reporting
- Performance monitoring
- Release tracking
- Custom events

### Logging Levels
- DEBUG: Development information
- INFO: General application info
- WARNING: Warning messages
- ERROR: Error conditions
- CRITICAL: Critical failures

Logs stored in: `/app/logs/`
- `titanobova.log` - General application logs
- `security.log` - Security events

## Maintenance

### Database Backups
```bash
# PostgreSQL backup
pg_dump -h localhost -U postgres titanobova_db > backup.sql

# Restore
psql -h localhost -U postgres titanobova_db < backup.sql
```

### Regular Tasks
- Review audit logs daily
- Monitor failed login attempts
- Check rate limit violations
- Update dependencies monthly
- Rotate JWT secrets quarterly

## Scaling Considerations

1. **Horizontal Scaling**
   - Multiple Django instances behind load balancer
   - Shared PostgreSQL and Redis
   - S3 for media storage

2. **Database Optimization**
   - Index frequently queried fields
   - Use database connection pooling
   - Archive old logs monthly

3. **Caching Strategy**
   - Redis for sessions and cache
   - CDN for static files
   - Page caching for public content

4. **Celery Tasks**
   - Email sending
   - Report generation
   - Data processing
   - Scheduled tasks with Celery Beat

## Support & Documentation

- Django: https://docs.djangoproject.com/
- DRF: https://www.django-rest-framework.org/
- Stripe: https://stripe.com/docs
- SendGrid: https://docs.sendgrid.com/

## Security Checklist for Production

- [ ] Change SECRET_KEY
- [ ] Set DEBUG=False
- [ ] Configure ALLOWED_HOSTS
- [ ] Enable HTTPS with SSL certificate
- [ ] Set secure database password
- [ ] Configure CORS origins
- [ ] Set up Sentry monitoring
- [ ] Configure SendGrid API key
- [ ] Set up Stripe keys
- [ ] Enable 2FA for admin
- [ ] Configure backup strategy
- [ ] Set up log rotation
- [ ] Enable rate limiting
- [ ] Configure firewall rules
- [ ] Test recovery procedures

---

**Last Updated:** January 2026
**Version:** 1.0.0
