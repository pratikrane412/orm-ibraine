import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaSave, FaImage, FaPlus } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../styles/admin/AddProduct.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    is_published: true,
    category: "", // Holds the ID
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // State for Categories
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState("");
  const [showAddCat, setShowAddCat] = useState(false);

  useEffect(() => {
    // 1. Fetch Categories
    fetch("http://127.0.0.1:8000/api/blog-categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    if (isEdit) {
      fetch(`http://127.0.0.1:8000/api/blog/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title,
            content: data.content,
            is_published: data.is_published,
            category: data.category || "",
          });
          if (data.image)
            setPreview(
              data.image.startsWith("http")
                ? data.image
                : `http://127.0.0.1:8000${data.image}`,
            );
        });
    }
  }, [id, isEdit]);

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  // Add New Category Inline
  const handleAddCategory = async () => {
    if (!newCatName) return;
    const res = await fetch("http://127.0.0.1:8000/api/blog-categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName }),
    });
    const newCat = await res.json();
    setCategories([...categories, newCat]);
    setFormData({ ...formData, category: newCat.id }); // Auto-select it
    setNewCatName("");
    setShowAddCat(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("is_published", formData.is_published ? "True" : "False");
    if (formData.category) data.append("category", formData.category);
    if (imageFile) data.append("image", imageFile);

    const url = isEdit
      ? `http://127.0.0.1:8000/api/blog/${id}/`
      : "http://127.0.0.1:8000/api/blog/";
    const method = isEdit ? "PATCH" : "POST";

    await fetch(url, { method, body: data });
    navigate("/react-admin/blog");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="admin-page-container full-width">
      <div className="admin-header-row">
        <div
          className="header-left"
          style={{ display: "flex", alignItems: "center", gap: "15px" }}
        >
          <Link to="/react-admin/blog" className="back-btn">
            <FaArrowLeft />
          </Link>
          <h2>{isEdit ? "Edit Post" : "New Post"}</h2>
        </div>
        <button className="admin-btn primary" onClick={handleSubmit}>
          <FaSave /> {isEdit ? "Update" : "Publish"}
        </button>
      </div>

      <form
        className="add-product-layout"
        style={{ gridTemplateColumns: "2fr 1fr" }}
      >
        <div className="main-col">
          <div className="card">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Blog Title"
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={modules}
                style={{ height: "300px", marginBottom: "50px" }}
              />
            </div>
          </div>
        </div>

        <div className="side-col">
          <div className="card">
            <h3>Featured Image</h3>
            <div className="image-upload-zone" style={{ height: "200px" }}>
              {preview ? (
                <img
                  src={preview}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div style={{ textAlign: "center", color: "#999" }}>
                  <FaImage size={30} />
                  <p>Upload Cover</p>
                </div>
              )}
              <input
                type="file"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* CATEGORIES CARD */}
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3>Categories</h3>
              <button
                type="button"
                onClick={() => setShowAddCat(!showAddCat)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fbb03b",
                  cursor: "pointer",
                }}
              >
                <FaPlus />
              </button>
            </div>

            {showAddCat && (
              <div
                style={{ display: "flex", gap: "5px", marginBottom: "15px" }}
              >
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="New Category..."
                  style={{ padding: "5px", flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="admin-btn primary"
                  style={{ padding: "5px 10px", fontSize: "12px" }}
                >
                  Add
                </button>
              </div>
            )}

            <div className="form-group">
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="card">
            <h3>Visibility</h3>
            <div className="checkbox-row">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) =>
                  setFormData({ ...formData, is_published: e.target.checked })
                }
              />
              <label>Visible</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
