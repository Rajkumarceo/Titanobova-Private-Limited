"""
Admin Panel Views
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.shortcuts import render
from django.contrib.auth.decorators import login_required, user_passes_test
from django.utils.decorators import method_decorator
from django.views import View
from django.http import JsonResponse

def is_admin(user):
    return user.is_staff and user.is_superuser

class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        """
        Get admin dashboard data via API
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

@method_decorator(login_required, name='dispatch')
@method_decorator(user_passes_test(is_admin), name='dispatch')
class AdminDashboardPageView(View):
    """
    Render the modern admin dashboard page
    """
    def get(self, request):
        from django.contrib.auth import get_user_model
        from apps.contacts.models import Contact
        from apps.courses.models import Enrollment
        from apps.payments.models import Payment
        
        User = get_user_model()
        
        context = {
            'user': request.user,
            'total_users': User.objects.count(),
            'total_contacts': Contact.objects.count(),
            'total_enrollments': Enrollment.objects.count(),
            'total_revenue': sum(p.amount for p in Payment.objects.filter(status='succeeded')),
            'pending_contacts': Contact.objects.filter(status='new').count(),
        }
        
        return render(request, 'admin/dashboard.html', context)
