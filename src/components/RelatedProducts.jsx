import React, { useState, useEffect } from "react";
import { fetchProductsByCategory } from "../api/client";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const RelatedProducts = ({ currentProduct }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (currentProduct) {
      fetchProductsByCategory(currentProduct.category).then((data) => {
        const related = data.filter((item) => item.id !== currentProduct.id);
        setProducts(related.slice(0, 4));
      });
    }
  }, [currentProduct]);

  if (products.length === 0) return null;

  const handleCardClick = (slug) => {
    navigate(`/product/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart(item);
    alert(`${item.title} added to arsenal!`);
  };

  return (
    <section className="bg-orm-dark py-[60px] w-full border-t border-white/5 max-md:py-[40px]">
      <div className="w-[92%] max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-[32px] max-md:flex-col max-md:items-center max-md:text-center max-md:gap-4">
           <div>
              <div className="inline-block px-2.5 py-0.5 bg-orm-gold/10 border border-orm-gold/20 rounded-full mb-2.5">
                <span className="text-orm-gold text-[0.5rem] font-black uppercase tracking-[0.2em]">Complementary Gear</span>
              </div>
              <h2 className="font-merriweather text-[1.8rem] font-black text-white uppercase tracking-tighter max-md:text-[1.6rem]">Essential <span className="text-orm-gold">Upgrades</span></h2>
           </div>
           
           <div className="flex gap-2.5">
              <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:border-white/40 transition-all max-md:hidden">
                <FaChevronLeft size={12} />
              </button>
              <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:border-white/40 transition-all max-md:hidden">
                <FaChevronRight size={12} />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-4 gap-4 w-full max-lg:grid-cols-2 max-md:grid-cols-1">
          {products.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.2rem] overflow-hidden transition-all duration-700 cursor-pointer hover:border-orm-gold/30 hover:bg-white/[0.04] hover:-translate-y-1 shadow-lg"
              onClick={() => handleCardClick(item.slug)}
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-orm-dark">
                {item.is_sale && (
                  <div className="absolute top-2.5 left-2.5 bg-white text-black font-black text-[0.45rem] px-2 py-0.5 rounded-full uppercase tracking-[0.2em] shadow-2xl z-10">
                    Sale
                  </div>
                )}
                
                <img
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `https://orm-backend-gejw.onrender.com${item.image}`
                  }
                  alt={item.title}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-orm-dark via-transparent to-transparent opacity-60"></div>
                
                <button
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center z-10 transition-all opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaHeart size={9} />
                </button>
              </div>

              <div className="p-4">
                <span className="text-orm-gold text-[0.45rem] font-bold uppercase tracking-[0.2em] mb-1.5 block opacity-60">Curated Match</span>
                <h4 className="font-merriweather text-[0.85rem] font-bold mb-2 text-white min-h-[2.2rem] line-clamp-2 group-hover:text-orm-gold transition-colors duration-500 max-md:text-sm">{item.title}</h4>

                <div className="flex items-end gap-1.5 mb-4">
                  <span className="text-white font-black text-base tracking-tighter">
                    Rs. {Number(item.price).toLocaleString()}
                  </span>
                  {item.old_price && (
                    <span className="text-white/20 line-through text-[0.65rem] mb-0.5 tracking-tighter">
                      Rs. {Number(item.old_price).toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  className="w-full relative overflow-hidden group/btn bg-white/[0.05] border border-white/10 text-white py-2.5 rounded-lg font-sans font-black text-[0.55rem] uppercase tracking-[0.2em] transition-all hover:text-black hover:border-orm-gold"
                  onClick={(e) => handleAddToCart(e, item)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                     <FaShoppingCart size={9} /> Deploy Unit
                  </span>
                  <div className="absolute inset-0 bg-orm-gold translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
