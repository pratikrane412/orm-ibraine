import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/ProfilePage.css"; // Reuse existing styles or create new

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/my-orders/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [token]);

  if (loading) return <div className="loading-state">Loading Orders...</div>;

  return (
    <div className="profile-content-box">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          <table className="modern-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id + 1000}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`status-badge ${order.is_paid ? "paid" : "pending"}`}
                    >
                      {order.is_paid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td>Rs. {Number(order.total_price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
