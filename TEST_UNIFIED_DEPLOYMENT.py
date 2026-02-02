#!/usr/bin/env python
"""
Test Unified Frontend-Backend Deployment
Tests that the entire system works with both frontend and backend served from single port
"""

import requests
import json
import time
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:8000"
API_BASE = f"{BASE_URL}/api/v1"

def print_header(title):
    """Print test section header"""
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")

def print_test(num, name, passed, details=""):
    """Print test result"""
    status = "✓ PASS" if passed else "✗ FAIL"
    print(f"\n[Test {num}] {name}")
    print(f"Status: {status}")
    if details:
        print(f"Details: {details}")

def test_1_frontend_loads():
    """Test 1: Frontend React app loads from root"""
    print_header("TEST 1: Frontend Loads")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=5)
        passed = response.status_code == 200
        # Check for React app indicators
        has_react = "index-" in response.text or "assets" in response.text
        print_test(1, "Frontend loads from http://localhost:8000/", 
                  passed and has_react, 
                  f"Status: {response.status_code}, Has React assets: {has_react}")
        return passed and has_react
    except Exception as e:
        print_test(1, "Frontend loads from http://localhost:8000/", False, str(e))
        return False

def test_2_api_courses():
    """Test 2: API endpoints work"""
    print_header("TEST 2: API Endpoints Work")
    try:
        response = requests.get(f"{API_BASE}/courses/", timeout=5)
        passed = response.status_code == 200
        data = response.json() if passed else {}
        print_test(2, "GET /api/v1/courses/ returns 200", passed, 
                  f"Status: {response.status_code}, Courses returned: {len(data) if isinstance(data, list) else 'N/A'}")
        return passed
    except Exception as e:
        print_test(2, "GET /api/v1/courses/ returns 200", False, str(e))
        return False

def test_3_contact_submission():
    """Test 3: Contact form submission works"""
    print_header("TEST 3: Contact Form Works")
    try:
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Unified Deployment Test",
            "message": "Testing unified frontend-backend deployment"
        }
        response = requests.post(
            f"{API_BASE}/contacts/",
            json=contact_data,
            timeout=5
        )
        passed = response.status_code == 201
        result = response.json() if response.text else {}
        print_test(3, "Contact form submission (POST /api/v1/contacts/)", 
                  passed,
                  f"Status: {response.status_code}, ID: {result.get('id', 'N/A')}")
        return passed
    except Exception as e:
        print_test(3, "Contact form submission", False, str(e))
        return False

def test_4_static_assets():
    """Test 4: Static assets serve correctly"""
    print_header("TEST 4: Static Assets")
    try:
        # Test CSS asset
        response = requests.get(
            f"{BASE_URL}/static/admin/css/base.css",
            timeout=5
        )
        passed = response.status_code == 200
        print_test(4, "Static files serve correctly", passed,
                  f"CSS Status: {response.status_code}")
        return passed
    except Exception as e:
        print_test(4, "Static files serve correctly", False, str(e))
        return False

def test_5_admin_panel():
    """Test 5: Admin panel accessible"""
    print_header("TEST 5: Admin Panel")
    try:
        response = requests.get(
            f"{BASE_URL}/admin/",
            timeout=5,
            auth=("admin", "titanobova")
        )
        passed = response.status_code == 200 or response.status_code == 302
        print_test(5, "Admin panel accessible (/admin/)", passed,
                  f"Status: {response.status_code}")
        return passed
    except Exception as e:
        print_test(5, "Admin panel accessible", False, str(e))
        return False

def test_6_single_server():
    """Test 6: Single server serves both frontend and API"""
    print_header("TEST 6: Single Server (Both Frontend & API)")
    try:
        frontend_ok = requests.get(f"{BASE_URL}/", timeout=5).status_code == 200
        api_ok = requests.get(f"{API_BASE}/courses/", timeout=5).status_code == 200
        passed = frontend_ok and api_ok
        print_test(6, "Single Django server serves frontend and API",
                  passed,
                  f"Frontend OK: {frontend_ok}, API OK: {api_ok}")
        return passed
    except Exception as e:
        print_test(6, "Single Django server serves both", False, str(e))
        return False

def test_7_spa_routing():
    """Test 7: SPA routing works (404 becomes index.html)"""
    print_header("TEST 7: SPA Routing")
    try:
        # Test various routes that should serve index.html
        test_routes = ["/about", "/services", "/contact", "/courses"]
        all_ok = True
        for route in test_routes:
            response = requests.get(f"{BASE_URL}{route}", timeout=5)
            # Should return 200 because Django serves index.html for all routes
            if response.status_code != 200:
                all_ok = False
                print(f"  Route {route}: {response.status_code} (expected 200)")
            else:
                # Should contain React app content
                has_react = "index-" in response.text or "assets" in response.text
                if not has_react:
                    all_ok = False
                    print(f"  Route {route}: No React content")
        
        print_test(7, "SPA routing (all non-API routes serve index.html)", all_ok,
                  f"Routes tested: {', '.join(test_routes)}")
        return all_ok
    except Exception as e:
        print_test(7, "SPA routing works", False, str(e))
        return False

def test_8_cors_headers():
    """Test 8: CORS headers present"""
    print_header("TEST 8: CORS Configuration")
    try:
        response = requests.options(
            f"{API_BASE}/contacts/",
            headers={"Origin": "http://localhost:5173"},
            timeout=5
        )
        has_cors = "access-control-allow-origin" in response.headers
        print_test(8, "CORS headers configured",
                  response.status_code in [200, 204],
                  f"Status: {response.status_code}, CORS headers: {has_cors}")
        return response.status_code in [200, 204] and has_cors
    except Exception as e:
        print_test(8, "CORS headers present", False, str(e))
        return False

def test_9_basic_auth():
    """Test 9: Basic auth protection works"""
    print_header("TEST 9: Basic Auth Protection")
    try:
        # Public endpoint should work without auth
        public = requests.get(f"{API_BASE}/courses/", timeout=5).status_code == 200
        
        # Protected endpoint should require auth
        protected_noauth = requests.get(f"{API_BASE}/users/", timeout=5).status_code
        
        # Try with basic auth (admin/titanobova)
        try:
            protected_auth = requests.get(
                f"{API_BASE}/users/",
                auth=("admin", "titanobova"),
                timeout=5
            ).status_code
        except:
            protected_auth = 401
        
        # Test passes if public works and protected requires auth
        passed = public and protected_noauth in [401, 403]
        print_test(9, "Basic auth protection",
                  passed,
                  f"Public OK: {public}, Protected (no auth): {protected_noauth}")
        return passed
    except Exception as e:
        print_test(9, "Basic auth protection", False, str(e))
        return False

def test_10_database_persistence():
    """Test 10: Database saves contacts"""
    print_header("TEST 10: Database Persistence")
    try:
        # Submit contact
        contact_data = {
            "name": f"DB Test {int(time.time())}",
            "email": "dbtest@example.com",
            "subject": "Database Test",
            "message": "Testing database persistence"
        }
        response = requests.post(f"{API_BASE}/contacts/", json=contact_data, timeout=5)
        passed = response.status_code == 201 and "id" in response.json()
        contact_id = response.json().get("id") if passed else "N/A"
        print_test(10, "Contact saved to database",
                  passed,
                  f"Status: {response.status_code}, Contact ID: {contact_id}")
        return passed
    except Exception as e:
        print_test(10, "Contact saved to database", False, str(e))
        return False

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("  UNIFIED FRONTEND-BACKEND DEPLOYMENT TEST SUITE")
    print("="*60)
    print(f"Server: {BASE_URL}")
    print(f"API Base: {API_BASE}")
    print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Wait for server to be ready
    print("\nWaiting for server to be ready...")
    max_retries = 10
    for i in range(max_retries):
        try:
            requests.get(f"{BASE_URL}/", timeout=2)
            print("✓ Server is ready\n")
            break
        except:
            if i < max_retries - 1:
                print(f"  Retry {i+1}/{max_retries}...")
                time.sleep(1)
            else:
                print("✗ Server not responding after 10 seconds. Aborting tests.")
                return
    
    # Run tests
    results = {
        "Frontend loads": test_1_frontend_loads(),
        "API endpoints": test_2_api_courses(),
        "Contact submission": test_3_contact_submission(),
        "Static assets": test_4_static_assets(),
        "Admin panel": test_5_admin_panel(),
        "Single server": test_6_single_server(),
        "SPA routing": test_7_spa_routing(),
        "CORS headers": test_8_cors_headers(),
        "Basic auth": test_9_basic_auth(),
        "Database persistence": test_10_database_persistence(),
    }
    
    # Summary
    print_header("TEST SUMMARY")
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    success_rate = (passed / total) * 100
    
    for test_name, passed in results.items():
        status = "✓" if passed else "✗"
        print(f"{status} {test_name}")
    
    print(f"\n{'='*60}")
    print(f"Results: {passed}/{total} tests passed ({success_rate:.0f}%)")
    print(f"{'='*60}\n")
    
    if success_rate == 100:
        print("🎉 ALL TESTS PASSED - Unified deployment is working perfectly!")
    elif success_rate >= 80:
        print(f"⚠️  {passed}/{total} tests passed - Deployment mostly working")
    else:
        print(f"❌ Only {passed}/{total} tests passed - Issues need fixing")

if __name__ == "__main__":
    main()
