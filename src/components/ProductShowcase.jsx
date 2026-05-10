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
    alert(`${product.title} added to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const safeRating = rating || 5;
    for (let i = 1; i <= 5; i++) {
      if (i <= safeRating) {
        stars.push(<FaStar key={i} className="text-orm-gold" />);
      } else if (i === Math.ceil(safeRating) && !Number.isInteger(safeRating)) {
        stars.push(<FaStarHalfAlt key={i} className="text-orm-gold" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-600" />);
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
      className="relative bg-orm-dark py-[100px] text-white min-h-[600px] overflow-hidden bg-cover bg-center bg-no-repeat max-[768px]:pt-[60px] max-[768px]:pb-[80px]"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[1]"></div>

      <div className="w-[92%] max-w-[1400px] mx-auto relative z-[2]">
        <div className="text-center mb-[60px] max-[768px]:mb-[40px]">
          <h2 className="font-merriweather text-[3.5rem] font-black uppercase leading-[1.1] mb-4 max-[1024px]:text-[2.8rem] max-[768px]:text-[2rem]">
            Must-Have <span className="text-orm-gold">Upgrades</span>
          </h2>
          <div className="w-20 h-1 bg-orm-gold mx-auto rounded-full"></div>
          <p className="mt-6 font-sans text-white/60 max-w-xl mx-auto max-[768px]:text-sm">
            Premium modifications engineered for elite performance and rugged durability.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orm-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-[30px] max-[1200px]:grid-cols-2 max-[768px]:flex max-[768px]:gap-[20px] max-[768px]:overflow-x-auto max-[768px]:pb-10 max-[768px]:[scroll-snap-type:x_mandatory] scrollbar-none">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-orm-surface/80 backdrop-blur-xl border border-orm-gray rounded-2xl overflow-hidden transition-all duration-500 shadow-orm-premium cursor-pointer hover:-translate-y-2 hover:border-orm-gold-premium/50 max-[768px]:min-w-[85%] max-[768px]:[scroll-snap-align:center]"
                onClick={() => handleCardClick(product)}
              >
                <div className="relative w-full h-[280px] overflow-hidden bg-[#121212] max-[768px]:h-[240px]">
                  <img 
                    src={getImageUrl(product.image)} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Badge */}
                  {product.is_sale && (
                    <div className="absolute top-4 left-4 bg-orm-gold text-black font-bold text-[0.7rem] px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
                      Sale
                    </div>
                  )}
                  
                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <button
                      className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-orm-gold hover:text-black transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaHeart className="text-sm" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[0.65rem] font-bold text-orm-gold uppercase tracking-[0.2em] mb-2 block">Premium Part</span>
                  <h3 className="font-merriweather text-lg font-bold text-white mb-4 line-clamp-1 group-hover:text-orm-gold transition-colors duration-300">
                    {product.title}
                  </h3>
                  
                  <div className="flex justify-between items-end mb-6">
                    <div className="flex flex-col gap-1">
                      {product.old_price && (
                        <span className="text-xs text-white/30 line-through">
                          Rs. {Number(product.old_price).toLocaleString()}
                        </span>
                      )}
                      <span className="font-sans font-bold text-xl text-white">
                        Rs. {Number(product.price).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-0.5 text-[0.7rem]">
                      {renderStars(product.rating)}
                    </div>
                  </div>

                  <button
                    className="w-full bg-white/5 border border-orm-gray text-white py-3.5 rounded-xl font-sans font-bold text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 hover:bg-orm-gold hover:text-black hover:border-orm-gold hover:shadow-orm-gold-glow flex items-center justify-center gap-2 group/btn"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <FaShoppingCart className="transition-transform duration-300 group-hover/btn:-translate-y-0.5" /> 
                    Add to Cart
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
