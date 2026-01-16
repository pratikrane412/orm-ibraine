import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom"; // Import useParams
import {
  FaArrowLeft,
  FaTag,
  FaCalendarAlt,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";
import "../../styles/admin/CreateDiscount.css";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  const isEditMode = !!id; // Boolean flag

  const [formData, setFormData] = useState({
    code: "",
    discount_percentage: "",
    valid_from: "",
    valid_to: "",
  });

  // --- FETCH DATA IF EDITING ---
  useEffect(() => {
    if (isEditMode) {
      const token = localStorage.getItem("orm_admin_token");
      fetch(`http://127.0.0.1:8000/api/coupons/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // Format dates for input (remove the 'Z' or offset if needed for datetime-local)
          // Simple slice works if format is standard ISO
          const formatForInput = (isoString) =>
            isoString ? isoString.slice(0, 16) : "";

          setFormData({
            code: data.code,
            discount_percentage: data.discount_percentage,
            valid_from: formatForInput(data.valid_from),
            valid_to: formatForInput(data.valid_to),
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCode = () => {
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData({ ...formData, code: random });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("orm_admin_token");

    const payload = { ...formData };
    if (payload.valid_from)
      payload.valid_from = new Date(payload.valid_from).toISOString();
    if (payload.valid_to)
      payload.valid_to = new Date(payload.valid_to).toISOString();

    try {
      // Dynamic URL & Method
      const url = isEditMode
        ? `http://127.0.0.1:8000/api/coupons/${id}/`
        : "http://127.0.0.1:8000/api/coupons/";

      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert(isEditMode ? "Discount Updated!" : "Discount Created!");
        navigate("/react-admin/discount");
      } else {
        alert("Failed. Check inputs.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this coupon permanently?")) return;
    const token = localStorage.getItem("orm_admin_token");
    await fetch(`http://127.0.0.1:8000/api/coupons/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    navigate("/react-admin/discount");
  };

  return (
    <div className="admin-page-container discount-page">
      <div className="page-header">
        <div className="header-start">
          <button
            onClick={() => navigate("/react-admin/discount")}
            className="back-btn-icon"
          >
            <FaArrowLeft />
          </button>
          <h1>{isEditMode ? "Edit discount" : "Create discount"}</h1>
        </div>
        {isEditMode && (
          <button className="dc-btn delete-btn-header" onClick={handleDelete}>
            <FaTrash /> Delete
          </button>
        )}
      </div>

      <div className="discount-layout">
        <div className="discount-main">
          <div className="panel-card">
            <div className="panel-header">
              <h3>Amount off order</h3>
              <span className="panel-badge">Product Discount</span>
            </div>

            <div className="panel-body">
              <div className="form-group">
                <label>Discount code</label>
                <div className="input-with-action">
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g. SPRINGSALE"
                    className="text-input bold-text"
                  />
                  <button
                    type="button"
                    onClick={generateCode}
                    className="text-action-btn"
                  >
                    Generate
                  </button>
                </div>
                <p className="hint">
                  Customers must enter this code at checkout.
                </p>
              </div>

              <div className="form-group">
                <label>Discount value</label>
                <div className="input-suffix-wrapper">
                  <input
                    type="number"
                    name="discount_percentage"
                    value={formData.discount_percentage}
                    onChange={handleChange}
                    placeholder="10"
                    className="text-input"
                  />
                  <span className="suffix">%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-header">
              <h3>Active dates</h3>
            </div>
            <div className="panel-body">
              <div className="row-2">
                <div className="form-group">
                  <label>Start date</label>
                  <input
                    type="datetime-local"
                    name="valid_from"
                    value={formData.valid_from}
                    onChange={handleChange}
                    className="text-input"
                  />
                </div>
                <div className="form-group">
                  <label>End date</label>
                  <input
                    type="datetime-local"
                    name="valid_to"
                    value={formData.valid_to}
                    onChange={handleChange}
                    className="text-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="discount-sidebar">
          <div className="summary-card">
            <h3>Summary</h3>
            <div className="summary-details">
              <div
                className={formData.code ? "code-preview" : "code-placeholder"}
              >
                {formData.code || "No code yet"}
              </div>
              <ul className="summary-list">
                <li>
                  <FaTag className="icon" />
                  <span>
                    {formData.discount_percentage
                      ? `${formData.discount_percentage}% Off`
                      : "No discount set"}
                  </span>
                </li>
                <li>
                  <FaCheckCircle className="icon" />{" "}
                  <span>Applies to entire order</span>
                </li>
                <li>
                  <FaCalendarAlt className="icon" />{" "}
                  <span>
                    {formData.valid_from ? "Scheduled" : "No active dates"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="summary-actions">
              <button className="save-btn-full" onClick={handleSubmit}>
                {isEditMode ? "Update Discount" : "Save Discount"}
              </button>
              <button
                className="discard-btn-full"
                onClick={() => navigate("/react-admin/discount")}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscount;
