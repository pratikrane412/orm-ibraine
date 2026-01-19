import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import ProfileSettings from "./ProfileSettings";
import MyOrders from "./MyOrders"; // Import the new component
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;

      case "orders":
        return <MyOrders />; // Use the real component

      case "dashboard":
        return (
          <div className="profile-content-box">
            <h2>Dashboard</h2>
            <div
              className="dashboard-stats-grid"
              style={{ display: "flex", gap: "20px" }}
            >
              <div
                className="stat-card"
                style={{
                  flex: 1,
                  background: "#111",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <h4 style={{ color: "#888" }}>Total Orders</h4>
                <h1 style={{ color: "#fbb03b", fontSize: "2.5rem" }}>5</h1>{" "}
                {/* Fetch real count later */}
              </div>
              <div
                className="stat-card"
                style={{
                  flex: 1,
                  background: "#111",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <h4 style={{ color: "#888" }}>Wallet</h4>
                <h1 style={{ color: "#fbb03b", fontSize: "2.5rem" }}>Rs. 0</h1>
              </div>
            </div>
          </div>
        );

      case "address":
        return (
          <div className="profile-content-box">
            <h2>My Addresses</h2>
            {/* You can build an AddressForm component here similar to ProfileSettings */}
            <p className="section-desc">
              Manage your shipping and billing addresses.
            </p>
            <button className="save-btn">+ Add New Address</button>
          </div>
        );

      case "track":
        return (
          <div className="profile-content-box">
            <h2>Track Your Order</h2>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <input
                type="text"
                placeholder="Enter Order ID"
                style={{
                  padding: "10px",
                  flex: 1,
                  background: "#111",
                  border: "1px solid #333",
                  color: "#fff",
                  borderRadius: "5px",
                }}
              />
              <button className="save-btn" style={{ marginTop: 0 }}>
                Track
              </button>
            </div>
          </div>
        );

      case "account":
        return <ProfileSettings />; // Same as profile for now

      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="profile-page-container">
        <div className="profile-header">
          <h1>
            My <span className="highlight">Account</span>
          </h1>
        </div>

        <div className="profile-layout">
          <div className="profile-left">
            <ProfileSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleLogout={handleLogout}
            />
          </div>

          <div className="profile-right">{renderContent()}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
