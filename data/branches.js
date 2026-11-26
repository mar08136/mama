export const mapsSearchUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/**
 * Branches. Only Megenagna has a verified address (the Google plus code supplied).
 * For the others, `address` stays null until the exact address is confirmed;
 * they link to a Google Maps *search* (labeled as a search, not a verified pin).
 */
export const BRANCHES = [
  {
    id: 'megenagna',
    name: 'Megenagna',
    area: 'Megenagna, Addis Ababa',
    featured: true,
    address: '2R94+Q3M, Addis Ababa, Ethiopia',
    mapsQuery: '2R94+Q3M Addis Ababa Ethiopia',
    mapsVerified: true,
  },
  { id: 'bole-medhanialem', name: 'Bole Medhanialem', area: 'Bole Medhanialem, Addis Ababa', address: null },
  { id: '4-kilo', name: '4 Kilo', area: '4 Kilo, Addis Ababa', address: null },
  { id: 'hayahulet', name: 'Hayahulet', area: 'Hayahulet, Addis Ababa', address: null },
  { id: 'salitemihret', name: 'Salitemihret', area: 'Salitemihret, Addis Ababa', address: null },
  { id: 'entoto', name: 'Entoto', area: 'Entoto, Addis Ababa', address: null },
].map((b) => ({
  mapsVerified: false,
  mapsQuery: `Mama's Kitchen ${b.name} Addis Ababa`,
  ...b,
}));
