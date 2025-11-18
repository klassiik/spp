import { createApi } from "unsplash-js";

// Server-side Unsplash API client
export const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "",
});

// Search for property/real estate images by location
export async function searchLocationImages(cityName: string, count: number = 1) {
  try {
    const result = await unsplash.search.getPhotos({
      query: `${cityName} california property real estate home`,
      page: 1,
      perPage: count,
      orientation: "landscape",
    });

    if (result.errors) {
      console.error("Unsplash API error:", result.errors);
      return null;
    }

    return result.response?.results || [];
  } catch (error) {
    console.error("Error fetching Unsplash images:", error);
    return null;
  }
}

// Get a specific photo by ID
export async function getPhotoById(photoId: string) {
  try {
    const result = await unsplash.photos.get({ photoId });
    
    if (result.errors) {
      console.error("Unsplash API error:", result.errors);
      return null;
    }

    return result.response;
  } catch (error) {
    console.error("Error fetching Unsplash photo:", error);
    return null;
  }
}

// Trigger download endpoint (required by Unsplash API guidelines)
export async function trackDownload(downloadLocation: string) {
  try {
    await fetch(downloadLocation);
  } catch (error) {
    console.error("Error tracking download:", error);
  }
}
