import type { Metadata } from "next";
import Link from "next/link";
import ListingsWidget from "@/components/listings/ListingsWidget";
import { HeroImage } from "@/components/ui/hero-image";
import { generateLocalBusinessSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Available Property Listings | Sierra Property Partners",
  description:
    "Browse our current residential and commercial property listings available for rent in Placer, Nevada, Sacramento, and El Dorado counties. Find your perfect rental property today.",
  keywords: [
    "property listings",
    "rental properties",
    "homes for rent",
    "apartments for rent",
    "commercial properties",
    "Roseville rentals",
    "Rocklin rentals",
    "Lincoln rentals",
    "Tahoe rentals",
    "Sacramento rentals",
  ],
  openGraph: {
    title: "Available Property Listings | Sierra Property Partners",
    description:
      "Browse our current residential and commercial property listings available for rent across Northern California.",
    type: "website",
    url: "https://sierrapropertypartners.com/listings",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sierra Property Partners - Available Listings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Available Property Listings | Sierra Property Partners",
    description:
      "Browse our current residential and commercial property listings available for rent across Northern California.",
  },
};

export default function ListingsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sierrapropertypartners.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Listings",
        item: "https://sierrapropertypartners.com/listings",
      },
    ],
  };

  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Listings</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <HeroImage
          config={{
            category: 'service',
            keywords: ['rental properties', 'real estate', 'homes', 'apartments']
          }}
          title="Available Property Listings"
          subtitle="Discover quality rental properties"
          description="Find your perfect home across Northern California's most desirable locations including the Sierra Nevada Foothills, Sacramento Area, and Lake Tahoe Region."
          primaryCTA={{
            text: 'Contact Us',
            href: '/contact'
          }}
          secondaryCTA={{
            text: 'View Services',
            href: '/services'
          }}
        />
        <section className="hidden"> {/* Hidden section to maintain structure */}
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Available Property Listings
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Discover quality rental properties across Northern California
              </p>
              <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Multiple Locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Residential & Commercial</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Updated Daily</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Introduction */}
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <p className="text-foreground text-lg leading-relaxed">
                Browse our current selection of available properties. Our
                listings are updated in real-time to ensure you have access to
                the most current information. Filter by location, property type,
                price range, and more to find your perfect rental home.
              </p>
            </div>

            {/* Listings Widget */}
            <ListingsWidget />

            {/* Additional Information */}
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Quality Properties</h2>
                <p className="text-muted-foreground">
                  Every property is thoroughly vetted and maintained to our high
                  standards.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Quick Response</h2>
                <p className="text-muted-foreground">
                  Interested in a property? Contact us and we'll respond
                  within 24 hours.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Expert Support</h2>
                <p className="text-muted-foreground">
                  Our experienced team is here to guide you through the entire
                  rental process.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
