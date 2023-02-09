from django.urls import include, re_path, path
from rest_framework.routers import DefaultRouter
from . import views
from .views import AlbumViewSet, PhotoViewSet, UsersViewSet

router = DefaultRouter()
router.register("albums", AlbumViewSet, basename="albums")
router.register("photos", PhotoViewSet, basename="photos")
router.register("users", UsersViewSet, basename="users")


appalbums_urlpatterns = [
    re_path(r'^api/', include(router.urls)),
]
