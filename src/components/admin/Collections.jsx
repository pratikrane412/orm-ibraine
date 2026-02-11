import React, { useState, useEffect } from "react";
import { FaPlus, FaImage } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/admin/Collections.css";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get the token using the specific name found in your LocalStorage
    const token = localStorage.getItem("orm_admin_token");

    setLoading(true);

    // 2. Add the Authorization header to the request
    fetch("https://orm-backend-gejw.onrender.com/api/collections/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}` // This is the fix for 401
      }
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized: Please log in again.");
        }
        return res.json();
      })
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Collections Error:", err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (collection) => {
    if (collection.image) {
      return collection.image.startsWith("http")
        ? collection.image
        : `https://orm-backend-gejw.onrender.com${collection.image}`;
    }
    if (collection.first_product_image) {
      return `https://orm-backend-gejw.onrender.com${collection.first_product_image}`;
    }
    return null;
  };

  return (
    <div className="admin-page-container collections-wrapper">
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Collections</h2>
          <p className="subtitle">Manage product groups and categories</p>
        </div>
        <div className="header-actions">
          <Link
            to="/react-admin/products/collections/new"
            className="admin-btn-primary"
          >
            <FaPlus /> Create collection
          </Link>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="tabs-row">
          <button className="tab-item active">All</button>
          <button className="tab-add">+</button>
        </div>

        {loading ? (
          <div className="loading-state">Loading...</div>
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
                collections.map((col) => (
                  <tr
                    key={col.id}
                    onClick={() =>
                      navigate(`/react-admin/products/collections/${col.id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td>
                      <div className="collection-thumb">
                        {getImageUrl(col) ? (
                          <img src={getImageUrl(col)} alt={col.title} />
                        ) : (
                          <div className="no-img-icon">
                            <FaImage />
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="collection-title">{col.title}</span>
                    </td>
                    <td align="right" style={{ color: "#6b7280" }}>
                      {col.product_count || 0} products
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    <div style={{ padding: "40px", textAlign: "center" }}>
                      <p>You haven't created any collections yet.</p>
                      <Link
                        to="/react-admin/products/collections/new"
                        style={{ color: "#fbb03b", fontWeight: "bold" }}
                      >
                        Create one now
                      </Link>
                    </div>
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
