import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaTag, FaTrash, FaTicketAlt, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Discounts = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    fetch("https://orm-backend-gejw.onrender.com/api/coupons/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCoupons(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const getStatus = (coupon) => {
    const now = new Date();
    const start = new Date(coupon.valid_from);
    const end = new Date(coupon.valid_to);
    if (!coupon.active) return "Inactive";
    if (now.getTime() > end.getTime()) return "Expired";
    if (now.getTime() < start.getTime()) return "Scheduled";
    return "Active";
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this tactical offer?")) return;
    const token = localStorage.getItem("orm_admin_token");
    await fetch(`https://orm-backend-gejw.onrender.com/api/coupons/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getStatus(c);
    if (activeTab === "All") return matchesSearch;
    return matchesSearch && status === activeTab;
  });

  return (
    <div className="space-y-8 animate-fadeInUp pb-20">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">Promotions</span>
          </div>
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">All <span className="text-orm-gold">Discounts</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">Managing {coupons.length} Discount Coupons</p>
        </div>

        <Link to="/react-admin/discounts/new" className="group relative overflow-hidden bg-orm-gold text-black px-8 py-3 rounded-xl font-black text-[0.7rem] uppercase tracking-[0.2em] transition-all flex items-center gap-2 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:-translate-y-1">
          <span className="relative z-10 flex items-center gap-2"><FaPlus size={10} /> Create Discount</span>
          <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
        </Link>
      </div>

      {/* TABLE BOX */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        {/* TAB BAR */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
           <div className="flex gap-2">
              {["All", "Active", "Scheduled", "Expired"].map((tab) => (
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
              <input 
                type="text" 
                placeholder="Search codes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none ml-3 w-full text-[0.7rem] font-bold text-white placeholder:text-white/10" 
              />
           </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
               <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Loading Discounts...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  <th width="40" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">
                     <input type="checkbox" className="accent-orm-gold" />
                  </th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Code</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Status</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Discount Value</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Usage</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredCoupons.length > 0 ? (
                  filteredCoupons.map((c) => {
                    const status = getStatus(c);
                    return (
                      <tr
                        key={c.id}
                        onClick={() => navigate(`/react-admin/discounts/${c.id}`)}
                        className="group transition-all hover:bg-white/[0.02] cursor-pointer"
                      >
                        <td className="p-6">
                           <input type="checkbox" className="accent-orm-gold" onClick={(e) => e.stopPropagation()} />
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-orm-gold"><FaTicketAlt size={12} /></div>
                             <span className="font-mono font-black text-white text-[0.9rem] tracking-widest">{c.code}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
                            status === "Active" ? "bg-green-500/10 border-green-500/20 text-green-500" : 
                            status === "Expired" ? "bg-red-500/10 border-red-500/20 text-red-500" : 
                            "bg-orm-gold/10 border-orm-gold/20 text-orm-gold"
                          }`}>
                             <div className={`w-1 h-1 rounded-full ${status === "Active" ? "bg-green-500 animate-pulse" : status === "Expired" ? "bg-red-500" : "bg-orm-gold"}`}></div>
                             <span className="text-[0.55rem] font-black uppercase tracking-widest">{status}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="font-black text-white text-[0.85rem] tracking-tighter">{c.discount_percentage}% OFF</span>
                        </td>
                        <td className="p-6">
                          <span className="text-[0.7rem] font-bold text-white/40 uppercase tracking-widest">0 USES</span>
                        </td>
                        <td className="p-6 text-right">
                          <button
                            className="w-10 h-10 rounded-xl bg-white/5 text-white/20 flex items-center justify-center transition-all hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 active:scale-90"
                            onClick={(e) => handleDelete(e, c.id)}
                          >
                            <FaTrash size={12} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-20 text-center">
                       <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/10">No discounts found</span>
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

export default Discounts;
