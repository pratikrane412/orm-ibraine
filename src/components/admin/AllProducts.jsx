import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import "../../styles/admin/AllProducts.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSaleStatus, setSelectedSaleStatus] = useState("All");

  // FIXED: Value matches Django Backend | Label matches UI
  const categoryOptions = [
    { label: "All Categories", value: "All" },
    { label: "Mahindra Thar & Roxx", value: "Thar" },
    { label: "Scorpio", value: "Scorpio" },
    { label: "Toyota Hilux", value: "Hilux" },
    { label: "Toyota Fortuner", value: "Fortuner" },
    { label: "Suzuki Jimny", value: "Jimny" },
    { label: "Range Rover Defender", value: "Defender" },
  ];

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Check console to see if data arrives
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // --- FILTER LOGIC ---
  const filteredProducts = products.filter((product) => {
    // 1. Search (Case insensitive)
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // 2. Category (Compare with Backend Value "Thar", "Scorpio", etc.)
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    // 3. Status (Boolean check)
    const matchesSale =
      selectedSaleStatus === "All"
        ? true
        : selectedSaleStatus === "On Sale"
        ? product.is_sale === true
        : product.is_sale === false;

    return matchesSearch && matchesCategory && matchesSale;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `https://orm-backend-gejw.onrender.com/api/products/${id}/`,
          { method: "DELETE" }
        );
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== id));
        } else {
          alert("Failed to delete. Check backend console.");
        }
      } catch (error) {
        alert("Server Error");
      }
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  return (
    <div className="admin-page-container">
      {/* HEADER */}
      <div className="admin-header-row">
        <div className="header-text">
          <h2>All Products</h2>
          <p className="subtitle">
            Manage inventory ({filteredProducts.length})
          </p>
        </div>

        <div className="header-actions">
          {/* SEARCH */}
          <div className="header-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* CATEGORY FILTER */}
          <select
            className="header-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* STATUS FILTER */}
          <select
            className="header-select"
            value={selectedSaleStatus}
            onChange={(e) => setSelectedSaleStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="On Sale">On Sale</option>
            <option value="Regular">Regular</option>
          </select>

          {/* ADD BUTTON */}
          <Link to="/react-admin/add-product" className="admin-btn-primary">
            <FaPlus /> <span>Add</span>
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div> Loading...
          </div>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th width="70">Image</th>
                <th>Product Information</th>
                <th>Category</th>
                <th>Inventory</th>
                <th>Price</th>
                <th>Status</th>
                <th align="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-thumbnail">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.title}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="product-meta">
                        <span className="product-title">{product.title}</span>
                        <span className="product-sku">ID: #{product.id}</span>
                      </div>
                    </td>
                    {/* Render the Readable Category Label if needed, or just the backend key */}
                    <td>
                      <span className="category-tag">{product.category}</span>
                    </td>
                    <td>
                      <span
                        className={`inventory-badge ${
                          product.stock_quantity > 0 ? "instock" : "outofstock"
                        }`}
                      >
                        {product.stock_quantity > 0
                          ? `${product.stock_quantity} in stock`
                          : "Out of stock"}
                      </span>
                    </td>
                    <td>
                      <div className="price-tag">
                        Rs. {Number(product.price).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      {product.is_sale ? (
                        <span className="status-badge sale">
                          <span className="dot"></span> On Sale
                        </span>
                      ) : (
                        <span className="status-badge active">
                          <span className="dot"></span> Regular
                        </span>
                      )}
                    </td>
                    <td align="right">
                      <div className="actions-cell">
                        <button
                          className="action-btn edit"
                          title="Edit Product"
                          onClick={() =>
                            navigate(`/react-admin/edit-product/${product.id}`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
