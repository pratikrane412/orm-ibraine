import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchProductsByCategory } from "../api/client";
import { FaShoppingCart, FaHeart, FaSearch, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductCategoryPage.css";

// --- CONFIGURATION OBJECT ---
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

// Updated Sidebar Data with 'dbKey' to match Backend Category names
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

  // NEW STATE: Store counts like { Thar: 5, Scorpio: 2 }
  const [categoryCounts, setCategoryCounts] = useState({});

  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const currentCategory =
    categoryConfig[categoryName] || categoryConfig["thar"];

  // 1. Fetch Products for MAIN CONTENT
  useEffect(() => {
    setLoading(true);
    fetchProductsByCategory(currentCategory.backendCategory).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [categoryName]);

  // 2. NEW: Fetch Category Counts for SIDEBAR
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category-counts/")
      .then((res) => res.json())
      .then((data) => {
        setCategoryCounts(data);
      })
      .catch((err) => console.error("Error fetching counts:", err));
  }, []);

  const handleCategoryClick = (slug) => {
    navigate(`/products/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleAddToCartBtn = (e, item) => {
    e.stopPropagation();
    addToCart(item);
    alert(`${item.title} added to cart!`);
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

      <div className="main-layout">
        {/* SIDEBAR */}
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
                {/* 3. DISPLAY DYNAMIC COUNT (Default to 0 if undefined) */}
                <span className="count">{categoryCounts[cat.dbKey] || 0}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* PRODUCT GRID */}
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
            <div className="loading">
              Loading {currentCategory.title} Products...
            </div>
          ) : (
            <div className="shop-grid">
              {products.length > 0 ? (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="shop-card"
                    onClick={() => handleProductClick(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.is_sale && <span className="tag sale">Sale</span>}

                    <div className="card-img">
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `http://127.0.0.1:8000${item.image}`
                        }
                        alt={item.title}
                      />
                      <button
                        className="wishlist-icon"
                        onClick={stopPropagation}
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
                      <div className="stars">
                        {[...Array(Math.round(item.rating || 5))].map(
                          (_, i) => (
                            <FaStar key={i} color="#fbb03b" size={12} />
                          ),
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
                <div className="no-products">
                  No products found for this category.
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProductCategoryPage;
