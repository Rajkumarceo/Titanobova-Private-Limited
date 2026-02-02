# Quick Reference - Contact Form Fix & Admin Credentials

## ADMIN LOGIN

| Field | Value |
|-------|-------|
| **Username** | `Rajkumar` |
| **Password** | `Preethi` |
| **URL** | `http://localhost:8000/admin/` |

---

## CONTACT FORM FIX SUMMARY

### What Was Wrong
Contact form showed **"Error: Failed to send message"** when accessed through tunnel

### What I Fixed
- ✅ Frontend now detects if you're on localhost or tunnel
- ✅ Automatically uses correct API URL based on where it's accessed from
- ✅ CORS now accepts all localtunnel domains
- ✅ Works seamlessly on both local (`localhost:5176`) and tunnel access (`https://xyz.loca.lt`)

### How to Use

**On Localhost (Before Tunnel):**
```
1. Start Backend:  python manage.py runserver 0.0.0.0:8000
2. Start Frontend: npm run dev
3. Go to: http://localhost:5176/contact
4. Submit form ✓
```

**On Tunnel (Share with Friends):**
```
1. Start Backend:  python manage.py runserver 0.0.0.0:8000
2. Start Frontend: npm run dev
3. Start Tunnel:   npx localtunnel --port 5176
4. Share URL:      https://[random].loca.lt
5. Go to /contact  and submit form ✓
```

### Files Changed
- `Contact.jsx` - Now uses dynamic API URL
- `apiConfig.js` - New service for URL detection
- `settings.py` - Enhanced CORS patterns
- All committed to GitHub ✓

---

## Testing

**Local Test:**
```bash
# Terminal 1
cd titanobova-django && python manage.py runserver 0.0.0.0:8000

# Terminal 2
cd titanobova-website/app/frontend && npm run dev

# Test
# Go to http://localhost:5176/contact
# Submit form - should work ✓
```

**Tunnel Test:**
```bash
# Terminal 3 (add to above)
npx localtunnel --port 5176

# Test
# Go to https://[random].loca.lt/contact
# Submit form - should work ✓
```

---

## Key Points

1. **API URL is now smart** - detects where you're accessing from
2. **Works on both localhost and tunnel** - no configuration needed
3. **CORS is fully configured** - all tunnel services supported
4. **Contact data saves to database** - verified working ✓
5. **Admin credentials** - Rajkumar / Preethi

---

## Status

| Feature | Status |
|---------|--------|
| Backend running | ✅ |
| Frontend running | ✅ |
| Contact form (localhost) | ✅ |
| Contact form (tunnel) | ✅ **FIXED** |
| Database saving | ✅ |
| Admin panel | ✅ |
| CORS configured | ✅ |
| Ready for friends | ✅ |

**All systems operational!** 🚀
