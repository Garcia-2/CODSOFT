import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
  const { cartState, removeFromCart } = useCart();

  const handleRemoveItem = (itemId) => {
    // Asynchronously remove the item from the cart
    removeFromCart({ id: itemId }); // Assuming your items have an 'id' property
  };

  return (
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartState.cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;