import React, { useState, useEffect } from "react";
import "../styles/ProductShowcase.css";
import { FaShoppingCart, FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { fetchProductsByCategory } from "../api/client";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Import your background image (using the same one from the Info section for consistency)
import bgImg from "/image/productbg.png";

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductsByCategory("Thar").then((data) => {
      setProducts(data.slice(0, 4));
      setLoading(false);
    });
  }, []);

  const handleCardClick = (product) => {
    navigate(`/product/${product.slug}`);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const safeRating = rating || 5;
    for (let i = 1; i <= 5; i++) {
      if (i <= safeRating) {
        stars.push(<FaStar key={i} className="star-icon filled" />);
      } else if (i === Math.ceil(safeRating) && !Number.isInteger(safeRating)) {
        stars.push(<FaStarHalfAlt key={i} className="star-icon filled" />);
      } else {
        stars.push(<FaStar key={i} className="star-icon empty" />);
      }
    }
    return stars;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  return (
    <section
      className="product-section"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Added overlay to ensure the cards and title are readable against the background */}
      <div className="product-overlay"></div>

      <div className="product-container">
        <h2 className="section-title">
          Must-Have Thar <span className="highlight">Wheel Upgrade</span>
        </h2>

        {loading ? (
          <div className="loading-spinner">Loading Showcase...</div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleCardClick(product)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-img-wrapper">
                  <img src={getImageUrl(product.image)} alt={product.title} />
                  {product.is_sale && <span className="sale-badge">Sale</span>}
                  <button
                    className="wishlist-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaHeart />
                  </button>
                </div>

                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <div className="price-rating-row">
                    <div className="price-box">
                      <span className="current-price">
                        Rs. {Number(product.price).toLocaleString()}
                      </span>
                      {product.old_price && (
                        <span className="old-price">
                          Rs. {Number(product.old_price).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="rating-box">
                      {renderStars(product.rating)}
                    </div>
                  </div>

                  <button
                    className="add-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <FaShoppingCart className="cart-icon" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
