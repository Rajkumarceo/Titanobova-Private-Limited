# ⚡ QUICK START - SITE TESTING GUIDE

## 🚀 ACCESS THE SITE

**Open Browser:** http://localhost:5174

---

## 📋 MAIN TESTS (5-10 minutes)

### Test 1: Home Page
- [ ] Visit http://localhost:5174
- [ ] Logo displays correctly (gold/bronze shield)
- [ ] See hero section with gradient background
- [ ] Click "Explore Courses" button

### Test 2: Courses Page
- [ ] See 9 courses with prices in ₹ (₹2,499 - ₹6,999)
- [ ] Hover over course card (should lift up)
- [ ] Click "🎓 Enroll Now" on any course

### Test 3: Enrollment Page
- [ ] Course details show in right sidebar
- [ ] Course price displays: ₹4,999 (or selected price)
- [ ] Form fields appear:
  - First Name
  - Last Name
  - Email
  - Phone
  - Experience Level dropdown
- [ ] Fill all fields with test data
- [ ] Click "Complete Enrollment - ₹X,XXX"
- [ ] Wait 2 seconds...

### Test 4: Payment Page
- [ ] Should auto-navigate after enrollment
- [ ] Student info pre-filled:
  - Name appears in sidebar
  - Email appears in form
  - Course details shown
- [ ] Order summary shows price breakdown
- [ ] Fill card form:
  - **Cardholder:** Test User
  - **Card Number:** 4111 1111 1111 1111
  - **Expiry:** 12/25
  - **CVV:** 123
- [ ] Click "Pay Now"
- [ ] Wait 2 seconds...

### Test 5: Success Page
- [ ] Should see checkmark animation ✓
- [ ] Green "Enrollment Confirmed" message
- [ ] Course access details shown
- [ ] "What's Next" guide with 4 steps
- [ ] Support contact information visible
- [ ] "Explore More Courses" button works

---

## 🔗 ALL PAGE LINKS

| Page | URL | Status |
|------|-----|--------|
| Home | http://localhost:5174 | ✅ |
| About | http://localhost:5174/about | ✅ |
| Services | http://localhost:5174/services | ✅ |
| Courses | http://localhost:5174/courses | ✅ |
| Contact | http://localhost:5174/contact | ✅ |
| Enrollment | http://localhost:5174/enroll | ✅ |
| Payment | http://localhost:5174/payment | ✅ |
| Success | http://localhost:5174/payment-success | ✅ |

---

## 💾 BACKEND TEST DATA

### Quick API Test (PowerShell)
```powershell
$json = @{
    firstName = 'John'
    lastName = 'Doe'
    email = 'john@test.com'
    phone = '+918765432109'
    experience = 'beginner'
    courseTitle = 'Web Development'
    coursePrice = 4999
    courseDuration = '12 weeks'
    courseLevel = 'Beginner to Intermediate'
    enrollmentDate = '2026-01-21T12:00:00Z'
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/api/enrollments" `
    -Method POST `
    -Body $json `
    -ContentType "application/json"
```

**Expected Output:**
```
id           : (number)
message      : Enrollment successful
enrollment   : (object with student and course details)
```

---

## 🎨 VISUAL VERIFICATION

### Logo Check
- [ ] Gold/bronze gradient colors
- [ ] Crown at top
- [ ] Shield shape
- [ ] "S" letter in center
- [ ] Wings on sides

### Color Scheme
- [ ] Blue buttons (#0066CC)
- [ ] Gray text (#666666)
- [ ] White backgrounds
- [ ] Green for success ✓ (#22C55E)
- [ ] Red for errors ❌ (#EF4444)

---

## 🐛 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Page won't load | Check http://localhost:5174 in browser |
| Backend error | Verify backend running: `cd app/backend && npm start` |
| Enrollment fails | Check browser console (F12 → Console tab) |
| Wrong logo | Clear browser cache (Ctrl+Shift+Delete) |
| Form not submitting | Check all required fields filled |
| Styling looks wrong | Refresh page (Ctrl+R) |

---

## ✅ FINAL CHECKLIST

- [ ] Frontend loads without errors
- [ ] All 8 pages accessible
- [ ] Complete enrollment flow works
- [ ] Payment form shows enrollment data
- [ ] Success page displays correctly
- [ ] Logo displays with correct colors
- [ ] Navigation menu works on mobile
- [ ] No console errors (F12 → Console)

---

## 📞 NEED HELP?

**Check:**
1. Both servers running?
   - Backend: http://localhost:4000
   - Frontend: http://localhost:5174

2. Browser console for errors (F12)

3. Backend logs in terminal

4. Network tab in DevTools to see API calls

---

**Site Status: ✅ FULLY OPERATIONAL**
Ready for testing and demonstration!
