#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'titanobova_project.settings')
django.setup()

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.backends import ModelBackend

User = get_user_model()

u = User.objects.filter(email='admin@titanobova.com').first()
print('User found:', bool(u), 'username=', getattr(u,'username',None), 'is_active=', getattr(u,'is_active',None))

print('\nTrying authenticate() generic:')
print(authenticate(username='Rajkumar', password='Admin@1234'))
print(authenticate(username='Rajkumar', password='Titanobova'))

print('\nTrying ModelBackend directly:')
mb = ModelBackend()
print('ModelBackend.authenticate ->', mb.authenticate(None, username='Rajkumar', password='Admin@1234'))

print('\nTrying with email as username:')
print(authenticate(username='admin@titanobova.com', password='Admin@1234'))
