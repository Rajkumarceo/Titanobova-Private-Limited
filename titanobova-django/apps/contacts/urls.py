"""
Contacts URLs
"""

from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ContactViewSet, NewsletterViewSet

router = SimpleRouter(trailing_slash=True)
router.register(r'', ContactViewSet, basename='contact')
router.register(r'newsletter', NewsletterViewSet, basename='newsletter')
urlpatterns = [
    path('', include(router.urls)),
]