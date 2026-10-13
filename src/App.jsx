import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GenreChips from './components/GenreChips';
import ContinueWatching from './components/ContinueWatching';
import LiveBroadcast from './components/LiveBroadcast';
import ContentRail from './components/ContentRail';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import LoginPrompt from './components/LoginPrompt';
import SearchModal from './components/SearchModal';
import SplashIntro from './components/SplashIntro';
import TitleDetails from './components/TitleDetails';
import { HeroSkeleton, RailSkeleton, ErrorState, EmptyState } from './components/SectionStates';
import { api } from './api';
import { useApp } from './context/AppContext';

export default function App() {
  const { activeGenre, favorites, progress, t } = useApp();

  const [homeData, setHomeData] = useState({
    featured: [],
    rails: [],
    continueWatching: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch home data driven by API and activeGenre filter
  const fetchHomeData = useCallback(async (shouldFail = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getHome(activeGenre, shouldFail);
      setHomeData(data);
    } catch (err) {
      setError(err.message || t.states.errorTitle);
    } finally {
      setLoading(false);
    }
  }, [activeGenre, t.states.errorTitle]);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData, favorites, progress]);

  // Shared-element view transitions for title details
  const handleSelectTitle = (item) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedItem(item);
      });
    } else {
      setSelectedItem(item);
    }
  };

  const handleCloseTitle = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedItem(null);
      });
    } else {
      setSelectedItem(null);
    }
  };

  return (
    <>
      {/* Signature moment: once per session */}
      <SplashIntro />

      <Header
        onLoginClick={() => setShowLogin(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="page-content">
        <div className="container">
          {/* Error State with retry */}
          {error ? (
            <div style={{ paddingTop: 'var(--space-xl)' }}>
              <ErrorState
                title={t.states.errorTitle}
                message={error}
                onRetry={() => fetchHomeData(false)}
              />
            </div>
          ) : loading ? (
            /* Skeleton Loading State */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <HeroSkeleton />
              <GenreChips />
              <RailSkeleton count={6} />
              <RailSkeleton count={6} />
            </div>
          ) : (
            /* Data-driven content rendering */
            <>
              {/* Dynamic Hero built from isFeatured titles */}
              <Hero
                titles={homeData.featured}
                onSelect={handleSelectTitle}
              />

              {/* Instant Genre Filter Chips */}
              <GenreChips />

              {/* Continue Watching rail (hidden when empty) */}
              <ContinueWatching
                items={homeData.continueWatching}
                onSelect={handleSelectTitle}
              />

              {/* Live Broadcast with Asia/Tashkent schedule */}
              <LiveBroadcast />

              {/* Rails dynamically rendered from rail configuration */}
              {homeData.rails.length > 0 ? (
                homeData.rails.map((rail) => (
                  <ContentRail
                    key={rail.id}
                    id={rail.id}
                    heading={rail.heading}
                    items={rail.items}
                    onSelect={handleSelectTitle}
                    selectedId={selectedItem?.id}
                  />
                ))
              ) : (
                <EmptyState
                  message={t.sections.emptyRail}
                  subMessage="Boshqa janrni tanlab ko'ring"
                />
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        onProfileClick={() => setShowLogin(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Live Search Modal with debounced live results & recent searches */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTitle={handleSelectTitle}
      />

      {/* Login Prompt Modal */}
      {showLogin && <LoginPrompt onClose={() => setShowLogin(false)} />}

      {/* Title Details View with shared-element view transition */}
      {selectedItem && (
        <TitleDetails item={selectedItem} onClose={handleCloseTitle} />
      )}
    </>
  );
}
