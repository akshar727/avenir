from django.conf import settings
from .models import *
from rest_framework import serializers



class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapsuleMedia
        fields = '__all__'


class CollectionSerializerShallow(serializers.ModelSerializer):
    class Meta:
        model = CapsuleCollection
        # fields = '__all__'
        exclude = ['capsules']

class CollectionSerializerDeep(serializers.ModelSerializer):
    capsules = MediaSerializer(many=True)
    class Meta:
        model = CapsuleCollection
        fields = '__all__'


class UserDetailsSerializer(serializers.ModelSerializer):
    collections = CollectionSerializerShallow(many=True)
    """
    User model w/o password
    """

    @staticmethod
    def validate_username(username):
        if 'allauth.account' not in settings.INSTALLED_APPS:
            # We don't need to call the all-auth
            # username validator unless its installed
            return username

        from allauth.account.adapter import get_adapter
        username = get_adapter().clean_username(username)
        return username

    class Meta:
        model = User
        fields = ('pk', 'email', 'first_name', 'last_name', 'collections')
        read_only_fields = ('email',)