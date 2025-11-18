"use client";

import { useEffect } from "react";

export default function ListingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Listings page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-600"
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

        <h1 className="text-3xl font-bold text-foreground mb-4">
          Something went wrong
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          We encountered an error while loading the listings page. This has been
          logged and we&apos;ll look into it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Try loading the page again"
          >
            Try Again
          </button>

          <a
            href="/"
            className="px-6 py-3 bg-background text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Return to home page"
          >
            Go Home
          </a>

          <a
            href="/contact"
            className="px-6 py-3 bg-background text-foreground border border-border rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Contact us for help"
          >
            Contact Support
          </a>
        </div>

        {error.digest && (
          <p className="mt-8 text-sm text-muted-foreground">
            Error ID: <code className="bg-muted px-2 py-1 rounded">{error.digest}</code>
          </p>
        )}
      </div>
    </div>
  );
}
