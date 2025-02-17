import { useState } from 'react';
import govtech from '../../assets/govtech.png';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
    const token = localStorage.getItem('token');
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

   
    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    
    const handleLinkClick = () => {
        setMenuOpen(false); 
    };

    function handleLogin(){
        navigate('/');
    }

    function handleLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <header className="header">  
            <div className="header-container">
                <div className="header-logo">
                    <img src={govtech} alt="Logo" />
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
                        {token?(<li>
                            <Link
                                to="/profile"
                                className={location.pathname === '/profile' ? 'active' : ''}
                                onClick={handleLinkClick}
                            >
                                Profile
                            </Link>
                        </li>):null}
                        {!token?<li>
                            <Link onClick={handleLogin}>
                                Login
                            </Link>
                        </li>:<li>
                            <Link
                                onClick={handleLogout}
                            >
                                Logout
                            </Link>
                        </li>}
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