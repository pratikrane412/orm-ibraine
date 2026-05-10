import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaTag, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

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
    e.stopPropagation(); // Prevents row click when clicking delete
    if (!window.confirm("Delete this coupon?")) return;

    const token = localStorage.getItem("orm_admin_token");
    await fetch(`https://orm-backend-gejw.onrender.com/api/coupons/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch = c.code
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const status = getStatus(c);
    if (activeTab === "All") return matchesSearch;
    return matchesSearch && status === activeTab;
  });

  return (
    <div className="bg-[#ffffff] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh] font-['Inter',sans-serif] text-[#202223]">
      <div className="flex justify-between items-center mb-[25px] flex-wrap gap-[20px]">
        <div className="header-text">
          <h2 className="font-['Merriweather',serif] text-[2rem] text-[#111] m-0">Discounts</h2>
          <p className="text-[#6b7280] text-[0.95rem] mt-[5px]">Manage coupon codes and promotions</p>
        </div>
        <div className="header-actions">
          <Link to="/react-admin/discounts/new" className="bg-[#fbb03b] text-black p-[10px_20px] rounded-[8px] no-underline font-[600] text-[0.95rem] flex items-center gap-[8px] transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.1)] whitespace-nowrap hover:bg-[#f59e0b] hover:translate-y-[-1px]">
            <FaPlus /> Create discount
          </Link>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex gap-[15px] border-b border-[#e5e7eb] bg-[#f9fafb] p-[0_20px]">
          {["All", "Active", "Scheduled", "Expired"].map((tab) => (
            <button
              key={tab}
              className={`bg-transparent border-none p-[12px_0] text-[0.9rem] cursor-pointer border-b-2 transition-all duration-200 mb-[-1px] ${activeTab === tab ? "text-[#111] font-[600] border-[#fbb03b]" : "text-[#6b7280] border-transparent"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-[12px_20px] bg-white border-b border-[#e1e3e5]">
          <div className="flex items-center border border-[#d1d5db] rounded-[8px] p-[8px_12px] w-full max-w-full transition-all duration-200 bg-[#f9fafb] focus-within:border-[#fbb03b] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(251,176,59,0.1)]">
            <FaSearch className="text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search discounts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none outline-none w-full ml-[10px] text-[14px] bg-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center padding-[50px] text-[#64748b]">Loading Discounts...</div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th width="40" className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">
                  <input type="checkbox" className="w-[16px] h-[16px] border border-[#d1d5db] rounded-[4px] accent-[#fbb03b] cursor-pointer" />
                </th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Title</th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Status</th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Discount</th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Used</th>
                <th align="right" className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.length > 0 ? (
                filteredCoupons.map((c) => (
                  <tr
                    key={c.id}
                    // ADDED CLICK HANDLER HERE ON THE ROW ITSELF
                    onClick={() => navigate(`/react-admin/discounts/${c.id}`)}
                    className="border-b border-[#f1f5f9] last:border-b-0 hover:bg-[#fffbeb] cursor-pointer"
                  >
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        className="w-[16px] h-[16px] border border-[#d1d5db] rounded-[4px] accent-[#fbb03b] cursor-pointer"
                      />
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <div className="flex flex-col">
                        <span className="font-[700] text-[#202223] text-[0.95rem]">{c.code}</span>
                        <span className="text-[0.8rem] text-[#6b7280]">
                          {c.discount_percentage}% off entire order
                        </span>
                      </div>
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <span
                        className={`inline-flex items-center gap-[6px] p-[2px_10px] rounded-[12px] text-[12px] font-[500] capitalize ${
                          getStatus(c) === "Active" ? "bg-[#ecfdf5] text-[#047857]" : 
                          getStatus(c) === "Expired" ? "bg-[#f3f4f6] text-[#4b5563]" : 
                          "bg-[#fff7ed] text-[#9a3412]"
                        }`}
                      >
                        <span className="w-[6px] h-[6px] rounded-full bg-current"></span> {getStatus(c)}
                      </span>
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">{c.discount_percentage}%</td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">0 used</td>
                    <td align="right" className="p-[14px_20px] align-middle text-[#334155]">
                      <button
                        className="w-[32px] h-[32px] rounded-[6px] border border-transparent bg-transparent flex items-center justify-center cursor-pointer text-[#64748b] transition-all duration-200 hover:bg-white hover:border-[#e2e8f0] hover:shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:text-[#ef4444]"
                        // Pass 'e' to stop propagation
                        onClick={(e) => handleDelete(e, c.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center padding-[50px] text-[#64748b]">
                    No discounts found
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

export default Discounts;
