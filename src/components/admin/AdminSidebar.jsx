import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaShoppingBag,
  FaPenNib,
  FaTags,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaChartLine,
  FaUserShield,
} from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState({
    username: "Admin",
    email: "admin@orm.com",
  });

  // TOGGLES
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const isActive = (path) => (location.pathname === path);

  useEffect(() => {
    const storedUser = localStorage.getItem("orm_admin_user");
    if (storedUser) {
      setAdminUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("orm_admin_token");
      localStorage.removeItem("orm_admin_user");
      navigate("/admin");
    }
  };

  return (
    <div className="w-[280px] bg-orm-surface/80 backdrop-blur-2xl border-r border-white/5 flex flex-col p-8 fixed h-screen left-0 top-0 z-[100] max-md:w-[70px] max-md:p-4">
      {/* BRAND LOGO */}
      <div className="mb-12 px-2">
        <Link to="/react-admin/dashboard" className="block group">
          <img
            src="/image/ORM.jpeg"
            alt="ORM Admin"
            className="w-[120px] h-auto block transition-transform duration-500 group-hover:scale-105 max-md:w-full"
          />
          <div className="mt-2 text-[0.55rem] font-black uppercase tracking-[0.4em] text-orm-gold/40 max-md:hidden">Admin Panel</div>
        </Link>
      </div>

      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto no-scrollbar">
        {/* SECTION LABEL */}
        <div className="text-[0.55rem] font-black uppercase tracking-[0.3em] text-white/20 mb-2 px-4 max-md:hidden">Main Menu</div>

        <Link
          to="/react-admin/dashboard"
          className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[0.75rem] font-bold tracking-tight transition-all duration-300 group ${
            isActive("/react-admin/dashboard") 
              ? "bg-orm-gold text-black shadow-lg shadow-orm-gold/20" 
              : "text-white/50 hover:bg-white/5 hover:text-white"
          }`}
        >
          <FaChartLine className={`text-base ${isActive("/react-admin/dashboard") ? "text-black" : "text-orm-gold"}`} />
          <span className="max-md:hidden">Dashboard</span>
        </Link>

        {/* PRODUCTS GROUP */}
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl text-[0.75rem] font-bold tracking-tight transition-all duration-300 cursor-pointer group ${
              location.pathname.includes("/products") || location.pathname.includes("/add-product") 
                ? "text-white bg-white/5" 
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
            onClick={() => setIsProductsOpen(!isProductsOpen)}
          >
            <div className="flex items-center gap-4">
              <FaBox className={`text-base ${location.pathname.includes("/products") || location.pathname.includes("/add-product") ? "text-orm-gold" : "text-orm-gold/40 group-hover:text-orm-gold"}`} /> 
              <span className="max-md:hidden">Products</span>
            </div>
            <div className="max-md:hidden">
              {isProductsOpen ? <FaChevronUp size={8} /> : <FaChevronDown size={8} />}
            </div>
          </div>
          {isProductsOpen && (
            <div className="flex flex-col pl-14 mt-1 gap-1 max-md:hidden animate-fadeInUp">
              {[
                { name: "All Products", path: "/react-admin/products" },
                { name: "Add Product", path: "/react-admin/add-product" },
                { name: "Collections", path: "/react-admin/products/collections" },
                { name: "Inventory", path: "/react-admin/products/inventory" },
              ].map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className={`text-[0.65rem] font-bold py-2.5 px-3 rounded-xl transition-all duration-300 ${
                    location.pathname === sub.path 
                      ? "text-orm-gold" 
                      : "text-white/30 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/react-admin/orders"
          className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[0.75rem] font-bold tracking-tight transition-all duration-300 group ${
            isActive("/react-admin/orders") 
              ? "bg-orm-gold text-black shadow-lg shadow-orm-gold/20" 
              : "text-white/50 hover:bg-white/5 hover:text-white"
          }`}
        >
          <FaShoppingBag className={`text-base ${isActive("/react-admin/orders") ? "text-black" : "text-orm-gold/40 group-hover:text-orm-gold"}`} />
          <span className="max-md:hidden">Orders</span>
        </Link>

        {/* CUSTOMERS GROUP */}
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl text-[0.75rem] font-bold tracking-tight transition-all duration-300 cursor-pointer group ${
              location.pathname.includes("/customers") 
                ? "text-white bg-white/5" 
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
            onClick={() => setIsCustomersOpen(!isCustomersOpen)}
          >
            <div className="flex items-center gap-4">
              <FaUsers className={`text-base ${location.pathname.includes("/customers") ? "text-orm-gold" : "text-orm-gold/40 group-hover:text-orm-gold"}`} /> 
              <span className="max-md:hidden">Customers</span>
            </div>
            <div className="max-md:hidden">
              {isCustomersOpen ? <FaChevronUp size={8} /> : <FaChevronDown size={8} />}
            </div>
          </div>
          {isCustomersOpen && (
            <div className="flex flex-col pl-14 mt-1 gap-1 max-md:hidden animate-fadeInUp">
               {[
                { name: "All Customers", path: "/react-admin/customers" },
                { name: "Segments", path: "/react-admin/customers/segments" },
              ].map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className={`text-[0.65rem] font-bold py-2.5 px-3 rounded-xl transition-all duration-300 ${
                    location.pathname === sub.path 
                      ? "text-orm-gold" 
                      : "text-white/30 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/react-admin/discount"
          className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[0.75rem] font-bold tracking-tight transition-all duration-300 group ${
            isActive("/react-admin/discount") 
              ? "bg-orm-gold text-black shadow-lg shadow-orm-gold/20" 
              : "text-white/50 hover:bg-white/5 hover:text-white"
          }`}
        >
          <FaTags className={`text-base ${isActive("/react-admin/discount") ? "text-black" : "text-orm-gold/40 group-hover:text-orm-gold"}`} />
          <span className="max-md:hidden">Discounts</span>
        </Link>

        {/* BLOG GROUP */}
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl text-[0.75rem] font-bold tracking-tight transition-all duration-300 cursor-pointer group ${
              location.pathname.includes("/blog") 
                ? "text-white bg-white/5" 
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
            onClick={() => setIsBlogOpen(!isBlogOpen)}
          >
            <div className="flex items-center gap-4">
              <FaPenNib className={`text-base ${location.pathname.includes("/blog") ? "text-orm-gold" : "text-orm-gold/40 group-hover:text-orm-gold"}`} /> 
              <span className="max-md:hidden">Blog</span>
            </div>
            <div className="max-md:hidden">
              {isBlogOpen ? <FaChevronUp size={8} /> : <FaChevronDown size={8} />}
            </div>
          </div>

          {isBlogOpen && (
            <div className="flex flex-col pl-14 mt-1 gap-1 max-md:hidden animate-fadeInUp">
               {[
                { name: "All Posts", path: "/react-admin/blog" },
                { name: "Categories", path: "/react-admin/blog/categories" },
              ].map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className={`text-[0.65rem] font-bold py-2.5 px-3 rounded-xl transition-all duration-300 ${
                    location.pathname === sub.path 
                      ? "text-orm-gold" 
                      : "text-white/30 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* USER PROFILE & LOGOUT */}
      <div className="pt-8 mt-6 border-t border-white/5 flex items-center justify-between max-md:flex-col max-md:gap-4">
        <div className="flex items-center gap-4 overflow-hidden max-md:hidden">
          <div className="w-10 h-10 rounded-2xl bg-orm-gold/10 border border-orm-gold/20 flex items-center justify-center text-orm-gold flex-shrink-0 shadow-lg shadow-orm-gold/5">
             <FaUserShield size={18} />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-[0.65rem] font-black text-white uppercase tracking-wider truncate">{adminUser.username}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-[0.55rem] font-bold text-white/30 uppercase tracking-widest">Active Now</span>
            </div>
          </div>
        </div>
        <button 
          className="w-10 h-10 rounded-xl bg-white/5 text-white/40 flex items-center justify-center transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 hover:border hover:border-red-500/20 active:scale-95" 
          onClick={handleLogout} 
          title="Logout"
        >
          <FaSignOutAlt className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
