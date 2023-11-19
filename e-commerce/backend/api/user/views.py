from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

# Create your views here.
class RegistrationAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data['password'])
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    User = get_user_model()
    queryset = User.objects.none()

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password =request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutAPIView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)