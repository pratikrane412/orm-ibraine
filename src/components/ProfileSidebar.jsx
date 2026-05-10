import React from "react";
import { 
  FiUser, FiGrid, FiShoppingBag, FiTruck, FiMapPin, FiSettings, FiLogOut 
} from "react-icons/fi";
// Removed: import "../styles/ProfilePage.css";

const ProfileSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  const menuItems = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "dashboard", label: "Dashboard", icon: <FiSettings /> }, 
    { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
    { id: "track", label: "Track Your Order", icon: <FiTruck /> },
    { id: "address", label: "My Address", icon: <FiMapPin /> },
  ];

  return (
    <div className="flex flex-col gap-[15px]">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`flex items-center gap-[15px] w-full px-[20px] py-[15px] font-['Lato',_sans-serif] text-[1rem] font-medium rounded-[8px] cursor-pointer transition-all text-left border ${
            activeTab === item.id 
              ? "bg-[#fbb03b] text-black border-[#fbb03b] shadow-[0_0_15px_rgba(251,176,59,0.2)] font-bold" 
              : "bg-[#111] text-[#ccc] border-[#333] hover:border-[#fbb03b] hover:text-white hover:translate-x-[5px]"
          }`}
          onClick={() => setActiveTab(item.id)}
        >
          <span className="text-[1.2rem] flex items-center">{item.icon}</span>
          {item.label}
        </button>
      ))}

      <button 
        className="flex items-center gap-[15px] w-full px-[20px] py-[15px] font-['Lato',_sans-serif] text-[1rem] font-medium rounded-[8px] cursor-pointer transition-all text-left border mt-[20px] border-[#333] text-[#ff4d4d] hover:bg-[#ff4d4d] hover:text-white hover:border-[#ff4d4d]" 
        onClick={handleLogout}
      >
        <span className="text-[1.2rem] flex items-center"><FiLogOut /></span>
        Logout
      </button>
    </div>
  );
};

export default ProfileSidebar;