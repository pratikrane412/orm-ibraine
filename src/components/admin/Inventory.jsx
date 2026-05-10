import React, { useState, useEffect } from "react";
import { FaSearch, FaSave } from "react-icons/fa";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [changes, setChanges] = useState({});

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  const handleStockChange = (id, value) => {
    const newValue = parseInt(value) || 0;
    setChanges((prev) => ({ ...prev, [id]: { stock_quantity: newValue } }));
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock_quantity: newValue } : p)),
    );
  };

  const saveStock = async (product) => {
    const productId = product.id;
    const productSlug = product.slug;

    if (!changes[productId]) return;

    // 1. GET THE CORRECT TOKEN NAME FROM YOUR SCREENSHOT
    const token = localStorage.getItem("orm_admin_token");

    if (!token) {
      alert(
        "Authentication Error: No token found. Please log out and log in again.",
      );
      return;
    }

    try {
      const response = await fetch(
        `https://orm-backend-gejw.onrender.com/api/products/${productSlug}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // The backend expects "Token <key>"
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(changes[productId]),
        },
      );

      if (response.ok) {
        alert("Inventory Updated!");
        const newChanges = { ...changes };
        delete newChanges[productId];
        setChanges(newChanges);
      } else {
        const errData = await response.json();
        console.error("Backend Error:", errData);
        alert(`Server Error: ${errData.detail || "Update failed"}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Connection to server failed.");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toString().includes(searchTerm),
  );

  return (
    <div className="bg-[#ffffff] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh] font-['Inter',sans-serif] text-[#111827] pb-[60px]">
      <div className="mb-[25px]">
        <div className="header-text">
          <h2 className="font-['Merriweather',serif] text-[24px] font-[700] m-0 text-[#111]">Inventory</h2>
          <p className="text-[#6b7280] text-[14px] mt-[4px]">Manage stock availability</p>
        </div>
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-[12px] box-shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-[12px_20px] border-b border-[#e5e7eb] bg-white flex flex-col gap-[15px]">
          <div className="flex gap-[8px]">
            <button className="bg-[#1f2937] text-white p-[6px_14px] rounded-[6px] text-[13px] font-[600] border-none cursor-pointer">All Products</button>
          </div>

          <div className="flex items-center border border-[#d1d5db] rounded-[8px] p-[8px_12px] w-full max-w-full transition-all duration-200 bg-[#f9fafb] focus-within:border-[#fbb03b] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(251,176,59,0.1)]">
            <FaSearch className="text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none outline-none w-full text-[14px] ml-[10px] bg-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center padding-[60px] text-[#9ca3af]">Loading...</div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th width="60" className="p-[12px_20px] text-[12px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Image</th>
                <th className="p-[12px_20px] text-[12px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Product</th>
                <th className="p-[12px_20px] text-[12px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">SKU</th>
                <th align="center" className="p-[12px_20px] text-[12px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Available</th>
                <th width="80" className="p-[12px_20px] text-[12px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">On Hand</th>
                <th width="50" className="p-[12px_20px] text-[12px] font-[600] text-[#6b7280] uppercase tracking-[0.05em] bg-[#f9fafb] border-b border-[#e5e7eb]">Save</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const stock = changes[p.id]?.stock_quantity ?? p.stock_quantity;
                return (
                  <tr key={p.id} className="hover:bg-[#fffbeb]">
                    <td className="p-[12px_20px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151] bg-white">
                      <div className="w-[40px] h-[40px] rounded-[6px] overflow-hidden border border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-center">
                        <img src={getImageUrl(p.image)} alt={p.title} className="w-full h-full object-cover block" />
                      </div>
                    </td>
                    <td className="p-[12px_20px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151] bg-white">
                      <strong className="font-[600] text-[#111] text-[14px]">{p.title}</strong>
                      <div style={{ fontSize: "10px", color: "#888" }}>
                        /{p.slug}
                      </div>
                    </td>
                    <td className="p-[12px_20px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151] bg-white font-['Inter',monospace] text-[12px] text-[#6b7280]">ORM-{p.id}</td>
                    <td align="center" className="p-[12px_20px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151] bg-white">
                      <input
                        type="number"
                        className="w-[80px] p-[8px] border border-[#d1d5db] rounded-[6px] text-center font-[600] text-[14px] text-[#111] bg-white transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.2)] outline-none"
                        value={stock}
                        onChange={(e) =>
                          handleStockChange(p.id, e.target.value)
                        }
                      />
                    </td>
                    <td align="center" className="p-[12px_20px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151] bg-white">
                      <span className="inline-block p-[4px_10px] rounded-[6px] text-[13px] font-[600] min-w-[40px] text-center">{stock}</span>
                    </td>
                    <td className="p-[12px_20px] border-b border-[#f3f4f6] align-middle text-[14px] text-[#374151] bg-white">
                      {changes[p.id] && (
                        <button
                          className="bg-[#111] text-[#fbb03b] border-none w-[32px] h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-black hover:scale-105"
                          onClick={() => saveStock(p)}
                        >
                          <FaSave />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Inventory;
