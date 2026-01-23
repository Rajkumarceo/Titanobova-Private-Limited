"""
Contacts Serializers
"""

from rest_framework import serializers
from .models import Contact, Newsletter

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ['id', 'email', 'verified', 'subscribed_at']
        read_only_fields = ['id', 'subscribed_at']
