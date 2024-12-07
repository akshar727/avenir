from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView

from authentication.views import GoogleLogin, CapsuleView, GithubLogin, CreateCollection

urlpatterns = [
    path("register/", RegisterView.as_view(), name="rest_register"),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("capsules/<uuid:id>", CapsuleView.as_view(), name="capsule"),
    path("collections/", CreateCollection.as_view(), name="collection"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("user/", UserDetailsView.as_view(), name="rest_user_details"),
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path("github/", GithubLogin.as_view(), name="github_login"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
]
