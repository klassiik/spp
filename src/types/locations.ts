export type County = "placer" | "nevada" | "sacramento" | "el-dorado";

export interface Location {
  slug: string;
  name: string;
  county: County;
  zipCodes?: string[];
}

export interface CountyInfo {
  slug: County;
  name: string;
  description: string;
  seoDescription: string;
  keywords: string[];
  marketStats: {
    medianRent: string;
    averageRent: string;
    vacancyRate: string;
    population: string;
    majorCities: string[];
    propertyTypes: string[];
  };
}
