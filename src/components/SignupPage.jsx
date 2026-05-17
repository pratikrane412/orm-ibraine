import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", first_name: "", last_name: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSendOtp = async (e) => {
    e.preventDefault(); setError(""); setMessage("Initiating Secure Channel...");
    if(!formData.email || !formData.username || !formData.password) { setError("Incomplete Identity Data"); return; }
    try {
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/send-otp/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formData.email }), });
      const data = await response.json();
      if (response.ok) { setOtpSent(true); setMessage("Verification Key Sent"); }
      else { setError(data.error || "Channel Fault"); }
    } catch (err) { setError("Network Interference"); }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); setError("");
    try {
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/register/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData), });
      const data = await response.json();
      if (response.ok) { login({ username: data.username, id: data.user_id, email: data.email, first_name: data.first_name, last_name: data.last_name }, data.token); navigate("/"); }
      else { setError(data.error || "Validation Failed"); }
    } catch (err) { setError("System Failure"); }
  };

  return (
    <div className="flex flex-col min-h-screen bg-orm-dark overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center pt-[140px] pb-[120px] bg-[url('/image/bg2.png')] bg-cover bg-center relative max-md:pt-[100px] max-md:pb-[80px]">
        <div className="absolute inset-0 bg-gradient-to-br from-orm-dark/95 via-orm-dark/80 to-orm-dark/95 backdrop-blur-sm"></div>
        
        <div className="relative z-[2] bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 rounded-[3rem] w-[90%] max-w-[550px] shadow-2xl animate-fadeInUp max-md:p-10">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 bg-orm-gold/10 border border-orm-gold/20 rounded-full mb-5">
              <span className="text-orm-gold text-[0.6rem] font-black uppercase tracking-[0.2em]">Identity Enrollment</span>
            </div>
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter leading-tight">Join the <span className="text-orm-gold">Mutants</span></h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-8 text-center">
               <p className="text-red-500 text-[0.65rem] font-black uppercase tracking-widest">{error}</p>
            </div>
          )}
          
          {message && (
            <div className="bg-orm-gold/10 border border-orm-gold/20 p-4 rounded-xl mb-8 text-center animate-pulse">
               <p className="text-orm-gold text-[0.65rem] font-black uppercase tracking-widest">{message}</p>
            </div>
          )}
          
          <form onSubmit={otpSent ? handleRegister : handleSendOtp} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 ml-2">First Name</label>
                <input type="text" name="first_name" className="w-full h-12 px-5 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 transition-all text-sm disabled:opacity-30" onChange={handleChange} required disabled={otpSent} />
              </div>
              <div>
                <label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 ml-2">Last Name</label>
                <input type="text" name="last_name" className="w-full h-12 px-5 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 transition-all text-sm disabled:opacity-30" onChange={handleChange} required disabled={otpSent} />
              </div>
            </div>

            <div>
              <label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 ml-2">Alias Username</label>
              <input type="text" name="username" className="w-full h-12 px-5 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 transition-all text-sm disabled:opacity-30" onChange={handleChange} required disabled={otpSent} />
            </div>
            
            <div>
              <label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 ml-2">Secure Email</label>
              <input type="email" name="email" className="w-full h-12 px-5 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 transition-all text-sm disabled:opacity-30" onChange={handleChange} required disabled={otpSent} />
            </div>

            <div>
              <label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 ml-2">Passkey</label>
              <input type="password" name="password" className="w-full h-12 px-5 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 transition-all text-sm disabled:opacity-30" onChange={handleChange} required disabled={otpSent} />
            </div>

            {otpSent && (
              <div className="pt-6 border-t border-white/10">
                <label className="block text-[0.55rem] font-black text-orm-gold uppercase tracking-[0.3em] mb-4 text-center">Verification Key</label>
                <input type="text" name="otp" placeholder="......" className="w-full h-16 bg-white/[0.05] border border-orm-gold/30 rounded-xl text-white outline-none focus:border-orm-gold text-center tracking-[0.8em] text-3xl font-black" onChange={handleChange} required />
              </div>
            )}

            <div className="pt-4">
              <button type="submit" className="w-full relative overflow-hidden group/btn bg-orm-gold text-black h-16 rounded-xl font-black text-[0.75rem] uppercase tracking-[0.15em] transition-all duration-500 hover:shadow-lg hover:-translate-y-1 active:scale-95">
                <span className="relative z-10">{otpSent ? "Establish Identity" : "Transmit Credentials"}</span>
                <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
             <p className="text-[0.7rem] text-white/30 font-bold uppercase tracking-widest">
               Mutant already? <Link to="/login" className="text-orm-gold hover:text-white transition-colors ml-2 underline">Secure Login</Link>
             </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
