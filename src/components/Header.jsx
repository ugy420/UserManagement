import React, { useState } from 'react';
import './header.css'; // Import the CSS file

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <img src="logo.png" alt="Logo" />
                    <h1>My Website</h1>
                </div>
                <nav className={`header-nav ${menuOpen ? 'active' : ''}`}>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <button className="menu-icon" onClick={toggleMenu}>
                    {menuOpen ? '✖' : '☰'}
                </button>
            </div>
        </header>
    );
};

export default Header;
