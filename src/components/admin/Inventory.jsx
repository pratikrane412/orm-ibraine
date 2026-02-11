import React, { useState, useEffect } from "react";
import { FaSearch, FaSave } from "react-icons/fa";
import "../../styles/admin/Inventory.css";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [changes, setChanges] = useState({});

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  const handleStockChange = (id, value) => {
    const newValue = parseInt(value) || 0;
    setChanges((prev) => ({ ...prev, [id]: { stock_quantity: newValue } }));
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock_quantity: newValue } : p)),
    );
  };

  const saveStock = async (product) => {
    const productId = product.id;
    const productSlug = product.slug;

    if (!changes[productId]) return;

    // 1. GET THE CORRECT TOKEN NAME FROM YOUR SCREENSHOT
    const token = localStorage.getItem("orm_admin_token");

    if (!token) {
      alert(
        "Authentication Error: No token found. Please log out and log in again.",
      );
      return;
    }

    try {
      const response = await fetch(
        `https://orm-backend-gejw.onrender.com/api/products/${productSlug}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // The backend expects "Token <key>"
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(changes[productId]),
        },
      );

      if (response.ok) {
        alert("Inventory Updated!");
        const newChanges = { ...changes };
        delete newChanges[productId];
        setChanges(newChanges);
      } else {
        const errData = await response.json();
        console.error("Backend Error:", errData);
        alert(`Server Error: ${errData.detail || "Update failed"}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Connection to server failed.");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toString().includes(searchTerm),
  );

  return (
    <div className="admin-page-container inventory-wrapper">
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Inventory</h2>
          <p className="subtitle">Manage stock availability</p>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="inventory-filters">
          <div className="tabs-row-inv">
            <button className="tab-btn active">All Products</button>
          </div>

          <div className="search-box-inv">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : (
          <table className="modern-table inventory-table">
            <thead>
              <tr>
                <th width="60">Image</th>
                <th>Product</th>
                <th>SKU</th>
                <th align="center">Available</th>
                <th width="80">On Hand</th>
                <th width="50">Save</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const stock = changes[p.id]?.stock_quantity ?? p.stock_quantity;
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="table-img small">
                        <img src={getImageUrl(p.image)} alt={p.title} />
                      </div>
                    </td>
                    <td className="product-name-cell">
                      <strong>{p.title}</strong>
                      <div style={{ fontSize: "10px", color: "#888" }}>
                        /{p.slug}
                      </div>
                    </td>
                    <td className="sku-text">ORM-{p.id}</td>
                    <td align="center">
                      <input
                        type="number"
                        className="stock-input"
                        value={stock}
                        onChange={(e) =>
                          handleStockChange(p.id, e.target.value)
                        }
                      />
                    </td>
                    <td align="center">
                      <span className="read-only-stat">{stock}</span>
                    </td>
                    <td>
                      {changes[p.id] && (
                        <button
                          className="save-icon-btn active"
                          onClick={() => saveStock(p)}
                        >
                          <FaSave />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Inventory;
