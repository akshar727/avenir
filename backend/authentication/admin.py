from django.contrib import admin

# Register your models here.

from .models import CapsuleCollection, CapsuleMedia, User


admin.site.register(User)
admin.site.register(CapsuleMedia)
admin.site.register(CapsuleCollection)
