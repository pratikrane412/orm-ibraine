import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaSave, FaImage, FaPlus } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

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
    fetch("https://orm-backend-gejw.onrender.com/api/blog-categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    if (isEdit) {
      fetch(`https://orm-backend-gejw.onrender.com/api/blog/${id}/`)
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
                : `https://orm-backend-gejw.onrender.com${data.image}`,
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
    const res = await fetch("https://orm-backend-gejw.onrender.com/api/blog-categories/", {
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
      ? `https://orm-backend-gejw.onrender.com/api/blog/${id}/`
      : "https://orm-backend-gejw.onrender.com/api/blog/";
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
    <div className="p-[30px] w-full">
      <div className="flex justify-between items-center mb-[30px]">
        <div className="flex items-center gap-[15px]">
          <Link to="/react-admin/blog" className="w-[40px] h-[40px] bg-white border border-[#ddd] rounded-full flex items-center justify-center text-[#666] transition-all hover:bg-orm-gold hover:text-white hover:border-orm-gold">
            <FaArrowLeft />
          </Link>
          <h2 className="text-[1.5rem] font-bold text-[#111]">{isEdit ? "Edit Post" : "New Post"}</h2>
        </div>
        <button className="bg-orm-gold text-black px-[20px] py-[10px] rounded-[6px] font-semibold flex items-center gap-[8px] transition-all hover:bg-orm-yellow shadow-sm" onClick={handleSubmit}>
          <FaSave /> {isEdit ? "Update" : "Publish"}
        </button>
      </div>

      <form
        className="grid gap-[25px]"
        style={{ gridTemplateColumns: "2fr 1fr" }}
      >
        <div className="flex flex-col">
          <div className="bg-white p-[25px] rounded-[12px] border border-[#e5e7eb] shadow-sm mb-[25px]">
            <div className="mb-[20px]">
              <label className="block font-semibold text-[#374151] mb-[8px] text-[0.95rem]">Title</label>
              <input
                type="text"
                className="w-full p-[12px] border border-[#ddd] rounded-[8px] outline-none focus:border-orm-gold transition-all"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Blog Title"
              />
            </div>
            <div className="mb-[20px]">
              <label className="block font-semibold text-[#374151] mb-[8px] text-[0.95rem]">Content</label>
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

        <div className="flex flex-col">
          <div className="bg-white p-[25px] rounded-[12px] border border-[#e5e7eb] shadow-sm mb-[25px]">
            <h3 className="text-[1.1rem] font-bold text-[#111] mb-[15px]">Featured Image</h3>
            <div className="relative border-2 border-dashed border-[#ddd] rounded-[12px] flex flex-col items-center justify-center cursor-pointer transition-all hover:border-orm-gold hover:bg-[#fffcf5] overflow-hidden" style={{ height: "200px" }}>
              {preview ? (
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover rounded-[8px]"
                />
              ) : (
                <div className="text-center text-[#999]">
                  <FaImage size={30} className="mx-auto mb-[5px]" />
                  <p>Upload Cover</p>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
          </div>

          {/* CATEGORIES CARD */}
          <div className="bg-white p-[25px] rounded-[12px] border border-[#e5e7eb] shadow-sm mb-[25px]">
            <div
              className="flex justify-between items-center mb-[10px]"
            >
              <h3 className="text-[1.1rem] font-bold text-[#111]">Categories</h3>
              <button
                type="button"
                className="bg-none border-none text-orm-gold cursor-pointer p-[5px]"
                onClick={() => setShowAddCat(!showAddCat)}
              >
                <FaPlus />
              </button>
            </div>

            {showAddCat && (
              <div
                className="flex gap-[5px] mb-[15px]"
              >
                <input
                  type="text"
                  className="flex-1 p-[8px] border border-[#ddd] rounded-[6px] outline-none text-[0.9rem]"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="New Category..."
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="bg-orm-gold text-black px-[10px] py-[5px] rounded-[6px] text-[12px] font-semibold hover:bg-orm-yellow transition-all"
                >
                  Add
                </button>
              </div>
            )}

            <div className="mb-[20px]">
              <select
                className="w-full p-[10px] border border-[#ddd] rounded-[6px] outline-none focus:border-orm-gold transition-all"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
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

          <div className="bg-white p-[25px] rounded-[12px] border border-[#e5e7eb] shadow-sm mb-[25px]">
            <h3 className="text-[1.1rem] font-bold text-[#111] mb-[15px]">Visibility</h3>
            <div className="flex items-center gap-[10px]">
              <input
                type="checkbox"
                className="w-[18px] h-[18px] cursor-pointer"
                checked={formData.is_published}
                onChange={(e) =>
                  setFormData({ ...formData, is_published: e.target.checked })
                }
              />
              <label className="font-semibold text-[#374151]">Visible</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
