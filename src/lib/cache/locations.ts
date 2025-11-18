import { locations, counties } from "@/lib/data/locations";
import type { County, Location, CountyInfo } from "@/types/locations";

// Cache configuration
const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes  
  LONG: 60 * 60 * 1000, // 1 hour
  DAY: 24 * 60 * 60 * 1000, // 24 hours
};

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<unknown>>();

  set<T>(key: string, data: T, duration: number = CACHE_DURATION.MEDIUM): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiry: now + duration,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats() {
    const now = Date.now();
    let valid = 0;
    let expired = 0;

    for (const entry of this.cache.values()) {
      if (now > entry.expiry) {
        expired++;
      } else {
        valid++;
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
    };
  }

  // Get all cache keys
  getCacheKeys(): string[] {
    return Array.from(this.cache.keys());
  }
}

// Global cache instance (shared across requests in production)
declare global {
  var __cache: MemoryCache | undefined;
}

const globalCache = globalThis.__cache || (globalThis.__cache = new MemoryCache());

export class LocationCache {
  private static readonly KEYS = {
    ALL_LOCATIONS: 'locations:all',
    LOCATIONS_BY_COUNTY: (county: County) => `locations:county:${county}`,
    COUNTIES: 'counties:all',
    COUNTY_INFO: (county: County) => `county:info:${county}`,
    LOCATIONS_SEARCH: (query: string, county?: County) => `locations:search:${county || 'all'}:${query}`,
  } as const;

  // Get all locations with caching
  static getAllLocations(): Location[] {
    return globalCache.get(this.KEYS.ALL_LOCATIONS) || (() => {
      const data = locations;
      globalCache.set(this.KEYS.ALL_LOCATIONS, data, CACHE_DURATION.LONG);
      return data;
    })();
  }

  // Get locations by county with caching
  static getLocationsByCounty(county: County): Location[] {
    const key = this.KEYS.LOCATIONS_BY_COUNTY(county);
    
    return globalCache.get(key) || (() => {
      const data = locations.filter(loc => loc.county === county);
      globalCache.set(key, data, CACHE_DURATION.MEDIUM);
      return data;
    })();
  }

  // Get all counties with caching
  static getAllCounties(): CountyInfo[] {
    return globalCache.get(this.KEYS.COUNTIES) || (() => {
      const data = counties;
      globalCache.set(this.KEYS.COUNTIES, data, CACHE_DURATION.DAY);
      return data;
    })();
  }

  // Get county info with caching
  static getCountyInfo(county: County): CountyInfo | undefined {
    const key = this.KEYS.COUNTY_INFO(county);
    
    return globalCache.get(key) || (() => {
      const data = counties.find(c => c.slug === county);
      globalCache.set(key, data, CACHE_DURATION.DAY);
      return data;
    })();
  }

  // Search locations with caching
  static searchLocations(query: string, county?: County): Location[] {
    const key = this.KEYS.LOCATIONS_SEARCH(query, county);
    
    return globalCache.get(key) || (() => {
      const allLocations = county ? this.getLocationsByCounty(county) : this.getAllLocations();
      
      const data = allLocations.filter((location: Location) =>
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.slug.includes(query.toLowerCase())
      );
      
      globalCache.set(key, data, CACHE_DURATION.SHORT);
      return data;
    })();
  }

  // Get locations with pagination
  static getLocationsPaginated(
    page: number = 1,
    limit: number = 20,
    county?: County
  ): { locations: Location[]; total: number; hasMore: boolean } {
    const allLocations = county ? this.getLocationsByCounty(county) : this.getAllLocations();
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      locations: allLocations.slice(start, end),
      total: allLocations.length,
      hasMore: end < allLocations.length,
    };
  }

  // Preload related data for better performance
  static preloadCountyData(county: County): void {
    // Preload county info and locations
    this.getCountyInfo(county);
    this.getLocationsByCounty(county);
    
    // Preload a few related counties' data
    const allCounties = this.getAllCounties();
    const countyIndex = allCounties.findIndex((c: CountyInfo) => c.slug === county);
    
    // Preload adjacent counties for navigation
    [countyIndex - 1, countyIndex + 1].forEach(index => {
      if (index >= 0 && index < allCounties.length) {
        const relatedCounty = allCounties[index].slug;
        this.getCountyInfo(relatedCounty);
        this.getLocationsByCounty(relatedCounty);
      }
    });
  }

  // Cache management methods
  static clearCache(): void {
    globalCache.clear();
  }

  static invalidateCounty(county: County): void {
    // Invalidate county-specific cache
    const keys = [
      this.KEYS.LOCATIONS_BY_COUNTY(county),
      this.KEYS.COUNTY_INFO(county),
    ];
    
    keys.forEach(key => globalCache.delete(key));
    
    // Also invalidate search results for this county (simplified)
    // In a real app, you might want to use a more efficient pattern
    // For now, we'll just clear the entire search cache for simplicity
    const allKeys = globalCache.getCacheKeys();
    allKeys.forEach(cacheKey => {
      if (cacheKey.includes(`locations:search:${county}`)) {
        globalCache.delete(cacheKey);
      }
    });
  }

  static cleanupExpired(): void {
    globalCache.cleanup();
  }

  static getCacheStats() {
    return globalCache.getStats();
  }
}

// Server-side caching with Next.js revalidation
export function getCachedLocationsByCounty(county: County, revalidate: number = 3600): Location[] {
  // In a real app, you might use Next.js cache or a proper database
  // This is a simplified version showing the pattern
  return LocationCache.getLocationsByCounty(county);
}

// Client-side hooks for React
export function useCachedLocations(county?: County): Location[] {
  return county 
    ? LocationCache.getLocationsByCounty(county)
    : LocationCache.getAllLocations();
}

export function useCachedCounties(): CountyInfo[] {
  return LocationCache.getAllCounties();
}

// Background cache warming
export function warmCache(): void {
  // Preload frequently accessed data
  setTimeout(() => {
    LocationCache.getAllLocations();
    LocationCache.getAllCounties();
    
    // Preload main counties
    (['placer', 'nevada', 'sacramento', 'el-dorado'] as County[]).forEach(county => {
      LocationCache.preloadCountyData(county);
    });
  }, 1000);
}
