import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "../../styles/admin/AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-wrapper">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet /> {/* This renders the specific admin page */}
      </div>
    </div>
  );
};

export default AdminLayout;