import React, { useState, useEffect, useRef } from 'react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef(null);
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

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    const handleResize = () => {
      const newVisibleCards = getVisibleCards();
      setVisibleCards(newVisibleCards);
      
      // Reset to valid index if needed
      const maxIndex = Math.max(0, testimonials.length - newVisibleCards);
      if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    const maxIndex = testimonials.length - visibleCards;
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{
        color: i < rating ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
        fontSize: 'clamp(0.6rem, 1.2vw, 0.9rem)',
      }}>
        ★
      </span>
    ));
  };

  const maxIndex = testimonials.length - visibleCards;
  const cardWidth = visibleCards === 1 ? 100 : visibleCards === 2 ? 50 : 33.333;
  const gap = visibleCards === 1 ? 0 : 1.5;

  return (
    <section id='testimonials' ref={testimonialsRef} style={{
      padding: 'clamp(3rem, 8vw, 6rem) 0',
      position: 'relative',
      overflow: 'hidden',
      background: 'rgba(0, 15, 35, 0.3)',
      width: '100%',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 4vw, 2rem)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          flexDirection: window.innerWidth < 992 ? 'column' : 'row',
          gap: window.innerWidth < 992 ? '1.5rem' : '0',
          alignItems: window.innerWidth < 992 ? 'flex-start' : 'flex-end',
        }}>
          <div>
            <span style={{
              color: 'var(--secondary-color, #00BFFF)',
              fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05rem',
              display: 'block',
              marginBottom: '1rem',
            }}>
              CLIENT FEEDBACK
            </span>
            <h2 style={{
              color: 'var(--text-color, #fff)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.3,
            }}>
              What Our Clients Say About Us
            </h2>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.8rem',
            background: 'rgba(10, 25, 47, 0.8)',
            padding: '0.6rem 0.8rem',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            alignSelf: window.innerWidth < 992 ? 'flex-end' : 'center',
          }}>
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              style={{
                width: 'clamp(2.4rem, 4.5vw, 3rem)',
                height: 'clamp(2.4rem, 4.5vw, 3rem)',
                background: currentIndex === 0 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentIndex === 0 ? 0.4 : 1,
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              }}
            >
              ←
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              style={{
                width: 'clamp(2.4rem, 4.5vw, 3rem)',
                height: 'clamp(2.4rem, 4.5vw, 3rem)',
                background: currentIndex >= maxIndex ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                cursor: currentIndex >= maxIndex ? 'not-allowed' : 'pointer',
                opacity: currentIndex >= maxIndex ? 0.4 : 1,
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              }}
            >
              →
            </button>
          </div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div
            ref={sliderRef}
            style={{
              display: 'flex',
              gap: `${gap}rem`,
              transform: `translateX(-${currentIndex * (cardWidth + (gap * 100 / cardWidth))}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  flex: `0 0 calc(${cardWidth}% - ${gap * (visibleCards - 1) / visibleCards}rem)`,
                  minWidth: `calc(${cardWidth}% - ${gap * (visibleCards - 1) / visibleCards}rem)`,
                }}
              >
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.5rem',
                  padding: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  position: 'relative',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{
                      width: 'clamp(2rem, 5vw, 3rem)',
                      height: 'clamp(2rem, 5vw, 3rem)',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                    }}>
                      {testimonial.icon}
                    </div>
                    <div style={{ display: 'flex', gap: '0.2rem' }}>
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <div style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: 'rgba(255, 255, 255, 0.1)',
                    position: 'absolute',
                    top: '0.5rem',
                    right: '1rem',
                    fontFamily: 'Georgia, serif',
                  }}>
                    "
                  </div>

                  <p style={{
                    color: 'var(--text-color, #fff)',
                    fontSize: 'clamp(0.75rem, 1.3vw, 0.95rem)',
                    lineHeight: 1.6,
                    margin: 0,
                    flex: 1,
                  }}>
                    {testimonial.quote}
                  </p>

                  <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '0.8rem',
                  }}>
                    <h4 style={{
                      fontWeight: 700,
                      color: 'var(--text-color, #fff)',
                      fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)',
                      margin: '0 0 0.2rem 0',
                    }}>
                      {testimonial.author}
                    </h4>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
                      margin: 0,
                    }}>
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
