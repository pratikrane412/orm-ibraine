import React, { useState, useEffect } from "react";
import { FaPlus, FaImage } from "react-icons/fa";
import "../../styles/admin/Collections.css"; // Create this next

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Products
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((products) => {
        // 2. Group By Category
        const grouped = {};

        products.forEach((p) => {
          if (!grouped[p.category]) {
            grouped[p.category] = {
              title: p.category, // e.g., "Thar"
              count: 0,
              image: p.image, // Use first product image as collection thumbnail
            };
          }
          grouped[p.category].count += 1;
        });

        // Convert object to array
        setCollections(Object.values(grouped));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith("http")
      ? imagePath
      : `http://127.0.0.1:8000${imagePath}`;
  };

  return (
    <div className="admin-page-container collections-wrapper">
      {/* HEADER */}
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Collections</h2>
          <p className="subtitle">Group your products into categories</p>
        </div>
        <div className="header-actions">
          <button className="admin-btn-primary">
            <FaPlus /> Create collection
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        {/* TABS */}
        <div className="tabs-row">
          <button className="tab-item active">All</button>
          <button className="tab-add">+</button>
        </div>

        {loading ? (
          <div className="loading-state">Loading Collections...</div>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th width="50">
                  <input type="checkbox" />
                </th>
                <th width="80">Image</th>
                <th>Title</th>
                <th align="right">Products</th>
              </tr>
            </thead>
            <tbody>
              {collections.length > 0 ? (
                collections.map((col, idx) => (
                  <tr key={idx}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="collection-thumb">
                        {col.image ? (
                          <img src={getImageUrl(col.image)} alt={col.title} />
                        ) : (
                          <div className="no-img-icon">
                            <FaImage />
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="collection-title">
                        {/* Map backend keys to readable names if needed */}
                        {col.title === "Thar"
                          ? "Mahindra Thar Accessories"
                          : col.title === "Jimny"
                          ? "Suzuki Jimny Accessories"
                          : col.title + " Accessories"}
                      </span>
                    </td>
                    <td align="right" style={{ color: "#6b7280" }}>
                      {col.count}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No collections found
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

export default Collections;
