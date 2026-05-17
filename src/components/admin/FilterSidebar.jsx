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
    <div className="w-[280px] bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shrink-0 h-fit sticky top-32 animate-fadeInUp">
      {/* CATEGORY FILTER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-1.5 h-1.5 bg-orm-gold rounded-full shadow-[0_0_8px_#fbb03b]"></div>
           <h3 className="text-[0.65rem] font-black text-white/40 uppercase tracking-[0.3em]">Category Filter</h3>
        </div>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <div
              key={cat}
              className={`p-4 rounded-xl text-[0.75rem] font-bold tracking-tight cursor-pointer transition-all flex justify-between items-center group ${
                selectedCategory === cat 
                  ? "bg-orm-gold text-black shadow-lg shadow-orm-gold/10" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span className="truncate pr-2">{cat}</span>
              {cat !== "All" && counts[cat] !== undefined && (
                <span className={`text-[0.6rem] font-black uppercase px-2 py-0.5 rounded-md ${selectedCategory === cat ? "bg-black/10 text-black" : "bg-white/5 text-white/20 group-hover:text-white/40"}`}>
                  {counts[cat]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SALE STATUS FILTER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-1.5 h-1.5 bg-orm-gold rounded-full shadow-[0_0_8px_#fbb03b]"></div>
           <h3 className="text-[0.65rem] font-black text-white/40 uppercase tracking-[0.3em]">Sale Status</h3>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {[
            { label: "All Status", value: "All", count: null },
            { label: "On Sale", value: "Yes", count: counts.saleYes },
            { label: "Regular Price", value: "No", count: counts.saleNo },
          ].map((status) => (
            <button
              key={status.value}
              className={`p-4 rounded-xl text-[0.75rem] font-bold tracking-tight transition-all flex justify-between items-center group ${
                selectedSaleStatus === status.value 
                  ? "bg-orm-gold text-black shadow-lg shadow-orm-gold/10" 
                  : "bg-white/[0.02] border border-white/5 text-white/40 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => setSelectedSaleStatus(status.value)}
            >
              <span>{status.label}</span>
              {status.count !== null && (
                 <span className={`text-[0.6rem] font-black px-2 py-0.5 rounded-md ${selectedSaleStatus === status.value ? "bg-black/10 text-black" : "bg-white/5 text-white/20"}`}>
                    {status.count}
                 </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[0.6rem] font-black text-white/20 uppercase tracking-[0.2em] transition-all hover:bg-white/10 hover:text-white/40">
        Reset Analytics View
      </button>
    </div>
  );
};

export default FilterSidebar;
