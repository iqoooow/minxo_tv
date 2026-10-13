import { useEffect } from 'react';
import { posterGradients } from '../data';
import { IconPlay, IconBookmark, IconX, IconHeart } from './Icons';
import { computeBadge } from '../utils/dateBadge';
import { useApp } from '../context/AppContext';
import './TitleDetails.css';

export default function TitleDetails({ item, onClose }) {
  const { isFavorite, toggleFavorite, saveProgress, t } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const posterIndex = typeof item.poster === 'number' ? item.poster : (item.gradientIndex || 0);
  const gradient = posterGradients[posterIndex % posterGradients.length];
  const badge = item.badge || computeBadge(item.releaseDate, item.type);
  const titleName = item.name || item.title;
  const genreText = Array.isArray(item.genres) ? item.genres.join(', ') : (item.genre || '');
  const liked = isFavorite(item.id);

  const handleStartWatch = () => {
    // Save simulated playback progress so it immediately appears in "Davom ettirish" rail!
    saveProgress(item.id, 600, 2700, item.type === 'series' ? '1-qism' : null);
    onClose();
  };

  return (
    <div
      className="details-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="details-title"
    >
      <div className="details-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="details-close-btn"
          onClick={onClose}
          aria-label={t.details.close}
        >
          <IconX size={22} />
        </button>

        {/* Banner with shared element transition viewTransitionName */}
        <div
          className="details-banner"
          style={{
            background: gradient,
            viewTransitionName: 'active-poster-thumb',
          }}
        >
          <span className="details-banner-watermark" aria-hidden="true">M</span>
          <div className="details-banner-overlay" />
          {badge && (
            <span className="badge badge-pink details-badge">{badge}</span>
          )}
          <button className="details-play-center" onClick={handleStartWatch} aria-label={t.hero.watchNow}>
            <IconPlay size={36} />
          </button>
        </div>

        {/* Content details */}
        <div className="details-body">
          <div className="details-meta-line">
            {genreText && <span className="badge badge-glass">{genreText}</span>}
            <span className="details-meta-item">{item.year}</span>
            <span className="details-meta-item">{t.details.hd}</span>
            {item.ageRating && <span className="badge badge-glass">{item.ageRating}</span>}
            {item.episodeCount && (
              <span className="details-meta-item">
                {item.episodeCount} {t.hero.episodes}
              </span>
            )}
            {item.duration && (
              <span className="details-meta-item">
                {item.duration} {t.hero.minutes}
              </span>
            )}
          </div>

          <h2 id="details-title" className="details-title">{titleName}</h2>

          <p className="details-desc">
            {item.description ||
              `${titleName} — Minxo TV da o'zbek tilida yuqori sifatda tomosha qiling. Qiziqarli syujet, professional dublyaj va unutilmas taassurotlar.`}
          </p>

          <div className="details-actions">
            <button className="btn btn-primary details-btn" onClick={handleStartWatch}>
              <IconPlay size={18} />
              {t.hero.watchNow}
            </button>
            <button
              className={`btn btn-glass details-btn ${liked ? 'active' : ''}`}
              onClick={() => toggleFavorite(item.id)}
            >
              <IconHeart size={18} filled={liked} />
              {liked ? t.hero.inFavorites : t.hero.addFavorite}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
