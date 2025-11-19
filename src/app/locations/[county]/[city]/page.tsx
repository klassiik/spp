import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, ArrowRight, Home, Building2, Users } from "lucide-react";
import { locations, getLocationsByCounty, getCountyInfo } from "@/lib/data/locations";
import { getPexelsUrl } from "@/lib/data/pexels-images";
import { businessInfo } from "@/lib/data/business";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { SimpleHero } from "@/components/ui/hero-image";
import type { County } from "@/types/locations";

interface PageProps {
  params: Promise<{ county: string; city: string }>;
}

export async function generateStaticParams() {
  return locations.map((location) => ({
    county: location.county,
    city: location.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { county, city } = await params;
  const location = locations.find((loc) => loc.slug === city && loc.county === county);
  const countyInfo = getCountyInfo(county as County);

  if (!location || !countyInfo) {
    return { title: "Location Not Found" };
  }

  const title = `${location.name} Property Management | Sierra Property Partners`;
  const description = `Professional property management services in ${location.name}, ${countyInfo.name}. Residential & commercial property management, tenant placement, maintenance coordination. Call (530) 823-8604.`;

  return {
    title,
    description,
    keywords: [
      `${location.name} property management`,
      `property manager ${location.name}`,
      `${countyInfo.name} property management`,
      "residential property management",
      "commercial property management",
      location.name,
      countyInfo.name,
    ],
    openGraph: {
      title,
      description,
      images: [getPexelsUrl(location.slug, 1200, 630)],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${county}/${city}`,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { county, city } = await params;
  const location = locations.find((loc) => loc.slug === city && loc.county === county);
  const countyInfo = getCountyInfo(county as County);

  if (!location || !countyInfo) {
    notFound();
  }

  const heroImage = getPexelsUrl(location.slug);
  const nearbyCities = getLocationsByCounty(county as County).filter((loc) => loc.slug !== city).slice(0, 5);

  const localBusinessSchema = generateLocalBusinessSchema({
    cityName: location.name,
    countyName: countyInfo.name,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: process.env.NEXT_PUBLIC_SITE_URL || '' },
    { name: "Services", url: `${process.env.NEXT_PUBLIC_SITE_URL}/services` },
    { name: countyInfo.name, url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${county}` },
    { name: location.name, url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${county}/${city}` },
  ]);

  return (
    <>
      {/* Hero Section */}
      <SimpleHero
        title={`Property Management in ${location.name}`}
        subtitle={`Serving ${countyInfo.name} with professional property management`}
        category="location"
        location={city}
      />

      {/* Breadcrumb */}
      <section className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/locations/${county}`} className="hover:text-primary transition-colors">{countyInfo.name}</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{location.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-3xl font-bold">
                Expert Property Management Services in {location.name}
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p>
                  Sierra Property Partners provides comprehensive property management services throughout {location.name} and the greater {countyInfo.name} area. 
                  Our team of experienced professionals understands the unique characteristics of the {location.name} market and delivers customized management solutions 
                  that maximize your investment returns while minimizing your stress.
                </p>

                <p>
                  Whether you own residential properties, commercial buildings, or a mixed portfolio in {location.name}, we offer full-service management including 
                  tenant placement, rent collection, maintenance coordination, financial reporting, and legal compliance. Our local expertise ensures your properties 
                  are managed with the highest standards of professionalism and care.
                </p>

                <h3 className="mt-8 mb-4 text-2xl font-bold">Our Services in {location.name}</h3>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <Home className="mb-2 h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">Residential Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete management for single-family homes, condos, and apartments in {location.name}.
                    </p>
                    <Link href="/services/residential-property-management">
                      <Button variant="link" className="px-0">Learn More</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Building2 className="mb-2 h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">Commercial Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Professional oversight for retail, office, and industrial properties in {location.name}.
                    </p>
                    <Link href="/services/commercial-property-management">
                      <Button variant="link" className="px-0">Learn More</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Users className="mb-2 h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">Tenant Placement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Rigorous screening and professional placement of quality tenants in {location.name}.
                    </p>
                    <Link href="/services/tenant-placement-leasing">
                      <Button variant="link" className="px-0">Learn More</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Full-Service Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      24/7 maintenance, financial reporting, legal compliance, and more for {location.name} properties.
                    </p>
                    <Link href="/services">
                      <Button variant="link" className="px-0">View All Services</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>Get started with professional property management in {location.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium">{businessInfo.address.street}</div>
                      <div className="text-muted-foreground">{businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <a href={`tel:${businessInfo.phoneRaw}`} className="text-sm font-medium hover:underline">
                      {businessInfo.phone}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium">Office Hours</div>
                      <div className="text-muted-foreground">Mon-Fri: {businessInfo.hours.monday}</div>
                      <div className="text-muted-foreground">Sat-Sun: {businessInfo.hours.saturday}</div>
                    </div>
                  </div>

                  <Link href={`/contact?city=${location.slug}&county=${county}`} className="block">
                    <Button className="w-full" size="lg">
                      Request Free Consultation
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Nearby Cities */}
              {nearbyCities.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Nearby Cities</CardTitle>
                    <CardDescription>We also serve these {countyInfo.name} communities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {nearbyCities.map((nearbyCity) => (
                        <li key={nearbyCity.slug}>
                          <Link
                            href={`/services/${county}/${nearbyCity.slug}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {nearbyCity.name} Property Management
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/services/${county}`} className="mt-4 block">
                      <Button variant="outline" size="sm" className="w-full">
                        View All {countyInfo.name} Cities
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

