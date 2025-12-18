import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/client";
import { 
  FaStar, FaHeart, FaSyncAlt, FaMinus, FaPlus, FaShoppingCart, 
  FaRegFileAlt, FaMoneyBillWave, FaRegCreditCard, FaShieldAlt
} from "react-icons/fa";
import "../styles/ProductDetailsPage.css";
import { useCart } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  // State Variables
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");
  const [images, setImages] = useState([]); // Stores all images (Main + Gallery)

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    const loadProductData = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      
      if (data) {
        setProduct(data);

        // 1. Process Main Image URL
        const mainImgUrl = data.image.startsWith("http") 
          ? data.image 
          : `http://127.0.0.1:8000${data.image}`;
        
        // Set initial active image
        setActiveImg(mainImgUrl);

        // 2. Process Gallery Images (if any)
        let galleryImages = [];
        if (data.images && data.images.length > 0) {
          galleryImages = data.images.map(imgObj => 
            imgObj.image.startsWith("http") 
              ? imgObj.image 
              : `http://127.0.0.1:8000${imgObj.image}`
          );
        }

        // 3. Combine Main Image + Gallery Images into one array
        // We use Set to remove duplicates if main image is also in gallery
        const uniqueImages = Array.from(new Set([mainImgUrl, ...galleryImages]));
        setImages(uniqueImages);
      }
      setLoading(false);
    };

    loadProductData();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      if (quantity > 1) setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  // 3. Create Handle Function
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${product.title} added to cart!`); // Simple feedback
    }
  };

  if (loading) return <div className="pdp-loading">Loading Product Details...</div>;
  if (!product) return <div className="pdp-loading">Product Not Found.</div>;

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="pdp-container">
        
        {/* --- LEFT: IMAGE GALLERY --- */}
        <div className="pdp-gallery">
          {/* Main Large Image */}
          <div className="main-image-frame">
            <img src={activeImg} alt={product.title} className="main-img" />
          </div>
          
          {/* Thumbnails List */}
          <div className="thumbnail-row">
            {images.map((imgUrl, idx) => (
              <div 
                key={idx} 
                className={`thumb-box ${activeImg === imgUrl ? "active" : ""}`} 
                onClick={() => setActiveImg(imgUrl)}
              >
                <img src={imgUrl} alt={`thumbnail-${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: PRODUCT INFO --- */}
        <div className="pdp-info">
          <h1 className="pdp-title">{product.title}</h1>
          
          <div className="pdp-price-block">
            <span className="pdp-price">Rs. {Number(product.price).toLocaleString()}.00</span>
            {product.old_price && (
              <>
                <span className="pdp-old-price">Rs. {Number(product.old_price).toLocaleString()}.00</span>
                <span className="pdp-discount">-5%</span>
              </>
            )}
            
            <div className="pdp-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color="#fbb03b" size={14} />
                ))}
              </div>
              <span className="review-count">(250+ Reviews)</span>
            </div>
          </div>

          <div className="pdp-divider"></div>

          <p className="pdp-desc">
            Enhance the stance and stability of your {product.category} with ORM high-grade accessories. 
            Crafted from high-strength alloy, ensuring durability, better road balance, and an aggressive off-road look.
            Designed for perfect fitment with no vibration.
          </p>

          {/* FEATURES GRID */}
          <div className="features-grid">
            <div className="feature-item">
              <div className="feat-icon"><FaRegFileAlt /></div>
              <span>15 Day Return Policy</span>
            </div>
            <div className="feature-item">
              <div className="feat-icon"><FaMoneyBillWave /></div>
              <span>Cash on Delivery Available</span>
            </div>
            <div className="feature-item">
              <div className="feat-icon"><FaRegCreditCard /></div>
              <span>EMI Option Available</span>
            </div>
            <div className="feature-item">
              <div className="feat-icon"><FaShieldAlt /></div>
              <span>1 Year Brand Warranty</span>
            </div>
          </div>

          {/* ACTIONS ROW */}
          <div className="pdp-actions">
            {/* Quantity Selector */}
            <div className="qty-selector">
              <button onClick={() => handleQuantity("dec")}><FaMinus /></button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity("inc")}><FaPlus /></button>
            </div>

            {/* 4. Connect Button */}
            <button className="btn-add-cart" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
            
            {/* Wishlist / Compare Icons */}
            <div className="icon-actions">
              <button className="circle-btn"><FaHeart /></button>
              <button className="circle-btn"><FaSyncAlt /></button>
            </div>
          </div>

          <button className="btn-buy-now" onClick={handleAddToCart}>Buy Now</button>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;