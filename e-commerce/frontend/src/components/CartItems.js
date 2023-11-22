import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartItems = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://192.168.8.108:8000/api/products/cart/');
                setCartItems(response.data.products);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div>
            <h2>Cart Items</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CartItems;