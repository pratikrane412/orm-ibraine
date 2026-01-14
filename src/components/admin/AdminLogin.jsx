import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUserShield } from "react-icons/fa"; // Icons for trust
import "../../styles/admin/AdminLogin.css"; // New dedicated CSS file

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("orm_admin_token", data.token);
        localStorage.setItem(
          "orm_admin_user",
          JSON.stringify({
            username: data.username,
            email: data.email,
          })
        );
        navigate("/react-admin/products"); // Go to dashboard
      } else {
        setError(data.error || "Invalid Credentials");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-wrapper">
      {/* BACKGROUND DECORATION (Optional circles) */}
      <div className="bg-circle c1"></div>
      <div className="bg-circle c2"></div>

      <div className="admin-auth-card">
        {/* HEADER */}
        <div className="auth-header">
          <div className="icon-wrapper">
            <FaUserShield />
          </div>
          <h1>
            ORM <span>Admin</span>
          </h1>
          <p>Secure Dashboard Access</p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="auth-error">
            <FaLock /> {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter admin ID"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Verifying..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="auth-footer">
          <p>Protected by ORM Security Systems</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
