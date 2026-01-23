"""
Users App - User management with enhanced security
"""

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password
import uuid
import pyotp
from qrcode import QRCode

class User(AbstractUser):
    """
    Custom user model with enhanced security features
    """
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, db_index=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    
    # Two-Factor Authentication
    totp_enabled = models.BooleanField(default=False)
    totp_secret = models.CharField(max_length=32, blank=True, null=True)
    backup_codes = models.JSONField(default=list, blank=True)
    
    # Account Security
    last_login_ip = models.GenericIPAddressField(null=True, blank=True)
    failed_login_attempts = models.IntegerField(default=0)
    account_locked_until = models.DateTimeField(null=True, blank=True)
    
    # User Profile
    user_type = models.CharField(
        max_length=20,
        choices=[
            ('student', 'Student'),
            ('instructor', 'Instructor'),
            ('founder', 'Founder'),
            ('admin', 'Administrator'),
        ],
        default='student'
    )
    
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(blank=True, null=True)
    
    # Verification
    email_verified = models.BooleanField(default=False)
    email_verification_token = models.CharField(max_length=255, blank=True, null=True)
    
    # Activity Tracking
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_password_change = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['user_type']),
            models.Index(fields=['email_verified']),
        ]
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"
    
    def setup_totp(self):
        """Generate TOTP secret for 2FA"""
        self.totp_secret = pyotp.random_base32()
        return self.totp_secret
    
    def get_totp_uri(self):
        """Get provisioning URI for authenticator apps"""
        if not self.totp_secret:
            self.setup_totp()
        
        totp = pyotp.TOTP(self.totp_secret)
        return totp.provisioning_uri(
            name=self.email,
            issuer_name='Titanobova'
        )
    
    def verify_totp(self, token):
        """Verify TOTP token"""
        if not self.totp_enabled or not self.totp_secret:
            return False
        
        totp = pyotp.TOTP(self.totp_secret)
        return totp.verify(token, valid_window=1)
    
    def generate_backup_codes(self):
        """Generate backup codes for account recovery"""
        import secrets
        codes = [secrets.token_hex(4) for _ in range(10)]
        self.backup_codes = codes
        return codes
    
    def use_backup_code(self, code):
        """Use a backup code (one-time use)"""
        if code in self.backup_codes:
            self.backup_codes.remove(code)
            self.save()
            return True
        return False


class LoginAttempt(models.Model):
    """
    Track login attempts for security
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='login_attempts')
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    success = models.BooleanField(default=False)
    attempted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-attempted_at']
        indexes = [
            models.Index(fields=['user', 'attempted_at']),
            models.Index(fields=['ip_address', 'attempted_at']),
        ]


class AuditLog(models.Model):
    """
    Audit trail for all user actions
    """
    ACTION_CHOICES = [
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('create', 'Create'),
        ('update', 'Update'),
        ('delete', 'Delete'),
        ('download', 'Download'),
        ('upload', 'Upload'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='audit_logs')
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    resource_type = models.CharField(max_length=100)
    resource_id = models.CharField(max_length=255, blank=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    details = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['action', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.action} - {self.created_at}"
