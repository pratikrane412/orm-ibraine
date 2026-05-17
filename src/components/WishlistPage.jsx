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
    return imagePath.startsWith("http") ? imagePath : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    alert(`${item.title} added to arsenal!`);
  };

  return (
    <div className="bg-orm-dark text-white min-h-screen font-sans">
      <Navbar />
      <div className="h-[220px] bg-[url('/image/banner.jpg')] bg-cover bg-center relative flex items-center justify-center text-center mt-[70px] max-md:h-[150px]">
        <div className="absolute inset-0 bg-gradient-to-b from-orm-dark via-orm-dark/40 to-orm-dark"></div>
        <div className="relative z-[2] px-6">
          <h1 className="font-merriweather text-[2.2rem] text-white font-black uppercase tracking-tight max-md:text-[1.6rem]">My <span className="text-orm-gold">Wishlist</span></h1>
          <div className="w-16 h-1 bg-orm-gold mx-auto rounded-full mt-3"></div>
        </div>
      </div>

      <div className="w-[92%] max-w-[1300px] mx-auto py-[60px] min-h-[50vh]">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-[2rem] border border-white/5 flex flex-col items-center">
            <FaHeartBroken className="text-[3rem] text-white/5 mb-6" />
            <h2 className="font-merriweather text-[1.8rem] mb-4 font-black opacity-20 uppercase tracking-tighter">Vault is Empty</h2>
            <p className="font-sans text-white/40 mb-8 max-w-md mx-auto uppercase tracking-widest text-[0.6rem] font-bold">Initiate exploration to discover gear.</p>
            <Link to="/collections/thar" className="bg-orm-gold text-black px-10 py-4 rounded-full font-black uppercase tracking-[0.15em] text-[0.65rem] shadow-xl transition-all hover:bg-white hover:-translate-y-0.5">Explore Collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 lg:grid-cols-4 md:grid-cols-2 max-md:grid-cols-1">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] overflow-hidden transition-all duration-700 cursor-pointer hover:border-orm-gold/30 hover:bg-white/[0.04] hover:-translate-y-1.5" onClick={() => navigate(`/product/${item.slug}`)}>
                <div className="relative aspect-square overflow-hidden bg-[#121212]">
                  <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-orm-dark via-transparent to-transparent opacity-60"></div>
                  <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center z-10 transition-all hover:bg-red-500 hover:text-white text-white/50" onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}><FaTrash size={12} /></button>
                </div>
                <div className="p-6">
                  <span className="text-orm-gold text-[0.5rem] font-black uppercase tracking-[0.15em] mb-2 block opacity-60">Saved Component</span>
                  <h3 className="font-merriweather text-base font-bold text-white mb-4 min-h-[2.5rem] line-clamp-2 group-hover:text-orm-gold transition-colors">{item.title}</h3>
                  <div className="mb-6"><span className="font-sans font-black text-xl text-white tracking-tighter">Rs. {Number(item.price).toLocaleString()}</span></div>
                  <button className="w-full relative overflow-hidden group/btn bg-white/[0.05] border border-white/10 text-white py-4 rounded-xl font-sans font-black text-[0.6rem] uppercase tracking-[0.15em] transition-all hover:text-black hover:border-orm-gold" onClick={(e) => { e.stopPropagation(); handleMoveToCart(item); }}>
                    <span className="relative z-10 flex items-center justify-center gap-2"><FaShoppingCart size={12} /> Deploy to Arsenal</span>
                    <div className="absolute inset-0 bg-orm-gold translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
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
