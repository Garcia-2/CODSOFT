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
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework import status

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer

    @property
    def queryset(self):
        products = Product.objects.all().order_by('name')
        print("Product QuerySet:", products)
        return products

    # @method_decorator(csrf_exempt)
    # @login_required
    # @action(detail=True, methods=['post'])
    # def add_to_cart(self, request, pk=None):
    #     product = self.queryset.get(pk=pk)
    #     user = request.user 

    #     # Check if the user has a cart, create one if not
    #     cart, created = Cart.objects.get_or_create(user=user)

    #     # Check if the product is already in the cart
    #     if cart.products.filter(pk=product.pk).exists():
    #         return Response({'detail': 'Product already in cart.'}, status=400)

    #     # Add the product to the cart
    #     cart.products.add(product)

    #     # Serialize the updated cart and send it as a response
    #     serializer = CartSerializer(cart)
    #     return Response(serializer.data)

    def list(self, request):
        queryset = self.queryset
        serializer = ProductSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        serializer = ProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=404)

    def update(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = ProductSerializer(product, data=request.data, context={'request': request})
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

class AddToCartView(APIView):
    serializer_class = ProductSerializer
    
    def post(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            user = request.user 

            cart, created = Cart.objects.get_or_create(user=user)

            if cart.products.filter(pk=product.pk).exists():
                return Response({'detail': 'Product already in cart.'}, status=status.HTTP_400_BAD_REQUEST)

            cart.products.add(product)

            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'detail': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)