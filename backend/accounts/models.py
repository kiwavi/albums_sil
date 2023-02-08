from django.db import models

# Create your models here.

from django.db import models
from authemail.models import EmailUserManager, EmailAbstractUser
from django.utils import timezone

class MyManager(EmailUserManager):
    def _create_user(self, email, username, password, is_staff, is_superuser,
                     is_verified, **extra_fields):
        """
            Creates and saves a User with a given email and password.
            """
        now = timezone.now()
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email,
                          username=username,
                          is_staff=is_staff, is_active=True,
                          is_superuser=is_superuser, is_verified=is_verified,
                          last_login=now, date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, username, password=None, **extra_fields):
        return self._create_user(email, username, password, False, False, False,
                                 **extra_fields)

    def create_superuser(self, email, username, password, **extra_fields):
        return self._create_user(email, username, password, True, True, True,
                                 **extra_fields)


class MyUser(EmailAbstractUser):
    # Custom fields
    date_of_birth = models.DateField('Date of birth', null=True, blank=True)
    username = models.CharField(max_length=30, unique=True)
    # Required
    objects = MyManager()
    
