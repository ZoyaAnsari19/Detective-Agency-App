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
              <a href="#personal" onClick={closeMobileMenu}>Personal</a>
            </li>
            <li className="nav-item">
              <a href="#corporate" onClick={closeMobileMenu}>Corporate</a>
            </li>
            <li className="nav-item">
              <a href="#matrimonial" onClick={closeMobileMenu}>Matrimonial</a>
            </li>
            <li className="nav-item">
              <a href="#investigation" onClick={closeMobileMenu}>Contact Us</a>
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