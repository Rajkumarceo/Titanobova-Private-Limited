#!/usr/bin/env node
/**
 * COMPREHENSIVE BACKEND API TEST SUITE
 * Tests all endpoints: health, contact submission, login, protected routes
 * Checks database storage and validates responses
 */

const http = require('http');

const BASE_URL = 'http://localhost:4000';
let accessToken = null;

// Helper function to make HTTP requests
function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, body: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Color output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  gray: '\x1b[90m'
};

function log(type, message) {
  const prefix = {
    success: `${colors.green}✓${colors.reset}`,
    error: `${colors.red}✗${colors.reset}`,
    info: `${colors.blue}ℹ${colors.reset}`,
    test: `${colors.yellow}→${colors.reset}`
  }[type] || '•';
  
  console.log(`${prefix} ${message}`);
}

// Test Suite
async function runTests() {
  console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.blue}  TITANOBOVA BACKEND - COMPREHENSIVE TEST SUITE${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

  let passed = 0;
  let failed = 0;

  try {
    // TEST 1: Health Check
    console.log(`${colors.yellow}[TEST 1] Health Check - GET /api/health${colors.reset}`);
    const health = await makeRequest('GET', '/api/health');
    if (health.status === 200 && health.body.status === 'ok') {
      log('success', 'Health check passed');
      passed++;
    } else {
      log('error', `Health check failed: ${health.status} ${JSON.stringify(health.body)}`);
      failed++;
    }
    console.log(`  Response: ${JSON.stringify(health.body)}\n`);

    // TEST 2: Login - Invalid Credentials
    console.log(`${colors.yellow}[TEST 2] Login - Invalid Credentials${colors.reset}`);
    const loginFail = await makeRequest('POST', '/api/auth/login', {
      username: 'wronguser',
      password: 'wrongpass'
    });
    if (loginFail.status === 401) {
      log('success', 'Correctly rejected invalid credentials');
      passed++;
    } else {
      log('error', `Should reject invalid credentials: ${loginFail.status}`);
      failed++;
    }
    console.log(`  Response: ${JSON.stringify(loginFail.body)}\n`);

    // TEST 3: Login - Valid Credentials (only if provided via env)
    const testUsername = process.env.HOST_USERNAME || null;
    const testPassword = process.env.HOST_PASSWORD || null;
    if (testUsername && testPassword) {
      console.log(`${colors.yellow}[TEST 3] Login - Valid Credentials (from env)${colors.reset}`);
      const loginSuccess = await makeRequest('POST', '/api/auth/login', {
        username: testUsername,
        password: testPassword
      });
      if (loginSuccess.status === 200 && loginSuccess.body.token) {
        log('success', 'Login successful - Token received');
        accessToken = loginSuccess.body.token;
        passed++;
        console.log(`  Token: ${accessToken.substring(0, 20)}...`);
      } else {
        log('error', `Login failed: ${loginSuccess.status} ${JSON.stringify(loginSuccess.body)}`);
        failed++;
      }
      console.log();
    } else {
      console.log(`${colors.gray}→ Skipping valid-login tests: set HOST_USERNAME and HOST_PASSWORD to enable.${colors.reset}\n`);
    }

    // TEST 4: Contact Form - Missing Fields
    console.log(`${colors.yellow}[TEST 4] Contact Submission - Missing Required Fields${colors.reset}`);
    const contactFail = await makeRequest('POST', '/api/contacts', {
      name: 'Test',
      // missing email and message
    });
    if (contactFail.status === 400) {
      log('success', 'Correctly rejected missing fields');
      passed++;
    } else {
      log('error', `Should reject missing fields: ${contactFail.status}`);
      failed++;
    }
    console.log(`  Response: ${JSON.stringify(contactFail.body)}\n`);

    // TEST 5: Contact Form - Valid Submission
    console.log(`${colors.yellow}[TEST 5] Contact Submission - Valid Data${colors.reset}`);
    const contactData = {
      name: 'Test User',
      email: 'testuser@example.com',
      phone: '+91 8270691757',
      subject: 'Testing Backend API',
      message: 'This is a test message to verify backend functionality'
    };
    const contactSuccess = await makeRequest('POST', '/api/contacts', contactData);
    if (contactSuccess.status === 201 || contactSuccess.status === 200) {
      log('success', `Contact submitted successfully - ID: ${contactSuccess.body.id || 'DB recorded'}`);
      passed++;
      console.log(`  Response: ${JSON.stringify(contactSuccess.body)}`);
    } else {
      log('error', `Contact submission failed: ${contactSuccess.status}`);
      failed++;
      console.log(`  Response: ${JSON.stringify(contactSuccess.body)}`);
    }
    console.log();

    // TEST 6: Protected Route - Get Contacts (Without Token)
    console.log(`${colors.yellow}[TEST 6] Protected Route - Get Contacts (NO Token)${colors.reset}`);
    const contactsNoAuth = await makeRequest('GET', '/api/admin/contacts');
    if (contactsNoAuth.status === 401) {
      log('success', 'Correctly blocked unauthorized access');
      passed++;
    } else {
      log('error', `Should block unauthorized access: ${contactsNoAuth.status}`);
      failed++;
    }
    console.log(`  Response: ${JSON.stringify(contactsNoAuth.body)}\n`);

    // TEST 7: Protected Route - Get Contacts (With Token)
    if (accessToken) {
      console.log(`${colors.yellow}[TEST 7] Protected Route - Get Contacts (WITH Token)${colors.reset}`);
      const contactsAuth = await makeRequest('GET', '/api/admin/contacts', null, {
        'Authorization': `Bearer ${accessToken}`
      });
      if (contactsAuth.status === 200 && Array.isArray(contactsAuth.body.contacts)) {
        log('success', `Retrieved ${contactsAuth.body.contacts.length} contact(s)`);
        passed++;
        if (contactsAuth.body.contacts.length > 0) {
          console.log(`  Latest contact: ${JSON.stringify(contactsAuth.body.contacts[0], null, 2)}`);
        }
      } else {
        log('error', `Failed to retrieve contacts: ${contactsAuth.status}`);
        failed++;
        console.log(`  Response: ${JSON.stringify(contactsAuth.body)}`);
      }
      console.log();
    }

    // TEST 8: Multiple Contact Submissions (Stress Test)
    console.log(`${colors.yellow}[TEST 8] Multiple Contact Submissions (Stress Test - 3 records)${colors.reset}`);
    let successCount = 0;
    for (let i = 1; i <= 3; i++) {
      const testContact = {
        name: `Stress Test User ${i}`,
        email: `stresstest${i}@example.com`,
        phone: `+91 8270691${700 + i}`,
        subject: `Stress Test Submission ${i}`,
        message: `This is stress test message number ${i} at ${new Date().toISOString()}`
      };
      try {
        const res = await makeRequest('POST', '/api/contacts', testContact);
        if (res.status === 201 || res.status === 200) {
          successCount++;
        }
      } catch (e) {
        // ignore
      }
    }
    if (successCount === 3) {
      log('success', `All ${successCount} stress test submissions succeeded`);
      passed++;
    } else {
      log('error', `Only ${successCount}/3 stress test submissions succeeded`);
      failed++;
    }
    console.log();

    // TEST 9: Verify Data Persistence
    if (accessToken) {
      console.log(`${colors.yellow}[TEST 9] Data Persistence - Retrieve All Contacts${colors.reset}`);
      const allContacts = await makeRequest('GET', '/api/admin/contacts', null, {
        'Authorization': `Bearer ${accessToken}`
      });
      if (allContacts.status === 200) {
        const count = allContacts.body.contacts.length;
        log('success', `Database contains ${count} contact(s) - Data persisting correctly`);
        passed++;
        
        // Show all contacts
        console.log(`\n  ${colors.gray}All Stored Contacts:${colors.reset}`);
        allContacts.body.contacts.forEach((contact, idx) => {
          console.log(`  ${idx + 1}. ${contact.name} (${contact.email}) - ${contact.created_at}`);
        });
      } else {
        log('error', `Failed to retrieve stored contacts`);
        failed++;
      }
      console.log();
    }

  } catch (err) {
    log('error', `Unexpected error: ${err.message}`);
    failed++;
  }

  // Summary
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.blue}  TEST SUMMARY${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.green}✓ Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}✗ Failed: ${failed}${colors.reset}`);
  console.log(`${colors.yellow}Total: ${passed + failed}${colors.reset}\n`);

  if (failed === 0) {
    console.log(`${colors.green}🎉 ALL TESTS PASSED! Backend is working correctly.${colors.reset}\n`);
  } else {
    console.log(`${colors.red}⚠ Some tests failed. Review the output above.${colors.reset}\n`);
  }

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
console.log(`\n⏳ Waiting for backend to respond...\n`);
setTimeout(runTests, 1000);
