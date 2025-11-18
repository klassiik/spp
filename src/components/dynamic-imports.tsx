"use client";

import { lazy, Suspense } from 'react';
import { CardSkeleton } from '@/components/ui/responsive-card';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dynamic imports for better bundle optimization
const Testimonials = lazy(() => import('@/components/ui/testimonials').then(module => ({ default: module.Testimonials })));
const FAQ = lazy(() => import('@/components/ui/faq').then(module => ({ default: module.FAQ })));
const ListingsWidget = lazy(() => import('@/components/listings/ListingsWidget'));
const HeroImage = lazy(() => import('@/components/ui/hero-image').then(module => ({ default: module.HeroImage })));

// Loading skeletons for different components
export function TestimonialsSkeleton({ maxItems = 6 }: { maxItems?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: maxItems }).map((_, i) => (
        <div key={i} className="bg-card rounded-lg border border-border p-6 animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="w-8 h-8 bg-muted rounded" />
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="w-4 h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
          <div className="mb-6 space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6" />
          </div>
          <div className="border-t border-border pt-4 space-y-2">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-1/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
            <div className="h-3 bg-muted rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FAQSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
        <div className="h-6 bg-white/20 rounded w-1/3 animate-pulse" />
        <div className="h-4 bg-white/20 rounded w-2/3 mt-2 animate-pulse" />
      </div>
      <div className="divide-y divide-slate-200">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
              <div className="w-5 h-5 bg-muted rounded animate-pulse" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-muted rounded w-full animate-pulse" />
              <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListingsWidgetSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
        <div className="flex space-x-2">
          <div className="h-10 bg-muted rounded w-20 animate-pulse" />
          <div className="h-10 bg-muted rounded w-20 animate-pulse" />
        </div>
      </div>
      
      {/* Search filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded animate-pulse" />
        ))}
      </div>
      
      {/* Results */}
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-border rounded-lg p-4 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-24 h-24 bg-muted rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-2/3" />
                <div className="flex space-x-2 mt-2">
                  <div className="h-6 bg-muted rounded w-16" />
                  <div className="h-6 bg-muted rounded w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <section className={`relative overflow-hidden ${height}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background animate-pulse" />
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <div className="h-4 bg-muted rounded w-1/2 mx-auto animate-pulse" />
          <div className="h-12 bg-muted rounded w-3/4 mx-auto animate-pulse" />
          <div className="h-6 bg-muted rounded w-2/3 mx-auto animate-pulse" />
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
            <div className="h-12 bg-muted rounded w-32 animate-pulse" />
            <div className="h-12 bg-muted rounded w-32 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Error boundary for dynamic imports
function DynamicImportError({ 
  error, 
  resetError,
  componentName = "Component" 
}: { 
  error: Error;
  resetError: () => void;
  componentName?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold mb-2">{componentName} Error</h3>
      <p className="text-muted-foreground mb-4">
        Failed to load {componentName.toLowerCase()}. Please try refreshing the page.
      </p>
      <Button onClick={resetError} variant="outline">
        Try Again
      </Button>
    </div>
  );
}

// Enhanced dynamic components with error boundaries and loading states
export function DynamicTestimonials({
  maxItems = 6,
  showTitle = true,
  className = ""
}: {
  maxItems?: number;
  showTitle?: boolean;
  className?: string;
}) {
  return (
    <Suspense fallback={<TestimonialsSkeleton maxItems={maxItems} />}>
      <ComponentErrorBoundary componentName="Testimonials">
        <Testimonials maxItems={maxItems} showTitle={showTitle} className={className} />
      </ComponentErrorBoundary>
    </Suspense>
  );
}

export function DynamicFAQ({
  faqs,
  serviceTitle
}: {
  faqs: Array<{ question: string; answer: string }>;
  serviceTitle?: string;
}) {
  return (
    <Suspense fallback={<FAQSkeleton count={faqs.length} />}>
      <ComponentErrorBoundary componentName="FAQ">
        <FAQ faqs={faqs} serviceTitle={serviceTitle} />
      </ComponentErrorBoundary>
    </Suspense>
  );
}

export function DynamicListingsWidget() {
  return (
    <Suspense fallback={<ListingsWidgetSkeleton />}>
      <ComponentErrorBoundary componentName="Listings Widget">
        <ListingsWidget />
      </ComponentErrorBoundary>
    </Suspense>
  );
}

import { ComponentErrorBoundary } from '@/components/error/ErrorBoundary';
import { HeroImageConfig } from '@/lib/hero-images';

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

export function DynamicHeroImage(props: HeroImageProps) {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <ComponentErrorBoundary componentName="Hero Image">
        <HeroImage {...props} />
      </ComponentErrorBoundary>
    </Suspense>
  );
}

// Preload function for critical components
export function preloadCriticalComponents() {
  // Preload components that are likely to be needed soon
  const preloadComponent = (importFn: () => Promise<unknown>) => {
    if (typeof window !== 'undefined') {
      importFn().catch(() => {
        // Silently fail preloading
      });
    }
  };

  // Preload testimonials (likely to be shown on home page)
  preloadComponent(() => import('@/components/ui/testimonials'));
  
  // Preload frequently used icons
  preloadComponent(() => import('@/components/ui/optimized-icons'));
}

// Intersection Observer for lazy loading
export function useLazyIntersectionObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(element);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, options]);

  return elementRef;
}

// Hook for loading states
export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = React.useState(initialState);
  const [error, setError] = React.useState<Error | null>(null);

  const startLoading = React.useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const setErrorState = React.useCallback((err: Error) => {
    setIsLoading(false);
    setError(err);
  }, []);

  const reset = React.useCallback(() => {
    setIsLoading(initialState);
    setError(null);
  }, [initialState]);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError: setErrorState,
    reset,
  };
}

// React import
import React from "react";
