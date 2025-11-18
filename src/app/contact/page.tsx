import { Metadata } from "next";
import ContactForm from "./contact-form";
import { SimpleHero } from "@/components/ui/hero-image";

export const metadata: Metadata = {
  title: "Contact Sierra Property Partners | Property Management in Auburn, Roseville, Folsom & Northern California",
  description: "Contact Sierra Property Partners for professional property management services. Serving Auburn, Roseville, Folsom, Truckee & 60+ communities across Northern California. Call (530) 878-8860.",
  keywords: [
    "contact Sierra Property Partners",
    "property management contact Auburn",
    "Roseville property manager contact",
    "Folsom property management contact",
    "Truckee property management contact",
    "Northern California property manager",
    "Placer County property management",
    "Nevada County property management",
    "Sacramento County property management",
    "El Dorado County property management",
    "property management consultation Northern California",
    "rental property management contact",
    "property manager phone number Auburn",
    "property management free consultation",
  ],
  openGraph: {
    title: "Contact Sierra Property Partners | Professional Property Management",
    description: "Contact Sierra Property Partners for professional property management across Northern California.",
    type: "website",
    url: "https://sierrapropertypartners.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <SimpleHero
        title="Contact Sierra Property Partners"
        subtitle="Get started with professional property management today"
        category="contact"
      />

      {/* Contact Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>

      {/* DRE Information */}
      <section className="py-8 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Sierra Property Partners DRE# 02143978
          </p>
        </div>
      </section>
    </>
  );
}
