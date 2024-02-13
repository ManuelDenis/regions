from django.urls import path
from maps.views import Front

urlpatterns = [
    path("loc/", Front.as_view(), name='loc'),
    path("maps/", Front.as_view(), name='maps'),
    path("Maps/", Front.as_view()),
    path("AddArea/", Front.as_view()),
    path("GDPR/", Front.as_view()),
]