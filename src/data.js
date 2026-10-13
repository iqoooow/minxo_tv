/* =========================================================================
   Minxo TV — Static placeholder data
   Structure mirrors a future API shape so it's easy to replace later.
   ========================================================================= */

export const heroSlides = [
  {
    id: 1,
    tag: 'Yangi serial',
    title: 'Oila Sirlari',
    description:
      "Bir oilaning hayotidagi kutilmagan voqealar, sirlar va haqiqatlar. Har bir qism yangi syurpriz bilan to'la.",
    genre: 'Drama',
    year: 2024,
    episodes: 24,
    ageRating: '16+',
    gradient: 'linear-gradient(135deg, #B0125F 0%, #1A1320 60%)',
  },
  {
    id: 2,
    tag: 'Premyera',
    title: 'Muhabbat Yo\'li',
    description:
      "Ikki yosh yurak o'rtasidagi ishq va sarguzashtlar to'la hikoya.",
    genre: 'Melodrama',
    year: 2024,
    episodes: 16,
    ageRating: '12+',
    gradient: 'linear-gradient(135deg, #6B1D7B 0%, #1A1320 60%)',
  },
  {
    id: 3,
    tag: 'Tavsiya etiladi',
    title: 'Kelajak Askarlari',
    description:
      "Kelajak dunyosida tinchlikni saqlash uchun kurashayotgan jasur jangchilar haqida.",
    genre: 'Jangari',
    year: 2024,
    episodes: 12,
    ageRating: '16+',
    gradient: 'linear-gradient(135deg, #1B3A6B 0%, #B0125F 50%, #1A1320 100%)',
  },
];

export const genres = [
  { id: 'all', label: 'Hammasi' },
  { id: 'drama', label: 'Drama' },
  { id: 'comedy', label: 'Komediya' },
  { id: 'melodrama', label: 'Melodrama' },
  { id: 'action', label: 'Jangari' },
  { id: 'family', label: 'Oilaviy' },
  { id: 'kids', label: 'Bolalar uchun' },
  { id: 'documentary', label: 'Hujjatli' },
];

export const continueWatching = [
  {
    id: 1,
    title: 'Oila Sirlari',
    episode: '12-qism',
    timeLeft: '23 daqiqa qoldi',
    progress: 65,
    gradientIndex: 0,
  },
  {
    id: 2,
    title: 'Muhabbat Yo\'li',
    episode: '5-qism',
    timeLeft: '34 daqiqa qoldi',
    progress: 40,
    gradientIndex: 1,
  },
  {
    id: 3,
    title: 'Kelajak Askarlari',
    episode: '8-qism',
    timeLeft: '15 daqiqa qoldi',
    progress: 80,
    gradientIndex: 2,
  },
  {
    id: 4,
    title: 'Orzular Shahri',
    episode: '3-qism',
    timeLeft: '42 daqiqa qoldi',
    progress: 25,
    gradientIndex: 3,
  },
];

export const liveSchedule = [
  { id: 1, time: '18:00', title: 'Axborot', subtitle: 'Kundalik yangiliklar', isCurrent: false },
  { id: 2, time: '19:00', title: 'Oila Sirlari', subtitle: 'Yangi qism — 13-qism', isCurrent: true },
  { id: 3, time: '20:00', title: 'Kechki shou', subtitle: 'Mehmonlar bilan', isCurrent: false },
  { id: 4, time: '21:00', title: 'Hujjatli film', subtitle: "O'zbekiston tarixi", isCurrent: false },
  { id: 5, time: '22:00', title: 'Komediya kechasi', subtitle: 'Eng yaxshi sahna', isCurrent: false },
];

export const newSeries = [
  { id: 1, title: 'Oila Sirlari', genre: 'Drama', year: 2024, badge: 'Yangi', gradientIndex: 0 },
  { id: 2, title: 'Muhabbat Yo\'li', genre: 'Melodrama', year: 2024, badge: 'Premyera', gradientIndex: 1 },
  { id: 3, title: 'Orzular Shahri', genre: 'Drama', year: 2024, badge: null, gradientIndex: 2 },
  { id: 4, title: 'Qalb Sadosi', genre: 'Melodrama', year: 2023, badge: null, gradientIndex: 3 },
  { id: 5, title: 'Zamonaviy Oila', genre: 'Komediya', year: 2024, badge: 'Yangi', gradientIndex: 4 },
  { id: 6, title: 'Sarhadlar', genre: 'Jangari', year: 2024, badge: null, gradientIndex: 5 },
  { id: 7, title: 'Mehr Qo\'shig\'i', genre: 'Melodrama', year: 2024, badge: 'Premyera', gradientIndex: 0 },
  { id: 8, title: 'Jannat Bog\'i', genre: 'Oilaviy', year: 2023, badge: null, gradientIndex: 1 },
];

export const movies = [
  { id: 9, title: 'Oxirgi Jang', genre: 'Jangari', year: 2024, badge: 'Yangi', gradientIndex: 2 },
  { id: 10, title: 'Sevgi Daftari', genre: 'Melodrama', year: 2023, badge: null, gradientIndex: 3 },
  { id: 11, title: 'Kulgili Kunlar', genre: 'Komediya', year: 2024, badge: 'Premyera', gradientIndex: 4 },
  { id: 12, title: 'Izlovchi', genre: 'Jangari', year: 2024, badge: null, gradientIndex: 5 },
  { id: 13, title: 'Onam Uchun', genre: 'Drama', year: 2023, badge: null, gradientIndex: 0 },
  { id: 14, title: 'Yulduzlar Sari', genre: 'Fantastika', year: 2024, badge: 'Yangi', gradientIndex: 1 },
  { id: 15, title: 'Do\'stlik Kuchi', genre: 'Oilaviy', year: 2024, badge: null, gradientIndex: 2 },
  { id: 16, title: 'Tungi Shahar', genre: 'Triller', year: 2023, badge: null, gradientIndex: 3 },
];

export const shows = [
  { id: 17, title: 'Oshpaz Bellashuvi', genre: "Ko'rsatuv", year: 2024, badge: 'Efirda', gradientIndex: 4 },
  { id: 18, title: 'Ovoz — Saylov', genre: "Ko'rsatuv", year: 2024, badge: null, gradientIndex: 5 },
  { id: 19, title: 'Sayohat Kundaligi', genre: 'Hujjatli', year: 2024, badge: 'Yangi', gradientIndex: 0 },
  { id: 20, title: 'Raqamli Dunyo', genre: "Ko'rsatuv", year: 2024, badge: null, gradientIndex: 1 },
  { id: 21, title: 'Musiqa Bayram', genre: "Ko'rsatuv", year: 2024, badge: 'Premyera', gradientIndex: 2 },
  { id: 22, title: 'Sport Xabarlari', genre: 'Sport', year: 2024, badge: null, gradientIndex: 3 },
  { id: 23, title: 'Bolalar Olami', genre: 'Bolalar', year: 2024, badge: null, gradientIndex: 4 },
  { id: 24, title: 'Tabiat Sirlari', genre: 'Hujjatli', year: 2024, badge: 'Yangi', gradientIndex: 5 },
];

/* Poster gradients for placeholders */
export const posterGradients = [
  'linear-gradient(135deg, #FF7AC0, #FF6B35)',
  'linear-gradient(135deg, #FF7AC0, #8B5CF6)',
  'linear-gradient(135deg, #FF7AC0, #6366F1)',
  'linear-gradient(135deg, #B0125F, #FF7AC0)',
  'linear-gradient(135deg, #FF1F8E, #F59E0B)',
  'linear-gradient(135deg, #7C3AED, #FF1F8E)',
];

/* Thumbnail gradients (16:9) for continue watching */
export const thumbGradients = [
  'linear-gradient(135deg, #B0125F 0%, #FF7AC0 100%)',
  'linear-gradient(135deg, #6B1D7B 0%, #FF1F8E 100%)',
  'linear-gradient(135deg, #1B3A6B 0%, #B0125F 100%)',
  'linear-gradient(135deg, #FF1F8E 0%, #F59E0B 100%)',
];

export const navLinks = [
  { id: 'home', label: 'Bosh sahifa', href: '#' },
  { id: 'series', label: 'Seriallar', href: '#seriallar' },
  { id: 'movies', label: 'Kinolar', href: '#kinolar' },
  { id: 'shows', label: "Ko'rsatuvlar", href: '#korsatuvlar' },
  { id: 'live', label: 'Jonli efir', href: '#efir' },
];

export const mobileNavItems = [
  { id: 'home', label: 'Bosh sahifa', icon: 'home' },
  { id: 'search', label: 'Qidiruv', icon: 'search' },
  { id: 'live', label: 'Efir', icon: 'live' },
  { id: 'favorites', label: 'Sevimlilar', icon: 'heart' },
  { id: 'profile', label: 'Profil', icon: 'profile' },
];
