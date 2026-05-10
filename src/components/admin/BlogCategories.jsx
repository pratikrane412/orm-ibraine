import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

const BlogCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Categories
  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/blog-categories/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  // Add Category
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

  // Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
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
    <div className="p-[30px] w-full max-w-[1400px] mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-[30px]">
        <div>
          <h2 className="text-[1.8rem] font-bold text-[#111]">Blog Categories</h2>
          <p className="text-[#6b7280] text-[0.95rem]">Manage topics for your blog</p>
        </div>
      </div>

      {/* ADD NEW SECTION */}
      <div
        className="bg-white p-[20px] rounded-[12px] mb-[20px] border border-[#e5e7eb] flex gap-[10px]"
      >
        <input
          type="text"
          placeholder="Enter new category name..."
          className="flex-1 p-[10px] border border-[#ddd] rounded-[6px] outline-none focus:border-orm-gold transition-all"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
        />
        <button
          onClick={handleAddCategory}
          className="bg-orm-gold text-black px-[20px] py-[10px] rounded-[6px] font-semibold flex items-center gap-[8px] hover:bg-orm-yellow transition-all"
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-[40px] text-center text-[#666]">Loading...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="p-[15px] text-left text-[0.85rem] font-bold text-[#374151] uppercase tracking-wider w-[50px]">ID</th>
                <th className="p-[15px] text-left text-[0.85rem] font-bold text-[#374151] uppercase tracking-wider">Category Name</th>
                <th className="p-[15px] text-right text-[0.85rem] font-bold text-[#374151] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#fffcf5] transition-colors">
                    <td className="p-[15px] text-[0.9rem] text-[#6b7280]">#{cat.id}</td>
                    <td className="p-[15px]">
                      <span className="font-semibold text-[#111]">{cat.name}</span>
                    </td>
                    <td className="p-[15px] text-right">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-[#ef4444] bg-none border-none cursor-pointer p-[8px] hover:bg-red-50 rounded-full transition-all"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-[40px] text-center text-[#9ca3af]">
                    No categories found
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

export default BlogCategories;
