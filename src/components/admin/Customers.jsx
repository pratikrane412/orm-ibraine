import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFileExport,
  FaSort,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // FIX: Read URL params for filtering
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
    // 1. Search Logic
    const matchesSearch =
      (c.first_name + " " + c.last_name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. FIX: Segment Filtering Logic
    let matchesSegment = true;
    if (segmentFilter === "purchased_once")
      matchesSegment = c.orders_count >= 1;
    if (segmentFilter === "purchased_more") matchesSegment = c.orders_count > 1;
    if (segmentFilter === "never_purchased")
      matchesSegment = c.orders_count === 0;

    return matchesSearch && matchesSegment;
  });

  const totalSpent = customers.reduce(
    (acc, c) => acc + Number(c.total_spent || 0),
    0
  );

  return (
    <div className="bg-[#f9fafb] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh] font-['Inter',sans-serif] text-[#111827] pb-[60px]">
      <div className="flex justify-between items-end mb-[24px]">
        <div className="header-text">
          <h2 className="font-['Merriweather',serif] text-[26px] font-[700] m-0 text-[#111]">Customers</h2>
          {segmentFilter ? (
            <p className="text-[14px] mt-[4px]" style={{ color: "#fbb03b" }}>
              Filter: {segmentFilter.replace("_", " ").toUpperCase()}
            </p>
          ) : (
            <p className="text-[#6b7280] text-[14px] mt-[4px]">
              View and manage your customer relationships
            </p>
          )}
        </div>
        <div className="flex gap-[12px]">
          <button className="bg-white border border-[#d1d5db] text-[#374151] p-[8px_16px] rounded-[8px] font-[500] text-[13px] cursor-pointer flex items-center gap-[8px] transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#f3f4f6] hover:border-[#9ca3af]">
            <FaFileExport /> Export
          </button>
          <button className="bg-[#fbb03b] text-black border-none p-[8px_20px] rounded-[8px] font-[600] text-[13px] cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-200 hover:bg-[#f59e0b] hover:translate-y-[-1px]">Add customer</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[20px] mb-[24px] max-lg:grid-cols-1">
        <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-center">
          <span className="text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] mb-[8px]">Total Customers</span>
          <div className="text-[24px] font-[700] text-[#111] font-['Merriweather',serif]">{customers.length}</div>
        </div>
        <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-center">
          <span className="text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] mb-[8px]">Lifetime Value</span>
          <div className="text-[24px] font-[700] text-[#111] font-['Merriweather',serif]">Rs. {totalSpent.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-center">
          <span className="text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] mb-[8px]">Subscribers</span>
          <div className="text-[24px] font-[700] text-[#111] font-['Merriweather',serif]">{(customers.length / 2).toFixed(0)}</div>
        </div>
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-[12px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] overflow-hidden max-lg:overflow-x-auto">
        <div className="p-[12px_20px] border-b border-[#f3f4f6] flex justify-between items-center bg-white">
          <div className="flex-1 max-w-[380px] flex items-center bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px] p-[8px_12px] transition-all duration-200 focus-within:bg-white focus-within:border-[#fbb03b] focus-within:shadow-[0_0_0_3px_rgba(251,176,59,0.1)]">
            <FaSearch className="text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search by name, email, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none bg-transparent w-full ml-[10px] text-[13px] text-[#111] outline-none"
            />
          </div>
          <button className="bg-white border border-[#d1d5db] rounded-[8px] p-[8px_14px] text-[#374151] font-[500] cursor-pointer flex items-center gap-[8px] text-[13px] transition-all duration-200 hover:bg-[#f9fafb] hover:border-[#9ca3af]">
            <FaSort /> Sort
          </button>
        </div>

        {loading ? (
          <div className="text-center padding-[60px] text-[#9ca3af]">Loading...</div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th width="50" className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">
                  <input type="checkbox" className="w-[16px] h-[16px] border border-[#d1d5db] rounded-[4px] accent-[#fbb03b] cursor-pointer" />
                </th>
                <th className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Customer</th>
                <th className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Status</th>
                <th className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Location</th>
                <th className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Orders</th>
                <th align="right" className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Amount Spent</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#fffbeb]">
                    <td className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151]">
                      <input type="checkbox" className="w-[16px] h-[16px] border border-[#d1d5db] rounded-[4px] accent-[#fbb03b] cursor-pointer" />
                    </td>
                    <td className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151]">
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[40px] h-[40px] bg-[#eef2ff] text-[#4f46e5] rounded-full flex items-center justify-center font-[700] text-[14px] uppercase border border-[#e0e7ff]">
                          {cust.first_name ? cust.first_name[0] : <FaUser />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-[600] text-[#111] text-[14px]">
                            {cust.first_name} {cust.last_name}
                          </span>
                          <span className="text-[12px] text-[#6b7280]">{cust.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151]">
                      <span
                        className={`inline-flex items-center gap-[6px] p-[4px_10px] rounded-[20px] text-[12px] font-[500] border ${
                          cust.id % 2 === 0 ? "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]" : "bg-[#f3f4f6] text-[#4b5563] border-[#e5e7eb]"
                        }`}
                      >
                        <span className={`w-[6px] h-[6px] rounded-full ${cust.id % 2 === 0 ? "bg-[#10b981]" : "bg-[#9ca3af]"}`}></span>
                        {cust.id % 2 === 0 ? "Subscribed" : "Not Subscribed"}
                      </span>
                    </td>
                    <td className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151]">
                      <div className="flex items-center gap-[6px] text-[#4b5563] text-[13px]">
                        <FaMapMarkerAlt className="text-[#9ca3af]" /> {cust.location}
                      </div>
                    </td>
                    <td className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151]">
                      <span className="bg-white border border-[#e5e7eb] p-[4px_10px] rounded-[6px] text-[12px] font-[600] text-[#374151]">
                        {cust.orders_count} Orders
                      </span>
                    </td>
                    <td className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151] text-right font-['Inter',sans-serif] font-[600] text-[#111]">
                      Rs. {Number(cust.total_spent || 0).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center padding-[60px] text-[#9ca3af]">
                    No customers found
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

export default Customers;
