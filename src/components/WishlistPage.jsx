import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaTrash, FaShoppingCart, FaHeartBroken } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/WishlistPage.css"; // New CSS File

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `http://127.0.0.1:8000${imagePath}`;
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id); // Optional: Remove from wishlist after adding to cart
    alert("Moved to Cart!");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* 1. HERO BANNER */}
      <div className="wishlist-hero">
        <div className="overlay"></div>
        <div className="content">
          <h1>
            My <span className="highlight">Wishlist</span>
          </h1>
        </div>
      </div>

      <div className="wishlist-container">
        {wishlistItems.length === 0 ? (
          // 2. EMPTY STATE
          <div className="empty-wishlist">
            <FaHeartBroken className="empty-icon" />
            <h2>Your Wishlist is Empty</h2>
            <p>Looks like you haven't added any off-road gear yet.</p>
            <Link to="/products/thar" className="btn-explore">
              Explore Products
            </Link>
          </div>
        ) : (
          // 3. GRID LAYOUT
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="wishlist-card"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="card-img">
                  <img src={getImageUrl(item.image)} alt={item.title} />
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item.id);
                    }}
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="card-info">
                  <h3>{item.title}</h3>
                  <div className="price-row">
                    <span className="price">
                      Rs. {Number(item.price).toLocaleString()}
                    </span>
                  </div>

                  <button
                    className="move-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveToCart(item);
                    }}
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;
