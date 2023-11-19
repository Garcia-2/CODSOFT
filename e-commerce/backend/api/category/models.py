from django.db import models
from api.user.models import User
from django.contrib.auth import get_user_model

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    date_created = models.DateTimeField(auto_now_add=True)
    updated =models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name}"
