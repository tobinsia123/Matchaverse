from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MatchaSpotViewSet

router = DefaultRouter()
router.register(r'spots', MatchaSpotViewSet, basename='matchaspot')

urlpatterns = [
    path('api/', include(router.urls)),
]

