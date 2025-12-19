import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import ProfileSettings from "./ProfileSettings";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // If not logged in, redirect (simple check)
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Switch content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "orders":
        return <div className="placeholder-content"><h2>My Orders</h2><p>No orders yet.</p></div>;
      case "address":
        return <div className="placeholder-content"><h2>My Addresses</h2><p>Manage your addresses here.</p></div>;
      default:
        return <div className="placeholder-content"><h2>{activeTab}</h2><p>Coming Soon...</p></div>;
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="profile-page-container">
        <div className="profile-header">
          <h1>My <span className="highlight">Account</span></h1>
        </div>

        <div className="profile-layout">
          {/* LEFT: SIDEBAR */}
          <div className="profile-left">
            <ProfileSidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              handleLogout={handleLogout} 
            />
          </div>

          {/* RIGHT: CONTENT */}
          <div className="profile-right">
            {renderContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;