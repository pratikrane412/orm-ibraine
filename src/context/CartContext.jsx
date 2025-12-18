import React, { createContext, useState, useEffect, useContext } from "react";

// Create Context
const CartContext = createContext();

// Custom Hook to use the Cart
export const useCart = () => useContext(CartContext);

// Provider Component
export const CartProvider = ({ children }) => {
  // Load cart from LocalStorage on start
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("orm_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("orm_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Item Function
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item already exists
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If exists, just increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If new, add to array
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Get Total Count of items
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};