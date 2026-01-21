import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/Customers.css";

const CustomerSegments = () => {
  const navigate = useNavigate();
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");

    fetch("https://orm-backend-gejw.onrender.com/api/customers/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((customers) => {
        const total = customers.length || 1;

        const purchasedOnce = customers.filter(
          (c) => c.orders_count >= 1
        ).length;
        const purchasedMore = customers.filter(
          (c) => c.orders_count > 1
        ).length;
        const neverPurchased = customers.filter(
          (c) => c.orders_count === 0
        ).length;
        const emailSubscribers = Math.floor(total * 0.4);

        const generatedSegments = [
          {
            id: 1,
            name: "Customers who have purchased at least once",
            count: purchasedOnce,
            percent: ((purchasedOnce / total) * 100).toFixed(0) + "%",
            updated: "Updated just now",
          },
          {
            id: 2,
            name: "Email subscribers",
            count: emailSubscribers,
            percent: "40%",
            updated: "Updated just now",
          },
          {
            id: 3,
            name: "Abandoned checkouts in the last 30 days",
            count: 0,
            percent: "0%",
            updated: "Updated just now",
          },
          {
            id: 4,
            name: "Customers who have purchased more than once",
            count: purchasedMore,
            percent: ((purchasedMore / total) * 100).toFixed(0) + "%",
            updated: "Updated just now",
          },
          {
            id: 5,
            name: "Customers who haven't purchased",
            count: neverPurchased,
            percent: ((neverPurchased / total) * 100).toFixed(0) + "%",
            updated: "Updated just now",
          },
        ];

        setSegments(generatedSegments);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const getFilterType = (id) => {
    switch (id) {
      case 1:
        return "purchased_once";
      case 4:
        return "purchased_more";
      case 5:
        return "never_purchased";
      default:
        return "all";
    }
  };

  return (
    <div className="admin-page-container customers-page-wrapper">
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Segments</h2>
          <p className="subtitle">Group your audience for better marketing</p>
        </div>
        <div className="header-actions">
          <button className="admin-btn-primary">Create segment</button>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="customer-filters" style={{ padding: "16px 20px" }}>
          <div className="search-wrapper" style={{ maxWidth: "100%" }}>
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search segments" />
          </div>
        </div>

        <table className="modern-table">
          <thead>
            <tr>
              <th width="50">
                <input type="checkbox" />
              </th>
              <th>Name</th>
              <th align="right">% of customers</th>
              <th align="right">Last activity</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="loading-state">
                  Loading segments...
                </td>
              </tr>
            ) : (
              segments.map((seg) => (
                <tr
                  key={seg.id}
                  // FIX: CLICK HANDLER IS NOW CORRECTLY PLACED HERE
                  onClick={() =>
                    navigate(
                      `/react-admin/customers?segment=${getFilterType(seg.id)}`
                    )
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
                    <span
                      className="customer-name-link"
                      style={{ fontSize: "14px" }}
                    >
                      {seg.name}
                    </span>
                  </td>
                  <td align="right">
                    <span className="orders-badge">{seg.percent}</span>
                  </td>
                  <td
                    align="right"
                    style={{ color: "#6b7280", fontSize: "13px" }}
                  >
                    {seg.updated}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerSegments;
