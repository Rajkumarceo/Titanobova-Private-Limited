"""
Basic Authentication Middleware for Titanobova
Protects public access with username/password
"""

import base64
from django.contrib.auth import authenticate
from django.http import HttpResponse
from django.conf import settings


class BasicAuthMiddleware:
    """
    Middleware to require HTTP Basic Authentication for accessing the site
    when accessed through public tunnels (localtunnel, ngrok, etc.)
    """

    def __init__(self, get_response):
        self.get_response = get_response
        # Credentials from environment or defaults
        self.auth_username = getattr(settings, 'BASIC_AUTH_USERNAME', 'admin')
        self.auth_password = getattr(settings, 'BASIC_AUTH_PASSWORD', 'titanobova')
        # Paths that don't require auth
        self.exempt_paths = ['/admin/', '/api/v1/auth/', '/static/', '/media/']

    def __call__(self, request):
        # Skip auth for exempt paths
        if any(request.path.startswith(path) for path in self.exempt_paths):
            return self.get_response(request)

        # Check if Authorization header exists
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')

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
