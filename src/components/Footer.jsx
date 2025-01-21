import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We are dedicated to providing the best solutions for your needs.
            Contact us for more information.
          </p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={20} className="facebook-icon" /> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={20} className="twitter-icon" /> Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} className="instagram-icon" /> Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GovTech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
