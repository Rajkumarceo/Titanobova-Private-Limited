"""
URL Configuration for Titanobova Project
"""

from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from apps.frontend.views import IndexView, PageView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API
    path('api/v1/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('api/v1/users/', include('apps.users.urls')),
    path('api/v1/contacts/', include('apps.contacts.urls')),
    path('api/v1/courses/', include('apps.courses.urls')),
    path('api/v1/payments/', include('apps.payments.urls')),
    path('api/v1/admin/', include('apps.admin_panel.urls')),
    
    # Frontend - Root
    path('', IndexView.as_view(), name='index'),
    
    # Catch-all for React Router (must be last)
    re_path(r'^.*$', IndexView.as_view(), name='react_fallback'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
