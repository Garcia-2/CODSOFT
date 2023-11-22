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
        const productData = response.data;

        if (productData.category) {
          const categoryResponse = await axios.get(productData.category);
          productData.category = categoryResponse.data.name;
        }

        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      // Send a POST request to add the product to the cart
      await axios.post(`http://192.168.8.108:8000/api/products/${id}/add-to-cart/`);
      
      // Notify the parent component (App.js) about the added product
      addToCart(product);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
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
        <h2 className="detail-name">{product.name}</h2>
        {product.category ? (
          <p className="detail-category">Category: {product.category}</p>
        ) : (
          <p className="no-category">No category assigned</p>
        )}
        <p className="detail-description">Description: {product.description}</p>
        <p className="detail-price">Price: ${product.price}</p>
        <p className="detail-stock">Stock: {product.stock}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;