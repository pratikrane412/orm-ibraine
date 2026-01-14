import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPrint,
  FaEllipsisH,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import "../../styles/admin/OrderDetails.css"; // We will create this

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Order Data
  useEffect(() => {
    // 1. Get Token
    const token = localStorage.getItem("orm_admin_token");

    // 2. Fetch with Authorization Header
    fetch(`http://127.0.0.1:8000/api/orders/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}` // <--- ADD THIS
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString([], {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Helper for Image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `http://127.0.0.1:8000${imagePath}`;
  };

  if (loading)
    return <div className="loading-state">Loading Order Details...</div>;
  if (!order) return <div className="loading-state">Order not found</div>;

  return (
    <div className="admin-page-container order-details-wrapper">
      {/* --- HEADER --- */}
      <div className="od-header">
        <div className="od-title-group">
          <Link to="/react-admin/orders" className="back-link">
            <FaArrowLeft /> Orders
          </Link>
          <div className="title-row">
            <h1>#{order.id + 1000}</h1>
            <span
              className={`status-badge ${order.is_paid ? "paid" : "pending"}`}
            >
              <span className="dot"></span>{" "}
              {order.is_paid ? "Paid" : "Payment Pending"}
            </span>
            <span className="status-badge unfulfilled">
              <span className="dot"></span> Unfulfilled
            </span>
          </div>
          <p className="order-date">
            {formatDate(order.created_at)} from Online Store
          </p>
        </div>

        <div className="od-actions">
          <button className="btn-secondary">Restock</button>
          <button className="btn-secondary">
            <FaPrint /> Print
          </button>
          <button className="btn-secondary">
            More actions <FaEllipsisH />
          </button>
        </div>
      </div>

      <div className="od-layout">
        {/* --- LEFT COLUMN (Items & Payment) --- */}
        <div className="od-main">
          {/* 1. ITEMS CARD */}
          <div className="od-card">
            <div className="card-header">
              <h3>Unfulfilled ({order.items.length})</h3>
              <span className="location">Location: Warehouse A</span>
            </div>

            <div className="order-items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-row">
                  <div className="item-img">
                    <img
                      src={getImageUrl(item.product.image)}
                      alt={item.product.title}
                    />
                  </div>
                  <div className="item-details"> 
                    <p className="item-name">{item.product.title}</p>
                    <p className="item-sku">SKU: {item.product.id}</p>
                  </div>
                  <div className="item-meta">
                    Rs. {Number(item.price).toLocaleString()} × {item.quantity}
                  </div>
                  <div className="item-total">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="card-footer">
              <button className="btn-primary">Mark as fulfilled</button>
            </div>
          </div>

          {/* 2. PAYMENT CARD */}
          <div className="od-card">
            <div className="card-header">
              <h3>
                Payment{" "}
                <span
                  className={`status-text ${
                    order.is_paid ? "paid" : "pending"
                  }`}
                >
                  {order.is_paid ? "Paid" : "Pending"}
                </span>
              </h3>
            </div>

            <div className="payment-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{order.items.length} items</span>
                <span>Rs. {Number(order.total_price).toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Standard</span>
                <span>Rs. 0.00</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>VAT 0%</span>
                <span>Rs. 0.00</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>Rs. {Number(order.total_price).toLocaleString()}</span>
              </div>
            </div>

            <div className="payment-footer">
              <div className="paid-by">
                <span>Paid by customer</span>
                <span>
                  Rs.{" "}
                  {order.is_paid
                    ? Number(order.total_price).toLocaleString()
                    : "0.00"}
                </span>
              </div>
              {!order.is_paid && (
                <button className="btn-secondary">Mark as Paid</button>
              )}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN (Customer Info) --- */}
        <div className="od-sidebar">
          {/* NOTES CARD */}
          <div className="od-card">
            <div className="card-header">
              <h3>Notes</h3>
              <button className="link-btn">Edit</button>
            </div>
            <p className="notes-text">No notes from customer</p>
          </div>

          {/* CUSTOMER CARD */}
          <div className="od-card">
            <div className="card-header">
              <h3>Customer</h3>
            </div>
            <div className="customer-details">
              <p className="cust-link">{order.full_name}</p>
              <p className="cust-orders">1 order</p>
            </div>

            <div className="divider"></div>

            <div className="contact-info">
              <h4>Contact information</h4>
              <p className="icon-row">
                <FaEnvelope />{" "}
                <a href={`mailto:${order.email}`}>{order.email}</a>
              </p>
              <p className="icon-row">
                <FaPhone /> {order.phone}
              </p>
            </div>

            <div className="divider"></div>

            <div className="shipping-address">
              <h4>Shipping Address</h4>
              <p>{order.full_name}</p>
              <p>{order.address}</p>
              <p>
                {order.city}, {order.state} {order.zip_code}
              </p>
              <p className="country">India</p>
              <a href="#" className="map-link">
                View map
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
