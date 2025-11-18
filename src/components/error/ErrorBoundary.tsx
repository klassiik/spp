import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  enableErrorReporting?: boolean;
}

interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo;
  resetError: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Store error info in state for fallback component
    this.setState({ errorInfo });

    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Send error to monitoring service (if enabled)
    if (this.props.enableErrorReporting && typeof window !== 'undefined') {
      this.reportError(error, errorInfo);
    }

    // Auto-retry after 5 seconds for non-critical errors
    if (this.isRecoverableError(error)) {
      this.retryTimeout = setTimeout(() => {
        this.resetError();
      }, 5000);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  private isRecoverableError(error: Error): boolean {
    // Auto-retry for network errors, timeout errors, etc.
    const recoverableErrors = [
      'Network Error',
      'Failed to fetch',
      'Load failed',
      'Timeout',
    ];
    
    return recoverableErrors.some(recoverable => 
      error.message.includes(recoverable)
    );
  }

  private async reportError(error: Error, errorInfo: ErrorInfo) {
    try {
      // Send to your error reporting service (e.g., Sentry, LogRocket)
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
          },
          errorInfo: {
            componentStack: errorInfo.componentStack,
          },
          metadata: {
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            errorId: this.state.errorId,
          },
        }),
      });
    } catch (reportingError) {
      // Silently fail if error reporting fails
      console.error('Failed to report error:', reportingError);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });

    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error!}
          errorInfo={this.state.errorInfo!}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

// Default fallback component for when an error occurs
function DefaultErrorFallback({ error, errorInfo, resetError }: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Something went wrong
          </CardTitle>
          <CardDescription>
            We're sorry, but something unexpected happened. Our team has been notified.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-3">
            <Button onClick={resetError} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Button variant="outline" onClick={() => window.location.href = '/'} className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          {isDevelopment && (
            <details className="mt-6 p-4 bg-muted rounded-lg">
              <summary className="cursor-pointer font-medium text-sm mb-2 flex items-center gap-2">
                <Bug className="w-4 h-4" />
                Error Details (Development Only)
              </summary>
              <div className="text-xs space-y-3">
                <div>
                  <strong>Error:</strong>
                  <pre className="whitespace-pre-wrap mt-1 text-red-600">
                    {error.message}
                  </pre>
                </div>
                <div>
                  <strong>Stack Trace:</strong>
                  <pre className="whitespace-pre-wrap mt-1 text-muted-foreground max-h-32 overflow-auto">
                    {error.stack}
                  </pre>
                </div>
                {errorInfo?.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1 text-muted-foreground max-h-32 overflow-auto">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div className="text-center text-sm text-muted-foreground">
            If this problem persists, please contact our support team.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Specialized error boundaries for different contexts

// For page-level errors
export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      enableErrorReporting={true}
      onError={(error, errorInfo) => {
        // Page-specific error handling
        console.error('Page error:', error, errorInfo);
        
        // Could send to analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'exception', {
            description: error.message,
            fatal: false,
          });
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// For component-level errors
export function ComponentErrorBoundary({ 
  children, 
  componentName = 'Component' 
}: { 
  children: ReactNode;
  componentName?: string;
}) {
  return (
    <ErrorBoundary
      enableErrorReporting={false} // Less noisy for component errors
      fallback={({ error, resetError }) => (
        <div className="p-4 border border-border rounded-lg bg-card">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium">
              {componentName} Error
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            This component failed to load properly.
          </p>
          <Button size="sm" variant="outline" onClick={resetError}>
            <RefreshCw className="w-3 h-3 mr-1" />
            Retry
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

// Global error handler for unhandled promise rejections
export function setupGlobalErrorHandling() {
  if (typeof window === 'undefined') return;

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Prevent the default browser behavior
    event.preventDefault();
  });

  // Handle general JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });
}

// Type declarations for global error handlers
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, properties?: Record<string, unknown>) => void;
  }
}
