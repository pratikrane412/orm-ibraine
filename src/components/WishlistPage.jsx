import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaTrash, FaShoppingCart, FaHeartBroken } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id); // Optional: Remove from wishlist after adding to cart
    alert("Moved to Cart!");
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* 1. HERO BANNER */}
      <div className="relative w-full h-[300px] bg-[url('/image/banner.jpg')] bg-cover bg-center mt-[80px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-[2]">
          <h1 className="font-merriweather text-[3.5rem] text-white uppercase m-0 max-md:text-[2.5rem]">
            My <span className="text-orm-gold">Wishlist</span>
          </h1>
        </div>
      </div>

      <div className="w-[90%] max-w-[1400px] mx-auto py-[80px] min-h-[50vh] max-md:py-[40px]">
        {wishlistItems.length === 0 ? (
          // 2. EMPTY STATE
          <div className="text-center p-[60px] text-white max-md:p-[40px_20px]">
            <FaHeartBroken className="text-[4rem] text-[#333] mb-[20px] max-md:text-[3rem] mx-auto" />
            <h2 className="font-merriweather text-[2rem] mb-[10px] max-md:text-[1.6rem]">Your Wishlist is Empty</h2>
            <p className="font-lato text-[#888] mb-[30px] max-md:text-[0.9rem]">Looks like you haven't added any off-road gear yet.</p>
            <Link to="/products/thar" className="bg-orm-gold text-black px-[30px] py-[12px] rounded-[30px] font-bold no-underline transition-all duration-300 hover:bg-[#ffc107] max-md:px-[24px] max-md:py-[10px] max-md:text-[0.9rem] inline-block">
              Explore Products
            </Link>
          </div>
        ) : (
          // 3. GRID LAYOUT
          <div className="grid grid-cols-4 gap-[30px] lg:grid-cols-4 md:grid-cols-2 max-md:grid-cols-2 max-[600px]:grid-cols-1">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#0a0a0a] border border-[#222] rounded-[12px] overflow-hidden transition-transform duration-300 cursor-pointer hover:translate-y-[-5px] hover:border-orm-gold"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="w-full h-[250px] relative">
                  <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                  <button
                    className="absolute top-[10px] right-[10px] bg-black/60 text-white border-none w-[35px] h-[35px] rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#ff4d4d]"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item.id);
                    }}
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="p-[20px]">
                  <h3 className="font-merriweather text-[1.1rem] text-white m-[0_0_10px_0] whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</h3>
                  <div className="mb-[15px]">
                    <span className="font-lato font-bold text-white text-[1.1rem]">
                      Rs. {Number(item.price).toLocaleString()}
                    </span>
                  </div>

                  <button
                    className="w-full bg-white text-black border-none py-[10px] rounded-[6px] font-semibold text-[0.9rem] cursor-pointer flex items-center justify-center gap-[8px] transition-all duration-300 hover:bg-orm-gold"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveToCart(item);
                    }}
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;

