
import './styles/investigaion.css'

const Investigation = () => {
  return (
    <section className="cta-section" id='investigation'>
      <img src='/img/investigation.png' alt="Investigation background" className="cta-bg-image" />
      <div className="cta-overlay"></div>

      <div className="cta-content">
        <div className="cta-image-section">
          <img src='/img/investigation.png' alt="Professional Investigation Services" />
        </div>

        <div className="cta-text">
          <h2 className="cta-title">Discover Clarity with Our Investigation Services</h2>
          <p className="cta-description">
            Nakshatra Detective offers confidential and professional investigation
            services across Mumbai, Pune, and major Indian cities. Our ethical approach
            ensures trusted solutions for personal and corporate needs.
          </p>
          <button onClick={() => alert('Request accept successfully')} className="cta-button">
            <i className="fas fa-comments"></i>
            Request a Confidential Consultation
          </button>
        </div>
      </div>
    </section>
  )
}

export default Investigation;