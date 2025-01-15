import { useState } from 'react';
import './Header.css';
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('about');

    // Toggle the menu open/close
    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    // Handle link clicks and close the menu on mobile
    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        setMenuOpen(false); // Close the menu after selecting a link
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
                        <li>
                            <a
                                href="#about"
                                className={activeLink === 'about' ? 'active' : ''}
                                onClick={() => handleLinkClick('about')}
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#services"
                                className={activeLink === 'services' ? 'active' : ''}
                                onClick={() => handleLinkClick('services')}
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className={activeLink === 'contact' ? 'active' : ''}
                                onClick={() => handleLinkClick('contact')}
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <a
                                href="#profile"
                                className={activeLink === 'Profile' ? 'active' : ''}
                                onClick={() => handleLinkClick('Profile')}
                            >
                                Profile
                            </a>
                        </li>
                    </ul>
                </nav>
                <button
                    className="menu-icon"
                    onClick={toggleMenu}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    {menuOpen ? '✖' : '☰'}
                </button>
            </div>
        </header>
    );
};

export default Header;
