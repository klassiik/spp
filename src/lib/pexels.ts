import { createClient, PhotosWithTotalResults, ErrorResponse } from 'pexels';

// Server-side Pexels API client
export const pexelsClient = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY || '');

// Type guard for Pexels API response
function isPhotosResponse(response: unknown): response is PhotosWithTotalResults {
  return typeof response === 'object' && response !== null && 'photos' in response;
}

function isErrorResponse(response: unknown): response is ErrorResponse {
  return typeof response === 'object' && response !== null && 'error' in response;
}

// Search for property/real estate images by location
export async function searchLocationImages(cityName: string, count: number = 1) {
  try {
    const result = await pexelsClient.photos.search({
      query: `${cityName} california property real estate home`,
      per_page: count,
      orientation: 'landscape',
    });

    if (isErrorResponse(result)) {
      console.error("Pexels API error:", result.error);
      return null;
    }

    if (isPhotosResponse(result)) {
      return result.photos;
    }

    return [];
  } catch (error) {
    console.error("Error fetching Pexels images:", error);
    return null;
  }
}

// Get a specific photo by ID
export async function getPhotoById(photoId: string) {
  try {
    // Pexels ID is a number, but we might pass string from other parts of app
    const id = parseInt(photoId, 10);
    if (isNaN(id)) return null;

    const result = await pexelsClient.photos.show({ id });
    
    if (isErrorResponse(result)) {
      console.error("Pexels API error:", result.error);
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error fetching Pexels photo:", error);
    return null;
  }
}