import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa"; // Added icons for better UI

const ProfileSettings = () => {
  const { user, token, login } = useAuth();
  
  // State for read-only data
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });

  // State for password change
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'success' or 'error'

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

    // Validation
    if (!passwords.newPassword) {
      setMessage({ text: "Please enter a new password to update.", type: "error" });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    try {
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/profile/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({ password: passwords.newPassword }), // Only sending password
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ text: "Password updated successfully!", type: "success" });
        setPasswords({ newPassword: "", confirmPassword: "" });
        // Update context just in case backend returns updated user object
        login(data.user, token);
      } else {
        setMessage({ text: "Failed to update password.", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: "Server Error. Try again later.", type: "error" });
    }
  };

  return (
    <div className="profile-content-box">
      <h2 className="font-['Merriweather',_serif] text-[2.2rem] mb-[30px] text-white tracking-[1px] uppercase border-b-2 border-[#fbb03b] pb-[10px] inline-block font-bold">Account Information</h2>
      
      {/* PERSONAL DETAILS (READ ONLY) */}
      <div className="mb-[30px]">
        <h3 className="font-['Merriweather',_serif] text-[1.4rem] text-[#fbb03b] mt-[20px] mb-[5px] tracking-[0.5px] font-bold">Personal Details</h3>
        <p className="font-['Lato',_sans-serif] text-[0.9rem] text-[#888] mb-[20px] leading-[1.5]">These details are managed by your account administrator and cannot be changed.</p>
        
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[20px] max-md:flex-col">
            <div className="flex-1 flex flex-col gap-[10px]">
              <label className="font-['Lato',_sans-serif] text-[0.95rem] text-[#ccc] font-medium flex items-center gap-[8px]"><FaUser /> First Name</label>
              <input 
                type="text" 
                value={profileData.first_name} 
                disabled 
                className="p-[15px] bg-[#0d0d0d] border border-[#222] text-[#777] rounded-[6px] font-bold opacity-80 cursor-not-allowed pointer-events-none"
              />
            </div>
            <div className="flex-1 flex flex-col gap-[10px]">
              <label className="font-['Lato',_sans-serif] text-[0.95rem] text-[#ccc] font-medium flex items-center gap-[8px]"><FaUser /> Last Name</label>
              <input 
                type="text" 
                value={profileData.last_name} 
                disabled 
                className="p-[15px] bg-[#0d0d0d] border border-[#222] text-[#777] rounded-[6px] font-bold opacity-80 cursor-not-allowed pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <label className="font-['Lato',_sans-serif] text-[0.95rem] text-[#ccc] font-medium flex items-center gap-[8px]"><FaEnvelope /> Email Address</label>
            <input 
              type="email" 
              value={profileData.email} 
              disabled 
              className="p-[15px] bg-[#0d0d0d] border border-[#222] text-[#777] rounded-[6px] font-bold opacity-80 cursor-not-allowed pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#222] my-[40px]"></div>

      {/* PASSWORD CHANGE (EDITABLE) */}
      <div className="mb-[30px]">
        <h3 className="font-['Merriweather',_serif] text-[1.4rem] text-[#fbb03b] mt-[20px] mb-[5px] tracking-[0.5px] font-bold">Security Settings</h3>
        <p className="font-['Lato',_sans-serif] text-[0.9rem] text-[#888] mb-[20px] leading-[1.5]">Ensure your account is using a long, random password to stay secure.</p>

        {message.text && (
          <div className={`p-[12px] rounded-[6px] mb-[20px] font-['Lato',_sans-serif] text-[0.95rem] font-medium text-center ${message.type === 'success' ? 'bg-[rgba(44,255,44,0.1)] text-[#2cff7b] border border-[#2cff7b]' : 'bg-[rgba(255,68,68,0.1)] text-[#ff4d4d] border border-[#ff4d4d]'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <label className="font-['Lato',_sans-serif] text-[0.95rem] text-[#ccc] font-medium flex items-center gap-[8px]"><FaLock /> New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              placeholder="Enter new password"
              value={passwords.newPassword} 
              onChange={handlePasswordChange} 
              className="p-[15px] bg-[#111] border border-[#444] text-white rounded-[6px] text-[1rem] font-['Lato',_sans-serif] outline-none transition-all focus:border-[#fbb03b] focus:shadow-[0_0_10px_rgba(251,176,59,0.1)] focus:bg-[#151515]"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label className="font-['Lato',_sans-serif] text-[0.95rem] text-[#ccc] font-medium flex items-center gap-[8px]"><FaLock /> Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm new password"
              value={passwords.confirmPassword} 
              onChange={handlePasswordChange} 
              className="p-[15px] bg-[#111] border border-[#444] text-white rounded-[6px] text-[1rem] font-['Lato',_sans-serif] outline-none transition-all focus:border-[#fbb03b] focus:shadow-[0_0_10px_rgba(251,176,59,0.1)] focus:bg-[#151515]"
            />
          </div>

          <button type="submit" className="bg-[#fbb03b] text-black px-[40px] py-[14px] font-['Lato',_sans-serif] font-bold border-none rounded-[50px] cursor-pointer self-start mt-[10px] transition-all text-[1rem] tracking-[0.5px] uppercase hover:bg-[#ffc107] hover:-translate-y-[3px] hover:shadow-[0_5px_20px_rgba(251,176,59,0.3)]">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;