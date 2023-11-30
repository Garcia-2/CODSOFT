import React, { useState, useCallback } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./Cart.css";

const Cart = () => {
  const { cartState, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState({}); // Maintain quantity for each item

  const handleRemoveItem = (itemId) => {
    // Asynchronously remove the item from the cart
    removeFromCart({ id: itemId }); 
  };

  const handleQuantityChange = (itemId, event) => {
    // Validate if it's a number before updating the state
    const newQuantity = event.target.value.trim();
    if (/^\d*$/.test(newQuantity)) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [itemId]: newQuantity,
      }));
    }
  };

  const calculateSubtotal = useCallback(() => {
    return cartState.cartItems.reduce((total, item) => {
      const itemTotal = quantities[item.id]
        ? quantities[item.id] * Number(item.price)
        : Number(item.price);
      return total + itemTotal;
    }, 0);
  }, [quantities, cartState.cartItems]);

  const calculateTax = useCallback(() => {
    return 0.05 * calculateSubtotal(); // Assuming 5% tax rate
  }, [calculateSubtotal]);

  const calculateTotalAmount = () => {
    return calculateSubtotal() + calculateTax() + 15;
  };

  return (
    <div className="wrapper">
      <h1>Cart</h1>
      <div className="project">
        <div className="shop">
          {cartState.cartItems.map((item) => (
            <div key={item.id} className="box">
              {item.image && 
                <img 
                  src={item.image}
                  alt={item.name}
                  className="product-cart-image cart-image" />
              }
              <div className="content">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">Total: ${item.price}</p>
                <div className="unit">
                  Quantity:{' '}
                  <input
                    className="quantity-container"
                    value={quantities[item.id] || ''}
                    onChange={(event) => handleQuantityChange(item.id, event)}
                  />
                </div>                               
                
              </div>
              <div className="btn-area">
                <i className="fa fa-trash"></i>
                <button className="btn2" onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>

            </div>
          ))}
        </div>

        <div className="right-bar">
          <p><span>Subtotal:</span> <span>${calculateSubtotal().toFixed(2)}</span></p>
          <hr/>
          <p><span>Tax (5%)</span> <span>${calculateTax().toFixed(2)}</span></p>
          <hr/>
          <p><span>Shipping</span> <span>$15</span></p>
          <hr/>
          <p><span>Total Price </span> <span>${calculateTotalAmount().toFixed(2)}</span></p>
          <Link to="/checkout" className="checkout-link"><i className="fa fa-shopping-cart"></i>Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;