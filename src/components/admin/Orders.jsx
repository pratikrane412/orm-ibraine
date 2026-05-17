import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaFileExport,
  FaEye,
  FaSort,
  FaTruck,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetch("https://orm-backend-gejw.onrender.com/api/orders/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.message === "Unauthorized") navigate("/admin-login");
        setLoading(false);
      });
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Unpaid") return !order.is_paid;
    if (activeTab === "Paid") return order.is_paid;
    return true;
  });

  const handleRowClick = (id) => navigate(`/react-admin/orders/${id}`);

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">Order Management</span>
          </div>
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">Global <span className="text-orm-gold">Orders</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">Managing {orders.length} Total Orders</p>
        </div>

        <div className="flex gap-3">
          <button className="bg-white/[0.03] border border-white/10 px-6 py-3 rounded-xl text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3 transition-all hover:bg-white/[0.06] hover:text-white">
            <FaFileExport /> Export Orders
          </button>
          <button className="bg-orm-gold text-black px-8 py-3 rounded-xl font-black text-[0.6rem] uppercase tracking-[0.2em] transition-all hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] active:scale-95">Create Order</button>
        </div>
      </div>

      {/* STRATEGIC KPIS */}
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
        {[
          { label: "Total Orders", value: orders.length, icon: <FaTruck />, trend: "All Orders" },
          { label: "Total Revenue", value: `Rs. ${orders.reduce((acc, o) => acc + Number(o.total_price), 0).toLocaleString()}`, icon: <FaCreditCard />, trend: "Gross Sales" },
          { label: "Pending Orders", value: orders.filter((o) => !o.is_paid).length, icon: <FaCheckCircle />, trend: "Unpaid Orders" },
        ].map((kpi, i) => (
          <div key={i} className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group hover:border-orm-gold/20 transition-all">
            <div>
               <span className="text-[0.55rem] font-black text-white/20 uppercase tracking-[0.3em] block mb-2">{kpi.label}</span>
               <div className="text-2xl font-black text-white tracking-tighter">{kpi.value}</div>
               <span className="text-[0.55rem] font-bold text-orm-gold/40 uppercase tracking-widest mt-2 block">{kpi.trend}</span>
            </div>
            <div className="w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center text-white/20 group-hover:text-orm-gold transition-colors">{kpi.icon}</div>
          </div>
        ))}
      </div>

      {/* FILTER & TABLE BOX */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        {/* TAB NAVIGATION */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
           <div className="flex gap-2">
              {["All", "Unpaid", "Paid", "Open"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2 rounded-full text-[0.6rem] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab 
                      ? "bg-orm-gold text-black shadow-lg shadow-orm-gold/20" 
                      : "text-white/20 hover:text-white/60 hover:bg-white/5"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
           </div>
           <div className="flex items-center bg-white/[0.03] border border-white/10 px-4 py-2 rounded-xl w-[300px] focus-within:border-orm-gold/50 transition-all">
              <FaSearch size={12} className="text-white/20" />
              <input type="text" placeholder="Search orders..." className="bg-transparent border-none outline-none ml-3 w-full text-[0.7rem] font-bold text-white placeholder:text-white/10" />
           </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
               <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Loading Orders...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Order ID</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Date</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Customer</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Payment</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Fulfillment</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Items</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => handleRowClick(order.id)}
                      className="group transition-all hover:bg-white/[0.02] cursor-pointer"
                    >
                      <td className="p-6">
                        <span className="font-mono font-black text-orm-gold text-[0.8rem] tracking-tight group-hover:underline">#{order.id + 1000}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-[0.7rem] font-bold text-white/60">{formatDate(order.created_at)}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-[0.75rem] uppercase tracking-tight">{order.full_name}</span>
                          <span className="text-[0.6rem] font-medium text-white/20">{order.email}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${order.is_paid ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-orm-gold/10 border-orm-gold/20 text-orm-gold"}`}>
                           <div className={`w-1 h-1 rounded-full ${order.is_paid ? "bg-green-500" : "bg-orm-gold"} animate-pulse`}></div>
                           <span className="text-[0.55rem] font-black uppercase tracking-widest">{order.is_paid ? "Paid" : "Unpaid"}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[0.55rem] font-black text-white/40 uppercase tracking-widest">Unfulfilled</span>
                      </td>
                      <td className="p-6">
                        <span className="text-[0.7rem] font-bold text-white/60">{order.items ? order.items.length : 0} items</span>
                      </td>
                      <td className="p-6 text-right">
                        <span className="font-black text-white text-[0.8rem] tracking-tighter">Rs. {Number(order.total_price).toLocaleString()}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-20 text-center">
                       <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/10">No orders found</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
