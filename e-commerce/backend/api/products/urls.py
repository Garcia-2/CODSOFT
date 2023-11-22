from rest_framework import routers
from . import views
from django.urls import path, include
from .views import ProductDetail
from .views import ProductViewSet

router = routers.DefaultRouter()
router.register(r'', views.ProductViewSet, basename="product")

urlpatterns = [
    path('<int:pk>/add-to-cart/', ProductViewSet.add_to_cart, name='add-to-cart'),
    path('<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('', include(router.urls)),
]