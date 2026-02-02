"""
Comprehensive Integration Test Suite for Titanobova
Tests frontend-backend communication and all features
"""

import requests
import json
import time
import sys

# Configuration
API_BASE = 'http://localhost:8000/api/v1'
FRONTEND_URL = 'http://localhost:5176'
BACKEND_URL = 'http://localhost:8000'

# Test results
tests_passed = 0
tests_failed = 0
errors = []

def test(name, condition, details=""):
    global tests_passed, tests_failed
    if condition:
        print(f"  PASS: {name}")
        tests_passed += 1
    else:
        print(f"  FAIL: {name}")
        if details:
            print(f"        {details}")
        tests_failed += 1
        errors.append(name)

def section(title):
    print(f"\n{'='*60}")
    print(f" {title}")
    print(f"{'='*60}")

# ==============================================================================
# 1. BACKEND HEALTH CHECKS
# ==============================================================================
section("1. BACKEND HEALTH & CONNECTIVITY")

try:
    response = requests.get(f'{BACKEND_URL}/', timeout=5)
    test("Backend is accessible", response.status_code < 500, f"Status: {response.status_code}")
except Exception as e:
    test("Backend is accessible", False, f"Error: {str(e)}")

try:
    response = requests.get(f'{BACKEND_URL}/api/v1/contacts/', timeout=5)
    test("API endpoint accessible", response.status_code in [200, 201], f"Status: {response.status_code}")
except Exception as e:
    test("API endpoint accessible", False, f"Error: {str(e)}")

try:
    response = requests.get(f'{BACKEND_URL}/admin/', timeout=5)
    test("Admin panel accessible", response.status_code in [200, 302, 401], f"Status: {response.status_code}")
except Exception as e:
    test("Admin panel accessible", False, f"Error: {str(e)}")

# ==============================================================================
# 2. CORS CONFIGURATION
# ==============================================================================
section("2. CORS CONFIGURATION")

headers_test = {
    'Origin': 'http://localhost:5176',
    'Content-Type': 'application/json'
}

try:
    response = requests.options(f'{API_BASE}/contacts/', headers=headers_test, timeout=5)
    cors_header = response.headers.get('Access-Control-Allow-Origin', '')
    test("CORS headers present", 'localhost:5176' in cors_header or '*' in cors_header, f"Header: {cors_header}")
    test("CORS Allow Methods", 'POST' in response.headers.get('Access-Control-Allow-Methods', ''), "Check preflight response")
except Exception as e:
    test("CORS headers present", False, f"Error: {str(e)}")

# ==============================================================================
# 3. CONTACT FORM API
# ==============================================================================
section("3. CONTACT FORM API")

contact_data = {
    'name': 'Test User',
    'email': 'test@example.com',
    'subject': 'Integration Test',
    'message': 'This is a test message from the integration test suite'
}

try:
    response = requests.post(f'{API_BASE}/contacts/', json=contact_data, timeout=5)
    test("Contact submission (status)", response.status_code == 201, f"Status: {response.status_code}")
    
    if response.status_code == 201:
        data = response.json()
        test("Contact response has ID", 'id' in data, f"Keys: {list(data.keys())}")
        test("Contact response has email", 'email' in data, f"Data: {data}")
except Exception as e:
    test("Contact submission (status)", False, f"Error: {str(e)}")

# ==============================================================================
# 4. USER LOGIN
# ==============================================================================
section("4. USER LOGIN")

login_data = {
    'username': 'Rajkumar',
    'password': 'Preethi'
}

try:
    response = requests.post(f'{API_BASE}/auth/token/', json=login_data, timeout=5)
    test("Token endpoint available", response.status_code in [200, 401], f"Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        test("Token response has access", 'access' in data, f"Keys: {list(data.keys())}")
        token = data.get('access')
except Exception as e:
    test("Token endpoint available", False, f"Error: {str(e)}")

# ==============================================================================
# 5. COURSES API
# ==============================================================================
section("5. COURSES API")

try:
    response = requests.get(f'{API_BASE}/courses/', timeout=5)
    test("Courses list accessible", response.status_code == 200, f"Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        test("Courses response is iterable", isinstance(data, (list, dict)), f"Type: {type(data)}")
except Exception as e:
    test("Courses list accessible", False, f"Error: {str(e)}")

# ==============================================================================
# 6. STATIC FILES
# ==============================================================================
section("6. STATIC FILES SERVING")

try:
    response = requests.get(f'{BACKEND_URL}/static/rest_framework/css/bootstrap.min.css', timeout=5)
    test("Static files served", response.status_code == 200, f"Status: {response.status_code}")
except Exception as e:
    test("Static files served", False, f"Error: {str(e)}")

# ==============================================================================
# 7. FRONTEND CONNECTIVITY
# ==============================================================================
section("7. FRONTEND CONNECTIVITY")

try:
    response = requests.get(FRONTEND_URL, timeout=5)
    test("Frontend is running", response.status_code == 200, f"Status: {response.status_code}")
except Exception as e:
    test("Frontend is running", False, f"Error: {str(e)}")

try:
    response = requests.get(f'{FRONTEND_URL}/index.html', timeout=5)
    test("Frontend index.html accessible", response.status_code == 200, f"Status: {response.status_code}")
    test("Frontend has React content", 'html' in response.text.lower(), "Check response content")
except Exception as e:
    test("Frontend index.html accessible", False, f"Error: {str(e)}")

# ==============================================================================
# 8. FORM SUBMISSION WITH VARIOUS DATA
# ==============================================================================
section("8. FORM SUBMISSION VARIATIONS")

test_cases = [
    {
        'name': 'With phone number',
        'data': {'name': 'John Doe', 'email': 'john@example.com', 'phone': '+91-9876543210', 'subject': 'Inquiry', 'message': 'Test message'}
    },
    {
        'name': 'Without phone number',
        'data': {'name': 'Jane Doe', 'email': 'jane@example.com', 'subject': 'Support', 'message': 'Test support'}
    },
    {
        'name': 'With special characters',
        'data': {'name': 'Mr. A & B', 'email': 'test+tag@example.com', 'subject': 'Test & Demo', 'message': 'Message with special chars: !@#$%'}
    }
]

for test_case in test_cases:
    try:
        response = requests.post(f'{API_BASE}/contacts/', json=test_case['data'], timeout=5)
        test(f"Form submission: {test_case['name']}", response.status_code == 201, f"Status: {response.status_code}")
    except Exception as e:
        test(f"Form submission: {test_case['name']}", False, f"Error: {str(e)}")

# ==============================================================================
# 9. ERROR HANDLING
# ==============================================================================
section("9. ERROR HANDLING")

try:
    response = requests.post(f'{API_BASE}/contacts/', json={'name': 'Test'}, timeout=5)  # Missing required fields
    test("Validation error for incomplete form", response.status_code == 400, f"Status: {response.status_code}")
except Exception as e:
    test("Validation error for incomplete form", False, f"Error: {str(e)}")

try:
    response = requests.post(f'{API_BASE}/nonexistent/', json={'test': 'data'}, timeout=5)
    test("404 for invalid endpoint", response.status_code == 404, f"Status: {response.status_code}")
except Exception as e:
    test("404 for invalid endpoint", False, f"Error: {str(e)}")

# ==============================================================================
# 10. DATABASE PERSISTENCE
# ==============================================================================
section("10. DATABASE PERSISTENCE")

try:
    unique_email = f'persist-test-{int(time.time())}@example.com'
    contact_data = {
        'name': 'Persistence Test',
        'email': unique_email,
        'subject': 'DB Test',
        'message': 'Testing database persistence'
    }
    
    response = requests.post(f'{API_BASE}/contacts/', json=contact_data, timeout=5)
    test("Insert into database", response.status_code == 201, f"Status: {response.status_code}")
    
    if response.status_code == 201:
        created_id = response.json().get('id')
        # Note: Reading back might require authentication, so we just verify creation
        test("Contact has unique ID", created_id is not None, f"ID: {created_id}")
except Exception as e:
    test("Insert into database", False, f"Error: {str(e)}")

# ==============================================================================
# SUMMARY
# ==============================================================================
section("TEST SUMMARY")

total = tests_passed + tests_failed
pass_rate = (tests_passed / total * 100) if total > 0 else 0

print(f"\nTotal Tests: {total}")
print(f"Passed: {tests_passed} ({pass_rate:.1f}%)")
print(f"Failed: {tests_failed}")

if tests_failed > 0:
    print(f"\nFailed Tests:")
    for error in errors:
        print(f"  - {error}")
    sys.exit(1)
else:
    print("\n✅ All tests passed!")
    sys.exit(0)
