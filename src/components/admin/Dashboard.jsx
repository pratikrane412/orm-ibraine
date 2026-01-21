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
import "../../styles/admin/Dashboard.css";

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

  if (loading) return <div className="loading-state">Loading Analytics...</div>;

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
    <div className="admin-page-container dashboard-wrapper">
      {/* HEADER */}
      <div className="dash-header">
        <div>
          <h2>Analytics</h2>
          <p className="last-updated">Last refreshed: Just now</p>
        </div>
        <div className="dash-actions">
          <button className="dash-btn">
            <FaCalendarAlt /> Today
          </button>
          <button className="dash-btn">
            <FaSyncAlt />
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">
        <div className="dash-card small">
          <span className="card-label">Gross sales</span>
          <div className="card-value">
            Rs. {Number(stats.summary.gross_sales).toLocaleString()}
          </div>
          <span className="trend up">↗ 29%</span>
        </div>
        <div className="dash-card small">
          <span className="card-label">Returning customer rate</span>
          <div className="card-value">{stats.summary.returning_rate}</div>
          <span className="trend flat">– 0%</span>
        </div>
        <div className="dash-card small">
          <span className="card-label">Orders fulfilled</span>
          <div className="card-value">{stats.summary.fulfilled_rate}</div>
        </div>
        <div className="dash-card small">
          <span className="card-label">Orders</span>
          <div className="card-value">{stats.summary.orders_count}</div>
        </div>
      </div>

      {/* MAIN CHART ROW */}
      <div className="charts-layout">
        {/* LEFT: CHART CONTAINER */}
        <div className="dash-card large main-chart">
          <div className="chart-header">
            <h3>Total sales over time</h3>
            <span className="chart-value">
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
              <div className="no-data-chart">No sales data yet.</div>
            )}
          </div>
        </div>

        {/* RIGHT: BREAKDOWN */}
        <div className="dash-card breakdown-card">
          <h3>Total sales breakdown</h3>
          <div className="breakdown-list">
            <div className="break-row">
              <span>Gross sales</span>
              <span>
                Rs. {Number(stats.summary.gross_sales).toLocaleString()}
              </span>
            </div>
            <div className="break-row highlight">
              <span>Net sales</span>
              <span>
                Rs. {Number(stats.summary.gross_sales).toLocaleString()}
              </span>
            </div>
            <div className="break-row total">
              <span>Total sales</span>
              <span>
                Rs. {Number(stats.summary.gross_sales).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: DETAILED ANALYTICS (Correctly Placed) */}
      <div className="charts-layout three-col">
        {/* 1. SESSIONS OVER TIME (Mock Line) */}
        <div className="dash-card">
          <h3>Sessions over time</h3>
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
        <div className="dash-card">
          <h3>Conversion rate breakdown</h3>
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
        <div className="dash-card">
          <h3>Sessions by device</h3>
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
      <div className="charts-layout">
        <div className="dash-card large">
          <h3>Total sales by product</h3>
          <ul className="product-rank-list">
            {stats.top_products.map((p, idx) => (
              <li key={idx}>
                <div className="prod-info">
                  <span className="p-name">{p.product__title}</span>
                  <div className="p-bar-bg">
                    <div className="p-bar-fill" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <span className="p-price">
                  Rs. {Number(p.revenue).toLocaleString()}
                </span>
              </li>
            ))}
            {stats.top_products.length === 0 && (
              <p className="no-data">No sales yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
