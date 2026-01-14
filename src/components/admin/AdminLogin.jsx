import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminLogin.css"; // We will create this

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("orm_admin_token", data.token);

        // SAVE USER DETAILS
        localStorage.setItem(
          "orm_admin_user",
          JSON.stringify({
            username: data.username,
            email: data.email,
          })
        );

        navigate("/react-admin/dashboard");
      } else {
        setError(data.error || "Login Failed");
      }
    } catch (err) {
      setError("Server Error");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        <h1>
          ORM <span>Admin</span>
        </h1>
        <p>Restricted Access</p>

        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              name="username"
              placeholder="Admin Username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Access Dashboard</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
