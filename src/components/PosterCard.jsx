import { useState } from 'react';
import { posterGradients } from '../data';
import { IconHeart } from './Icons';
import { computeBadge } from '../utils/dateBadge';
import { useApp } from '../context/AppContext';
import './PosterCard.css';

export default function PosterCard({ item, onSelect, isSelected }) {
  const { isFavorite, toggleFavorite } = useApp();
  const liked = isFavorite(item.id);
  const [popping, setPopping] = useState(false);

  const posterIndex = typeof item.poster === 'number' ? item.poster : (item.gradientIndex || 0);
  const gradient = posterGradients[posterIndex % posterGradients.length];

  // Dynamic badge calculated from releaseDate, never hard-coded
  const badge = item.badge || computeBadge(item.releaseDate, item.type);
  const titleName = item.name || item.title;
  const genreText = Array.isArray(item.genres) ? item.genres[0] : (item.genre || '');

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleFavorite(item.id);
    if (!liked) {
      setPopping(true);
      setTimeout(() => setPopping(false), 250);
    }
  };

  const handleCardClick = () => {
    if (onSelect) onSelect(item);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className="poster-card"
      tabIndex={0}
      role="button"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-label={`${titleName}, ${genreText}, ${item.year}`}
    >
      {/* Poster image placeholder */}
      <div
        className="poster-thumb"
        style={{
          viewTransitionName: isSelected ? 'active-poster-thumb' : undefined,
        }}
      >
        <div className="poster-thumb-bg" style={{ background: gradient }}>
          <span className="poster-thumb-watermark" aria-hidden="true">M</span>
        </div>

        {/* Dynamic Badge */}
        {badge && (
          <span className="badge badge-pink poster-badge">{badge}</span>
        )}

        {/* Heart button */}
        <button
          className={`poster-heart ${liked ? 'active' : ''} ${popping ? 'pop' : ''}`}
          onClick={handleHeartClick}
          aria-label={liked ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}
          aria-pressed={liked}
        >
          <IconHeart size={16} filled={liked} />
        </button>
      </div>

      {/* Info */}
      <div className="poster-info">
        <p className="poster-title">{titleName}</p>
        <p className="poster-meta">
          {genreText ? `${genreText} · ` : ''}{item.year}
        </p>
      </div>
    </article>
  );
}
