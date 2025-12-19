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
      const response = await fetch("http://127.0.0.1:8000/api/profile/update/", {
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
      <h2>Account Information</h2>
      
      {/* PERSONAL DETAILS (READ ONLY) */}
      <div className="section-container">
        <h3>Personal Details</h3>
        <p className="section-desc">These details are managed by your account administrator and cannot be changed.</p>
        
        <div className="profile-form readonly-section">
          <div className="form-row">
            <div className="form-group">
              <label><FaUser /> First Name</label>
              <input 
                type="text" 
                value={profileData.first_name} 
                disabled 
                className="readonly-input"
              />
            </div>
            <div className="form-group">
              <label><FaUser /> Last Name</label>
              <input 
                type="text" 
                value={profileData.last_name} 
                disabled 
                className="readonly-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label><FaEnvelope /> Email Address</label>
            <input 
              type="email" 
              value={profileData.email} 
              disabled 
              className="readonly-input"
            />
          </div>
        </div>
      </div>

      <div className="divider-line"></div>

      {/* PASSWORD CHANGE (EDITABLE) */}
      <div className="section-container">
        <h3>Security Settings</h3>
        <p className="section-desc">Ensure your account is using a long, random password to stay secure.</p>

        {message.text && (
          <div className={`status-msg ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label><FaLock /> New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              placeholder="Enter new password"
              value={passwords.newPassword} 
              onChange={handlePasswordChange} 
            />
          </div>
          <div className="form-group">
            <label><FaLock /> Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm new password"
              value={passwords.confirmPassword} 
              onChange={handlePasswordChange} 
            />
          </div>

          <button type="submit" className="save-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;