"""
Contacts URLs
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, NewsletterViewSet

router = DefaultRouter()
router.register(r'contacts', ContactViewSet)
router.register(r'newsletter', NewsletterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
