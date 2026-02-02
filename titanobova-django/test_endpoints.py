#!/usr/bin/env python
import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'titanobova_project.settings')
django.setup()

from django.test import Client
from django.urls import reverse, get_resolver

client = Client()

print("=" * 80)
print("TITANOBOVA API ENDPOINT TEST REPORT")
print("=" * 80)

# Get all available endpoints
resolver = get_resolver()
endpoints = []
for pattern in resolver.url_patterns:
    endpoints.append(str(pattern.pattern))

print("\n1. TESTING LOGIN ENDPOINT")
print("-" * 80)
try:
    response = client.post('/api/v1/auth/token/', 
        data=json.dumps({'username': 'Rajkumar', 'password': 'Titanobova'}),
        content_type='application/json')
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print("✓ Login endpoint working")
        data = json.loads(response.content)
        print(f"Response keys: {list(data.keys())}")
    else:
        print(f"✗ Login failed: {response.content}")
except Exception as e:
    print(f"✗ Error: {e}")

print("\n2. TESTING CONTACT ENDPOINT")
print("-" * 80)
try:
    response = client.post('/api/v1/contacts/',
        data=json.dumps({'name': 'Test', 'email': 'test@test.com', 'phone': '123', 'subject': 'test', 'message': 'test'}),
        content_type='application/json')
    print(f"Status: {response.status_code}")
    if response.status_code in [200, 201]:
        print("✓ Contact endpoint working")
    else:
        print(f"✗ Contact failed: {response.content}")
except Exception as e:
    print(f"✗ Error: {e}")

print("\n3. TESTING ADMIN PANEL ACCESS")
print("-" * 80)
try:
    response = client.get('/admin/')
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print("✓ Admin panel accessible")
    else:
        print(f"Admin response status: {response.status_code}")
except Exception as e:
    print(f"✗ Error: {e}")

print("\n4. CHECKING DATABASE")
print("-" * 80)
from django.contrib.auth import get_user_model
User = get_user_model()
try:
    rajkumar = User.objects.get(username='Rajkumar')
    print(f"✓ Rajkumar user found:")
    print(f"  - Email: {rajkumar.email}")
    print(f"  - Staff: {rajkumar.is_staff}")
    print(f"  - Superuser: {rajkumar.is_superuser}")
except User.DoesNotExist:
    print("✗ Rajkumar user not found")

print("\n5. TESTING API ROUTES")
print("-" * 80)
test_routes = [
    ('GET', '/api/v1/courses/', 'Courses list'),
    ('GET', '/api/v1/users/', 'Users list'),
    ('GET', '/api/v1/contacts/', 'Contacts list'),
]

for method, route, desc in test_routes:
    try:
        if method == 'GET':
            response = client.get(route)
        print(f"{route}: {response.status_code} - {desc}")
    except Exception as e:
        print(f"{route}: ERROR - {e}")

print("\n" + "=" * 80)
print("TEST COMPLETE")
print("=" * 80)
