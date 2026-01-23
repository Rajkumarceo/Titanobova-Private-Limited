"""
Users App Views - Authentication and User Management
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.utils import timezone
from django.http import JsonResponse
import logging

from .models import User, LoginAttempt, AuditLog
from .serializers import UserSerializer, LoginSerializer

logger = logging.getLogger('apps')

class UserViewSet(viewsets.ModelViewSet):
    """
    User management endpoints with security
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        """
        User login with 2FA support
        """
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        
        if user is None:
            # Log failed attempt
            client_ip = self.get_client_ip(request)
            LoginAttempt.objects.create(
                user=None,
                ip_address=client_ip,
                user_agent=request.META.get('HTTP_USER_AGENT', ''),
                success=False
            )
            return Response(
                {'detail': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Check if account is locked
        if user.account_locked_until and user.account_locked_until > timezone.now():
            return Response(
                {'detail': 'Account is temporarily locked'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Reset failed login attempts
        user.failed_login_attempts = 0
        user.last_login_ip = self.get_client_ip(request)
        user.save()
        
        # Log successful attempt
        LoginAttempt.objects.create(
            user=user,
            ip_address=self.get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', ''),
            success=True
        )
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        # Log audit trail
        self.log_audit(user, 'login', request)
        
        # Check if 2FA is enabled
        if user.totp_enabled:
            return Response({
                'detail': '2FA required',
                'requires_2fa': True,
                'temporary_token': str(refresh.access_token)
            })
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        """
        User logout
        """
        self.log_audit(request.user, 'logout', request)
        return Response({'detail': 'Logged out successfully'})
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def profile(self, request):
        """
        Get current user profile
        """
        return Response(UserSerializer(request.user).data)
    
    @action(detail=False, methods=['put'], permission_classes=[IsAuthenticated])
    def update_profile(self, request):
        """
        Update user profile
        """
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            self.log_audit(request.user, 'update', request, 'profile')
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def enable_2fa(self, request):
        """
        Enable 2FA for user
        """
        user = request.user
        secret = user.setup_totp()
        
        # Generate QR code
        uri = user.get_totp_uri()
        qr = QRCode(version=1, box_size=10, border=5)
        qr.add_data(uri)
        qr.make(fit=True)
        
        # Generate backup codes
        backup_codes = user.generate_backup_codes()
        
        return Response({
            'secret': secret,
            'qr_code_url': uri,
            'backup_codes': backup_codes,
            'message': 'Scan QR code with authenticator app. Save backup codes in safe place.'
        })
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def confirm_2fa(self, request):
        """
        Confirm 2FA setup with token
        """
        user = request.user
        token = request.data.get('token')
        
        if not token:
            return Response({'detail': 'Token required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.verify_totp(token):
            user.totp_enabled = True
            user.save()
            self.log_audit(user, 'update', request, 'enable_2fa')
            return Response({'detail': '2FA enabled successfully'})
        
        return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def verify_2fa(self, request):
        """
        Verify 2FA token during login
        """
        token = request.data.get('token')
        if not token:
            return Response({'detail': 'Token required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user
        if user.verify_totp(token):
            return Response({'detail': '2FA verified'})
        
        # Check backup code
        if user.use_backup_code(token):
            return Response({'detail': '2FA verified with backup code'})
        
        return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
    
    @staticmethod
    def get_client_ip(request):
        """Extract client IP from request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        return x_forwarded_for.split(',')[0].strip() if x_forwarded_for else request.META.get('REMOTE_ADDR')
    
    @staticmethod
    def log_audit(user, action, request, resource_type='user', resource_id=None, details=None):
        """Log audit trail"""
        AuditLog.objects.create(
            user=user,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id or str(user.id),
            ip_address=UserViewSet.get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', ''),
            details=details or {}
        )
