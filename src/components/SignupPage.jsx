import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto login after signup
        login({ username: data.username, id: data.user_id }, data.token);
        navigate("/");
      } else {
        // Handle Django validation errors (like "username exists")
        setError(JSON.stringify(data));
      }
    } catch (err) {
      setError("Server Error");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="auth-container">
        <div className="auth-box">
          <h2>Create Account</h2>
          {error && <p className="error-msg">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" name="username" onChange={handleChange} required />
            </div>
            
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" onChange={handleChange} required />
            </div>

            <button type="submit" className="auth-btn">Sign Up</button>
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