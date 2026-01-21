import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFileExport,
  FaSort,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import "../../styles/admin/Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // FIX: Read URL params for filtering
  const [searchParams] = useSearchParams();
  const segmentFilter = searchParams.get("segment");

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    fetch("https://orm-backend-gejw.onrender.com/api/customers/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredCustomers = customers.filter((c) => {
    // 1. Search Logic
    const matchesSearch =
      (c.first_name + " " + c.last_name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. FIX: Segment Filtering Logic
    let matchesSegment = true;
    if (segmentFilter === "purchased_once")
      matchesSegment = c.orders_count >= 1;
    if (segmentFilter === "purchased_more") matchesSegment = c.orders_count > 1;
    if (segmentFilter === "never_purchased")
      matchesSegment = c.orders_count === 0;

    return matchesSearch && matchesSegment;
  });

  const totalSpent = customers.reduce(
    (acc, c) => acc + Number(c.total_spent || 0),
    0
  );

  return (
    <div className="admin-page-container customers-page-wrapper">
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Customers</h2>
          {segmentFilter ? (
            <p className="subtitle" style={{ color: "#fbb03b" }}>
              Filter: {segmentFilter.replace("_", " ").toUpperCase()}
            </p>
          ) : (
            <p className="subtitle">
              View and manage your customer relationships
            </p>
          )}
        </div>
        <div className="header-actions">
          <button className="admin-btn-secondary">
            <FaFileExport /> Export
          </button>
          <button className="admin-btn-primary">Add customer</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="label">Total Customers</span>
          <div className="value">{customers.length}</div>
        </div>
        <div className="stat-card">
          <span className="label">Lifetime Value</span>
          <div className="value">Rs. {totalSpent.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <span className="label">Subscribers</span>
          <div className="value">{(customers.length / 2).toFixed(0)}</div>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="customer-filters">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <FaSort /> Sort
          </button>
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
                <th>Customer</th>
                <th>Status</th>
                <th>Location</th>
                <th>Orders</th>
                <th align="right">Amount Spent</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="customer-profile">
                        <div className="avatar">
                          {cust.first_name ? cust.first_name[0] : <FaUser />}
                        </div>
                        <div className="info">
                          <span className="name">
                            {cust.first_name} {cust.last_name}
                          </span>
                          <span className="email">{cust.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-pill ${
                          cust.id % 2 === 0 ? "active" : "inactive"
                        }`}
                      >
                        <span className="dot"></span>
                        {cust.id % 2 === 0 ? "Subscribed" : "Not Subscribed"}
                      </span>
                    </td>
                    <td>
                      <div className="location-cell">
                        <FaMapMarkerAlt className="icon" /> {cust.location}
                      </div>
                    </td>
                    <td>
                      <span className="orders-badge">
                        {cust.orders_count} Orders
                      </span>
                    </td>
                    <td className="price-cell">
                      Rs. {Number(cust.total_spent || 0).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No customers found
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

export default Customers;
