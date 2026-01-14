import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaTimes, FaSave, FaArrowLeft, FaImages } from "react-icons/fa";
import "../../styles/admin/AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
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
  const [mainPreview, setMainPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews([...galleryPreviews, ...newPreviews]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (mainImage) data.append("image", mainImage);
    galleryImages.forEach((file) => data.append("gallery_images", file));

    try {
      const response = await fetch("http://127.0.0.1:8000/api/products/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Product Created Successfully!");
        navigate("/react-admin/products");
      } else {
        alert("Failed to create product.");
      }
    } catch (error) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-container full-width">
      
      {/* PAGE HEADER */}
      <div className="admin-header-row">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}><FaArrowLeft /></button>
          <div>
            <h2>Add Product</h2>
            <p className="subtitle">New product configuration</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="admin-btn secondary" onClick={() => navigate(-1)}>Discard</button>
          <button className="admin-btn primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Product"} <FaSave />
          </button>
        </div>
      </div>

      <form className="add-product-layout">
        
        {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
        <div className="main-col">
          
          {/* 1. General Info */}
          <div className="card">
            <h3 className="card-title">General Information</h3>
            <div className="form-group">
              <label>Product Title</label>
              <input type="text" name="title" onChange={handleChange} placeholder="e.g. Off-Road Bumper" required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" rows="6" onChange={handleChange} placeholder="Product details..."></textarea>
            </div>
          </div>

          {/* 2. Media */}
          <div className="card">
            <h3 className="card-title">Media</h3>
            
            <div className="form-group">
              <label>Main Image</label>
              <div className="image-upload-zone">
                {mainPreview ? (
                  <div className="preview-full">
                    <img src={mainPreview} alt="Main" />
                    <button type="button" onClick={() => {setMainImage(null); setMainPreview(null)}}><FaTimes /></button>
                  </div>
                ) : (
                  <label className="upload-label">
                    <FaCloudUploadAlt className="icon" />
                    <span>Upload Main Image</span>
                    <input type="file" onChange={handleMainImageChange} accept="image/*" hidden />
                  </label>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Gallery Images</label>
              <div className="gallery-grid">
                {galleryPreviews.map((src, index) => (
                  <div key={index} className="gallery-item">
                    <img src={src} alt="Gallery" />
                    <button type="button" onClick={() => removeGalleryImage(index)}><FaTimes /></button>
                  </div>
                ))}
                <label className="gallery-add-btn">
                  <FaImages /> <small>Add More</small>
                  <input type="file" multiple onChange={handleGalleryChange} accept="image/*" hidden />
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Video URL (YouTube)</label>
              <input type="url" name="video_url" onChange={handleChange} placeholder="https://youtube.com/..." />
            </div>
          </div>

          {/* 3. Specifications */}
          <div className="card">
            <h3 className="card-title">Technical Specifications</h3>
            <div className="form-group">
              <label>Benefits Title</label>
              <input type="text" name="benefits_title" onChange={handleChange} placeholder="e.g. Built for Durability" />
            </div>
            <div className="form-group">
              <label>Benefits Description</label>
              <textarea name="benefits_description" rows="3" onChange={handleChange} placeholder="Short text..."></textarea>
            </div>
            <div className="form-group">
              <label>Specifications (Bullet Points)</label>
              <textarea name="specifications" rows="5" onChange={handleChange} placeholder="• Material: Steel&#10;• Weight: 5kg"></textarea>
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN (SIDEBAR) --- */}
        <div className="side-col">
          
          {/* 1. Status & Organization */}
          <div className="card">
            <h3 className="card-title">Organization</h3>
            <div className="form-group">
              <label>Category</label>
              <select name="category" onChange={handleChange} value={formData.category}>
                <option value="Thar">Mahindra Thar</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Hilux">Toyota Hilux</option>
                <option value="Fortuner">Toyota Fortuner</option>
                <option value="Jimny">Suzuki Jimny</option>
                <option value="Defender">Range Rover Defender</option>
              </select>
            </div>
            <div className="form-group">
              <label>Rating (0-5)</label>
              <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} />
            </div>
            <div className="checkbox-row">
              <input type="checkbox" id="is_sale" name="is_sale" onChange={handleChange} />
              <label htmlFor="is_sale">On Sale</label>
            </div>
          </div>

          {/* 2. Pricing */}
          <div className="card">
            <h3 className="card-title">Pricing</h3>
            <div className="form-group">
              <label>Price (Rs.)</label>
              <input type="number" name="price" onChange={handleChange} placeholder="0.00" required />
            </div>
            <div className="form-group">
              <label>Compare at Price</label>
              <input type="number" name="old_price" onChange={handleChange} placeholder="0.00" />
            </div>
          </div>

        </div>

      </form>
    </div>
  );
};

export default AddProduct;