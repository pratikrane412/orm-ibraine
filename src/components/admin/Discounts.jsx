import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaTag, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/admin/Discounts.css"; // We will create this

const Discounts = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    fetch("http://127.0.0.1:8000/api/coupons/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCoupons(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // Determine Status (Active, Scheduled, Expired)
  const getStatus = (coupon) => {
    const now = new Date();
    const start = new Date(coupon.valid_from);
    const end = new Date(coupon.valid_to);

    if (!coupon.active) return "Inactive";
    if (now > end) return "Expired";
    if (now < start) return "Scheduled";
    return "Active";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    const token = localStorage.getItem("orm_admin_token");
    await fetch(`http://127.0.0.1:8000/api/coupons/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch = c.code
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const status = getStatus(c);
    if (activeTab === "All") return matchesSearch;
    return matchesSearch && status === activeTab;
  });

  return (
    <div className="admin-page-container discount-wrapper">
      {/* HEADER */}
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Discounts</h2>
          <p className="subtitle">Manage coupon codes and promotions</p>
        </div>
        <div className="header-actions">
          <Link to="/react-admin/discounts/new" className="admin-btn-primary">
            <FaPlus /> Create discount
          </Link>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="table-wrapper">
        {/* TABS */}
        <div className="tabs-row">
          {["All", "Active", "Scheduled", "Expired"].map((tab) => (
            <button
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FILTERS */}
        <div className="discount-filters">
          <div className="search-box">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Search discounts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="loading-state">Loading Discounts...</div>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th width="40">
                  <input type="checkbox" />
                </th>
                <th>Title</th>
                <th>Status</th>
                <th>Discount</th>
                <th>Used</th>
                <th align="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.length > 0 ? (
                filteredCoupons.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="code-cell">
                        <span className="code-text">{c.code}</span>
                        <span className="code-desc">
                          {c.discount_percentage}% off entire order
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${getStatus(c).toLowerCase()}`}
                      >
                        <span className="dot"></span> {getStatus(c)}
                      </span>
                    </td>
                    <td>{c.discount_percentage}%</td>
                    <td>0 used</td>{" "}
                    {/* Backend needs 'used_count' field for real data */}
                    <td align="right">
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(c.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No discounts found
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

export default Discounts;
