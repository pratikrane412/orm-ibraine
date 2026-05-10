import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/my-orders/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [token]);

  if (loading) return <div className="p-[40px] text-center text-[#666]">Loading Orders...</div>;

  return (
    <div className="bg-white p-[25px] rounded-[12px] border border-[#e5e7eb] shadow-sm">
      <h2 className="text-[1.5rem] font-bold text-[#111] mb-[20px]">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-[#666]">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="p-[15px] text-left text-[0.85rem] font-bold text-[#374151] uppercase tracking-wider">Order ID</th>
                <th className="p-[15px] text-left text-[0.85rem] font-bold text-[#374151] uppercase tracking-wider">Date</th>
                <th className="p-[15px] text-left text-[0.85rem] font-bold text-[#374151] uppercase tracking-wider">Status</th>
                <th className="p-[15px] text-left text-[0.85rem] font-bold text-[#374151] uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#fffcf5] transition-colors">
                  <td className="p-[15px] text-[0.9rem] font-semibold text-[#111]">#{order.id + 1000}</td>
                  <td className="p-[15px] text-[0.9rem] text-[#6b7280]">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-[15px]">
                    <span
                      className={`inline-block px-[10px] py-[4px] rounded-full text-[0.75rem] font-bold uppercase tracking-wider ${order.is_paid ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fef9c3] text-[#854d0e]"}`}
                    >
                      {order.is_paid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="p-[15px] text-[0.9rem] font-bold text-[#111]">Rs. {Number(order.total_price).toLocaleString()}</td>
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
