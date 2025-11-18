"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/lib/data/business";
import { counties } from "@/lib/data/locations";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SimpleMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-foreground" />
        ) : (
          <Menu className="h-6 w-6 text-foreground" />
        )}
      </button>

      {/* Mobile Menu Overlay - Portal to document body */}
      {isOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] lg:hidden bg-black/80"
          onClick={closeMenu}
          aria-hidden="true"
        >
          <div
            id="mobile-menu"
            className="fixed right-0 top-0 h-full w-80 max-w-[90%] bg-background shadow-2xl border-l border-border overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
              <h2 id="mobile-menu-title" className="text-lg font-semibold text-foreground">
                Menu
              </h2>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={closeMenu}
                  className="p-2 hover:bg-accent rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>
            </div>

            {/* Phone Button */}
            <div className="p-4 border-b border-border bg-background">
              <a 
                href={`tel:${businessInfo.phoneRaw}`} 
                onClick={closeMenu}
                className="block"
              >
                <Button className="w-full gap-2" variant="default">
                  <Phone className="h-4 w-4" />
                  Call {businessInfo.phone}
                </Button>
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 bg-background">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block py-2 px-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    onClick={closeMenu}
                    className="block py-2 px-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings"
                    onClick={closeMenu}
                    className="block py-2 px-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  >
                    Listings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="block py-2 px-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="block py-2 px-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  >
                    About
                  </Link>
                </li>
                
                {/* Locations Section */}
                <li className="pt-4">
                  <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Locations
                  </h3>
                  <ul className="space-y-1">
                    {counties.map((county) => {
                      return (
                        <li key={county.slug}>
                          <Link
                            href={`/locations/${county.slug}`}
                            onClick={closeMenu}
                            className="block py-1 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          >
                            {county.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}