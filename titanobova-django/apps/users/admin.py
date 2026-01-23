from django.contrib import admin
from .models import User, LoginAttempt, AuditLog

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'get_full_name', 'user_type', 'email_verified', 'created_at']
    list_filter = ['user_type', 'email_verified', 'created_at']
    search_fields = ['email', 'first_name', 'last_name']
    readonly_fields = ['id', 'created_at', 'updated_at', 'last_password_change']

@admin.register(LoginAttempt)
class LoginAttemptAdmin(admin.ModelAdmin):
    list_display = ['user', 'ip_address', 'success', 'attempted_at']
    list_filter = ['success', 'attempted_at']
    readonly_fields = ['user', 'ip_address', 'user_agent', 'attempted_at']

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ['user', 'action', 'resource_type', 'created_at']
    list_filter = ['action', 'created_at']
    readonly_fields = ['user', 'action', 'created_at']
