import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = '/api';
const DEFAULT_SLIDE = {
  subtitle: 'YOUR SMILE IS OUR PRIDE',
  title: 'Lagankhel Dental Clinic',
  tagline: 'Best Dental Clinic in Lalitpur',
  background_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920',
  overlay_opacity: 0.5,
  text_position: 'center',
  btn1_text: 'Book Appointment',
  btn2_text: 'Learn More',
  btn2_link: '/about'
};

export default function Hero({ onBookClick }) {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/hero.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.slides?.length) setSlides(data.slides);
        else setSlides([DEFAULT_SLIDE]);
      })
      .catch(() => setSlides([DEFAULT_SLIDE]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setCurrentIndex(i => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[currentIndex] || DEFAULT_SLIDE;
  const opacity = Number(slide.overlay_opacity) || 0.5;
  const position = slide.text_position || 'center';

  if (loading) return <section className="hero hero-loading"><div className="hero-skeleton" /></section>;

  return (
    <section className={`hero hero--${position}`}>
      <div 
        className="hero-bg hero-bg-slides"
        style={{ 
          backgroundImage: `url(${slide.background_image})`,
          opacity: slides.length > 1 ? 1 : undefined
        }}
      >
        {slides.map((s, i) => (
          <div
            key={s.id || i}
            className={`hero-bg-slide ${i === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.background_image})` }}
          />
        ))}
      </div>
      <div 
        className="hero-overlay" 
        style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
      />
      <div className="hero-content-wrapper">
        <div className="hero-content hero-animate">
          <p className="hero-subtitle hero-animate-item" style={{ animationDelay: '0.1s' }}>
            {slide.subtitle}
          </p>
          <h1 className="hero-title hero-animate-item" style={{ animationDelay: '0.25s' }}>
            {slide.title}
          </h1>
          <p className="hero-tagline hero-animate-item" style={{ animationDelay: '0.4s' }}>
            {slide.tagline}
          </p>
          <div className="hero-btns hero-animate-item" style={{ animationDelay: '0.55s' }}>
            <button className="btn-primary btn-lg" onClick={onBookClick}>
              {slide.btn1_text}
            </button>
            <Link to={slide.btn2_link || '/about'} className="btn-outline btn-lg hero-btn-outline">
              {slide.btn2_text}
            </Link>
          </div>
        </div>
      </div>
      {slides.length > 1 && (
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
