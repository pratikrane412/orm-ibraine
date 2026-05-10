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
  FaUserCircle,
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
  const [isBlogOpen, setIsBlogOpen] = useState(false); // <--- NEW STATE

  const isActive = (path) => (location.pathname === path ? "bg-[#fbb03b] !text-black font-[600] shadow-[0_4px_6px_-1px_rgba(251,176,59,0.3)]" : "");

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
    <div className="w-[280px] bg-white border-r border-gray-100 flex flex-col p-6 fixed h-screen left-0 top-0 z-[100] max-md:w-[70px] max-md:p-4">
      <div className="mb-10 px-2">
        <img
          src="/image/ORM2.png"
          alt="ORM Admin"
          className="w-full h-auto block"
        />
      </div>

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto scrollbar-none">
        <Link
          to="/react-admin/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive("/react-admin/dashboard") ? "bg-orm-gold text-black shadow-lg shadow-orm-gold/20" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
        >
          <FaChartLine className="text-base" />
          <span className="max-md:hidden">Dashboard</span>
        </Link>

        {/* PRODUCTS GROUP */}
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${location.pathname.includes("/products") || location.pathname.includes("/add-product") ? "text-orm-gold bg-orm-gold/5" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
            onClick={() => setIsProductsOpen(!isProductsOpen)}
          >
            <div className="flex items-center gap-3">
              <FaBox className="text-base" /> <span className="max-md:hidden">Products</span>
            </div>
            <div className="max-md:hidden">
              {isProductsOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
            </div>
          </div>
          {isProductsOpen && (
            <div className="flex flex-col pl-12 mt-1 gap-1 max-md:hidden">
              {[
                { name: "All Products", path: "/react-admin/products" },
                { name: "Add Product", path: "/react-admin/add-product" },
                { name: "Collections", path: "/react-admin/products/collections" },
                { name: "Inventory", path: "/react-admin/products/inventory" },
              ].map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className={`text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200 ${location.pathname === sub.path ? "text-orm-gold bg-orm-gold/10" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/react-admin/orders"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive("/react-admin/orders") ? "bg-orm-gold text-black shadow-lg shadow-orm-gold/20" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
        >
          <FaShoppingBag className="text-base" />
          <span className="max-md:hidden">Orders</span>
        </Link>

        {/* CUSTOMERS GROUP */}
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${location.pathname.includes("/customers") ? "text-orm-gold bg-orm-gold/5" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
            onClick={() => setIsCustomersOpen(!isCustomersOpen)}
          >
            <div className="flex items-center gap-3">
              <FaUsers className="text-base" /> <span className="max-md:hidden">Customers</span>
            </div>
            <div className="max-md:hidden">
              {isCustomersOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
            </div>
          </div>
          {isCustomersOpen && (
            <div className="flex flex-col pl-12 mt-1 gap-1 max-md:hidden">
               {[
                { name: "All Customers", path: "/react-admin/customers" },
                { name: "Segments", path: "/react-admin/customers/segments" },
              ].map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className={`text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200 ${location.pathname === sub.path ? "text-orm-gold bg-orm-gold/10" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/react-admin/discount"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive("/react-admin/discount") ? "bg-orm-gold text-black shadow-lg shadow-orm-gold/20" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
        >
          <FaTags className="text-base" />
          <span className="max-md:hidden">Discount</span>
        </Link>

        {/* BLOG GROUP */}
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${location.pathname.includes("/blog") ? "text-orm-gold bg-orm-gold/5" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
            onClick={() => setIsBlogOpen(!isBlogOpen)}
          >
            <div className="flex items-center gap-3">
              <FaPenNib className="text-base" /> <span className="max-md:hidden">Blog</span>
            </div>
            <div className="max-md:hidden">
              {isBlogOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
            </div>
          </div>

          {isBlogOpen && (
            <div className="flex flex-col pl-12 mt-1 gap-1 max-md:hidden">
               {[
                { name: "All Posts", path: "/react-admin/blog" },
                { name: "Categories", path: "/react-admin/blog/categories" },
              ].map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className={`text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200 ${location.pathname === sub.path ? "text-orm-gold bg-orm-gold/10" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between max-md:flex-col max-md:gap-4">
        <div className="flex items-center gap-3 overflow-hidden max-md:hidden">
          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
             <FaUserCircle size={24} />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-gray-900 truncate">{adminUser.username}</h4>
            <p className="text-[10px] font-medium text-gray-400 truncate">{adminUser.email || "No Email"}</p>
          </div>
        </div>
        <button 
          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center transition-all duration-200 hover:bg-red-500 hover:text-white" 
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
