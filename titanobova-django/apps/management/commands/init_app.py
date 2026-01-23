"""
Django management commands for initialization
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.users.models import User

class Command(BaseCommand):
    help = 'Initialize the application with sample data'
    
    def handle(self, *args, **options):
        # Create superuser if doesn't exist
        if not User.objects.filter(email='admin@titanobova.com').exists():
            User.objects.create_superuser(
                email='admin@titanobova.com',
                username='admin',
                password='ChangeMe123!',
                first_name='Admin',
                last_name='User',
                user_type='admin'
            )
            self.stdout.write(self.style.SUCCESS('✓ Superuser created'))
        else:
            self.stdout.write('✓ Superuser already exists')
