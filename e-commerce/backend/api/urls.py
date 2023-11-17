from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from .views import home

urlpatterns = [
    path('', home),
    path('category', include('api.category.urls')),
    path('products', include('api.products.urls')),
]