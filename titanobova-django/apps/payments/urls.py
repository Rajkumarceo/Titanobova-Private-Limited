"""
Payments URLs
"""

from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import PaymentViewSet

router = SimpleRouter(trailing_slash=True)
router.register(r'', PaymentViewSet, basename='payment')

urlpatterns = [
    path('', include(router.urls)),
]
