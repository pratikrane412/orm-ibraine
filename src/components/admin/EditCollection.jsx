import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaSearch,
  FaTimes,
  FaLayerGroup,
  FaBoxOpen,
} from "react-icons/fa";
import "../../styles/admin/EditCollection.css";

const EditCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCreateMode = id === "new";

  const [collection, setCollection] = useState({ title: "", description: "" });
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isCreateMode) {
      fetch(`http://127.0.0.1:8000/api/collections/${id}/`)
        .then((res) => res.json())
        .then((data) => setCollection(data))
        .catch((err) => console.error(err));
    }

    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        if (!isCreateMode) {
          const inCollection = data.filter(
            (p) => p.collection === parseInt(id)
          );
          setProducts(inCollection);
        }
      });
  }, [id, isCreateMode]);

  const handleSave = async () => {
    try {
      let url = isCreateMode
        ? "http://127.0.0.1:8000/api/collections/"
        : `http://127.0.0.1:8000/api/collections/${id}/`;
      let method = isCreateMode ? "POST" : "PATCH";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collection),
      });

      if (response.ok) {
        const savedCol = await response.json();
        // If creating, we need to link products now
        if (isCreateMode && products.length > 0) {
          for (const p of products) {
            await fetch(`http://127.0.0.1:8000/api/products/${p.id}/`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ collection: savedCol.id }),
            });
          }
        }
        alert("Collection Saved!");
        navigate("/react-admin/products/collections");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToCollection = async (productId) => {
    const product = allProducts.find((p) => p.id === productId);
    if (!isCreateMode) {
      await fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: id }),
      });
    }
    setProducts([...products, product]);
    setSearch("");
  };

  const removeFromCollection = async (productId) => {
    if (!isCreateMode) {
      await fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: null }),
      });
    }
    setProducts(products.filter((p) => p.id !== productId));
  };

  const searchResults = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      !products.find((existing) => existing.id === p.id)
  );

  return (
    <div className="admin-page-container collection-edit-wrapper">
      {/* PAGE HEADER */}
      <div className="admin-header-row">
        <div className="header-left-group">
          <Link
            to="/react-admin/products/collections"
            className="back-circle-btn"
          >
            <FaArrowLeft />
          </Link>
          <div className="header-text">
            <h2>{isCreateMode ? "Create collection" : collection.title}</h2>
            <p className="subtitle">Manage product grouping</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="admin-btn-secondary" onClick={() => navigate(-1)}>
            Discard
          </button>
          <button className="admin-btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <div className="collection-form-layout">
        {/* CARD 1: DETAILS */}
        <div className="ec-card">
          <div className="ec-card-header">
            <h3>Details</h3>
            <span className="ec-icon">
              <FaLayerGroup />
            </span>
          </div>
          <div className="ec-card-body">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={collection.title}
                onChange={(e) =>
                  setCollection({ ...collection, title: e.target.value })
                }
                className="ec-input"
                placeholder="e.g. Summer Sale"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                value={collection.description}
                onChange={(e) =>
                  setCollection({ ...collection, description: e.target.value })
                }
                className="ec-input"
                placeholder="Add a description for this collection..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* CARD 2: PRODUCTS */}
        <div className="ec-card">
          <div className="ec-card-header">
            <h3>Products</h3>
            <span className="ec-icon">
              <FaBoxOpen />
            </span>
          </div>
          <div className="ec-card-body">
            {/* SEARCH */}
            <div className="ec-search-box">
              <FaSearch className="icon" />
              <input
                type="text"
                placeholder="Search products to add..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* DROPDOWN */}
              {search && (
                <div className="ec-dropdown">
                  {searchResults.map((p) => (
                    <div
                      key={p.id}
                      className="ec-dropdown-item"
                      onClick={() => addToCollection(p.id)}
                    >
                      <img
                        src={
                          p.image.startsWith("http")
                            ? p.image
                            : `http://127.0.0.1:8000${p.image}`
                        }
                        alt=""
                      />
                      <span>{p.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* LIST */}
            <div className="ec-product-list">
              {products.map((p) => (
                <div key={p.id} className="ec-product-row">
                  <div className="ec-img-box">
                    <img
                      src={
                        p.image.startsWith("http")
                          ? p.image
                          : `http://127.0.0.1:8000${p.image}`
                      }
                      alt={p.title}
                    />
                  </div>
                  <span className="ec-prod-name">{p.title}</span>
                  <button
                    className="ec-remove-btn"
                    onClick={() => removeFromCollection(p.id)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              {products.length === 0 && (
                <div className="ec-empty-state">
                  No products in this collection yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCollection;
