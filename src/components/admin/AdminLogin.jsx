import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUserShield } from "react-icons/fa"; // Icons for trust

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/admin-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("orm_admin_token", data.token);
        localStorage.setItem(
          "orm_admin_user",
          JSON.stringify({
            username: data.username,
            email: data.email,
          })
        );
        navigate("/react-admin/dashboard"); // Go to dashboard
      } else {
        setError(data.error || "Invalid Credentials");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#f3f4f6] bg-[radial-gradient(at_0%_0%,#fffbeb_0px,transparent_50%),radial-gradient(at_100%_100%,#fdf2f8_0px,transparent_50%)] relative overflow-hidden font-['Inter',sans-serif]">
      {/* BACKGROUND DECORATION (Optional circles) */}
      <div className="absolute rounded-full blur-[80px] z-[1] w-[400px] h-[400px] bg-[#fcd34d] opacity-[0.15] top-[-100px] left-[-100px]"></div>
      <div className="absolute rounded-full blur-[80px] z-[1] w-[300px] h-[300px] bg-[#fbbf24] opacity-[0.1] bottom-[-50px] right-[-50px]"></div>

      <div className="relative z-[10] bg-[rgba(255,255,255,0.85)] backdrop-blur-[12px] border border-white p-[50px_40px] rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.02)] w-full max-w-[420px] text-center">
        {/* HEADER */}
        <div className="auth-header">
          <div className="w-[60px] h-[60px] bg-[#fffbeb] text-[#d97706] rounded-[16px] flex items-center justify-center text-[1.8rem] mx-auto mb-[20px] shadow-[0_4px_6px_-1px_rgba(217,119,6,0.1)]">
            <FaUserShield />
          </div>
          <h1 className="font-['Merriweather',serif] text-[2rem] text-[#111] m-[0_0_8px_0] tracking-[1px]">
            ORM <span className="text-[#f59e0b]">Admin</span>
          </h1>
          <p className="text-[#6b7280] text-[0.95rem] mb-[30px]">Secure Dashboard Access</p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-[#fef2f2] text-[#ef4444] p-[12px] rounded-[8px] text-[0.9rem] font-[500] mb-[20px] border border-[#fee2e2] flex items-center justify-center gap-[8px]">
            <FaLock /> {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] text-left">
          <div className="input-group">
            <label className="block text-[0.85rem] font-[600] text-[#374151] mb-[8px]">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter admin ID"
              onChange={handleChange}
              className="w-full p-[14px_16px] bg-white border border-[#e5e7eb] rounded-[12px] text-[1rem] text-[#111] transition-all duration-200 outline-none focus:border-[#f59e0b] focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"
              required
            />
          </div>

          <div className="input-group">
            <label className="block text-[0.85rem] font-[600] text-[#374151] mb-[8px]">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full p-[14px_16px] bg-white border border-[#e5e7eb] rounded-[12px] text-[1rem] text-[#111] transition-all duration-200 outline-none focus:border-[#f59e0b] focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"
              required
            />
          </div>

          <button type="submit" className="w-full p-[14px] bg-[#f59e0b] text-black font-[700] text-[1rem] border-none rounded-[12px] cursor-pointer mt-[10px] transition-all duration-200 shadow-[0_4px_6px_-1px_rgba(245,158,11,0.2)] hover:bg-[#d97706] hover:translate-y-[-2px] hover:shadow-[0_10px_15px_-3px_rgba(245,158,11,0.3)] disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none" disabled={loading}>
            {loading ? "Verifying..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="mt-[30px] text-[0.75rem] text-[#9ca3af] border-t border-[#f3f4f6] pt-[20px]">
          <p>Protected by ORM Security Systems</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
