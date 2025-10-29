import { useState, useEffect, useRef } from 'react';
import './styles/stats.css';

const Stats = () => {
  const [counters, setCounters] = useState({
    experience: 0,
    success: 0,
    satisfaction: 0
  });
  
  const statsRef = useRef(null);
  const observerRef = useRef(null);
  
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setCounters({
          experience: Math.floor(progress * 10),
          success: Math.floor(progress * 95),
          satisfaction: (progress * 4.7).toFixed(1)
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (statsRef.current) {
      observerRef.current.observe(statsRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  const statsData = [
    {
      value: counters.experience,
      label: 'Years Experience',
      suffix: '+'
    },
    {
      value: counters.success,
      label: 'Successful Cases',
      suffix: '%'
    },
    {
      value: counters.satisfaction,
      label: 'Client Satisfaction',
      suffix: '/5'
    }
  ];
  
  return (
    <section className="stats" ref={statsRef}>
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-value">
                {stat.value}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;