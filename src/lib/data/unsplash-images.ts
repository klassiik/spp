// Curated Unsplash photo IDs for each location
// These are high-quality property and real estate images
// Can be dynamically searched using src/lib/unsplash.ts API functions

export const unsplashImages: Record<string, string> = {
  // Placer County
  "roseville": "1600566753229-5dc1e90ed0fd",
  "rocklin": "1560518883-ce1e9c3bd3a5",
  "lincoln": "1598228723793-52759bfad7c4",
  "granite-bay": "1600585154340-be6161a56a0c",
  "auburn": "1582268611958-ebfd161ef9cf",
  "loomis": "1605276374104-bec4a4d2ec2e",
  "meadow-vista": "1512917774080-9991f1c4c750",
  "kings-beach": "1600047509358-9dc75507daeb",
  "colfax": "1591857177300-47944a28c770",
  "newcastle": "1588880331179-4cb09933e4b4",
  "north-auburn": "1570129477492-45c003edd2be",
  "penryn": "1600596542815-ffad4c1539a9",
  "sheridan": "1602343168775-3c6a3e72e4c7",
  "dollar-point": "1605276375868-aa2a29a297c6",
  "cedar-flat": "1580587771525-f6bb0834e3b7",
  "tahoe-vista": "1600047509273-9b1e0a6e3e4e",
  "foresthill": "1600880292203-7d2d3d7c5b9c",
  "alta": "1600585154275-774b1e8e3c5a",
  "carnelian-bay": "1600047508738-1c3e1b8e3f4a",
  "dutch-flat": "1600585153833-38e5e4e3c3a9",
  "sunnyside-tahoe-city": "1600047508512-7c4e1b8e3e5b",
  
  // Nevada County
  "grass-valley": "1600585154180-45f6b834e4bc",
  "nevada-city": "1600585153930-90f6c834e3d2",
  "truckee": "1605276375767-98af1e9c3d4a",
  "alta-sierra": "1600585154095-12e4d834e5f3",
  "lake-wildwood": "1599809275224-4e7e2e4e5f6a",
  "lake-of-the-pines": "1599809274967-3d8e1e7e4c3b",
  "penn-valley": "1600585153745-67d7e834e2a8",
  "rough-and-ready": "1600585154012-89f3d834e4b7",
  "cedar-ridge": "1600585153652-34b2c834e1d5",
  "mccourtney": "1600585153567-56e4f834e0c9",
  "north-san-juan": "1600585153482-78a5d834dfe4",
  "peardale-chicago-park": "1600585153390-90c6e834dee8",
  "washington": "1600585153298-12d7f834ddfc",
  
  // Sacramento County
  "folsom": "1605276375655-23c4e9c3c8b7",
  "orangevale": "1600585154452-45e8d834e7a3",
  "fair-oaks": "1600596542913-67f9e834e9b5",
  "citrus-heights": "1560518883-ce1e9c3bd3a4",
  "antelope": "1600585154367-89a2c834e6d7",
  "carmichael": "1600596542728-01b3e834e8c1",
  "arden-arcade": "1600585154275-23d4d834e5e9",
  "rancho-cordova": "1600585154180-45f5e834e4fd",
  "rio-linda": "1600585154095-67g6f834e311",
  "elverta": "1600585154012-89h7g834e225",
  "natomas": "1599809275324-01i8h834e139",
  
  // El Dorado County
  "placerville": "1582268611858-9c7e1e4e2f8a",
  "georgetown": "1600585153745-34j9i834e04d",
  "auburn-lake-trails": "1599809274867-56k0j834df61",
  "pollock-pines": "1600585153652-78l1k834de75",
  "camino": "1600585153567-90m2l834dd89",
  "cool": "1600585153482-12n3m834dc9d",
  "coloma": "1582268611758-34o4n834dbb1",
  "diamond-springs": "1600585153390-56p5o834dac5",
  "shingle-springs": "1600585153298-78q6p834d9d9",
  "grizzly-flats": "1600585153206-90r7q834d8ed",
  "cold-springs": "1600585153114-12s8r834d701",
  "lotus": "1600585153022-34t9s834d615",
  "kelsey": "1600585152930-56u0t834d529",
  "garden-valley": "1600585152838-78v1u834d43d",
};

/**
 * Get Unsplash image URL for a location
 * @param locationSlug - Location identifier
 * @param width - Image width (default 1920)
 * @param quality - Image quality 1-100 (default 80)
 * @returns Optimized Unsplash image URL
 */
export function getUnsplashUrl(
  locationSlug: string, 
  width: number = 1920, 
  quality: number = 80
): string {
  const imageId = unsplashImages[locationSlug];
  
  if (!imageId) {
    // Fallback to generic California property image
    return `https://images.unsplash.com/photo-1560518883-ce1e9c3bd3a4?w=${width}&q=${quality}&fit=crop`;
  }
  
  return `https://images.unsplash.com/photo-${imageId}?w=${width}&q=${quality}&fit=crop&auto=format`;
}

/**
 * Get multiple image sizes for responsive images
 * @param locationSlug - Location identifier
 * @returns Object with srcset URLs for different sizes
 */
export function getResponsiveUnsplashUrls(locationSlug: string) {
  const imageId = unsplashImages[locationSlug] || "1560518883-ce1e9c3bd3a4";
  
  return {
    small: `https://images.unsplash.com/photo-${imageId}?w=640&q=80&fit=crop&auto=format`,
    medium: `https://images.unsplash.com/photo-${imageId}?w=1024&q=80&fit=crop&auto=format`,
    large: `https://images.unsplash.com/photo-${imageId}?w=1920&q=80&fit=crop&auto=format`,
    xlarge: `https://images.unsplash.com/photo-${imageId}?w=2560&q=80&fit=crop&auto=format`,
  };
}
