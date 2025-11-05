from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import MatchaSpot
from .serializers import MatchaSpotSerializer


class MatchaSpotViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing MatchaSpot instances.
    Provides list, create, retrieve, update, and destroy actions.
    """
    queryset = MatchaSpot.objects.all()
    serializer_class = MatchaSpotSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'price_range', 'is_featured']
    search_fields = ['name', 'address', 'description']
    ordering_fields = ['rating', 'name', 'created_at']
    ordering = ['-is_featured', '-rating', 'name']
    
    def get_serializer_context(self):
        """Add request to serializer context for image URL generation"""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Returns only featured matcha spots"""
        featured_spots = self.queryset.filter(is_featured=True)
        serializer = self.get_serializer(featured_spots, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def top_rated(self, request):
        """Returns top-rated matcha spots (rating >= 4.0)"""
        top_spots = self.queryset.filter(rating__gte=4.0).order_by('-rating')
        serializer = self.get_serializer(top_spots, many=True)
        return Response(serializer.data)
