from django.db import models
from api.products.models import Product
from django.contrib.auth import get_user_model

User = get_user_model()

class Cart(models.Model):
    products = models.ManyToManyField(Product)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Cart for {self.user.username}"
