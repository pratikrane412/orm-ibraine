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

  // --- MOCK DATA FOR NEW CHARTS (Since backend doesn't provide these yet) ---
  const deviceData = [
    { name: "Mobile", value: 2500 },
    { name: "Desktop", value: 2000 },
    { name: "Tablet", value: 50 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // Blue, Green, Yellow

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

  if (loading) return <div className="text-center padding-[50px] text-[#64748b]">Loading Analytics...</div>;

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
    <div className="bg-[#ffffff] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh] font-['Inter',sans-serif] text-[#1f2937] pb-[60px] bg-[#f3f4f6]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-[25px]">
        <div>
          <h2 className="font-['Merriweather',serif] text-[28px] m-0 text-[#111] tracking-[-0.5px]">Analytics</h2>
          <p className="text-[13px] text-[#6b7280] mt-[4px]">Last refreshed: Just now</p>
        </div>
        <div className="flex gap-[10px]">
          <button className="bg-white border border-[#d1d5db] p-[8px_14px] rounded-[8px] text-[13px] font-[500] cursor-pointer flex items-center gap-[8px] text-[#374151] transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-[#fbb03b] hover:text-black hover:bg-[#fffbeb]">
            <FaCalendarAlt /> Today
          </button>
          <button className="bg-white border border-[#d1d5db] p-[8px_14px] rounded-[8px] text-[13px] font-[500] cursor-pointer flex items-center gap-[8px] text-[#374151] transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-[#fbb03b] hover:text-black hover:bg-[#fffbeb]">
            <FaSyncAlt />
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-[20px] mb-[25px] max-lg:grid-cols-2">
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <span className="text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.05em] block mb-[8px]">Gross sales</span>
          <div className="text-[24px] font-[700] text-[#111] font-['Merriweather',serif]">
            Rs. {Number(stats.summary.gross_sales).toLocaleString()}
          </div>
          <span className="text-[12px] font-[600] ml-[8px] p-[2px_6px] rounded-[4px] bg-[#dcfce7] text-[#166534]">↗ 29%</span>
        </div>
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <span className="text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.05em] block mb-[8px]">Returning customer rate</span>
          <div className="text-[24px] font-[700] text-[#111] font-['Merriweather',serif]">{stats.summary.returning_rate}</div>
          <span className="text-[12px] font-[600] ml-[8px] p-[2px_6px] rounded-[4px] bg-[#f3f4f6] text-[#6b7280]">– 0%</span>
        </div>
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <span className="text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.05em] block mb-[8px]">Orders fulfilled</span>
          <div className="text-[24px] font-[700] text-[#111] font-['Merriweather',serif]">{stats.summary.fulfilled_rate}</div>
        </div>
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <span className="text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.05em] block mb-[8px]">Orders</span>
          <div className="text-[24px] font-[700] text-[#111] font-['Merriweather',serif]">{stats.summary.orders_count}</div>
        </div>
      </div>

      {/* MAIN CHART ROW */}
      <div className="grid grid-cols-[2fr_1fr] gap-[25px] mb-[25px] max-lg:grid-cols-1">
        {/* LEFT: CHART CONTAINER */}
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)] h-[420px] flex flex-col">
          <div className="mb-[20px] flex justify-between items-center">
            <h3 className="text-[15px] font-[600] m-0 text-[#374151]">Total sales over time</h3>
            <span className="text-[28px] font-[700] text-[#111] font-['Merriweather',serif]">
              Rs. {Number(stats.summary.gross_sales).toLocaleString()}
            </span>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#fbb03b"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#fbb03b",
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                    activeDot={{ r: 6, fill: "#f59e0b" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full color-[#9ca3af] bg-[#f9fafb] rounded-[8px]">No sales data yet.</div>
            )}
          </div>
        </div>

        {/* RIGHT: BREAKDOWN */}
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-[600] m-[0_0_20px_0] font-['Merriweather',serif]">Total sales breakdown</h3>
          <div className="flex flex-col">
            <div className="flex justify-between p-[12px_0] border-b border-[#f3f4f6] text-[14px] text-[#4b5563]">
              <span>Gross sales</span>
              <span className="font-[500] text-[#111] font-['Inter',sans-serif]">
                Rs. {Number(stats.summary.gross_sales).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between p-[12px_0] border-b border-[#f3f4f6] text-[14px] text-[#fbb03b] font-[600]">
              <span>Net sales</span>
              <span className="font-[500] text-[#111] font-['Inter',sans-serif]">
                Rs. {Number(stats.summary.gross_sales).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between p-[12px_0] text-[16px] text-black border-t-2 border-[#e5e7eb] pt-[15px] mt-[5px] font-[700]">
              <span>Total sales</span>
              <span className="font-[500] text-[#111] font-['Inter',sans-serif]">
                Rs. {Number(stats.summary.gross_sales).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: DETAILED ANALYTICS (Correctly Placed) */}
      <div className="grid grid-cols-3 gap-[25px] mb-[25px] max-lg:grid-cols-1">
        {/* 1. SESSIONS OVER TIME (Mock Line) */}
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-[600] m-0 text-[#374151]">Sessions over time</h3>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <LineChart
                data={
                  chartData.length > 0
                    ? chartData
                    : [{ sales: 0 }, { sales: 10 }, { sales: 5 }]
                }
              >
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  dot={false}
                  strokeWidth={2}
                />
                <XAxis hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. CONVERSION FUNNEL (Bar Chart) */}
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-[600] m-0 text-[#374151]">Conversion rate breakdown</h3>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={funnelData}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. DEVICE TYPE (Donut Chart) */}
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-[600] m-0 text-[#374151]">Sessions by device</h3>
          <div style={{ width: "100%", height: 200, position: "relative" }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={deviceData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "38%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>4.5K</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: PRODUCTS */}
      <div className="grid grid-cols-[2fr_1fr] gap-[25px] mb-[25px] max-lg:grid-cols-1">
        <div className="bg-white rounded-[16px] p-[24px] border border-[#e5e7eb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-[600] m-0 text-[#374151]">Total sales by product</h3>
          <ul className="list-none p-0 mt-[10px]">
            {stats.top_products.map((p, idx) => (
              <li key={idx} className="flex items-center justify-between mb-[18px]">
                <div className="flex-1 pr-[25px]">
                  <span className="block text-[13px] mb-[6px] text-[#374151] font-[500]">{p.product__title}</span>
                  <div className="w-full h-[8px] bg-[#f3f4f6] rounded-[4px] overflow-hidden">
                    <div className="h-full bg-[linear-gradient(90deg,#fbb03b,#f59e0b)] rounded-[4px]" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <span className="text-[14px] font-[600] font-['Inter',sans-serif] min-w-[80px] text-right">
                  Rs. {Number(p.revenue).toLocaleString()}
                </span>
              </li>
            ))}
            {stats.top_products.length === 0 && (
              <p className="text-center color-[#9ca3af] padding-[40px]">No sales yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
