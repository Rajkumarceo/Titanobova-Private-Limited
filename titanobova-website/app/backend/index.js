require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || (process.env.JWT_SECRET || 'change_this_secret') + '_refresh';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'titanobovapvt@gmail.com';

// Configure email transporter only if SMTP settings provided
let mailTransporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  try {
    mailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: (process.env.SMTP_SECURE === 'true'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('✓ Email transporter configured (SMTP ready)');
  } catch (err) {
    console.warn('⚠ Email transporter configuration failed:', err.message);
    mailTransporter = null;
  }
} else {
  console.warn('⚠ SMTP not configured. Emails will not be sent. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env');
}

// Security middlewares
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.length && allowedOrigins.includes(origin)) return callback(null, true);
    if (/^http:\/\/localhost:\d+$/i.test(origin)) return callback(null, true);
    if (/^http:\/\/127\.0\.0\.1:\d+$/i.test(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed for origin: ' + origin), false);
  },
  credentials: true
}));

// Enforce HTTPS in production (when behind proxy set x-forwarded-proto)
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.secure || req.get('x-forwarded-proto') === 'https') return next();
    return res.status(403).json({ message: 'HTTPS required' });
  });
}

// Rate limiters
const generalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many auth attempts, try again later.' });
app.use(generalLimiter);
const fs = require('fs');

// Serve built frontend (if present) so admin dashboard is available at /admin-dashboard
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // Serve the admin build under a namespaced path so we can embed it in an iframe
  // This prevents admin CSS from leaking into the public site's header/footer.
  app.use('/admin-app', express.static(frontendDist));

  // Serve an admin shell that re-uses the public site's header/footer so
  // the dashboard keeps the same branding as the main site. This avoids a
  // jarring style switch when hosts log in.
  app.get('/admin-dashboard*', (req, res) => {
    try {
      const publicIndex = path.join(__dirname, '..', '..', 'index.html');
      let headerHtml = '';
      let footerHtml = '';

      if (fs.existsSync(publicIndex)) {
        const publicContent = fs.readFileSync(publicIndex, 'utf8');
        const navMatch = publicContent.match(/<nav[\s\S]*?<\/nav>/i);
        const footerMatch = publicContent.match(/<footer[\s\S]*?<\/footer>/i);
        headerHtml = navMatch ? navMatch[0] : '';
        footerHtml = footerMatch ? footerMatch[0] : '';
      }

      // Find built asset names dynamically
      const assetsDir = path.join(frontendDist, 'assets');
      let cssFile = null;
      let jsFile = null;
      if (fs.existsSync(assetsDir)) {
        const assets = fs.readdirSync(assetsDir);
        cssFile = assets.find(a => a.endsWith('.css')) || null;
        jsFile = assets.find(a => a.endsWith('.js')) || null;
      }

      const shell = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Titanobova Admin</title>
  <link rel="icon" href="/assets/titanobova%20heading%20logo.png" type="image/png">
  <link rel="stylesheet" href="/css/professional.css">
  <style>
    /* Minimal critical header CSS to avoid unstyled flash in admin shell */
    #public-header{display:block;background:#fff;border-bottom:1px solid #eee}
    #public-header .nav-container{max-width:1100px;margin:0 auto;padding:18px 20px;display:flex;align-items:center;justify-content:space-between}
    #public-header .logo{font-weight:700}
    #public-header .nav-menu{list-style:none;margin:0;padding:0;display:flex;gap:18px;align-items:center}
    #public-header .nav-menu li{display:inline-block}
    #public-header .nav-menu a{color:#333;text-decoration:none;padding:8px 12px;border-radius:6px}
    /* Hide accidental top-level lists that may appear when the page is served differently */
    body > ul:first-child { display: none !important; }
  </style>
</head>
<body>
  <div id="public-header">${headerHtml}</div>
  <main id="admin-root" style="min-height:60vh;padding:0;margin:0;">
    <div style="width:100%;height:calc(100vh - 160px);">
      <iframe src="/admin-app/" title="Admin App" style="border:0;width:100%;height:100%;" loading="eager"></iframe>
    </div>
  </main>
  ${footerHtml}
  <script src="/js/fouc.js" defer></script>
</body>
</html>`;

      return res.send(shell);
    } catch (err) {
      console.error('Admin shell render error:', err.message);
      return res.sendFile(path.join(frontendDist, 'index.html'));
    }
  });
}

// Serve top-level static site (index.html, css/, js/, assets/) so visiting
// http://localhost:4000/ displays the static front page from the repo root.
// Add a simple favicon route so browsers requesting `/favicon.ico` get the site icon.
app.get('/favicon.ico', (req, res) => {
  const faviconPath = path.join(__dirname, '..', '..', 'assets', 'titanobova%20heading%20logo.png');
  if (fs.existsSync(faviconPath)) return res.sendFile(faviconPath);
  return res.status(404).end();
});
app.use(express.static(path.join(__dirname, '..', '..')));
// In-memory refresh token store (for demo only — use persistent store in production)
const refreshTokens = new Set();

// Helper to create access token
function createAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

// Helper to create refresh token
function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

// Login endpoint
app.post('/api/auth/login', authLimiter, [
  check('username').trim().notEmpty(),
  check('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;
  const hostUser = process.env.HOST_USERNAME || 'admin';
  const hostPassHash = process.env.HOST_PASSWORD_HASH || null;
  const hostPassPlain = process.env.HOST_PASSWORD || null;

  // Verify username
  if (username !== hostUser) return res.status(401).json({ message: 'Invalid credentials' });

  let passwordMatches = false;
  console.log('Login attempt for user:', username, 'usingHash:', !!hostPassHash, 'plainFallback:', !!hostPassPlain);
  if (hostPassHash) {
    try {
      passwordMatches = await bcrypt.compare(password, hostPassHash);
      console.log('Bcrypt compare result:', passwordMatches);
    } catch (err) {
      console.error('Bcrypt compare error:', err.message);
      return res.status(500).json({ message: 'Auth error' });
    }
  } else if (hostPassPlain) {
    // Fallback to plaintext (not recommended for production)
    passwordMatches = password === hostPassPlain;
    console.warn('⚠ Using plaintext password check. Set HOST_PASSWORD_HASH in production.');
    console.log('Plaintext compare result:', passwordMatches);
  }

  if (!passwordMatches) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = createAccessToken({ role: 'host', username });
  const refreshToken = createRefreshToken({ role: 'host', username });
  refreshTokens.add(refreshToken);

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.json({ token: accessToken });
});

// Refresh endpoint
app.post('/api/auth/refresh', (req, res) => {
  const token = req.cookies['refresh_token'];
  if (!token) return res.status(401).json({ message: 'Missing refresh token' });
  if (!refreshTokens.has(token)) return res.status(403).json({ message: 'Refresh token revoked' });

  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const newAccess = createAccessToken({ role: payload.role, username: payload.username });
    return res.json({ token: newAccess });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  const token = req.cookies['refresh_token'];
  if (token) {
    refreshTokens.delete(token);
    res.clearCookie('refresh_token');
  }
  return res.json({ message: 'Logged out' });
});

// Middleware to protect admin routes
function authenticateHost(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing authorization header' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid authorization header' });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'host') return res.status(403).json({ message: 'Forbidden' });
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Contact submission endpoint (with validation and email)
app.post('/api/contacts', [
  check('name').trim().notEmpty().escape(),
  check('email').isEmail().normalizeEmail(),
  check('message').trim().notEmpty().escape(),
  check('phone').optional().trim().escape(),
  check('subject').optional().trim().escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, subject, message } = req.body;

  try {
    const result = await db.insertContact({ name, email, phone, subject, message });

    // Send notification email if transporter is configured
    if (mailTransporter) {
      const mailOptions = {
        from: process.env.SMTP_FROM || `noreply@titanobova.local`,
        to: NOTIFY_EMAIL,
        subject: `New contact from ${name} - ${subject || 'No subject'}`,
        text: `New contact submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Subject:</strong> ${subject || 'N/A'}</p><hr/><p><strong>Message:</strong></p><p>${message}</p>`
      };

      mailTransporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.warn('⚠ Email send failed:', err.message);
        } else {
          console.log('✓ Contact notification email sent');
        }
      });
    }

    // If the client expects HTML (typical browser form submission), redirect to a success page
    const contentType = (req.get('content-type') || '').toLowerCase();
    const accept = (req.get('accept') || '').toLowerCase();
    const isFormPost = contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data');
    const wantsHtml = accept.includes('text/html') || isFormPost;

    if (wantsHtml) {
      // Redirect to a friendly static success page served by the backend
      return res.redirect('/pages/contact-success.html');
    }

    return res.status(201).json({ id: result.id, message: 'Contact submitted successfully' });
  } catch (err) {
    console.error('Contact submission error:', err.message);
    // If HTML client, show basic error page
    const accept = (req.get('accept') || '').toLowerCase();
    if (accept.includes('text/html')) {
      return res.status(500).send('<h1>Submission failed</h1><p>Server error saving your message. Please try again later.</p>');
    }
    return res.status(500).json({ message: 'Failed to save contact' });
  }
});

// Course registration endpoint
app.post('/api/courses/register', [
  check('name').trim().notEmpty().escape(),
  check('email').isEmail().normalizeEmail(),
  check('course').trim().notEmpty().escape(),
  check('price').isInt({ min: 0 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, course, level, price, notes } = req.body;

  try {
    const result = await db.insertRegistration({ name, email, phone, course, level, price: parseInt(price, 10), notes });

    // Send notification email if configured
    if (mailTransporter) {
      const mailOptions = {
        from: process.env.SMTP_FROM || `noreply@titanobova.local`,
        to: NOTIFY_EMAIL,
        subject: `New course registration: ${course} (${level || 'N/A'})`,
        text: `New registration:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCourse: ${course}\nLevel: ${level || 'N/A'}\nPrice: ${price}\nNotes: ${notes || ''}`
      };
      mailTransporter.sendMail(mailOptions, (err, info) => {
        if (err) console.warn('⚠ Registration email failed:', err.message);
        else console.log('✓ Registration notification sent');
      });
    }

    const contentType = (req.get('content-type') || '').toLowerCase();
    const accept = (req.get('accept') || '').toLowerCase();
    const isFormPost = contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data');
    const wantsHtml = accept.includes('text/html') || isFormPost;
    const paymentUrl = `/pages/payment.html?id=${result.id}`;
    if (wantsHtml) return res.redirect('/pages/registration-success.html');

    return res.status(201).json({ id: result.id, message: 'Registration received', paymentUrl });
  } catch (err) {
    console.error('Registration save error:', err.message);
    return res.status(500).json({ message: 'Failed to save registration' });
  }
});

// Public endpoint to fetch a single registration by id (used for payment flow)
app.get('/api/registrations/public', async (req, res) => {
  const id = parseInt(req.query.id, 10);
  if (!id) return res.status(400).json({ message: 'Missing id' });
  try {
    const rows = await db.getRegistrations();
    const reg = rows.find(r => Number(r.id) === Number(id));
    if (!reg) return res.status(404).json({ message: 'Registration not found' });
    return res.json({ registration: reg });
  } catch (err) {
    console.error('Public registration fetch error:', err.message);
    return res.status(500).json({ message: 'Failed to fetch registration' });
  }
});

// Admin: list registrations (protected)
app.get('/api/admin/registrations', authenticateHost, async (req, res) => {
  try {
    const rows = await db.getRegistrations();
    return res.json({ registrations: rows });
  } catch (err) {
    console.error('Get registrations error:', err.message);
    return res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});

// Admin: mark registration as paid (protected)
app.post('/api/admin/registrations/:id/mark-paid', authenticateHost, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ message: 'Invalid id' });
  try {
    const result = await db.markRegistrationPaid(id);
    return res.json({ changed: result.changedRows || result.changed || 0 });
  } catch (err) {
    console.error('Mark paid error:', err.message);
    return res.status(500).json({ message: 'Failed to mark registration paid' });
  }
});

// Get all contacts (protected endpoint)
app.get('/api/admin/contacts', authenticateHost, async (req, res) => {
  try {
    const rows = await db.getContacts();
    return res.json({ contacts: rows });
  } catch (err) {
    console.error('Get contacts error:', err.message);
    return res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// ============================================
// ENROLLMENT ENDPOINTS
// ============================================

// Create a new enrollment
app.post('/api/enrollments', async (req, res) => {
  const { firstName, lastName, email, phone, experience, courseTitle, coursePrice, courseDuration, courseLevel, enrollmentDate } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || !courseTitle) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const fullName = `${firstName} ${lastName}`;
    const enrollmentData = {
      name: fullName,
      email,
      phone,
      course: courseTitle,
      level: courseLevel || 'Beginner',
      price: coursePrice || 0,
      notes: `Experience: ${experience}. Enrolled: ${enrollmentDate}`,
      experience: experience
    };

    const result = await db.insertRegistration(enrollmentData);
    
    return res.status(201).json({ 
      id: result.id, 
      message: 'Enrollment successful',
      enrollment: enrollmentData
    });
  } catch (err) {
    console.error('Enrollment creation error:', err.message);
    return res.status(500).json({ message: 'Failed to create enrollment' });
  }
});

// Get all enrollments (protected - admin only)
app.get('/api/admin/enrollments', authenticateHost, async (req, res) => {
  try {
    const rows = await db.getRegistrations();
    return res.json({ enrollments: rows });
  } catch (err) {
    console.error('Get enrollments error:', err.message);
    return res.status(500).json({ message: 'Failed to fetch enrollments' });
  }
});

// Get enrollments by email (for user to view their own enrollments)
app.get('/api/enrollments/:email', async (req, res) => {
  const { email } = req.params;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const rows = await db.getRegistrations();
    const userEnrollments = rows.filter(r => r.email.toLowerCase() === email.toLowerCase());
    return res.json({ enrollments: userEnrollments });
  } catch (err) {
    console.error('Get user enrollments error:', err.message);
    return res.status(500).json({ message: 'Failed to fetch enrollments' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  return res.json({ status: 'ok', server: 'Titanobova Backend' });
});

// Start server
app.listen(PORT, async () => {
  // Initialize database
  try {
    await db.init();
  } catch (err) {
    console.error('⚠ Database initialization warning:', err.message);
  }

  // Determine which database is active
  const activeDB = process.env.MYSQL_PASSWORD && process.env.MYSQL_HOST ? 'MySQL (with SQLite fallback)' : 'SQLite';

  console.log(`\n========================================`);
  console.log(`✓ Backend running on port ${PORT}`);
  console.log(`✓ CORS enabled for: ${CORS_ORIGIN}`);
  console.log(`✓ Database: ${activeDB}`);
  console.log(`✓ Notify email: ${NOTIFY_EMAIL}`);
  console.log(`========================================\n`);
});
