# from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, permissions
from .serializers import ProductSerializer
from .models import Product
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from api.cart.models import Cart
from api.cart.serializers import CartSerializer
from rest_framework.decorators import action
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializer

    @login_required
    @action(detail=True, methods=['post'])
    def add_to_cart(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        user = request.user 

        # Check if the user has a cart, create one if not
        cart, created = Cart.objects.get_or_create(user=user)

        # Add the product to the cart
        cart.products.add(product)

        # Serialize the updated cart and send it as a response
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=404)

    # def retrieve(self, request, pk=None):
    #     product = self.queryset.get(pk=pk)
    #     serializer = self.serializer_class(product, context={'request': request})
    #     return Response(serializer.data)

    def update(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=404)

    def destroy(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        product.delete()
        return Response(status=204)

class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer