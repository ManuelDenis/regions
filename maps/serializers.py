from rest_framework import serializers
from .models import LocationModel
from cities_light.management.commands import cities_light

from rest_framework import serializers
from .models import Phone


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = '__all__'


class RegionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = cities_light.Region
        fields = '__all__'


class SubRegionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = cities_light.SubRegion
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationModel
        fields = ['id', 'coordinates', 'area', 'price', 'type', 'destination', 'open', 'description', 'region', 'subregion', 'phone', 'terms']


class LocationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationModel
        fields = ['id', 'coordinates', 'area', 'price', 'type', 'destination', 'open', 'description', 'region', 'subregion', 'phone', 'terms']
