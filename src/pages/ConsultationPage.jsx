import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ConsultationPage.css'

const ConsultationPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Form validation
    if (!formData.name || !formData.phone || !formData.subject || !formData.message) {
      alert('Please fill all fields!')
      return
    }

    console.log('Form Data Submitted:', formData)
    alert('Consultation request submitted successfully! We will contact you within 24 hours.')
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    // Navigate back to home after 2 seconds
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className="consultation-page">
      {/* Back Buttons */}

      <button className="back-button" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i> Back to Home
      </button>

      <div className="page-container">
        <div className="consultation-wrapper">
          <div className="consultation-container">
            <div className="form-header">
              <div className="header-label">
                <span className="label-line"></span>
                <span className="label-text">GET IN TOUCH</span>
              </div>
              <h1 className="form-title">
                Request a<br />
                Confidential<br />
                Consultation
              </h1>
              <p className="form-subtitle">
                Fill out the form below and our expert team will get back to you within 24 hours. 
                All information is kept strictly confidential.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="consultation-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="fas fa-user"></i> Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <i className="fas fa-phone"></i> Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  <i className="fas fa-tag"></i> Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select Service Type</option>
                  <option value="matrimonial">Matrimonial Investigation</option>
                  <option value="corporate">Corporate Investigation</option>
                  <option value="background">Background Verification</option>
                  <option value="surveillance">Surveillance Services</option>
                  <option value="cybercrime">Cyber Crime Investigation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <i className="fas fa-comment-alt"></i> Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide details about your case. Rest assured, all information will be kept confidential."
                  rows="6"
                  className="form-textarea"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                <i className="fas fa-paper-plane"></i>
                Request Consultation
              </button>

              <div className="privacy-note">
                <i className="fas fa-lock"></i>
                <p>Your information is completely confidential and secure. We follow strict privacy protocols.</p>
              </div>
            </form>

            <div className="contact-info-box">
              <h3>Need Immediate Assistance?</h3>
              <div className="quick-contact">
                <div className="contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <span>+91 74004 73076</span>
                </div>
                <div className="contact-item">
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp Available</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Mumbai | Pune | Delhi | Bangalore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultationPage