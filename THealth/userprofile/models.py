from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin

from django.conf import settings
from datetime import date

from django.db.models import Model


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        """Создаем и возвращаем пользователя с email и паролем"""
        if not email:
            raise ValueError('Пользователь должен иметь email')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """Создаем и возвращаем суперпользователя с email и паролем"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)

    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'  # поле для аутентификации
    REQUIRED_FIELDS = ['email']  # другие поля, которые необходимо указать при создании

    def __str__(self):
        return self.username

