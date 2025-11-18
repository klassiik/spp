import { Metadata } from "next";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "book" | "profile";
  noindex?: boolean;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
  keywords = [],
}: SEOHeadProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sierrapropertypartners.com";
  const fullTitle = title.includes("Sierra Property Partners") ? title : `${title} | Sierra Property Partners`;
  const canonicalUrl = canonical || siteUrl;
  const imageUrl = ogImage || `${siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    robots: noindex ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "Sierra Property Partners",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}
