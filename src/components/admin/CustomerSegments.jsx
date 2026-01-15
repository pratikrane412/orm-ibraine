import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/admin/Customers.css"; // Reusing the same premium styles

const CustomerSegments = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");

    // 1. Fetch All Customers to calculate segments
    fetch("http://127.0.0.1:8000/api/customers/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((customers) => {
        const total = customers.length || 1; // Avoid division by zero

        // 2. Logic to categorize customers
        const purchasedOnce = customers.filter(
          (c) => c.orders_count >= 1
        ).length;
        const purchasedMore = customers.filter(
          (c) => c.orders_count > 1
        ).length;
        const neverPurchased = customers.filter(
          (c) => c.orders_count === 0
        ).length;

        // Mock data for things we don't track yet (Email list / Abandoned carts)
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
            updated: "Created on Nov 8, 2024",
          },
          {
            id: 3,
            name: "Abandoned checkouts in the last 30 days",
            count: 0,
            percent: "0%",
            updated: "Created on Nov 8, 2024",
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

  return (
    <div className="admin-page-container customers-page-wrapper">
      {/* HEADER */}
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Segments</h2>
          <p className="subtitle">Group your audience for better marketing</p>
        </div>
        <div className="header-actions">
          <button className="admin-btn-primary">Create segment</button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="table-wrapper">
        {/* SEARCH BAR (Full Width like image) */}
        <div className="customer-filters" style={{ padding: "16px 20px" }}>
          <div className="search-wrapper" style={{ maxWidth: "100%" }}>
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search segments" />
          </div>
        </div>

        {/* SEGMENTS LIST */}
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
                <tr key={seg.id}>
                  <td>
                    <input type="checkbox" />
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
