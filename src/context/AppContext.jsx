import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, getStoredUser } from '../api';
import { translations } from '../utils/i18n';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('minxo_favorites_v1');
      return raw ? JSON.parse(raw) : ['title-1', 'title-9'];
    } catch {
      return ['title-1', 'title-9'];
    }
  });
  const [progress, setProgress] = useState(() => {
    try {
      const raw = localStorage.getItem('minxo_progress_v1');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [activeGenre, setActiveGenre] = useState('all');
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('minxo_lang_v1') || 'uz';
    } catch {
      return 'uz';
    }
  });

  // Switch language
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem('minxo_lang_v1', lang);
    } catch {}
  };

  // Optimistic toggle favorite
  const toggleFavorite = useCallback(async (titleId) => {
    // 1. Optimistic update
    setFavorites((prev) => {
      const exists = prev.includes(titleId);
      const next = exists ? prev.filter((id) => id !== titleId) : [...prev, titleId];
      return next;
    });

    // 2. Persist via API
    try {
      const updated = await api.toggleFavorite(titleId);
      setFavorites(updated);
    } catch (err) {
      console.error('Failed to sync favorite:', err);
    }
  }, []);

  const isFavorite = useCallback(
    (titleId) => favorites.includes(titleId),
    [favorites]
  );

  // Save progress
  const saveProgress = useCallback(async (titleId, seconds, totalSeconds, episode) => {
    try {
      const updated = await api.saveProgress(titleId, seconds, totalSeconds, episode);
      setProgress(updated);
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  }, []);

  // Login (merges guest favorites and progress)
  const login = useCallback(async (credentials) => {
    const result = await api.login(credentials);
    setUser(result.user);
    setFavorites(result.favorites);
    setProgress(result.progress);
    return result;
  }, []);

  // Logout
  const logout = useCallback(async () => {
    const guest = await api.logout();
    setUser(guest);
  }, []);

  const t = translations[language] || translations.uz;

  const value = {
    user,
    favorites,
    progress,
    activeGenre,
    setActiveGenre,
    language,
    setLanguage: handleSetLanguage,
    t,
    toggleFavorite,
    isFavorite,
    saveProgress,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
