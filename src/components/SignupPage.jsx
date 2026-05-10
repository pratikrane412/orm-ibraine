import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Removed: import "../styles/AuthPage.css";

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
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/send-otp/", {
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
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/register/", {
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-[80vh] flex justify-center items-center pt-[100px] bg-[url('/image/hero-bg-2.jpg')] bg-cover relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/70">
        <div className="relative z-[2] bg-black border border-[#333] p-[40px] rounded-[10px] w-full max-w-[400px] text-white shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <h2 className="font-['Merriweather',_sans-serif] text-[#fbb03b] text-center mb-[30px] text-[2rem] font-bold">Create Account</h2>
          {error && <p className="text-[#ff4d4d] bg-[rgba(255,0,0,0.1)] p-[10px] rounded-[5px] mb-[20px] text-center text-[0.9rem]">{error}</p>}
          {message && <p className="text-center text-[#2cff7b] mb-[20px] text-[0.9rem] font-medium">{message}</p>}
          
          <form onSubmit={otpSent ? handleRegister : handleSendOtp}>
            
            <div className="flex gap-[15px]">
              <div className="flex-1 mb-[20px]">
                <label className="block font-['Lato',_sans-serif] text-[0.9rem] mb-[8px] text-[#ccc]">First Name</label>
                <input type="text" name="first_name" className="w-full p-[12px] bg-[#111] border border-[#444] text-white rounded-[5px] outline-none focus:border-[#fbb03b] disabled:opacity-50" onChange={handleChange} required disabled={otpSent} />
              </div>
              <div className="flex-1 mb-[20px]">
                <label className="block font-['Lato',_sans-serif] text-[0.9rem] mb-[8px] text-[#ccc]">Last Name</label>
                <input type="text" name="last_name" className="w-full p-[12px] bg-[#111] border border-[#444] text-white rounded-[5px] outline-none focus:border-[#fbb03b] disabled:opacity-50" onChange={handleChange} required disabled={otpSent} />
              </div>
            </div>

            <div className="mb-[20px]">
              <label className="block font-['Lato',_sans-serif] text-[0.9rem] mb-[8px] text-[#ccc]">Username</label>
              <input type="text" name="username" className="w-full p-[12px] bg-[#111] border border-[#444] text-white rounded-[5px] outline-none focus:border-[#fbb03b] disabled:opacity-50" onChange={handleChange} required disabled={otpSent} />
            </div>
            
            <div className="mb-[20px]">
              <label className="block font-['Lato',_sans-serif] text-[0.9rem] mb-[8px] text-[#ccc]">Email</label>
              <input type="email" name="email" className="w-full p-[12px] bg-[#111] border border-[#444] text-white rounded-[5px] outline-none focus:border-[#fbb03b] disabled:opacity-50" onChange={handleChange} required disabled={otpSent} />
            </div>

            <div className="mb-[20px]">
              <label className="block font-['Lato',_sans-serif] text-[0.9rem] mb-[8px] text-[#ccc]">Password</label>
              <input type="password" name="password" className="w-full p-[12px] bg-[#111] border border-[#444] text-white rounded-[5px] outline-none focus:border-[#fbb03b] disabled:opacity-50" onChange={handleChange} required disabled={otpSent} />
            </div>

            {/* OTP Field - Only shows after clicking 'Sign Up' */}
            {otpSent && (
              <div className="mt-[20px] border-t border-[#333] pt-[20px] mb-[20px]">
                <label className="block font-['Lato',_sans-serif] text-[0.9rem] mb-[8px] text-[#fbb03b]">Enter OTP sent to email</label>
                <input 
                    type="text" 
                    name="otp" 
                    placeholder="6-digit code"
                    className="w-full p-[12px] bg-[#111] border border-[#444] text-white rounded-[5px] outline-none focus:border-[#fbb03b] text-center tracking-[5px] text-[1.2rem]"
                    onChange={handleChange} 
                    required 
                />
              </div>
            )}

            <button type="submit" className="w-full p-[12px] bg-[#fbb03b] text-black font-bold border-none rounded-[5px] cursor-pointer text-[1rem] mt-[10px] hover:bg-[#ffc107] transition-colors">
                {otpSent ? "Verify & Register" : "Send OTP & Signup"}
            </button>
          
          </form>

          <p className="text-center mt-[20px] text-[0.9rem] text-[#ccc]">
            Already have an account? <Link to="/login" className="text-[#fbb03b] font-bold">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;