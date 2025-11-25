import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h1 className="footer-logo">ORM</h1>
          <p className="footer-tagline">OFF-ROAD MUTANTS</p>
          <p className="footer-desc">
            Off-Road Mutants (ORM) isn’t just a brand — it’s a movement. Tough
            gear, tested on the harshest terrains, built for those who never
            stop exploring.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Discover</h3>
            <a href="#">New Arrivals</a>
            <a href="#">Accessories</a>
            <a href="#">Off-Road Kits</a>
            <a href="#">Contact Us</a>
          </div>

          <div className="footer-column">
            <h3>Car Option</h3>
            <a href="#">Kia</a>
            <a href="#">BYD</a>
            <a href="#">Scorpio</a>
            <a href="#">Suzuki Jimny</a>
            <a href="#">Toyota Hilux</a>
          </div>

          <div className="footer-column">
            <h3>Our Policies</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
            <a href="#">Code of Conduct</a>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>© 2025, ORM. All Rights Reserved</p>

        <div className="footer-social">
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
          <FaLinkedin />
        </div>

        <p className="developer">
          Design & Developed by <span>ibraine</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
