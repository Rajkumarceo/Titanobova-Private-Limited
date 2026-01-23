from django.contrib import admin
from .models import Payment, Refund, Invoice

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__email', 'stripe_payment_intent_id']
    readonly_fields = ['stripe_payment_intent_id', 'created_at', 'updated_at']

@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ['payment', 'amount', 'status', 'created_at']
    list_filter = ['status', 'created_at']

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'payment', 'total', 'issued_at']
    list_filter = ['issued_at']
