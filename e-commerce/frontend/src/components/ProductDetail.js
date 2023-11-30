import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import "./Home.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const { addToCart } = useCart();

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

  const handleAddToCart = () => {
    addToCart(product);
    console.log('Product added to cart successfully');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div key={product.id} className="detail-card detail-card-default">
        <div className="detail-image-container">
          {product.image && <img src={product.image} alt={product.name} className="detail-image" />}
        </div>
        <div className="detail-items">
            <h2 className="detail-name">{product.name}</h2>
            <p className="detail-category">Category: {category}</p>
            <p className="detail-description">Description: {product.description}</p>
            <p className="detail-price">Price: ${product.price}</p>
            <p className="detail-stock">Stock: {product.stock}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;