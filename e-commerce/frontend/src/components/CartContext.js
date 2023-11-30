import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
      };
    case 'SET_CART':
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [] });

 
  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    console.log('useEffect running...');
    console.log('Loading cart data...');
    const savedCart = localStorage.getItem('cart') || sessionStorage.getItem('cart');
    console.log('Saved cart data:', savedCart);
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart data to both localStorage and sessionStorage whenever the cart state changes
  useEffect(() => {
    const cartData = JSON.stringify(cartState.cartItems);
    localStorage.setItem('cart', cartData);
    sessionStorage.setItem('cart', cartData);
  }, [cartState]);

  const addToCart = useCallback((product) => {
    console.log('Adding to cart:', product);  
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, [dispatch]);

  const removeFromCart = useCallback((product) => {
    console.log('Removing from cart:', product);
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  }, [dispatch]);

  console.log('Current cart state:', cartState);

  return (
    <CartContext.Provider value={{ cartState, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};