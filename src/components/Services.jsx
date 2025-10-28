import { useState, useEffect, useRef } from 'react';
import './styles/services.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const servicesRef = useRef(null);
  const observerRef = useRef(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (servicesRef.current) {
      observerRef.current.observe(servicesRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  const servicesData = [
    {
      icon: '⚖️',
      title: 'Private Investigation',
      description: 'Confidential inquiries to uncover facts for personal matters, conducted with integrity and full compliance with Indian laws.'
    },
    {
      icon: '💼',
      title: 'Corporate Investigations',
      description: 'Discreet investigations for businesses, including due diligence and fraud detection, to safeguard your interests.'
    },
    {
      icon: '💑',
      title: 'Matrimonial Inquiries',
      description: 'Ethical inquiries to provide clarity in pre- or post-marital matters, respecting privacy and legal standards.'
    },
    {
      icon: '🔍',
      title: 'Missing Persons',
      description: 'Professional assistance to locate missing individuals, conducted legally with respect for privacy.'
    }
  ];
  
  return (
    <section className="services" id="services" ref={servicesRef}>
      <div className="container">
        <div className="services-header">
          <div className="services-header-left">
            <span className="services-tag">OUR EXPERTISE</span>
            <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>
              Providing Trusted Investigation Solutions
            </h2>
          </div>
          <div className="services-header-right">
            <p className={`fade-in ${isVisible ? 'visible' : ''}`}>
              Nakshatra Detective delivers professional and confidential investigation services across Mumbai, Pune, and major Indian cities. Our licensed team ensures ethical, legal, and discreet solutions for personal and corporate needs.
            </p>
            <button className="btn view-all-btn">View All Services →</button>
          </div>
        </div>
        
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div 
              className={`service-card ${isVisible ? 'fade-in' : ''}`} 
              key={index}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#" className="read-more-link">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;