import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.8.108:8000/api/products/${id}/?expand=category`);
        setProduct(response.data);

        // Fetch category details separately
        const categoryResponse = await axios.get(response.data.category);
        setCategory(categoryResponse.data.name);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div key={product.id} className="detail-card detail-card-default">
        <div className="detail-image-container">
          {product.image && <img src={product.image} alt={product.name} className="detail-image" />}
        </div>
        <h2 className="detail-name">{product.name}</h2>
        <p className="detail-category">Category: {category}</p>
        <p className="detail-description">Description: {product.description}</p>
        <p className="detail-price">Price: ${product.price}</p>
        <p className="detail-stock">Stock: {product.stock}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;