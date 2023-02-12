from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AlbumSerializer, PhotosSerializer, UsersSerializer
from rest_framework.permissions import AllowAny
from .models import Album, Photos
from accounts.models import MyUser
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters

# Create your views here.

# for the endpoint showing users, just create a serializer with the user model as the data and show name, username and email

# Landing/index, login, home (users and number of albums they have), user (detailed list of the albums a user has), album detail (album information and photos), photo detail (the photo and a requirement to change the title).

class AlbumViewSet(viewsets.ModelViewSet):
    # displays all albums
    serializer_class = AlbumSerializer
    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['user__username']
    queryset = Album.objects.all()


class PhotoViewSet(viewsets.ModelViewSet):
    # displays all photos
    serializer_class = PhotosSerializer
    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['album__album_title']
    queryset = Photos.objects.all()


class UsersViewSet(viewsets.ModelViewSet):
    # displays all users
    serializer_class = UsersSerializer
    permission_classes = [AllowAny]
    queryset = MyUser.objects.all()
