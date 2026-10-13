import { useState, useCallback } from 'react';
import { IconChevronLeft, IconChevronRight, IconPlay, IconBookmark, IconHeart } from './Icons';
import { computeBadge } from '../utils/dateBadge';
import { useApp } from '../context/AppContext';
import './Hero.css';

export default function Hero({ titles = [], onSelect }) {
  const { isFavorite, toggleFavorite, t } = useApp();
  const [current, setCurrent] = useState(0);

  const total = titles.length;

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      setCurrent((index + total) % total);
    },
    [total]
  );

  if (!titles || titles.length === 0) {
    return null;
  }

  const slide = titles[current] || titles[0];
  const liked = isFavorite(slide.id);

  // Dynamic badge from releaseDate or default
  const badge = computeBadge(slide.releaseDate, slide.type) || (slide.type === 'series' ? 'Yangi serial' : 'Premyera');
  const slideTitle = slide.name || slide.title;
  const genreText = Array.isArray(slide.genres) ? slide.genres.join(', ') : (slide.genre || '');
  const countText = slide.episodeCount
    ? `${slide.episodeCount} ${t.hero.episodes}`
    : slide.duration
    ? `${slide.duration} ${t.hero.minutes}`
    : '';

  const handleFavoriteClick = () => {
    toggleFavorite(slide.id);
  };

  const handleWatchNow = () => {
    if (onSelect) onSelect(slide);
  };

  return (
    <section className="hero" aria-label="Tavsiya etilgan kontent">
      {/* Background layers with 400ms crossfade */}
      <div className="hero-slides-bg" aria-hidden="true">
        {titles.map((item, index) => (
          <div
            key={item.id}
            className={`hero-bg-layer ${index === current ? 'active' : ''}`}
            style={{
              background:
                item.backdrop ||
                (index % 3 === 0
                  ? 'linear-gradient(135deg, #B0125F 0%, #1A1320 60%)'
                  : index % 3 === 1
                  ? 'linear-gradient(135deg, #6B1D7B 0%, #1A1320 60%)'
                  : 'linear-gradient(135deg, #1B3A6B 0%, #B0125F 50%, #1A1320 100%)'),
            }}
          />
        ))}

        {/* M watermark with subtle parallax (~16px shift per slide) */}
        <div
          className="hero-watermark"
          style={{
            transform: `rotate(-12deg) translateX(${current * -16}px)`,
          }}
          aria-hidden="true"
        >
          M
        </div>

        {/* Film-strip perforation with ultra-slow infinite scroll (~30s loop) */}
        <div className="hero-filmstrip" aria-hidden="true">
          <div className="hero-filmstrip-track">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="hero-filmstrip-hole" />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Progress dots — top left */}
      {total > 1 && (
        <div className="hero-dots" role="tablist" aria-label="Slaydlar">
          {titles.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slayd ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Desktop arrows */}
      {total > 1 && (
        <>
          <button
            className="hero-arrow hero-arrow-prev"
            onClick={() => goTo(current - 1)}
            aria-label="Oldingi slayd"
          >
            <IconChevronLeft size={28} />
          </button>
          <button
            className="hero-arrow hero-arrow-next"
            onClick={() => goTo(current + 1)}
            aria-label="Keyingi slayd"
          >
            <IconChevronRight size={28} />
          </button>
        </>
      )}

      {/* Content with masked title reveal */}
      <div className="hero-content">
        <div key={`meta-${slide.id}`} className="hero-slide-info">
          {badge && <span className="badge badge-glass hero-tag">{badge}</span>}

          <div className="hero-title-mask">
            <h1 className="hero-title">{slideTitle}</h1>
          </div>

          <p className="hero-description">{slide.description}</p>

          <div className="hero-meta">
            {genreText && <span>{genreText}</span>}
            {genreText && <span className="hero-meta-dot">•</span>}
            <span>{slide.year}</span>
            {countText && <span className="hero-meta-dot">•</span>}
            {countText && <span>{countText}</span>}
            {slide.ageRating && <span className="hero-meta-dot">•</span>}
            {slide.ageRating && <span className="hero-age-badge">{slide.ageRating}</span>}
          </div>
        </div>

        <div className="hero-actions">
          <button className="btn btn-primary hero-btn" onClick={handleWatchNow}>
            <IconPlay size={18} />
            {t.hero.watchNow}
          </button>
          <button
            className={`btn btn-glass hero-btn ${liked ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={liked ? t.hero.inFavorites : t.hero.addFavorite}
          >
            <IconHeart size={18} filled={liked} />
            <span className="hero-btn-label">
              {liked ? t.hero.inFavorites : t.hero.addFavorite}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
