from django.db import models

TYPE = (("INTRAVILAN", "INTRAVILAN"),
        ("EXTRAVILAN", "EXTRAVILAN"))
DESTINATION = (("CONSTRUCTII", "CONSTRUCTII"),
               ("ARABIL", "ARABIL"),
               ("FORESTIER", "FORESTIER"))


class Phone(models.Model):
    phone = models.CharField(max_length=10)

    def __str__(self):
        return self.phone


class Location(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()


class LocationModel(models.Model):
    phone = models.CharField(max_length=10, null=True, blank=True)
    coordinates = models.JSONField(default=list, null=True, blank=True)
    area = models.IntegerField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    type = models.CharField(max_length=10, choices=TYPE, default="INTRAVILAN")
    destination = models.CharField(max_length=15, choices=DESTINATION, default="CONSTRUCTII")
    open = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    region = models.ForeignKey('cities_light.Region', on_delete=models.SET_NULL, null=True, blank=True)
    subregion = models.ForeignKey('cities_light.SubRegion', on_delete=models.SET_NULL, null=True, blank=True)
    terms = models.BooleanField(default=False)
