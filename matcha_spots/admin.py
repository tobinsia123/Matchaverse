from django.contrib import admin
from .models import MatchaSpot


@admin.register(MatchaSpot)
class MatchaSpotAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'rating', 'price_range', 'is_featured', 'created_at')
    list_filter = ('is_featured', 'price_range', 'city', 'rating')
    search_fields = ('name', 'address', 'city', 'description')
    list_editable = ('is_featured',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'is_featured')
        }),
        ('Location', {
            'fields': ('address', 'city', 'state', 'zip_code', 'latitude', 'longitude')
        }),
        ('Contact & Details', {
            'fields': ('phone', 'website', 'hours', 'price_range')
        }),
        ('Ratings', {
            'fields': ('rating', 'review_count')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
