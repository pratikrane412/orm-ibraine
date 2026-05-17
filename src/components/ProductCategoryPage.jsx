import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchProductsByCategory } from "../api/client";
import { FaShoppingCart, FaHeart, FaSearch, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Import the background image for the middle section
import roadBg from "/image/road.png";

const categoryConfig = {
  thar: { title: "Mahindra Thar & Roxx", backendCategory: "Thar", headerBg: "/image/banner.jpg" },
  scorpio: { title: "Scorpio", backendCategory: "Scorpio", headerBg: "/image/banner.jpg" },
  hilux: { title: "Toyota Hilux", backendCategory: "Hilux", headerBg: "/image/banner.jpg" },
  fortuner: { title: "Toyota Fortuner", backendCategory: "Fortuner", headerBg: "/image/banner.jpg" },
  jimny: { title: "Suzuki Jimny", backendCategory: "Jimny", headerBg: "/image/banner.jpg" },
  defender: { title: "Range Rover Defender", backendCategory: "Defender", headerBg: "/image/banner.jpg" },
};

const sidebarCategories = [
  { name: "Mahindra Thar & Roxx", slug: "thar", dbKey: "Thar" },
  { name: "Scorpio", slug: "scorpio", dbKey: "Scorpio" },
  { name: "Toyota Hilux", slug: "hilux", dbKey: "Hilux" },
  { name: "Toyota Fortuner", slug: "fortuner", dbKey: "Fortuner" },
  { name: "Suzuki Jimny", slug: "jimny", dbKey: "Jimny" },
  { name: "Range Rover Defender", slug: "defender", dbKey: "Defender" },
];

const ProductCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({});
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const currentCategory = categoryConfig[categoryName] || categoryConfig["thar"];

  useEffect(() => {
    setLoading(true);
    fetchProductsByCategory(currentCategory.backendCategory).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [categoryName]);

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/category-counts/")
      .then((res) => res.json())
      .then((data) => setCategoryCounts(data))
      .catch((err) => console.error("Error fetching counts:", err));
  }, []);

  const handleCategoryClick = (slug) => {
    navigate(`/collections/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (slug) => { navigate(`/product/${slug}`); };

  const handleAddToCartBtn = (e, item) => {
    e.stopPropagation();
    addToCart(item);
    alert(`${item.title} added to arsenal!`);
  };

  const handleWishlistClick = (e, item) => {
    e.stopPropagation();
    addToWishlist(item);
  };

  return (
    <div className="bg-orm-dark text-white min-h-screen">
      <Navbar />
      <div className="h-[250px] bg-cover bg-center relative flex items-center justify-center text-center mt-[70px] max-md:h-[180px]" style={{ backgroundImage: `url(${currentCategory.headerBg})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-orm-dark via-orm-dark/40 to-orm-dark"></div>
        <div className="relative z-[2] px-6">
          <h1 className="text-[2.8rem] text-white font-bold uppercase tracking-tight leading-tight max-md:text-[1.8rem]">
            {currentCategory.title} <span className="text-orm-gold">Accessories</span>
          </h1>
          <div className="w-16 h-1 bg-orm-gold mx-auto rounded-full mt-4"></div>
        </div>
      </div>

      <div className="relative w-full bg-cover bg-center bg-fixed py-[80px] max-md:py-[50px]" style={{ backgroundImage: `url(${roadBg})` }}>
        <div className="absolute inset-0 bg-orm-dark/80 backdrop-blur-sm z-[1]"></div>
        <div className="flex w-[92%] max-w-[1400px] mx-auto gap-[32px] relative z-[2] max-md:flex-col">
          {/* Refined Sidebar - More Compact */}
          <aside className="flex-1 max-w-[280px] h-fit max-md:max-w-none">
            <div className="bg-white/[0.03] backdrop-blur-3xl p-6 rounded-[1.5rem] border border-white/5 sticky top-[90px]">
              <div className="flex items-center bg-white/[0.05] border border-white/10 px-4 py-2.5 rounded-xl mb-6 group focus-within:border-orm-gold/50 transition-all">
                <FaSearch size={12} className="text-white/20 group-focus-within:text-orm-gold" />
                <input type="text" placeholder="Search Mutant Parts" className="bg-transparent border-none text-white text-[0.7rem] outline-none w-full ml-3 font-sans placeholder:text-white/20" />
              </div>
              <h3 className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/30 mb-4 px-2">Categories</h3>
              <ul className="flex flex-col gap-1">
                {sidebarCategories.map((cat, index) => (
                  <li key={index} className={`group flex justify-between items-center px-4 py-2.5 rounded-xl transition-all cursor-pointer ${cat.slug === categoryName ? "bg-orm-gold text-black shadow-md" : "bg-transparent text-white/50 hover:bg-white/[0.05] hover:text-white"}`} onClick={() => handleCategoryClick(cat.slug)}>
                    <span className="font-bold text-[0.75rem] tracking-tight">{cat.name}</span>
                    <span className={`text-[0.55rem] font-black px-2 py-0.5 rounded-lg ${cat.slug === categoryName ? "bg-black text-white" : "bg-white/5 text-white/30 group-hover:bg-white/10"}`}>{categoryCounts[cat.dbKey] || 0}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid - Compact Cards */}
          <main className="flex-[3]">
            <div className="flex justify-between items-center mb-10 max-md:flex-col max-md:gap-4 max-md:text-center">
              <span className="text-white/40 font-bold text-[0.7rem] uppercase tracking-widest">{products.length} Mutants found</span>
              <select className="bg-white/[0.05] border border-white/10 text-white font-bold text-[0.65rem] px-5 py-3 rounded-xl outline-none focus:border-orm-gold/50 cursor-pointer">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20"><div className="w-8 h-8 border-t-2 border-orm-gold rounded-full animate-spin"></div></div>
            ) : (
              <div className="grid grid-cols-3 gap-6 max-[1200px]:grid-cols-2 max-md:grid-cols-1">
                {products.length > 0 ? products.map((item) => (
                  <div key={item.id} className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] overflow-hidden transition-all duration-700 cursor-pointer hover:border-orm-gold/30 hover:bg-white/[0.04] hover:-translate-y-2 shadow-xl" onClick={() => handleProductClick(item.slug)}>
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#121212]">
                      <img src={item.image.startsWith("http") ? item.image : `https://orm-backend-gejw.onrender.com${item.image}`} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-orm-dark via-transparent to-transparent opacity-60"></div>
                      {item.is_sale && <div className="absolute top-3 left-3 bg-white text-black font-black text-[0.5rem] px-2.5 py-1 rounded-full uppercase tracking-[0.2em] shadow-2xl z-10">Sale</div>}
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center z-10 transition-all opacity-0 group-hover:opacity-100" onClick={(e) => handleWishlistClick(e, item)}>
                        <FaHeart size={10} className={isInWishlist(item.id) ? "text-orm-gold" : "text-white"} />
                      </button>
                    </div>
                    <div className="p-5">
                      <span className="text-orm-gold text-[0.5rem] font-bold uppercase tracking-[0.2em] mb-2 block opacity-60">Premium Part</span>
                      <h4 className="text-base font-bold mb-3 text-white min-h-[2.5rem] line-clamp-2 group-hover:text-orm-gold transition-colors max-md:text-sm">{item.title}</h4>
                      <div className="flex items-end gap-2 mb-5">
                        <span className="text-white font-black text-lg tracking-tighter max-md:text-base">Rs. {Number(item.price).toLocaleString()}</span>
                        {item.old_price && <span className="text-white/20 line-through text-[0.7rem] mb-0.5 tracking-tighter">Rs. {Number(item.old_price).toLocaleString()}</span>}
                      </div>
                      <button className="w-full relative overflow-hidden group/btn bg-white/[0.05] border border-white/10 text-white py-3 rounded-xl font-black text-[0.6rem] uppercase tracking-[0.2em] transition-all hover:text-black hover:border-orm-gold" onClick={(e) => handleAddToCartBtn(e, item)}>
                        <span className="relative z-10 flex items-center justify-center gap-2"><FaShoppingCart size={10} /> Buy Mutant</span>
                        <div className="absolute inset-0 bg-orm-gold translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
                      </button>
                    </div>
                  </div>
                )) : <div className="col-span-full py-20 text-center"><p className="text-white/20 text-sm font-bold uppercase tracking-widest">No mutants found.</p></div>}
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductCategoryPage;
