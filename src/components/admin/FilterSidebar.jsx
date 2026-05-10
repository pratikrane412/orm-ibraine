import React from "react";

const categories = [
  "All",
  "Mahindra Thar & Roxx",
  "Scorpio",
  "Toyota Hilux",
  "Toyota Fortuner",
  "Suzuki Jimny",
  "Range Rover Defender",
];

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedSaleStatus,
  setSelectedSaleStatus,
  counts,
}) => {
  return (
    <div className="w-[280px] bg-white pr-[10px] shrink-0">
      {/* CATEGORY FILTER */}
      <div className="mb-[25px]">
        <h3 className="text-[0.95rem] text-[#374151] mb-[12px] font-semibold">By category</h3>
        <div className="border border-[#e5e7eb] rounded-[6px] overflow-hidden">
          {categories.map((cat) => (
            <div
              key={cat}
              className={`p-[12px_16px] border-b border-[#e5e7eb] text-[0.9rem] text-[#6b7280] cursor-pointer transition-all flex justify-between hover:bg-[#f9fafb] hover:text-[#111] last:border-b-0 ${
                selectedCategory === cat ? "text-orm-gold font-semibold bg-white" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              {/* Only show count if not 'All' and count exists */}
              {cat !== "All" && counts[cat] !== undefined && (
                <span className="text-[#9ca3af] text-[0.85rem] font-normal">({counts[cat]})</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SALE STATUS FILTER */}
      <div className="mb-[25px]">
        <h3 className="text-[0.95rem] text-[#374151] mb-[12px] font-semibold">By is sale</h3>
        <div className="flex border border-[#e5e7eb] rounded-[6px] overflow-hidden">
          <button
            className={`flex-1 bg-white border-r border-[#e5e7eb] p-[10px] text-[0.9rem] text-[#6b7280] cursor-pointer transition-all hover:bg-[#f9fafb] ${
              selectedSaleStatus === "All" ? "text-orm-gold font-semibold bg-white" : ""
            }`}
            onClick={() => setSelectedSaleStatus("All")}
          >
            All
          </button>
          <button
            className={`flex-1 bg-white border-r border-[#e5e7eb] p-[10px] text-[0.9rem] text-[#6b7280] cursor-pointer transition-all hover:bg-[#f9fafb] ${
              selectedSaleStatus === "Yes" ? "text-orm-gold font-semibold bg-white" : ""
            }`}
            onClick={() => setSelectedSaleStatus("Yes")}
          >
            Yes {counts.saleYes ? `(${counts.saleYes})` : ""}
          </button>
          <button
            className={`flex-1 bg-white p-[10px] text-[0.9rem] text-[#6b7280] cursor-pointer transition-all hover:bg-[#f9fafb] ${
              selectedSaleStatus === "No" ? "text-orm-gold font-semibold bg-white" : ""
            }`}
            onClick={() => setSelectedSaleStatus("No")}
          >
            No {counts.saleNo ? `(${counts.saleNo})` : ""}
          </button>
        </div>
      </div>

      {/* Optional: Show/Hide Counts Button (Visual only for now) */}
      <button className="w-full p-[10px] bg-white border border-[#e5e7eb] rounded-[6px] text-[#4b5563] text-[0.9rem] cursor-pointer mt-[10px] hover:bg-[#f9fafb]">Hide counts</button>
    </div>
  );
};

export default FilterSidebar;
