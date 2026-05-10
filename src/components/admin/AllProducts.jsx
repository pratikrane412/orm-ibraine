import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSaleStatus, setSelectedSaleStatus] = useState("All");

  const categoryOptions = [
    { label: "All Categories", value: "All" },
    { label: "Mahindra Thar & Roxx", value: "Thar" },
    { label: "Scorpio", value: "Scorpio" },
    { label: "Toyota Hilux", value: "Hilux" },
    { label: "Toyota Fortuner", value: "Fortuner" },
    { label: "Suzuki Jimny", value: "Jimny" },
    { label: "Range Rover Defender", value: "Defender" },
  ];

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // --- FILTER LOGIC ---
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSale =
      selectedSaleStatus === "All"
        ? true
        : selectedSaleStatus === "On Sale"
          ? product.is_sale === true
          : product.is_sale === false;

    return matchesSearch && matchesCategory && matchesSale;
  });

  // --- DELETE LOGIC (UPDATED TO USE SLUG) ---
  const handleDelete = async (slug, id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Since backend uses lookup_field='slug', we must delete via slug
        const response = await fetch(
          `https://orm-backend-gejw.onrender.com/api/products/${slug}/`,
          { method: "DELETE" },
        );
        if (response.ok) {
          // Update local state using ID for efficiency
          setProducts(products.filter((product) => product.id !== id));
        } else {
          alert("Failed to delete. The product might have dependencies.");
        }
      } catch (error) {
        alert("Server Error");
      }
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  return (
    <div className="bg-[#ffffff] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh]">
      <div className="flex justify-between items-center mb-[25px] flex-wrap gap-[20px]">
        <div className="header-text">
          <h2 className="font-['Merriweather',serif] text-[1.8rem] text-[#0f172a] m-0">All Products</h2>
          <p className="text-[#64748b] text-[0.9rem] mt-[4px]">
            Manage inventory ({filteredProducts.length})
          </p>
        </div>

        <div className="flex items-center gap-[12px]">
          <div className="flex items-center bg-white border border-[#e2e8f0] p-[10px_14px] rounded-[8px] w-[200px] transition-all duration-200 focus-within:border-[#fbb03b] focus-within:shadow-[0_0_0_3px_rgba(251,176,59,0.1)]">
            <FaSearch className="text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none outline-none ml-[8px] w-full text-[0.9rem] text-[#334155] bg-transparent"
            />
          </div>

          <select
            className="p-[10px_12px] bg-white border border-[#e2e8f0] rounded-[8px] text-[#334155] text-[0.9rem] font-['Inter',sans-serif] cursor-pointer outline-none transition-all duration-200 focus:border-[#fbb03b]"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            className="p-[10px_12px] bg-white border border-[#e2e8f0] rounded-[8px] text-[#334155] text-[0.9rem] font-['Inter',sans-serif] cursor-pointer outline-none transition-all duration-200 focus:border-[#fbb03b]"
            value={selectedSaleStatus}
            onChange={(e) => setSelectedSaleStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="On Sale">On Sale</option>
            <option value="Regular">Regular</option>
          </select>

          <Link to="/react-admin/add-product" className="bg-[#fbb03b] text-black p-[10px_20px] rounded-[8px] no-underline font-[600] text-[0.95rem] flex items-center gap-[8px] transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.1)] whitespace-nowrap hover:bg-[#f59e0b] hover:translate-y-[-1px]">
            <FaPlus /> <span>Add</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        {loading ? (
          <div className="text-center padding-[50px] text-[#64748b]">Loading...</div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th width="70" className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Image</th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Product Information</th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Category</th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Inventory</th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Price</th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Status</th>
                <th align="right" className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[#f1f5f9] last:border-b-0 hover:bg-[#fffbeb]">
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <div className="w-[48px] h-[48px] rounded-[6px] overflow-hidden border border-[#e2e8f0] bg-[#f8fafc]">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <div className="flex flex-col gap-[2px]">
                        <span className="font-[600] text-[#0f172a] text-[0.95rem]">{product.title}</span>
                        {/* Displaying Slug for Admin clarity */}
                        <span className="text-[0.75rem] text-[#94a3b8]">
                          URL: /{product.slug}
                        </span>
                      </div>
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <span className="bg-[#f1f5f9] text-[#475569] p-[4px_10px] rounded-[6px] text-[0.8rem] font-[500] border border-[#e2e8f0]">{product.category}</span>
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <span
                        className={`text-[0.8rem] font-[500] p-[4px_10px] rounded-[6px] whitespace-nowrap ${product.stock_quantity > 0 ? "text-[#374151] bg-[#f3f4f6] border border-[#e5e7eb]" : "text-[#ef4444] bg-[#fef2f2] border border-[#fecaca]"}`}
                      >
                        {product.stock_quantity > 0
                          ? `${product.stock_quantity} in stock`
                          : "Out of stock"}
                      </span>
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <div className="font-['Inter',sans-serif] font-[600] text-[#334155]">
                        Rs. {Number(product.price).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <span
                        className={`inline-flex items-center gap-[6px] p-[4px_10px] rounded-[20px] text-[0.8rem] font-[500] ${product.is_sale ? "bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]" : "bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]"}`}
                      >
                        <span className={`w-[6px] h-[6px] rounded-full ${product.is_sale ? "bg-[#059669]" : "bg-[#94a3b8]"}`}></span>{" "}
                        {product.is_sale ? "On Sale" : "Regular"}
                      </span>
                    </td>
                    <td align="right" className="p-[14px_20px] align-middle text-[#334155]">
                      <div className="flex justify-end gap-[8px]">
                        {/* EDIT BUTTON (USES SLUG) */}
                        <button
                          className="w-[32px] h-[32px] rounded-[6px] border border-transparent bg-transparent flex items-center justify-center cursor-pointer text-[#64748b] transition-all duration-200 hover:bg-white hover:border-[#e2e8f0] hover:shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:text-[#3b82f6]"
                          onClick={() =>
                            navigate(
                              `/react-admin/edit-product/${product.slug}`,
                            )
                          }
                        >
                          <FaEdit />
                        </button>
                        {/* DELETE BUTTON (USES SLUG) */}
                        <button
                          className="w-[32px] h-[32px] rounded-[6px] border border-transparent bg-transparent flex items-center justify-center cursor-pointer text-[#64748b] transition-all duration-200 hover:bg-white hover:border-[#e2e8f0] hover:shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:text-[#ef4444]"
                          onClick={() => handleDelete(product.slug, product.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center padding-[50px] text-[#64748b]">
                    No products found.
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

export default AllProducts;
