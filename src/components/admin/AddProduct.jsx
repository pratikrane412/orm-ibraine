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
import "../../styles/admin/AddProduct.css";

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
              {isEditMode ? `Slug: ${slug}` : "Create a new item"}
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
            {isEditMode && (
              <div className="form-group">
                <label>URL Slug (Auto-generated)</label>
                <input
                  type="text"
                  value={formData.slug}
                  disabled
                  style={{ backgroundColor: "#f0f0f0", color: "#888" }}
                />
              </div>
            )}
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

          <div className="card">
            <h3 className="card-title">Media Gallery</h3>
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

            <div className="form-group">
              <label>3D Model (.glb format)</label>
              <div
                className="image-upload-zone"
                style={{
                  height: "100px",
                  borderStyle: "dashed",
                  borderColor: "#4a90e2",
                }}
              >
                <label className="upload-label">
                  <FaCube
                    className="icon"
                    style={{ fontSize: "1.5rem", color: "#4a90e2" }}
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

            <div className="form-group">
              <label>Gallery Video (MP4)</label>
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
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    accept="video/mp4"
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Gallery Images</label>
              <div className="gallery-grid">
                {galleryPreviews.map((img, index) => (
                  <div key={index} className="gallery-item">
                    <img src={img.url} alt="Gallery" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index, img)}
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
              <label>YouTube Demo URL</label>
              <input
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
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
