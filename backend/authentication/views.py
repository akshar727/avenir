import datetime
import json
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer
from django.http import JsonResponse
from .serializers import *
from .SECRETS import *
from paypalpython.paypalpython import PaypalApi
from paypalpython.paypalpython.invoice import Invoice
import paypalpython
import jwt
from django.conf import settings

api = PaypalApi(client_id=PAYPAL_CLIENT_ID,client_secret=PAYPAL_CLIENT_SECRET,mode="sandbox")


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "https://super-funicular-677w567j5vpcrgr6-3000.app.github.dev/api/auth/callback/google"
    client_class = OAuth2Client

class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = "https://super-funicular-677w567j5vpcrgr6-3000.app.github.dev/api/auth/callback/github"
    client_class = OAuth2Client

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','first_name','last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

@csrf_exempt
@api_view(('POST',))
@renderer_classes([JSONRenderer])
def register(request):
    serializer = UserSerializer(data=json.loads(request.body))
    if serializer.is_valid():
        if User.objects.filter(email=serializer.validated_data['email']).exists():
            return Response({"error": "Email is already in use"}, status=400)
        serializer.save()
        # check if the email is already in use
        print(serializer.data)
        return Response(serializer.data, status=200)
    print(serializer.errors)
    return Response(serializer.errors, status=400)


class AccessSharedCollection(APIView):
    def get(self, request, uuid):
        token = request.GET.get('access_token')
        if not token:
            return Response({"error": "Access token is required"}, status=400)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            print(payload)
            if payload['uuid'] != str(uuid):
                return Response({"error": "Invalid token for this collection"}, status=403)
            collection = CapsuleCollection.objects.get(uuid=uuid)
            serializer = CollectionSerializerDeep(collection)
            return Response(serializer.data)
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=403)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=403)
        except CapsuleCollection.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response(status=500)

class GenerateShareableLink(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, uuid):
        try:
            collection = CapsuleCollection.objects.get(uuid=uuid)
            payload = {
                'uuid': str(collection.uuid),
                'exp': datetime.datetime.utcnow() + datetime.timedelta(weeks=1),
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            return Response({'uuid': str(collection.uuid), 'token': token})
        except CapsuleCollection.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response(status=500)
class CreateCollection(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            serializer = CollectionSerializerShallow(data=request.data)
            if serializer.is_valid():
                serializer.save()
                # create a new capsule collection
                collection = serializer.instance
                request.user.collections.add(collection)
                collection.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Exception as e:
            return Response(status=500)


def test(request):
    send_mail(
    'Subject here',
    'Here is the message.',
    'testacc2048@gmail.com',
    ['shashank4236@gmail.com'],
    )
    return JsonResponse({"message": "Email sent"})

class CapsuleView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, id):
        try:
            capsule = CapsuleCollection.objects.get(uuid=id)
            serializer = CollectionSerializerDeep(capsule)
            return Response(serializer.data)
        except CapsuleCollection.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response(status=500)
    def post(self, request):
        try:
            serializer = CollectionSerializerShallow(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Exception as e:
            return Response(status=500)
    def put(self, request, id):
        try:
            if 'media' in request.FILES:
                files = request.FILES.getlist('media')
                capsule = CapsuleCollection.objects.get(uuid=id)
                for file in files:
                    new = CapsuleMedia.objects.create(media=file)
                    capsule.capsules.add(new)
                capsule.save()
                serializer = CollectionSerializerDeep(capsule)
                return Response(serializer.data)
                
            else:
                return Response({"error": "No files provided"}, status=400)
        except CapsuleCollection.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            print(e)
            return Response(status=500)
    def delete(self, request, id):
        try:
            capsule = CapsuleCollection.objects.get(id=id)
            capsule.delete()
            return Response(status=204)
        except CapsuleCollection.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            return Response(status=500)