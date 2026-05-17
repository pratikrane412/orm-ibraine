import React from "react";
import { FiUser, FiGrid, FiShoppingBag, FiTruck, FiMapPin, FiLogOut } from "react-icons/fi";

const ProfileSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  const menuItems = [
    { id: "profile", label: "Identity Profile", icon: <FiUser /> },
    { id: "dashboard", label: "Command Center", icon: <FiGrid /> }, 
    { id: "orders", label: "History", icon: <FiShoppingBag /> },
    { id: "track", label: "Satellite Tracking", icon: <FiTruck /> },
    { id: "address", label: "Logistics", icon: <FiMapPin /> },
  ];

  return (
    <div className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <button key={item.id} className={`flex items-center gap-4 w-full px-6 py-4 font-sans text-[0.7rem] font-black uppercase tracking-widest rounded-xl transition-all text-left border-2 ${activeTab === item.id ? "bg-orm-gold text-black border-orm-gold shadow-md" : "bg-white/[0.03] text-white/40 border-white/5 hover:border-white/10"}`} onClick={() => setActiveTab(item.id)}>
          <span className="text-base">{item.icon}</span>
          {item.label}
        </button>
      ))}
      <button className="flex items-center gap-4 w-full px-6 py-4 font-sans text-[0.7rem] font-black uppercase tracking-widest rounded-xl transition-all text-left border-2 mt-6 border-red-500/10 text-red-500/40 hover:bg-red-500 hover:text-white" onClick={handleLogout}>
        <span className="text-base"><FiLogOut /></span>
        Terminate Session
      </button>
    </div>
  );
};

export default ProfileSidebar;
