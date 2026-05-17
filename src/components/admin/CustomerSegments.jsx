import React, { useState, useEffect } from "react";
import { FaSearch, FaUsers, FaChartPie, FaUserClock, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomerSegments = () => {
  const navigate = useNavigate();
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    fetch("https://orm-backend-gejw.onrender.com/api/customers/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((customers) => {
        const total = customers.length || 1;
        const purchasedOnce = customers.filter((c) => c.orders_count >= 1).length;
        const purchasedMore = customers.filter((c) => c.orders_count > 1).length;
        const neverPurchased = customers.filter((c) => c.orders_count === 0).length;
        const emailSubscribers = Math.floor(total * 0.4);

        const generatedSegments = [
          { id: 1, name: "Purchased at least once", count: purchasedOnce, percent: ((purchasedOnce / total) * 100).toFixed(0) + "%", updated: "Just now", icon: <FaUsers /> },
          { id: 2, name: "Active Intel Subscribers", count: emailSubscribers, percent: "40%", updated: "Just now", icon: <FaUserClock /> },
          { id: 3, name: "Abandoned checkouts (30d)", count: 0, percent: "0%", updated: "Just now", icon: <FaHistory /> },
          { id: 4, name: "High-Frequency Mutants", count: purchasedMore, percent: ((purchasedMore / total) * 100).toFixed(0) + "%", updated: "Just now", icon: <FaChartPie /> },
          { id: 5, name: "New Identifications", count: neverPurchased, percent: ((neverPurchased / total) * 100).toFixed(0) + "%", updated: "Just now", icon: <FaUsers /> },
        ];
        setSegments(generatedSegments);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const getFilterType = (id) => {
    switch (id) {
      case 1: return "purchased_once";
      case 4: return "purchased_more";
      case 5: return "never_purchased";
      default: return "all";
    }
  };

  return (
    <div className="space-y-8 animate-fadeInUp pb-20">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">Segmentation</span>
          </div>
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">Customer <span className="text-orm-gold">Segments</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">Classifying Customer Groups</p>
        </div>
        <button className="bg-orm-gold text-black px-8 py-3 rounded-xl font-black text-[0.6rem] uppercase tracking-[0.2em] transition-all hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] active:scale-95">Create Segment</button>
      </div>

      {/* TABLE BOX */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.01]">
           <div className="flex items-center bg-white/[0.03] border border-white/10 px-4 py-3 rounded-xl w-full focus-within:border-orm-gold/50 transition-all">
              <FaSearch size={12} className="text-white/20" />
              <input type="text" placeholder="Search segments..." className="bg-transparent border-none outline-none ml-3 w-full text-[0.7rem] font-bold text-white placeholder:text-white/10" />
           </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
               <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Loading Segments...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  <th width="50" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">
                     <input type="checkbox" className="accent-orm-gold" />
                  </th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Segment Name</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Customers</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {segments.map((seg) => (
                  <tr
                    key={seg.id}
                    onClick={() => navigate(`/react-admin/customers?segment=${getFilterType(seg.id)}`)}
                    className="group transition-all hover:bg-white/[0.02] cursor-pointer"
                  >
                    <td className="p-6">
                       <input type="checkbox" className="accent-orm-gold" onClick={(e) => e.stopPropagation()} />
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-orm-gold group-hover:bg-orm-gold group-hover:text-black transition-all duration-500">
                            {seg.icon}
                         </div>
                         <span className="font-bold text-white text-[0.85rem] uppercase tracking-tight group-hover:text-orm-gold transition-colors">{seg.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                       <div className="flex flex-col items-end">
                          <span className="text-[0.8rem] font-black text-white tracking-tighter">{seg.percent}</span>
                          <span className="text-[0.55rem] font-bold text-white/20 uppercase tracking-widest">{seg.count} customers</span>
                       </div>
                    </td>
                    <td className="p-6 text-right">
                       <span className="text-[0.65rem] font-bold text-white/40 uppercase tracking-widest">{seg.updated}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSegments;
