import "../styles/Navbar.css";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <div className="nav-logo">
          <h1>ORM</h1>
          <span className="tagline">OFF-ROAD MUTANTS</span>
        </div>

        {/* LINKS */}
        <ul className="nav-links">
          <li className="active">Home</li>
          <li>Mahindra Thar & Roxx</li>
          <li>Scorpio</li>
          <li>Toyota Hilux</li>
          <li>Toyota Fortuner</li>
          <li>Suzuki Jimny</li>
          <li>Range Rover Defender</li>
        </ul>

        {/* ICONS */}
        <div className="nav-icons">
          <FaSearch className="icon" />
          <FaUser className="icon" />
          <FaShoppingCart className="icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
