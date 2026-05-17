import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-orm-dark text-white font-sans selection:bg-orm-gold selection:text-black">
      <AdminSidebar />
      <div className="flex-1 ml-[280px] p-[40px] w-[calc(100%-280px)] box-border max-md:ml-[70px] max-md:w-[calc(100%-70px)] max-md:p-[20px]">
        <div className="max-w-[1600px] mx-auto">
          <Outlet /> {/* This renders the specific admin page */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;