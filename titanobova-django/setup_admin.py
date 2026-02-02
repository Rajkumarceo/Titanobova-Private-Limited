#!/usr/bin/env python
"""
Setup script to fix admin authentication and user issues
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'titanobova_project.settings')
django.setup()

from apps.users.models import User

print("Current users in database:")
for user in User.objects.all():
    print(f"  - {user.username} ({user.email})")

# Update all existing users to have correct permissions and password
users_to_fix = ['admin', 'Rajkumar']
for username in users_to_fix:
    user = User.objects.filter(username=username).first()
    if user:
        user.set_password('Preethi')
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()
        print(f"\n✅ {username} user updated:")
        print(f"   Password set to: Preethi")
        print(f"   Is Staff: {user.is_staff}")
        print(f"   Is Superuser: {user.is_superuser}")
        print(f"   Is Active: {user.is_active}")

# If no admin user exists, try to update Rajkumar, otherwise show message
admin = User.objects.filter(username='admin').first()
rajkumar = User.objects.filter(username='Rajkumar').first()

if not admin and not rajkumar:
    print("\n⚠️  No admin or Rajkumar user found. Please create one manually.")
