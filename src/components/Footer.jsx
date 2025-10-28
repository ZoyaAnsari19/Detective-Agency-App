import { Link } from 'react-router-dom';
import './styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h2>Nakshatra Detectives</h2>
            <p>
              Nakshatra Detectives provides confidential and professional investigation services across Mumbai, Pune, and major Indian cities. Our ethical approach ensures trusted solutions for personal and corporate needs.
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/privacy">Our Privacy</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/private-investigation">Private Investigation</Link></li>
              <li><Link to="/corporate-investigations">Corporate Investigations</Link></li>
              <li><Link to="/matrimonial-inquiries">Matrimonial Inquiries</Link></li>
              <li><Link to="/missing-person">Missing Person</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Office Location</h3>
            <div className="map-container">
              <a href="https://www.google.com/maps?ll=19.125581,72.856577&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=11251639628179170974" target="_blank" rel="noopener noreferrer">
                <img 
                  src="src/assets/img/map.png" 
                  alt="Office Location Map" 
                  className="map-image" 
                />
                <span className="view-link">View</span>
              </a>
              <p>Holy Name Krishna, Veg Delight, Jijamata C-Wing, Pump House Subway, Mumbai</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Nakshatra Detectives | All Rights Reserved</p>
          <Link to="/privacy-policy" className="privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;