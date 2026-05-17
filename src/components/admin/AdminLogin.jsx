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
        navigate("/react-admin/dashboard");
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
    <div className="h-screen w-full flex justify-center items-center bg-orm-dark relative overflow-hidden font-sans selection:bg-orm-gold selection:text-black">
      {/* CINEMATIC BACKGROUND EFFECTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orm-gold/10 blur-[120px] rounded-full animate-pulse-glow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orm-gold/5 blur-[120px] rounded-full animate-pulse-glow"></div>
      
      {/* GRID OVERLAY */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[440px] px-6">
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          {/* TOP DECORATIVE LINE */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orm-gold/40 to-transparent"></div>
          
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-orm-gold/10 border border-orm-gold/20 rounded-2xl flex items-center justify-center text-orm-gold mx-auto mb-6 shadow-lg shadow-orm-gold/5 animate-fadeInUp">
              <FaUserShield size={28} />
            </div>
            <h1 className="text-[2.2rem] font-black text-white uppercase tracking-tighter mb-2 animate-fadeInUp">
              ORM <span className="text-orm-gold">Admin</span>
            </h1>
            <p className="text-white/30 text-[0.6rem] font-black uppercase tracking-[0.4em] animate-fadeInUp">Secure Dashboard Access</p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-[0.7rem] font-bold mb-6 flex items-center gap-3 animate-shake">
              <FaLock size={12} /> {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter admin ID"
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold tracking-tight outline-none focus:border-orm-gold/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold tracking-tight outline-none focus:border-orm-gold/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full relative overflow-hidden group/btn bg-orm-gold text-black h-14 rounded-xl font-black text-[0.7rem] uppercase tracking-[0.2em] transition-all duration-500 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:-translate-y-1 active:scale-95 disabled:opacity-50" 
              disabled={loading}
            >
              <span className="relative z-10">{loading ? "Verifying..." : "Sign In to Dashboard"}</span>
              <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
            </button>
          </form>

          {/* FOOTER ACCENT */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
               <div className="w-1 h-1 bg-orm-gold rounded-full animate-ping"></div>
               <span className="text-[0.5rem] font-bold text-white/20 uppercase tracking-[0.2em]">Secure Connection</span>
            </div>
            <p className="text-[0.55rem] font-black text-white/10 uppercase tracking-widest">© 2026 ORM Admin System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
