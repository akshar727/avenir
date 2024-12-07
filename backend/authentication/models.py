from django.db import models
# import abstractuser
from django.contrib.auth.models import AbstractUser, BaseUserManager
import uuid
# Create your models here.



class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not first_name:
            raise ValueError('Users must have a first name')
        if not last_name:
            raise ValueError('Users must have a last name')
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CapsuleMedia(models.Model):
    media = models.FileField(upload_to='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False,verbose_name="UUID")

    

class CapsuleCollection(models.Model):
    title = models.CharField(max_length=100)
    capsules = models.ManyToManyField(CapsuleMedia, blank=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False,verbose_name="UUID")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class User(AbstractUser):
    username = None
    objects = UserManager()
    email = models.EmailField(max_length=100, unique=True)
    collections = models.ManyToManyField(CapsuleCollection, blank=True)
    # add uuid
    USERNAME_FIELD = 'email'
    uuid = models.UUIDField(default=uuid.uuid4, editable=False,verbose_name="UUID")
    REQUIRED_FIELDS = ['first_name','last_name',]