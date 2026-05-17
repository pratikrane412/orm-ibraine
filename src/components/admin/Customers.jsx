import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFileExport,
  FaSort,
  FaUser,
  FaMapMarkerAlt,
  FaUsers,
  FaShieldAlt,
  FaChessKing,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams] = useSearchParams();
  const segmentFilter = searchParams.get("segment");

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    fetch("https://orm-backend-gejw.onrender.com/api/customers/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      (c.first_name + " " + c.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesSegment = true;
    if (segmentFilter === "purchased_once") matchesSegment = c.orders_count >= 1;
    if (segmentFilter === "purchased_more") matchesSegment = c.orders_count > 1;
    if (segmentFilter === "never_purchased") matchesSegment = c.orders_count === 0;

    return matchesSearch && matchesSegment;
  });

  const totalSpent = customers.reduce((acc, c) => acc + Number(c.total_spent || 0), 0);

  return (
    <div className="space-y-8 animate-fadeInUp pb-20">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">User Management</span>
          </div>
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">Global <span className="text-orm-gold">Customers</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">
            {segmentFilter ? `Segment: ${segmentFilter.replace("_", " ")}` : `Overseeing ${customers.length} Customers`}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-white/[0.03] border border-white/10 px-6 py-3 rounded-xl text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3 transition-all hover:bg-white/[0.06] hover:text-white">
            <FaFileExport /> Export Customers
          </button>
          <button className="bg-orm-gold text-black px-8 py-3 rounded-xl font-black text-[0.6rem] uppercase tracking-[0.2em] transition-all hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] active:scale-95">Add Customer</button>
        </div>
      </div>

      {/* STRATEGIC KPIS */}
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
        {[
          { label: "Total Customers", value: customers.length, icon: <FaUsers />, trend: "Active Users" },
          { label: "Total Spent", value: `Rs. ${totalSpent.toLocaleString()}`, icon: <FaChessKing />, trend: "LTV" },
          { label: "Subscribers", value: (customers.length / 2).toFixed(0), icon: <FaShieldAlt />, trend: "Marketing Opt-in" },
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

      {/* TABLE BOX */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        {/* FILTER BAR */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
           <div className="flex items-center bg-white/[0.03] border border-white/10 px-4 py-3 rounded-xl w-[440px] focus-within:border-orm-gold/50 transition-all">
              <FaSearch size={12} className="text-white/20" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none ml-3 w-full text-[0.7rem] font-bold text-white placeholder:text-white/10 tracking-tight" 
              />
           </div>
           <button className="bg-white/[0.03] border border-white/10 px-6 py-2.5 rounded-xl text-[0.6rem] font-black uppercase tracking-widest text-white/40 flex items-center gap-3 hover:text-white transition-all">
              <FaSort /> Sort
           </button>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
               <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Loading Customers...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  <th width="50" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">
                     <input type="checkbox" className="accent-orm-gold" />
                  </th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Customer</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Status</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Location</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Orders</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="group transition-all hover:bg-white/[0.02]">
                      <td className="p-6">
                         <input type="checkbox" className="accent-orm-gold" />
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-orm-gold/10 border border-orm-gold/20 flex items-center justify-center text-orm-gold font-black text-sm uppercase shadow-lg shadow-orm-gold/5">
                            {cust.first_name ? cust.first_name[0] : <FaUser size={12} />}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-[0.8rem] uppercase tracking-tight leading-none mb-1 group-hover:text-orm-gold transition-colors">
                              {cust.first_name} {cust.last_name}
                            </span>
                            <span className="text-[0.6rem] font-medium text-white/20">{cust.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${cust.id % 2 === 0 ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-white/5 border-white/10 text-white/20"}`}>
                           <div className={`w-1 h-1 rounded-full ${cust.id % 2 === 0 ? "bg-green-500" : "bg-white/40"} animate-pulse`}></div>
                           <span className="text-[0.55rem] font-black uppercase tracking-widest">{cust.id % 2 === 0 ? "Subscribed" : "Guest"}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-white/60 text-[0.7rem] font-bold">
                          <FaMapMarkerAlt size={10} className="text-white/20" /> {cust.location}
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[0.6rem] font-black text-white/60 uppercase tracking-widest">
                          {cust.orders_count} orders
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <span className="font-black text-white text-[0.85rem] tracking-tighter">Rs. {Number(cust.total_spent || 0).toLocaleString()}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-20 text-center">
                       <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/10">No customers found</span>
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

export default Customers;
