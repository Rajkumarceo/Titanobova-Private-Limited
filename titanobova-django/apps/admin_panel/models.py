"""
Admin Panel App - Administrative functions
"""

from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class AdminNotification(models.Model):
    """
    Admin notifications and alerts
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(
        max_length=50,
        choices=[
            ('alert', 'Alert'),
            ('warning', 'Warning'),
            ('info', 'Info'),
            ('success', 'Success'),
        ]
    )
    
    is_read = models.BooleanField(default=False)
    action_url = models.URLField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class SystemLog(models.Model):
    """
    System-wide logging for security and debugging
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    log_type = models.CharField(max_length=50)
    level = models.CharField(
        max_length=20,
        choices=[
            ('debug', 'Debug'),
            ('info', 'Info'),
            ('warning', 'Warning'),
            ('error', 'Error'),
            ('critical', 'Critical'),
        ]
    )
    
    message = models.TextField()
    details = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['log_type', 'level', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.log_type} - {self.level}"
