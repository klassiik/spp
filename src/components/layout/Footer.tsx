import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Award } from "lucide-react";
import { businessInfo } from "@/lib/data/business";
import { counties } from "@/lib/data/locations";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Sierra Property Partners</h3>
            <address className="space-y-3 text-sm text-muted-foreground not-italic">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div>{businessInfo.address.street}</div>
                  <div>{businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href={`tel:${businessInfo.phoneRaw}`} className="hover:text-foreground" aria-label="Call Sierra Property Partners">
                  {businessInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-foreground" aria-label="Email Sierra Property Partners">
                  {businessInfo.email}
                </a>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Award className="h-3 w-3" aria-hidden="true" />
                <span>DRE# 02143978</span>
              </div>
            </address>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Office Hours</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <time>{businessInfo.hours.monday}</time>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <time>{businessInfo.hours.saturday}</time>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <time>{businessInfo.hours.sunday}</time>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <nav aria-label="Service areas">
            <h3 className="mb-4 text-lg font-semibold">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              {counties.map((county) => (
                <li key={county.slug}>
                  <Link
                    href={`/locations/${county.slug}`}
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {county.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">{businessInfo.serviceArea.description}</p>
          </nav>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground hover:underline">
                  Our Services
                </Link>
              </li>
                <li>
                  <Link href="/listings" className="text-muted-foreground hover:text-foreground hover:underline">
                    Property Listings
                  </Link>
                </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/services/residential-property-management" className="text-muted-foreground hover:text-foreground hover:underline">
                  Residential Management
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-property-management" className="text-muted-foreground hover:text-foreground hover:underline">
                  Commercial Management
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>&copy; {currentYear} Sierra Property Partners. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
