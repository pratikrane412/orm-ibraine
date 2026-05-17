import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaTimes,
  FaSave,
  FaArrowLeft,
  FaImages,
  FaVideo,
  FaCube,
  FaCogs,
  FaTag,
  FaInfoCircle,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    weight: "",
    category: "Thar",
    description: "",
    price: "",
    old_price: "",
    rating: 4.5,
    is_sale: false,
    video_url: "",
    benefits_title: "",
    benefits_description: "",
    specifications: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [model3dFile, setModel3dFile] = useState(null);

  const [mainPreview, setMainPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  useEffect(() => {
    if (slug) {
      setIsEditMode(true);
      fetch(`https://orm-backend-gejw.onrender.com/api/products/${slug}/`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title,
            slug: data.slug,
            category: data.category,
            description: data.description || "",
            price: data.price,
            old_price: data.old_price || "",
            rating: data.rating,
            is_sale: data.is_sale,
            weight: data.weight || "",
            video_url: data.video_url || "",
            benefits_title: data.benefits_title || "",
            benefits_description: data.benefits_description || "",
            specifications: data.specifications || "",
          });

          if (data.image) {
            setMainPreview(
              data.image.startsWith("http")
                ? data.image
                : `https://orm-backend-gejw.onrender.com${data.image}`,
            );
          }

          if (data.images && data.images.length > 0) {
            const existing = data.images.map((img) => ({
              id: img.id,
              url: img.image.startsWith("http")
                ? img.image
                : `https://orm-backend-gejw.onrender.com${img.image}`,
              isExisting: true,
            }));
            setGalleryPreviews(existing);
          }
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setMainPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages([...galleryImages, ...files]);

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      isExisting: false,
    }));
    setGalleryPreviews([...galleryPreviews, ...newPreviews]);
  };

  const removeGalleryImage = async (index, imgObj) => {
    if (imgObj.isExisting) {
      const confirmDelete = window.confirm("Permanently delete image from server?");
      if (!confirmDelete) return;

      try {
        await fetch(`https://orm-backend-gejw.onrender.com/api/product-images/${imgObj.id}/`, {
          method: "DELETE",
        });
        setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
      } catch (err) {
        alert("Deletion failed");
      }
    } else {
      setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "slug") data.append(key, formData[key]);
    });

    if (mainImage) data.append("image", mainImage);
    if (videoFile) data.append("video_file", videoFile);
    if (model3dFile) data.append("model_3d", model3dFile);

    galleryImages.forEach((file) => {
      data.append("gallery_images", file);
    });

    try {
      const url = `https://orm-backend-gejw.onrender.com/api/products/${isEditMode ? slug + "/" : ""}`;
      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(url, { method, body: data });

      if (response.ok) {
        alert(isEditMode ? "Unit Protocol Updated" : "New Unit Fabricated");
        navigate("/react-admin/products");
      } else {
        alert("Fabrication Error Detected");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fadeInUp">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center bg-orm-surface/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 transition-all hover:text-white hover:border-white/20 active:scale-90"
            onClick={() => navigate("/react-admin/products")}
          >
            <FaArrowLeft />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
               <span className="text-[0.55rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">{isEditMode ? "Edit Product" : "New Product"}</span>
            </div>
            <h2 className="text-[1.8rem] font-black text-white uppercase tracking-tighter leading-none">
              {isEditMode ? "Update" : "Add"} <span className="text-orm-gold">Product</span>
            </h2>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="px-8 py-4 rounded-xl font-black text-[0.65rem] uppercase tracking-[0.2em] border border-white/10 text-white/40 transition-all hover:bg-white/5 hover:text-white"
            onClick={() => navigate("/react-admin/products")}
          >
            Discard
          </button>
          <button
            className="group relative overflow-hidden bg-orm-gold text-black px-10 py-4 rounded-xl font-black text-[0.65rem] uppercase tracking-[0.2em] transition-all flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span className="relative z-10 flex items-center gap-3">{loading ? "Saving..." : "Save Product"} <FaSave /></span>
            <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
          </button>
        </div>
      </div>

      <form className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CORE SPECS */}
        <div className="col-span-8 flex flex-col gap-8 max-lg:col-span-12">
          {/* GENERAL INFO */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <FaInfoCircle className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Product Details</h3>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold tracking-tight outline-none focus:border-orm-gold/50 transition-all"
                    placeholder="Enter product title..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Slug</label>
                  <input
                    type="text"
                    value={isEditMode ? formData.slug : "auto-generated"}
                    disabled
                    className="w-full bg-white/[0.01] border border-white/5 p-4 rounded-xl text-white/20 text-sm font-mono tracking-tight outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  rows="6"
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-medium leading-relaxed outline-none focus:border-orm-gold/50 transition-all no-scrollbar"
                  placeholder="Enter product description..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* MEDIA FABRICATION */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <FaImages className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Media</h3>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* MAIN VISUAL */}
              <div className="space-y-4">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Main Image</label>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-orm-dark border border-white/5 group">
                  {mainPreview ? (
                    <>
                      <img src={mainPreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <button
                        type="button"
                        className="absolute top-4 right-4 w-8 h-8 bg-black/60 backdrop-blur-xl text-white rounded-lg flex items-center justify-center transition-all hover:bg-red-500"
                        onClick={() => { setMainImage(null); setMainPreview(null); }}
                      >
                        <FaTimes size={10} />
                      </button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white/[0.02]">
                      <FaCloudUploadAlt className="text-3xl text-orm-gold/40 mb-3" />
                      <span className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-white/20">Upload Image</span>
                      <input type="file" onChange={handleMainImageChange} accept="image/*" hidden />
                    </label>
                  )}
                </div>
              </div>

              {/* TECHNICAL ASSETS */}
              <div className="space-y-6">
                <div className="space-y-4">
                   <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">3D Model (.glb)</label>
                   <label className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/10 rounded-xl cursor-pointer hover:bg-white/[0.05] transition-all">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500"><FaCube size={18} /></div>
                      <span className="text-[0.65rem] font-bold text-white/60 uppercase tracking-widest truncate">{model3dFile ? model3dFile.name : "Select .glb File"}</span>
                      <input type="file" onChange={(e) => setModel3dFile(e.target.files[0])} accept=".glb" hidden />
                   </label>
                </div>
                <div className="space-y-4">
                   <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Product Video (.mp4)</label>
                   <label className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/10 rounded-xl cursor-pointer hover:bg-white/[0.05] transition-all">
                      <div className="w-10 h-10 rounded-lg bg-orm-gold/10 flex items-center justify-center text-orm-gold"><FaVideo size={16} /></div>
                      <span className="text-[0.65rem] font-bold text-white/60 uppercase tracking-widest truncate">{videoFile ? videoFile.name : "Select .mp4 File"}</span>
                      <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} accept="video/mp4" hidden />
                   </label>
                </div>
              </div>
            </div>

            {/* SECONDARY GALLERY */}
            <div className="space-y-4">
              <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Product Gallery</label>
              <div className="grid grid-cols-6 gap-4">
                {galleryPreviews.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-orm-dark group">
                    <img src={img.url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
                    <button
                      type="button"
                      className="absolute inset-0 bg-red-500/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                      onClick={() => removeGalleryImage(index, img)}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
                <label className="aspect-square flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/10 rounded-xl cursor-pointer hover:border-orm-gold/40 hover:bg-white/[0.05] transition-all text-white/20 hover:text-orm-gold">
                  <FaPlus size={16} />
                  <span className="text-[0.5rem] font-black uppercase mt-2">ADD</span>
                  <input type="file" multiple onChange={handleGalleryChange} accept="image/*" hidden />
                </label>
              </div>
            </div>
          </div>

          {/* TECHNICAL SPECS */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <FaCogs className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Specifications</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Benefits Title</label>
                <input
                  type="text"
                  name="benefits_title"
                  value={formData.benefits_title}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold tracking-tight outline-none focus:border-orm-gold/50 transition-all"
                  placeholder="e.g. Advanced Performance"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Benefits Description</label>
                <textarea
                  name="benefits_description"
                  value={formData.benefits_description}
                  rows="3"
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-medium outline-none focus:border-orm-gold/50 transition-all no-scrollbar"
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Product Specs (Line Delimited)</label>
                <textarea
                  name="specifications"
                  value={formData.specifications}
                  rows="5"
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-mono outline-none focus:border-orm-gold/50 transition-all no-scrollbar"
                  placeholder="MATERIAL: STEEL&#10;FINISH: MATTE&#10;COMPATIBILITY: THAR"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGISTICS */}
        <div className="col-span-4 flex flex-col gap-8 max-lg:col-span-12">
          {/* CLASSIFICATION */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-6">
            <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em] mb-4 pb-4 border-b border-white/5">Organization</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Category</label>
                <select
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold tracking-tight outline-none focus:border-orm-gold/50 transition-all appearance-none"
                >
                  <option value="Thar" className="bg-orm-dark">Mahindra Thar</option>
                  <option value="Scorpio" className="bg-orm-dark">Scorpio</option>
                  <option value="Hilux" className="bg-orm-dark">Toyota Hilux</option>
                  <option value="Fortuner" className="bg-orm-dark">Toyota Fortuner</option>
                  <option value="Jimny" className="bg-orm-dark">Suzuki Jimny</option>
                  <option value="Defender" className="bg-orm-dark">Range Rover Defender</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 10kg"
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold tracking-tight outline-none focus:border-orm-gold/50 transition-all"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/10 group">
                <div className="flex flex-col">
                   <span className="text-[0.65rem] font-black text-white uppercase tracking-widest">Sale Status</span>
                   <span className="text-[0.5rem] font-bold text-white/20 uppercase tracking-[0.2em]">Show on Sale</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="is_sale" checked={formData.is_sale} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/20 after:border-white/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orm-gold peer-checked:after:bg-black"></div>
                </label>
              </div>
            </div>
          </div>

          {/* VALUATION */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-6 shadow-2xl shadow-orm-gold/5">
            <div className="flex items-center gap-4 mb-2">
               <FaTag className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Pricing</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Price (RS)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-orm-gold/5 border border-orm-gold/20 p-4 rounded-xl text-orm-gold text-lg font-black tracking-tighter outline-none focus:bg-orm-gold/10 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Old Price (RS)</label>
                <input
                  type="number"
                  name="old_price"
                  value={formData.old_price}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white/40 text-sm font-bold tracking-tight outline-none focus:border-white/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
