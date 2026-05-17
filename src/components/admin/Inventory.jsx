import React, { useState, useEffect } from "react";
import { FaSearch, FaSave, FaCubes, FaExclamationTriangle } from "react-icons/fa";

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

    const token = localStorage.getItem("orm_admin_token");
    if (!token) {
      alert("Auth Error: Re-login Required");
      return;
    }

    try {
      const response = await fetch(`https://orm-backend-gejw.onrender.com/api/products/${productSlug}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(changes[productId]),
      });

      if (response.ok) {
        alert("Sector Stock Synchronized");
        const newChanges = { ...changes };
        delete newChanges[productId];
        setChanges(newChanges);
      } else {
        alert("Sync Protocol Failed");
      }
    } catch (error) {
      alert("Connection Terminal Error");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toString().includes(searchTerm),
  );

  return (
    <div className="space-y-8 animate-fadeInUp pb-20">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">Stock Management</span>
          </div>
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">Product <span className="text-orm-gold">Inventory</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">Managing Stock Quantities</p>
        </div>
        
        <div className="flex items-center bg-white/[0.03] border border-white/10 px-4 py-3 rounded-xl w-[340px] focus-within:border-orm-gold/50 transition-all">
          <FaSearch className="text-white/20" />
          <input 
            type="text" 
            placeholder="Search by ID or title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none ml-3 w-full text-[0.7rem] font-bold text-white placeholder:text-white/10 tracking-tight" 
          />
        </div>
      </div>

      {/* TABLE BOX */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
               <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Scanning Inventory...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  <th width="80" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Image</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Product Name</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">ID</th>
                  <th align="center" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-center">Update Stock</th>
                  <th width="120" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-center">In Stock</th>
                  <th width="80" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredProducts.map((p) => {
                  const stock = changes[p.id]?.stock_quantity ?? p.stock_quantity;
                  return (
                    <tr key={p.id} className="group transition-all hover:bg-white/[0.02]">
                      <td className="p-6">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/5 bg-orm-dark group-hover:border-orm-gold/30 transition-all duration-500">
                          <img src={getImageUrl(p.image)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="font-bold text-white text-[0.8rem] uppercase tracking-tight group-hover:text-orm-gold transition-colors block">{p.title}</span>
                        <span className="text-[0.5rem] font-black text-white/10 uppercase tracking-[0.2em] mt-1">PATH: /{p.slug}</span>
                      </td>
                      <td className="p-6">
                        <span className="font-mono text-[0.65rem] text-white/40 tracking-widest bg-white/5 px-2 py-1 rounded-md">ID-{p.id}</span>
                      </td>
                      <td className="p-6 text-center">
                        <div className="inline-flex items-center bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden focus-within:border-orm-gold/50 transition-all">
                           <input
                            type="number"
                            className="w-[100px] bg-transparent p-3 text-center font-black text-[0.9rem] text-white outline-none"
                            value={stock}
                            onChange={(e) => handleStockChange(p.id, e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="flex flex-col items-center gap-1">
                           <span className={`text-[0.7rem] font-black ${stock > 0 ? "text-orm-gold" : "text-red-500"} tracking-tight`}>{stock} UNITS</span>
                           {stock === 0 && <FaExclamationTriangle className="text-red-500 text-[0.6rem] animate-pulse" />}
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        {changes[p.id] ? (
                          <button
                            className="w-10 h-10 bg-orm-gold text-black rounded-xl flex items-center justify-center transition-all hover:shadow-[0_0_20px_rgba(251,176,59,0.3)] active:scale-90 animate-fadeInUp"
                            onClick={() => saveStock(p)}
                          >
                            <FaSave size={14} />
                          </button>
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center text-white/5">
                             <FaSave size={14} />
                          </div>
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
    </div>
  );
};

export default Inventory;
