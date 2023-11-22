import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
// import ProductDetail from './ProductDetail';

const Home = () => {
  // State to store the products
  const [products, setProducts] = useState([]);

  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    // Function to fetch products and their category information
    const fetchProducts = async () => {
      try {
        // Fetch products with the "expand=category" query parameter
        const response = await axios.get('http://192.168.8.108:8000/api/products/?expand=category');

        // Use Promise.all to asynchronously fetch category information for each product
        const productsWithCategory = await Promise.all(
          response.data.map(async (product) => {
            // Check if the product has a category
            if (product.category) {
              // Fetch category details using the provided URL
              const categoryResponse = await axios.get(product.category);
              // Return the product with updated category information
              return { ...product, category: categoryResponse.data.name };
            }
            // If no category, return the product as-is
            return product;
          })
        );

        // Update the state with the products containing category information
        setProducts(productsWithCategory);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, []);

  // JSX to render the component
  return (
    <div>
      <h1>All Products</h1>
      {products.map((product) => (
        <div key={product.id} className="product-card poduct-card-default">
          <Link to={`/products/${product.id}`}>
            <div className="image-container">
              {product.image && <img src={product.image}
              alt={product.name}
              className="product-image" />}
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">Price: ${product.price}</p>
          </Link>
          {/* <ProductDetail productId={product.id}/> */}
        </div>
      ))}
    </div>
  );
};

export default Home;