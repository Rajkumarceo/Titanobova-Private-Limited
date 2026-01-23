"""
Core application middleware for security and rate limiting
"""

from django.http import JsonResponse
from django.core.cache import cache
from django.utils.deprecation import MiddlewareMixin
import logging
import time

logger = logging.getLogger('django.security')

class RateLimitMiddleware(MiddlewareMixin):
    """
    Rate limiting middleware to prevent abuse
    Tracks requests per IP address
    """
    
    RATE_LIMIT = 100  # requests per minute per IP
    
    def process_request(self, request):
        # Get client IP
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        client_ip = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')
        
        # Create cache key
        cache_key = f'rate_limit_{client_ip}_{int(time.time() // 60)}'
        
        # Get request count
        request_count = cache.get(cache_key, 0)
        
        if request_count >= self.RATE_LIMIT:
            logger.warning(f'Rate limit exceeded for IP: {client_ip}')
            return JsonResponse({'detail': 'Rate limit exceeded'}, status=429)
        
        # Increment counter
        cache.set(cache_key, request_count + 1, 60)
        request.client_ip = client_ip
        
        return None


class SecurityHeadersMiddleware(MiddlewareMixin):
    """
    Add additional security headers to all responses
    """
    
    def process_response(self, request, response):
        # Prevent MIME type sniffing
        response['X-Content-Type-Options'] = 'nosniff'
        
        # Enable XSS protection
        response['X-XSS-Protection'] = '1; mode=block'
        
        # Referrer Policy
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        # Feature Policy / Permissions Policy
        response['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
        
        return response
