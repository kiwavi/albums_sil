"""
Django settings for albumsproj project.

Generated by 'django-admin startproject' using Django 4.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
from decouple import config
from decouple import Config, RepositoryEnv



# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

DOTENV_FILE = os.path.join(BASE_DIR, '.env.prod')
env_config = Config(RepositoryEnv(DOTENV_FILE))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env_config.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env_config.get('DEBUG')

ALLOWED_HOSTS = ['yanarana.com','www.yanarana.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'appalbums',
    'rest_framework',
    'rest_framework.authtoken',
    'accounts',
    'authemail',
    'django_filters',
    "corsheaders",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'albumsproj.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'albumsproj.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'db',
        'PORT': 5432
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/django_static/'

STATIC_ROOT = BASE_DIR / 'django_static'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static/'),
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
	'rest_framework.authentication.TokenAuthentication',
    )
}


AUTH_USER_MODEL = 'accounts.MyUser'


EMAIL_FROM = env_config.get('EMAIL_FROM')
EMAIL_BCC = env_config.get('EMAIL_BCC')
EMAIL_HOST = env_config.get('EMAIL_HOST')
EMAIL_PORT = env_config.get('EMAIL_PORT')
EMAIL_HOST_USER = env_config.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env_config.get('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = env_config.get('EMAIL_USE_TLS')
EMAIL_USE_SSL = env_config.get('EMAIL_USE_SSL')
AUTH_EMAIL_VERIFICATION = env_config.get('AUTH_EMAIL_VERIFICATION')

MEDIA_URL = env_config.get('MEDIA_URL')
MEDIA_ROOT = env_config.get('MEDIA_ROOT')


CORS_ALLOWED_ORIGINS = [
    'https://www.yanarana.com',
    'https://yanarana.com',
]


CORS_ORIGIN_WHITELIST = (
    'https://www.yanarana.com',
    'https://yanarana.com',
    'http://localhost:8000',
)

CSRF_TRUSTED_ORIGINS = ['https://www.yanarana.com', 'https://yanarana.com']
