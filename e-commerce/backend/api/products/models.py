from django.db import models
from api.category.models import Category
from api.user.models import User
from django.contrib.auth import get_user_model

# Create your models here.
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.CharField(max_length=50)
    active = models.BooleanField(default=True, blank=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    # user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.name}"
