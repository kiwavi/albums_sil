from django.contrib.auth import get_user_model
from rest_framework import serializers
from authemail.serializers import SignupSerializer, UserSerializer

class ExtendedSignupSerializer(SignupSerializer):
    """
    Extended signup serializer to include the username and make the first name a required field
    """
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128)
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30, default='',
                                      required=False)
    username = serializers.CharField(max_length=30)


class ExtendedUserSerializer(UserSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'first_name', 'last_name','username')
