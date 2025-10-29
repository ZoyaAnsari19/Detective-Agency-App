import React, { useState } from 'react';
import './styles/header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
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
        <a href="/consultation" className="get-in-touch-button">Get in Touch</a>
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;