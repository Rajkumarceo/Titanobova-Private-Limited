# 🎯 Admin Panel Quick Access Guide

## **From Your Website**

### Step 1: Open Website
```
👉 http://localhost:5173/
```

### Step 2: Click Admin Button
Look for the **"👨‍💼 Admin"** button in the top navigation bar (purple color)

OR

Click **"Company Login"** button and log in to be redirected

### Step 3: You're In!
You'll see the modern admin dashboard with all your business metrics

---

## **Admin Dashboard Layout**

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR: Dashboard | Search | User Profile | Logout        │
├──────────────────┬──────────────────────────────────────────┤
│                  │                                          │
│  SIDEBAR         │  MAIN CONTENT                           │
│                  │  ┌────────────────────────────────────┐ │
│  📊 Dashboard    │  │ Welcome! Here's your business     │ │
│  📧 Contacts     │  │                                   │ │
│  📚 Courses      │  │ Quick Stats:                      │ │
│  👥 Enrollments  │  │ [Users] [Contacts] [Revenue] etc │ │
│  💳 Payments     │  │                                   │ │
│  👤 Users        │  │ Quick Access Table                │ │
│  🔐 Groups       │  │ [Links to all sections]           │ │
│                  │  └────────────────────────────────────┘ │
│  🌐 Visit Site   │                                          │
│  🚪 Logout       │                                          │
│                  │                                          │
└──────────────────┴──────────────────────────────────────────┘
```

---

## **Key Features at a Glance**

### **Left Sidebar**
- **Navigation Menu**: Quick access to all management sections
- **Company Branding**: TITANOBOVA logo with rocket icon
- **Footer Links**: 
  - Visit Website (opens main site in new tab)
  - Logout (secure session termination)

### **Top Navigation Bar**
- **Dashboard Title**: Shows you're on the admin dashboard
- **User Profile**: Shows logged-in user info
- **Responsive**: Adapts to all screen sizes

### **Dashboard Cards** (Real-time Stats)
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 👥 Total Users  │ │ 📧 Contacts     │ │ 💰 Revenue      │ │ 🔔 Pending      │
│                 │ │                 │ │                 │ │                 │
│    Count        │ │    Count        │ │   $ Total       │ │    Count        │
│ ↑ Active users  │ │ ↑ New messages  │ │ ↑ Payments      │ │ ⏱ Awaiting      │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘
```

### **Quick Actions** (One-Click Buttons)
- ➕ New Contact
- ➕ New Course  
- ➕ New User

### **Quick Access Table**
| Section | Description | Action |
|---------|-------------|--------|
| Contacts | Manage customer inquiries | View All |
| Courses | Manage course content | View All |
| Enrollments | Track student registrations | View All |
| Payments | Monitor transactions | View All |
| Users | Manage system users | View All |

---

## **How to Login**

### **Method 1: From Website "Admin" Button**
```
1. Go to http://localhost:5173/
2. Click "👨‍💼 Admin" button
3. You'll be taken to admin login (if not logged in)
4. Or directly to dashboard (if logged in)
```

### **Method 2: Direct URL**
```
👉 http://localhost:8000/admin/
```

### **Method 3: From "Company Login"**
```
1. Click "Company Login" button on website
2. Enter credentials
3. Submit → Redirected to admin dashboard
```

---

## **Admin Credentials**

```
👤 Username: admin
📧 Email: admin@titanobova.com
🔑 Password: Titanobova@123
```

---

## **What You Can Do**

### **Contacts Management**
✅ View all customer inquiries  
✅ Mark as read/unread  
✅ Respond to contacts  
✅ Export contact data  
✅ Filter by status (new, responded, etc)

### **Courses Management**
✅ Create new courses  
✅ Update course content  
✅ Manage lessons  
✅ Set pricing  
✅ View enrollments per course

### **User Management**
✅ Create new users  
✅ Set user roles/permissions  
✅ Update user info  
✅ Manage groups  
✅ Reset passwords

### **Payment Tracking**
✅ View all transactions  
✅ Filter by status (pending, succeeded, failed)  
✅ Process refunds  
✅ Generate invoices  
✅ View revenue analytics

### **Enrollments**
✅ View student registrations  
✅ Update enrollment status  
✅ Track completion progress  
✅ Issue certificates  

---

## **UI Features You'll Love** ✨

### **Modern Design**
- 🎨 Gradient backgrounds
- 🌈 Color-coded sections
- ✨ Smooth animations
- 📱 Mobile-friendly

### **Easy Navigation**
- 🔗 Quick-access sidebar
- 🎯 Breadcrumb navigation
- 🔍 Search functionality
- 📊 Real-time data

### **Responsive Layout**
- 💻 Desktop optimized
- 📱 Mobile optimized
- 🖥️ Tablet friendly
- ⚡ Fast loading

---

## **Keyboard Shortcuts** (Coming Soon)

```
Ctrl + K    : Open search
Ctrl + D    : Go to dashboard
Ctrl + L    : Logout
```

---

## **Troubleshooting**

### **"Admin Panel Not Loading"**
✅ Check if Django server is running: `http://localhost:8000/admin/`  
✅ Check if you're logged in (cookies enabled)  
✅ Clear browser cache and refresh

### **"Login Not Working"**
✅ Verify credentials are correct  
✅ Check if admin user exists  
✅ Ensure Django is running on port 8000

### **"Data Not Showing"**
✅ API endpoint working: `http://localhost:8000/api/v1/admin/dashboard/`  
✅ Check browser console for errors (F12)  
✅ Ensure CORS is enabled in Django

---

## **Support**

For issues or feature requests:
1. Check the console (F12 → Console tab)
2. Check network tab for API errors
3. Verify server logs

---

**Ready to manage your business efficiently! 🚀**
