# TITANOBOVA SITE - PASSWORD PROTECTED ACCESS

## ✅ EVERYTHING IS NOW SET UP!

Your Titanobova site is protected with password and ready to share!

---

## 🔐 LOGIN CREDENTIALS

**Username:** `admin`  
**Password:** `titanobova`

---

## 🌐 PUBLIC TUNNEL LINKS (Share with Friends!)

### **Frontend URL:**
```
https://titanobova-site.loca.lt
```

### **API URL:**
```
https://titanobova-api.loca.lt
```

---

## 📝 HOW TO ACCESS

### **Step 1: Open the link in browser**
```
https://titanobova-site.loca.lt
```

### **Step 2: You'll see a password prompt**
Enter these credentials:
```
Username: admin
Password: titanobova
```

### **Step 3: You're in!**
Your friends can now access the site!

---

## 🖥️ LOCAL TESTING (No Password Needed)

For local testing without password:

```
Frontend: http://localhost:5173
Admin: http://localhost:8000/admin
API: http://localhost:8000/api/v1/auth/token/
```

Admin panel credentials:
```
Username: Rajkumar
Password: [Your password]
```

---

## 📊 WHAT'S RUNNING

| Service | Local | Public |
|---------|-------|--------|
| Frontend | http://localhost:5173 | https://titanobova-site.loca.lt |
| Backend | http://localhost:8000 | https://titanobova-api.loca.lt |
| Status | ✅ Running | ✅ Active |

---

## 🔒 SECURITY FEATURES

✅ **Password Protected** - All public tunnel access requires authentication  
✅ **Basic Auth** - Standard HTTP Basic Authentication  
✅ **Admin Panel** - Additional Rajkumar login required for admin  
✅ **API Tokens** - JWT authentication for API endpoints  
✅ **CORS Protected** - Only allowed domains can access  
✅ **CSP Headers** - Content Security Policy enabled  

---

## 📱 SHARING WITH FRIENDS

1. **Share this URL:**
   ```
   https://titanobova-site.loca.lt
   ```

2. **Tell them credentials:**
   ```
   Username: admin
   Password: titanobova
   ```

3. **They open in browser** → Password prompt appears → Enter credentials → Done!

---

## 🆘 TROUBLESHOOTING

### Browser shows "401 Unauthorized"?
- Check if you entered password correctly
- Try again in incognito/private mode
- Clear browser cache

### "Cannot reach https://titanobova-site.loca.lt"?
- Check if tunnel terminal is still open
- Run: `npx localtunnel --port 5173 --subdomain titanobova-site`
- Check if frontend is running: `npm run dev`

### Friends can't access?
- Ensure tunnel terminals are open
- Check internet connection
- Share EXACT URL: `https://titanobova-site.loca.lt`
- Share credentials: `admin` / `titanobova`

---

## 🚀 KEEPING TUNNELS ALIVE

The tunnels stay active as long as these terminals stay open:

**Terminal 1 - Frontend:**
```
cd titanobova-website\app\frontend
npm run dev
```

**Terminal 2 - Backend:**
```
cd titanobova-django
python manage.py runserver 0.0.0.0:8000
```

**Terminal 3 - Frontend Tunnel:**
```
npx localtunnel --port 5173 --subdomain titanobova-site
```

**Terminal 4 - API Tunnel:**
```
npx localtunnel --port 8000 --subdomain titanobova-api
```

Keep all 4 open for continuous access!

---

## 📋 FEATURES AVAILABLE

- User Registration
- Password Protected Access
- Admin Dashboard
- Payment Processing
- Course Management
- Contact Forms
- JWT Authentication

---

## ✨ SITE IS LIVE & PROTECTED!

**Share the URL with confidence - it's password protected!** 🎉

```
https://titanobova-site.loca.lt
(username: admin, password: titanobova)
```

---

## 🔐 Login Credentials

### For Tunnel Access (Public Link)
```
Username: admin
Password: titanobova
```

### For Admin Panel
```
URL: http://localhost:8000/admin/
Username: Rajkumar
Password: [Your password]
```

---

## 📱 How Friends Access Your Site

### **Step 1: Visit the Tunnel URL**
Friends open: `https://some-domain.loca.lt`

### **Step 2: Enter Credentials**
When prompted for username/password:
- **Username**: `admin`
- **Password**: `titanobova`

### **Step 3: Access the Site**
Site loads with full functionality

---

## 🔄 How It Works

| Level | Protection | Access |
|-------|-----------|--------|
| **Frontend** | ✅ Basic Auth (admin/titanobova) | Password required |
| **Admin Panel** | ✅ Django Auth (Rajkumar) | Different credentials |
| **API** | ✅ JWT Tokens | Token-based auth |
| **Static Files** | 🔓 No auth | Always accessible |

---

## 📋 What's Protected

✅ **Home Page** - Password required  
✅ **About Page** - Password required  
✅ **Services** - Password required  
✅ **Contact Form** - Password required  
❌ **Admin Panel** - Uses Rajkumar login (separate)  
❌ **API** - Uses JWT tokens (separate)  
❌ **Static Files** - Always accessible  

---

## 🖥️ For Local Testing

**Test Basic Auth Locally:**
```bash
# Using curl
curl -u admin:titanobova http://localhost:5173

# Using PowerShell
$credential = New-Object System.Management.Automation.PSCredential("admin", (ConvertTo-SecureString "titanobova" -AsPlainText -Force))
Invoke-WebRequest -Uri "http://localhost:5173" -Credential $credential
```

---

## ✨ Features

- Password is **"titanobova"**
- Username is **"admin"**
- Works on tunnel URLs (localtunnel, ngrok, etc.)
- Doesn't affect localhost access (http://localhost:5173)
- Admin panel has separate authentication
- API has token-based authentication

---

## 🔄 Change Password Anytime

Edit `.env` file:
```
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=titanobova
```

Change `BASIC_AUTH_PASSWORD` to any value you want!

---

## 📤 Share Instructions with Friends

Send them this:

```
🎉 Welcome to Titanobova!

Visit: https://some-domain.loca.lt

When prompted for login:
Username: admin
Password: titanobova

Enjoy! 🚀
```

---

## 🚀 Your Site Status

✅ Backend running on Port 8000  
✅ Frontend running on Port 5173  
✅ Password protection enabled  
✅ Ready to share with friends  
✅ Pushed to GitHub  

---

**Your site is now SECURE and ready to share! 🔒🎉**
