import React from "react";
import { 
  FiUser, FiGrid, FiShoppingBag, FiTruck, FiMapPin, FiSettings, FiLogOut 
} from "react-icons/fi";
import "../styles/ProfilePage.css";

const ProfileSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  const menuItems = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "dashboard", label: "Dashboard", icon: <FiSettings /> }, 
    { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
    { id: "track", label: "Track Your Order", icon: <FiTruck /> },
    { id: "address", label: "My Address", icon: <FiMapPin /> },
  ];

  return (
    <div className="profile-sidebar">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`sidebar-btn ${activeTab === item.id ? "active" : ""}`}
          onClick={() => setActiveTab(item.id)}
        >
          <span className="icon">{item.icon}</span>
          {item.label}
        </button>
      ))}

      <button className="sidebar-btn logout" onClick={handleLogout}>
        <span className="icon"><FiLogOut /></span>
        Logout
      </button>
    </div>
  );
};

export default ProfileSidebar;