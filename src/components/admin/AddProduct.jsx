import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaTimes,
  FaSave,
  FaArrowLeft,
  FaImages,
  FaVideo,
} from "react-icons/fa";
import "../../styles/admin/AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get Product ID from URL (if editing)

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    weight: "",
    category: "Thar",
    description: "",
    price: "",
    old_price: "",
    rating: 4.5,
    is_sale: false,
    video_url: "", // This remains for the YouTube Demo section
    benefits_title: "",
    benefits_description: "",
    specifications: "",
  });

  // Files State
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [videoFile, setVideoFile] = useState(null); // NEW: State for PC Video Upload

  // Previews State
  const [mainPreview, setMainPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // --- FETCH DATA IF EDITING ---
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetch(`https://orm-backend-gejw.onrender.com/api/products/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title,
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
            const previews = data.images.map((img) =>
              img.image.startsWith("http")
                ? img.image
                : `https://orm-backend-gejw.onrender.com${img.image}`,
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

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append Main Image
    if (mainImage) data.append("image", mainImage);

    // Append Video File (Direct Upload)
    if (videoFile) data.append("video_file", videoFile);

    // Append Gallery Images
    galleryImages.forEach((file) => {
      data.append("gallery_images", file);
    });

    try {
      let url = "https://orm-backend-gejw.onrender.com/api/products/";
      let method = "POST";

      if (isEditMode) {
        url = `https://orm-backend-gejw.onrender.com/api/products/${id}/`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method: method,
        body: data,
      });

      if (response.ok) {
        alert(isEditMode ? "Product Updated!" : "Product Created!");
        navigate("/react-admin/products");
      } else {
        alert("Error saving product.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-container full-width">
      <div className="admin-header-row">
        <div className="header-left">
          <button
            className="back-btn"
            onClick={() => navigate("/react-admin/products")}
          >
            <FaArrowLeft />
          </button>
          <div>
            <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
            <p className="subtitle">
              {isEditMode ? `ID: #${id}` : "Create a new item"}
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
        <div className="main-col">
          {/* GENERAL INFO */}
          <div className="card">
            <h3 className="card-title">General Information</h3>
            <div className="form-group">
              <label>Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
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
              ></textarea>
            </div>
          </div>

          {/* MEDIA SECTION */}
          <div className="card">
            <h3 className="card-title">Media Gallery</h3>

            {/* Main Image */}
            <div className="form-group">
              <label>Main Image</label>
              <div className="image-upload-zone">
                {mainPreview ? (
                  <div className="preview-full">
                    <img src={mainPreview} alt="Main" />
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

            {/* NEW: Video File Upload */}
            <div className="form-group">
              <label>Gallery Video (Upload from PC)</label>
              <div
                className="image-upload-zone"
                style={{
                  height: "100px",
                  borderStyle: "dashed",
                  borderColor: "#fbb03b",
                }}
              >
                <label className="upload-label">
                  <FaVideo className="icon" style={{ fontSize: "1.5rem" }} />
                  <span>{videoFile ? videoFile.name : "Select MP4 Video"}</span>
                  <input
                    type="file"
                    onChange={handleVideoFileChange}
                    accept="video/mp4"
                    hidden
                  />
                </label>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="form-group">
              <label>Gallery Images</label>
              <div className="gallery-grid">
                {galleryPreviews.map((src, index) => (
                  <div key={index} className="gallery-item">
                    <img src={src} alt="Gallery" />
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

            {/* YouTube Demo URL */}
            <div className="form-group">
              <label>YouTube Demo URL (Bottom Section Video)</label>
              <input
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>

          {/* TECH SPECS */}
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
              <label>Specifications (One per line)</label>
              <textarea
                name="specifications"
                value={formData.specifications}
                rows="5"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
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
              <label>Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 2.5 kg"
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
              <label>Price (Rs)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Old Price (Rs)</label>
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
