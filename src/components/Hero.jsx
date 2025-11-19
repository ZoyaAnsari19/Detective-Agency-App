import React, { useEffect, useRef } from 'react';
import './styles/hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const createParticles = () => {
      if (!heroRef.current) return;
      
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        heroRef.current.appendChild(particle);
      }
    };
    
    createParticles();
    
    // Cleanup function
    return () => {
      if (heroRef.current) {
        const particles = heroRef.current.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
      }
    };
  }, []);
  
  return (
    <section className="hero" ref={heroRef} id='home'>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="left">
          <div className="hero-text">
            <p className="welcome-text">
              Welcome To <span className="highlight">Nakshatra Detective</span> Services
            </p>
            <h1><span className="no-wrap">Trusted Private</span> Investigaions Across India</h1>
            <p className="hero-subtext">
              Providing confidential and professional investigation services in Mumbai, Pune, and major Indian cities. From matrimonial inquiries to corporate investigations, we deliver clarity with integrity.
            </p>
            <div className="hero-cta">
              <a href="#services" className="btn btn-primary">
                <span>Find Our Services</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#about" className="btn btn-secondary">
                <span>Read More</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="right">
          <div className="image-grid">
            <div className="image-card image-card-1">
              <img src="/img/img1.png" alt="Detective in rain" />
            </div>
            <div className="image-card image-card-2">
              <img src="/img/img2.png" alt="Investigation tools" />
            </div>
            <div className="image-card image-card-3">
              <img src="/img/img3.png" alt="Female detective" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;