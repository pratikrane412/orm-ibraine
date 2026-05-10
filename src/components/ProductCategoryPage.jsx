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
  thar: {
    title: "Mahindra Thar & Roxx",
    backendCategory: "Thar",
    headerBg: "/image/banner.jpg",
  },
  scorpio: {
    title: "Scorpio",
    backendCategory: "Scorpio",
    headerBg: "/image/banner.jpg",
  },
  hilux: {
    title: "Toyota Hilux",
    backendCategory: "Hilux",
    headerBg: "/image/banner.jpg",
  },
  fortuner: {
    title: "Toyota Fortuner",
    backendCategory: "Fortuner",
    headerBg: "/image/banner.jpg",
  },
  jimny: {
    title: "Suzuki Jimny",
    backendCategory: "Jimny",
    headerBg: "/image/banner.jpg",
  },
  defender: {
    title: "Range Rover Defender",
    backendCategory: "Defender",
    headerBg: "/image/banner.jpg",
  },
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

  const currentCategory =
    categoryConfig[categoryName] || categoryConfig["thar"];

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

  // This function expects a slug string
  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleAddToCartBtn = (e, item) => {
    e.stopPropagation();
    addToCart(item);
    alert(`${item.title} added to cart!`);
  };

  const handleWishlistClick = (e, item) => {
    e.stopPropagation();
    addToWishlist(item);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div
        className="h-[300px] bg-cover bg-center relative flex items-center justify-start pl-[10%] mt-[80px] md:h-[300px] max-md:h-[200px] max-md:px-[20px] max-md:justify-center max-md:text-center"
        style={{ backgroundImage: `url(${currentCategory.headerBg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-[2]">
          <h1 className="font-merriweather text-[4rem] text-white uppercase max-md:text-[2rem] max-md:leading-[1.2] max-sm:text-[1.7rem]">
            {currentCategory.title}{" "}
            <span className="text-orm-gold">Accessories</span>
          </h1>
        </div>
      </div>

      <div
        className="relative w-full bg-cover bg-center bg-no-repeat py-[80px] max-md:py-[40px]"
        style={{ backgroundImage: `url(${roadBg})` }}
      >
        <div className="absolute inset-0 bg-black/20 z-[1] max-md:bg-black/35"></div>

        <div className="flex w-[90%] max-w-[1400px] mx-auto gap-[40px] relative z-[2] max-md:flex-col max-md:w-[95%] max-md:gap-[30px]">
          <aside className="flex-1 max-w-[320px] bg-[#0f0f0f]/95 p-[30px_20px] rounded-[12px] border border-[#222] h-fit max-md:max-w-none max-md:p-[20px] max-md:rounded-[10px] max-sm:p-[18px]">
            <div className="flex items-center bg-black border border-[#333] p-[10px_15px] rounded-[8px] mb-[30px]">
              <FaSearch className="text-orm-gold mr-[12px]" />
              <input type="text" placeholder="Search Product" className="bg-transparent border-none text-white outline-none w-full" />
            </div>

            <h3 className="font-merriweather text-[1.4rem] mb-[20px] text-white max-md:text-[1.2rem] max-md:text-center">
              Product <span className="text-orm-gold">Categories:</span>
            </h3>

            <ul className="list-none p-0">
              {sidebarCategories.map((cat, index) => (
                <li
                  key={index}
                  className={`flex justify-between p-[12px_15px] border-b border-[#222] font-lato text-white cursor-pointer transition-all duration-300 rounded-[5px] hover:text-orm-gold hover:bg-orm-gold/5 max-md:p-[12px] max-md:text-[0.95rem] ${cat.slug === categoryName ? "bg-orm-gold !text-black font-bold" : ""}`}
                  onClick={() => handleCategoryClick(cat.slug)}
                >
                  <span>{cat.name}</span>
                  <span className="count">
                    {categoryCounts[cat.dbKey] || 0}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <main className="flex-[3]">
            <div className="flex justify-between items-center mb-[20px] text-[#ccc] max-md:flex-col max-md:items-start max-md:gap-[15px] max-md:text-[0.9rem]">
              <span>Showing {products.length} Results</span>
              <select className="bg-black border border-[#333] text-white p-[8px_15px] rounded-[5px] max-md:w-full">
                <option>Default Sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <hr className="border-[#333] mb-[30px]" />

            {loading ? (
              <div className="loading">Loading {currentCategory.title}...</div>
            ) : (
              <div className="grid grid-cols-3 gap-[25px] max-[1100px]:grid-cols-2 max-md:grid-cols-1 max-md:gap-[20px]">
                {products.length > 0 ? (
                  products.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-[#0a0a0a]/95 border border-[#222] rounded-[12px] overflow-hidden relative transition-all duration-400 cursor-pointer hover:border-orm-gold hover:translate-y-[-8px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-md:rounded-[10px]"
                      // CHANGE: Passing item.slug instead of item.id
                      onClick={() => handleProductClick(item.slug)}
                    >
                      {item.is_sale && <span className="absolute top-[15px] left-0 bg-orm-gold text-black p-[5px_15px] font-bold rounded-r-[20px] z-[3]">Sale</span>}
                      <div className="relative h-[230px] opacity-40 transition-opacity duration-400 group-hover:opacity-100 max-md:h-[200px] max-sm:h-[180px]">
                        <img
                          src={
                            item.image.startsWith("http")
                              ? item.image
                              : `https://orm-backend-gejw.onrender.com${item.image}`
                          }
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          className="absolute top-[12px] right-[12px] bg-white border-none w-[35px] h-[35px] rounded-full flex items-center justify-center z-[3] max-md:w-[32px] max-md:h-[32px]"
                          onClick={(e) => handleWishlistClick(e, item)}
                          style={{
                            color: isInWishlist(item.id) ? "#fbb03b" : "#333",
                          }}
                        >
                          <FaHeart />
                        </button>
                      </div>

                      <div className="p-[20px] max-sm:p-[16px]">
                        <h4 className="font-merriweather text-[1.2rem] mb-[10px] text-white transition-colors duration-300 group-hover:text-orm-gold max-md:text-[1.05rem]">{item.title}</h4>
                        <div className="price-row">
                          <span className="text-white font-bold text-[1.1rem] transition-colors duration-300 group-hover:text-orm-gold max-md:text-[1rem]">
                            Rs. {Number(item.price).toLocaleString()}
                          </span>
                          {item.old_price && (
                            <span className="text-[#666] line-through text-[0.9rem] ml-[10px]">
                              Rs. {Number(item.old_price).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <button
                          className="w-full bg-white p-[12px] font-bold rounded-[6px] border-none mt-[15px] cursor-pointer transition-all duration-300 hover:bg-orm-gold max-md:p-[14px] max-md:text-[0.95rem]"
                          onClick={(e) => handleAddToCartBtn(e, item)}
                        >
                          <FaShoppingCart /> Add to Cart
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-products">No products found.</div>
                )}
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

