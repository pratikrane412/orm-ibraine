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
} from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams(); // URL now uses slug instead of ID

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
  const [galleryImages, setGalleryImages] = useState([]); // New files only
  const [videoFile, setVideoFile] = useState(null);
  const [model3dFile, setModel3dFile] = useState(null);

  const [mainPreview, setMainPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]); // List of {id, url} or strings

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

          // Fetch gallery and store as objects with IDs
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

  // --- DELETE GALLERY IMAGE LOGIC ---
  const removeGalleryImage = async (index, imgObj) => {
    if (imgObj.isExisting) {
      const confirmDelete = window.confirm(
        "Delete this image from the server permanently?",
      );
      if (!confirmDelete) return;

      try {
        await fetch(
          `https://orm-backend-gejw.onrender.com/api/product-images/${imgObj.id}/`,
          {
            method: "DELETE",
          },
        );
        setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
      } catch (err) {
        alert("Failed to delete image");
      }
    } else {
      // Remove from new files local state
      setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
      // You'd need to filter galleryImages here based on index if needed
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
        alert(isEditMode ? "Product Updated!" : "Product Created!");
        navigate("/react-admin/products");
      } else {
        alert("Error saving product.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ffffff] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh] !max-w-full">
      <div className="flex justify-between items-center mb-[30px]">
        <div className="flex items-center gap-[15px]">
          <button
            className="bg-white border border-[#e5e7eb] p-[10px] rounded-[8px] cursor-pointer text-[#64748b] transition-all duration-200 hover:bg-[#f1f5f9] hover:text-[#111]"
            onClick={() => navigate("/react-admin/products")}
          >
            <FaArrowLeft />
          </button>
          <div>
            <h2 className="font-['Merriweather',serif] text-[2rem] text-[#111] m-0">{isEditMode ? "Edit Product" : "Add New Product"}</h2>
            <p className="text-[#6b7280] text-[0.95rem] mt-[5px]">
              {isEditMode ? `Slug: ${slug}` : "Create a new item"}
            </p>
          </div>
        </div>
        <div className="flex gap-[12px]">
          <button
            className="p-[10px_20px] rounded-[8px] font-[600] text-[0.9rem] cursor-pointer flex items-center gap-[8px] border border-[#e5e7eb] bg-white text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#111] transition-all duration-200"
            onClick={() => navigate("/react-admin/products")}
          >
            Cancel
          </button>
          <button
            className="p-[10px_20px] rounded-[8px] font-[600] text-[0.9rem] cursor-pointer flex items-center gap-[8px] border-none bg-[#fbb03b] text-black hover:bg-[#f59e0b] transition-all duration-200 disabled:bg-[#e5e7eb] disabled:text-[#9ca3af]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Product"} <FaSave />
          </button>
        </div>
      </div>

      <form className="grid grid-cols-[2fr_1fr] gap-[30px] items-start max-lg:grid-cols-1">
        <div className="flex flex-col gap-[24px]">
          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h3 className="font-['Inter',sans-serif] text-[1.1rem] font-[600] text-[#111] mb-[20px] pb-[12px] border-b border-[#f1f5f9]">General Information</h3>
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
                required
              />
            </div>
            {isEditMode && (
              <div className="mb-[18px]">
                <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">URL Slug (Auto-generated)</label>
                <input
                  type="text"
                  value={formData.slug}
                  disabled
                  className="w-full p-[12px] bg-[#f0f0f0] border border-[#d1d5db] rounded-[8px] text-[0.95rem] text-[#888] font-['Inter',sans-serif] transition-all duration-200 outline-none"
                />
              </div>
            )}
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Description</label>
              <textarea
                name="description"
                value={formData.description}
                rows="6"
                onChange={handleChange}
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
              ></textarea>
            </div>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h3 className="font-['Inter',sans-serif] text-[1.1rem] font-[600] text-[#111] mb-[20px] pb-[12px] border-b border-[#f1f5f9]">Media Gallery</h3>
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Main Image</label>
              <div className="border-2 border-dashed border-[#d1d5db] rounded-[10px] p-[5px] bg-[#f9fafb] min-h-[150px] flex items-center justify-center relative transition-all duration-200 hover:bg-[#fffbeb] hover:border-[#fbb03b]">
                {mainPreview ? (
                  <div className="max-w-full max-h-[300px] rounded-[8px]">
                    <img src={mainPreview} alt="Main" className="max-w-full max-h-[300px] rounded-[8px]" />
                    <button
                      type="button"
                      className="absolute top-[10px] right-[10px] bg-white border border-[#ddd] rounded-full w-[30px] h-[30px] cursor-pointer flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.1)]"
                      onClick={() => {
                        setMainImage(null);
                        setMainPreview(null);
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer text-[#6b7280]">
                    <FaCloudUploadAlt className="text-[2rem] mb-[8px] text-[#94a3b8]" />
                    <span>Upload Main Image</span>
                    <input
                      type="file"
                      onChange={handleMainImageChange}
                      accept="image/*"
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">3D Model (.glb format)</label>
              <div
                className="border-2 border-dashed border-[#d1d5db] rounded-[10px] p-[5px] bg-[#f9fafb] flex items-center justify-center relative transition-all duration-200 hover:bg-[#fffbeb] hover:border-[#fbb03b] h-[100px] border-[#4a90e2]"
              >
                <label className="flex flex-col items-center cursor-pointer text-[#6b7280]">
                  <FaCube
                    className="text-[1.5rem] mb-[8px] text-[#4a90e2]"
                  />
                  <span>
                    {model3dFile ? model3dFile.name : "Select GLB Model"}
                  </span>
                  <input
                    type="file"
                    onChange={(e) => setModel3dFile(e.target.files[0])}
                    accept=".glb"
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Gallery Video (MP4)</label>
              <div
                className="border-2 border-dashed border-[#d1d5db] rounded-[10px] p-[5px] bg-[#f9fafb] flex items-center justify-center relative transition-all duration-200 hover:bg-[#fffbeb] hover:border-[#fbb03b] h-[100px] border-[#fbb03b]"
              >
                <label className="flex flex-col items-center cursor-pointer text-[#6b7280]">
                  <FaVideo className="text-[1.5rem] mb-[8px] text-[#94a3b8]" />
                  <span>{videoFile ? videoFile.name : "Select MP4 Video"}</span>
                  <input
                    type="file"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    accept="video/mp4"
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Gallery Images</label>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-[12px]">
                {galleryPreviews.map((img, index) => (
                  <div key={index} className="relative w-full pb-[100%] rounded-[8px] overflow-hidden border border-[#e5e7eb]">
                    <img src={img.url} alt="Gallery" className="absolute top-0 left-0 w-full h-full object-cover" />
                    <button
                      type="button"
                      className="absolute top-[4px] right-[4px] bg-[rgba(0,0,0,0.6)] text-white border-none rounded-full w-[20px] h-[20px] text-[0.7rem] cursor-pointer"
                      onClick={() => removeGalleryImage(index, img)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center bg-white border border-dashed border-[#d1d5db] rounded-[8px] cursor-pointer text-[#94a3b8] h-[82px] hover:text-[#fbb03b] hover:border-[#fbb03b]">
                  <FaImages /> <small>Add</small>
                  <input
                    type="file"
                    multiple
                    onChange={handleGalleryChange}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">YouTube Demo URL</label>
              <input
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
              />
            </div>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h3 className="font-['Inter',sans-serif] text-[1.1rem] font-[600] text-[#111] mb-[20px] pb-[12px] border-b border-[#f1f5f9]">Technical Specifications</h3>
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Benefits Title</label>
              <input
                type="text"
                name="benefits_title"
                value={formData.benefits_title}
                onChange={handleChange}
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
              />
            </div>
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Benefits Description</label>
              <textarea
                name="benefits_description"
                value={formData.benefits_description}
                rows="3"
                onChange={handleChange}
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
              ></textarea>
            </div>
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Specifications (One per line)</label>
              <textarea
                name="specifications"
                value={formData.specifications}
                rows="5"
                onChange={handleChange}
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[24px]">
          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h3 className="font-['Inter',sans-serif] text-[1.1rem] font-[600] text-[#111] mb-[20px] pb-[12px] border-b border-[#f1f5f9]">Organization</h3>
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Category</label>
              <select
                name="category"
                onChange={handleChange}
                value={formData.category}
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
              >
                <option value="Thar">Mahindra Thar</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Hilux">Toyota Hilux</option>
                <option value="Fortuner">Toyota Fortuner</option>
                <option value="Jimny">Suzuki Jimny</option>
                <option value="Defender">Range Rover Defender</option>
              </select>
            </div>
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 2.5 kg"
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
              />
            </div>
            <div className="flex items-center gap-[10px] mt-[15px] p-[10px] bg-[#f9fafb] rounded-[8px]">
              <input
                type="checkbox"
                id="is_sale"
                name="is_sale"
                checked={formData.is_sale}
                onChange={handleChange}
                className="accent-[#fbb03b] w-[18px] h-[18px]"
              />
              <label htmlFor="is_sale" className="text-[0.85rem] font-[500] text-[#374151]">On Sale</label>
            </div>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h3 className="font-['Inter',sans-serif] text-[1.1rem] font-[600] text-[#111] mb-[20px] pb-[12px] border-b border-[#f1f5f9]">Pricing</h3>
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Price (Rs)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
                required
              />
            </div>
            <div className="mb-[18px]">
              <label className="block text-[0.85rem] font-[500] text-[#374151] mb-[8px]">Old Price (Rs)</label>
              <input
                type="number"
                name="old_price"
                value={formData.old_price}
                onChange={handleChange}
                className="w-full p-[12px] bg-white border border-[#d1d5db] rounded-[8px] text-[0.95rem] color-[#1f2937] font-['Inter',sans-serif] transition-all duration-200 focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
