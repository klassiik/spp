import { createClient, PhotosWithTotalResults, ErrorResponse } from 'pexels';

// Server-side Pexels API client
const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY || '';

// Log API key status on initialization
if (!API_KEY) {
  console.warn('[Pexels] WARNING: NEXT_PUBLIC_PEXELS_API_KEY is not configured. Pexels images will not load.');
} else {
  console.log('[Pexels] API client initialized successfully');
}

export const pexelsClient = createClient(API_KEY);

// Type guard for Pexels API response
function isPhotosResponse(response: unknown): response is PhotosWithTotalResults {
  return typeof response === 'object' && response !== null && 'photos' in response;
}

function isErrorResponse(response: unknown): response is ErrorResponse {
  return typeof response === 'object' && response !== null && 'error' in response;
}

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  backoffMultiplier: 2,
};

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retry wrapper for API calls
async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  retries: number = RETRY_CONFIG.maxRetries,
  retryDelay: number = RETRY_CONFIG.retryDelay
): Promise<T | null> {
  try {
    return await apiCall();
  } catch (error) {
    if (retries > 0) {
      console.warn(`[Pexels] API call failed, retrying in ${retryDelay}ms... (${retries} retries left)`);
      await delay(retryDelay);
      return retryApiCall(apiCall, retries - 1, retryDelay * RETRY_CONFIG.backoffMultiplier);
    }
    console.error('[Pexels] API call failed after all retries:', error);
    return null;
  }
}

// Search for property/real estate images by location
export async function searchLocationImages(cityName: string, count: number = 1) {
  if (!API_KEY) {
    console.error('[Pexels] Cannot search images: API key not configured');
    return null;
  }

  console.log(`[Pexels] Searching for images: query="${cityName} california property real estate home", count=${count}`);

  try {
    const result = await retryApiCall(async () => {
      return await pexelsClient.photos.search({
        query: `${cityName} california property real estate home`,
        per_page: count,
        orientation: 'landscape',
      });
    });

    if (!result) {
      console.error('[Pexels] Search failed after retries');
      return null;
    }

    if (isErrorResponse(result)) {
      console.error('[Pexels] API error response:', result.error);
      return null;
    }

    if (isPhotosResponse(result)) {
      console.log(`[Pexels] Successfully retrieved ${result.photos.length} images`);
      return result.photos;
    }

    console.warn('[Pexels] Unexpected response format:', result);
    return [];
  } catch (error) {
    console.error('[Pexels] Error fetching images:', error);
    if (error instanceof Error) {
      console.error('[Pexels] Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    return null;
  }
}

// Get a specific photo by ID
export async function getPhotoById(photoId: string) {
  if (!API_KEY) {
    console.error('[Pexels] Cannot get photo: API key not configured');
    return null;
  }

  try {
    // Pexels ID is a number, but we might pass string from other parts of app
    const id = parseInt(photoId, 10);
    if (isNaN(id)) {
      console.error(`[Pexels] Invalid photo ID: ${photoId}`);
      return null;
    }

    console.log(`[Pexels] Fetching photo by ID: ${id}`);

    const result = await retryApiCall(async () => {
      return await pexelsClient.photos.show({ id });
    });

    if (!result) {
      console.error(`[Pexels] Failed to fetch photo ${id} after retries`);
      return null;
    }
    
    if (isErrorResponse(result)) {
      console.error(`[Pexels] API error for photo ${id}:`, result.error);
      return null;
    }

    console.log(`[Pexels] Successfully retrieved photo ${id}`);
    return result;
  } catch (error) {
    console.error(`[Pexels] Error fetching photo ${photoId}:`, error);
    if (error instanceof Error) {
      console.error('[Pexels] Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    return null;
  }
}