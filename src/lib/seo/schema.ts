/**
 * SEO Schema.org JSON-LD generators
 */

export interface LocalBusinessSchemaOptions {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
}

/**
 * Generate LocalBusiness schema for SEO
 */
export function generateLocalBusinessSchema(
  options: LocalBusinessSchemaOptions = {}
): Record<string, unknown> {
  const {
    name = "Sierra Property Partners",
    description = "Professional property management services in Northern California",
    url = "https://sierrapropertypartners.com",
    telephone = "+1-XXX-XXX-XXXX", // Update with actual phone
    email = "info@sierrapropertypartners.com",
  } = options;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    telephone,
    email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Roseville",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Roseville",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
      {
        "@type": "City",
        name: "Rocklin",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
      {
        "@type": "City",
        name: "Lincoln",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
    ],
    priceRange: "$$",
    serviceType: ["Property Management", "Leasing", "Maintenance"],
  };
}

/**
 * Generate Service schema for individual service pages
 */
export function generateServiceSchema(
  serviceName: string,
  description: string,
  serviceUrl: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: "Sierra Property Partners",
      url: "https://sierrapropertypartners.com",
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
    url: serviceUrl,
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sierra Property Partners",
    url: "https://sierrapropertypartners.com",
    logo: "https://sierrapropertypartners.com/logo.png",
    description:
      "Professional property management services in Northern California",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "info@sierrapropertypartners.com",
    },
    sameAs: [
      // Add social media URLs here
    ],
  };
}
