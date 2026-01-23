"""
Admin Panel Views
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        """
        Get admin dashboard data
        """
        from django.contrib.auth import get_user_model
        from apps.contacts.models import Contact
        from apps.courses.models import Enrollment
        from apps.payments.models import Payment
        
        User = get_user_model()
        
        return Response({
            'total_users': User.objects.count(),
            'total_contacts': Contact.objects.count(),
            'total_enrollments': Enrollment.objects.count(),
            'total_revenue': sum(p.amount for p in Payment.objects.filter(status='succeeded')),
            'pending_contacts': Contact.objects.filter(status='new').count(),
        })
