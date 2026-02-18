import { useState, useEffect, useRef } from 'react';

const stats = [
  { number: '15+', label: 'Years Dental Experience' },
  { number: '10,000+', label: 'Patients Treated' },
  { number: '7,200+', label: 'Root Canals Treated' },
  { number: '1,000+', label: 'Braces And Aligner Treated' },
];

// Parse "10,000+" -> { value: 10000, suffix: '+' }
function parseStat(str) {
  const match = String(str).match(/^([\d,]+)(.*)$/);
  if (!match) return { value: 0, suffix: '' };
  return { value: parseInt(match[1].replace(/,/g, ''), 10), suffix: match[2] || '' };
}

function formatNum(n) {
  return n.toLocaleString();
}

function useCountUp(end, suffix, isVisible, duration = 2000) {
  const [display, setDisplay] = useState('0' + suffix);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(end * eased);
      setDisplay(formatNum(current) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [end, suffix, isVisible, duration]);

  return display;
}

function StatItem({ stat, isVisible }) {
  const { value, suffix } = parseStat(stat.number);
  const display = useCountUp(value, suffix, isVisible);
  return (
    <div className="stat-item">
      <span className="stat-number">{display}</span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="section stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <StatItem key={i} stat={s} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
