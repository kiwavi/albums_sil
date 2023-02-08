from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AlbumSerializer, PhotosSerializer
from rest_framework.permissions import AllowAny
from .models import Album, Photos
# Create your views here.

# I have extended the user model to include first name and username as a must and the endpoint is /api/accounts/register
# for the endpoint showing users, just create a serializer with the user model as the data and show name, username and email
# for the user details the new endpoint is /api/accounts/profile because it has the username details


class AlbumViewSet(viewsets.ModelViewSet):
    serializer_class = AlbumSerializer
    permission_classes = [AllowAny]
    queryset = Album.objects.all()


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotosSerializer
    permission_classes = [AllowAny]
    queryset = Photos.objects.all()
