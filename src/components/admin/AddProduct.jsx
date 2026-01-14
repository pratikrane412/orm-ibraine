import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import {
  FaCloudUploadAlt,
  FaTimes,
  FaSave,
  FaArrowLeft,
  FaImages,
} from "react-icons/fa";
import "../../styles/admin/AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get Product ID from URL (if editing)

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track mode

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

  // --- FETCH DATA IF EDITING ---
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetch(`http://127.0.0.1:8000/api/products/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          // Pre-fill form
          setFormData({
            title: data.title,
            category: data.category,
            description: data.description || "",
            price: data.price,
            old_price: data.old_price || "",
            rating: data.rating,
            is_sale: data.is_sale,
            video_url: data.video_url || "",
            benefits_title: data.benefits_title || "",
            benefits_description: data.benefits_description || "",
            specifications: data.specifications || "",
          });

          // Pre-fill Main Image Preview
          if (data.image) {
            setMainPreview(
              data.image.startsWith("http")
                ? data.image
                : `http://127.0.0.1:8000${data.image}`
            );
          }

          // Pre-fill Gallery Previews (Backend must send 'images' array)
          if (data.images && data.images.length > 0) {
            const previews = data.images.map((img) =>
              img.image.startsWith("http")
                ? img.image
                : `http://127.0.0.1:8000${img.image}`
            );
            setGalleryPreviews(previews);
          }
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

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
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews([...galleryPreviews, ...newPreviews]);
  };

  const removeGalleryImage = (index) => {
    // Note: This only removes NEWly added images for simplicity in this demo.
    // Removing existing backend images requires a separate API call (DELETE /api/product-images/ID/).
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // Append Text Fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append Files ONLY if changed (Main Image)
    if (mainImage) {
      data.append("image", mainImage);
    }

    // Append Gallery Images
    galleryImages.forEach((file) => {
      data.append("gallery_images", file);
    });

    try {
      let url = "http://127.0.0.1:8000/api/products/";
      let method = "POST";

      if (isEditMode) {
        url = `http://127.0.0.1:8000/api/products/${id}/`; // Update URL
        method = "PUT"; // Use PUT for update (or PATCH)
      }

      const response = await fetch(url, {
        method: method,
        body: data,
      });

      if (response.ok) {
        alert(isEditMode ? "Product Updated!" : "Product Created!");
        navigate("/react-admin/products");
      } else {
        alert("Operation Failed.");
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
          <button
            className="back-btn"
            onClick={() => navigate("/react-admin/products")}
          >
            <FaArrowLeft />
          </button>
          <div>
            {/* Dynamic Title */}
            <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
            <p className="subtitle">
              {isEditMode
                ? `Editing ID: #${id}`
                : "Create a new item in your catalog"}
            </p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="admin-btn secondary"
            onClick={() => navigate("/react-admin/products")}
          >
            Cancel
          </button>
          <button
            className="admin-btn primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Product"} <FaSave />
          </button>
        </div>
      </div>

      <form className="add-product-layout">
        {/* ... (The rest of your JSX form layout remains EXACTLY the same) ... */}
        {/* Copy the form layout from the previous AddProduct.jsx I provided */}
        {/* I'm omitting it here to save space, but you paste the <div className="main-col">... part here */}

        {/* ... LEFT COLUMN (MAIN CONTENT) ... */}
        <div className="main-col">
          <div className="card">
            <h3 className="card-title">General Information</h3>
            <div className="form-group">
              <label>Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Off-Road Bumper"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                rows="6"
                onChange={handleChange}
                placeholder="Product details..."
              ></textarea>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Media</h3>
            <div className="form-group">
              <label>Main Image</label>
              <div className="image-upload-zone">
                {mainPreview ? (
                  <div className="preview-full">
                    <img src={mainPreview} alt="Main" />
                    {/* Only show 'X' if we just uploaded it, to keep UI simple */}
                    <button
                      type="button"
                      onClick={() => {
                        setMainImage(null);
                        setMainPreview(null);
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <label className="upload-label">
                    <FaCloudUploadAlt className="icon" />
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

            <div className="form-group">
              <label>Gallery Images</label>
              <div className="gallery-grid">
                {galleryPreviews.map((src, index) => (
                  <div key={index} className="gallery-item">
                    <img src={src} alt="Gallery" />
                    {/* Note: Removing existing images logic is complex, this just removes new ones visually */}
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <label className="gallery-add-btn">
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

            <div className="form-group">
              <label>Video URL</label>
              <input
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Technical Specifications</h3>
            <div className="form-group">
              <label>Benefits Title</label>
              <input
                type="text"
                name="benefits_title"
                value={formData.benefits_title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Benefits Description</label>
              <textarea
                name="benefits_description"
                value={formData.benefits_description}
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Specifications</label>
              <textarea
                name="specifications"
                value={formData.specifications}
                rows="5"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN (SIDEBAR) --- */}
        <div className="side-col">
          <div className="card">
            <h3 className="card-title">Organization</h3>
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                onChange={handleChange}
                value={formData.category}
              >
                <option value="Thar">Mahindra Thar</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Hilux">Toyota Hilux</option>
                <option value="Fortuner">Toyota Fortuner</option>
                <option value="Jimny">Suzuki Jimny</option>
                <option value="Defender">Range Rover Defender</option>
              </select>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>
            <div className="checkbox-row">
              <input
                type="checkbox"
                id="is_sale"
                name="is_sale"
                checked={formData.is_sale}
                onChange={handleChange}
              />
              <label htmlFor="is_sale">On Sale</label>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Pricing</h3>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Compare at Price</label>
              <input
                type="number"
                name="old_price"
                value={formData.old_price}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
