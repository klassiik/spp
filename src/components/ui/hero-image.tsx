"use client";

/**
 * Dynamic Hero Image Component
 * Displays hero background images with intelligent sourcing
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getHeroImageForPage, HeroImageConfig, HeroImageResult } from '@/lib/hero-images';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroImageProps {
  config: HeroImageConfig;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  showAttribution?: boolean;
  className?: string;
}

export function HeroImage({
  config,
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  showAttribution = true,
  className = '',
}: HeroImageProps) {
  const [imageData, setImageData] = useState<HeroImageResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      try {
        setLoading(true);
        setError(null);
        
        const imageResult = await getHeroImageForPage(config);
        setImageData(imageResult);
      } catch (err) {
        console.error('Failed to load hero image:', err);
        setError('Failed to load background image');
      } finally {
        setLoading(false);
      }
    }

    loadImage();
  }, [config]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setError('Failed to load image');
    setLoading(false);
  };

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        {imageData && (
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet={imageData.responsiveUrls.small}
              type="image/jpeg"
            />
            <source
              media="(max-width: 1024px)"
              srcSet={imageData.responsiveUrls.medium}
              type="image/jpeg"
            />
            <source
              media="(max-width: 1920px)"
              srcSet={imageData.responsiveUrls.large}
              type="image/jpeg"
            />
            <source
              media="(min-width: 1921px)"
              srcSet={imageData.responsiveUrls.xlarge}
              type="image/jpeg"
            />
            <Image
              src={imageData.responsiveUrls.large}
              alt={imageData.alt_description || imageData.description || title}
              fill
              priority
              className="object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </picture>
        )}
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Gradient overlay for enhanced text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Background image unavailable</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center text-white">
            {subtitle && (
              <p className="mb-4 text-lg font-medium text-white/90 md:text-xl">
                {subtitle}
              </p>
            )}
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
            
            {description && (
              <p className="mb-8 text-lg text-white/90 md:text-xl lg:text-2xl">
                {description}
              </p>
            )}

            {/* Call-to-Action Buttons */}
            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                {primaryCTA && (
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <a href={primaryCTA.href}>
                      {primaryCTA.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                
                {secondaryCTA && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto bg-background/10 border-white/20 text-white hover:bg-background/20"
                    asChild
                  >
                    <a href={secondaryCTA.href}>
                      {secondaryCTA.text}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unsplash Attribution */}
      {showAttribution && imageData?.attribution && (
        <div className="absolute bottom-4 right-4 z-20">
          <p className="text-xs text-white/70">
            {imageData.attribution.required && (
              <a
                href={imageData.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                dangerouslySetInnerHTML={{
                  __html: imageData.attribution.html,
                }}
              />
            )}
          </p>
        </div>
      )}
    </section>
  );
}

// Simplified hero component for specific page types
interface SimpleHeroProps {
  title: string;
  subtitle?: string;
  category?: 'homepage' | 'service' | 'location' | 'about' | 'contact';
  location?: string;
  service?: string;
}

export function SimpleHero({ title, subtitle, category, location, service }: SimpleHeroProps) {
  const config: HeroImageConfig = {
    category,
    location,
    service,
    keywords: ['professional', 'property management'],
  };

  return (
    <HeroImage
      config={config}
      title={title}
      subtitle={subtitle}
      primaryCTA={{
        text: 'Get Started Today',
        href: '/contact',
      }}
      secondaryCTA={{
        text: 'View Our Services',
        href: '/services',
      }}
    />
  );
}