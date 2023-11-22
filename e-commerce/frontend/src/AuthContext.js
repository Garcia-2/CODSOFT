import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  // Check for stored authentication token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      setAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    // Your login logic here (e.g., check credentials and set authentication state)
    setAuthToken(token);
    setAuthenticated(true);
    // Store the authentication token in localStorage
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    // Your logout logic here (e.g., clear credentials and set authentication state)
    setAuthToken(null);
    setAuthenticated(false);
    // Remove the authentication token from localStorage
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authenticated, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};