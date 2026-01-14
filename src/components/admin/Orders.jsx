import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaFileExport,
  FaEye,
  FaSort,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get the Admin Token
    const token = localStorage.getItem("orm_admin_token");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    // 2. Fetch with Authorization Header
    fetch("http://127.0.0.1:8000/api/orders/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.message === "Unauthorized") {
          navigate("/admin-login");
        }
        setLoading(false);
      });
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      ` at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Unpaid") return !order.is_paid;
    if (activeTab === "Paid") return order.is_paid;
    return true;
  });

  // --- CLICK HANDLER ---
  const handleRowClick = (id) => {
    navigate(`/react-admin/orders/${id}`);
  };

  return (
    <div className="admin-page-container orders-page-wrapper">
      {/* HEADER */}
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Orders</h2>
          <p className="subtitle">Manage customer orders and shipments</p>
        </div>
        <div className="header-actions">
          <button className="admin-btn-secondary">
            <FaFileExport /> Export
          </button>
          <button className="admin-btn-primary">Create Order</button>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="label">Total Orders</span>
          <div className="value">{orders.length}</div>
        </div>
        <div className="stat-card">
          <span className="label">Total Revenue</span>
          <div className="value">
            Rs.{" "}
            {orders
              .reduce((acc, o) => acc + Number(o.total_price), 0)
              .toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <span className="label">Pending</span>
          <div className="value">{orders.filter((o) => !o.is_paid).length}</div>
        </div>
      </div>

      {/* TABS & FILTERS CONTAINER */}
      <div className="table-controls-wrapper">
        {/* TABS */}
        <div className="tabs-row">
          {["All", "Unpaid", "Paid", "Open"].map((tab) => (
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
        <div className="filters-row">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search orders..." />
          </div>
          <button className="filter-btn">
            <FaFilter /> Filter
          </button>
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
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Fulfillment</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    // CLICK EVENT ADDED HERE
                    onClick={() => handleRowClick(order.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <span className="order-id">#{order.id + 1000}</span>
                    </td>
                    <td className="date-cell">
                      {formatDate(order.created_at)}
                    </td>
                    <td>
                      <div className="customer-info">
                        <span className="name">{order.full_name}</span>
                        <span className="email">{order.email}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          order.is_paid ? "paid" : "pending"
                        }`}
                      >
                        <span className="dot"></span>
                        {order.is_paid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td>
                      <span className="status-badge unfulfilled">
                        <span className="dot"></span> Unfulfilled
                      </span>
                    </td>
                    <td>{order.items ? order.items.length : 0} items</td>
                    <td className="price-cell">
                      Rs. {Number(order.total_price).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No orders found
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

export default Orders;
