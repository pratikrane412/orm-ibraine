import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const adminToken = localStorage.getItem("orm_admin_token");

  // If no token, redirect to Admin Login
  if (!adminToken) {
    return <Navigate to="/admin-login" replace />;
  }

  // If token exists, show the Admin Layout
  return <Outlet />;
};

export default AdminProtectedRoute;
