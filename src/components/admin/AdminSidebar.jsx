import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaShoppingBag,
  FaTags,
  FaSignOutAlt,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";
import "../../styles/admin/AdminLayout.css";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState({
    username: "Admin",
    email: "admin@orm.com",
  });

  const isActive = (path) => (location.pathname === path ? "active" : "");

  // Load Admin Details from Local Storage
  useEffect(() => {
    const storedUser = localStorage.getItem("orm_admin_user");
    if (storedUser) {
      setAdminUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout Logic
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("orm_admin_token");
      localStorage.removeItem("orm_admin_user");
      navigate("/admin");
    }
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-logo">
        <h1>
          ORM <span>Admin</span>
        </h1>
      </div>

      <nav className="admin-nav">
        <Link
          to="/react-admin/dashboard"
          className={`nav-item ${isActive("/react-admin/dashboard")}`}
        >
          <FaChartLine /> Dashboard
        </Link>
        <Link
          to="/react-admin/products"
          className={`nav-item ${isActive("/react-admin/products")}`}
        >
          <FaBox /> Products
        </Link>
        <Link
          to="/react-admin/orders"
          className={`nav-item ${isActive("/react-admin/orders")}`}
        >
          <FaShoppingBag /> Orders
        </Link>
      </nav>

      {/* ADMIN PROFILE WIDGET */}
      <div className="admin-profile-section">
        <div className="admin-info">
          <FaUserCircle className="admin-avatar" />
          <div className="admin-text">
            <h4>{adminUser.username}</h4>
            <p>{adminUser.email || "No Email"}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
