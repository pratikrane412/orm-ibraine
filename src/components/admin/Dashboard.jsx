import React, { useState, useEffect } from "react";
// 1. IMPORT ALL RECHARTS COMPONENTS
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaCalendarAlt, FaSyncAlt } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- MOCK DATA FOR NEW CHARTS ---
  const deviceData = [
    { name: "Mobile", value: 2500 },
    { name: "Desktop", value: 2000 },
    { name: "Tablet", value: 50 },
  ];

  const COLORS = ["#fbb03b", "#ffffff", "#3f3f46"]; // Gold, White, Gray

  const funnelData = [
    { name: "Sessions", value: 4570 },
    { name: "Cart", value: 340 },
    { name: "Checkout", value: 160 },
    { name: "Paid", value: 30 },
  ];

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    fetch("https://orm-backend-gejw.onrender.com/api/dashboard-stats/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
      <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Loading Intelligence...</span>
    </div>
  );

  // Prepare Data for Main Line Chart
  const chartData =
    stats?.sales_chart?.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      sales: item.sales,
    })) || [];

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">System Analytics</span>
          </div>
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">Dashboard <span className="text-orm-gold">Overview</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">Last refreshed: Just now</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/[0.03] border border-white/10 px-6 py-3 rounded-xl text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/60 flex items-center gap-3 transition-all hover:bg-white/[0.06] hover:text-white hover:border-white/20">
            <FaCalendarAlt className="text-orm-gold" /> Filter Period
          </button>
          <button className="bg-orm-gold text-black px-4 py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(251,176,59,0.3)] active:scale-95">
            <FaSyncAlt />
          </button>
        </div>
      </div>

      {/* STRATEGIC KPIS */}
      <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2">
        {[
          { label: "Gross Revenue", value: `Rs. ${Number(stats.summary.gross_sales).toLocaleString()}`, trend: "↗ 29%", color: "text-orm-gold" },
          { label: "Returning Rate", value: stats.summary.returning_rate, trend: "0%", color: "text-white" },
          { label: "Orders Fulfilled", value: stats.summary.fulfilled_rate, trend: null, color: "text-white" },
          { label: "Total Orders", value: stats.summary.orders_count, trend: null, color: "text-white" },
        ].map((kpi, i) => (
          <div key={i} className="group bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] transition-all duration-500 hover:border-orm-gold/30 hover:bg-orm-surface/60">
            <span className="text-[0.55rem] font-black text-white/20 uppercase tracking-[0.3em] block mb-4">{kpi.label}</span>
            <div className="flex items-baseline justify-between">
              <div className={`text-2xl font-black tracking-tighter ${kpi.color}`}>{kpi.value}</div>
              {kpi.trend && <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-lg bg-orm-gold/10 text-orm-gold">{kpi.trend}</span>}
            </div>
            <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-orm-gold w-1/3 rounded-full opacity-40 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
          </div>
        ))}
      </div>

      {/* ANALYTICS GRID */}
      <div className="grid grid-cols-3 gap-6">
        {/* MAIN REVENUE CHART */}
        <div className="col-span-2 bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] max-lg:col-span-3">
          <div className="flex justify-between items-center mb-10">
            <div>
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Total Sales</h3>
               <p className="text-[0.6rem] font-bold text-white/20 uppercase tracking-widest mt-1">7 Day Sales Analysis</p>
            </div>
            <div className="text-right">
               <div className="text-xl font-black text-white tracking-tighter">Rs. {Number(stats.summary.gross_sales).toLocaleString()}</div>
               <span className="text-[0.55rem] font-black text-orm-gold uppercase tracking-widest">Aggregate Sales</span>
            </div>
          </div>

          <div className="h-[300px] w-full min-h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbb03b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#fbb03b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#ffffff20", fontWeight: "bold" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#ffffff20", fontWeight: "bold" }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="sales" stroke="#fbb03b" strokeWidth={4} dot={{ r: 4, fill: "#fbb03b", strokeWidth: 0 }} activeDot={{ r: 6, fill: "#ffffff", strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-[0.6rem] font-black text-white/10 uppercase tracking-widest border border-dashed border-white/10 rounded-2xl">No sales data yet.</div>
            )}
          </div>
        </div>

        {/* TOP PRODUCTS LIST */}
        <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] max-lg:col-span-3">
          <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em] mb-8">Top Products</h3>
          <div className="space-y-6">
            {stats.top_products.map((p, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[0.65rem] font-bold text-white/60 truncate pr-4 group-hover:text-orm-gold transition-colors uppercase tracking-tight">{p.product__title}</span>
                  <span className="text-[0.7rem] font-black text-white shrink-0">₹{Number(p.revenue).toLocaleString()}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orm-gold/40 to-orm-gold rounded-full" style={{ width: `${Math.max(20, 100 - (idx * 15))}%` }}></div>
                </div>
              </div>
            ))}
            {stats.top_products.length === 0 && (
              <div className="py-20 text-center text-[0.6rem] font-black text-white/10 uppercase tracking-widest">No Active Units</div>
            )}
          </div>
        </div>

        {/* SESSIONS BY DEVICE (DONUT) */}
        <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] max-lg:col-span-3">
          <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em] mb-8">Sessions by device</h3>
          <div className="h-[200px] min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceData} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                  {deviceData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#121212", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-xl font-black text-white tracking-tighter">4.5K</span>
               <span className="text-[0.5rem] font-black text-white/20 uppercase tracking-widest">Total Sesh</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
             {deviceData.map((d, i) => (
               <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-[0.55rem] font-black text-white/40 uppercase tracking-widest">{d.name}</span>
               </div>
             ))}
          </div>
        </div>

        {/* CONVERSION FUNNEL */}
        <div className="col-span-2 bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] max-lg:col-span-3">
          <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em] mb-8">Conversion Rate</h3>
          <div className="h-[200px] min-h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                   <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#ffffff20", fontWeight: "bold" }} axisLine={false} tickLine={false} />
                   <Bar dataKey="value" fill="#fbb03b" radius={[12, 12, 0, 0]} barSize={40} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
