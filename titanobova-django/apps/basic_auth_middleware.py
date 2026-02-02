"""
Basic Authentication Middleware for Titanobova
Protects public access with username/password when accessed through public tunnels
Only protects admin and sensitive API endpoints
"""

import base64
from django.contrib.auth import authenticate
from django.http import HttpResponse
from django.conf import settings


class BasicAuthMiddleware:
    """
    Middleware to require HTTP Basic Authentication for admin and sensitive endpoints
    Public endpoints (frontend, contact form, courses, etc.) are always accessible
    Only requires auth when accessed through tunnels or external access
    """

    def __init__(self, get_response):
        self.get_response = get_response
        # Credentials from environment or defaults
        self.auth_username = getattr(settings, 'BASIC_AUTH_USERNAME', 'admin')
        self.auth_password = getattr(settings, 'BASIC_AUTH_PASSWORD', 'titanobova')
        
        # Paths that DON'T require auth (public access)
        self.exempt_paths = [
            '/admin/',  # Will be handled by Django's own auth
            '/api/v1/auth/',  # Login endpoint
            '/api/v1/contacts/',  # Contact form
            '/api/v1/courses/',  # Course listing (public)
            '/api/v1/newsletter/',  # Newsletter signup
            '/static/',  # Static files
            '/media/',  # Media files
            '/',  # Root/homepage
            '/api/v1/health/',  # Health check if exists
        ]
        
        # Paths that REQUIRE auth (protected)
        self.protected_paths = [
            '/api/v1/users/',  # User endpoints
            '/api/v1/admin/',  # Admin endpoints
            '/api/v1/payments/',  # Payment endpoints
            '/api/v1/enrollments/',  # Enrollment endpoints
        ]

    def __call__(self, request):
        # Allow exempt paths without auth
        if any(request.path.startswith(path) for path in self.exempt_paths):
            return self.get_response(request)
        
        # Check if this is a protected path
        is_protected = any(request.path.startswith(path) for path in self.protected_paths)
        
        if not is_protected:
            # Not a protected path and not in exempt list - allow it
            return self.get_response(request)

        # Protected path - require authentication
        if auth_header.startswith('Basic '):
            try:
                # Decode the base64 encoded credentials
                encoded_credentials = auth_header[6:]
                decoded_credentials = base64.b64decode(encoded_credentials).decode('utf-8')
                username, password = decoded_credentials.split(':', 1)

                # Check credentials
                if username == self.auth_username and password == self.auth_password:
                    return self.get_response(request)
            except (ValueError, TypeError):
                pass

        # Authentication failed or not provided
        # Return 401 Unauthorized with Basic Auth challenge
        response = HttpResponse('Unauthorized', status=401)
        response['WWW-Authenticate'] = 'Basic realm="Titanobova Site Access"'
        return response
