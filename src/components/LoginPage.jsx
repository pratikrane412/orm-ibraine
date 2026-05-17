import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        login({ username: data.username, id: data.user_id, email: data.email, first_name: data.first_name, last_name: data.last_name }, data.token);
        navigate("/");
      } else { setError(data.error || "Login Failed"); }
    } catch (err) { setError("Server Error"); }
  };

  return (
    <div className="flex flex-col min-h-screen bg-orm-dark overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center pt-[140px] pb-[120px] bg-[url('/image/bg1.png')] bg-cover bg-center relative max-md:pt-[100px] max-md:pb-[80px]">
        <div className="absolute inset-0 bg-gradient-to-br from-orm-dark/95 via-orm-dark/80 to-orm-dark/95 backdrop-blur-sm"></div>
        
        <div className="relative z-[2] bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 rounded-[3rem] w-[90%] max-w-[420px] shadow-2xl animate-fadeInUp max-md:p-10">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 bg-orm-gold/10 border border-orm-gold/20 rounded-full mb-5">
              <span className="text-orm-gold text-[0.6rem] font-bold uppercase tracking-[0.2em]">Access Portal</span>
            </div>
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter leading-tight">Identity <span className="text-orm-gold">Check</span></h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-8 text-center animate-pulse">
               <p className="text-red-500 text-[0.65rem] font-bold uppercase tracking-widest">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[0.6rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 ml-2">Username</label>
              <input type="text" name="username" className="w-full h-14 px-6 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 transition-all text-[0.85rem] placeholder:text-white/10" placeholder="Enter Username" onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-[0.6rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 ml-2">Passkey</label>
              <input type="password" name="password" className="w-full h-14 px-6 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 transition-all text-[0.85rem] placeholder:text-white/10" placeholder="Enter Password" onChange={handleChange} required />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full relative overflow-hidden group/btn bg-orm-gold text-black h-16 rounded-xl font-black text-[0.75rem] uppercase tracking-[0.15em] transition-all duration-500 hover:shadow-lg hover:-translate-y-1 active:scale-95">
                <span className="relative z-10">Authorize Access</span>
                <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
             <p className="text-[0.7rem] text-white/30 font-bold uppercase tracking-widest">
               New mutant? <Link to="/signup" className="text-orm-gold hover:text-white ml-2 underline transition-colors">Register Identity</Link>
             </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
