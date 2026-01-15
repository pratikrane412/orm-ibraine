import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaShoppingBag,
  FaTags,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaChartLine,
  FaUserCircle,
  FaTag
} from "react-icons/fa";
import "../../styles/admin/AdminLayout.css";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState({
    username: "Admin",
    email: "admin@orm.com",
  });

  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

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
        <div className="nav-group">
          <div
            className={`nav-item ${isActive("/react-admin/products")}`}
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            style={{ cursor: "pointer", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FaBox /> <span>Products</span>
            </div>
            {isProductsOpen ? (
              <FaChevronUp size={10} />
            ) : (
              <FaChevronDown size={10} />
            )}
          </div>

          {/* Sub-menu */}
          {isProductsOpen && (
            <div className="nav-sub-menu">
              <Link
                to="/react-admin/products"
                className={`sub-nav-item ${isActive("/react-admin/products")}`}
              >
                All Products
              </Link>
              <Link
                to="/react-admin/add-product"
                className={`sub-nav-item ${isActive(
                  "/react-admin/add-product"
                )}`}
              >
                Add Product
              </Link>
              <Link
                to="/react-admin/products/collections"
                className={`sub-nav-item ${isActive(
                  "/react-admin/products/collections"
                )}`}
              >
                Collections
              </Link>
              <Link
                to="/react-admin/products/inventory"
                className={`sub-nav-item ${isActive(
                  "/react-admin/products/inventory"
                )}`}
              >
                Inventory
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/react-admin/orders"
          className={`nav-item ${isActive("/react-admin/orders")}`}
        >
          <FaShoppingBag /> Orders
        </Link>
        <div className="nav-group">
          <div
            className={`nav-item ${isActive("/react-admin/customers")}`}
            onClick={() => setIsCustomersOpen(!isCustomersOpen)}
            style={{ cursor: "pointer", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FaUsers /> <span>Customers</span>
            </div>
            {isCustomersOpen ? (
              <FaChevronUp size={10} />
            ) : (
              <FaChevronDown size={10} />
            )}
          </div>

          {/* Sub-menu */}
          {isCustomersOpen && (
            <div className="nav-sub-menu">
              {/* Main Customers Link */}
              <Link
                to="/react-admin/customers"
                className={`sub-nav-item ${isActive("/react-admin/customers")}`}
              >
                All Customers
              </Link>
              {/* New Segment Link */}
              <Link
                to="/react-admin/customers/segments"
                className={`sub-nav-item ${isActive(
                  "/react-admin/customers/segments"
                )}`}
              >
                Segments
              </Link>
            </div>
          )}
          <Link
            to="/react-admin/discount"
            className={`nav-item ${isActive("/react-admin/discount")}`}
          >
            <FaTag /> Discount
          </Link>
        </div>
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
