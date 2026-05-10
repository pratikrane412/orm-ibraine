import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import ProfileSettings from "./ProfileSettings";
import MyOrders from "./MyOrders"; // Import the new component
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// Removed: import "../styles/ProfilePage.css";

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
            <h2 className="font-['Merriweather',_sans-serif] text-[2.2rem] mb-[30px] text-white tracking-[1px] uppercase border-b-2 border-[#fbb03b] pb-[10px] inline-block font-bold">Dashboard</h2>
            <div className="flex gap-[20px]">
              <div className="flex-1 bg-[#111] p-[20px] rounded-[10px]">
                <h4 className="text-[#888] font-medium">Total Orders</h4>
                <h1 className="text-[#fbb03b] text-[2.5rem] font-bold">5</h1>{" "}
                {/* Fetch real count later */}
              </div>
              <div className="flex-1 bg-[#111] p-[20px] rounded-[10px]">
                <h4 className="text-[#888] font-medium">Wallet</h4>
                <h1 className="text-[#fbb03b] text-[2.5rem] font-bold">Rs. 0</h1>
              </div>
            </div>
          </div>
        );

      case "address":
        return (
          <div className="profile-content-box">
            <h2 className="font-['Merriweather',_sans-serif] text-[2.2rem] mb-[30px] text-white tracking-[1px] uppercase border-b-2 border-[#fbb03b] pb-[10px] inline-block font-bold">My Addresses</h2>
            {/* You can build an AddressForm component here similar to ProfileSettings */}
            <p className="font-['Lato',_sans-serif] text-[0.9rem] text-[#888] mb-[20px] leading-[1.5]">
              Manage your shipping and billing addresses.
            </p>
            <button className="bg-[#fbb03b] text-black px-[40px] py-[14px] font-['Lato',_sans-serif] font-bold border-none rounded-[50px] cursor-pointer self-start mt-[10px] transition-all text-[1rem] tracking-[0.5px] uppercase hover:bg-[#ffc107] hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(251,176,59,0.3)]">
              + Add New Address
            </button>
          </div>
        );

      case "track":
        return (
          <div className="profile-content-box">
            <h2 className="font-['Merriweather',_sans-serif] text-[2.2rem] mb-[30px] text-white tracking-[1px] uppercase border-b-2 border-[#fbb03b] pb-[10px] inline-block font-bold">Track Your Order</h2>
            <div className="flex gap-[10px] mt-[20px]">
              <input
                type="text"
                placeholder="Enter Order ID"
                className="p-[10px] flex-1 bg-[#111] border border-[#333] text-white rounded-[5px] outline-none focus:border-[#fbb03b]"
              />
              <button className="bg-[#fbb03b] text-black px-[40px] py-[14px] font-['Lato',_sans-serif] font-bold border-none rounded-[50px] cursor-pointer transition-all text-[1rem] tracking-[0.5px] uppercase hover:bg-[#ffc107] hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(251,176,59,0.3)] mt-0">
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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="w-[90%] max-w-[1400px] mx-auto pt-[120px] pb-[80px] min-h-[80vh] text-white">
        <div className="mb-[40px]">
          <h1 className="font-['Merriweather',_sans-serif] text-[3rem] capitalize text-white font-bold">
            My <span className="text-[#fbb03b]">Account</span>
          </h1>
        </div>

        <div className="flex gap-[40px] items-start max-lg:flex-col">
          <div className="flex-1 max-w-[300px] max-lg:max-w-full w-full">
            <ProfileSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleLogout={handleLogout}
            />
          </div>

          <div className="flex-[3] bg-[#0a0a0a] border border-[#222] rounded-[12px] p-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-md:p-[25px] w-full">
            {renderContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
