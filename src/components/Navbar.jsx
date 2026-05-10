import React, { useState } from "react";
import {
  FaRegHeart,
  FaUser,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const { user } = useAuth();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-[80px] bg-orm-dark/80 backdrop-blur-md border-b border-orm-gray flex justify-center items-center z-[9999]">
      <div className="w-[92%] max-w-[1500px] h-full flex items-center justify-between relative">
        {/* 1. LEFT: LOGO */}
        <div className="h-full flex items-center" onClick={closeMobileMenu}>
          <Link to="/" className="flex items-center justify-center h-full no-underline group">
            <img
              src="/image/ORM.jpeg"
              alt="ORM Off-Road Mutants"
              className="h-[60px] w-auto object-contain transition-all duration-300 group-hover:brightness-110 max-[480px]:h-[45px]"
            />
          </Link>
        </div>

        {/* 2. CENTER: LINKS (Hidden on Mobile) */}
        <ul className={`flex list-none gap-[32px] m-0 p-0 max-[1100px]:flex-col max-[1100px]:fixed max-[1100px]:top-[80px] max-[1100px]:w-full max-[1100px]:h-[calc(100vh-80px)] max-[1100px]:bg-orm-dark max-[1100px]:transition-[left] max-[1100px]:duration-500 max-[1100px]:ease-in-out max-[1100px]:items-center max-[1100px]:justify-start max-[1100px]:pt-[40px] max-[1100px]:border-t max-[1100px]:border-orm-gray max-[1100px]:z-[998] ${click ? "max-[1100px]:left-0" : "max-[1100px]:left-[-100%]"}`}>
          {[
            { name: "Home", path: "/" },
            { name: "Mahindra Thar & Roxx", path: "/collections/thar" },
            { name: "Scorpio", path: "/collections/scorpio" },
            { name: "Toyota Hilux", path: "/collections/hilux" },
            { name: "Toyota Fortuner", path: "/collections/fortuner" },
            { name: "Suzuki Jimny", path: "/collections/jimny" },
            { name: "Range Rover Defender", path: "/collections/defender" },
          ].map((link) => (
            <li key={link.path} className="h-[80px] flex items-center max-[1100px]:h-[60px] max-[1100px]:w-full max-[1100px]:text-center max-[1100px]:border-b max-[1100px]:border-orm-gray/50 last:border-0">
              <Link
                to={link.path}
                onClick={closeMobileMenu}
                className="font-sans text-[0.88rem] font-medium text-white/80 no-underline whitespace-nowrap transition-all duration-300 hover:text-orm-gold hover:scale-105 max-[1100px]:text-[1.1rem] max-[1100px]:w-full max-[1100px]:block max-[1100px]:py-[15px] max-[1100px]:hover:bg-orm-surface"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* 3. RIGHT: ICONS + HAMBURGER */}
        <div className="flex items-center gap-[24px]">
          <div className="flex gap-[16px] max-[1100px]:gap-[12px]">
            {/* Wishlist Icon */}
            <div className="relative w-[42px] h-[42px] bg-orm-surface rounded-xl border border-orm-gray flex items-center justify-center cursor-pointer transition-all duration-300 text-orm-gold hover:bg-orm-surface-light hover:border-orm-gold-premium/50 hover:-translate-y-1 max-[1100px]:w-[38px] max-[1100px]:h-[38px]">
              <Link
                to="/wishlist"
                className="text-inherit flex items-center justify-center w-full h-full"
              >
                <FaRegHeart className="text-lg" />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 bg-orm-gold text-black font-sans text-[0.7rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-orm-dark shadow-lg max-[1100px]:w-[16px] max-[1100px]:h-[16px]"
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>

            {/* User Icon */}
            <div className="w-[42px] h-[42px] bg-orm-surface rounded-xl border border-orm-gray flex items-center justify-center cursor-pointer transition-all duration-300 text-orm-gold hover:bg-orm-surface-light hover:border-orm-gold-premium/50 hover:-translate-y-1 max-[1100px]:w-[38px] max-[1100px]:h-[38px]">
              {user ? (
                <Link
                  to="/profile"
                  className="text-inherit no-underline font-bold text-sm"
                  title="My Profile"
                >
                  {user.username.charAt(0).toUpperCase()}
                </Link>
              ) : (
                <Link to="/login" className="text-inherit flex items-center justify-center w-full h-full">
                  <FaUser className="text-base" />
                </Link>
              )}
            </div>

            {/* Shopping Bag Icon */}
            <Link
              to="/cart"
              className="relative w-[42px] h-[42px] bg-orm-surface rounded-xl border border-orm-gray flex items-center justify-center cursor-pointer transition-all duration-300 text-orm-gold hover:bg-orm-surface-light hover:border-orm-gold-premium/50 hover:-translate-y-1 max-[1100px]:w-[38px] max-[1100px]:h-[38px]"
            >
              <FaShoppingBag className="text-base" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-sans text-[0.7rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-orm-dark shadow-lg max-[1100px]:w-[16px] max-[1100px]:h-[16px]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Hamburger Menu */}
          <div className="hidden max-[1100px]:flex items-center justify-center w-[42px] h-[42px] text-[1.5rem] text-white cursor-pointer bg-orm-surface border border-orm-gray rounded-xl" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
