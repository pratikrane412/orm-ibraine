import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "", 
    first_name: "", 
    last_name: "",
    otp: "" // New field
  });
  
  const [otpSent, setOtpSent] = useState(false); // Track if we are in Step 2
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // STEP 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("Sending OTP...");

    if(!formData.email || !formData.username || !formData.password) {
        setError("Please fill all fields first.");
        return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setMessage("OTP Sent to your email!");
      } else {
        setError(data.error || "Failed to send OTP");
        setMessage("");
      }
    } catch (err) {
      setError("Server connection failed.");
      setMessage("");
    }
  };

  // STEP 2: Verify & Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Sends form data + OTP
      });

      const data = await response.json();

      if (response.ok) {
        login({ 
            username: data.username, 
            id: data.user_id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
        }, data.token);
        navigate("/");
      } else {
        setError(data.error || JSON.stringify(data));
      }
    } catch (err) {
      setError("Server Error.");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="auth-container">
        <div className="auth-box">
          <h2>Create Account</h2>
          {error && <p className="error-msg">{error}</p>}
          {message && <p className="status-msg success" style={{textAlign:'center', color:'#2cff7b'}}>{message}</p>}
          
          <form onSubmit={otpSent ? handleRegister : handleSendOtp}>
            
            {/* Standard Fields (Read-only if OTP sent to prevent changing email mid-process) */}
            <div className="input-group-row">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" name="first_name" onChange={handleChange} required disabled={otpSent} />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" name="last_name" onChange={handleChange} required disabled={otpSent} />
              </div>
            </div>

            <div className="input-group">
              <label>Username</label>
              <input type="text" name="username" onChange={handleChange} required disabled={otpSent} />
            </div>
            
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" onChange={handleChange} required disabled={otpSent} />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" onChange={handleChange} required disabled={otpSent} />
            </div>

            {/* OTP Field - Only shows after clicking 'Sign Up' */}
            {otpSent && (
              <div className="input-group" style={{marginTop:'20px', borderTop:'1px solid #333', paddingTop:'20px'}}>
                <label style={{color: '#fbb03b'}}>Enter OTP sent to email</label>
                <input 
                    type="text" 
                    name="otp" 
                    placeholder="6-digit code"
                    onChange={handleChange} 
                    required 
                    style={{textAlign: 'center', letterSpacing: '5px', fontSize: '1.2rem'}}
                />
              </div>
            )}

            <button type="submit" className="auth-btn">
                {otpSent ? "Verify & Register" : "Send OTP & Signup"}
            </button>
          
          </form>

          <p className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;