/* =========================================================================
   Minxo TV — Dynamic Badge Computation
   Badges ("Premyera", "Yangi") are strictly calculated from releaseDate,
   never hand-typed.
   ========================================================================= */

export function computeBadge(releaseDate, type) {
  if (!releaseDate) return null;

  const release = new Date(releaseDate);
  const now = new Date();
  const diffMs = now.getTime() - release.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // If released within 30 days -> Premyera
  if (diffDays >= 0 && diffDays <= 30) {
    return 'Premyera';
  }

  // If released within 90 days -> Yangi
  if (diffDays >= 0 && diffDays <= 90) {
    return 'Yangi';
  }

  return null;
}
