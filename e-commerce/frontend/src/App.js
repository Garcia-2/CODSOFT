import './App.css';
import './index.css';
import React, { useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './components/home';
import About from './components/About';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import NavBar from './components/NavBar';
import Register from './components/forms/Register';
import Login from './components/forms/Login';
import Logout from './components/forms/Logout';
import ProductDetail from './components/ProductDetail';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Add the product to the cartItems state
    setCartItems((prevItems) => [...prevItems, product]);
  };


  const myWidth = 210
  return (
    <div className="App">
      <NavBar 
          drawerWidth={myWidth}
          cartItems={cartItems}
          content = {

            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
                <Route path="/about" element={<About/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Routes>

          }
      
      />
      
    </div>
  );
}

export default App;
