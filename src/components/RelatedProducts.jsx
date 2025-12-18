import React, { useState, useEffect } from "react";
import { fetchProductsByCategory } from "../api/client";
import { FaShoppingCart, FaHeart, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/RelatedProducts.css";

const RelatedProducts = ({ currentProduct }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (currentProduct) {
      // 1. Fetch all products of the same category
      fetchProductsByCategory(currentProduct.category).then((data) => {
        // 2. Filter out the current product so it doesn't show up again
        const related = data.filter((item) => item.id !== currentProduct.id);
        setProducts(related.slice(0, 4)); // Limit to 4 items for the section
      });
    }
  }, [currentProduct]);

  if (products.length === 0) return null;

  // Handlers
  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0); // Scroll to top when switching products
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart(item);
    alert(`${item.title} added to cart!`);
  };

  return (
    <section className="related-section">
      <div className="related-container">
        {/* Dynamic Title */}
        <h2 className="related-title">
          Must-Have {currentProduct.category} <span className="highlight">Upgrades</span>
        </h2>

        <div className="related-wrapper">
          {/* Left Arrow (Visual) */}
          <button className="nav-arrow left"><FaChevronLeft /></button>

          <div className="related-grid">
            {products.map((item) => (
              <div 
                key={item.id} 
                className="related-card"
                onClick={() => handleCardClick(item.id)}
              >
                {item.is_sale && <span className="tag sale">Sale</span>}

                <div className="card-img-box">
                  <img 
                    src={item.image.startsWith("http") ? item.image : `http://127.0.0.1:8000${item.image}`} 
                    alt={item.title} 
                  />
                  <button className="wishlist-btn"><FaHeart /></button>
                </div>

                <div className="card-info">
                  <h4 className="card-title">{item.title}</h4>
                  
                  <div className="card-price-row">
                    <span className="curr-price">Rs. {Number(item.price).toLocaleString()}</span>
                    {item.old_price && (
                      <span className="old-price">Rs. {Number(item.old_price).toLocaleString()}</span>
                    )}
                  </div>

                  <div className="card-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color="#fbb03b" size={12} />
                    ))}
                  </div>

                  <button 
                    className="add-btn"
                    onClick={(e) => handleAddToCart(e, item)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow (Visual) */}
          <button className="nav-arrow right"><FaChevronRight /></button>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;