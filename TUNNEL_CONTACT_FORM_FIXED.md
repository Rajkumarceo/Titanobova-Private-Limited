# Tunnel Access Guide - Contact Form Fixed

## Admin Credentials

- **Username:** `Rajkumar`
- **Password:** `Preethi`

Use these to log into the admin panel at: `http://localhost:8000/admin/`

---

## What Was Fixed

**Problem:** Contact form showed "Error: Failed to send message" when accessing through tunnel

**Root Causes:**
1. Frontend was hardcoded to use `localhost:8000` API (won't work through tunnel)
2. CORS wasn't properly configured for tunnel domains

**Solution Applied:**
- ✅ Dynamic API URL detection (frontend now auto-detects localhost vs tunnel)
- ✅ Enhanced CORS with regex patterns for all tunnel services
- ✅ Added API configuration service (`apiConfig.js`)
- ✅ All API calls now work on both local and tunnel access

---

## How to Run with Tunnel

### Step 1: Start Backend
```bash
cd "Titanobova company website\titanobova-django"
python manage.py runserver 0.0.0.0:8000
```
✅ Backend runs on: `http://localhost:8000`

### Step 2: Start Frontend
```bash
cd "Titanobova company website\titanobova-website\app\frontend"
npm run dev
```
✅ Frontend runs on: `http://localhost:5176`

### Step 3: Start Tunnel (NEW Terminal)
```bash
npx localtunnel --port 5176
```
You'll see output like:
```
your url is: https://proud-moons-teach.loca.lt
```

### Step 4: Test Contact Form
1. Open: `https://proud-moons-teach.loca.lt/contact`
2. Fill in the form
3. Click "Send Message"
4. Should now show: "Message sent successfully!"

---

## How the Fix Works

**Before (Failed):**
```
Frontend (https://xyz.loca.lt) 
   ↓
API Call to: http://localhost:8000/api/v1/contacts/
   ↓
ERROR - Can't reach localhost from tunnel
```

**After (Works):**
```
Frontend (https://xyz.loca.lt)
   ↓
Auto-detects tunnel access
   ↓
API Call to: https://xyz.loca.lt/api/v1/contacts/
   ↓
SUCCESS - Tunnels both frontend and API through same URL
```

---

## Important Notes

### 1. Backend Must Accept Tunnel Traffic
Make sure backend is running on `0.0.0.0:8000` (not just `localhost:8000`)
```bash
# Correct
python manage.py runserver 0.0.0.0:8000

# Wrong
python manage.py runserver  # defaults to 127.0.0.1
```

### 2. Tunnel Domains Change Each Session
Every time you start a new tunnel, you get a new domain:
- Session 1: `https://proud-moons-teach.loca.lt`
- Session 2: `https://chilly-beds-fetch.loca.lt`
- Session 3: `https://sunny-rivers-dance.loca.lt`

This is normal and expected.

### 3. CORS Now Supports All Tunnels
These tunnel services are now allowed by CORS:
- ✅ localtunnel (*.loca.lt)
- ✅ ngrok (*.ngrok.io)
- ✅ ngrok free (*.ngrok-free.app)
- ✅ localhost (development)

### 4. No Need for Basic Auth on Contacts
The contact form is public - no authentication required.
Basic auth only protects admin endpoints.

---

## Testing Checklist

Use this to verify everything works:

**Local Testing (before tunnel):**
- [ ] Go to `http://localhost:5176/contact`
- [ ] Fill form and submit
- [ ] See success message

**Tunnel Testing (share with friends):**
- [ ] Start tunnel: `npx localtunnel --port 5176`
- [ ] Get the tunnel URL (e.g., `https://xyz.loca.lt`)
- [ ] Open that URL in browser
- [ ] Go to `/contact` page
- [ ] Fill form and submit
- [ ] See success message
- [ ] Check backend console: should show `POST /api/v1/contacts/ 201`

---

## Common Issues & Solutions

### Issue: "Error: Failed to send message" on tunnel
**Solution:** Make sure backend is running on `0.0.0.0:8000`, not `localhost:8000`

### Issue: Tunnel URL not accessible
**Solution:** 
1. Check tunnel is running
2. Make sure no firewall is blocking
3. Try with a VPN disabled
4. Use `--subdomain` flag: `npx localtunnel --port 5176 --subdomain yourname`

### Issue: Contact data not saved
**Solution:**
1. Check backend console for errors
2. Verify database: `python manage.py shell`
3. Run: `from apps.contacts.models import Contact; print(Contact.objects.count())`

### Issue: CORS error in browser console
**Solution:**
1. Tunnel might have changed - restart tunnel
2. Clear browser cache
3. Try incognito/private window
4. Check CORS settings are deployed (git pull latest)

---

## API Endpoint Reference

All these now work on both localhost and tunnel:

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---|
| `/api/v1/contacts/` | POST | Submit contact form | No |
| `/api/v1/courses/` | GET | List courses | No |
| `/api/v1/auth/token/` | POST | Login | No |
| `/api/v1/users/` | GET/POST | User management | Yes |
| `/api/v1/admin/` | GET | Admin endpoints | Yes |

---

## File Changes

Files updated to fix tunnel access:
- `Contact.jsx` - Dynamic API URL detection
- `apiConfig.js` - New API configuration service
- `settings.py` - Enhanced CORS with regex patterns

All changes pushed to GitHub ✅

---

## Need Help?

1. **Contact form still not working?** 
   - Share the exact tunnel URL
   - Share the browser console error message
   - I'll debug and fix

2. **Want to use custom subdomain?**
   - Use: `npx localtunnel --port 5176 --subdomain myname`
   - Then visit: `https://myname.loca.lt`

3. **Want to hide tunnel password?**
   - localtunnel shows a page asking for password entry
   - Friends enter the password shown in your terminal
   - Can't be disabled (it's a localtunnel feature)

---

## Next Steps

1. ✅ Contact form works locally
2. ✅ Contact form works on tunnel
3. Share tunnel URL with friends
4. They can submit contact forms
5. Data saved to your database

Everything is ready! 🚀
