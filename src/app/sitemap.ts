import { MetadataRoute } from "next";
import { locations } from "@/lib/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sierrapropertypartners.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `/listings`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Location pages (60+ pages)
  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.county}/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Service detail pages (21 pages)
  const servicePages: MetadataRoute.Sitemap = [
    "residential-property-management",
    "commercial-property-management",
    "tenant-placement-leasing",
    "rent-collection-accounting",
    "maintenance-repairs-coordination",
    "property-inspections",
    "eviction-services-management",
    "lease-renewals-extensions",
    "owner-tenant-communication",
    "property-marketing-advertising",
    "financial-reporting-tax-documentation",
    "hoa-management-services",
    "vendor-management",
    "move-in-move-out-coordination",
    "lease-compliance-enforcement",
    "24-7-emergency-support",
    "insurance-risk-management",
    "property-renovation-improvement",
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...locationPages, ...servicePages];
}
