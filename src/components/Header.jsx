import React, { useState } from 'react';
import './styles/header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openSignIn = () => {
    setIsSignInOpen(true);
  };

  const closeSignIn = () => {
    setIsSignInOpen(false);
  };

  const handleSignIn = () => {
    setIsSignInOpen(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <>
    <header className="header">
      <div className="header-content">
        <a href="/" className="header-logo">
          <div className="logo-blur"></div>
          <span>Nakshatra Detective</span>
        </a>
        <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" onClick={closeMobileMenu}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#about" onClick={closeMobileMenu}>About Us</a>
            </li>
            <li className="nav-item">
              <a href="#services" onClick={closeMobileMenu}>Services</a>
            </li>
            <li className="nav-item">
              <a href="#description" onClick={closeMobileMenu}>Description</a>
            </li>
            <li className="nav-item">
              <a href="#process" onClick={closeMobileMenu}>Process</a>
            </li>
            <li className="nav-item">
              <a href="#testimonials" onClick={closeMobileMenu}>Client Feedback</a>
            </li>
          </ul>
        </nav>
        <button className="sign-in-button" onClick={openSignIn} >Get in Touch</button>
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>
    </header>

    {isSignInOpen && (
        <div className="modal-overlay" onClick={closeSignIn}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeSignIn}>×</button>
            <h2>Sign In</h2>
            <div className="modal-form">
              <div className="form-field">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" />
              </div>
              <button className="modal-submit" onClick={handleSignIn}>Sign In</button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="success-popup">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h3>Successfully Signed In!</h3>
            <p>Welcome back to Nakshatra Detective</p>
          </div>
        </div>
      )}

    </>
  );
};

export default Header;