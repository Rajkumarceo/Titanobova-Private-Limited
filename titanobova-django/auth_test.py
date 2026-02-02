#!/usr/bin/env python
import os
import django
from django.contrib.auth import authenticate, get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'titanobova_project.settings')
django.setup()

User = get_user_model()

creds = [
    ('Rajkumar', 'Titanobova'),
    ('rajkumar', 'Titanobova'),
    ('admin@titanobova.com', 'Titanobova'),
]

for uname, pwd in creds:
    user = authenticate(username=uname, password=pwd)
    print(f"Trying username='{uname}' ->", 'Success' if user else 'Failed')

# Try authenticate via email manually
try:
    u = User.objects.filter(email='admin@titanobova.com').first()
    if u:
        print('Found user by email:', u.username, 'is_staff=', u.is_staff, 'is_superuser=', u.is_superuser)
        authed = authenticate(username=u.username, password='Titanobova')
        print('Authenticate using found username ->', 'Success' if authed else 'Failed')
except Exception as e:
    print('Error checking email-based auth:', e)
