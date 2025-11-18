import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Home, Building2, Users, CheckCircle2 } from "lucide-react";
import { businessInfo } from "@/lib/data/business";
import { counties } from "@/lib/data/locations";
import { Testimonials } from "@/components/ui/testimonials";
import { SimpleHero } from "@/components/ui/hero-image";

export const metadata: Metadata = {
  title: "Professional Property Management in Northern California | Sierra Property Partners",
  description: "Expert property management services across Placer, Nevada, Sacramento & El Dorado counties. Serving Auburn, Roseville, Folsom, Truckee & 60+ communities with 24/7 support.",
  keywords: [
    "property management Northern California",
    "Auburn property management",
    "Roseville property manager",
    "Folsom property management",
    "Truckee property management",
    "Placer County property manager",
    "Nevada County property management",
    "Sacramento County property manager",
    "El Dorado County property management",
    "residential property management",
    "commercial property management",
    "property manager Sacramento",
    "property manager Auburn",
    "rental property management Northern California",
    "24/7 property management",
  ],
  openGraph: {
    title: "Professional Property Management in Northern California",
    description: "Expert property management services across Northern California with 24/7 support.",
    type: "website",
    url: "https://sierrapropertypartners.com",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <SimpleHero
        title="Professional Property Management Across Northern California"
        subtitle="Expert management for residential and commercial properties"
        category="homepage"
      />
      
      {/* Trust Indicators */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>DRE# 02143978</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>60+ Cities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Core Services</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive property management solutions tailored to your needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Home className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Residential Property Management</CardTitle>
                <CardDescription>
                  Full-service management for single-family homes, condos, and apartments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/services/residential-property-management">
                  <Button variant="link" className="px-0">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Commercial Property Management</CardTitle>
                <CardDescription>
                  Expert oversight for retail, office, and industrial properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/services/commercial-property-management">
                  <Button variant="link" className="px-0">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Tenant Placement & Leasing</CardTitle>
                <CardDescription>
                  Professional screening and placement to find quality tenants quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/services/tenant-placement-leasing">
                  <Button variant="link" className="px-0">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/services">
              <Button variant="default" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Serving 60+ Communities Across Northern California
            </h2>
            <p className="text-lg text-muted-foreground">
              From Lake Tahoe to Sacramento, we provide expert property management throughout the region
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {counties.map((county) => (
              <Card key={county.slug}>
                <CardHeader>
                  <CardTitle>{county.name}</CardTitle>
                  <CardDescription>{county.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/services/${county.slug}`}>
                    <Button variant="link" className="px-0">
                      View Cities <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <Testimonials maxItems={6} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Contact us today to learn how we can help maximize your property investment
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Contact Us Today
                </Button>
              </Link>
              <a href={`tel:${businessInfo.phoneRaw}`}>
                <Button size="lg" variant="outline">
                  Call {businessInfo.phone}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
