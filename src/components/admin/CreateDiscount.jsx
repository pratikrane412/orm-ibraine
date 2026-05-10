import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaTag,
  FaCalendarAlt,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  const isEditMode = !!id; // Boolean flag

  const [formData, setFormData] = useState({
    code: "",
    discount_percentage: "",
    valid_from: "",
    valid_to: "",
    minimum_purchase_amount: "0", // Added Field
  });

  // --- FETCH DATA IF EDITING ---
  useEffect(() => {
    if (isEditMode) {
      const token = localStorage.getItem("orm_admin_token");
      fetch(`https://orm-backend-gejw.onrender.com/api/coupons/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // Format dates for input (remove the 'Z' or offset if needed for datetime-local)
          const formatForInput = (isoString) =>
            isoString ? isoString.slice(0, 16) : "";

          setFormData({
            code: data.code,
            discount_percentage: data.discount_percentage,
            valid_from: formatForInput(data.valid_from),
            valid_to: formatForInput(data.valid_to),
            minimum_purchase_amount: data.minimum_purchase_amount || "0",
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
      const url = isEditMode
        ? `https://orm-backend-gejw.onrender.com/api/coupons/${id}/`
        : "https://orm-backend-gejw.onrender.com/api/coupons/";

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
    await fetch(`https://orm-backend-gejw.onrender.com/api/coupons/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    navigate("/react-admin/discount");
  };

  return (
    <div className="font-['Inter',sans-serif] text-[#202223] pb-[80px] bg-transparent shadow-none border-none">
      <div className="mb-[25px] flex justify-between items-center">
        <div className="flex items-center gap-[15px]">
          <button
            onClick={() => navigate("/react-admin/discount")}
            className="w-[36px] h-[36px] border border-[#d1d5db] rounded-[8px] bg-white flex items-center justify-center cursor-pointer text-[#5c5f62] transition-all duration-200 hover:bg-[#f1f2f3] hover:border-[#9ca3af]"
          >
            <FaArrowLeft />
          </button>
          <h1 className="font-['Merriweather',serif] text-[24px] font-[700] m-0 text-[#111]">{isEditMode ? "Edit discount" : "Create discount"}</h1>
        </div>
        {isEditMode && (
          <button className="bg-[#fef2f2] text-[#dc2626] border border-[#fecaca] p-[8px_16px] rounded-[6px] font-[600] text-[13px] cursor-pointer flex items-center gap-[8px] transition-all duration-200 hover:bg-[#fee2e2] hover:border-[#ef4444]" onClick={handleDelete}>
            <FaTrash /> Delete
          </button>
        )}
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-[25px] items-start max-lg:grid-cols-1">
        <div className="flex flex-col gap-[20px]">
          {/* 1. AMOUNT OFF CARD */}
          <div className="bg-white border border-[#e1e3e5] rounded-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-[16px_20px] border-b border-[#e1e3e5] flex justify-between items-center bg-[#fbfbfb]">
              <h3 className="text-[15px] font-[600] m-0 text-[#202223]">Amount off order</h3>
              <span className="bg-[#e4e5e7] text-[#454f5b] text-[11px] p-[2px_8px] rounded-[10px] font-[600]">Product Discount</span>
            </div>

            <div className="p-[20px]">
              <div className="mb-[20px]">
                <label className="block text-[13px] font-[500] text-[#202223] mb-[8px]">Discount code</label>
                <div className="flex gap-[10px]">
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g. SPRINGSALE"
                    className="w-full p-[12px] !important border border-[#d1d5db] !important rounded-[8px] !important text-[14px] !important text-[#111827] !important bg-white !important outline-none transition-all duration-200 font-['Inter',sans-serif] !important focus:border-[#fbb03b] !important focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] !important font-[600] tracking-[0.5px] uppercase"
                  />
                  <button
                    type="button"
                    onClick={generateCode}
                    className="bg-transparent border-none text-[#007ace] font-[600] text-[13px] cursor-pointer whitespace-nowrap hover:underline"
                  >
                    Generate
                  </button>
                </div>
                <p className="text-[12px] text-[#6d7175] mt-[6px]">
                  Customers must enter this code at checkout.
                </p>
              </div>

              <div className="mb-[20px]">
                <label className="block text-[13px] font-[500] text-[#202223] mb-[8px]">Discount value</label>
                <div className="relative w-full">
                  <input
                    type="number"
                    name="discount_percentage"
                    value={formData.discount_percentage}
                    onChange={handleChange}
                    placeholder="10"
                    className="w-full p-[12px] !important border border-[#d1d5db] !important rounded-[8px] !important text-[14px] !important text-[#111827] !important bg-white !important outline-none transition-all duration-200 font-['Inter',sans-serif] !important focus:border-[#fbb03b] !important focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] !important"
                  />
                  <span className="absolute right-[12px] top-1/2 translate-y-[-50%] text-[#8c9196] text-[14px]">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. MINIMUM PURCHASE CARD (New) */}
          <div className="bg-white border border-[#e1e3e5] rounded-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-[16px_20px] border-b border-[#e1e3e5] flex justify-between items-center bg-[#fbfbfb]">
              <h3 className="text-[15px] font-[600] m-0 text-[#202223]">Minimum purchase requirements</h3>
            </div>
            <div className="p-[20px]">
              <div className="mb-[20px]">
                <label className="block text-[13px] font-[500] text-[#202223] mb-[8px]">Minimum purchase amount (Rs.)</label>
                <input
                  type="number"
                  name="minimum_purchase_amount"
                  value={formData.minimum_purchase_amount}
                  onChange={handleChange}
                  className="w-full p-[12px] !important border border-[#d1d5db] !important rounded-[8px] !important text-[14px] !important text-[#111827] !important bg-white !important outline-none transition-all duration-200 font-['Inter',sans-serif] !important focus:border-[#fbb03b] !important focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] !important"
                  placeholder="0.00"
                />
                <p className="text-[12px] text-[#6d7175] mt-[6px]">Leave as 0 for no minimum requirement.</p>
              </div>
            </div>
          </div>

          {/* 3. DATES CARD */}
          <div className="bg-white border border-[#e1e3e5] rounded-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-[16px_20px] border-b border-[#e1e3e5] flex justify-between items-center bg-[#fbfbfb]">
              <h3 className="text-[15px] font-[600] m-0 text-[#202223]">Active dates</h3>
            </div>
            <div className="p-[20px]">
              <div className="grid grid-cols-2 gap-[20px]">
                <div className="mb-[20px]">
                  <label className="block text-[13px] font-[500] text-[#202223] mb-[8px]">Start date</label>
                  <input
                    type="datetime-local"
                    name="valid_from"
                    value={formData.valid_from}
                    onChange={handleChange}
                    className="w-full p-[12px] !important border border-[#d1d5db] !important rounded-[8px] !important text-[14px] !important text-[#111827] !important bg-white !important outline-none transition-all duration-200 font-['Inter',sans-serif] !important focus:border-[#fbb03b] !important focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] !important"
                  />
                </div>
                <div className="mb-[20px]">
                  <label className="block text-[13px] font-[500] text-[#202223] mb-[8px]">End date</label>
                  <input
                    type="datetime-local"
                    name="valid_to"
                    value={formData.valid_to}
                    onChange={handleChange}
                    className="w-full p-[12px] !important border border-[#d1d5db] !important rounded-[8px] !important text-[14px] !important text-[#111827] !important bg-white !important outline-none transition-all duration-200 font-['Inter',sans-serif] !important focus:border-[#fbb03b] !important focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)] !important"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-white border border-[#e1e3e5] rounded-[12px] p-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <h3 className="text-[15px] m-[0_0_15px_0]">Summary</h3>
            <div className="flex flex-col">
              <div
                className={formData.code ? "text-[18px] font-[700] text-[#202223] mb-[15px] tracking-[1px]" : "text-[14px] text-[#9ca3af] italic mb-[15px]"}
              >
                {formData.code || "No code yet"}
              </div>
              <ul className="list-none p-0 mb-[25px]">
                <li className="flex items-center gap-[10px] text-[13px] text-[#5c5f62] mb-[10px] pb-[10px] border-b border-dashed border-[#e1e3e5]">
                  <FaTag className="text-[#8c9196]" />
                  <span>
                    {formData.discount_percentage
                      ? `${formData.discount_percentage}% Off`
                      : "No discount set"}
                  </span>
                </li>
                <li className="flex items-center gap-[10px] text-[13px] text-[#5c5f62] mb-[10px] pb-[10px] border-b border-dashed border-[#e1e3e5]">
                  <FaCheckCircle className="text-[#8c9196]" />{" "}
                  <span>Applies to entire order</span>
                </li>
                <li className="flex items-center gap-[10px] text-[13px] text-[#5c5f62] mb-[10px] pb-[10px] border-b border-dashed border-[#e1e3e5] last:border-none">
                  <FaCalendarAlt className="text-[#8c9196]" />{" "}
                  <span>
                    {formData.valid_from ? "Scheduled" : "No active dates"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <button className="w-full bg-[#fbb03b] text-black font-[600] p-[12px] border-none rounded-[8px] cursor-pointer mb-[10px] text-[14px] transition-all duration-200 hover:bg-[#f59e0b]" onClick={handleSubmit}>
                {isEditMode ? "Update Discount" : "Save Discount"}
              </button>
              <button
                className="w-full bg-white border border-[#d1d5db] text-[#374151] font-[600] p-[10px] rounded-[8px] cursor-pointer text-[14px] hover:bg-[#f9fafb]"
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
