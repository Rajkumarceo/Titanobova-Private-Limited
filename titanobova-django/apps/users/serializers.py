"""
Users Serializers
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    User serializer with password hashing
    """
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'phone_number',
            'user_type', 'profile_picture', 'bio', 'email_verified',
            'created_at', 'updated_at', 'totp_enabled'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'email_verified']


class LoginSerializer(serializers.Serializer):
    """
    Login serializer
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class RegistrationSerializer(serializers.ModelSerializer):
    """
    Registration serializer with password validation
    """
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'password_confirm', 'user_type']
    
    def validate(self, data):
        if data['password'] != data.pop('password_confirm'):
            raise serializers.ValidationError("Passwords don't match")
        return data
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
