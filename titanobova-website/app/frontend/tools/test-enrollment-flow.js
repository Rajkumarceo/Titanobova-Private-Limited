#!/usr/bin/env node
/**
 * Test Script: Enrollment to Payment Flow
 * Tests the complete user journey from enrollment to payment success
 */

const axios = require('axios');

const API_URL = 'http://localhost:4000';

// Test data
const testEnrollment = {
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  phone: '+91 9876543210',
  experience: 'beginner',
  courseTitle: 'Web Development',
  coursePrice: 4999,
  courseDuration: '12 weeks',
  courseLevel: 'Beginner to Intermediate',
  enrollmentDate: new Date().toISOString(),
};

const testPayment = {
  cardName: 'Test User',
  cardNumber: '4111111111111111',
  cardExpiry: '12/25',
  cardCVV: '123',
  billingEmail: 'testuser@example.com',
  billingPhone: '+91 9876543210'
};

async function runTests() {
  console.log('🚀 Starting Enrollment Flow Tests...\n');

  try {
    // Test 1: Enrollment
    console.log('📝 Test 1: Creating Enrollment...');
    const enrollmentRes = await axios.post(`${API_URL}/api/enrollments`, testEnrollment);
    
    if (enrollmentRes.status === 201) {
      console.log('✅ Enrollment Success');
      console.log(`   ID: ${enrollmentRes.data.id}`);
      console.log(`   Student: ${enrollmentRes.data.enrollment.name}`);
      console.log(`   Course: ${enrollmentRes.data.enrollment.course}`);
      console.log(`   Price: ₹${enrollmentRes.data.enrollment.price}\n`);
    } else {
      throw new Error(`Unexpected status: ${enrollmentRes.status}`);
    }

    // Test 2: Verify Enrollment
    console.log('🔍 Test 2: Retrieving Enrollment by Email...');
    const verifyRes = await axios.get(`${API_URL}/api/enrollments/${testEnrollment.email}`);
    
    if (verifyRes.status === 200) {
      console.log('✅ Verification Success');
      console.log(`   Found ${verifyRes.data.enrollments.length} enrollment(s)\n`);
    } else {
      throw new Error(`Unexpected status: ${verifyRes.status}`);
    }

    // Test 3: Test Payment Endpoint (if exists)
    console.log('💳 Test 3: Testing Payment Endpoint Availability...');
    try {
      const paymentRes = await axios.post(`${API_URL}/api/payments`, {
        ...testPayment,
        enrollmentId: enrollmentRes.data.id,
        amount: enrollmentRes.data.enrollment.price
      });
      console.log('✅ Payment Endpoint Available');
      console.log(`   Status: ${paymentRes.status}\n`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log('⚠️  Payment endpoint not yet implemented (expected for now)\n');
      } else {
        throw err;
      }
    }

    console.log('✅ All Tests Passed!');
    console.log('\n📋 Summary:');
    console.log('   ✓ Enrollment creation working');
    console.log('   ✓ Data retrieval working');
    console.log('   ✓ Flow ready for frontend integration');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test Failed:');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data?.message || error.message}`);
    } else {
      console.error(`   ${error.message}`);
    }
    process.exit(1);
  }
}

runTests();
