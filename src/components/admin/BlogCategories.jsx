import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaLayerGroup, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/blog-categories/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  const handleAddCategory = async () => {
    if (!newCatName) return;
    try {
      const res = await fetch("https://orm-backend-gejw.onrender.com/api/blog-categories/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName }),
      });
      if (res.ok) {
        const newCat = await res.json();
        setCategories([...categories, newCat]);
        setNewCatName("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this classification?")) return;
    try {
      await fetch(`https://orm-backend-gejw.onrender.com/api/blog-categories/${id}/`, {
        method: "DELETE",
      });
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
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
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">Blog <span className="text-orm-gold">Categories</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">Structuring Blog Content</p>
        </div>
        <Link to="/react-admin/blog" className="text-white/40 text-[0.6rem] font-black uppercase tracking-widest hover:text-orm-gold transition-colors flex items-center gap-2">
           <FaArrowLeft /> Back to Posts
        </Link>
      </div>

      {/* INPUT BOX */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] flex gap-4 items-center">
        <div className="flex-1 flex items-center bg-white/[0.03] border border-white/10 px-6 py-3 rounded-2xl focus-within:border-orm-gold/50 transition-all">
           <input
            type="text"
            placeholder="Enter category name..."
            className="w-full bg-transparent border-none outline-none text-white text-[0.8rem] font-bold placeholder:text-white/10"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddCategory}
          className="bg-orm-gold text-black px-8 py-3 rounded-2xl font-black text-[0.65rem] uppercase tracking-widest transition-all hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] active:scale-95"
        >
          <FaPlus className="inline mr-2" /> Add Category
        </button>
      </div>

      {/* TABLE BOX */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
               <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Loading Categories...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  <th width="80" className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">ID</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Category Name</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {categories.map((cat) => (
                  <tr key={cat.id} className="group transition-all hover:bg-white/[0.02]">
                    <td className="p-6">
                      <span className="font-mono text-[0.7rem] text-white/20 tracking-tighter">#{cat.id}</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-orm-gold"><FaLayerGroup size={12} /></div>
                         <span className="font-bold text-white text-[0.9rem] uppercase tracking-tight group-hover:text-orm-gold transition-colors">{cat.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="w-10 h-10 rounded-xl bg-white/5 text-white/20 flex items-center justify-center transition-all hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 active:scale-90"
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                   <tr>
                     <td colSpan="3" className="p-20 text-center text-white/10 font-black uppercase tracking-widest text-[0.6rem]">No categories defined</td>
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

export default BlogCategories;
