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
    { label: "All Sectors", value: "All" },
    { label: "Thar & Roxx", value: "Thar" },
    { label: "Scorpio", value: "Scorpio" },
    { label: "Hilux", value: "Hilux" },
    { label: "Fortuner", value: "Fortuner" },
    { label: "Suzuki Jimny", value: "Jimny" },
    { label: "Defender", value: "Defender" },
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

  // --- DELETE LOGIC ---
  const handleDelete = async (slug, id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `https://orm-backend-gejw.onrender.com/api/products/${slug}/`,
          { method: "DELETE" },
        );
        if (response.ok) {
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
    <div className="space-y-8 animate-fadeInUp">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">Inventory Management</span>
          </div>
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">All <span className="text-orm-gold">Products</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">Managing {filteredProducts.length} Products</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-white/[0.03] border border-white/10 px-4 py-3 rounded-xl w-[240px] focus-within:border-orm-gold/50 transition-all">
            <FaSearch className="text-white/20" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none ml-3 w-full text-[0.75rem] font-bold text-white placeholder:text-white/10 tracking-tight"
            />
          </div>

          <select
            className="bg-white/[0.03] border border-white/10 px-4 py-3 rounded-xl text-white/60 text-[0.7rem] font-bold outline-none focus:border-orm-gold/50 cursor-pointer transition-all"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-orm-dark text-white">{opt.label}</option>
            ))}
          </select>

          <select
            className="bg-white/[0.03] border border-white/10 px-4 py-3 rounded-xl text-white/60 text-[0.7rem] font-bold outline-none focus:border-orm-gold/50 cursor-pointer transition-all"
            value={selectedSaleStatus}
            onChange={(e) => setSelectedSaleStatus(e.target.value)}
          >
            <option value="All" className="bg-orm-dark text-white">All Status</option>
            <option value="On Sale" className="bg-orm-dark text-white">On Sale</option>
            <option value="Regular" className="bg-orm-dark text-white">Regular</option>
          </select>

          <Link to="/react-admin/add-product" className="group relative overflow-hidden bg-orm-gold text-black px-6 py-3 rounded-xl font-black text-[0.7rem] uppercase tracking-[0.2em] transition-all flex items-center gap-2 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:-translate-y-1">
            <span className="relative z-10 flex items-center gap-2"><FaPlus size={10} /> Add Product</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
          </Link>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Loading Products...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01]">
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Image</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Product Information</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Category</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Inventory</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Price</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Status</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="group transition-all hover:bg-white/[0.02]">
                      <td className="p-6">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/5 bg-orm-dark group-hover:border-orm-gold/30 transition-all duration-500">
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-white text-[0.85rem] tracking-tight group-hover:text-orm-gold transition-colors">{product.title}</span>
                          <span className="text-[0.5rem] font-black text-white/20 uppercase tracking-[0.2em]">URL: /{product.slug}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-white/[0.05] border border-white/5 rounded-lg text-[0.6rem] font-black text-white/60 uppercase tracking-widest">{product.category}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                           <div className={`w-1.5 h-1.5 rounded-full ${product.stock_quantity > 0 ? "bg-green-500" : "bg-red-500"} animate-pulse`}></div>
                           <span className={`text-[0.65rem] font-bold ${product.stock_quantity > 0 ? "text-white/60" : "text-red-500/60 uppercase tracking-widest"}`}>
                             {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}
                           </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="font-black text-white text-[0.8rem] tracking-tighter">Rs. {Number(product.price).toLocaleString()}</span>
                      </td>
                      <td className="p-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${product.is_sale ? "bg-orm-gold/10 border-orm-gold/20 text-orm-gold" : "bg-white/5 border-white/10 text-white/30"}`}>
                           <div className={`w-1 h-1 rounded-full ${product.is_sale ? "bg-orm-gold" : "bg-white/40"}`}></div>
                           <span className="text-[0.55rem] font-black uppercase tracking-widest">{product.is_sale ? "On Sale" : "Regular"}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-end gap-2">
                          <button
                            className="w-10 h-10 rounded-xl bg-white/5 text-white/20 flex items-center justify-center transition-all hover:bg-orm-gold hover:text-black active:scale-90"
                            onClick={() => navigate(`/react-admin/edit-product/${product.slug}`)}
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            className="w-10 h-10 rounded-xl bg-white/5 text-white/20 flex items-center justify-center transition-all hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 active:scale-90"
                            onClick={() => handleDelete(product.slug, product.id)}
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-20 text-center">
                       <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/10">No products found</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) }
      </div>
    </div>
  );
};

export default AllProducts;
