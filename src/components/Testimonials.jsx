import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './styles/testimonials.css';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const testimonialsRef = useRef(null);
  const observerRef = useRef(null);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      quote: "Nakshatra Detective handled our corporate fraud case in Mumbai with utmost professionalism and discretion. Their thorough investigation provided the clarity we needed to protect our business.",
      author: "RAHUL SHARMA",
      designation: "Business Owner",
      rating: 5,
      icon: "💼",
    },
    {
      quote: "The team at Nakshatra Detective conducted a matrimonial inquiry in Pune with complete confidentiality. Their ethical approach gave me peace of mind during a sensitive time.",
      author: "PRIYA PATEL",
      designation: "Homemaker",
      rating: 5,
      icon: "👰",
    },
    {
      quote: "Nakshatra Detective's professional team in Delhi helped locate a missing family member. Their legal and discreet methods delivered results we could trust.",
      author: "VIKRAM SINGH",
      designation: "Teacher",
      rating: 5,
      icon: "👨‍🏫",
    },
    {
      quote: "Their background verification services were thorough and reliable. The detailed report helped us make an informed business decision.",
      author: "SUNITA DESAI",
      designation: "HR Manager",
      rating: 5,
      icon: "👩‍💼",
    },
    {
      quote: "Professional, discreet, and efficient. Nakshatra Detective exceeded our expectations in handling a sensitive corporate investigation.",
      author: "ARJUN MALHOTRA",
      designation: "CEO",
      rating: 5,
      icon: "🎯",
    },
    {
      quote: "Their investigative skills and attention to detail are exceptional. Highly recommend their services for any investigation needs.",
      author: "KAVITA REDDY",
      designation: "Lawyer",
      rating: 5,
      icon: "⚖️",
    },
  ];

  useEffect(() => {
    // IntersectionObserver for fade-in effect
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (testimonialsRef.current) {
      observerRef.current.observe(testimonialsRef.current);
    }

    // GSAP animation for slider navigation
    const slides = sliderRef.current?.querySelectorAll('.slider-item');
    const prevButton = testimonialsRef.current?.querySelector('.slick-prev');
    const nextButton = testimonialsRef.current?.querySelector('.slick-next');

    if (slides && slides.length > 0) {
      let currentIndex = 0;
      const totalSlides = testimonials.length;
      const visibleSlides = 3; // Show 3 cards at a time on all screens

      // Calculate slide width (including margin)
      const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight || 0);

      // Set initial position
      gsap.set(sliderRef.current, { x: 0 });

      // Update button states
      const updateButtonStates = () => {
        if (prevButton) {
          prevButton.disabled = currentIndex <= 0;
        }
        if (nextButton) {
          nextButton.disabled = currentIndex >= totalSlides - visibleSlides;
        }
      };

      const goToPrev = () => {
        if (currentIndex > 0) {
          currentIndex -= 1; // Swipe one card at a time
          const offset = -currentIndex * slideWidth;
          gsap.to(sliderRef.current, {
            x: offset,
            duration: 0.5,
            ease: 'power1.inOut',
            onComplete: updateButtonStates,
          });
        }
      };

      const goToNext = () => {
        if (currentIndex < totalSlides - visibleSlides) {
          currentIndex += 1; // Swipe one card at a time
          const offset = -currentIndex * slideWidth;
          gsap.to(sliderRef.current, {
            x: offset,
            duration: 0.5,
            ease: 'power1.inOut',
            onComplete: updateButtonStates,
          });
        }
      };

      // Initial button state
      updateButtonStates();

      prevButton?.addEventListener('click', goToPrev);
      nextButton?.addEventListener('click', goToNext);

      // Update slide width and position on window resize
      const handleResize = () => {
        const newSlideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight || 0);
        
        // Adjust currentIndex if out of bounds
        if (currentIndex > totalSlides - visibleSlides) {
          currentIndex = Math.max(0, totalSlides - visibleSlides);
        }

        // Update position
        gsap.set(sliderRef.current, { x: -currentIndex * newSlideWidth });
        updateButtonStates();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        prevButton?.removeEventListener('click', goToPrev);
        nextButton?.removeEventListener('click', goToNext);
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };
  
  // jsx structure
  return (
    <section className="testimonials" id="testimonials" ref={testimonialsRef}>
      <div className="container">
        <div className="testimonials-header-wrapper">
          <div className="testimonials-header">
            <span className="testimonials-tag">
              CLIENT FEEDBACK
            </span>
            <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>
              What Our Clients Say About Us
            </h2>
          </div>

          <div className="slider-controls">
            <div className="testimonial-slider-arrows">
              <button className="slick-prev" aria-label="Previous testimonial">
                ←
              </button>
              <button className="slick-next" aria-label="Next testimonial">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="testimonial-slider-home-1">
          <div className="slider-list">
            <div className="slider-track" ref={sliderRef}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`slider-item ${isVisible ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="testimonial-card">
                    <div className="card-header">
                      <div className="user-icon">
                        <span className="icon-emoji">{testimonial.icon}</span>
                      </div>
                      <div className="rating">{renderStars(testimonial.rating)}</div>
                    </div>

                    <div className="quote-mark">"</div>

                    <div className="card-content">
                      <p className="testimonial-text">{testimonial.quote}</p>
                    </div>

                    <div className="card-footer">
                      <h4 className="author-name">{testimonial.author}</h4>
                      <p className="author-designation">{testimonial.designation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;