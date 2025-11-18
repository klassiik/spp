import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, ArrowRight } from "lucide-react";
import { counties, getLocationsByCounty, getCountyInfo } from "@/lib/data/locations";
import { businessInfo } from "@/lib/data/business";
import type { County } from "@/types/locations";
import { generateCountySchema } from "@/lib/seo/county-schema";
import { HeroImage, SimpleHero } from "@/components/ui/hero-image";

interface PageProps {
  params: Promise<{ county: string }>;
}

export async function generateStaticParams() {
  return counties.map((county) => ({
    county: county.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { county: countySlug } = await params;
  const county = getCountyInfo(countySlug as County);

  if (!county) {
    return {
      title: "County Not Found",
    };
  }

  const title = `Property Management in ${county.name} | Sierra Property Partners`;
  const description = county.seoDescription;

  return {
    title,
    description,
    keywords: [...county.keywords, "property management", "rental management", "real estate management", "landlord services", "tenant placement"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://sierrapropertypartners.com/locations/${countySlug}`,
    },
    alternates: {
      canonical: `https://sierrapropertypartners.com/locations/${countySlug}`,
    },
  };
}

export default async function CountyPage({ params }: PageProps) {
  const { county: countySlug } = await params;
  const county = getCountyInfo(countySlug as County);
  
  if (!county) {
    notFound();
  }

  const locations = getLocationsByCounty(countySlug as County);
  const schema = generateCountySchema(county);

  return (
    <div className="min-h-screen">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
      {/* Hero Section with Dynamic Image */}
      <SimpleHero
        title={`Property Management in ${county.name}`}
        subtitle={county.description}
        category="location"
        location={countySlug}
      />

      {/* Market Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              {county.name} Rental Market Overview
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Current market data and property management insights for {county.name}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Median Rent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{county.marketStats.medianRent}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Rent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{county.marketStats.averageRent}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Vacancy Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{county.marketStats.vacancyRate}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Population
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{county.marketStats.population}</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Major Cities We Serve</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {county.marketStats.majorCities.map((city) => (
                    <Link
                      key={city}
                      href={`/locations/${countySlug}/${city.toLowerCase().replace(' ', '-')}`}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary hover:bg-primary/20 transition-colors"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {county.marketStats.propertyTypes.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold">
              Cities We Serve in {county.name}
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional property management services across {locations.length} cities in {county.name}.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Card key={location.slug} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <CardTitle className="text-xl">{location.name}</CardTitle>
                  </div>
                  <CardDescription>
                    {county.name}, California
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="px-0">
                    <Link href={`/locations/${countySlug}/${location.slug}`}>
                      View Property Management Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="border-t bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Why Choose Sierra Property Partners in {county.name}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Local expertise with professional service across Northern California
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Home className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Local Market Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Deep understanding of {county.name} real estate markets and rental trends.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Comprehensive Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Serving {locations.length} cities throughout {county.name} with consistent quality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ArrowRight className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Full-Service Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From tenant screening to maintenance coordination, we handle everything.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section for Featured Snippets */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Property Management FAQ for {county.name}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Common questions about property management in {county.name}
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">How much does property management cost in {county.name}?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Property management fees in {county.name} typically range from 8-12% of monthly rent, with additional fees for tenant placement and lease renewal. Our {county.marketStats.medianRent} median rent means management fees average $192-288 per month for a typical property. Contact us for a customized quote based on your specific property needs.
                </p>
                <div className="mt-4">
                  <Button variant="link" asChild className="px-0">
                    <Link href="/contact">Get Your Free Quote</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What services are included in property management?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our comprehensive property management in {county.name} includes: tenant screening and placement, rent collection and financial reporting, maintenance coordination and emergency repairs, lease management and renewal, marketing and advertising vacant properties, legal compliance and tenant relations, and detailed monthly statements for property owners.
                </p>
                <div className="mt-4">
                  <Button variant="link" asChild className="px-0">
                    <Link href="/services">View All Services</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Which cities in {county.name} do you manage properties in?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sierra Property Partners serves all major cities throughout {county.name}, including {county.marketStats.majorCities.slice(0, 3).join(", ")} and {county.marketStats.majorCities.length - 3}+ other communities. We provide consistent, professional property management services across all {locations.length} cities in {county.name}.
                </p>
                <div className="mt-4">
                  <Button variant="link" asChild className="px-0">
                    <Link href={`/locations/${countySlug}`}>See All Cities We Serve</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What types of properties do you manage in {county.name}?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We manage all types of properties in {county.name}, including {county.marketStats.propertyTypes.slice(0, 3).join(", ")} and other residential properties. Our team has specialized expertise in each property type, from {county.name}'s luxury estates to rental properties and mountain cabins.
                </p>
                <div className="mt-4">
                  <Button variant="link" asChild className="px-0">
                    <Link href="/services">Explore Property Types</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seasonal Market Trends Section */}
      <section className="border-t bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              {county.name} Market Trends & Insights
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Understanding the rental market in {county.name}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Market Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">Rental Demand</p>
                  <p className="text-sm text-muted-foreground">
                    Strong demand with {county.marketStats.vacancyRate} vacancy rate indicates a healthy rental market.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Rent Growth</p>
                  <p className="text-sm text-muted-foreground">
                    Median rent of {county.marketStats.medianRent} shows steady appreciation in property values.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Investment Outlook</p>
                  <p className="text-sm text-muted-foreground">
                    {county.name} offers attractive investment opportunities with growing population and stable rental demand.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Considerations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">Peak Season</p>
                  <p className="text-sm text-muted-foreground">
                    Summer months (June-August) see highest rental activity and competition for quality tenants.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Winter Maintenance</p>
                  <p className="text-sm text-muted-foreground">
                    Mountain properties may require additional winterization and weather-related maintenance.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Year-Round Management</p>
                  <p className="text-sm text-muted-foreground">
                    Our team provides consistent service throughout all seasons in {county.name}.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border-primary">
            <CardContent className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-3xl font-bold">
                Ready to Get Started in {county.name}?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Contact us today for a free consultation and property evaluation.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`tel:${businessInfo.phoneRaw}`}>
                    Call {businessInfo.phone}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
