import React from "react";
import "../styles/ProductSpecsSection.css";
// Import your background image
import bgImg from "/image/productbg.png";

const ProductSpecsSection = ({ product }) => {
  if (!product.benefits_title && !product.specifications) return null;

  const BASE_URL = "https://orm-backend-gejw.onrender.com";

  // Helper function to handle URLs properly
  const formatUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
  };

  const specsList = product.specifications
    ? product.specifications.split("\n").filter((item) => item.trim() !== "")
    : [];

  const imageUrl = formatUrl(product.image);
  const modelUrl = formatUrl(product.model_3d); // NEW: 3D Model URL

  return (
    <section
      className="specs-section"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="specs-overlay"></div>

      <div className="specs-container">
        {/* --- LEFT: TEXT CONTENT --- */}
        <div className="specs-content">
          <h2 className="specs-title">
            {product.benefits_title || `Upgrade Your ${product.title}`}
          </h2>

          <p className="specs-desc">
            {product.benefits_description || product.description}
          </p>

          <h3 className="specs-subtitle">Key Benefits:</h3>

          <ul className="specs-list">
            {specsList.length > 0 ? (
              specsList.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <li>High Performance & Durability</li>
            )}
          </ul>
        </div>

        {/* --- RIGHT: 3D MODEL OR IMAGE --- */}
        <div className="specs-image-wrapper">
          <div className="specs-frame">
            {product.model_3d ? (
              <model-viewer
                src={modelUrl}
                camera-controls
                auto-rotate
                ar
                shadow-intensity="1"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                }}
              ></model-viewer>
            ) : (
              <img src={imageUrl} alt={product.title} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecsSection;
