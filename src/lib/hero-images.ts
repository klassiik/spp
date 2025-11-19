/**
 * Dynamic Hero Image Management System
 * Intelligent Pexels image sourcing based on page context
 */

import { searchLocationImages } from './pexels';
import { counties, getLocationsByCounty } from './data/locations';
import { services } from './data/services';
import { Photo } from 'pexels';

// Types for hero image configuration
export interface HeroImageConfig {
  location?: string; // City/location identifier
  service?: string; // Service slug
  category?: 'homepage' | 'service' | 'location' | 'about' | 'contact';
  keywords?: string[]; // Additional search terms
  fallback?: string; // Fallback image ID
}

export interface HeroImageResult {
  id: string;
  url: string;
  urls: {
    small: string;
    thumb: string;
    regular: string;
    full: string;
    raw: string;
  };
  // Responsive image URLs for srcset
  responsiveUrls: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  description: string | null;
  alt_description: string | null;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
    download_location: string;
  };
  width: number;
  height: number;
  color: string | null;
  blur_hash: string | null;
  created_at: string;
  attribution?: {
    required: boolean;
    text: string;
    html: string;
  };
}

// Image validation criteria
export interface ImageValidationCriteria {
  minWidth: number;
  minHeight: number;
  maxFileSize: number; // in bytes
  aspectRatio?: {
    min: number;
    max: number;
  };
  formats?: string[];
}

// Default validation criteria for hero images
const DEFAULT_HERO_VALIDATION: ImageValidationCriteria = {
  minWidth: 1200, // Lowered from 1920 to accept more images
  minHeight: 800, // Lowered from 1080 to accept more images
  maxFileSize: 2 * 1024 * 1024, // 2MB
  aspectRatio: {
    min: 1.3, // Lowered from 1.6 to accept more aspect ratios
    max: 2.5, // Increased from 2.2 to accept more aspect ratios
  },
};

// Rate limiting configuration
interface RateLimitConfig {
  requestsPerHour: number;
  requestsPerMinute: number;
  burstLimit: number;
}

const PEXELS_RATE_LIMITS: RateLimitConfig = {
  requestsPerHour: 200,
  requestsPerMinute: 40,
  burstLimit: 10,
};

/**
 * Generate intelligent search queries based on page context
 */
export function generateSearchQuery(config: HeroImageConfig): string {
  const queries: string[] = [];

  // Base property-related terms
  queries.push('property', 'real estate', 'home');

  // Add location-specific terms
  if (config.location) {
    const location = config.location.toLowerCase();
    const locationData = findLocationData(location);
    
    if (locationData) {
      queries.push(locationData.name);
      queries.push(`${locationData.county} county california`);
      
      // Add geographic features
      if (locationData.county === 'placer') {
        queries.push('sierra nevada', 'lake tahoe');
      } else if (locationData.county === 'nevada') {
        queries.push('gold country', 'nevada city');
      } else if (locationData.county === 'el-dorado') {
        queries.push('american river', 'sierra foothills');
      }
    }
  }

  // Add service-specific terms
  if (config.service) {
    const serviceData = services.find(s => s.slug === config.service);
    if (serviceData) {
      switch (serviceData.category) {
        case 'core':
          if (serviceData.slug === 'residential-property-management') {
            queries.push('residential', 'house', 'condo', 'apartment');
          } else if (serviceData.slug === 'commercial-property-management') {
            queries.push('commercial', 'office building', 'retail space');
          } else if (serviceData.slug === 'tenant-placement-leasing') {
            queries.push('tenant', 'leasing', 'rental');
          }
          break;
        default:
          queries.push('property management');
      }
    }
  }

  // Add category-specific terms
  switch (config.category) {
    case 'homepage':
      queries.push('luxury home', 'modern house', 'california architecture', 'beautiful property');
      break;
    case 'about':
      queries.push('team', 'business', 'professional');
      break;
    case 'contact':
      queries.push('office', 'meeting', 'consultation');
      break;
  }

  // Add custom keywords
  if (config.keywords && Array.isArray(config.keywords) && config.keywords.length > 0) {
    queries.push(...config.keywords);
  }

  return queries.join(' ');
}

/**
 * Find location data by slug
 */
function findLocationData(locationSlug: string) {
  for (const county of counties) {
    const locations = getLocationsByCounty(county.slug);
    const location = locations.find(l => l.slug === locationSlug);
    if (location) {
      return { ...location, county: county.slug };
    }
  }
  return null;
}

/**
 * Validate image against criteria
 */
export function validateImage(image: Photo, criteria: ImageValidationCriteria = DEFAULT_HERO_VALIDATION): boolean {
  // Check dimensions
  if (image.width < criteria.minWidth || image.height < criteria.minHeight) {
    return false;
  }

  // Check aspect ratio if specified
  if (criteria.aspectRatio) {
    const aspectRatio = image.width / image.height;
    if (aspectRatio < criteria.aspectRatio.min || aspectRatio > criteria.aspectRatio.max) {
      return false;
    }
  }

  return true;
}

/**
 * Search for hero images with intelligent query generation
 */
export async function searchHeroImages(config: HeroImageConfig): Promise<HeroImageResult[]> {
  const query = generateSearchQuery(config);
  const fallbackImage = config.fallback || 'fallback';

  console.log('[HeroImages] Searching for hero images with config:', {
    category: config.category,
    location: config.location,
    service: config.service,
    query,
  });

  try {
    // Increased from 10 to 30 to get more image options
    const photos = await searchLocationImages(query, 30);

    if (!photos) {
      console.warn('[HeroImages] No photos returned from Pexels API, using fallback images');
      return getFallbackImages(fallbackImage);
    }
    
    console.log(`[HeroImages] Received ${photos.length} photos from Pexels API`);
    
    // Filter and validate images
    const validImages = photos
      .filter(photo => {
        const isValid = validateImage(photo);
        if (!isValid) {
          console.log(`[HeroImages] Filtered out image ${photo.id}: dimensions ${photo.width}x${photo.height}`);
        }
        return isValid;
      })
      .slice(0, 10) // Increased from 3 to 10 valid images for more variety
      .map(photo => formatHeroImageResult(photo));

    if (validImages.length > 0) {
      console.log(`[HeroImages] Successfully validated ${validImages.length} images`);
      return validImages;
    }

    // If no valid images found, return fallbacks
    console.warn('[HeroImages] No valid images found after filtering, using fallback images');
    return getFallbackImages(fallbackImage);

  } catch (error) {
    console.error('[HeroImages] Error searching hero images:', error);
    if (error instanceof Error) {
      console.error('[HeroImages] Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    return getFallbackImages(fallbackImage);
  }
}

/**
 * Format Pexels photo to HeroImageResult
 */
function formatHeroImageResult(photo: Photo): HeroImageResult {
  return {
    id: photo.id.toString(),
    url: photo.src.original,
    urls: {
      small: photo.src.small,
      thumb: photo.src.tiny,
      regular: photo.src.large,
      full: photo.src.original,
      raw: photo.src.original,
    },
    responsiveUrls: {
      small: photo.src.small,
      medium: photo.src.large,
      large: photo.src.large2x,
      xlarge: photo.src.original,
    },
    description: photo.alt || 'Property Management Image',
    alt_description: photo.alt || 'Property Management Image',
    user: {
      name: photo.photographer,
      username: photo.photographer_url.split('/').pop() || photo.photographer,
      links: {
        html: photo.photographer_url,
      },
    },
    links: {
      html: photo.url,
      download_location: photo.src.original, // Pexels doesn't have a specific download tracking endpoint like Unsplash
    },
    width: photo.width,
    height: photo.height,
    color: photo.avg_color,
    blur_hash: null, // Pexels doesn't provide blur_hash
    created_at: new Date().toISOString(), // Pexels doesn't provide created_at
    attribution: {
      required: true,
      text: `Photo by ${photo.photographer} on Pexels`,
      html: `<a href="${photo.photographer_url}" target="_blank" rel="noopener noreferrer">Photo by ${photo.photographer}</a> on <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>`,
    },
  };
}

/**
 * Get fallback images when API fails
 */
function getFallbackImages(fallbackId: string): HeroImageResult[] {
  // Using placehold.co as a reliable fallback
  const fallbackUrl = `https://placehold.co/1920x1080.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`;
  
  return [{
    id: fallbackId,
    url: fallbackUrl,
    urls: {
      small: `https://placehold.co/640x360.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
      thumb: `https://placehold.co/200x200.png?text=SPP&bg=1e40af&fg=ffffff`,
      regular: fallbackUrl,
      full: `https://placehold.co/2560x1440.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
      raw: fallbackUrl,
    },
    responsiveUrls: {
      small: `https://placehold.co/640x360.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
      medium: `https://placehold.co/1024x576.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
      large: `https://placehold.co/1920x1080.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
      xlarge: `https://placehold.co/2560x1440.png?text=Sierra+Property+Partners&bg=1e40af&fg=ffffff`,
    },
    description: 'California Property Management',
    alt_description: 'Professional property management in Northern California',
    user: {
      name: 'Sierra Property Partners',
      username: 'spp_fallback',
      links: {
        html: 'https://sierrapropertypartners.com',
      },
    },
    links: {
      html: 'https://sierrapropertypartners.com',
      download_location: '',
    },
    width: 1920,
    height: 1080,
    color: '#1e40af',
    blur_hash: null,
    created_at: new Date().toISOString(),
    attribution: {
      required: true,
      text: 'Photo by Sierra Property Partners',
      html: '<a href="https://sierrapropertypartners.com" target="_blank" rel="noopener noreferrer">Sierra Property Partners</a>',
    },
  }];
}

/**
 * Rate limiting check
 */
const rateLimitState = {
  requests: [] as number[],
  burstRequests: [] as number[],
};

export function checkRateLimit(): boolean {
  const now = Date.now();
  const oneHourAgo = now - (60 * 60 * 1000);
  const oneMinuteAgo = now - (60 * 1000);

  // Clean old requests
  rateLimitState.requests = rateLimitState.requests.filter(time => time > oneHourAgo);
  rateLimitState.burstRequests = rateLimitState.burstRequests.filter(time => time > oneMinuteAgo);

  // Check limits
  if (rateLimitState.requests.length >= PEXELS_RATE_LIMITS.requestsPerHour) {
    return false;
  }

  if (rateLimitState.burstRequests.length >= PEXELS_RATE_LIMITS.burstLimit) {
    return false;
  }

  // Record this request
  rateLimitState.requests.push(now);
  rateLimitState.burstRequests.push(now);

  return true;
}

/**
 * Get hero image for specific page context
 */
export async function getHeroImageForPage(config: HeroImageConfig): Promise<HeroImageResult> {
  console.log('[HeroImages] Getting hero image for page:', config);
  
  // Check rate limit first
  if (!checkRateLimit()) {
    console.warn('[HeroImages] Rate limit exceeded, using fallback image');
    const fallbacks = getFallbackImages(config.fallback || 'fallback');
    return fallbacks[0];
  }

  try {
    const images = await searchHeroImages(config);
    const selectedImage = images[0] || getFallbackImages(config.fallback || 'fallback')[0];
    
    console.log('[HeroImages] Selected image:', {
      id: selectedImage.id,
      url: selectedImage.url,
      isFallback: selectedImage.id === (config.fallback || 'fallback'),
    });
    
    return selectedImage;
  } catch (error) {
    console.error('[HeroImages] Error getting hero image:', error);
    if (error instanceof Error) {
      console.error('[HeroImages] Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    const fallbacks = getFallbackImages(config.fallback || 'fallback');
    return fallbacks[0];
  }
}