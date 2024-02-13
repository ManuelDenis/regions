"""
URL configuration for vreauteren project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from maps.views import LocationModelViewSet, LocationViewSet, RegionListView, SubRegionListView, PhoneViewSet

router = DefaultRouter()
router.register(r'add-phone', PhoneViewSet)
router.register(r'maps', LocationModelViewSet)
router.register(r'add-area', LocationModelViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'region-list', RegionListView, basename='region-list')
router.register(r'subregion-list', SubRegionListView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('maps/', include('maps.urls')),
]
