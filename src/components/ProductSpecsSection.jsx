import React from "react";
import bgImg from "/image/productbg.png";

const ProductSpecsSection = ({ product }) => {
  if (!product.benefits_title && !product.specifications) return null;

  const BASE_URL = "https://orm-backend-gejw.onrender.com";

  const formatUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
  };

  const specsList = product.specifications
    ? product.specifications.split("\n").filter((item) => item.trim() !== "")
    : [];

  const imageUrl = formatUrl(product.image);
  const modelUrl = formatUrl(product.model_3d);

  return (
    <section
      className="relative bg-orm-dark text-white py-[80px] flex justify-center overflow-hidden bg-cover bg-center bg-fixed max-md:py-[50px]"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orm-dark via-orm-dark/90 to-orm-dark/70 z-[1]"></div>

      <div className="w-[92%] max-w-[1300px] flex items-center justify-between gap-[40px] relative z-[2] max-lg:flex-col max-lg:text-left">
        {/* --- LEFT: TEXT CONTENT --- */}
        <div className="flex-1 max-w-[600px]">
          <div className="inline-block px-3 py-0.5 bg-orm-gold/10 border border-orm-gold/20 rounded-full mb-4">
             <span className="text-orm-gold text-[0.55rem] font-black uppercase tracking-[0.2em]">Engineering Breakdown</span>
          </div>

          <h2 className="font-merriweather text-[2.4rem] leading-[1.2] mb-[24px] capitalize text-white font-black tracking-tight max-lg:text-[2rem] max-md:text-[1.8rem]">
            {product.benefits_title || `Upgrade Your ${product.title}`}
          </h2>

          <p className="font-sans text-[0.9rem] leading-[1.7] text-white/70 mb-[30px] whitespace-pre-line max-md:text-[0.85rem]">
            {product.benefits_description || product.description}
          </p>

          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] p-6 shadow-xl">
            <h3 className="font-sans text-[0.65rem] text-orm-gold mb-[16px] uppercase font-black tracking-[0.15em]">Key Advantages</h3>

            <ul className="list-none p-0 flex flex-col gap-3">
              {specsList.length > 0 ? (
                specsList.map((item, index) => (
                  <li key={index} className="relative pl-[20px] font-sans text-[0.85rem] font-bold text-white/80 before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-1.5 before:h-1.5 before:bg-orm-gold before:rounded-full max-md:text-[0.8rem]">
                    {item}
                  </li>
                ))
              ) : (
                <li className="relative pl-[20px] font-sans text-[0.85rem] font-bold text-white/80 before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-1.5 before:h-1.5 before:bg-orm-gold before:rounded-full">
                  High Performance & Durability
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* --- RIGHT: 3D MODEL OR IMAGE --- */}
        <div className="flex-1 flex justify-end max-lg:w-full max-lg:justify-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-orm-gold/20 blur-2xl rounded-[2rem] opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative w-full h-[400px] max-w-[500px] border border-orm-gold/50 rounded-[2rem] p-[5px] bg-white/[0.03] backdrop-blur-sm shadow-2xl overflow-hidden max-lg:h-[350px] max-md:h-[280px]">
              {product.model_3d ? (
                <model-viewer
                  src={modelUrl}
                  camera-controls
                  auto-rotate
                  shadow-intensity="1.5"
                  exposure="1.2"
                  environment-image="neutral"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                  }}
                ></model-viewer>
              ) : (
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
                   <img src={imageUrl} alt={product.title} className="w-full h-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105 hover:grayscale-0" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecsSection;
