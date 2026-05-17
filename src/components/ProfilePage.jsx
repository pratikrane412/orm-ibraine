import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import ProfileSettings from "./ProfileSettings";
import MyOrders from "./MyOrders"; 
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  if (!user) { navigate("/login"); return null; }

  const handleLogout = () => { logout(); navigate("/"); };

  const renderContent = () => {
    switch (activeTab) {
      case "profile": return <ProfileSettings />;
      case "orders": return <MyOrders />;
      case "dashboard": return (
          <div className="flex flex-col gap-8">
            <div>
              <div className="inline-block px-3 py-0.5 bg-orm-gold/10 border border-orm-gold/20 rounded-full mb-3"><span className="text-orm-gold text-[0.55rem] font-black uppercase tracking-[0.2em]">Operational Status</span></div>
              <h2 className="font-merriweather text-2xl font-black text-white uppercase tracking-tighter">Command <span className="text-orm-gold">Dashboard</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <div className="bg-white/[0.03] p-8 rounded-[1.5rem] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><FiShoppingBag size={40} /></div>
                <h4 className="text-white/30 text-[0.6rem] font-black uppercase tracking-[0.15em] mb-3">Total Deployments</h4>
                <h1 className="text-white text-3xl font-black tracking-tighter">05</h1>
              </div>
              <div className="bg-white/[0.03] p-8 rounded-[1.5rem] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><FaMoneyBillWave size={40} /></div>
                <h4 className="text-white/30 text-[0.6rem] font-black uppercase tracking-[0.15em] mb-3">Mutant Credits</h4>
                <h1 className="text-orm-gold text-3xl font-black tracking-tighter">Rs. 0</h1>
              </div>
            </div>
          </div>
        );
      case "address": return (
          <div className="flex flex-col gap-6">
            <div>
              <div className="inline-block px-3 py-0.5 bg-orm-gold/10 border border-orm-gold/20 rounded-full mb-3"><span className="text-orm-gold text-[0.55rem] font-black uppercase tracking-[0.2em]">Drop Zones</span></div>
              <h2 className="font-merriweather text-2xl font-black text-white uppercase tracking-tighter">Logistics <span className="text-orm-gold">Addresses</span></h2>
            </div>
            <p className="font-sans text-white/40 text-[0.8rem] leading-relaxed max-w-sm uppercase tracking-widest font-bold">Manage delivery sectors for gear deployment.</p>
            <button className="bg-orm-gold text-black px-8 py-3.5 font-sans font-black text-[0.65rem] uppercase tracking-[0.15em] border-none rounded-xl cursor-pointer self-start transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95">+ Establish New Sector</button>
          </div>
        );
      case "track": return (
          <div className="flex flex-col gap-6">
            <div>
              <div className="inline-block px-3 py-0.5 bg-orm-gold/10 border border-orm-gold/20 rounded-full mb-3"><span className="text-orm-gold text-[0.55rem] font-black uppercase tracking-[0.2em]">Satellite Tracking</span></div>
              <h2 className="font-merriweather text-2xl font-black text-white uppercase tracking-tighter">Deployment <span className="text-orm-gold">Status</span></h2>
            </div>
            <div className="flex gap-3 max-md:flex-col">
              <input type="text" placeholder="Deployment ID" className="h-12 flex-1 bg-white/[0.05] border border-white/10 text-white rounded-xl px-5 outline-none focus:border-orm-gold/50 text-[0.85rem]" />
              <button className="bg-white text-black px-8 h-12 font-sans font-black text-[0.65rem] uppercase tracking-[0.15em] border-none rounded-xl cursor-pointer transition-all hover:bg-orm-gold">Initiate Tracking</button>
            </div>
          </div>
        );
      default: return <ProfileSettings />;
    }
  };

  return (
    <div className="bg-orm-dark text-white min-h-screen font-sans">
      <Navbar />
      <div className="h-[220px] bg-[url('/image/banner.jpg')] bg-cover bg-center relative flex items-center justify-center text-center mt-[70px] max-md:h-[150px]">
        <div className="absolute inset-0 bg-gradient-to-b from-orm-dark via-orm-dark/40 to-orm-dark"></div>
        <div className="relative z-[2] px-6">
          <h1 className="font-merriweather text-[2.2rem] text-white font-black uppercase tracking-tighter leading-none max-md:text-[1.8rem]">Base <span className="text-orm-gold">Operations</span></h1>
          <div className="w-16 h-1 bg-orm-gold mx-auto rounded-full mt-4"></div>
        </div>
      </div>

      <div className="w-[92%] max-w-[1300px] mx-auto py-[60px] min-h-[70vh]">
        <div className="grid grid-cols-12 gap-10 max-lg:flex max-lg:flex-col">
          <div className="col-span-3">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
          </div>
          <div className="col-span-9 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-10 shadow-2xl max-md:p-6">
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
