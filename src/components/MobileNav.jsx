import { useState } from 'react';
import { IconHome, IconSearch, IconLive, IconHeart, IconUser } from './Icons';
import { useApp } from '../context/AppContext';
import './MobileNav.css';

const iconMap = {
  home: IconHome,
  search: IconSearch,
  live: IconLive,
  favorites: IconHeart,
  profile: IconUser,
};

export default function MobileNav({ onProfileClick, onOpenSearch }) {
  const { t } = useApp();
  const [active, setActive] = useState('home');

  const navItems = [
    { id: 'home', label: t.nav.home, icon: 'home' },
    { id: 'search', label: t.nav.search, icon: 'search' },
    { id: 'live', label: t.nav.live, icon: 'live' },
    { id: 'favorites', label: t.nav.favorites, icon: 'favorites' },
    { id: 'profile', label: t.nav.profile, icon: 'profile' },
  ];

  const handleTap = (id) => {
    if (id === 'profile') {
      if (onProfileClick) onProfileClick();
    } else if (id === 'search') {
      if (onOpenSearch) onOpenSearch();
    } else {
      setActive(id);
    }
  };

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === active)
  );

  return (
    <nav className="mobile-nav" aria-label="Mobil navigatsiya">
      {/* Sliding active indicator pill (250ms cubic-bezier(.2,.8,.2,1)) */}
      <div
        className="mobile-nav-indicator"
        style={{
          width: `${100 / navItems.length}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
        aria-hidden="true"
      >
        <div className="mobile-nav-indicator-pill" />
      </div>

      {navItems.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <button
            key={item.id}
            className={`mobile-nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => handleTap(item.id)}
            aria-label={item.label}
            aria-current={active === item.id ? 'page' : undefined}
          >
            <Icon size={22} className="mobile-nav-icon" />
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
