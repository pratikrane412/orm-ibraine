import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import "../styles/Footer.css";

// IMAGES: These will appear INSIDE the big text "OFF ROAD MUTANTS"
// Replace these paths with your actual car/mud images
const maskImages = ["/image/vehicle-move.jpg", "/image/car-ai.png"];

const Footer = () => {
  const [currentImg, setCurrentImg] = useState(0);

  // Cycle images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % maskImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* --- TOP SECTION --- */}
        <div className="footer-top">
          {/* LOGO & DESC */}
          <div className="brand-col">
            <img
              src="image/gg.png"
              alt="ORM Logo"
              className="footer-logo-img"
            />
            <p className="footer-desc">
              Off-Road Mutants (ORM) isn't just a brand — it's a movement. Tough
              gear, tested on the harshest terrains, built for those who never
              stop exploring.
            </p>
          </div>

          {/* LINKS GRID */}
          <div className="links-row">
            {/* Col 1 */}
            <div className="link-col">
              <h3>Discover</h3>
              <a href="#">New Arrivals</a>
              <a href="#">Accessories</a>
              <a href="#">Off-Road Kits</a>
              <a href="#">Contact Us</a>
            </div>

            {/* Col 2 */}
            <div className="link-col">
              <h3>Car Option</h3>
              <a href="#">BYD</a>
              <a href="#">Scorpio</a>
              <a href="#">Suzuki Jimny</a>
              <a href="#">Toyota Hilux</a>
            </div>

            {/* Col 3 */}
            <div className="link-col">
              <h3>Car Option</h3>
              <a href="#">Toyota Fortuner</a>
              <a href="#">Range Rover Defender</a>
              <a href="#">Mahindra Thar & Roxx</a>
              <a href="#">Jeep Rubicon Wrangler</a>
            </div>

            {/* Col 4 */}
            <div className="link-col">
              <h3>Our Policies</h3>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Refund Policy</a>
              <a href="#">Code of Conduct</a>
            </div>
          </div>
        </div>

        <hr className="footer-line" />

        {/* --- BOTTOM SECTION --- */}
        <div className="footer-bottom">
          <p className="copyright">© 2025, ORM. All Rights Reserved</p>

          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>

          <p className="credits">
            Design & Developed by <a href="#">ibraine</a>
          </p>
        </div>
      </div>

      {/* --- GIANT MASKED TEXT --- */}
      <div className="big-text-container">
        <h1
          className="giant-text"
          style={{ backgroundImage: `url(${maskImages[currentImg]})` }}
        >
          OFF ROAD MUTANTS
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
