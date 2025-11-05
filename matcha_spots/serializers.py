from rest_framework import serializers
from .models import MatchaSpot


class MatchaSpotSerializer(serializers.ModelSerializer):
    """Serializer for MatchaSpot model"""
    full_address = serializers.CharField(read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = MatchaSpot
        fields = [
            'id',
            'name',
            'address',
            'city',
            'state',
            'zip_code',
            'full_address',
            'latitude',
            'longitude',
            'rating',
            'review_count',
            'description',
            'phone',
            'website',
            'hours',
            'price_range',
            'image',
            'image_url',
            'is_featured',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ('created_at', 'updated_at')
    
    def get_image_url(self, obj):
        """Returns the full URL for the image if it exists"""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

