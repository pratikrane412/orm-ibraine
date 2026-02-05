import React from "react";
import "../styles/ProductSpecsSection.css";
// Import your background image
import bgImg from "/image/productbg.png";

const ProductSpecsSection = ({ product }) => {
  if (!product.benefits_title && !product.specifications) return null;

  const specsList = product.specifications
    ? product.specifications.split("\n").filter((item) => item.trim() !== "")
    : [];

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `https://orm-backend-gejw.onrender.com${product.image}`;

  return (
    <section
      className="specs-section"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Dark overlay for readability */}
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

        {/* --- RIGHT: PRODUCT IMAGE --- */}
        <div className="specs-image-wrapper">
          <div className="specs-frame">
            <img src={imageUrl} alt={product.title} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecsSection;
