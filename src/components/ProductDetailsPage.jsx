import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/client";
import { 
  FaStar, FaHeart, FaSyncAlt, FaMinus, FaPlus, FaShoppingCart, 
  FaRegFileAlt, FaMoneyBillWave, FaRegCreditCard, FaShieldAlt, FaPlay
} from "react-icons/fa";
import ProductVideoSection from "./ProductVideoSection"; 
import { useCart } from "../context/CartContext"; 
import ProductSpecsSection from "./ProductSpecsSection";
import RelatedProducts from "./RelatedProducts"; 
import "../styles/ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProductData = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      
      if (data) {
        setProduct(data);
        const mainImgUrl = data.image.startsWith("http") 
          ? data.image 
          : `https://orm-backend-gejw.onrender.com${data.image}`;
        setActiveImg(mainImgUrl);

        let galleryImages = [];
        if (data.images && data.images.length > 0) {
          galleryImages = data.images.map(imgObj => 
            imgObj.image.startsWith("http") 
              ? imgObj.image 
              : `https://orm-backend-gejw.onrender.com${imgObj.image}`
          );
        }
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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${product.title} added to cart!`);
    }
  };

  if (loading) return <div className="pdp-loading">Loading...</div>;
  if (!product) return <div className="pdp-loading">Product Not Found.</div>;

  return (
    <div className="page-wrapper">
      <Navbar />
      
      {/* --- ADDED: BANNER SECTION --- */}
      <div className="pdp-banner">
        <div className="pdp-banner-overlay"></div>
        <div className="pdp-banner-content">
          <h1>Our <span className="highlight">Collections</span></h1>
        </div>
      </div>

      <div className="pdp-container">
        
        {/* LEFT: GALLERY */}
        <div className="pdp-gallery">
          <div className="main-image-frame">
            <img src={activeImg} alt={product.title} className="main-img" />
          </div>
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

        {/* RIGHT: PRODUCT INFO */}
        <div className="pdp-info">
          <h1 className="pdp-title">{product.title}</h1>
          <div className="pdp-divider"></div>
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

          {/* Dynamic Description */}
          <p className="pdp-desc">
            {product.description || "Enhance the stance and stability of your vehicle with ORM high-grade accessories."}
          </p>

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

          <div className="pdp-actions">
            <div className="qty-selector">
              <button onClick={() => handleQuantity("dec")}><FaMinus /></button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity("inc")}><FaPlus /></button>
            </div>

            <button className="btn-add-cart" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
            
            <div className="icon-actions">
              <button className="circle-btn"><FaHeart /></button>
              <button className="circle-btn"><FaSyncAlt /></button>
            </div>
          </div>

          <button className="btn-buy-now" onClick={handleAddToCart}>Buy Now</button>
        </div>
      </div>

      {/* Video Section from Backend URL */}
      <ProductVideoSection 
        videoUrl={product.video_url} 
        title={product.title} 
      />

      {/* 2. Add The New Specs Section */}
      <ProductSpecsSection product={product} />

       {/* 3. ADD RELATED PRODUCTS HERE (Pass the current product prop) */}
      <RelatedProducts currentProduct={product} />

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;