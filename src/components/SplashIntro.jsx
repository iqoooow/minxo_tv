import { useState, useEffect } from 'react';
import './SplashIntro.css';

export default function SplashIntro() {
  const [shouldRender, setShouldRender] = useState(() => {
    // Check if user already saw the signature intro in this session
    if (typeof window === 'undefined') return false;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return false;
    return !sessionStorage.getItem('minxo_splash_seen');
  });

  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!shouldRender) return;

    // After ~800ms stroke animation finishes, initiate fade out (200ms)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 800);

    // Completely remove splash overlay after 1000ms max
    const removeTimer = setTimeout(() => {
      sessionStorage.setItem('minxo_splash_seen', 'true');
      setShouldRender(false);
    }, 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [shouldRender]);

  const handleSkip = () => {
    sessionStorage.setItem('minxo_splash_seen', 'true');
    setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`splash-overlay ${isFadingOut ? 'fade-out' : ''}`}
      onClick={handleSkip}
      role="presentation"
      aria-hidden="true"
    >
      <div className="splash-card">
        <svg
          className="splash-svg"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7AC0" />
              <stop offset="50%" stopColor="#FF1F8E" />
              <stop offset="100%" stopColor="#B0125F" />
            </linearGradient>
            <filter id="splashGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Dynamic Brush-style M curve */}
          <path
            className="splash-m-path"
            d="M 52 178 C 42 152 46 95 68 62 C 82 42 98 48 106 78 C 114 110 120 148 130 172 C 140 134 154 74 170 56 C 184 42 198 56 190 92 C 178 132 166 164 170 178"
            stroke="url(#brushGradient)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#splashGlow)"
          />
        </svg>

        <span className="splash-tagline">O'zbekcha sifatli kontent!</span>
      </div>
    </div>
  );
}
