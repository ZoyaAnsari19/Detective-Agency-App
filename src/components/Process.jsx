import { useState, useEffect, useRef } from 'react';
import './styles/process.css';

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
  const processRef = useRef(null);
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
      { threshold: 0.2 }
    );
    
    if (processRef.current) {
      observerRef.current.observe(processRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  const steps = [
    {
      number: '1',
      title: 'Initial Consultation',
      description: 'We discuss your case requirements and objectives to develop a tailored investigation strategy.'
    },
    {
      number: '2',
      title: 'Case Assessment',
      description: 'Our team conducts a thorough evaluation of available information and resources needed.'
    },
    {
      number: '3',
      title: 'Investigation',
      description: 'We execute the investigation using proven techniques and advanced technology tools.'
    },
    {
      number: '4',
      title: 'Report & Delivery',
      description: 'We compile a comprehensive report with findings and present actionable intelligence.'
    }
  ];
  
  return (
    <section className="process" ref={processRef} id='process'>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>
          How Our Investigations Work
        </h2>
        
        <div className="process-timeline">
          {steps.map((step, index) => (
            <div 
              className={`process-step ${isVisible ? 'active' : ''}`} 
              key={index}
              style={{animationDelay: `${index * 0.3}s`}}
            >
              <div className="step-icon">
                <span>{step.number}</span>
              </div>
              <div 
                className="step-content"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty('--glow-x', `${x}%`);
                  e.currentTarget.style.setProperty('--glow-y', `${y}%`);
                  e.currentTarget.style.setProperty('--glow-intensity', '1');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--glow-intensity', '0');
                }}
              >
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-line"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;