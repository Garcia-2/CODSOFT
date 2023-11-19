from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

    def __str__(self) -> str:
        return f"Username:{self.username}. Email:{self.email}. User Id:{self.id}"