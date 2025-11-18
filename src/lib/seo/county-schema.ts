import { CountyInfo } from "@/types/locations";

export function generateCountySchema(county: CountyInfo) {
  const baseUrl = "https://sierrapropertypartners.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Property Management Services in ${county.name}`,
    "description": county.seoDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sierra Property Partners",
      "url": baseUrl,
      "telephone": "+1-916-771-9000",
      "areaServed": {
        "@type": "County",
        "name": county.name,
        "containedInPlace": {
          "@type": "State",
          "name": "California"
        }
      },
      "serviceArea": county.marketStats.majorCities.map(city => ({
        "@type": "City",
        "name": city,
        "containedInPlace": county.name
      }))
    },
    "serviceType": "Property Management",
    "offers": {
      "@type": "Offer",
      "itemOffered": [
        {
          "@type": "Service",
          "name": "Residential Property Management",
          "description": "Complete residential property management services including tenant screening, rent collection, and maintenance coordination"
        },
        {
          "@type": "Service", 
          "name": "Commercial Property Management",
          "description": "Professional commercial property management for offices, retail spaces, and industrial properties"
        },
        {
          "@type": "Service",
          "name": "Tenant Placement & Leasing",
          "description": "Comprehensive tenant placement services with detailed screening and lease management"
        }
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Property Management Services",
      "itemListElement": county.marketStats.propertyTypes.map((propertyType, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Product",
          "name": `${propertyType} Management`,
          "category": propertyType
        }
      }))
    },
    "url": `${baseUrl}/locations/${county.slug}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$$$",
    "knowsAbout": [
      "Property Management",
      "Real Estate Management", 
      "Rental Property",
      "Tenant Screening",
      "Property Maintenance",
      ...county.keywords
    ],
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What property management services does Sierra Property Partners offer in ${county.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Sierra Property Partners provides comprehensive property management services throughout ${county.name}, including residential and commercial property management, tenant placement, rent collection, maintenance coordination, and financial reporting for property owners.`
          }
        },
        {
          "@type": "Question", 
          "name": `How much does property management cost in ${county.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Property management fees in ${county.name} typically range from 8-12% of monthly rent, with additional fees for tenant placement and lease renewal. Contact us for a customized quote based on your specific property needs.`
          }
        },
        {
          "@type": "Question",
          "name": `What areas does Sierra Property Partners serve in ${county.name}?`,
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": `We serve all major cities throughout ${county.name}, including ${county.marketStats.majorCities.join(", ")} and surrounding communities. Our team has local expertise in each market we serve.`
          }
        }
      ]
    }
  };
}