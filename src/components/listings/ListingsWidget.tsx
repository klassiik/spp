"use client";

import { useEffect, useRef, useState } from "react";
import type { ListingsWidgetConfig } from "@/types/listings";

interface ListingsWidgetProps {
  config?: Partial<ListingsWidgetConfig>;
}

export default function ListingsWidget({ config }: ListingsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useIframe, setUseIframe] = useState(true); // Always use iframe
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const defaultConfig: ListingsWidgetConfig = {
    hostUrl: "sierraproppartners.appfolio.com",
    themeColor: "#F8F6F0",
    height: "800px",
    width: "100%",
    defaultOrder: "date_posted",
    ...config,
  };

  // Analytics tracking helpers
  const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    // Integration point for analytics (Google Analytics, Plausible, etc.)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "listings_widget",
        ...properties,
      });
    }
  };

  const trackError = (errorType: string) => {
    trackEvent("error", { error_type: errorType });
  };

  // Debug logging helpers
  const debugLog = (message: string, data?: unknown) => {
    console.log(`[ListingsWidget Debug] ${message}`, data);
  };

  const captureWidgetStyles = () => {
    const widgetContainer = containerRef.current;
    if (!widgetContainer) return;

    // Get all styles from the widget container and its children
    const allElements = widgetContainer.querySelectorAll('*');
    const styles = {
      container: {
        position: window.getComputedStyle(widgetContainer).position,
        width: window.getComputedStyle(widgetContainer).width,
        height: window.getComputedStyle(widgetContainer).height,
        top: window.getComputedStyle(widgetContainer).top,
        left: window.getComputedStyle(widgetContainer).left,
        zIndex: window.getComputedStyle(widgetContainer).zIndex,
      }
    };

    // Check for potential problematic styles
    interface ProblematicElement {
      element: number;
      tagName: string;
      position: string;
      top: string;
      left: string;
      width: string;
      height: string;
      zIndex: string;
    }
    const problematicStyles: ProblematicElement[] = [];
    allElements.forEach((el, index) => {
      const computedStyle = window.getComputedStyle(el);
      if (computedStyle.position === 'fixed' || computedStyle.position === 'absolute') {
        if (computedStyle.top === '0px' && computedStyle.left === '0px' &&
            (computedStyle.width === '100vw' || computedStyle.width === '100%')) {
          problematicStyles.push({
            element: index,
            tagName: el.tagName,
            position: computedStyle.position,
            top: computedStyle.top,
            left: computedStyle.left,
            width: computedStyle.width,
            height: computedStyle.height,
            zIndex: computedStyle.zIndex
          });
        }
      }
    });

    debugLog('Widget styles analysis', { styles, problematicStyles });
    return { styles, problematicStyles };
  };

  // Since we're always using iframe, we don't need the widget injection logic
  // This useEffect is simplified for iframe loading
  useEffect(() => {
    if (useIframe) {
      setIsLoading(false); // Iframe is ready to load
      debugLog('Using iframe approach for listings widget');
      trackEvent("iframe_mode_active");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useIframe]);

  if (hasError) {
    return (
      <div
        className="bg-red-50 border border-red-200 rounded-lg p-8 text-center"
        role="alert"
        aria-live="assertive"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-red-900 mb-2">
          Unable to Load Listings
        </h3>
        <p className="text-red-700 mb-4">
          We&apos;re having trouble loading our property listings at the moment.
          Please try refreshing the page or contact us directly.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => {
              setUseIframe(true);
              setHasError(false);
              setIsLoading(true);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Try iframe fallback for listings"
          >
            Try Iframe View
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Refresh page to reload listings"
          >
            Refresh Page
          </button>
          <a
            href="/contact"
            className="px-6 py-2 bg-background text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Go to contact page"
          >
            Contact Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading Skeleton */}
      {isLoading && (
        <div
          className="bg-card rounded-lg shadow-sm border border-border p-8"
          role="status"
          aria-live="polite"
          aria-label="Loading property listings"
        >
          <div className="animate-pulse space-y-4">
            {/* Search bar skeleton */}
            <div className="h-12 bg-muted rounded-lg w-full" />

            {/* Filter buttons skeleton */}
            <div className="flex gap-2 flex-wrap">
              <div className="h-10 bg-gray-200 rounded-lg w-24" />
              <div className="h-10 bg-gray-200 rounded-lg w-32" />
              <div className="h-10 bg-gray-200 rounded-lg w-28" />
              <div className="h-10 bg-gray-200 rounded-lg w-36" />
            </div>

            {/* Listing cards skeleton */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-48 bg-gray-200 rounded-lg" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
          <span className="sr-only">Loading property listings...</span>
        </div>
      )}

      {/* Widget Container */}
      {!useIframe ? (
        <div
          ref={containerRef}
          id="appfolio-listings-container"
          className={`min-h-[800px] transition-opacity duration-300 ${
            isLoading ? "opacity-0 absolute inset-0" : "opacity-100"
          }`}
          role="region"
          aria-label="Property listings widget"
          aria-live="polite"
          style={{
            // CSS containment to prevent widget from affecting page layout
            contain: 'layout style paint',
            containIntrinsicSize: '800px',
            overflow: 'hidden',
            position: 'relative',
            isolation: 'isolate',
            zIndex: 1,
            // Force containment context
            transform: 'translateZ(0)',
            // Prevent widget from creating new stacking contexts that affect parent
            backdropFilter: 'none',
          }}
        />
      ) : (
        /* Iframe Fallback */
        <div
          className="min-h-[800px] bg-card rounded-lg shadow-sm border border-border overflow-hidden"
          role="region"
          aria-label="Property listings widget (iframe fallback)"
        >
          <iframe
            src={`https://${defaultConfig.hostUrl}/listings`}
            className="w-full h-[800px] border-0"
            title="Property Listings"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            style={{
              // Additional containment for iframe
              contain: 'layout style paint',
            }}
            onLoad={() => {
              debugLog('Iframe fallback loaded successfully');
              setIsLoading(false);
              trackEvent('iframe_fallback_loaded');
            }}
            onError={() => {
              debugLog('Iframe fallback failed to load');
              setHasError(true);
              setIsLoading(false);
              trackError('iframe_fallback_failed');
            }}
          />
          <div className="sr-only">
            Property listings loaded via iframe fallback due to widget compatibility issues.
          </div>
        </div>
      )}

      {/* Accessibility enhancements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isLoading
          ? "Property listings are loading"
          : "Property listings have loaded"}
      </div>
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Appfolio?: {
      Listing: (config: ListingsWidgetConfig) => void;
    };
    gtag?: (
      command: string,
      eventName: string,
      properties?: Record<string, unknown>
    ) => void;
  }
}
