import React, { useState } from "react";
import "../styles/Navbar.css";
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
    <nav className="navbar">
      <div className="nav-container">
        {/* 1. LEFT: LOGO */}
        <div className="nav-logo" onClick={closeMobileMenu}>
          <Link to="/">
            <img
              src="/image/ORM.jpeg"
              alt="ORM Off-Road Mutants"
              className="logo-image"
            />
          </Link>
        </div>

        {/* 2. CENTER: LINKS (Hidden on Mobile) */}
        <ul className={click ? "nav-links active" : "nav-links"}>
          <li>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/collections/thar" onClick={closeMobileMenu}>
              Mahindra Thar & Roxx
            </Link>
          </li>
          <li>
            <Link to="/collections/scorpio" onClick={closeMobileMenu}>
              Scorpio
            </Link>
          </li>
          <li>
            <Link to="/collections/hilux" onClick={closeMobileMenu}>
              Toyota Hilux
            </Link>
          </li>
          <li>
            <Link to="/collections/fortuner" onClick={closeMobileMenu}>
              Toyota Fortuner
            </Link>
          </li>
          <li>
            <Link to="/collections/jimny" onClick={closeMobileMenu}>
              Suzuki Jimny
            </Link>
          </li>
          <li>
            <Link to="/collections/defender" onClick={closeMobileMenu}>
              Range Rover Defender
            </Link>
          </li>
        </ul>

        {/* 3. RIGHT: ICONS + HAMBURGER */}
        <div className="nav-actions">
          <div className="nav-icons">
            {/* Wishlist Icon */}
            <div className="icon-circle" style={{ position: "relative" }}>
              <Link
                to="/wishlist"
                style={{ color: "inherit", display: "flex" }}
              >
                <FaRegHeart />
                {wishlistCount > 0 && (
                  <span
                    className="cart-badge"
                    style={{ background: "#fbb03b", color: "#000" }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>

            {/* User Icon */}
            <div className="icon-circle">
              {user ? (
                <Link
                  to="/profile"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                  title="My Profile"
                >
                  {user.username.charAt(0).toUpperCase()}
                </Link>
              ) : (
                <Link to="/login" style={{ color: "inherit", display: "flex" }}>
                  <FaUser />
                </Link>
              )}
            </div>

            {/* Shopping Bag Icon */}
            <Link
              to="/cart"
              className="icon-circle"
              style={{ position: "relative" }}
            >
              <FaShoppingBag />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>

          {/* Hamburger Menu */}
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
