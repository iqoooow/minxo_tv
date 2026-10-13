/* =========================================================================
   Minxo TV — API Layer (Frontend Only)
   All data calls go through this layer with simulated network delays.
   Can be switched to a real backend simply by updating this file.
   ========================================================================= */

import { mockTitles, defaultRailConfigs, initialFavoritesState, initialProgressState } from './mockData';

const STORAGE_FAVORITES_KEY = 'minxo_favorites_v1';
const STORAGE_PROGRESS_KEY = 'minxo_progress_v1';
const STORAGE_USER_KEY = 'minxo_user_v1';

// Helper for artificial delay
const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to access LocalStorage for Guest & User persistence
function getStoredFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_FAVORITES_KEY);
    return raw ? JSON.parse(raw) : initialFavoritesState;
  } catch {
    return initialFavoritesState;
  }
}

function setStoredFavorites(favs) {
  try {
    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favs));
  } catch {}
}

function getStoredProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : initialProgressState;
  } catch {
    return initialProgressState;
  }
}

function setStoredProgress(prog) {
  try {
    localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(prog));
  } catch {}
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    return raw ? JSON.parse(raw) : { loggedIn: false, name: null, phone: null };
  } catch {
    return { loggedIn: false, name: null, phone: null };
  }
}

export function setStoredUser(user) {
  try {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  } catch {}
}

export const api = {
  /**
   * Fetch home page payload:
   * - featuredTitles (from titles where isFeatured = true)
   * - rails (generated dynamically from rail config, rails with 0 items are omitted)
   * - continueWatching (derived dynamically from user progress)
   */
  async getHome(activeGenre = 'all', shouldFail = false) {
    await delay(220);

    if (shouldFail) {
      throw new Error("Tarmoq xatosi: Ma'lumotlarni yuklab bo'lmadi");
    }

    // 1. Featured titles
    const featuredTitles = mockTitles.filter((t) => t.isFeatured);

    // 2. Generate rails from rail config
    const rails = defaultRailConfigs
      .map((config) => {
        let items = mockTitles.filter((item) => {
          if (config.query.type && item.type !== config.query.type) return false;
          if (activeGenre !== 'all' && !item.genres.includes(activeGenre)) return false;
          return true;
        });

        // Sort if specified
        if (config.query.sort === 'releaseDate') {
          items = [...items].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        } else if (config.query.sort === 'views') {
          items = [...items].sort((a, b) => (b.views || 0) - (a.views || 0));
        }

        return {
          id: config.id,
          heading: config.heading,
          items,
        };
      })
      // Hide a rail if it has no items
      .filter((rail) => rail.items.length > 0);

    // 3. Continue watching rail
    const progressMap = getStoredProgress();
    const continueWatching = Object.entries(progressMap)
      .map(([titleId, prog]) => {
        const title = mockTitles.find((t) => t.id === titleId);
        if (!title) return null;
        const percent = Math.min(100, Math.round((prog.seconds / (prog.totalSeconds || 2700)) * 100));
        const minutesLeft = Math.max(1, Math.round(((prog.totalSeconds || 2700) - prog.seconds) / 60));
        return {
          id: title.id,
          title: title.name,
          episode: prog.episode || '1-qism',
          timeLeft: `${minutesLeft} daqiqa qoldi`,
          progress: percent,
          gradientIndex: title.poster % 4,
          updatedAt: prog.updatedAt || 0,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.updatedAt - a.updatedAt);

    return {
      featured: featuredTitles,
      rails,
      continueWatching,
    };
  },

  /**
   * Search titles by text query (debounced in UI)
   */
  async search(query = '') {
    await delay(180);
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return mockTitles.filter((item) => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchGenre = item.genres.some((g) => g.toLowerCase().includes(q));
      return matchName || matchDesc || matchGenre;
    });
  },

  /**
   * Get single title details
   */
  async getTitle(id) {
    await delay(150);
    return mockTitles.find((t) => t.id === id) || null;
  },

  /**
   * Get daily live broadcast schedule based on Asia/Tashkent time
   */
  async getSchedule() {
    await delay(150);

    // Compute schedule relative to Tashkent time
    const nowTashkent = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Tashkent' })
    );
    const currentHour = nowTashkent.getHours();
    const currentMinute = nowTashkent.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    const baseSchedule = [
      { startHour: 6, duration: 60, title: 'Tonggi salom', subtitle: 'Musiqiy dastur' },
      { startHour: 7, duration: 60, title: 'Bolalar olami', subtitle: 'Ertaklar va multfilmlar' },
      { startHour: 8, duration: 90, title: 'Axborot', subtitle: 'Tonggi yangiliklar' },
      { startHour: 9, duration: 90, title: 'Oila sirlari', subtitle: 'Takroriy serial' },
      { startHour: 11, duration: 60, title: 'Oshpaz bellashuvi', subtitle: 'Pazandalik shousi' },
      { startHour: 12, duration: 60, title: 'Kunning muhim voqealari', subtitle: 'Tezkor xabarlar' },
      { startHour: 13, duration: 120, title: 'Kino vaqti: Sevgi daftari', subtitle: 'Badiiy film' },
      { startHour: 15, duration: 60, title: 'Sayohat kundaligi', subtitle: 'Hujjatli film' },
      { startHour: 16, duration: 90, title: 'Kelajak askarlari', subtitle: 'Serial' },
      { startHour: 18, duration: 60, title: 'Axborot', subtitle: 'Kechki yangiliklar' },
      { startHour: 19, duration: 60, title: 'Oila Sirlari', subtitle: 'Yangi qism — Premyera' },
      { startHour: 20, duration: 90, title: 'Kechki shou', subtitle: 'Eksklyuziv mehmonlar bilan' },
      { startHour: 21, duration: 90, title: 'Kino: Oxirgi Jang', subtitle: 'Premyera' },
      { startHour: 23, duration: 60, title: 'Musiqa va madaniyat', subtitle: 'Tungi konsert' },
      { startHour: 0, duration: 360, title: 'Tungi efir', subtitle: 'Eng yaxshi seriallar takrori' },
    ];

    const scheduleWithTimes = baseSchedule.map((item, idx) => {
      const startMin = item.startHour * 60;
      const endMin = (item.startHour * 60 + item.duration) % (24 * 60);

      // Check if item is active right now in Tashkent
      let isCurrent = false;
      if (item.startHour === 0) {
        // Tungi efir covers 00:00 - 06:00
        isCurrent = currentHour < 6;
      } else {
        const itemEndTotal = item.startHour * 60 + item.duration;
        isCurrent = currentTotalMinutes >= startMin && currentTotalMinutes < itemEndTotal;
      }

      const formattedTime = `${String(item.startHour).padStart(2, '0')}:00`;

      return {
        id: `schedule-${idx + 1}`,
        time: formattedTime,
        title: item.title,
        subtitle: item.subtitle,
        isCurrent,
        startsAtHour: item.startHour,
      };
    });

    return scheduleWithTimes;
  },

  /**
   * Toggle favorite title
   */
  async toggleFavorite(titleId) {
    await delay(100);
    const favs = getStoredFavorites();
    let next;
    if (favs.includes(titleId)) {
      next = favs.filter((id) => id !== titleId);
    } else {
      next = [...favs, titleId];
    }
    setStoredFavorites(next);
    return next;
  },

  /**
   * Save user playback progress
   */
  async saveProgress(titleId, seconds, totalSeconds = 2700, episode = '1-qism') {
    await delay(100);
    const prog = getStoredProgress();
    prog[titleId] = {
      seconds,
      totalSeconds,
      episode,
      updatedAt: Date.now(),
    };
    setStoredProgress(prog);
    return prog;
  },

  /**
   * Login & merge guest favorites into user profile
   */
  async login(userData) {
    await delay(200);
    const guestFavs = getStoredFavorites();
    const guestProg = getStoredProgress();

    const loggedInUser = {
      loggedIn: true,
      name: userData.phoneOrEmail ? userData.phoneOrEmail.split('@')[0] : 'Foydalanuvchi',
      phone: userData.phoneOrEmail || '+998901234567',
    };

    setStoredUser(loggedInUser);
    return {
      user: loggedInUser,
      favorites: guestFavs,
      progress: guestProg,
    };
  },

  /**
   * Logout
   */
  async logout() {
    await delay(150);
    const guestUser = { loggedIn: false, name: null, phone: null };
    setStoredUser(guestUser);
    return guestUser;
  },
};
