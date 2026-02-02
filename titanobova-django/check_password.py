#!/usr/bin/env python
import os
import django
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'titanobova_project.settings')
django.setup()

User = get_user_model()

u = User.objects.filter(email='admin@titanobova.com').first()
if not u:
    print('Admin user not found')
else:
    print('Username:', u.username)
    print('Is staff:', u.is_staff, 'Is superuser:', u.is_superuser)
    print('Password hash:', u.password)
    print('Check Titanobova:', check_password('Titanobova', u.password))
    print('Check Admin@1234:', check_password('Admin@1234', u.password))
