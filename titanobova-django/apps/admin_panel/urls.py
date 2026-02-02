"""
Admin Panel URLs
"""

from django.urls import path
from .views import AdminDashboardView, AdminDashboardPageView

urlpatterns = [
    path('dashboard/', AdminDashboardView.as_view(), name='admin_dashboard_api'),
    path('', AdminDashboardPageView.as_view(), name='admin_dashboard'),
]
