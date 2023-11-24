from rest_framework import routers
from . import views
from django.urls import path, include
from .views import ProductDetail, AddToCartView

router = routers.DefaultRouter()
router.register(r'', views.ProductViewSet, basename="product")

urlpatterns = [
    path('api/products/<int:pk>/add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('api/products/', views.ProductViewSet.as_view({'get': 'list'}), name='product-list'),
    path('api/products/<int:pk>/', views.ProductViewSet.as_view({'get': 'retrieve'}), name='product-detail'),
    # path('api/products/<int:pk>/add-to-cart/', views.ProductViewSet.as_view({'post': 'add_to_cart'}), name='add-to-cart'),
    path('', include(router.urls)),
]