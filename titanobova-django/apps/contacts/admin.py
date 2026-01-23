from django.contrib import admin
from .models import Contact, Newsletter

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['ip_address', 'created_at', 'updated_at']

@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['email', 'verified', 'subscribed_at']
    list_filter = ['verified', 'subscribed_at']
    search_fields = ['email']
