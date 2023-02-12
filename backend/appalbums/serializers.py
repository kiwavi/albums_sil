from rest_framework import serializers
from .models import Photos, Album
from accounts.models import MyUser

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = (
            "id",
            "album_title",
            "user",
        )


class PhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = (
            "id",
            "album",
            "photo_title",
            "image",
        )


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = (
            'id',
            'email',
            'username',
        )

