"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Phone } from "lucide-react";
import { businessInfo } from "@/lib/data/business";
import { counties, getLocationsByCounty } from "@/lib/data/locations";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" aria-label="Sierra Property Partners home">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">Sierra Property Partners</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex items-center" aria-label="Main navigation">
          <NavigationMenuList className="flex items-center gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4">
                  <Link href="/services" className="block mb-3">
                    <div className="text-sm font-semibold">All Services</div>
                    <p className="text-xs text-muted-foreground">View our complete service offerings</p>
                  </Link>
                  <div className="text-xs font-semibold text-muted-foreground mb-2">Core Services</div>
                  <ul className="space-y-1">
                    <li><Link href="/services/residential-property-management" className="text-sm hover:underline">Residential Property Management</Link></li>
                    <li><Link href="/services/commercial-property-management" className="text-sm hover:underline">Commercial Property Management</Link></li>
                    <li><Link href="/services/tenant-placement-leasing" className="text-sm hover:underline">Tenant Placement & Leasing</Link></li>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Locations Mega Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Locations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[800px] grid-cols-4 gap-4 p-6">
                  {counties.map((county) => {
                    const locations = getLocationsByCounty(county.slug);
                    return (
                      <div key={county.slug}>
                        <Link href={`/locations/${county.slug}`} className="mb-2 block">
                          <div className="text-sm font-semibold">{county.name}</div>
                        </Link>
                        <ul className="space-y-1">
                          {locations.slice(0, 6).map((location) => (
                            <li key={location.slug}>
                              <Link
                                href={`/locations/${county.slug}/${location.slug}`}
                                className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                              >
                                {location.name}
                              </Link>
                            </li>
                          ))}
                          {locations.length > 6 && (
                            <li>
                              <Link href={`/locations/${county.slug}`} className="text-xs text-primary hover:underline">
                                + {locations.length - 6} more
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Listings */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/listings" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Listings
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Phone CTA */}
        <div className="flex items-center gap-4">
          <a href={`tel:${businessInfo.phoneRaw}`} className="hidden md:flex" aria-label="Call Sierra Property Partners">
            <Button variant="default" className="gap-2">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {businessInfo.phone}
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
