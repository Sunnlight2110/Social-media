from django.db import models
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)
