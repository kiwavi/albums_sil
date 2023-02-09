from django.shortcuts import render
from authemail.views import Signup, UserMe
from .serializers import ExtendedSignupSerializer, ExtendedUserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from authemail.models import SignupCode, EmailChangeCode, PasswordResetCode
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext as _
from .models import MyUser
from authemail.models import send_multi_format_email

# Create your views here.

class SignupExtended(Signup):
    permission_classes = (AllowAny,)
    serializer_class = ExtendedSignupSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.data['email']
            password = serializer.data['password']
            first_name = serializer.data['first_name']
            last_name = serializer.data['last_name']
            username = serializer.data['username']
            
            must_validate_email = getattr(settings, "AUTH_EMAIL_VERIFICATION", True)

            # if get_user_model().objects.get(username=username):
            #     content = {'detail': _('Username already taken.')}
            #     return Response(content, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = get_user_model().objects.get(username=username)
                
                if user.username:
                    content = {'detail': _('Username already taken.')}
                    return Response(content, status=status.HTTP_400_BAD_REQUEST)                                    
                
                try:
                    # Delete old signup codes
                    signup_code = SignupCode.objects.get(user=user)
                    signup_code.delete()
                except SignupCode.DoesNotExist:
                    pass

            except get_user_model().DoesNotExist:
                pass
            
            try:
                user = get_user_model().objects.get(email=email)
                
                if user.is_verified:
                    content = {'detail': _('Email address already taken.')}
                    return Response(content, status=status.HTTP_400_BAD_REQUEST)                                    
                
                try:
                    # Delete old signup codes
                    signup_code = SignupCode.objects.get(user=user)
                    signup_code.delete()
                except SignupCode.DoesNotExist:
                    pass

            except get_user_model().DoesNotExist:
                user = get_user_model().objects.create_user(email=email,username=username)

            # Set user fields provided
            user.set_password(password)
            user.first_name = first_name
            user.last_name = last_name
            if not must_validate_email:
                user.is_verified = True
                send_multi_format_email('welcome_email',
                                        {'email': user.email, },
                                        target_email=user.email)
            user.save()

            if must_validate_email:
                # Create and associate signup code
                ipaddr = self.request.META.get('REMOTE_ADDR', '0.0.0.0')
                signup_code = SignupCode.objects.create_signup_code(user, ipaddr)
                signup_code.send_signup_email()

            content = {'email': email, 'first_name': first_name,
                       'last_name': last_name, 'username': username}
            return Response(content, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfile(UserMe):
    serializer_class = ExtendedUserSerializer
