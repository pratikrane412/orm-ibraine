import React from "react";
// Removed: import "../styles/ProductSpecsSection.css";
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
      className="relative bg-black text-white py-[80px] pb-[100px] flex justify-center overflow-hidden bg-cover bg-center bg-no-repeat bg-scroll max-md:py-[60px]"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/85 z-[1]"></div>

      <div className="w-[90%] max-w-[1400px] flex items-center justify-between gap-[60px] relative z-[2] max-lg:flex-col max-lg:text-left max-md:gap-[40px]">
        {/* --- LEFT: TEXT CONTENT --- */}
        <div className="flex-1 max-w-[650px]">
          <h2 className="font-['Merriweather',_serif] text-[2.8rem] leading-[1.2] mb-[20px] capitalize text-white font-bold max-lg:text-[2.2rem] max-md:text-[2rem]">
            {product.benefits_title || `Upgrade Your ${product.title}`}
          </h2>

          <p className="font-['Lato',_sans-serif] text-[1rem] leading-[1.7] text-[#ccc] mb-[25px] whitespace-pre-line">
            {product.benefits_description || product.description}
          </p>

          <h3 className="font-['Merriweather',_serif] text-[1.4rem] text-[#fbb03b] mb-[20px] uppercase font-bold">Key Benefits:</h3>

          <ul className="list-none p-0">
            {specsList.length > 0 ? (
              specsList.map((item, index) => (
                <li key={index} className="relative pl-[25px] mb-[12px] font-['Lato',_sans-serif] text-[1rem] text-[#e0e0e0] before:content-['•'] before:absolute before:left-0 before:text-[#fbb03b] before:text-[1.5rem] before:top-[-2px]">
                  {item}
                </li>
              ))
            ) : (
              <li className="relative pl-[25px] mb-[12px] font-['Lato',_sans-serif] text-[1rem] text-[#e0e0e0] before:content-['•'] before:absolute before:left-0 before:text-[#fbb03b] before:text-[1.5rem] before:top-[-2px]">
                High Performance & Durability
              </li>
            )}
          </ul>
        </div>

        {/* --- RIGHT: 3D MODEL OR IMAGE --- */}
        <div className="flex-1 flex justify-end max-lg:w-full max-lg:justify-center">
          <div className="relative w-full h-[500px] max-w-[650px] border-2 border-[#fbb03b] rounded-[25px] p-[5px] bg-black shadow-[0_0_30px_rgba(251,176,59,0.15)] overflow-hidden max-lg:h-[400px] max-md:h-[280px] max-md:rounded-[18px]">
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
              <img src={imageUrl} alt={product.title} className="w-full h-full object-contain rounded-[20px]" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecsSection;
