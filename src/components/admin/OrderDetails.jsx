import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPrint,
  FaEllipsisH,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFilePdf,
  FaReceipt,
  FaBoxOpen,
  FaUser,
  FaMap,
} from "react-icons/fa";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPrintMenu, setShowPrintMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    fetch(`https://orm-backend-gejw.onrender.com/api/orders/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
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

  const handleDownloadInvoice = () => {
    window.open(`https://orm-backend-gejw.onrender.com/api/invoice/${id}/`, "_blank");
    setShowPrintMenu(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
      <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Accessing Briefing...</span>
    </div>
  );
  
  if (!order) return <div className="text-center py-40 text-white/20 font-black uppercase tracking-widest">Entry Not Found</div>;

  return (
    <div className="space-y-8 animate-fadeInUp pb-20">
      {/* HEADER BAR */}
      <div className="flex justify-between items-start gap-6 flex-wrap">
        <div className="space-y-4">
          <Link to="/react-admin/orders" className="text-white/40 text-[0.65rem] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-orm-gold transition-colors">
            <FaArrowLeft /> Back to Orders
          </Link>
          <div className="flex items-center gap-6">
            <h1 className="text-[2.8rem] font-black text-white uppercase tracking-tighter leading-none">#{order.id + 1000}</h1>
            <div className="flex gap-2">
               <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${order.is_paid ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-orm-gold/10 border-orm-gold/20 text-orm-gold"}`}>
                  <div className={`w-1 h-1 rounded-full ${order.is_paid ? "bg-green-500" : "bg-orm-gold"} animate-pulse`}></div>
                  <span className="text-[0.55rem] font-black uppercase tracking-widest">{order.is_paid ? "Paid" : "Unpaid"}</span>
               </div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-white/5 border-white/10 text-white/40">
                  <div className="w-1 h-1 rounded-full bg-white/40"></div>
                  <span className="text-[0.55rem] font-black uppercase tracking-widest">Processing</span>
               </div>
            </div>
          </div>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-[0.2em]">{formatDate(order.created_at)}</p>
        </div>

        <div className="flex gap-3">
          <button className="bg-white/[0.03] border border-white/10 px-6 py-3 rounded-xl text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3 transition-all hover:bg-white/[0.06] hover:text-white">Restock</button>

          <div className="relative">
            <button
              className="bg-white/[0.03] border border-white/10 px-6 py-3 rounded-xl text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3 transition-all hover:bg-white/[0.06] hover:text-white"
              onClick={() => setShowPrintMenu(!showPrintMenu)}
            >
              <FaPrint className="text-orm-gold" /> Print Order
            </button>

            {showPrintMenu && (
              <div className="absolute top-[120%] right-0 w-[240px] bg-orm-surface/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl z-50 p-2 animate-fadeInUp">
                <button className="w-full flex items-center gap-4 p-4 rounded-xl text-[0.65rem] font-black uppercase tracking-widest text-white/60 hover:bg-white/5 hover:text-white transition-all" onClick={handleDownloadInvoice}>
                  <FaFilePdf className="text-red-500" /> Download Invoice
                </button>
                <button className="w-full flex items-center gap-4 p-4 rounded-xl text-[0.65rem] font-black uppercase tracking-widest text-white/60 hover:bg-white/5 hover:text-white transition-all" onClick={() => window.print()}>
                  <FaReceipt className="text-orm-gold" /> Print Page
                </button>
              </div>
            )}
          </div>

          <button className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center text-white/20 transition-all hover:text-white">
            <FaEllipsisH />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CARGO & FINANCE */}
        <div className="col-span-8 space-y-8 max-lg:col-span-12">
          {/* CARGO MANIFEST */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <div className="flex items-center gap-3">
                 <FaBoxOpen className="text-orm-gold" />
                 <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Order Items ({order.items.length})</h3>
              </div>
              <span className="text-[0.55rem] font-black text-white/20 uppercase tracking-widest">Standard Shipping</span>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center p-8 gap-8 group transition-all hover:bg-white/[0.01]">
                  <div className="w-20 h-20 bg-orm-dark border border-white/5 rounded-2xl overflow-hidden group-hover:border-orm-gold/30 transition-all duration-500 flex-shrink-0 p-2">
                    <img
                      src={getImageUrl(item.product.image)}
                      alt={item.product.title}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-[0.9rem] uppercase tracking-tight mb-1 group-hover:text-orm-gold transition-colors truncate">{item.product.title}</p>
                    <p className="text-[0.55rem] font-black text-white/20 uppercase tracking-[0.2em]">SKU: {item.product.id}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <div className="text-[0.7rem] font-bold text-white/40 uppercase tracking-widest">
                      ₹{Number(item.price).toLocaleString()} <span className="text-white/10">×</span> {item.quantity}
                    </div>
                    <div className="text-[0.9rem] font-black text-white tracking-tighter">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 bg-white/[0.01] border-t border-white/5 text-right">
              <button className="bg-white/5 border border-white/10 text-white/60 px-8 py-3 rounded-xl font-black text-[0.6rem] uppercase tracking-[0.2em] transition-all hover:bg-orm-gold hover:text-black hover:border-orm-gold">Mark as Fulfilled</button>
            </div>
          </div>

          {/* FINANCIAL SETTLEMENT */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 bg-white/[0.01]">
              <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Payment Summary</h3>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between text-[0.7rem] font-bold text-white/40 uppercase tracking-widest">
                <span>Subtotal ({order.items.length} items)</span>
                <span className="text-white">Rs. {Number(order.total_price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[0.7rem] font-bold text-white/40 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-white">Rs. 0.00</span>
              </div>
              <div className="flex justify-between text-[0.7rem] font-bold text-white/40 uppercase tracking-widest">
                <span>Tax (0%)</span>
                <span className="text-white">Rs. 0.00</span>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-[0.8rem] font-black text-white uppercase tracking-[0.3em]">Total</span>
                <span className="text-2xl font-black text-orm-gold tracking-tighter">Rs. {Number(order.total_price).toLocaleString()}</span>
              </div>
            </div>
            <div className="p-8 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
              <div className="flex flex-col">
                 <span className="text-[0.55rem] font-black text-white/20 uppercase tracking-[0.2em]">Payment Method</span>
                 <span className="text-[0.8rem] font-bold text-white tracking-tight">Paid by Customer</span>
              </div>
              {!order.is_paid && (
                <button className="bg-orm-gold text-black px-8 py-3 rounded-xl font-black text-[0.6rem] uppercase tracking-[0.2em] transition-all hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)]">Accept Payment</button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MUTANT PROFILE & LOGS */}
        <div className="col-span-4 space-y-8 max-lg:col-span-12">
          {/* MUTANT PROFILE */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <FaUser className="text-orm-gold" />
                 <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Customer Profile</h3>
              </div>
              <button className="text-orm-gold/40 text-[0.5rem] font-black uppercase tracking-widest hover:text-orm-gold transition-colors">Edit</button>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-orm-gold/10 border border-orm-gold/20 flex items-center justify-center text-orm-gold font-black text-xl uppercase shadow-lg shadow-orm-gold/5">
                    {order.full_name.charAt(0)}
                 </div>
                 <div>
                    <p className="text-[0.9rem] font-black text-white uppercase tracking-tight leading-none mb-1">{order.full_name}</p>
                    <p className="text-[0.55rem] font-bold text-white/20 uppercase tracking-widest">Registered User</p>
                 </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-[0.55rem] font-black text-white/20 uppercase tracking-[0.3em]">Contact Information</h4>
                  <div className="space-y-3">
                    <a href={`mailto:${order.email}`} className="flex items-center gap-3 text-[0.7rem] font-bold text-orm-gold hover:underline">
                      <FaEnvelope size={10} className="text-white/20" /> {order.email}
                    </a>
                    <p className="flex items-center gap-3 text-[0.7rem] font-bold text-white/60">
                      <FaPhone size={10} className="text-white/20" /> {order.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <FaMapMarkerAlt size={10} className="text-orm-gold" />
                     <h4 className="text-[0.55rem] font-black text-white/20 uppercase tracking-[0.3em]">Shipping Address</h4>
                  </div>
                  <div className="text-[0.7rem] font-bold text-white/60 leading-relaxed uppercase tracking-tight">
                    <p>{order.full_name}</p>
                    <p>{order.address}</p>
                    <p>{order.city}, {order.state} {order.zip_code}</p>
                    <p className="mt-2 text-white/20">Country: INDIA</p>
                  </div>
                  <button className="flex items-center gap-2 text-[0.55rem] font-black text-orm-gold uppercase tracking-[0.2em] mt-4 hover:underline">
                     <FaMap size={10} /> View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* INTEL LOGS */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
              <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Internal Notes</h3>
              <button className="text-white/20 text-[0.5rem] font-black uppercase tracking-widest">Edit</button>
            </div>
            <div className="p-8">
               <p className="text-[0.65rem] font-bold text-white/20 italic uppercase tracking-widest">No internal notes for this order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
