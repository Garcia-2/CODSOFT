from django.db import models
from api.user.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    date_created = models.DateTimeField(auto_now_add=True)
    updated =models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.name}"
