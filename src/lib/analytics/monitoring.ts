// Analytics and monitoring integration
// Supports Google Analytics, error reporting, and custom analytics

interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, unknown>;
  timestamp?: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  url?: string;
}

export class AnalyticsManager {
  private static instance: AnalyticsManager;
  private isInitialized = false;
  private eventQueue: AnalyticsEvent[] = [];
  private performanceQueue: PerformanceMetric[] = [];

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  // Initialize analytics
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize Google Analytics if configured
      if (process.env.NEXT_PUBLIC_GA_ID) {
        await this.initializeGoogleAnalytics();
      }

      // Initialize custom analytics
      await this.initializeCustomAnalytics();

      // Start performance monitoring
      this.startPerformanceMonitoring();

      this.isInitialized = true;
      console.log('Analytics initialized successfully');
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }

  private async initializeGoogleAnalytics(): Promise<void> {
    // Load Google Analytics script
    if (typeof window !== 'undefined' && !(window as any).gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      };
      
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID);
    }
  }

  private async initializeCustomAnalytics(): Promise<void> {
    // Initialize custom analytics service
    // This could be for services like PostHog, Amplitude, etc.
    if (process.env.NEXT_PUBLIC_ANALYTICS_ID) {
      // Your custom analytics initialization
      console.log('Custom analytics initialized');
    }
  }

  private startPerformanceMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    this.observePerformanceMetrics();

    // Monitor navigation timing
    this.observeNavigationTiming();

    // Monitor user interactions
    this.observeUserInteractions();
  }

  private observePerformanceMetrics(): void {
    // Core Web Vitals monitoring
    const observeMetric = (metricName: string, getValue: () => number | null) => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackPerformance({
            name: metricName,
            value: entry.startTime,
            timestamp: Date.now(),
            url: window.location.href,
          });
        }
      });
      observer.observe({ entryTypes: [metricName] });
    };

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.trackPerformance({
            name: 'lcp',
            value: lastEntry.startTime,
            timestamp: Date.now(),
            url: window.location.href,
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackPerformance({
            name: 'fid',
            value: (entry as any).processingStart - entry.startTime,
            timestamp: Date.now(),
            url: window.location.href,
          });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Track CLS on page unload
      window.addEventListener('beforeunload', () => {
        if (clsValue > 0) {
          this.trackPerformance({
            name: 'cls',
            value: clsValue,
            timestamp: Date.now(),
            url: window.location.href,
          });
        }
      });
    }
  }

  private observeNavigationTiming(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (timing) {
          this.trackPerformance({
            name: 'navigation',
            value: timing.loadEventEnd - timing.startTime,
            timestamp: Date.now(),
            url: window.location.href,
          });
        }
      }, 0);
    });
  }

  private observeUserInteractions(): void {
    // Track clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const trackingData = {
        tagName: target.tagName,
        id: target.id,
        className: target.className,
        text: target.textContent?.substring(0, 100),
        href: (target as HTMLAnchorElement).href,
        timestamp: Date.now(),
        url: window.location.href,
      };

      this.trackEvent('click', trackingData);
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.trackEvent('form_submit', {
        formId: form.id,
        formAction: form.action,
        timestamp: Date.now(),
        url: window.location.href,
      });
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('page_visibility', {
        visible: !document.hidden,
        timestamp: Date.now(),
        url: window.location.href,
      });
    });
  }

  // Public methods for tracking
  trackEvent(name: string, parameters?: Record<string, unknown>): void {
    const event: AnalyticsEvent = {
      name,
      parameters,
      timestamp: Date.now(),
    };

    // Send immediately if initialized, otherwise queue
    if (this.isInitialized) {
      this.sendEvent(event);
    } else {
      this.eventQueue.push(event);
    }

    // Also send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, parameters || {});
    }
  }

  trackPerformance(metric: PerformanceMetric): void {
    if (this.isInitialized) {
      this.sendPerformance(metric);
    } else {
      this.performanceQueue.push(metric);
    }
  }

  trackPageView(path: string, title?: string): void {
    this.trackEvent('page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }

  trackError(error: Error, context?: Record<string, unknown>): void {
    this.trackEvent('error', {
      error_message: error.message,
      error_stack: error.stack,
      error_name: error.name,
      context,
      timestamp: Date.now(),
      url: window.location.href,
    });
  }

  // Internal methods
  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
    }
  }

  private async sendPerformance(metric: PerformanceMetric): Promise<void> {
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      });
    } catch (error) {
      console.warn('Failed to send performance metric:', error);
    }
  }

  // Flush queued events
  flush(): void {
    for (const event of this.eventQueue) {
      this.sendEvent(event);
    }
    for (const metric of this.performanceQueue) {
      this.sendPerformance(metric);
    }
    
    this.eventQueue = [];
    this.performanceQueue = [];
  }
}

// Global instance
export const analytics = AnalyticsManager.getInstance();

// React hooks for analytics
export function useAnalytics() {
  const trackEvent = (name: string, parameters?: Record<string, unknown>) => {
    analytics.trackEvent(name, parameters);
  };

  const trackPageView = (path: string, title?: string) => {
    analytics.trackPageView(path, title);
  };

  const trackError = (error: Error, context?: Record<string, unknown>) => {
    analytics.trackError(error, context);
  };

  return {
    trackEvent,
    trackPageView,
    trackError,
  };
}

// Initialize analytics
if (typeof window !== 'undefined') {
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      analytics.initialize();
    });
  } else {
    analytics.initialize();
  }
}
