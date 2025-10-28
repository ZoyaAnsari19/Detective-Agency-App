import { Link } from 'react-router-dom'
import investigationImg from '../assets/img/investigation.png'
import './styles/investigaion.css'

const Investigation = () => {
  return (
    <section className="cta-section" id='investigation'>
      <img src={investigationImg} alt="Investigation background" className="cta-bg-image" />
      <div className="cta-overlay"></div>
      
      <div className="cta-content">
        {/* LEFT COLUMN - Text, Button & Cards */}
        <div className="cta-text">
          <h2 className="cta-title">
            Discover Clarity with Our Investigation Services
          </h2>
          <p className="cta-description">
            Nakshatra Detective offers confidential and professional investigation 
            services across Mumbai, Pune, and major Indian cities. Our ethical approach 
            ensures trusted solutions for personal and corporate needs.
          </p>
          <Link to="/consultation" className="cta-button">
            <i className="fas fa-comments"></i>
            Request a Confidential Consultation
          </Link>

          <div className="cta-contact-cards">
            <div className="contact-card">
              <div className="card-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="card-content">
                <h3>Call Us Anytime</h3>
                <a href="tel:+917400473076" className="contact-link">
                  +91 7400473076
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="card-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="card-content">
                <h3>Email Us Today</h3>
                <a href="mailto:nakshatradetectives@gmail.com" className="contact-link">
                  nakshatradetectives@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Image (Like About Section) */}
        <div className="cta-image-section">
          <img src={investigationImg} alt="Professional Investigation Services" />
        </div>
      </div>
    </section>
  )
}

export default Investigation;
