import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Toggle the menu open/close
    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    // Handle link clicks and close the menu on mobile
    const handleLinkClick = () => {
        setMenuOpen(false); // Close the menu after selecting a link
    };

    function handleLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

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
                            <Link
                                to="/about"
                                className={location.pathname === '/about' ? 'active' : ''}
                                onClick={handleLinkClick}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={location.pathname === '/contact' ? 'active' : ''}
                                onClick={handleLinkClick}
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                className={location.pathname === '/profile' ? 'active' : ''}
                                onClick={handleLinkClick}
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={handleLogout}
                            >
                                Logout
                            </Link>
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