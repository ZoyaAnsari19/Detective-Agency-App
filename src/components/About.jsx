import { useState, useEffect, useRef } from 'react';
import './styles/about.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // 👁️ Intersection Observer for Fade-in Animation
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (observerRef.current) observerRef.current.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) observerRef.current.observe(aboutRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // 💡 Spotlight Mouse Move Effect
    const cards = document.querySelectorAll('.top-card');
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, card));
      });
    };
  }, []);

  const topCards = [
    {
      title: 'Total Cases',
      value: '1200+',
      desc: 'Comprehensive investigations conducted with accuracy and confidentiality.',
    },
    {
      title: 'Cases Solved',
      value: '1100+',
      desc: 'Proven record of successful case resolutions with discretion.',
    },
    {
      title: 'Active Cases',
      value: '50+',
      desc: 'Currently ongoing investigations handled by expert teams.',
    },
  ];

  const statsData = [
    { icon: '🔍', value: '10+', label: 'Years Experience' },
    { icon: '✅', value: '95%', label: 'Success Rate' },
    { icon: '👥', value: '500+', label: 'Cases Solved' },
    { icon: '⭐', value: '4.9', label: 'Client Rating' },
  ];

  return (
    <section className="about" id="about" ref={aboutRef}>
      <div className="container">

        {/* 🌟 Top 3 Cards */}
        <div className="top-cards">
          {topCards.map((card, index) => (
            <div key={index} className="top-card">
              <div className="top-card-header">
                <h3>{card.title}</h3>
                <span className="top-card-value">{card.value}</span>
              </div>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* 🌐 About Section */}
        <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>
          Delivering Trusted Investigation Services
        </h2>

        <div className="about-content">
          <div className={`about-text ${isVisible ? 'fade-in' : ''}`}>
            <p>
              Founded in Mumbai, Nakshatra Detectives has established itself as one of the most
              trusted private investigation agencies in India. With over a decade of experience,
              our team of expert investigators combines cutting-edge technology with traditional
              detective work to deliver results that matter.
            </p>
            <p>
              Our commitment to discretion, professionalism, and ethical practices has earned us
              the trust of clients across various sectors including individuals, legal firms,
              corporations, and government agencies.
            </p>

            {/* 📊 Stats Badges */}
            <div className="about-stats">
              {statsData.map((stat, index) => (
                <div className="stat-badge" key={index}>
                  <span className="stat-icon">{stat.icon}</span>
                  <div className="stat-info">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🖼️ Right Image */}
          <div className={`about-image ${isVisible ? 'fade-in' : ''}`}>
            <img
              src="src/assets/img/img4.png"
              alt="Missing Person Poster"
              className="missing-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
