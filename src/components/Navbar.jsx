import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand" onClick={closeMenu}>
                        <span className="brand-text">Vertex Automobiles</span>
                    </Link>

                    <button
                        className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                        <Link
                            to="/"
                            className={`navbar-link ${isActive('/')}`}
                            onClick={closeMenu}
                        >
                            Home
                        </Link>
                        <Link
                            to="/stock"
                            className={`navbar-link ${isActive('/stock')}`}
                            onClick={closeMenu}
                        >
                            Stock
                        </Link>
                        <Link
                            to="/import-process"
                            className={`navbar-link ${isActive('/import-process')}`}
                            onClick={closeMenu}
                        >
                            Import Process
                        </Link>
                        <Link
                            to="/about"
                            className={`navbar-link ${isActive('/about')}`}
                            onClick={closeMenu}
                        >
                            About Us
                        </Link>
                        <Link
                            to="/contact"
                            className={`navbar-link ${isActive('/contact')}`}
                            onClick={closeMenu}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
