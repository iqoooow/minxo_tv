import { useState, useEffect, useRef } from 'react';
import { thumbGradients } from '../data';
import { IconPlay } from './Icons';
import { useApp } from '../context/AppContext';
import './ContinueWatching.css';

function ContinueWatchingCard({ item, onSelect }) {
  const cardRef = useRef(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    if (onSelect) onSelect(item);
  };

  return (
    <article
      ref={cardRef}
      className="cw-card"
      tabIndex={0}
      role="button"
      onClick={handleClick}
      aria-label={`${item.title}, ${item.episode}, ${item.timeLeft}`}
    >
      {/* Thumbnail */}
      <div className="cw-thumb">
        <div
          className="cw-thumb-bg"
          style={{ background: thumbGradients[(item.gradientIndex || 0) % thumbGradients.length] }}
        >
          <span className="cw-thumb-watermark" aria-hidden="true">M</span>
        </div>

        {/* Play button */}
        <button className="cw-play" aria-label={`${item.title} — davom ettirish`}>
          <IconPlay size={20} />
        </button>

        {/* Progress bar — fills from left once when entering view */}
        <div className="cw-progress-track">
          <div
            className="cw-progress-bar"
            style={{ width: hasEnteredView ? `${item.progress}%` : '0%' }}
            role="progressbar"
            aria-valuenow={item.progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`${item.progress}% ko'rildi`}
          />
        </div>
      </div>

      {/* Info */}
      <div className="cw-info">
        <p className="cw-title">{item.title}</p>
        <p className="cw-meta">
          {item.episode} · {item.timeLeft}
        </p>
      </div>
    </article>
  );
}

export default function ContinueWatching({ items = [], onSelect }) {
  const { t } = useApp();

  // Hidden when empty
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="section" aria-label={t.sections.continueWatching}>
      <div className="section-header">
        <h2 className="section-title">{t.sections.continueWatching}</h2>
      </div>

      <div className="scroll-rail">
        {items.map((item) => (
          <ContinueWatchingCard key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
