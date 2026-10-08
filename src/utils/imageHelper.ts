import heroHighlands from '../assets/images/dolano_hero_highlands_1791445064718.jpg';
import waterfallNature from '../assets/images/wisata_waterfall_nature_1791445087445.jpg';
import templeHeritage from '../assets/images/wisata_temple_heritage_1791445102118.jpg';
import indonesianCulinary from '../assets/images/restaurant_indonesian_culinary_1791445115848.jpg';
import resortVilla from '../assets/images/resort_villa_ecolodge_1791445128054.jpg';

export const localAssets = {
  highlands: heroHighlands,
  waterfall: waterfallNature,
  temple: templeHeritage,
  culinary: indonesianCulinary,
  resort: resortVilla,
};

// Web / CDN fallback URLs in case local assets fail or when viewed externally
export const fallbackWebImages = {
  highlands: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
  waterfall: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
  temple: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
  culinary: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  resort: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
};

/**
 * Resolves an image path into a guaranteed valid URL.
 * Handles Vite bundled assets, relative GitHub paths, and web fallbacks.
 */
export function getSafeImageUrl(imagePath?: string, fallbackType: keyof typeof localAssets = 'highlands'): string {
  if (!imagePath) return localAssets[fallbackType];

  // If already an imported asset or full HTTP/HTTPS URL or data URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }

  // Match known filenames
  if (imagePath.includes('dolano_hero_highlands')) return localAssets.highlands;
  if (imagePath.includes('wisata_waterfall_nature')) return localAssets.waterfall;
  if (imagePath.includes('wisata_temple_heritage')) return localAssets.temple;
  if (imagePath.includes('restaurant_indonesian_culinary')) return localAssets.culinary;
  if (imagePath.includes('resort_villa_ecolodge')) return localAssets.resort;

  // If it's a relative path, return as is or bundled
  return imagePath;
}

/**
 * Robust image error handler that tries bundled asset, then web CDN, avoiding infinite loops.
 */
export function handleImageFallback(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  category: keyof typeof localAssets = 'highlands'
): void {
  const target = event.currentTarget;
  const stage = target.getAttribute('data-fallback-stage') || '0';

  if (stage === '0') {
    target.setAttribute('data-fallback-stage', '1');
    target.src = localAssets[category];
  } else if (stage === '1') {
    target.setAttribute('data-fallback-stage', '2');
    target.src = fallbackWebImages[category];
  }
}
