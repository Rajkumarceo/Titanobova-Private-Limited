"""
Payments Serializers
"""

from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'currency', 'status', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']
