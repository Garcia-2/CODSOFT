from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

    def __str__(self) -> str:
        return f"Username:{self.username}. Email:{self.email}. User Id:{self.id}"

    class Meta:
        swappable = 'AUTH_USER_MODEL'

User._meta.get_field('groups').remote_field.related_name = 'api_user_groups'
User._meta.get_field('user_permissions').remote_field.related_name = 'api_user_permissions'