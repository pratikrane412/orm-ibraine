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

const Navbar = () => {
  const [click, setClick] = useState(false);

  // Get the dynamic cart count from global context
  const { cartCount } = useCart();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* 1. LEFT: LOGO */}
        <div className="nav-logo" onClick={closeMobileMenu}>
          <Link to="/">
            <h1 className="orm-text">ORM</h1>
            <span className="mutant-text">OFF-ROAD MUTANTS</span>
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
            <Link to="/products/thar" onClick={closeMobileMenu}>
              Mahindra Thar & Roxx
            </Link>
          </li>
          <li>
            <Link to="/products/scorpio" onClick={closeMobileMenu}>
              Scorpio
            </Link>
          </li>
          <li>
            <Link to="/products/hilux" onClick={closeMobileMenu}>
              Toyota Hilux
            </Link>
          </li>
          <li>
            <Link to="/products/fortuner" onClick={closeMobileMenu}>
              Toyota Fortuner
            </Link>
          </li>
          <li>
            <Link to="/products/jimny" onClick={closeMobileMenu}>
              Suzuki Jimny
            </Link>
          </li>
          <li>
            <Link to="/products/defender" onClick={closeMobileMenu}>
              Range Rover Defender
            </Link>
          </li>
        </ul>

        {/* 3. RIGHT: ICONS + HAMBURGER */}
        <div className="nav-actions">
          {/* User Icons */}
          <div className="nav-icons">
            <div className="icon-circle">
              <FaRegHeart />
            </div>

            <div className="icon-circle">
              <FaUser />
            </div>

            {/* SHOPPING BAG WITH DYNAMIC BADGE */}
            <div className="icon-circle" style={{ position: "relative" }}>
              <Link
                to="/cart"
                className="icon-circle"
                style={{ position: "relative" }}
              >
                <FaShoppingBag />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>

          {/* Hamburger Menu (Visible only on Mobile) */}
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
