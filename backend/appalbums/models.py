from django.db import models
from django.contrib.auth import get_user_model
from accounts.models import MyUser
# Create your models here.

class Album(models.Model):
    album_title = models.CharField(max_length=30)
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)

    def __str__(self):
        return self.album_title


class Photos(models.Model):
    photo_title = models.CharField(max_length=30)
    album = models.ForeignKey(Album,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images')

    def __str__(self):
        return self.photo_title
