#!/usr/bin/env python
import os
import django
from django.contrib.auth.hashers import make_password

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'titanobova_project.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Update existing admin user or create new one
admin_user, created = User.objects.get_or_create(
    email='admin@titanobova.com',
    defaults={'username': 'Rajkumar', 'is_staff': True, 'is_superuser': True}
)

if not created:
    admin_user.username = 'Rajkumar'
    admin_user.is_staff = True
    admin_user.is_superuser = True

# Use make_password with PBKDF2 as fallback
admin_user.password = make_password('Titanobova', hasher='pbkdf2_sha256')
admin_user.save()

print("✓ Admin user configured:")
print(f"  Username: {admin_user.username}")
print(f"  Email: {admin_user.email}")
print(f"  Is Staff: {admin_user.is_staff}")
print(f"  Is Superuser: {admin_user.is_superuser}")
print("\n✓ Admin can now add other users as admins from the admin panel")
print("\nAdmin Panel: http://localhost:8000/admin/")
