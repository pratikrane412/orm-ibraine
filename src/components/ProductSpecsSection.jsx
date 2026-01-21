import React from "react";
import "../styles/ProductSpecsSection.css";

const ProductSpecsSection = ({ product }) => {
  // If no benefits data is added in backend, hide the section
  if (!product.benefits_title && !product.specifications) return null;

  // Convert the text block into an array for bullet points
  const specsList = product.specifications 
    ? product.specifications.split('\n').filter(item => item.trim() !== "")
    : [];

  // Handle Image URL (add backend domain if needed)
  const imageUrl = product.image.startsWith("http") 
    ? product.image 
    : `https://orm-backend-gejw.onrender.com${product.image}`;

  return (
    <section className="specs-section">
      <div className="specs-container">
        
        {/* --- LEFT: TEXT CONTENT --- */}
        <div className="specs-content">
          <h2 className="specs-title">
            {/* Highlight specific words logic could go here, for now we render full title */}
            {product.benefits_title || `Upgrade Your ${product.title}`}
          </h2>

          <p className="specs-desc">
            {product.benefits_description || product.description}
          </p>

          {/* Key Benefits Header */}
          <h3 className="specs-subtitle">Key Benefits:</h3>

          {/* Dynamic List */}
          <ul className="specs-list">
            {specsList.length > 0 ? (
              specsList.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              // Fallback if empty
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