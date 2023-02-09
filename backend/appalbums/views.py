from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AlbumSerializer, PhotosSerializer
from rest_framework.permissions import AllowAny
from .models import Album, Photos
# Create your views here.

# for the endpoint showing users, just create a serializer with the user model as the data and show name, username and email

# Landing/index, login, home (users and number of albums they have), user (detailed list of the albums a user has), album detail (album information and photos), photo detail (the photo and a requirement to change the title).

class AlbumViewSet(viewsets.ModelViewSet):
    serializer_class = AlbumSerializer
    permission_classes = [AllowAny]
    queryset = Album.objects.all()

class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotosSerializer
    permission_classes = [AllowAny]
    queryset = Photos.objects.all()
