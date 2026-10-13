import { useState } from 'react';
import { IconSearch, IconUser } from './Icons';
import { useApp } from '../context/AppContext';
import './Header.css';

export default function Header({ onLoginClick, onOpenSearch }) {
  const { user, logout, language, setLanguage, t } = useApp();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home, href: '#' },
    { id: 'series', label: t.nav.series, href: '#seriallar' },
    { id: 'movies', label: t.nav.movies, href: '#kinolar' },
    { id: 'shows', label: t.nav.shows, href: '#korsatuvlar' },
    { id: 'live', label: t.nav.live, href: '#efir' },
  ];

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
  };

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        {/* Logo */}
        <a href="/" className="header-logo" aria-label="Minxo TV — Bosh sahifa">
          <img src="/images/logo.png" alt="" className="header-logo-img" width="40" height="40" />
          <span className="header-wordmark">minxotv</span>
        </a>

        {/* Desktop Nav */}
        <nav className="header-nav" aria-label="Asosiy navigatsiya">
          {navItems.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`header-nav-link ${link.id === 'home' ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Search Trigger — desktop pill */}
          <button
            type="button"
            className="header-search-btn"
            onClick={onOpenSearch}
            aria-label={t.search.placeholder}
          >
            <IconSearch size={18} className="header-search-icon" />
            <span className="header-search-text">{t.search.placeholder}</span>
          </button>

          {/* Search Toggle — mobile icon */}
          <button
            className="header-search-toggle"
            onClick={onOpenSearch}
            aria-label={t.nav.search}
          >
            <IconSearch size={20} />
          </button>

          {/* Language Switcher (UZ / RU) */}
          <div className="header-lang-switch" role="group" aria-label="Til tanlash">
            <button
              className={`lang-btn ${language === 'uz' ? 'active' : ''}`}
              onClick={() => setLanguage('uz')}
              aria-pressed={language === 'uz'}
            >
              UZ
            </button>
            <button
              className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
              onClick={() => setLanguage('ru')}
              aria-pressed={language === 'ru'}
            >
              RU
            </button>
          </div>

          {/* Auth State: Kirish vs Profile menu */}
          {user.loggedIn ? (
            <div className="header-profile-menu-container">
              <button
                className="header-profile-btn"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                aria-label="Profil menyusi"
                aria-expanded={profileMenuOpen}
              >
                <div className="header-avatar" aria-hidden="true">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="header-username">{user.name}</span>
              </button>

              {profileMenuOpen && (
                <div className="header-dropdown-menu">
                  <div className="header-dropdown-info">
                    <p className="dropdown-name">{user.name}</p>
                    <p className="dropdown-phone">{user.phone}</p>
                  </div>
                  <hr className="dropdown-divider" />
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    {t.auth.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-primary header-login-btn" onClick={onLoginClick}>
              {t.auth.login}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
