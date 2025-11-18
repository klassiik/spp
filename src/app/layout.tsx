import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/contexts/theme-context";
import { PortalBanner } from "@/components/layout/PortalBanner";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sierrapropertypartners.com"),
  title: {
    default: "Property Management Services | Sierra Property Partners",
    template: "%s | Sierra Property Partners",
  },
  description: "Professional property management services across Northern California. Serving 60+ cities in Placer, Nevada, Sacramento, and El Dorado counties.",
  keywords: ["property management", "Northern California", "Placer County", "Nevada County", "Sacramento County", "El Dorado County", "residential property management", "commercial property management"],
  authors: [{ name: "Sierra Property Partners" }],
  creator: "Sierra Property Partners",
  publisher: "Sierra Property Partners",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Sierra Property Partners",
    title: "Property Management Services | Sierra Property Partners",
    description: "Professional property management services across Northern California. Serving 60+ cities in Placer, Nevada, Sacramento, and El Dorado counties.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Management Services | Sierra Property Partners",
    description: "Professional property management services across Northern California. Serving 60+ cities in Placer, Nevada, Sacramento, and El Dorado counties.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
          >
            Skip to main content
          </a>
          <PortalBanner />
          <Header />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
