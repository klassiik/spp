import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { businessInfo } from "@/lib/data/business";
import { counties } from "@/lib/data/locations";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { HeroImage } from "@/components/ui/hero-image";
import { Testimonials } from "@/components/ui/testimonials";
import {
  Building2,
  MapPin,
  Shield,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Heart,
  Target,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Sierra Property Partners | Auburn Property Management Company | Northern California",
  description:
    "Learn about Sierra Property Partners, Auburn's trusted property management company serving 60+ communities across Placer, Nevada, Sacramento & El Dorado counties since our founding.",
  keywords: [
    "about Sierra Property Partners",
    "Auburn property management company",
    "Northern California property management",
    "Placer County property manager",
    "Nevada County property management",
    "Sacramento County property manager",
    "El Dorado County property management",
    "Roseville property manager",
    "Folsom property management",
    "Truckee property management",
    "professional property management team",
    "property management expertise Northern California",
    "rental property management company Auburn",
    "experienced property managers Sierra foothills",
  ],
  openGraph: {
    title: "About Sierra Property Partners | Professional Property Management Company",
    description:
      "Learn about Sierra Property Partners, Auburn's trusted property management company serving 60+ communities across Northern California.",
    type: "website",
    url: "https://sierrapropertypartners.com/about",
  },
};

export default function AboutPage() {
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://sierrapropertypartners.com" },
    { name: "About", url: "https://sierrapropertypartners.com/about" },
  ]);

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
              <span className="text-foreground font-medium">About</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <HeroImage
          config={{
            category: 'about',
            keywords: ['professional', 'property management', 'team', 'office']
          }}
          title="About Sierra Property Partners"
          subtitle="Northern California's trusted property management partner"
          description="Delivering exceptional service across 60+ communities in the Sierra foothills and Sacramento region."
          primaryCTA={{
            text: 'Get Started Today',
            href: '/contact'
          }}
          secondaryCTA={{
            text: 'View Our Services',
            href: '/services'
          }}
        />

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Story</h2>
                <div className="w-20 h-1 bg-primary mx-auto"></div>
              </div>

              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Founded in Auburn, California, Sierra Property Partners emerged from a simple yet
                  powerful vision: to provide property owners throughout Northern California with
                  professional management services that treat every property as if it were our own.
                  What started as a local operation serving the Auburn area has grown into a
                  comprehensive property management company serving over 60 communities across four
                  counties.
                </p>

                <p>
                  Our journey began with a deep understanding of the unique challenges facing
                  property owners in the Sierra foothills and Sacramento region. From mountain
                  properties in Lake Tahoe and Truckee requiring specialized winterization and
                  seasonal management, to suburban rental homes in Roseville and Folsom competing in
                  dynamic markets, to historic Gold Country properties in Nevada City and
                  Placerville demanding preservation-minded stewardship—we recognized that
                  successful property management requires local expertise combined with professional
                  systems.
                </p>

                <p>
                  Today, Sierra Property Partners manages residential and commercial properties
                  throughout Placer, Nevada, Sacramento, and El Dorado counties, serving property
                  owners who range from first-time investors with a single rental property to
                  sophisticated portfolio owners with multiple properties across our service area.
                  Regardless of portfolio size, every owner receives the same dedication,
                  transparency, and results-driven management that has built our reputation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Mission & Values
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Target className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To maximize property owner returns through professional management excellence,
                      proactive maintenance, and exceptional tenant relations while maintaining the
                      highest standards of integrity and transparency.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Shield className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Integrity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We operate with unwavering honesty and transparency, treating every property
                      and every dollar as if it were our own, and making decisions that prioritize
                      long-term owner success over short-term gains.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Heart className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Service Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Exceptional service extends to everyone we interact with—property owners
                      deserve complete transparency, tenants deserve responsive professionalism, and
                      vendors deserve fair treatment and prompt payment.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Sparkles className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We embrace technology and evolving best practices to provide owners with
                      real-time property visibility, streamlined operations, and data-driven
                      insights that inform strategic decisions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Why Property Owners Choose Us
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Local Market Expertise</h3>
                    <p className="text-muted-foreground text-sm">
                      Deep understanding of 60+ communities across four counties, from mountain
                      properties to suburban rentals to historic homes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Professional Tenant Screening
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Rigorous screening processes reducing problem tenancies by 90% while
                      maintaining fair housing compliance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">24/7 Emergency Response</h3>
                    <p className="text-muted-foreground text-sm">
                      Round-the-clock emergency hotline with 2-4 hour response times protecting
                      properties and tenant safety.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Transparent Financial Reporting
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Detailed monthly statements within 5 business days with 24/7 owner portal
                      access to real-time data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Vetted Contractor Network</h3>
                    <p className="text-muted-foreground text-sm">
                      Licensed, insured vendors providing quality work at competitive rates 15-25%
                      below retail pricing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Legal Compliance Expertise</h3>
                    <p className="text-muted-foreground text-sm">
                      Comprehensive knowledge of California landlord-tenant law, fair housing
                      requirements, and local ordinances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Testimonials maxItems={3} showTitle={false} />
          </div>
        </section>

        {/* By the Numbers */}
        <section className="py-16 bg-muted text-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">By the Numbers</h2>
                <div className="w-20 h-1 bg-primary mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">60+</div>
                  <div className="text-muted-foreground">Communities Served</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">4</div>
                  <div className="text-muted-foreground">Counties Covered</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">96%</div>
                  <div className="text-muted-foreground">Average Occupancy Rate</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">21</div>
                  <div className="text-muted-foreground">Comprehensive Services</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Service Area
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  We proudly serve property owners across Northern California's most desirable
                  rental markets, from mountain communities to suburban neighborhoods to historic
                  Gold Country towns.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {counties.map((county) => (
                  <Card key={county.slug} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <MapPin className="h-8 w-8 text-primary mb-2" />
                      <CardTitle>{county.name}</CardTitle>
                      <CardDescription>{county.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/services/${county.slug}`}>
                          View {county.name.split(" ")[0]} Properties
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience Professional Property Management?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Contact us today to learn how Sierra Property Partners can maximize your rental
                property investment returns.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-background text-primary hover:bg-accent"
                >
                  <Link href="/contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Us
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-background/10"
                >
                  <Link href={`tel:${businessInfo.phone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {businessInfo.phone}
                  </Link>
                </Button>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  <div className="flex items-start space-x-3">
                    <Building2 className="h-6 w-6 text-white/80 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Office</div>
                      <div className="text-sm text-white/80">
                        {businessInfo.address.street}
                        <br />
                        {businessInfo.address.city}, {businessInfo.address.state}{" "}
                        {businessInfo.address.zip}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-white/80 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Hours</div>
                      <div className="text-sm text-white/80">
                        Mon-Fri: {businessInfo.hours.monday}
                        <br />
                        Sat-Sun: {businessInfo.hours.saturday}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-6 w-6 text-white/80 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Contact</div>
                      <div className="text-sm text-white/80">
                        Phone: {businessInfo.phone}
                        <br />
                        Email: {businessInfo.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
