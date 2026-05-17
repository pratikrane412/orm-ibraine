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
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-orm-dark/90 backdrop-blur-xl border-b border-white/10 flex justify-center items-center z-[9999]">
      <div className="w-[92%] max-w-[1500px] h-full flex items-center justify-between relative">
        {/* 1. LEFT: LOGO */}
        <div className="h-full flex items-center" onClick={closeMobileMenu}>
          <Link to="/" className="flex items-center justify-center h-full no-underline group">
            <img
              src="/image/ORM.jpeg"
              alt="ORM Off-Road Mutants"
              className="h-[45px] w-auto object-contain transition-all duration-300 group-hover:scale-105 max-[480px]:h-[35px]"
            />
          </Link>
        </div>

        {/* 2. CENTER: LINKS */}
        <ul className={`flex list-none gap-[24px] m-0 p-0 
          max-[1100px]:flex-col max-[1100px]:fixed max-[1100px]:top-[70px] max-[1100px]:w-full max-[1100px]:h-[calc(100vh-70px)] 
          max-[1100px]:bg-orm-dark max-[1100px]:backdrop-blur-2xl max-[1100px]:transition-all max-[1100px]:duration-500 
          max-[1100px]:items-center max-[1100px]:justify-start max-[1100px]:pt-[30px] max-[1100px]:z-[998] 
          ${click ? "max-[1100px]:left-0 opacity-100" : "max-[1100px]:left-[-100%] max-[1100px]:opacity-0"}`}>
          {[
            { name: "Home", path: "/" },
            { name: "Mahindra Thar & Roxx", path: "/collections/thar" },
            { name: "Scorpio", path: "/collections/scorpio" },
            { name: "Toyota Hilux", path: "/collections/hilux" },
            { name: "Toyota Fortuner", path: "/collections/fortuner" },
            { name: "Suzuki Jimny", path: "/collections/jimny" },
            { name: "Range Rover Defender", path: "/collections/defender" },
          ].map((link) => (
            <li key={link.path} className="h-full flex items-center max-[1100px]:h-auto max-[1100px]:w-full max-[1100px]:text-center">
              <Link
                to={link.path}
                onClick={closeMobileMenu}
                className="group relative text-[0.75rem] font-bold text-white/70 tracking-[0.03em] uppercase no-underline whitespace-nowrap transition-all duration-300 hover:text-orm-gold max-[1100px]:text-[1rem] max-[1100px]:w-full max-[1100px]:block max-[1100px]:py-[15px] max-[1100px]:hover:bg-white/5"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-orm-gold transition-all duration-300 group-hover:w-full max-[1100px]:hidden"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* 3. RIGHT: ICONS */}
        <div className="flex items-center gap-[16px]">
          <div className="flex gap-[8px] items-center">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative w-[36px] h-[36px] bg-white/5 rounded-full flex items-center justify-center text-white/80 transition-all hover:text-orm-gold hover:bg-white/10"
            >
              <FaRegHeart className="text-base" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orm-gold text-black text-[0.55rem] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center border-2 border-orm-dark">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              to={user ? "/profile" : "/login"}
              className="w-[36px] h-[36px] bg-white/5 rounded-full flex items-center justify-center text-white/80 transition-all hover:text-orm-gold hover:bg-white/10"
            >
              {user ? (
                <span className="font-bold text-xs uppercase">{user.username.charAt(0)}</span>
              ) : (
                <FaUser className="text-sm" />
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative w-[36px] h-[36px] bg-orm-gold rounded-full flex items-center justify-center text-black transition-all hover:bg-white"
            >
              <FaShoppingBag className="text-sm" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[0.55rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-orm-gold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="hidden max-[1100px]:flex items-center justify-center w-[36px] h-[36px] text-[1.2rem] text-white cursor-pointer bg-white/5 rounded-full transition-all" 
            onClick={handleClick}
          >
            {click ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
