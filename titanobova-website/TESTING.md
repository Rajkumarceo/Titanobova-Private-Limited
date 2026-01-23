# Testing Guide - Titanobova Admin Portal

Complete testing procedures to verify all functionality works correctly.

## Pre-Testing Checklist

- [ ] Backend running on port 4000 (`npm run dev`)
- [ ] Frontend running on port 5173 (`npm run dev`)
- [ ] Both services show no errors in console
- [ ] Browser can reach http://localhost:5173
- [ ] Backend health check passes: http://localhost:4000/api/health

---

## Test 1: Website Navigation

### Steps
1. Open http://localhost:5173
2. Verify all pages load:
   - [ ] Home page displays
   - [ ] About page accessible
   - [ ] Services page accessible
   - [ ] Contact page accessible
   - [ ] Founder button visible in navbar

### Expected Results
- All pages load without errors
- No 404 errors in console
- Navigation smooth and responsive

---

## Test 2: Founder Login Flow

### Test 2.1: Access Login Page
1. Click "Founder" button in navigation
2. URL should change to `/founder-login`

**Expected**: Login page loads with form

### Test 2.2: Demo Credentials Display
1. Check if demo credentials are shown on login page
2. Username should be: `admin`
3. Password should be: `admin123`

**Expected**: Both fields show on page

### Test 2.3: Successful Login
1. Enter username: `admin`
2. Enter password: `admin123`
3. Click "Login" button

**Expected**:
- No error message appears
- Page redirects to `/admin-dashboard`
- Dashboard loads successfully
- Token stored in localStorage

**Verify in Browser DevTools**:
```javascript
// Open F12 → Console, run:
localStorage.getItem('authToken')
// Should return a JWT token (long string starting with "eyJ")
```

### Test 2.4: Invalid Credentials
1. Return to login page (`/founder-login`)
2. Enter username: `admin`
3. Enter password: `wrongpassword`
4. Click "Login"

**Expected**:
- Error message: "Invalid credentials"
- Page stays on login
- No token stored

### Test 2.5: Empty Fields
1. Leave both fields empty
2. Click "Login"

**Expected**:
- Form validation message or backend error
- Login fails

---

## Test 3: Admin Dashboard

### Test 3.1: Dashboard Loads
1. From login page, login successfully
2. Dashboard should display

**Expected**:
- Header shows "Admin Dashboard"
- Logout button visible
- Two stat cards visible (Total Submissions, Matching Results)
- Search box present
- Contact table visible

### Test 3.2: Dashboard Statistics
1. Check stat cards display:
   - "Total Submissions" count
   - "Matching Results" count

**Expected**:
- Both numbers are 0 (if no contacts submitted yet)
- Stats update after submitting contacts

### Test 3.3: Empty State
1. If no contacts submitted, verify empty message

**Expected**:
- "No contacts found" message in table

### Test 3.4: Search Filter (After Adding Contacts)
1. Submit multiple contacts with different names/emails
2. Type in search box: "John"

**Expected**:
- Results filter in real-time
- Only contacts with "john" in name or email show
- Search is case-insensitive

### Test 3.5: Contact Table Structure
1. Verify table columns visible:
   - [ ] Name
   - [ ] Email
   - [ ] Phone
   - [ ] Subject
   - [ ] Date
   - [ ] Message

**Expected**: All columns display correctly

---

## Test 4: Contact Form Submission

### Test 4.1: Submit Contact Form
1. Go to `/contact` page
2. Fill form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: 555-1234
   - Subject: Test Inquiry
   - Message: This is a test message
3. Click Submit

**Expected**:
- Success message appears
- Form clears

### Test 4.2: Verify Contact in Dashboard
1. Go to `/admin-dashboard` (login if needed)
2. Check contacts table

**Expected**:
- "John Doe" appears in table
- john@example.com visible
- 555-1234 showing
- Submission message visible
- Current date/time showing

### Test 4.3: Multiple Contacts
1. Submit 3 different contacts:
   - Contact 1: John Doe, john@example.com
   - Contact 2: Jane Smith, jane@example.com
   - Contact 3: Bob Johnson, bob@example.com

2. Go to dashboard

**Expected**:
- All 3 contacts in table
- Total Submissions count = 3
- Search filters work correctly

### Test 4.4: Search Functionality
1. Dashboard with 3 contacts showing
2. Search for "john"

**Expected**:
- Only John Doe and Bob Johnson appear (both have "john")
- Matching Results = 2

### Test 4.5: Case Insensitive Search
1. With 3 contacts, search for "JANE"

**Expected**:
- Jane Smith appears (case insensitive)
- Matching Results = 1

---

## Test 5: Form Validation

### Test 5.1: Required Fields
1. Contact form - leave Name blank
2. Try to submit

**Expected**:
- Error message or validation feedback
- Form doesn't submit

### Test 5.2: Email Validation
1. Enter invalid email: "notanemail"
2. Try to submit

**Expected**:
- Email validation error or server rejection
- Form doesn't submit

### Test 5.3: Long Message
1. Enter very long message (1000+ characters)
2. Submit

**Expected**:
- Accepts long message
- Displays correctly in dashboard table

---

## Test 6: Logout & Security

### Test 6.1: Logout Button
1. On admin dashboard, click "Logout"

**Expected**:
- Redirects to `/founder-login`
- Token removed from localStorage

**Verify**:
```javascript
localStorage.getItem('authToken')
// Should return null
```

### Test 6.2: Protected Route Access
1. Logout from dashboard
2. Try to access `/admin-dashboard` directly

**Expected**:
- Redirects to login page (`/founder-login`)
- Cannot access dashboard without token

### Test 6.3: Token Expiration
1. Login to dashboard
2. Clear token: `localStorage.removeItem('authToken')`
3. Refresh page

**Expected**:
- Redirects to login
- Dashboard not accessible

### Test 6.4: Invalid Token
1. Login and get token
2. Modify token in localStorage (delete a character)
3. Try to access dashboard

**Expected**:
- Token validation fails
- Redirects to login

---

## Test 7: Responsive Design

### Test 7.1: Mobile View (375px width)
1. Open DevTools (F12)
2. Set viewport to iPhone SE (375x667)
3. Test all pages

**Expected**:
- No overflow or broken layout
- Navigation collapses to hamburger
- Forms stack vertically
- Table scrolls horizontally

### Test 7.2: Tablet View (768px width)
1. Set viewport to iPad (768x1024)
2. Navigate all pages

**Expected**:
- Content scales properly
- 2-column layouts show where applicable
- Touch-friendly buttons

### Test 7.3: Desktop View (1440px width)
1. Test on full desktop size
2. Verify all content visible

**Expected**:
- Full multi-column layouts
- Proper spacing and alignment

---

## Test 8: Error Handling

### Test 8.1: Backend Offline
1. Stop backend server (`Ctrl+C`)
2. Try to login
3. Check error message

**Expected**:
- Graceful error message
- No infinite loading
- Frontend doesn't crash

### Test 8.2: Invalid API Response
1. With backend offline, try to access dashboard

**Expected**:
- Error message displayed
- Redirects to login
- Clean error handling

### Test 8.3: Network Error
1. Disconnect internet (or use DevTools throttling)
2. Try to login

**Expected**:
- Timeout or network error message
- UI remains responsive

---

## Test 9: Email Notifications (Optional)

### Prerequisites
- SMTP configured in `.env`
- Valid email credentials

### Test 9.1: Email on Contact Submit
1. Configure SMTP in `app/backend/.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=noreply@titanobova.com
   NOTIFY_EMAIL=founder@email.com
   ```

2. Restart backend: `npm run dev`

3. Submit contact form

4. Check email inbox for notification

**Expected**:
- Email received within 5 seconds
- Email contains all contact info
- From address matches SMTP_FROM
- Recipient is NOTIFY_EMAIL

### Test 9.2: Email Content
1. Verify email includes:
   - [ ] Submitter name
   - [ ] Email address
   - [ ] Phone number
   - [ ] Subject
   - [ ] Full message

**Expected**: All information present and formatted

---

## Test 10: Database

### Test 10.1: SQLite Database
1. Check database file exists:
   - Path: `app/backend/data/contacts.db`

**Expected**: File exists after first contact submission

### Test 10.2: Database Content
1. Submit 2 contacts
2. Query database (if SQLite):
   ```bash
   sqlite3 app/backend/data/contacts.db
   SELECT * FROM contacts;
   ```

**Expected**:
- 2 rows in contacts table
- All fields populated correctly
- created_at timestamp set

### Test 10.3: Data Persistence
1. Submit contact and verify in dashboard
2. Restart backend server
3. Go back to dashboard

**Expected**:
- Contact still visible
- Data persisted to database

---

## Test 11: API Endpoints

### Test 11.1: Health Check
```bash
curl http://localhost:4000/api/health
# Expected: {"status":"ok","server":"Titanobova Backend"}
```

### Test 11.2: Login Endpoint
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
# Expected: {"token":"eyJ..."}
```

### Test 11.3: Get Contacts (Protected)
```bash
# First get a token, then:
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:4000/api/admin/contacts
# Expected: {"contacts":[...]}
```

### Test 11.4: Submit Contact
```bash
curl -X POST http://localhost:4000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "phone":"555-1234",
    "subject":"Test",
    "message":"Test message"
  }'
# Expected: {"id":1,"message":"Contact submitted successfully"}
```

---

## Test 12: Cross-Browser Testing

Test on multiple browsers:

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Chrome
- [ ] Mobile Safari

**Expected**: All functionality works identically

---

## Test 13: Performance

### Test 13.1: Page Load Speed
1. Open DevTools → Network tab
2. Load home page
3. Check load time

**Expected**: < 3 seconds

### Test 13.2: Dashboard with Many Contacts
1. Submit 50+ contacts
2. Load dashboard

**Expected**:
- Dashboard still loads quickly
- Search is responsive
- No lag when typing

### Test 13.3: API Response Time
1. DevTools → Network tab
2. Login and access dashboard
3. Check response times

**Expected**: < 500ms for most requests

---

## Test 14: Security

### Test 14.1: Password Storage
1. Check backend logs - passwords should never be logged
2. Check database - password not stored

**Expected**: No plaintext passwords visible

### Test 14.2: Token Security
1. Copy token from localStorage
2. Send to invalid origin (different domain)
3. Request should work only from whitelisted origin

**Expected**: CORS prevents unauthorized access

### Test 14.3: Input Escaping
1. Submit contact with special characters:
   ```
   Name: <script>alert('xss')</script>
   Message: <img src=x onerror="alert('xss')">
   ```
2. Check dashboard

**Expected**:
- Characters displayed as text, not executed
- No JavaScript executed

---

## Test 15: User Experience

### Test 15.1: Loading States
1. Slow down network (DevTools throttling)
2. Login and access dashboard

**Expected**:
- Loading message displays
- UI shows progress

### Test 15.2: Error Messages
1. Trigger various errors
2. Check error messages

**Expected**:
- Messages are clear and helpful
- Users know what went wrong

### Test 15.3: Color Scheme
1. Review entire site
2. Check color consistency

**Expected**:
- Blue (#5B8DEE) primary color
- Sage green (#A8D5BA) accents
- Consistent throughout

### Test 15.4: Spacing & Alignment
1. Check all pages
2. Verify proper spacing

**Expected**:
- Professional spacing
- Properly aligned elements
- No overflow or gaps

---

## Regression Testing Checklist

After making any changes, run these quick tests:

- [ ] Login/logout works
- [ ] Contact form submits
- [ ] Dashboard loads
- [ ] Search filters
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] No CSS broken layout
- [ ] All pages accessible

---

## Performance Benchmarks

Target metrics:

| Metric | Target | Status |
|--------|--------|--------|
| Home page load | < 2s | ? |
| Login response | < 500ms | ? |
| Dashboard load | < 1s | ? |
| Contact submit | < 500ms | ? |
| Search filter | < 100ms | ? |
| Mobile load | < 3s | ? |

---

## Bug Report Template

If you find issues, document them:

```
Title: [Brief description]
Severity: [Critical/High/Medium/Low]
Browser: [Chrome/Firefox/etc]
Device: [Desktop/Mobile/etc]

Steps to reproduce:
1. ...
2. ...
3. ...

Expected result:
...

Actual result:
...

Screenshots/Console errors:
...
```

---

## Testing Conclusion

Once all tests pass:
- ✅ Site is ready for development testing
- ✅ Features work as expected
- ✅ No critical bugs
- ✅ Performance acceptable
- ✅ Security verified
- ✅ Ready for production deployment

---

**Happy Testing! 🚀**

For issues or questions, check [README.md](README.md) or [ADMIN_SETUP.md](ADMIN_SETUP.md).
