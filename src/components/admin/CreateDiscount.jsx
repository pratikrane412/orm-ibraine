import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaTag,
  FaCalendarAlt,
  FaCheckCircle,
  FaTrash,
  FaSave,
  FaPercent,
  FaWallet,
} from "react-icons/fa";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    code: "",
    discount_percentage: "",
    valid_from: "",
    valid_to: "",
    minimum_purchase_amount: "0",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const token = localStorage.getItem("orm_admin_token");
      fetch(`https://orm-backend-gejw.onrender.com/api/coupons/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const formatForInput = (isoString) => isoString ? isoString.slice(0, 16) : "";
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
    setLoading(true);
    const token = localStorage.getItem("orm_admin_token");
    const payload = { ...formData };
    if (payload.valid_from) payload.valid_from = new Date(payload.valid_from).toISOString();
    if (payload.valid_to) payload.valid_to = new Date(payload.valid_to).toISOString();

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
        alert(isEditMode ? "Offer Protocol Updated" : "Tactical Offer Generated");
        navigate("/react-admin/discount");
      } else {
        alert("Validation Error Detected");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Permanently incinerate this offer?")) return;
    const token = localStorage.getItem("orm_admin_token");
    await fetch(`https://orm-backend-gejw.onrender.com/api/coupons/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    navigate("/react-admin/discount");
  };

  return (
    <div className="space-y-10 animate-fadeInUp pb-20">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center bg-orm-surface/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/react-admin/discount")}
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 transition-all hover:text-white hover:border-white/20 active:scale-90"
          >
            <FaArrowLeft />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
               <span className="text-[0.55rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">{isEditMode ? "Edit Discount" : "New Discount"}</span>
            </div>
            <h2 className="text-[1.8rem] font-black text-white uppercase tracking-tighter leading-none">
              {isEditMode ? "Edit" : "Create"} <span className="text-orm-gold">Discount</span>
            </h2>
          </div>
        </div>
        <div className="flex gap-4">
          {isEditMode && (
            <button className="px-8 py-4 rounded-xl font-black text-[0.65rem] uppercase tracking-[0.2em] border border-red-500/20 text-red-500/60 transition-all hover:bg-red-500/10 hover:text-red-500" onClick={handleDelete}>
              Delete
            </button>
          )}
          <button
            className="group relative overflow-hidden bg-orm-gold text-black px-10 py-4 rounded-xl font-black text-[0.65rem] uppercase tracking-[0.2em] transition-all flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span className="relative z-10 flex items-center gap-3">{loading ? "Saving..." : "Save Discount"} <FaSave /></span>
            <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CORE SPECS */}
        <div className="col-span-8 flex flex-col gap-8 max-lg:col-span-12">
          {/* DISCOUNT DEFINITION */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <FaTag className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Coupon Details</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Discount Code</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="flex-1 bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-black tracking-widest uppercase outline-none focus:border-orm-gold/50 transition-all"
                    placeholder="e.g. SUMMER2024"
                  />
                  <button
                    type="button"
                    onClick={generateCode}
                    className="px-6 rounded-xl bg-white/5 text-orm-gold text-[0.6rem] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Discount Percentage (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="discount_percentage"
                      value={formData.discount_percentage}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold outline-none focus:border-orm-gold/50 transition-all"
                      placeholder="10"
                    />
                    <FaPercent className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10" size={12} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Minimum Purchase (RS)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="minimum_purchase_amount"
                      value={formData.minimum_purchase_amount}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold outline-none focus:border-orm-gold/50 transition-all"
                      placeholder="0.00"
                    />
                    <FaWallet className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10" size={12} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE WINDOW */}
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <FaCalendarAlt className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Active Dates</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Start Date</label>
                <input
                  type="datetime-local"
                  name="valid_from"
                  value={formData.valid_from}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold outline-none focus:border-orm-gold/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">End Date</label>
                <input
                  type="datetime-local"
                  name="valid_to"
                  value={formData.valid_to}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold outline-none focus:border-orm-gold/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="col-span-4 flex flex-col gap-8 max-lg:col-span-12">
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8 sticky top-32">
            <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em] mb-4 pb-4 border-b border-white/5">Summary</h3>
            
            <div className="space-y-6">
               <div className="bg-orm-dark p-6 rounded-2xl border border-white/5 text-center">
                  <div className="text-[0.5rem] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Coupon Code</div>
                  <div className={`text-xl font-black tracking-widest ${formData.code ? "text-orm-gold" : "text-white/10 italic"}`}>
                     {formData.code || "No code set"}
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/60">
                     <FaCheckCircle className="text-orm-gold" size={10} />
                     <span className="text-[0.65rem] font-bold uppercase tracking-widest">
                        {formData.discount_percentage ? `${formData.discount_percentage}% Discount` : "No value set"}
                     </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                     <FaCheckCircle className="text-orm-gold" size={10} />
                     <span className="text-[0.65rem] font-bold uppercase tracking-widest">Global Order Application</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                     <FaCheckCircle className="text-orm-gold" size={10} />
                     <span className="text-[0.65rem] font-bold uppercase tracking-widest">
                        {formData.minimum_purchase_amount > 0 ? `Min Purchase: RS. ${formData.minimum_purchase_amount}` : "No minimum"}
                     </span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscount;
