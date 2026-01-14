import React from "react";
import "../../styles/admin/FilterSidebar.css"; // We will create this CSS

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
    <div className="filter-sidebar">
      {/* CATEGORY FILTER */}
      <div className="filter-group">
        <h3>By category</h3>
        <div className="filter-list">
          {categories.map((cat) => (
            <div
              key={cat}
              className={`filter-item ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
              {/* Only show count if not 'All' and count exists */}
              {cat !== "All" && counts[cat] !== undefined && (
                <span className="count">({counts[cat]})</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SALE STATUS FILTER */}
      <div className="filter-group">
        <h3>By is sale</h3>
        <div className="filter-toggle-row">
          <button
            className={`toggle-btn ${
              selectedSaleStatus === "All" ? "active" : ""
            }`}
            onClick={() => setSelectedSaleStatus("All")}
          >
            All
          </button>
          <button
            className={`toggle-btn ${
              selectedSaleStatus === "Yes" ? "active" : ""
            }`}
            onClick={() => setSelectedSaleStatus("Yes")}
          >
            Yes {counts.saleYes ? `(${counts.saleYes})` : ""}
          </button>
          <button
            className={`toggle-btn ${
              selectedSaleStatus === "No" ? "active" : ""
            }`}
            onClick={() => setSelectedSaleStatus("No")}
          >
            No {counts.saleNo ? `(${counts.saleNo})` : ""}
          </button>
        </div>
      </div>

      {/* Optional: Show/Hide Counts Button (Visual only for now) */}
      <button className="show-counts-btn">Hide counts</button>
    </div>
  );
};

export default FilterSidebar;
