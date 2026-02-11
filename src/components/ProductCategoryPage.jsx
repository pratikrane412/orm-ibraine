import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchProductsByCategory } from "../api/client";
import { FaShoppingCart, FaHeart, FaSearch, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "../styles/ProductCategoryPage.css";

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
    <div className="page-wrapper">
      <Navbar />

      <div
        className="product-page-header"
        style={{ backgroundImage: `url(${currentCategory.headerBg})` }}
      >
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1>
            {currentCategory.title}{" "}
            <span className="highlight">Accessories</span>
          </h1>
        </div>
      </div>

      <div
        className="content-area-wrapper"
        style={{ backgroundImage: `url(${roadBg})` }}
      >
        <div className="content-dark-overlay"></div>

        <div className="main-layout">
          <aside className="sidebar">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search Product" />
            </div>

            <h3 className="sidebar-title">
              Product <span className="highlight">Categories:</span>
            </h3>

            <ul className="category-list">
              {sidebarCategories.map((cat, index) => (
                <li
                  key={index}
                  className={cat.slug === categoryName ? "active" : ""}
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

          <main className="product-content">
            <div className="results-bar">
              <span>Showing {products.length} Results</span>
              <select className="sort-dropdown">
                <option>Default Sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <hr className="divider" />

            {loading ? (
              <div className="loading">Loading {currentCategory.title}...</div>
            ) : (
              <div className="shop-grid">
                {products.length > 0 ? (
                  products.map((item) => (
                    <div
                      key={item.id}
                      className="shop-card"
                      // CHANGE: Passing item.slug instead of item.id
                      onClick={() => handleProductClick(item.slug)}
                    >
                      {item.is_sale && <span className="tag sale">Sale</span>}
                      <div className="card-img">
                        <img
                          src={
                            item.image.startsWith("http")
                              ? item.image
                              : `https://orm-backend-gejw.onrender.com${item.image}`
                          }
                          alt={item.title}
                        />
                        <button
                          className="wishlist-icon"
                          onClick={(e) => handleWishlistClick(e, item)}
                          style={{
                            color: isInWishlist(item.id) ? "#fbb03b" : "#333",
                          }}
                        >
                          <FaHeart />
                        </button>
                      </div>

                      <div className="card-details">
                        <h4>{item.title}</h4>
                        <div className="price-row">
                          <span className="price">
                            Rs. {Number(item.price).toLocaleString()}
                          </span>
                          {item.old_price && (
                            <span className="old-price">
                              Rs. {Number(item.old_price).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <button
                          className="cart-btn"
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
