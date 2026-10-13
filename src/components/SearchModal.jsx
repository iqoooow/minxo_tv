import { useState, useEffect, useRef } from 'react';
import { api } from '../api';
import { IconSearch, IconX } from './Icons';
import { posterGradients } from '../data';
import { computeBadge } from '../utils/dateBadge';
import { useApp } from '../context/AppContext';
import './SearchModal.css';

const STORAGE_RECENT_KEY = 'minxo_recent_searches_v1';

export default function SearchModal({ isOpen, onClose, onSelectTitle }) {
  const { t } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_RECENT_KEY);
      return saved ? JSON.parse(saved) : ['Oila Sirlari', 'Jangari', 'Oxirgi Jang', 'Komediya'];
    } catch {
      return ['Oila Sirlari', 'Jangari', 'Oxirgi Jang', 'Komediya'];
    }
  });

  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  // Keyboard navigation & ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search (250ms)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const data = await api.search(query);
        setResults(data);
        setHasSearched(true);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const saveRecent = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const next = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 8);
    setRecentSearches(next);
    try {
      localStorage.setItem(STORAGE_RECENT_KEY, JSON.stringify(next));
    } catch {}
  };

  const handleSelect = (item) => {
    saveRecent(item.name || item.title);
    onClose();
    if (onSelectTitle) onSelectTitle(item);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_RECENT_KEY);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.search}
    >
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-modal-bar">
          <IconSearch size={22} className="search-modal-bar-icon" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="search-modal-input"
            aria-label={t.search.placeholder}
          />
          {query && (
            <button
              className="search-clear-btn"
              onClick={() => setQuery('')}
              aria-label="Tozalash"
            >
              <IconX size={18} />
            </button>
          )}
          <button className="search-modal-close" onClick={onClose} aria-label={t.details.close}>
            <IconX size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="search-modal-body">
          {/* Recent Searches (when query is empty) */}
          {!query && recentSearches.length > 0 && (
            <div className="search-recent-box">
              <div className="search-recent-header">
                <span className="search-recent-title">{t.search.recentTitle}</span>
                <button className="search-recent-clear-link" onClick={clearRecent}>
                  {t.search.clearRecent}
                </button>
              </div>
              <div className="search-recent-chips">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    className="search-recent-chip"
                    onClick={() => setQuery(term)}
                  >
                    <IconSearch size={14} />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Shimmer */}
          {isSearching && (
            <div className="search-loading-list">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="search-result-skeleton skeleton-shimmer" />
              ))}
            </div>
          )}

          {/* Search Results */}
          {!isSearching && results.length > 0 && (
            <div className="search-results-list">
              <p className="search-results-count">
                {results.length} {t.search.resultsCount}
              </p>
              <div className="search-results-grid">
                {results.map((item) => {
                  const gradient = posterGradients[(item.poster || 0) % posterGradients.length];
                  const badge = computeBadge(item.releaseDate, item.type);
                  return (
                    <div
                      key={item.id}
                      className="search-result-item"
                      tabIndex={0}
                      role="button"
                      onClick={() => handleSelect(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSelect(item);
                      }}
                    >
                      <div className="search-result-thumb" style={{ background: gradient }}>
                        <span className="search-result-watermark">M</span>
                        {badge && <span className="badge badge-pink search-badge">{badge}</span>}
                      </div>
                      <div className="search-result-meta">
                        <p className="search-result-name">{item.name}</p>
                        <p className="search-result-desc">
                          {item.genres?.join(', ')} • {item.year} • {item.ageRating}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isSearching && hasSearched && results.length === 0 && (
            <div className="search-empty-state">
              <span className="search-empty-icon" aria-hidden="true">🔍</span>
              <h3 className="search-empty-title">{t.search.emptyMessage}</h3>
              <p className="search-empty-sub">{t.search.emptySub}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
