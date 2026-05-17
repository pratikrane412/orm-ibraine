import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa"; // Added icons for better UI

const ProfileSettings = () => {
  const { user, token, login } = useAuth();
  
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || ""
      });
    }
  }, [user]);

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!passwords.newPassword) {
      setMessage({ text: "Identification key required for update.", type: "error" });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ text: "Keys do not synchronize.", type: "error" });
      return;
    }

    try {
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/profile/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({ password: passwords.newPassword }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ text: "Access key successfully recalibrated.", type: "success" });
        setPasswords({ newPassword: "", confirmPassword: "" });
        login(data.user, token);
      } else {
        setMessage({ text: "Update protocol rejected.", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: "Server interference detected.", type: "error" });
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div>
        <div className="inline-block px-4 py-1 bg-orm-gold/10 border border-orm-gold/20 rounded-full mb-4">
          <span className="text-orm-gold text-[0.6rem] font-black uppercase tracking-[0.3em]">Operational Identity</span>
        </div>
        <h2 className="font-merriweather text-3xl font-black text-white uppercase tracking-tighter leading-tight">Master <span className="text-orm-gold">Profile</span></h2>
      </div>
      
      {/* PERSONAL DETAILS (READ ONLY) */}
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
           <h3 className="font-sans text-[0.7rem] font-black text-white/30 uppercase tracking-[0.3em]">Core Credentials</h3>
           <p className="text-[0.75rem] text-white/20 uppercase tracking-widest italic">Locked by system administrator for security</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          <div className="space-y-4">
            <label className="font-sans text-[0.65rem] font-bold text-white/30 uppercase tracking-[0.2em] ml-2 flex items-center gap-3"><FaUser className="text-orm-gold" /> First Name</label>
            <div className="h-16 flex items-center px-8 bg-white/[0.03] border border-white/10 rounded-2xl text-white/40 font-sans font-black text-[0.8rem] uppercase tracking-widest opacity-60">
               {profileData.first_name}
            </div>
          </div>
          <div className="space-y-4">
            <label className="font-sans text-[0.65rem] font-bold text-white/30 uppercase tracking-[0.2em] ml-2 flex items-center gap-3"><FaUser className="text-orm-gold" /> Last Name</label>
            <div className="h-16 flex items-center px-8 bg-white/[0.03] border border-white/10 rounded-2xl text-white/40 font-sans font-black text-[0.8rem] uppercase tracking-widest opacity-60">
               {profileData.last_name}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="font-sans text-[0.65rem] font-bold text-white/30 uppercase tracking-[0.2em] ml-2 flex items-center gap-3"><FaEnvelope className="text-orm-gold" /> Secure Communication Channel</label>
          <div className="h-16 flex items-center px-8 bg-white/[0.03] border border-white/10 rounded-2xl text-white/40 font-sans font-bold text-[0.85rem] opacity-60">
             {profileData.email}
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-white/5"></div>

      {/* PASSWORD CHANGE (EDITABLE) */}
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
           <h3 className="font-sans text-[0.7rem] font-black text-white/30 uppercase tracking-[0.3em]">Access Security</h3>
           <p className="text-[0.75rem] text-white/20 uppercase tracking-widest italic">Maintain periodic passkey rotation</p>
        </div>

        {message.text && (
          <div className={`p-6 rounded-2xl font-sans text-[0.7rem] font-black uppercase tracking-widest text-center ${message.type === 'success' ? 'bg-orm-gold/10 text-orm-gold border border-orm-gold/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="space-y-4">
              <label className="font-sans text-[0.65rem] font-bold text-white/30 uppercase tracking-[0.2em] ml-2 flex items-center gap-3"><FaLock className="text-orm-gold" /> New Passkey</label>
              <input 
                type="password" 
                name="newPassword" 
                placeholder="........"
                value={passwords.newPassword} 
                onChange={handlePasswordChange} 
                className="w-full h-16 bg-white/[0.05] border border-white/10 text-white rounded-2xl px-8 outline-none focus:border-orm-gold/50 transition-all font-sans font-medium placeholder:text-white/10"
              />
            </div>
            <div className="space-y-4">
              <label className="font-sans text-[0.65rem] font-bold text-white/30 uppercase tracking-[0.2em] ml-2 flex items-center gap-3"><FaLock className="text-orm-gold" /> Confirm Passkey</label>
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="........"
                value={passwords.confirmPassword} 
                onChange={handlePasswordChange} 
                className="w-full h-16 bg-white/[0.05] border border-white/10 text-white rounded-2xl px-8 outline-none focus:border-orm-gold/50 transition-all font-sans font-medium placeholder:text-white/10"
              />
            </div>
          </div>

          <button type="submit" className="group relative overflow-hidden bg-orm-gold text-black px-12 py-5 rounded-2xl font-sans font-black text-[0.7rem] uppercase tracking-[0.2em] border-none cursor-pointer self-start transition-all duration-500 hover:shadow-[0_15px_40px_rgba(251,176,59,0.3)] hover:-translate-y-1 active:scale-95">
             <span className="relative z-10">Recalibrate Access</span>
             <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;