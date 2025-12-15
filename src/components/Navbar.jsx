import "../styles/Navbar.css";
import { FaRegHeart, FaUser, FaShoppingBag } from "react-icons/fa";

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