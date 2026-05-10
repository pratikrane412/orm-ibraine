import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Removed: import "../styles/AuthPage.css"; 

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(
          {
            username: data.username,
            id: data.user_id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
          },
          data.token
        );
        navigate("/"); // Redirect to Home
      } else {
        setError(data.error || "Login Failed");
      }
    } catch (err) {
      setError("Server Error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-[80vh] flex justify-center items-center pt-[100px] bg-[url('/image/hero-bg-2.jpg')] bg-cover relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/70">
        <div className="relative z-[2] bg-black border border-[#333] p-[40px] rounded-[10px] w-full max-w-[400px] text-white shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <h2 className="font-['Merriweather',_sans-serif] text-[#fbb03b] text-center mb-[30px] text-[2rem] font-bold">Login to ORM</h2>
          {error && <p className="text-[#ff4d4d] bg-[rgba(255,0,0,0.1)] p-[10px] rounded-[5px] mb-[20px] text-center text-[0.9rem]">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-[20px]">
              <label className="block font-['Lato',_sans-serif] text-[0.9rem] mb-[8px] text-[#ccc]">Username</label>
              <input
                type="text"
                name="username"
                className="w-full p-[12px] bg-[#111] border border-[#444] text-white rounded-[5px] outline-none focus:border-[#fbb03b]"
                placeholder="Enter Username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-[20px]">
              <label className="block font-['Lato',_sans-serif] text-[0.9rem] mb-[8px] text-[#ccc]">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-[12px] bg-[#111] border border-[#444] text-white rounded-[5px] outline-none focus:border-[#fbb03b]"
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="w-full p-[12px] bg-[#fbb03b] text-black font-bold border-none rounded-[5px] cursor-pointer text-[1rem] mt-[10px] hover:bg-[#ffc107] transition-colors">
              Login
            </button>
          </form>

          <p className="text-center mt-[20px] text-[0.9rem] text-[#ccc]">
            Don't have an account? <Link to="/signup" className="text-[#fbb03b] font-bold">Sign Up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
