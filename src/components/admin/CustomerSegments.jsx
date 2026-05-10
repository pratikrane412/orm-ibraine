import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
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

        const purchasedOnce = customers.filter(
          (c) => c.orders_count >= 1
        ).length;
        const purchasedMore = customers.filter(
          (c) => c.orders_count > 1
        ).length;
        const neverPurchased = customers.filter(
          (c) => c.orders_count === 0
        ).length;
        const emailSubscribers = Math.floor(total * 0.4);

        const generatedSegments = [
          {
            id: 1,
            name: "Customers who have purchased at least once",
            count: purchasedOnce,
            percent: ((purchasedOnce / total) * 100).toFixed(0) + "%",
            updated: "Updated just now",
          },
          {
            id: 2,
            name: "Email subscribers",
            count: emailSubscribers,
            percent: "40%",
            updated: "Updated just now",
          },
          {
            id: 3,
            name: "Abandoned checkouts in the last 30 days",
            count: 0,
            percent: "0%",
            updated: "Updated just now",
          },
          {
            id: 4,
            name: "Customers who have purchased more than once",
            count: purchasedMore,
            percent: ((purchasedMore / total) * 100).toFixed(0) + "%",
            updated: "Updated just now",
          },
          {
            id: 5,
            name: "Customers who haven't purchased",
            count: neverPurchased,
            percent: ((neverPurchased / total) * 100).toFixed(0) + "%",
            updated: "Updated just now",
          },
        ];

        setSegments(generatedSegments);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const getFilterType = (id) => {
    switch (id) {
      case 1:
        return "purchased_once";
      case 4:
        return "purchased_more";
      case 5:
        return "never_purchased";
      default:
        return "all";
    }
  };

  return (
    <div className="bg-[#f9fafb] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh] font-['Inter',sans-serif] text-[#111827] pb-[60px]">
      <div className="flex justify-between items-end mb-[24px]">
        <div className="header-text">
          <h2 className="font-['Merriweather',serif] text-[26px] font-[700] m-0 text-[#111]">Segments</h2>
          <p className="text-[#6b7280] text-[14px] mt-[4px]">Group your audience for better marketing</p>
        </div>
        <div className="flex gap-[12px]">
          <button className="bg-[#fbb03b] text-black border-none p-[8px_20px] rounded-[8px] font-[600] text-[13px] cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-200 hover:bg-[#f59e0b] hover:translate-y-[-1px]">Create segment</button>
        </div>
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-[12px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] overflow-hidden max-lg:overflow-x-auto">
        <div className="p-[16px_20px] border-b border-[#f3f4f6] flex justify-between items-center bg-white">
          <div className="flex-1 max-w-full flex items-center bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px] p-[8px_12px] transition-all duration-200 focus-within:bg-white focus-within:border-[#fbb03b] focus-within:shadow-[0_0_0_3px_rgba(251,176,59,0.1)]">
            <FaSearch className="text-[#9ca3af]" />
            <input type="text" placeholder="Search segments" className="border-none bg-transparent w-full ml-[10px] text-[13px] text-[#111] outline-none" />
          </div>
        </div>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th width="50" className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">
                <input type="checkbox" className="w-[16px] h-[16px] border border-[#d1d5db] rounded-[4px] accent-[#fbb03b] cursor-pointer" />
              </th>
              <th className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Name</th>
              <th align="right" className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">% of customers</th>
              <th align="right" className="p-[14px_24px] text-[11px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Last activity</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center padding-[60px] text-[#9ca3af]">
                  Loading segments...
                </td>
              </tr>
            ) : (
              segments.map((seg) => (
                <tr
                  key={seg.id}
                  // FIX: CLICK HANDLER IS NOW CORRECTLY PLACED HERE
                  onClick={() =>
                    navigate(
                      `/react-admin/customers?segment=${getFilterType(seg.id)}`
                    )
                  }
                  className="hover:bg-[#fffbeb] cursor-pointer"
                >
                  <td className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151]">
                    <input
                      type="checkbox"
                      onClick={(e) => e.stopPropagation()}
                      className="w-[16px] h-[16px] border border-[#d1d5db] rounded-[4px] accent-[#fbb03b] cursor-pointer"
                    />
                  </td>
                  <td className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151]">
                    <span
                      className="text-[14px] font-[600] text-[#202223] cursor-pointer hover:underline hover:text-[#fbb03b]"
                    >
                      {seg.name}
                    </span>
                  </td>
                  <td align="right" className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151]">
                    <span className="bg-white border border-[#e5e7eb] p-[4px_10px] rounded-[6px] text-[12px] font-[600] text-[#374151]">{seg.percent}</span>
                  </td>
                  <td
                    align="right"
                    className="p-[16px_24px] border-b border-[#f3f4f6] align-middle text-[13px] text-[#6b7280]"
                  >
                    {seg.updated}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerSegments;
