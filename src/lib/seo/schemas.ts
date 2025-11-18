import { businessInfo } from "@/lib/data/business";
import type { County } from "@/types/locations";

interface LocalBusinessSchemaProps {
  cityName?: string;
  countyName?: string;
  additionalType?: string;
}

export function generateLocalBusinessSchema({
  cityName,
  countyName,
  additionalType = "RealEstateAgent",
}: LocalBusinessSchemaProps = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RealEstateAgent", additionalType],
    name: businessInfo.name,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/logo.png`,
    "@id": process.env.NEXT_PUBLIC_SITE_URL || '',
    url: process.env.NEXT_PUBLIC_SITE_URL || '',
    telephone: businessInfo.phone,
    email: businessInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.state,
      postalCode: businessInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "38.8997",
      longitude: "-121.0769",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
  } as Record<string, unknown>;

  // Add areaServed if city/county provided
  if (cityName || countyName) {
    const areaServed = {
      "@type": "City",
      name: cityName || countyName,
    } as Record<string, unknown>;
    
    if (countyName) {
      areaServed.containedInPlace = {
        "@type": "AdministrativeArea",
        name: `${countyName}, California`,
      };
    }
    
    schema.areaServed = areaServed;
  }

  return schema;
}

export function generateServiceSchema(serviceName: string, serviceDescription: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "LocalBusiness",
      name: businessInfo.name,
      telephone: businessInfo.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: businessInfo.address.street,
        addressLocality: businessInfo.address.city,
        addressRegion: businessInfo.address.state,
        postalCode: businessInfo.address.zip,
      },
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
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

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessInfo.name,
    url: process.env.NEXT_PUBLIC_SITE_URL || '',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: businessInfo.phone,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "en",
    },
    sameAs: [
      businessInfo.social.facebook,
      businessInfo.social.linkedin,
      businessInfo.social.instagram,
    ].filter(Boolean),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[], serviceTitle?: string) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } as Record<string, unknown>;

  // Add service-specific context if serviceTitle is provided
  if (serviceTitle) {
    (schema.mainEntity as unknown[]).forEach((question: unknown) => {
      (question as Record<string, unknown>).about = {
        "@type": "Service",
        name: serviceTitle,
        provider: {
          "@type": "Organization",
          name: businessInfo.name,
        },
      };
    });
  }

  return schema;
}
