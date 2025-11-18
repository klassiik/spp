import { County, CountyInfo, Location } from "@/types/locations";

export const counties: CountyInfo[] = [
  {
    slug: "placer",
    name: "Placer County",
    description: "Professional property management services across Placer County, from Roseville to Lake Tahoe communities. Serving 22+ cities including Auburn, Granite Bay, and Rocklin with expert residential and commercial property management.",
    seoDescription: "Property management in Placer County, California. Expert services in Roseville, Rocklin, Auburn, Lincoln & 22+ cities. Residential & commercial property management.",
    keywords: ["placer county property management", "roseville property management", "rocklin rental management", "auburn property manager", "granite bay real estate management"],
    marketStats: {
      medianRent: "$2,400",
      averageRent: "$2,200",
      vacancyRate: "3.2%",
      population: "400,000+",
      majorCities: ["Roseville", "Rocklin", "Auburn", "Lincoln", "Granite Bay"],
      propertyTypes: ["Single Family Homes", "Townhomes", "Condos", "Luxury Properties", "Lake Tahoe Rentals"]
    }
  },
  {
    slug: "nevada",
    name: "Nevada County",
    description: "Comprehensive property management in Nevada County's mountain communities and foothill cities. Serving Grass Valley, Truckee, Nevada City & 10+ communities with specialized mountain property management.",
    seoDescription: "Nevada County property management services. Expert property managers in Grass Valley, Truckee, Nevada City & mountain communities. Rental property management Northern California.",
    keywords: ["nevada county property management", "grass valley property management", "truckee rental management", "nevada city property manager", "mountain property management"],
    marketStats: {
      medianRent: "$2,800",
      averageRent: "$2,500",
      vacancyRate: "4.1%",
      population: "100,000+",
      majorCities: ["Grass Valley", "Truckee", "Nevada City", "Lake Wildwood", "Lake of the Pines"],
      propertyTypes: ["Mountain Cabins", "Ski Condos", "Historic Homes", "Luxury Estates", "Recreation Properties"]
    }
  },
  {
    slug: "sacramento",
    name: "Sacramento County",
    description: "Expert property management throughout North and East Sacramento County communities. Serving Folsom, Orangevale, Fair Oaks & 8+ cities with professional property management solutions.",
    seoDescription: "Property management Sacramento County CA. Professional property managers in Folsom, Orangevale, Fair Oaks, Citrus Heights & Sacramento area rental properties.",
    keywords: ["sacramento county property management", "folsom property management", "orangevale rental management", "fair oaks property manager", "citrus heights real estate"],
    marketStats: {
      medianRent: "$2,200",
      averageRent: "$2,000",
      vacancyRate: "2.8%",
      population: "150,000+",
      majorCities: ["Folsom", "Orangevale", "Fair Oaks", "Citrus Heights", "Carmichael"],
      propertyTypes: ["Single Family", "Townhomes", "Condos", "Senior Living", "Luxury Homes"]
    }
  },
  {
    slug: "el-dorado",
    name: "El Dorado County",
    description: "Trusted property management services in Northern El Dorado County from foothills to mountains. Serving Placerville, Georgetown, Pollock Pines & 11+ communities with specialized property management.",
    seoDescription: "El Dorado County property management. Property managers in Placerville, Georgetown, Pollock Pines & Northern El Dorado County. Residential property management services.",
    keywords: ["el dorado county property management", "placerville property management", "georgetown rental management", "pollock pines property manager", "foothill property management"],
    marketStats: {
      medianRent: "$2,600",
      averageRent: "$2,400",
      vacancyRate: "3.7%",
      population: "85,000+",
      majorCities: ["Placerville", "Georgetown", "Pollock Pines", "Diamond Springs", "Shingle Springs"],
      propertyTypes: ["Mountain Homes", "Historic Properties", "Luxury Estates", "Ranch Properties", "Recreation Cabins"]
    }
  }
];

export const locations: Location[] = [
  // Placer County (22 cities)
  { slug: "roseville", name: "Roseville", county: "placer" },
  { slug: "rocklin", name: "Rocklin", county: "placer" },
  { slug: "lincoln", name: "Lincoln", county: "placer" },
  { slug: "granite-bay", name: "Granite Bay", county: "placer" },
  { slug: "auburn", name: "Auburn", county: "placer" },
  { slug: "loomis", name: "Loomis", county: "placer" },
  { slug: "meadow-vista", name: "Meadow Vista", county: "placer" },
  { slug: "kings-beach", name: "Kings Beach", county: "placer" },
  { slug: "colfax", name: "Colfax", county: "placer" },
  { slug: "newcastle", name: "Newcastle", county: "placer" },
  { slug: "north-auburn", name: "North Auburn", county: "placer" },
  { slug: "penryn", name: "Penryn", county: "placer" },
  { slug: "sheridan", name: "Sheridan", county: "placer" },
  { slug: "dollar-point", name: "Dollar Point", county: "placer" },
  { slug: "cedar-flat", name: "Cedar Flat", county: "placer" },
  { slug: "tahoe-vista", name: "Tahoe Vista", county: "placer" },
  { slug: "foresthill", name: "Foresthill", county: "placer" },
  { slug: "alta", name: "Alta", county: "placer" },
  { slug: "carnelian-bay", name: "Carnelian Bay", county: "placer" },
  { slug: "dutch-flat", name: "Dutch Flat", county: "placer" },
  { slug: "sunnyside-tahoe-city", name: "Sunnyside-Tahoe City", county: "placer" },
  
  // Nevada County (13 cities)
  { slug: "grass-valley", name: "Grass Valley", county: "nevada" },
  { slug: "nevada-city", name: "Nevada City", county: "nevada" },
  { slug: "truckee", name: "Truckee", county: "nevada" },
  { slug: "alta-sierra", name: "Alta Sierra", county: "nevada" },
  { slug: "lake-wildwood", name: "Lake Wildwood", county: "nevada" },
  { slug: "lake-of-the-pines", name: "Lake of the Pines", county: "nevada" },
  { slug: "penn-valley", name: "Penn Valley", county: "nevada" },
  { slug: "rough-and-ready", name: "Rough and Ready", county: "nevada" },
  { slug: "cedar-ridge", name: "Cedar Ridge", county: "nevada" },
  { slug: "mccourtney", name: "McCourtney", county: "nevada" },
  { slug: "north-san-juan", name: "North San Juan", county: "nevada" },
  { slug: "peardale-chicago-park", name: "Peardale/Chicago Park", county: "nevada" },
  { slug: "washington", name: "Washington", county: "nevada" },
  
  // Sacramento County (11 cities)
  { slug: "folsom", name: "Folsom", county: "sacramento" },
  { slug: "orangevale", name: "Orangevale", county: "sacramento" },
  { slug: "fair-oaks", name: "Fair Oaks", county: "sacramento" },
  { slug: "citrus-heights", name: "Citrus Heights", county: "sacramento" },
  { slug: "antelope", name: "Antelope", county: "sacramento" },
  { slug: "carmichael", name: "Carmichael", county: "sacramento" },
  { slug: "arden-arcade", name: "Arden-Arcade", county: "sacramento" },
  { slug: "rancho-cordova", name: "Rancho Cordova", county: "sacramento" },
  { slug: "rio-linda", name: "Rio Linda", county: "sacramento" },
  { slug: "elverta", name: "Elverta", county: "sacramento" },
  { slug: "natomas", name: "Natomas", county: "sacramento" },
  
  // El Dorado County (14 cities)
  { slug: "placerville", name: "Placerville", county: "el-dorado" },
  { slug: "georgetown", name: "Georgetown", county: "el-dorado" },
  { slug: "auburn-lake-trails", name: "Auburn Lake Trails", county: "el-dorado" },
  { slug: "pollock-pines", name: "Pollock Pines", county: "el-dorado" },
  { slug: "camino", name: "Camino", county: "el-dorado" },
  { slug: "cool", name: "Cool", county: "el-dorado" },
  { slug: "coloma", name: "Coloma", county: "el-dorado" },
  { slug: "diamond-springs", name: "Diamond Springs", county: "el-dorado" },
  { slug: "shingle-springs", name: "Shingle Springs", county: "el-dorado" },
  { slug: "grizzly-flats", name: "Grizzly Flats", county: "el-dorado" },
  { slug: "cold-springs", name: "Cold Springs", county: "el-dorado" },
  { slug: "lotus", name: "Lotus", county: "el-dorado" },
  { slug: "kelsey", name: "Kelsey", county: "el-dorado" },
  { slug: "garden-valley", name: "Garden Valley", county: "el-dorado" },
];

export function getLocationsByCounty(county: County): Location[] {
  return locations.filter(loc => loc.county === county);
}

export function getCountyInfo(county: County): CountyInfo | undefined {
  return counties.find(c => c.slug === county);
}
