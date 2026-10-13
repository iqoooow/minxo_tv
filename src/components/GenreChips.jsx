import { useApp } from '../context/AppContext';
import './GenreChips.css';

const GENRE_LIST = [
  { id: 'all', key: 'all' },
  { id: 'drama', key: 'drama' },
  { id: 'comedy', key: 'comedy' },
  { id: 'melodrama', key: 'melodrama' },
  { id: 'action', key: 'action' },
  { id: 'family', key: 'family' },
  { id: 'kids', key: 'kids' },
  { id: 'documentary', key: 'documentary' },
];

export default function GenreChips() {
  const { activeGenre, setActiveGenre, t } = useApp();

  return (
    <section className="genre-chips-section" aria-label="Janrlar bo'yicha filtrlash">
      <div className="scroll-rail genre-chips-rail">
        {GENRE_LIST.map((genre) => {
          const label = t.genres[genre.key] || genre.id;
          const isActive = activeGenre === genre.id;
          return (
            <button
              key={genre.id}
              className={`genre-chip ${isActive ? 'active' : ''}`}
              onClick={() => setActiveGenre(genre.id)}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
