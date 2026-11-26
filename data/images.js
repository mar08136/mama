/**
 * Site photography slots (hero, story, experience…).
 *
 * A slot with `src: null` shows a labeled PLACEHOLDER until you add a photo:
 *   1. Save the photo in /public/images  (e.g. /public/images/hero.jpg)
 *   2. Set  src: '/images/hero.jpg'  below. Done – the placeholder disappears.
 *
 * Only use photos Mama's Kitchen owns or has permission to use.
 * Menu dish photos live in /public/data/menu.json (see README).
 */
export const IMAGES = {
  // Waiting for the hero photo (needs to be wide and at least ~1920px for a full-screen hero).
  hero: { src: '/images/mama-hero.jpg', alt: 'Mama\u2019s Kitchen', label: 'Hero photograph' },
  story: { src: '/images/dining-room.jpg', alt: 'A dining table set for guests beside large windows with garden views' },
  storySmall: { src: null, alt: 'Close-up of an Ethiopian dish', label: 'Detail photograph' },
  experience: { src: '/images/interior-bar.jpg', alt: 'The dining room and bar with chandeliers and warm lighting' },
  fireplace: { src: null, alt: 'The fireplace at Mamas Kitchen', label: 'Fireplace photograph' },
}