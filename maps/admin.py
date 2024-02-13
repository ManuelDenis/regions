from django.contrib import admin
from maps.models import Location, LocationModel, Phone


@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    list_display = ('phone', )


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('latitude', 'longitude')


@admin.register(LocationModel)
class LocationModelAdmin(admin.ModelAdmin):
    list_display = ('region', 'terms', 'subregion', 'coordinates', 'area', 'price', 'type')
