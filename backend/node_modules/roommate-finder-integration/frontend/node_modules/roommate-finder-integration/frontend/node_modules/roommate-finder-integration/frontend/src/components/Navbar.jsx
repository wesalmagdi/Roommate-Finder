import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from "../context/AuthContext";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
   const { user, logout } = useContext(AuthContext);


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
            <li className='nav-item'>
              <Link className='nav-link' to="/" state={{ reset: true }}>
                Home
              </Link>
            </li>
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
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link-login" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link-register" to="/register">Register</Link>
                </li>
              </>
            ) : (
              
                <li className="nav-item dropdown">
                  <button
          className="profile-btn"
          data-bs-toggle="dropdown"
          style={{ background: "none", border: "none" }}
        >
          <img
            src="/src/assets/userIcon.svg"
            alt="Profile"
            className="profile-icon"
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />
        </button>
          <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <Link className="dropdown-item" to="/profile">Profile</Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}>
              Logout
            </button>
          </li>
          </ul>
                </li>
              
            )}
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