import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change color after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        isScrolled ? 'navbar-scrolled' : 'navbar-default'
      }`}
    >
      <div className="navbar-container">
        {/* Left Section - Brand */}
        <div className="nav-left">
          <Link className="navbar-brand" to="/">
            Roommate Finder
          </Link>
        </div>

        {/* Center Section - About Us */}
        <div className="nav-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to="/help">
                  Help
                </Link>
              </li>
          </ul>
        </div>

        {/* Right Section - Auth Links */}
        <div className="nav-right">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;