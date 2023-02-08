from rest_framework import serializers
from .models import Photos, Album

class AlbumSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model = Album
        fields = (
            "id",
            "album_title",
            "user",
        )

class PhotosSerializer(serializers.ModelSerializer):
    # in order for stringrelatedfield to work there must be str definition on the model
    album = serializers.StringRelatedField()
    class Meta:
        model = Photos
        fields = (
            "id",
            "album",
            "photo_title",
            "image",
        )
