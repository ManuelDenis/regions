from django.views.generic import TemplateView
from rest_framework import viewsets
from cities_light.management.commands import cities_light
from maps.models import LocationModel, Phone
from maps.serializers import LocationModelSerializer, RegionListSerializer, SubRegionListSerializer, PhoneSerializer
from rest_framework.response import Response


class Front(TemplateView):
    template_name = 'index.html'


class PhoneViewSet(viewsets.ModelViewSet):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer

    def perform_create(self, serializer):
        serializer.save()


class LocationViewSet(viewsets.ModelViewSet):
    queryset = LocationModel.objects.all()
    serializer_class = LocationModelSerializer


class LocationModelViewSet(viewsets.ModelViewSet):
    queryset = LocationModel.objects.all()
    serializer_class = LocationModelSerializer

    def perform_create(self, serializer):
        serializer.save()


class RegionListView(viewsets.ModelViewSet):
    queryset = cities_light.Region.objects.all()
    serializer_class = RegionListSerializer


class SubRegionListView(viewsets.ModelViewSet):
    serializer_class = SubRegionListSerializer
    queryset = cities_light.SubRegion.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        query_param = request.query_params.get('reg')
        if query_param:
            queryset = queryset.filter(region=query_param)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)