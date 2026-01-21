import React, { createContext, useState, useEffect, useContext } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("orm_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orm_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      // Check if already exists to toggle
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id); // Remove if exists (Toggle)
      }
      return [...prev, product]; // Add if not exists
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
