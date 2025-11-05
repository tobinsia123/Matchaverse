from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class MatchaSpot(models.Model):
    """Model representing a matcha spot in the area"""
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300)
    city = models.CharField(max_length=100, default='Irvine')
    state = models.CharField(max_length=50, default='CA')
    zip_code = models.CharField(max_length=10, blank=True)
    
    # Location coordinates (optional, for future map integration)
    latitude = models.DecimalField(
        max_digits=9, 
        decimal_places=6, 
        null=True, 
        blank=True,
        help_text="Latitude coordinate"
    )
    longitude = models.DecimalField(
        max_digits=9, 
        decimal_places=6, 
        null=True, 
        blank=True,
        help_text="Longitude coordinate"
    )
    
    # Rating and reviews
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
        null=True,
        blank=True,
        help_text="Rating out of 5.0"
    )
    review_count = models.IntegerField(default=0)
    
    # Description and details
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    
    # Hours (stored as text for simplicity, can be enhanced later)
    hours = models.CharField(max_length=200, blank=True, help_text="e.g., 'Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-10PM'")
    
    # Price range
    PRICE_CHOICES = [
        ('$', '$ - Inexpensive'),
        ('$$', '$$ - Moderate'),
        ('$$$', '$$$ - Expensive'),
        ('$$$$', '$$$$ - Very Expensive'),
    ]
    price_range = models.CharField(max_length=4, choices=PRICE_CHOICES, blank=True)
    
    # Image
    image = models.ImageField(upload_to='matcha_spots/', blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Featured flag
    is_featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-is_featured', '-rating', 'name']
        verbose_name = 'Matcha Spot'
        verbose_name_plural = 'Matcha Spots'
    
    def __str__(self):
        return self.name
    
    @property
    def full_address(self):
        """Returns the full address as a single string"""
        parts = [self.address, self.city, self.state]
        if self.zip_code:
            parts.append(self.zip_code)
        return ', '.join(parts)
