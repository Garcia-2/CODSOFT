import React from 'react';

const CartCount = ({ cartItems }) => {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <span style={{ marginLeft: '5px' }}>
      {itemCount > 0 && <span>({itemCount})</span>}
    </span>
  );
};

export default CartCount;