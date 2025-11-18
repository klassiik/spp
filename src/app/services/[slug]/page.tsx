import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { serviceFAQs } from "@/lib/data/service-faqs";
import { generateServiceSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo/schemas";
import { businessInfo } from "@/lib/data/business";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/ui/faq";
import { SimpleHero } from "@/components/ui/hero-image";
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Home,
  Building2,
  UserCheck,
  DollarSign,
  Wrench,
  ClipboardCheck,
  FileWarning,
  RefreshCw,
  MessageSquare,
  Target,
  FileText,
  Users,
  HardHat,
  Truck,
  Shield,
  Hammer,
  ShieldCheck,
  Palmtree,
  BarChart3,
  Scale
} from "lucide-react";

const iconMap = {
  Home,
  Building2,
  UserCheck,
  DollarSign,
  Wrench,
  ClipboardCheck,
  FileWarning,
  RefreshCw,
  MessageSquare,
  Target,
  FileText,
  Users,
  HardHat,
  Truck,
  Shield,
  Phone,
  ShieldCheck,
  Hammer,
  Palmtree,
  BarChart3,
  Scale,
};

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Sierra Property Partners`,
    description: service.shortDescription,
    keywords: [
      service.title,
      "property management",
      "Northern California",
      "Placer County",
      "Nevada County",
      "Sacramento County",
      "El Dorado County",
      service.category === "core" ? "core services" : "additional services",
    ],
    openGraph: {
      title: `${service.title} | Sierra Property Partners`,
      description: service.shortDescription,
      type: "website",
      url: `https://sierrapropertypartners.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = (iconMap as Record<string, typeof Home>)[service.icon] || Home;
  const relatedServices = services
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  // Generate JSON-LD schemas
  const serviceSchema = generateServiceSchema(
    service.title,
    service.shortDescription
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://sierrapropertypartners.com" },
    { name: "Services", url: "https://sierrapropertypartners.com/services" },
    { name: service.title, url: `https://sierrapropertypartners.com/services/${service.slug}` },
  ]);

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb Navigation */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-primary transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{service.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <SimpleHero
          title={service.title}
          subtitle={service.category === "core" ? "Core Service" : "Additional Service"}
          category="service"
          service={service.slug}
        />

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="md:col-span-2 space-y-12">
                {/* Overview */}
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Service Overview</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                    {service.longDescription}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Key Benefits</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 bg-card p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Our Process</h2>
                  <div className="space-y-4">
                    {service.process.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 bg-card p-5 rounded-lg border border-border"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <p className="text-muted-foreground pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ Section */}
                {serviceFAQs[service.slug] && (
                  <div>
                    <FAQ
                      faqs={serviceFAQs[service.slug]}
                      serviceTitle={service.title}
                    />
                  </div>
                )}

                {/* CTA Section */}
                <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary-foreground">
                      Ready to Get Started?
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/90">
                      Contact us today to learn more about how our {service.title.toLowerCase()} services
                      can benefit your property investment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-background text-foreground hover:bg-accent"
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
                        className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                      >
                        <Link href={`tel:${businessInfo.phone}`}>
                          <Phone className="mr-2 h-5 w-5" />
                          {businessInfo.phone}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>
                      Have questions about this service?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button asChild className="w-full" size="lg">
                      <Link href="/contact">
                        <Mail className="mr-2 h-5 w-5" />
                        Contact Us
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <Link href={`tel:${businessInfo.phone}`}>
                        <Phone className="mr-2 h-5 w-5" />
                        Call Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Office Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Visit Our Office</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-muted-foreground">
                        {businessInfo.address.street}<br />
                        {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Office Hours</p>
                      <p className="text-muted-foreground">
                        Mon-Fri: {businessInfo.hours.monday}<br />
                        Sat-Sun: {businessInfo.hours.saturday}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Related Services</CardTitle>
                      <CardDescription>
                        Explore our other {service.category} services
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {relatedServices.map((relatedService) => {
                        const RelatedIcon = (iconMap as Record<string, typeof Home>)[relatedService.icon] || Home;
                        return (
                          <Link
                            key={relatedService.slug}
                            href={`/services/${relatedService.slug}`}
                            className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
                          >
                            <div className="flex items-center space-x-3">
                              <RelatedIcon className="h-5 w-5 text-primary" />
                              <span className="text-sm font-medium text-foreground group-hover:text-primary">
                                {relatedService.title}
                              </span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                          </Link>
                        );
                      })}
                    </CardContent>
                  </Card>
                )}

                {/* All Services Link */}
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/services">
                        View All Services
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
