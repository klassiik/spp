/**
 * Dynamic Hero Image Management System
 * Intelligent Unsplash image sourcing based on page context
 */

import { unsplash, searchLocationImages, getPhotoById, trackDownload } from './unsplash';
import { counties, getLocationsByCounty } from './data/locations';
import { services } from './data/services';

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

// Unsplash API response types (simplified)
interface UnsplashUrls {
  small: string;
  thumb: string;
  regular: string;
  full: string;
  raw: string;
}

interface UnsplashUser {
  name: string;
  username: string;
  links: {
    html: string;
  };
}

interface UnsplashLinks {
  html: string;
  download_location: string;
}

interface UnsplashPhoto {
  id: string;
  urls: UnsplashUrls;
  description: string | null;
  alt_description: string | null;
  user: UnsplashUser;
  links: UnsplashLinks;
  width: number;
  height: number;
  color: string | null;
  blur_hash: string | null;
  created_at: string;
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
  minWidth: 1920,
  minHeight: 1080,
  maxFileSize: 2 * 1024 * 1024, // 2MB
  aspectRatio: {
    min: 1.6, // ~16:10
    max: 2.2, // ~11:5
  },
};

// Cache configuration
interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum cache entries
  storagePath: string; // Local storage path
}

// Default cache configuration
const DEFAULT_CACHE_CONFIG: CacheConfig = {
  ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxSize: 100, // 100 images
  storagePath: '/public/images/hero-cache/',
};

// Rate limiting configuration
interface RateLimitConfig {
  requestsPerHour: number;
  requestsPerMinute: number;
  burstLimit: number;
}

const UNSPLASH_RATE_LIMITS: RateLimitConfig = {
  requestsPerHour: 50,
  requestsPerMinute: 10,
  burstLimit: 5,
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
      queries.push('professional', 'california landscape');
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
export function validateImage(image: UnsplashPhoto, criteria: ImageValidationCriteria = DEFAULT_HERO_VALIDATION): boolean {
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
  const fallbackImage = config.fallback || '1560518883-ce1e9c3bd3a5'; // Default California property image

  try {
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 10, // Get multiple options for validation
      orientation: 'landscape',
      orderBy: 'relevant',
    });

    if (result.errors) {
      console.error('Unsplash API search error:', result.errors);
      return getFallbackImages(fallbackImage);
    }

    const photos = result.response?.results || [];
    
    // Filter and validate images
    const validImages = photos
      .filter(photo => validateImage(photo))
      .slice(0, 3) // Take top 3 valid images
      .map(photo => formatHeroImageResult(photo));

    if (validImages.length > 0) {
      // Track downloads for attribution compliance
      for (const image of validImages) {
        if (image.links.download_location) {
          await trackDownload(image.links.download_location);
        }
      }
      return validImages;
    }

    // If no valid images found, return fallbacks
    return getFallbackImages(fallbackImage);

  } catch (error) {
    console.error('Error searching hero images:', error);
    return getFallbackImages(fallbackImage);
  }
}

/**
 * Format Unsplash photo to HeroImageResult
 */
function formatHeroImageResult(photo: UnsplashPhoto): HeroImageResult {
  // Generate responsive URLs based on the regular URL
  const regularUrl = photo.urls.regular;
  const baseUrl = regularUrl.replace(/w=\d+[^&]*/, '');
  
  return {
    id: photo.id,
    url: photo.urls.regular,
    urls: photo.urls,
    responsiveUrls: {
      small: `${baseUrl}w=640&q=80&fit=crop&auto=format`,
      medium: `${baseUrl}w=1024&q=80&fit=crop&auto=format`,
      large: `${baseUrl}w=1920&q=80&fit=crop&auto=format`,
      xlarge: `${baseUrl}w=2560&q=80&fit=crop&auto=format`,
    },
    description: photo.description,
    alt_description: photo.alt_description,
    user: photo.user,
    links: photo.links,
    width: photo.width,
    height: photo.height,
    color: photo.color,
    blur_hash: photo.blur_hash,
    created_at: photo.created_at,
    attribution: {
      required: true,
      text: `Photo by ${photo.user.name} on Unsplash`,
      html: `<a href="${photo.links.html}?utm_source=spp_website&utm_medium=referral" target="_blank" rel="noopener noreferrer">Photo by ${photo.user.name}</a> on <a href="https://unsplash.com/?utm_source=spp_website&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>`,
    },
  };
}

/**
 * Get fallback images when API fails
 */
function getFallbackImages(fallbackId: string): HeroImageResult[] {
  // This would typically return cached or placeholder images
  // For now, return the default Unsplash URL format
  const fallbackUrl = `https://images.unsplash.com/photo-${fallbackId}?w=1920&h=1080&fit=crop&q=80&auto=format`;
  
  return [{
    id: fallbackId,
    url: fallbackUrl,
    urls: {
      small: `https://images.unsplash.com/photo-${fallbackId}?w=640&h=360&fit=crop&q=80&auto=format`,
      thumb: `https://images.unsplash.com/photo-${fallbackId}?w=200&h=200&fit=crop&q=80&auto=format`,
      regular: fallbackUrl,
      full: `https://images.unsplash.com/photo-${fallbackId}?w=2560&h=1440&fit=crop&q=80&auto=format`,
      raw: `https://images.unsplash.com/photo-${fallbackId}`,
    },
    responsiveUrls: {
      small: `https://images.unsplash.com/photo-${fallbackId}?w=640&h=360&fit=crop&q=80&auto=format`,
      medium: `https://images.unsplash.com/photo-${fallbackId}?w=1024&h=576&fit=crop&q=80&auto=format`,
      large: `https://images.unsplash.com/photo-${fallbackId}?w=1920&h=1080&fit=crop&q=80&auto=format`,
      xlarge: `https://images.unsplash.com/photo-${fallbackId}?w=2560&h=1440&fit=crop&q=80&auto=format`,
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
    blur_hash: 'L0E]j%2Rj9j[Rjayj[j[ayj[ayj[',
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
  if (rateLimitState.requests.length >= UNSPLASH_RATE_LIMITS.requestsPerHour) {
    return false;
  }

  if (rateLimitState.burstRequests.length >= UNSPLASH_RATE_LIMITS.burstLimit) {
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
  // Check rate limit first
  if (!checkRateLimit()) {
    console.warn('Rate limit exceeded, using fallback image');
    const fallbacks = getFallbackImages(config.fallback || '1560518883-ce1e9c3bd3a5');
    return fallbacks[0];
  }

  try {
    const images = await searchHeroImages(config);
    return images[0] || getFallbackImages(config.fallback || '1560518883-ce1e9c3bd3a5')[0];
  } catch (error) {
    console.error('Error getting hero image:', error);
    const fallbacks = getFallbackImages(config.fallback || '1560518883-ce1e9c3bd3a5');
    return fallbacks[0];
  }
}