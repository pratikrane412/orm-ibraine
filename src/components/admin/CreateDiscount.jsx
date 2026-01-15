import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaTag,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "../../styles/admin/CreateDiscount.css";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    discount_percentage: "",
    valid_from: "",
    valid_to: "",
  });

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

    try {
      const res = await fetch("http://127.0.0.1:8000/api/coupons/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Discount Created Successfully");
        navigate("/react-admin/discount");
      } else {
        alert("Failed. Please check all fields.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page-container discount-page">
      {/* HEADER */}
      <div className="page-header">
        <div className="header-start">
          <button onClick={() => navigate(-1)} className="back-btn-icon">
            <FaArrowLeft />
          </button>
          <h1>Create discount</h1>
        </div>
      </div>

      <div className="discount-layout">
        {/* --- LEFT COLUMN (FORM) --- */}
        <div className="discount-main">
          {/* Card 1: Configuration */}
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
                    onChange={handleChange}
                    placeholder="10"
                    className="text-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Dates */}
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
                    onChange={handleChange}
                    className="text-input"
                  />
                </div>
                <div className="form-group">
                  <label>End date</label>
                  <input
                    type="datetime-local"
                    name="valid_to"
                    onChange={handleChange}
                    className="text-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN (SUMMARY) --- */}
        <div className="discount-sidebar">
          <div className="summary-card">
            <h3>Summary</h3>

            <div className="summary-details">
              {formData.code ? (
                <div className="code-preview">{formData.code}</div>
              ) : (
                <div className="code-placeholder">No code yet</div>
              )}

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
                  <FaCheckCircle className="icon" />
                  <span>Applies to entire order</span>
                </li>
                <li>
                  <FaCalendarAlt className="icon" />
                  <span>
                    {formData.valid_from ? "Scheduled" : "No active dates"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="summary-actions">
              <button className="save-btn-full" onClick={handleSubmit}>
                Save Discount
              </button>
              <button className="discard-btn-full" onClick={() => navigate(-1)}>
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
