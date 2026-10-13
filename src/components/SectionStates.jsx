import './SectionStates.css';

export function CardSkeleton() {
  return (
    <div className="card-skeleton" aria-hidden="true">
      <div className="card-skeleton-thumb skeleton-shimmer" />
      <div className="card-skeleton-info">
        <div className="card-skeleton-line short skeleton-shimmer" />
        <div className="card-skeleton-line tiny skeleton-shimmer" />
      </div>
    </div>
  );
}

export function RailSkeleton({ count = 6 }) {
  return (
    <section className="section" aria-label="Yuklanmoqda">
      <div className="section-header">
        <div className="rail-skeleton-title skeleton-shimmer" />
        <div className="rail-skeleton-link skeleton-shimmer" />
      </div>
      <div className="scroll-rail">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <div className="hero-skeleton skeleton-shimmer" aria-label="Yuklanmoqda">
      <div className="hero-skeleton-content">
        <div className="hero-skeleton-badge skeleton-shimmer" />
        <div className="hero-skeleton-title skeleton-shimmer" />
        <div className="hero-skeleton-desc skeleton-shimmer" />
        <div className="hero-skeleton-btns">
          <div className="hero-skeleton-btn skeleton-shimmer" />
          <div className="hero-skeleton-btn skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function ErrorState({ title = 'Yuklashda xatolik yuz berdi', message, onRetry }) {
  return (
    <div className="state-box error-state" role="alert">
      <div className="state-icon error-icon" aria-hidden="true">⚠️</div>
      <h3 className="state-title">{title}</h3>
      {message && <p className="state-desc">{message}</p>}
      {onRetry && (
        <button className="btn btn-primary state-retry-btn" onClick={onRetry}>
          Qayta urinish
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = "Hozircha kontent mavjud emas", subMessage }) {
  return (
    <div className="state-box empty-state">
      <div className="state-icon empty-icon" aria-hidden="true">🎬</div>
      <h3 className="state-title">{message}</h3>
      {subMessage && <p className="state-desc">{subMessage}</p>}
    </div>
  );
}
