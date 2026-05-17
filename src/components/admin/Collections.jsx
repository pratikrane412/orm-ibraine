import React, { useState, useEffect } from "react";
import { FaPlus, FaImage, FaLayerGroup } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    setLoading(true);
    fetch("https://orm-backend-gejw.onrender.com/api/collections/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Collections Error:", err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (collection) => {
    if (collection.image) {
      return collection.image.startsWith("http")
        ? collection.image
        : `https://orm-backend-gejw.onrender.com${collection.image}`;
    }
    if (collection.first_product_image) {
      return `https://orm-backend-gejw.onrender.com${collection.first_product_image}`;
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeInUp pb-20">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">Organization</span>
          </div>
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">All <span className="text-orm-gold">Collections</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">Managing {collections.length} Product Groups</p>
        </div>

        <Link
          to="/react-admin/products/collections/new"
          className="group relative overflow-hidden bg-orm-gold text-black px-8 py-3 rounded-xl font-black text-[0.7rem] uppercase tracking-[0.2em] transition-all flex items-center gap-2 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:-translate-y-1"
        >
          <span className="relative z-10 flex items-center gap-2"><FaPlus size={10} /> Create Collection</span>
          <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
        </Link>
      </div>

      {/* TABLE BOX */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        {/* TAB BAR */}
        <div className="p-6 border-b border-white/5 flex items-center bg-white/[0.01]">
           <div className="flex gap-2">
              <button className="px-6 py-2 rounded-full text-[0.6rem] font-black uppercase tracking-widest bg-orm-gold text-black shadow-lg shadow-orm-gold/20 transition-all">All Collections</button>
           </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
               <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Loading Collections...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  <th width="50" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">
                     <input type="checkbox" className="accent-orm-gold" />
                  </th>
                  <th width="100" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Visual</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Collection Name</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Product Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {collections.length > 0 ? (
                  collections.map((col) => (
                    <tr
                      key={col.id}
                      onClick={() => navigate(`/react-admin/products/collections/${col.id}`)}
                      className="group transition-all hover:bg-white/[0.02] cursor-pointer"
                    >
                      <td className="p-6">
                         <input type="checkbox" className="accent-orm-gold" onClick={(e) => e.stopPropagation()} />
                      </td>
                      <td className="p-6">
                        <div className="w-16 h-16 bg-orm-dark border border-white/5 rounded-2xl overflow-hidden group-hover:border-orm-gold/30 transition-all duration-500 flex items-center justify-center">
                          {getImageUrl(col) ? (
                            <img src={getImageUrl(col)} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <FaLayerGroup className="text-white/10 text-xl" />
                          )}
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="font-bold text-white text-[0.9rem] uppercase tracking-tight group-hover:text-orm-gold transition-colors">{col.title}</span>
                        <div className="text-[0.5rem] font-black text-white/10 uppercase tracking-[0.2em] mt-1">ID: 00{col.id}</div>
                      </td>
                      <td className="p-6 text-right">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[0.6rem] font-black text-white/60 uppercase tracking-widest group-hover:text-orm-gold group-hover:border-orm-gold/40 transition-all">
                          {col.product_count || 0} products
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-20 text-center">
                       <div className="space-y-4">
                          <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/10">No collections found</p>
                          <Link to="/react-admin/products/collections/new" className="text-orm-gold text-[0.65rem] font-black uppercase tracking-widest hover:underline">Create First Collection &rarr;</Link>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
