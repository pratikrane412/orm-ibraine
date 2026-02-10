import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/client"; // This now works again
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
  FaCube,
} from "react-icons/fa";
import ProductVideoSection from "./ProductVideoSection";
import { useCart } from "../context/CartContext";
import ProductSpecsSection from "./ProductSpecsSection";
import RelatedProducts from "./RelatedProducts";
import "../styles/ProductDetailsPage.css";

const ProductDetailsPage = () => {
  // Extract slug from URL (e.g. /product/thar-front-bumper)
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const [activeMedia, setActiveMedia] = useState({ url: "", type: "image" });
  const [gallery, setGallery] = useState([]);

  const BASE_URL = "https://orm-backend-gejw.onrender.com";

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProductData = async () => {
      setLoading(true);

      // Call the function using the slug string
      const data = await fetchProductById(slug);

      if (data) {
        setProduct(data);

        const formatUrl = (path) => {
          if (!path) return "";
          return path.toString().startsWith("http")
            ? path
            : `${BASE_URL}${path}`;
        };

        const mainImgUrl = formatUrl(data.image);
        let mediaItems = [];

        mediaItems.push({ url: mainImgUrl, type: "image" });

        if (data.model_3d) {
          mediaItems.push({
            url: formatUrl(data.model_3d),
            type: "model_3d",
            thumbnail: mainImgUrl,
          });
        }

        if (data.video_file) {
          mediaItems.push({
            url: formatUrl(data.video_file),
            type: "video_file",
            thumbnail: mainImgUrl,
          });
        }

        if (data.images && data.images.length > 0) {
          data.images.forEach((imgObj) => {
            mediaItems.push({ url: formatUrl(imgObj.image), type: "image" });
          });
        }

        setGallery(mediaItems);
        setActiveMedia(mediaItems[0]);
      }
      setLoading(false);
    };
    loadProductData();
  }, [slug]);

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

  if (loading) return <div className="pdp-loading">Loading...</div>;
  if (!product) return <div className="pdp-loading">Product Not Found.</div>;

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="pdp-banner">
        <div className="pdp-banner-overlay"></div>
        <div className="pdp-banner-content">
          <h1>
            Our <span className="highlight">Collections</span>
          </h1>
        </div>
      </div>

      <div className="pdp-container">
        <div className="pdp-gallery">
          <div className="main-image-frame">
            {activeMedia.type === "model_3d" ? (
              <model-viewer
                key={activeMedia.url}
                src={activeMedia.url}
                camera-controls
                auto-rotate
                ar
                shadow-intensity="1"
                style={{ width: "100%", height: "100%", background: "#000" }}
              ></model-viewer>
            ) : activeMedia.type === "video_file" ? (
              <video
                key={activeMedia.url}
                className="main-img"
                autoPlay
                muted
                playsInline
                loop
              >
                <source src={activeMedia.url} type="video/mp4" />
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
                {item.type === "model_3d" || item.type === "video_file" ? (
                  <div className="video-thumb-wrapper">
                    <img
                      src={item.thumbnail}
                      alt="thumb"
                      className="video-thumb-img"
                    />
                    <div className="play-overlay">
                      {item.type === "model_3d" ? (
                        <FaCube color="#4a90e2" />
                      ) : (
                        <FaPlay />
                      )}
                    </div>
                  </div>
                ) : (
                  <img src={item.url} alt="thumbnail" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <h1 className="pdp-title">{product.title}</h1>
          <div className="pdp-divider"></div>

          <div className="pdp-price-block">
            <span className="pdp-price">
              Rs. {Number(product.price).toLocaleString()}.00
            </span>
            {product.old_price && (
              <span className="pdp-old-price">
                Rs. {Number(product.old_price).toLocaleString()}.00
              </span>
            )}
            <div className="pdp-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color="#fbb03b" size={14} />
              ))}
              <span className="review-count">
                ({product.rating || "4.5"} Rating)
              </span>
            </div>
          </div>

          <div className="pdp-divider"></div>
          <p className="pdp-desc">{product.description}</p>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feat-icon">
                <FaRegFileAlt />
              </div>
              <span>15 Day Return</span>
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

      <ProductVideoSection videoUrl={product.video_url} title={product.title} />
      <ProductSpecsSection product={product} />
      <RelatedProducts currentProduct={product} />
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
