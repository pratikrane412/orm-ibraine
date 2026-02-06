import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/client";
import {
  FaStar,
  FaHeart,
  FaSyncAlt,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaRegFileAlt,
  FaMoneyBillWave,
  FaRegCreditCard,
  FaShieldAlt,
  FaPlay,
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

  // Tracks what is currently being shown in the big frame
  const [activeMedia, setActiveMedia] = useState({ url: "", type: "image" });
  // Combined list of images and videos
  const [gallery, setGallery] = useState([]);

  const BASE_URL = "https://orm-backend-gejw.onrender.com";

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProductData = async () => {
      setLoading(true);
      const data = await fetchProductById(id);

      if (data) {
        setProduct(data);

        // 1. Prepare Main Image URL
        const mainImgUrl = data.image.startsWith("http")
          ? data.image
          : `${BASE_URL}${data.image}`;

        let mediaItems = [];

        // 2. Add Main Image as 1st item
        mediaItems.push({ url: mainImgUrl, type: "image" });

        // 3. Add Uploaded Video File (from PC) as 2nd item if it exists
        if (data.video_file) {
          const vidUrl = data.video_file.startsWith("http")
            ? data.video_file
            : `${BASE_URL}${data.video_file}`;
          mediaItems.push({ url: vidUrl, type: "video_file" });
        }

        // 4. Add Extra Gallery Images
        if (data.images && data.images.length > 0) {
          data.images.forEach((imgObj) => {
            const url = imgObj.image.startsWith("http")
              ? imgObj.image
              : `${BASE_URL}${imgObj.image}`;
            mediaItems.push({ url, type: "image" });
          });
        }

        setGallery(mediaItems);
        setActiveMedia(mediaItems[0]); // Default to first image
      }
      setLoading(false);
    };
    loadProductData();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    else if (type === "inc") setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${product.title} added to cart!`);
    }
  };

  if (loading)
    return <div className="pdp-loading">Loading Product Details...</div>;
  if (!product) return <div className="pdp-loading">Product Not Found.</div>;

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* BANNER */}
      <div className="pdp-banner">
        <div className="pdp-banner-overlay"></div>
        <div className="pdp-banner-content">
          <h1>
            Product <span className="highlight">Details</span>
          </h1>
        </div>
      </div>

      <div className="pdp-container">
        {/* LEFT: MEDIA GALLERY */}
        <div className="pdp-gallery">
          <div className="main-image-frame">
            {activeMedia.type === "video_file" ? (
              <video
                key={activeMedia.url}
                className="main-img"
                controls
                autoPlay
                muted
                loop
              >
                <source src={activeMedia.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={activeMedia.url}
                alt={product.title}
                className="main-img"
              />
            )}
          </div>

          <div className="thumbnail-row">
            {gallery.map((item, idx) => (
              <div
                key={idx}
                className={`thumb-box ${activeMedia.url === item.url ? "active" : ""}`}
                onClick={() => setActiveMedia(item)}
              >
                {item.type === "video_file" ? (
                  <div className="video-thumb-overlay">
                    <FaPlay />
                    <span>VIDEO</span>
                  </div>
                ) : (
                  <img src={item.url} alt={`thumbnail-${idx}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="pdp-info">
          <h1 className="pdp-title">{product.title}</h1>
          <div className="pdp-divider"></div>

          <div className="pdp-price-block">
            <span className="pdp-price">
              Rs. {Number(product.price).toLocaleString()}.00
            </span>
            {product.old_price && (
              <>
                <span className="pdp-old-price">
                  Rs. {Number(product.old_price).toLocaleString()}.00
                </span>
                <span className="pdp-discount">SALE</span>
              </>
            )}

            <div className="pdp-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color="#fbb03b" size={14} />
                ))}
              </div>
              <span className="review-count">
                ({product.rating || "4.5"} Rating)
              </span>
            </div>
          </div>

          <div className="pdp-divider"></div>

          <p className="pdp-desc">
            {product.description ||
              "Premium quality off-road modification part designed for durability and extreme performance."}
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feat-icon">
                <FaRegFileAlt />
              </div>
              <span>15 Day Return Policy</span>
            </div>
            <div className="feature-item">
              <div className="feat-icon">
                <FaMoneyBillWave />
              </div>
              <span>Cash on Delivery</span>
            </div>
            <div className="feature-item">
              <div className="feat-icon">
                <FaRegCreditCard />
              </div>
              <span>EMI Available</span>
            </div>
            <div className="feature-item">
              <div className="feat-icon">
                <FaShieldAlt />
              </div>
              <span>Brand Warranty</span>
            </div>
          </div>

          <div className="pdp-actions">
            <div className="qty-selector">
              <button onClick={() => handleQuantity("dec")}>
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity("inc")}>
                <FaPlus />
              </button>
            </div>

            <button className="btn-add-cart" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>

            <div className="icon-actions">
              <button className="circle-btn">
                <FaHeart />
              </button>
              <button className="circle-btn">
                <FaSyncAlt />
              </button>
            </div>
          </div>

          <button className="btn-buy-now" onClick={handleAddToCart}>
            Buy Now
          </button>
        </div>
      </div>

      {/* BOTTOM SECTIONS */}
      {/* 1. YouTube Video Demo Section (Uses video_url) */}
      <ProductVideoSection videoUrl={product.video_url} title={product.title} />

      {/* 2. Specs Section (Uses specifications, benefits_title etc) */}
      <ProductSpecsSection product={product} />

      {/* 3. Related Products Section */}
      <RelatedProducts currentProduct={product} />

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
