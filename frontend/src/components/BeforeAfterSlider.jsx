import { useState, useRef, useCallback } from 'react';

export default function BeforeAfterSlider({ beforeImage, afterImage, title }) {
  const [position, setPosition] = useState(50); // 0-100, % from left
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleMove(e.clientX);
    const onMouseMove = (ev) => handleMove(ev.clientX);
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleTouchStart = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="before-after-card">
      <div className="ba-labels">
        <span className="ba-label ba-label-before">Before</span>
        <span className="ba-label ba-label-after">After</span>
      </div>
      <div
        ref={containerRef}
        className="before-after-slider"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="ba-before" style={{ backgroundImage: `url(${beforeImage})` }} aria-label="Before" />
        <div
          className="ba-after"
          style={{
            backgroundImage: `url(${afterImage})`,
            clipPath: `inset(0 ${100 - position}% 0 0)`
          }}
          aria-label="After"
        />
      <div
        className="ba-handle"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="ba-handle-line" />
        <div className="ba-handle-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      </div>
      {title && <p className="ba-title">{title}</p>}
    </div>
  );
}
