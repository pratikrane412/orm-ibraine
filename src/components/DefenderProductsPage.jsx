import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchTharProducts } from "../api/mockData"; 
import { FaShoppingCart, FaHeart, FaSearch, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/DefenderProductsPage.css"; 

const categories = [
  { name: "Mahindra Thar & Roxx", count: 20, active: false, path: "/products/thar" },
  { name: "Scorpio", count: 20, active: false, path: "/products/scorpio" }, 
  { name: "Toyota Hilux", count: 20, active: false, path: "/products/hilux" },
  { name: "Toyota Fortuner", count: 20, active: false, path: "/products/fortuner" },
  { name: "Suzuki Jimny", count: 20, active: false, path: "/products/jimny" },
  { name: "Range Rover Defender", count: 20, active: true, path: "/products/defender" },//Active
];

const DefenderProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTharProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleCategoryClick = (path) => {
    navigate(path);
    // Scroll to top of new page
    window.scrollTo(0, 0);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HEADER - Same as Thar Page */}
      <div className="defender-header">
        <div className="header-overlay"></div>
        <div className="header-content">
          <h1>Our <span className="highlight">Product</span></h1>
        </div>
      </div>

      <div className="main-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search Product" />
          </div>

          <h3 className="sidebar-title">Product <span className="highlight">Categories:</span></h3>
          
          <ul className="category-list">
            {categories.map((cat, index) => (
              <li key={index} className={cat.active ? "active" : ""} onClick={() => handleCategoryClick(cat.path)}>
                <span>{cat.name}</span>
                <span className="count">{cat.count}</span>
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
            <div className="loading">Loading Defender Products...</div>
          ) : (
            <div className="shop-grid">
              {products.map((item) => (
                <div key={item.id} className="shop-card">
                  {item.isSale && <span className="tag sale">Sale</span>}
                  
                  <div className="card-img">
                    <img src={item.image} alt={item.title} />
                    <button className="wishlist-icon"><FaHeart /></button>
                  </div>

                  <div className="card-details">
                    <h4>{item.title}</h4>
                    <div className="price-row">
                      <span className="price">Rs. {item.price.toLocaleString()}</span>
                      <span className="old-price">Rs. {item.oldPrice.toLocaleString()}</span>
                    </div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color="#fbb03b" size={12} />
                      ))}
                    </div>
                    <button className="cart-btn">
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DefenderProductsPage;