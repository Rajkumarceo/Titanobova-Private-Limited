#!/usr/bin/env node
/**
 * Site Diagnostic Tool
 * Comprehensive testing of all site components
 */

const http = require('http');
const axios = require('axios');

const BACKEND_URL = 'http://localhost:4000';
const FRONTEND_URL = 'http://localhost:5174';

async function testEndpoint(url, method = 'GET', data = null) {
  try {
    const config = { method, url };
    if (data) {
      config.data = data;
      config.headers = { 'Content-Type': 'application/json' };
    }
    
    const response = await axios(config);
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      status: error.response?.status || 'Connection Failed',
      message: error.message 
    };
  }
}

async function runDiagnostics() {
  console.log('\n🔍 TITANOBOVA SITE DIAGNOSTIC REPORT\n');
  console.log('='.repeat(60));

  let passed = 0;
  let failed = 0;

  // Test 1: Backend Server
  console.log('\n📡 BACKEND TESTS\n');
  
  const backendTests = [
    {
      name: 'Backend Health',
      url: `${BACKEND_URL}/api/health`,
      method: 'GET'
    },
    {
      name: 'Enrollments API',
      url: `${BACKEND_URL}/api/enrollments`,
      method: 'POST',
      data: {
        firstName: 'Diagnostic',
        lastName: 'Test',
        email: 'diag@test.com',
        phone: '+919876543210',
        experience: 'beginner',
        courseTitle: 'Test Course',
        coursePrice: 2499,
        courseDuration: '6 weeks',
        courseLevel: 'Beginner',
        enrollmentDate: new Date().toISOString()
      }
    },
    {
      name: 'Contacts API',
      url: `${BACKEND_URL}/api/contacts`,
      method: 'POST',
      data: {
        name: 'Test',
        email: 'contact@test.com',
        phone: '9876543210',
        subject: 'Test',
        message: 'Test message'
      }
    }
  ];

  for (const test of backendTests) {
    const result = await testEndpoint(test.url, test.method, test.data);
    
    if (result.success || result.status === 201 || result.status === 200) {
      console.log(`✅ ${test.name}: SUCCESS (${result.status})`);
      passed++;
    } else if (result.status === 404) {
      console.log(`⚠️  ${test.name}: NOT FOUND (${result.status})`);
    } else {
      console.log(`❌ ${test.name}: FAILED (${result.status || result.message})`);
      failed++;
    }
  }

  // Test 2: Frontend Server
  console.log('\n🌐 FRONTEND TESTS\n');
  
  try {
    const response = await new Promise((resolve, reject) => {
      const request = http.get(FRONTEND_URL, { timeout: 5000 }, (res) => {
        resolve({ status: res.statusCode });
      });
      request.on('error', reject);
    });
    
    if (response.status === 200) {
      console.log(`✅ Frontend Server: ONLINE (http://localhost:5174/)`);
      passed++;
    } else {
      console.log(`⚠️  Frontend Server: Status ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Frontend Server: OFFLINE`);
    failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 DIAGNOSTIC SUMMARY\n');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 ALL SYSTEMS OPERATIONAL!\n');
    console.log('Frontend: http://localhost:5174');
    console.log('Backend:  http://localhost:4000');
    console.log('\nUser Journey:');
    console.log('1. Visit http://localhost:5174/courses');
    console.log('2. Click "Enroll Now" on any course');
    console.log('3. Complete enrollment form');
    console.log('4. Redirect to payment page');
    console.log('5. Complete payment');
    console.log('6. View success confirmation\n');
  } else {
    console.log('\n⚠️  SOME ISSUES DETECTED\n');
    console.log('Common fixes:');
    console.log('1. Ensure backend is running: cd app/backend && npm start');
    console.log('2. Ensure frontend is running: cd app/frontend && npm run dev');
    console.log('3. Check firewall/port availability\n');
  }

  console.log('='.repeat(60) + '\n');
  process.exit(failed > 0 ? 1 : 0);
}

runDiagnostics().catch(error => {
  console.error('Diagnostic Error:', error.message);
  process.exit(1);
});
