import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaSave, FaImage, FaPlus, FaPenNib, FaGlobe, FaEye } from "react-icons/fa";
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
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState("");
  const [showAddCat, setShowAddCat] = useState(false);

  useEffect(() => {
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

  const handleAddCategory = async () => {
    if (!newCatName) return;
    const res = await fetch("https://orm-backend-gejw.onrender.com/api/blog-categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName }),
    });
    const newCat = await res.json();
    setCategories([...categories, newCat]);
    setFormData({ ...formData, category: newCat.id });
    setNewCatName("");
    setShowAddCat(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

    try {
      await fetch(url, { method, body: data });
      alert("Intelligence Briefing Synchronized");
      navigate("/react-admin/blog");
    } catch (err) {
      alert("Sync Error Detected");
    } finally {
      setLoading(false);
    }
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
    <div className="space-y-10 animate-fadeInUp pb-20">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center bg-orm-surface/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link
            to="/react-admin/blog"
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 transition-all hover:text-white hover:border-white/20 active:scale-90"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
               <span className="text-[0.55rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">{isEdit ? "Edit Post" : "New Post"}</span>
            </div>
            <h2 className="text-[1.8rem] font-black text-white uppercase tracking-tighter leading-none">
              {isEdit ? "Update" : "Publish"} <span className="text-orm-gold">Post</span>
            </h2>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="px-8 py-4 rounded-xl font-black text-[0.65rem] uppercase tracking-[0.2em] border border-white/10 text-white/40 transition-all hover:bg-white/5 hover:text-white"
            onClick={() => navigate("/react-admin/blog")}
          >
            Discard
          </button>
          <button
            className="group relative overflow-hidden bg-orm-gold text-black px-10 py-4 rounded-xl font-black text-[0.65rem] uppercase tracking-[0.2em] transition-all flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span className="relative z-10 flex items-center gap-3">{loading ? "Saving..." : "Publish Post"} <FaSave /></span>
            <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
          </button>
        </div>
      </div>

      <form className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CONTENT */}
        <div className="col-span-8 flex flex-col gap-8 max-lg:col-span-12">
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <FaPenNib className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Post Content</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Post Title</label>
                <input
                  type="text"
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold tracking-tight outline-none focus:border-orm-gold/50 transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter post title..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Content</label>
                <div className="rich-editor-dark">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={handleContentChange}
                    modules={modules}
                    style={{ height: "400px", marginBottom: "60px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONFIG */}
        <div className="col-span-4 flex flex-col gap-8 max-lg:col-span-12">
          {/* VISUAL CACHE */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <FaImage className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Featured Image</h3>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-orm-dark border border-white/5 group">
              {preview ? (
                <img src={preview} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                   <FaGlobe size={32} className="mb-3 opacity-20" />
                   <span className="text-[0.5rem] font-black uppercase tracking-widest">No image attached</span>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
          </div>

          {/* CLASSIFICATIONS */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
             <div className="flex justify-between items-center">
                <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Category</h3>
                <button
                  type="button"
                  className="w-6 h-6 bg-orm-gold/10 text-orm-gold rounded-md flex items-center justify-center hover:bg-orm-gold hover:text-black transition-all"
                  onClick={() => setShowAddCat(!showAddCat)}
                >
                  <FaPlus size={10} />
                </button>
             </div>

             {showAddCat && (
                <div className="flex gap-2 animate-fadeInUp">
                  <input
                    type="text"
                    className="flex-1 bg-white/[0.03] border border-white/10 p-2.5 rounded-lg text-white text-[0.7rem] font-bold outline-none focus:border-orm-gold/50"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Category name..."
                  />
                  <button type="button" onClick={handleAddCategory} className="bg-orm-gold text-black px-4 rounded-lg text-[0.6rem] font-black uppercase">Add</button>
                </div>
             )}

             <select
                className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold tracking-tight outline-none focus:border-orm-gold/50 transition-all appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="" className="bg-orm-dark">Select Category</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id} className="bg-orm-dark">{cat.name}</option>)}
             </select>
          </div>

          {/* VISIBILITY */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-6">
            <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Visibility</h3>
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/10 group">
                <div className="flex flex-col">
                   <span className="text-[0.65rem] font-black text-white uppercase tracking-widest">Public</span>
                   <span className="text-[0.5rem] font-bold text-white/20 uppercase tracking-[0.2em]">Visible to visitors</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/20 after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orm-gold peer-checked:after:bg-black"></div>
                </label>
              </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
