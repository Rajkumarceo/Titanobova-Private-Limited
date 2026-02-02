#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'titanobova_project.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

u = User.objects.filter(email='admin@titanobova.com').first()
if not u:
    print('Admin user not found')
else:
    u.set_password('Admin@1234')
    u.save()
    print('Password set to Admin@1234 for user', u.username)
