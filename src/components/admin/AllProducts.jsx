import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import "../../styles/admin/AllProducts.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSaleStatus, setSelectedSaleStatus] = useState("All");

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
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSale =
      selectedSaleStatus === "All"
        ? true
        : selectedSaleStatus === "On Sale"
          ? product.is_sale === true
          : product.is_sale === false;

    return matchesSearch && matchesCategory && matchesSale;
  });

  // --- DELETE LOGIC (UPDATED TO USE SLUG) ---
  const handleDelete = async (slug, id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Since backend uses lookup_field='slug', we must delete via slug
        const response = await fetch(
          `https://orm-backend-gejw.onrender.com/api/products/${slug}/`,
          { method: "DELETE" },
        );
        if (response.ok) {
          // Update local state using ID for efficiency
          setProducts(products.filter((product) => product.id !== id));
        } else {
          alert("Failed to delete. The product might have dependencies.");
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
      <div className="admin-header-row">
        <div className="header-text">
          <h2>All Products</h2>
          <p className="subtitle">
            Manage inventory ({filteredProducts.length})
          </p>
        </div>

        <div className="header-actions">
          <div className="header-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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

          <select
            className="header-select"
            value={selectedSaleStatus}
            onChange={(e) => setSelectedSaleStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="On Sale">On Sale</option>
            <option value="Regular">Regular</option>
          </select>

          <Link to="/react-admin/add-product" className="admin-btn-primary">
            <FaPlus /> <span>Add</span>
          </Link>
        </div>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <div className="loading-state">Loading...</div>
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
                        {/* Displaying Slug for Admin clarity */}
                        <span className="product-sku">
                          URL: /{product.slug}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{product.category}</span>
                    </td>
                    <td>
                      <span
                        className={`inventory-badge ${product.stock_quantity > 0 ? "instock" : "outofstock"}`}
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
                      <span
                        className={`status-badge ${product.is_sale ? "sale" : "active"}`}
                      >
                        <span className="dot"></span>{" "}
                        {product.is_sale ? "On Sale" : "Regular"}
                      </span>
                    </td>
                    <td align="right">
                      <div className="actions-cell">
                        {/* EDIT BUTTON (USES SLUG) */}
                        <button
                          className="action-btn edit"
                          onClick={() =>
                            navigate(
                              `/react-admin/edit-product/${product.slug}`,
                            )
                          }
                        >
                          <FaEdit />
                        </button>
                        {/* DELETE BUTTON (USES SLUG) */}
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(product.slug, product.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
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
