// Curated Pexels photo IDs for each location
// These are high-quality property and real estate images
// Can be dynamically searched using src/lib/pexels.ts API functions

export const pexelsImages: Record<string, string> = {
  // Placer County
  // IDs to be populated with valid Pexels photo IDs
  "roseville": "",
  "rocklin": "",
  "lincoln": "",
  "granite-bay": "",
  "auburn": "",
  // ... other cities will use fallback or dynamic search
};

/**
 * Get Pexels image URL for a location
 * @param locationSlug - Location identifier
 * @param width - Image width (default 1920)
 * @param quality - Image quality 1-100 (default 80)
 * @returns Optimized Pexels image URL
 */
export function getPexelsUrl(
  locationSlug: string, 
  width: number = 1920, 
  quality: number = 80
): string {
  const imageId = pexelsImages[locationSlug];
  
  if (!imageId) {
    // Fallback to placeholder
    return `https://placehold.co/${width}x${Math.round(width * 0.5625)}.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`;
  }
  
  // Pexels doesn't support dynamic resizing via URL parameters exactly like Unsplash,
  // but we can use their image service if we had the full URL.
  // Since we only have ID here, we can't construct the URL easily without API call.
  // So this function is less useful for Pexels without storing full URLs.
  // For now, return placeholder if no ID.
  return `https://placehold.co/${width}x${Math.round(width * 0.5625)}.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`;
}

/**
 * Get multiple image sizes for responsive images
 * @param locationSlug - Location identifier
 * @returns Object with srcset URLs for different sizes
 */
export function getResponsivePexelsUrls(locationSlug: string) {
  // Placeholder implementation
  return {
    small: `https://placehold.co/640x360.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
    medium: `https://placehold.co/1024x576.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
    large: `https://placehold.co/1920x1080.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
    xlarge: `https://placehold.co/2560x1440.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
  };
}
