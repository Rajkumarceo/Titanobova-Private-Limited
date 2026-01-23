"""
Core Django and Celery initialization
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'titanobova_project.settings')

# Initialize Django
django_application = get_wsgi_application()

# Initialize Celery
from titanobova_project.celery import app as celery_app

__all__ = ('celery_app',)
