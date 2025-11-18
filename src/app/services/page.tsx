import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/data/services";
import { businessInfo } from "@/lib/data/business";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/seo/schemas";
import { SimpleHero } from "@/components/ui/hero-image";
import {
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
  Scale,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
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

export const metadata: Metadata = {
  title: "Property Management Services | Auburn, Roseville, Folsom, Truckee & Northern California",
  description: "Comprehensive property management services across Northern California. From tenant placement to 24/7 maintenance, financial reporting to legal compliance in Auburn, Roseville, Folsom & 60+ communities.",
  keywords: [
    "property management services Northern California",
    "Auburn property management services",
    "Roseville property management services",
    "Folsom property management services",
    "Truckee property management services",
    "residential property management Northern California",
    "commercial property management Northern California",
    "tenant placement services Auburn",
    "rent collection services Northern California",
    "maintenance coordination Northern California",
    "property management Placer County",
    "property management Nevada County",
    "property management Sacramento County",
    "property management El Dorado County",
    "full-service property management",
    "property manager Northern California",
  ],
  openGraph: {
    title: "Property Management Services | Northern California",
    description: "Comprehensive property management services across Northern California including Auburn, Roseville, Folsom, Truckee.",
    type: "website",
    url: "https://sierrapropertypartners.com/services",
  },
};

export default function ServicesPage() {
  const coreServices = services.filter((s) => s.category === "core");
  const additionalServices = services.filter((s) => s.category === "additional");

  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://sierrapropertypartners.com" },
    { name: "Services", url: "https://sierrapropertypartners.com/services" },
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
              <span className="text-foreground font-medium">Services</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <SimpleHero
          title="Comprehensive Property Management Services"
          subtitle="From tenant placement to 24/7 emergency support, financial reporting to legal compliance—we handle every aspect of property management"
          category="service"
        />

        {/* Overview Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Full-Service Property Management
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sierra Property Partners delivers professional property management services
                throughout Northern California. Our comprehensive approach combines local market
                expertise with proven systems that maximize your rental income while protecting your
                investment.
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">96% Occupancy Rate</h3>
                <p className="text-muted-foreground text-sm">
                  Our professional marketing and tenant screening keeps properties occupied at rates
                  well above market average.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">24/7 Emergency Support</h3>
                <p className="text-muted-foreground text-sm">
                  Round-the-clock emergency hotline with 2-4 hour response times protecting your
                  property investment.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Complete Transparency</h3>
                <p className="text-muted-foreground text-sm">
                  Detailed monthly statements and 24/7 owner portal access to all property and
                  financial data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Core Services
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Essential services forming the foundation of professional property management
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreServices.map((service) => {
                  const Icon = iconMap[service.icon] || Home;
                  return (
                    <Card
                      key={service.slug}
                      className="hover:shadow-lg transition-all hover:border-primary/50 group"
                    >
                      <CardHeader>
                        <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                          <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                        <CardDescription>{service.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
                          <Link href={`/services/${service.slug}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Additional Services
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Specialized services providing comprehensive property management solutions
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalServices.map((service) => {
                  const Icon = iconMap[service.icon] || Home;
                  return (
                    <Card
                      key={service.slug}
                      className="hover:shadow-lg transition-all hover:border-primary/50 group"
                    >
                      <CardHeader>
                        <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                          <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                        <CardDescription>{service.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
                          <Link href={`/services/${service.slug}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Maximize Your Rental Property Returns?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Contact Sierra Property Partners today to discuss how our comprehensive property
                management services can benefit your investment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
