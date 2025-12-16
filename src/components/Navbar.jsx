import "../styles/Navbar.css";
import { FaRegHeart, FaUser, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <div className="nav-logo">
          <h1 className="orm-text">ORM</h1>
          <span className="mutant-text">OFF-ROAD MUTANTS</span>
        </div>

        {/* LINKS */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products/thar">Mahindra Thar & Roxx</Link></li>
          <li><Link to="/products/scorpio">Scorpio</Link></li>
          <li>Toyota Hilux</li>
          <li>Toyota Fortuner</li>
          <li>Suzuki Jimny</li>
          <li>Range Rover Defender</li>
        </ul>

        {/* ICONS */}
        <div className="nav-icons">
          <div className="icon-circle">
            <FaRegHeart />
          </div>
          {/* User Icon - Remove this block if you only want 2 icons */}
          <div className="icon-circle">
            <FaUser />
          </div>
          <div className="icon-circle">
            <FaShoppingBag />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;