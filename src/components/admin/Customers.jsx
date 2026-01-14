import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFileExport,
  FaSort,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../../styles/admin/Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    fetch("http://127.0.0.1:8000/api/customers/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      (c.first_name + " " + c.last_name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats Calculation
  const totalSpent = customers.reduce(
    (acc, c) => acc + Number(c.total_spent || 0),
    0
  );

  return (
    <div className="admin-page-container customers-page-wrapper">
      {/* HEADER */}
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Customers</h2>
          <p className="subtitle">
            View and manage your customer relationships
          </p>
        </div>
        <div className="header-actions">
          <button className="admin-btn-secondary">
            <FaFileExport /> Export
          </button>
          <button className="admin-btn-primary">Add customer</button>
        </div>
      </div>

      {/* STATS OVERVIEW (New) */}
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
          <div className="value">{(customers.length / 2).toFixed(0)}</div>{" "}
          {/* Mocked stat */}
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="table-wrapper">
        {/* FILTERS */}
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

        {/* TABLE */}
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

                    {/* AVATAR + NAME + EMAIL */}
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
                      {/* Subscription Status */}
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
