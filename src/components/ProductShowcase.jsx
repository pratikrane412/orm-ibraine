import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { fetchProductsByCategory } from "../api/client";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Import your background image
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
  };

  const renderStars = (rating) => {
    const stars = [];
    const safeRating = rating || 5;
    for (let i = 1; i <= 5; i++) {
      if (i <= safeRating) {
        stars.push(<FaStar key={i} className="text-orm-gold text-[0.55rem]" />);
      } else {
        stars.push(<FaStar key={i} className="text-white/10 text-[0.55rem]" />);
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
      className="relative bg-orm-dark py-[120px] text-white min-h-[600px] overflow-hidden bg-cover bg-center bg-fixed max-md:py-[80px]"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Sophisticated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-orm-dark via-orm-dark/80 to-orm-dark z-[1]"></div>

      <div className="w-[92%] max-w-[1400px] mx-auto relative z-[2]">
        <div className="flex justify-between items-end mb-[48px] max-[768px]:flex-col max-[768px]:items-center max-[768px]:text-center max-[768px]:gap-4">
          <div className="max-w-xl">
            <div className="inline-block px-2.5 py-0.5 bg-orm-gold/10 border border-orm-gold/20 rounded-full mb-3">
              <span className="text-orm-gold text-[0.5rem] font-bold tracking-[0.3em] uppercase">Curated selection</span>
            </div>
            <h2 className="text-[2.2rem] font-black uppercase tracking-tighter leading-[1.1] mb-3 max-md:text-[1.8rem]">
              The <span className="text-orm-gold">Essential</span> Mutants
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg max-md:text-xs">
              Precision-crafted modifications for those who refuse to settle for the ordinary.
            </p>
          </div>
          
          <button 
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 font-bold uppercase tracking-[0.15em] text-[0.65rem]"
            onClick={() => navigate("/collections/thar")}
          >
            View All Upgrades
            <span className="w-8 h-[1px] bg-white/10 group-hover:w-10 group-hover:bg-orm-gold transition-all duration-300"></span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
             <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 max-[1200px]:grid-cols-2 max-[768px]:flex max-[768px]:overflow-x-auto max-[768px]:pb-8 no-scrollbar">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[1.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:border-orm-gold/30 hover:bg-white/[0.04] max-[768px]:min-w-[260px]"
                onClick={() => handleCardClick(product)}
              >
                {/* Image Section - Vertically Shorter */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#121212]">
                  <img 
                    src={getImageUrl(product.image)} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orm-dark via-transparent to-transparent opacity-60"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    {product.is_sale && (
                      <div className="bg-white text-black font-black text-[0.5rem] px-2.5 py-1 rounded-full uppercase tracking-[0.2em] shadow-2xl">
                        Sale
                      </div>
                    )}
                    <button
                      className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 opacity-0 group-hover:opacity-100"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <FaHeart size={10} />
                    </button>
                  </div>
                </div>

                {/* Content Section - Tightened */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-0.5">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-[0.5rem] font-bold text-white/30 uppercase tracking-[0.2em]">SKU: {product.id}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-orm-gold transition-colors duration-300 max-md:text-sm">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-end gap-1.5 mb-5">
                    <span className="font-sans font-black text-lg text-white tracking-tighter max-md:text-base">
                      Rs. {Number(product.price).toLocaleString()}
                    </span>
                    {product.old_price && (
                      <span className="text-[0.75rem] text-white/20 line-through tracking-tighter mb-0.5">
                        Rs. {Number(product.old_price).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    className="w-full relative overflow-hidden group/btn bg-white/[0.03] border border-white/10 text-white py-3 rounded-xl font-sans font-bold text-[0.6rem] uppercase tracking-[0.2em] transition-all duration-500 hover:text-black hover:border-orm-gold"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaShoppingCart size={10} /> Secure Order
                    </span>
                    <div className="absolute inset-0 bg-orm-gold translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
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
