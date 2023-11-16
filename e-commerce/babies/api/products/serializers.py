from .models import Product
from rest_framework import serializers

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=False, use_url=True, required=False)
    class Meta:
        model = Product
        fields = (
            "id","name", "description", "price", "stock",
            "stock", "image", "category"
        )
        # fields = '__all__'