import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f9fafb] text-[#1f2937] font-['Inter',sans-serif]">
      <AdminSidebar />
      <div className="flex-1 ml-[260px] p-[30px] w-[calc(100%-260px)] box-border max-md:ml-[70px] max-md:w-[calc(100%-70px)] max-md:p-[15px]">
        <Outlet /> {/* This renders the specific admin page */}
      </div>
    </div>
  );
};

export default AdminLayout;