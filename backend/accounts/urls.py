from django.urls import include, re_path
from . import views
from .views import SignupExtended, UserProfile

accounts_urlpatterns = [
    re_path(r'^api/accounts/', include('authemail.urls')),
    re_path(r'^api/accounts/register', views.SignupExtended.as_view(), name='register'),
    re_path(r'^api/accounts/profile', views.UserProfile.as_view(), name='profile'),
]
