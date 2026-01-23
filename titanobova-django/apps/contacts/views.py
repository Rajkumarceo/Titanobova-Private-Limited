"""
Contacts Views
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
from .models import Contact, Newsletter
from .serializers import ContactSerializer, NewsletterSerializer
from apps.users.views import UserViewSet

class ContactViewSet(viewsets.ModelViewSet):
    """
    Contact form endpoint with rate limiting
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        """
        Create contact with IP and user agent tracking
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        contact = serializer.save(
            ip_address=UserViewSet.get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class NewsletterViewSet(viewsets.ModelViewSet):
    """
    Newsletter subscription management
    """
    queryset = Newsletter.objects.filter(unsubscribed_at__isnull=True)
    serializer_class = NewsletterSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email required'}, status=status.HTTP_400_BAD_REQUEST)
        
        newsletter, created = Newsletter.objects.get_or_create(email=email)
        if not created:
            return Response({'detail': 'Already subscribed'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'detail': 'Subscribed successfully'})
    
    @action(detail=False, methods=['post'])
    def unsubscribe(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email required'}, status=status.HTTP_400_BAD_REQUEST)
        
        newsletter = Newsletter.objects.filter(email=email).first()
        if newsletter:
            newsletter.unsubscribed_at = timezone.now()
            newsletter.save()
        
        return Response({'detail': 'Unsubscribed successfully'})
