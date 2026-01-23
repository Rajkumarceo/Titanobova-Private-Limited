"""
Payments Views with Stripe Integration
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

from .models import Payment
from .serializers import PaymentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['post'])
    def create_payment_intent(self, request):
        """
        Create a Stripe payment intent
        """
        amount = request.data.get('amount')
        description = request.data.get('description', '')
        
        if not amount:
            return Response({'detail': 'Amount required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(float(amount) * 100),
                currency='usd',
                metadata={'user_id': str(request.user.id)},
                description=description
            )
            
            # Create Payment record
            payment = Payment.objects.create(
                user=request.user,
                amount=amount,
                stripe_payment_intent_id=intent.id,
                description=description,
                status='pending'
            )
            
            return Response({
                'client_secret': intent.client_secret,
                'payment_id': str(payment.id)
            })
        
        except stripe.error.CardError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.RateLimitError:
            return Response({'detail': 'Rate limit exceeded'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
