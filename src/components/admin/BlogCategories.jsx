import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import "../../styles/admin/Collections.css"; // Reuse table styles

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
    <div className="admin-page-container collections-wrapper">
      {/* HEADER */}
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Blog Categories</h2>
          <p className="subtitle">Manage topics for your blog</p>
        </div>
      </div>

      {/* ADD NEW SECTION */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          border: "1px solid #e5e7eb",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Enter new category name..."
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            outline: "none",
          }}
        />
        <button
          onClick={handleAddCategory}
          className="admin-btn-primary"
          style={{ padding: "10px 20px" }}
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th width="50">ID</th>
                <th>Category Name</th>
                <th align="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>#{cat.id}</td>
                    <td>
                      <span className="collection-title">{cat.name}</span>
                    </td>
                    <td align="right">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        style={{
                          color: "#ef4444",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">
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
