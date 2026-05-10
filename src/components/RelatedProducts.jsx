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
// Removed: import "../styles/RelatedProducts.css";

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
    alert(`${item.title} added to cart!`);
  };

  return (
    <section className="bg-black py-[80px] w-full">
      <div className="w-[95%] max-w-[1400px] mx-auto">
        <h2 className="font-['Merriweather',_serif] text-[2.2rem] font-bold text-white text-left mb-[40px] uppercase border-b border-[#333] pb-[15px] max-md:text-[1.6rem] max-md:text-center">
          Must-Have {currentProduct.category}{" "}
          <span className="text-[#fbb03b]">Upgrades</span>
        </h2>

        <div className="flex items-center gap-[15px] max-md:flex-col">
          <button className="bg-transparent border-none text-white text-[1.8rem] cursor-pointer p-[10px] max-md:hidden">
            <FaChevronLeft />
          </button>

          <div className="grid grid-cols-4 gap-[20px] w-full max-md:grid-cols-1 max-md:gap-[25px]">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-[#0a0a0a] border border-[#222] rounded-[12px] overflow-hidden relative cursor-pointer transition-all duration-300 hover:-translate-y-[8px] hover:border-[#fbb03b] group"
                onClick={() => handleCardClick(item.slug)}
              >
                {item.is_sale && <span className="absolute top-[15px] left-0 bg-[#fbb03b] text-black font-['Merriweather',_serif] font-bold px-[15px] py-[4px] rounded-r-[15px] z-[2]">Sale</span>}

                <div className="w-full h-[220px] opacity-[0.4] transition-opacity duration-300 group-hover:opacity-100 max-md:h-[200px]">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `https://orm-backend-gejw.onrender.com${item.image}`
                    }
                    alt={item.title}
                  />
                  <button
                    className="absolute top-[10px] right-[10px] w-[35px] h-[35px] rounded-full bg-white/20 border-none text-white flex items-center justify-center z-[2]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaHeart />
                  </button>
                </div>

                <div className="p-[20px]">
                  <h4 className="font-['Merriweather',_serif] text-[1.15rem] font-semibold mb-[10px] text-white capitalize border-b border-[#333] pb-[10px] whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-300 group-hover:text-[#fbb03b]">{item.title}</h4>

                  <div className="flex items-center">
                    <span className="font-['Merriweather',_serif] text-white font-bold text-[1.2rem] inline-block mt-[10px] group-hover:text-[#fbb03b]">
                      Rs. {Number(item.price).toLocaleString()}
                    </span>
                    {item.old_price && (
                      <span className="font-['Merriweather',_serif] text-[#666] line-through text-[0.9rem] ml-[10px] mt-[10px]">
                        Rs. {Number(item.old_price).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="mt-[10px] flex gap-[3px]">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color="#fbb03b" size={12} />
                    ))}
                  </div>

                  <button
                    className="w-full bg-[#fff8e7] text-black border-none py-[14px] rounded-[8px] font-['Merriweather',_serif] font-bold text-[1rem] uppercase tracking-[1px] cursor-pointer flex items-center justify-center gap-[10px] mt-[15px] transition-colors duration-300 hover:bg-[#fbb03b]"
                    onClick={(e) => handleAddToCart(e, item)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="bg-transparent border-none text-white text-[1.8rem] cursor-pointer p-[10px] max-md:hidden">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
