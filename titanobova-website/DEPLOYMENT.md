# Titanobova - Production Deployment Guide

## Overview
This guide explains how to deploy the Titanobova website with the admin portal to production.

## Pre-Deployment Checklist

### Security & Credentials
- [ ] Change `HOST_USERNAME` and `HOST_PASSWORD_HASH` to secure values
- [ ] Generate secure `JWT_SECRET` and `REFRESH_TOKEN_SECRET`
- [ ] Remove any demo credentials from `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Never commit `.env` file to git (use `.env.example` template instead)
- [ ] Use bcrypt hash for password (not plaintext)

### Database
- [ ] Use MySQL for production (not SQLite)
- [ ] Create production MySQL database with strong credentials
- [ ] Test database connection from server
- [ ] Plan for regular backups
- [ ] Test contact submission creates entry in database

### Frontend
- [ ] Update `CORS_ORIGIN` to your production domain
- [ ] Update API endpoints from `localhost:4000` to your production API URL
- [ ] Build frontend: `npm run build`
- [ ] Test all routes work after build

### Email
- [ ] Configure SMTP with production email provider
- [ ] Test email notifications work
- [ ] Set correct `NOTIFY_EMAIL` address
- [ ] Verify `SMTP_FROM` address is valid

### HTTPS & SSL
- [ ] Obtain SSL certificate (Let's Encrypt recommended)
- [ ] Configure HTTPS on your web server
- [ ] Enable HTTP → HTTPS redirect
- [ ] Test with browser (no SSL warnings)

---

## Deployment Options

### Option 1: Traditional Server (VPS/Dedicated)

#### Requirements
- Node.js v16+ installed
- MySQL server running
- nginx or Apache as reverse proxy
- SSL certificate

#### Steps

1. **SSH into your server**
   ```bash
   ssh user@your-server.com
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/titanobova-website.git
   cd titanobova-website
   ```

3. **Set up backend**
   ```bash
   cd app/backend
   cp .env.example .env
   # Edit .env with production values
   nano .env
   npm install
   npm run build
   ```

4. **Set up frontend**
   ```bash
   cd ../frontend
   # Update API endpoint in src/pages/FounderLogin.jsx and AdminDashboard.jsx
   # Change: http://localhost:4000 → https://api.your-domain.com
   npm install
   npm run build
   # dist/ folder contains production build
   ```

5. **Set up reverse proxy (nginx)**
   ```nginx
   server {
     listen 443 ssl http2;
     server_name your-domain.com;

     # SSL certificate
     ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

     # Frontend static files
     location / {
       root /path/to/titanobova-website/app/frontend/dist;
       try_files $uri $uri/ /index.html;
     }

     # API proxy
     location /api/ {
       proxy_pass http://localhost:4000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }

   # Redirect HTTP to HTTPS
   server {
     listen 80;
     server_name your-domain.com;
     return 301 https://$server_name$request_uri;
   }
   ```

6. **Run backend with PM2 (process manager)**
   ```bash
   npm install -g pm2
   cd /path/to/titanobova-website/app/backend
   pm2 start index.js --name "titanobova-backend" --env production
   pm2 save
   pm2 startup
   ```

7. **Set up auto-backups**
   ```bash
   # Add to crontab for daily 3am backups
   0 3 * * * mysqldump -u root -p'password' titanobova > /backups/titanobova_$(date +\%Y\%m\%d).sql
   ```

---

### Option 2: Docker Deployment

#### Dockerfile (Backend)
```dockerfile
# Dockerfile.backend
FROM node:18-alpine

WORKDIR /app/backend

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]
```

#### Dockerfile (Frontend)
```dockerfile
# Dockerfile.frontend
FROM node:18-alpine AS build

WORKDIR /app/frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: titanobova
      MYSQL_ROOT_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - titanobova

  backend:
    build:
      context: ./app/backend
      dockerfile: Dockerfile.backend
    environment:
      NODE_ENV: production
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_DATABASE: titanobova
      JWT_SECRET: ${JWT_SECRET}
      REFRESH_TOKEN_SECRET: ${REFRESH_TOKEN_SECRET}
      HOST_USERNAME: ${HOST_USERNAME}
      HOST_PASSWORD_HASH: ${HOST_PASSWORD_HASH}
    depends_on:
      - mysql
    networks:
      - titanobova

  frontend:
    build:
      context: ./app/frontend
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
    networks:
      - titanobova

volumes:
  mysql_data:

networks:
  titanobova:
```

#### Deploy with Docker
```bash
docker-compose up -d
```

---

### Option 3: Vercel/Netlify (Frontend Only)

This approach hosts the frontend on Vercel/Netlify with a separate backend.

#### Deploy Frontend
```bash
cd app/frontend
# Install Vercel CLI
npm install -g vercel
# Deploy
vercel
```

#### Backend on Heroku
```bash
cd app/backend
# Create Heroku app
heroku create your-app-name
# Set environment variables
heroku config:set NODE_ENV=production JWT_SECRET=xxx...
# Deploy
git push heroku main
```

---

### Option 4: Cloud Platforms

#### AWS EC2 + RDS
1. Create EC2 instance (Ubuntu 22.04)
2. Create RDS MySQL database
3. Install Node.js
4. Deploy using steps from Option 1
5. Use CloudFront for CDN (optional)

#### DigitalOcean App Platform
1. Create DigitalOcean account
2. Connect GitHub repository
3. Create two apps:
   - Frontend with build: `npm run build`
   - Backend with start: `npm start`
4. Add MySQL managed database
5. Set environment variables
6. Deploy!

#### Azure App Service
1. Create App Service for backend
2. Create Static Web App for frontend
3. Create Azure Database for MySQL
4. Deploy via GitHub Actions
5. Configure custom domain

---

## Post-Deployment

### Verification Checklist
- [ ] Website loads on HTTPS (no warnings)
- [ ] Founder login button appears
- [ ] Can login with admin credentials
- [ ] Admin dashboard loads
- [ ] Contact form visible and accessible
- [ ] Contact submission creates database entry
- [ ] Contact appears in admin dashboard
- [ ] Search filter works
- [ ] Logout button works
- [ ] Email notifications send

### Monitoring
```bash
# Monitor backend logs
pm2 logs titanobova-backend

# Check disk space
df -h

# Monitor CPU/Memory
top

# Check MySQL
mysql -u root -p
SHOW PROCESSLIST;
SELECT COUNT(*) FROM contacts;
```

### Regular Maintenance
- [ ] Weekly: Check error logs
- [ ] Weekly: Verify email notifications working
- [ ] Monthly: Database backup verification
- [ ] Monthly: Security updates (npm audit)
- [ ] Quarterly: Update dependencies
- [ ] Quarterly: Review admin access logs

### Backup Strategy
```bash
# Daily full backup
0 3 * * * mysqldump -u root -p'password' titanobova > /backups/titanobova_$(date +\%Y\%m\%d).sql

# Weekly backup to external storage
0 2 * * 0 aws s3 cp /backups/ s3://your-bucket/backups/ --recursive
```

---

## Scaling Considerations

### For High Traffic
1. **Enable caching**: Add Redis for session storage
2. **Load balancing**: Use multiple backend instances
3. **CDN**: Serve static files via CDN (CloudFront, Cloudflare)
4. **Database optimization**: Add indexes, optimize queries
5. **Read replicas**: Create MySQL read replicas

### Code
```javascript
// Add Redis caching to backend
const redis = require('redis');
const client = redis.createClient();

app.get('/api/admin/contacts', authenticateHost, async (req, res) => {
  const cached = await client.get('contacts');
  if (cached) return res.json({ contacts: JSON.parse(cached) });
  
  const contacts = await db.getContacts();
  await client.setEx('contacts', 3600, JSON.stringify(contacts));
  res.json({ contacts });
});
```

---

## Environment Variables for Production

```dotenv
# Critical - Must be unique and secure
JWT_SECRET=<generate: openssl rand -base64 32>
REFRESH_TOKEN_SECRET=<generate: openssl rand -base64 32>
HOST_USERNAME=your_secure_username
HOST_PASSWORD_HASH=<bcrypt hash - never plaintext>

# Database
MYSQL_HOST=your-rds-endpoint.amazonaws.com
MYSQL_USER=admin
MYSQL_PASSWORD=<strong-password>
MYSQL_DATABASE=titanobova

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=<app-specific-password>
NOTIFY_EMAIL=founder@your-company.com

# Application
NODE_ENV=production
PORT=4000
CORS_ORIGIN=https://your-domain.com

# Security
HELMET_ENABLE=true
RATE_LIMIT_ENABLE=true
```

---

## Troubleshooting Deployment

### Backend Won't Connect to MySQL
```bash
# Check MySQL is running
sudo systemctl status mysql

# Verify credentials
mysql -h hostname -u user -p -e "SELECT 1"

# Check firewall
sudo ufw allow 3306
```

### CORS Errors After Deployment
1. Verify `CORS_ORIGIN` in backend `.env` matches frontend domain
2. Ensure API endpoint in frontend is correct
3. Check both frontend and backend are on same HTTPS

### SSL Certificate Errors
```bash
# Renew Let's Encrypt certificate
sudo certbot renew

# Check certificate validity
openssl x509 -in /etc/letsencrypt/live/your-domain/fullchain.pem -noout -dates
```

### High Memory Usage
```bash
# Analyze backend memory leaks
node --inspect index.js
# Open chrome://inspect in Chrome

# Or use clinic.js
npm install -g clinic
clinic doctor -- node index.js
```

---

## Security in Production

### Essential Steps
1. ✅ Use HTTPS everywhere
2. ✅ Enable database backups
3. ✅ Set strong passwords
4. ✅ Use environment variables for secrets
5. ✅ Enable rate limiting
6. ✅ Keep dependencies updated
7. ✅ Monitor access logs
8. ✅ Set up error logging (Sentry, etc.)

### Optional: Advanced Security
```bash
# Enable WAF (Web Application Firewall)
# Use Cloudflare or AWS WAF for DDoS protection

# Set security headers
app.use(helmet({
  hsts: { maxAge: 31536000, includeSubDomains: true },
  contentSecurityPolicy: true,
  frameguard: true
}));

# Enable rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

---

## Support & Resources

- **Documentation**: See `ADMIN_SETUP.md` and `QUICK_START.md`
- **Backend Issues**: Check `app/backend/index.js` error logs
- **Database Issues**: Review MySQL error logs
- **Security Concerns**: Enable debug logging and audit trails

**Estimated Deployment Time**: 2-4 hours for a typical VPS deployment
**Maintenance Effort**: 1-2 hours per month for updates and monitoring
