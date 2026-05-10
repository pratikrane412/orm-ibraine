import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaFileExport,
  FaEye,
  FaSort,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    fetch("https://orm-backend-gejw.onrender.com/api/orders/", {
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
    <div className="font-['Inter',sans-serif] text-[#111827]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-[30px]">
        <div className="header-text">
          <h2 className="font-['Merriweather',serif] text-[2.2rem] text-[#111] m-0 tracking-[-0.5px]">Orders</h2>
          <p className="text-[#6b7280] text-[0.95rem] mt-[6px]">Manage customer orders and shipments</p>
        </div>
        <div className="flex gap-[12px]">
          <button className="bg-white text-[#374151] p-[12px_20px] rounded-[10px] font-[600] border border-[#e5e7eb] cursor-pointer flex items-center gap-[8px] transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-[#d1d5db] hover:bg-[#f9fafb]">
            <FaFileExport /> Export
          </button>
          <button className="bg-[linear-gradient(135deg,#fbb03b_0%,#f59e0b_100%)] text-white p-[12px_24px] rounded-[10px] font-[600] border-none cursor-pointer shadow-[0_4px_12px_rgba(251,176,59,0.3)] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_6px_16px_rgba(251,176,59,0.4)]">Create Order</button>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="flex gap-[24px] mb-[30px]">
        <div className="flex-1 bg-white border border-[rgba(229,231,235,0.5)] rounded-[16px] p-[24px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:translate-y-[-3px] hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)]">
          <span className="text-[0.8rem] text-[#9ca3af] uppercase font-[700] tracking-[0.05em] block mb-[8px]">Total Orders</span>
          <div className="text-[1.8rem] font-[800] text-[#1f2937] font-['Merriweather',serif] tracking-[-0.5px]">{orders.length}</div>
        </div>
        <div className="flex-1 bg-white border border-[rgba(229,231,235,0.5)] rounded-[16px] p-[24px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:translate-y-[-3px] hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)]">
          <span className="text-[0.8rem] text-[#9ca3af] uppercase font-[700] tracking-[0.05em] block mb-[8px]">Total Revenue</span>
          <div className="text-[1.8rem] font-[800] text-[#1f2937] font-['Merriweather',serif] tracking-[-0.5px]">
            Rs.{" "}
            {orders
              .reduce((acc, o) => acc + Number(o.total_price), 0)
              .toLocaleString()}
          </div>
        </div>
        <div className="flex-1 bg-white border border-[rgba(229,231,235,0.5)] rounded-[16px] p-[24px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:translate-y-[-3px] hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)]">
          <span className="text-[0.8rem] text-[#9ca3af] uppercase font-[700] tracking-[0.05em] block mb-[8px]">Pending</span>
          <div className="text-[1.8rem] font-[800] text-[#1f2937] font-['Merriweather',serif] tracking-[-0.5px]">{orders.filter((o) => !o.is_paid).length}</div>
        </div>
      </div>

      {/* TABS & FILTERS CONTAINER */}
      <div className="bg-white border border-[#e5e7eb] border-b-0 rounded-[16px_16px_0_0] p-[10px_24px_0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)]">
        {/* TABS */}
        <div className="flex gap-[8px] border-b border-[#f3f4f6] pb-[12px] mb-[12px]">
          {["All", "Unpaid", "Paid", "Open"].map((tab) => (
            <button
              key={tab}
              className={`bg-transparent border-none p-[8px_16px] font-size-[0.9rem] cursor-pointer rounded-[20px] font-[500] transition-all duration-200 hover:bg-[#f3f4f6] hover:text-[#1f2937] ${activeTab === tab ? "bg-[#1f2937] !text-[#fbb03b] font-[600] shadow-[0_2px_5px_rgba(0,0,0,0.1)]" : "text-[#6b7280]"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FILTERS */}
        <div className="flex gap-[16px] pb-[16px]">
          <div className="flex-1 max-w-[380px] flex items-center bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] p-[10px_14px] transition-all duration-200 focus-within:border-[#fbb03b] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(251,176,59,0.1)]">
            <FaSearch className="text-[#9ca3af]" />
            <input type="text" placeholder="Search orders..." className="border-none bg-transparent w-full ml-[10px] text-[0.95rem] outline-none text-[#1f2937]" />
          </div>
          <button className="bg-white border border-[#e5e7eb] p-[0_16px] rounded-[10px] text-[#374151] font-[600] cursor-pointer flex items-center gap-[8px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-[#e5e7eb] border-t-0 rounded-[0_0_16px_16px] overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.03)]">
        {loading ? (
          <div className="text-center p-[50px] color-[#64748b]">
            <div className="spinner"></div> Loading...
          </div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="p-[16px_24px] text-[0.75rem] uppercase text-[#9ca3af] font-[700] tracking-[0.05em] bg-white border-b border-[#f3f4f6]">Order ID</th>
                <th className="p-[16px_24px] text-[0.75rem] uppercase text-[#9ca3af] font-[700] tracking-[0.05em] bg-white border-b border-[#f3f4f6]">Date</th>
                <th className="p-[16px_24px] text-[0.75rem] uppercase text-[#9ca3af] font-[700] tracking-[0.05em] bg-white border-b border-[#f3f4f6]">Customer</th>
                <th className="p-[16px_24px] text-[0.75rem] uppercase text-[#9ca3af] font-[700] tracking-[0.05em] bg-white border-b border-[#f3f4f6]">Payment</th>
                <th className="p-[16px_24px] text-[0.75rem] uppercase text-[#9ca3af] font-[700] tracking-[0.05em] bg-white border-b border-[#f3f4f6]">Fulfillment</th>
                <th className="p-[16px_24px] text-[0.75rem] uppercase text-[#9ca3af] font-[700] tracking-[0.05em] bg-white border-b border-[#f3f4f6]">Items</th>
                <th className="p-[16px_24px] text-[0.75rem] uppercase text-[#9ca3af] font-[700] tracking-[0.05em] bg-white border-b border-[#f3f4f6]">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    // CLICK EVENT ADDED HERE
                    onClick={() => handleRowClick(order.id)}
                    className="hover:bg-[#fffbf0] cursor-pointer"
                  >
                    <td className="p-[18px_24px] border-b border-[#f3f4f6] color-[#374151] text-[0.95rem] align-middle">
                      <span className="font-['Inter',sans-serif] font-[700] text-[#fbb03b] underline cursor-pointer">#{order.id + 1000}</span>
                    </td>
                    <td className="p-[18px_24px] border-b border-[#f3f4f6] color-[#374151] text-[0.95rem] align-middle">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="p-[18px_24px] border-b border-[#f3f4f6] color-[#374151] text-[0.95rem] align-middle">
                      <div className="flex flex-col">
                        <span className="font-[600] text-[#111] block">{order.full_name}</span>
                        <span className="text-[0.85rem] text-[#9ca3af]">{order.email}</span>
                      </div>
                    </td>
                    <td className="p-[18px_24px] border-b border-[#f3f4f6] color-[#374151] text-[0.95rem] align-middle">
                      <span
                        className={`inline-flex items-center gap-[6px] p-[6px_12px] rounded-[20px] text-[0.8rem] font-[600] tracking-[0.02em] ${
                          order.is_paid ? "bg-[#ecfdf5] text-[#047857]" : "bg-[#fff7ed] text-[#c2410c]"
                        }`}
                      >
                        <span className={`w-[8px] h-[8px] rounded-full ${order.is_paid ? "bg-[#10b981]" : "bg-[#f97316]"}`}></span>
                        {order.is_paid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="p-[18px_24px] border-b border-[#f3f4f6] color-[#374151] text-[0.95rem] align-middle">
                      <span className="inline-flex items-center gap-[6px] p-[6px_12px] rounded-[20px] text-[0.8rem] font-[600] tracking-[0.02em] bg-[#fefce8] text-[#854d0e]">
                        <span className="w-[8px] h-[8px] rounded-full bg-[#eab308]"></span> Unfulfilled
                      </span>
                    </td>
                    <td className="p-[18px_24px] border-b border-[#f3f4f6] color-[#374151] text-[0.95rem] align-middle">{order.items ? order.items.length : 0} items</td>
                    <td className="p-[18px_24px] border-b border-[#f3f4f6] text-[0.95rem] align-middle font-[700] text-[#111] font-['Inter',sans-serif]">
                      Rs. {Number(order.total_price).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center padding-[50px] text-[#64748b]">
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
