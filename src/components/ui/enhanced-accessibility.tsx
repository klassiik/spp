"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Accessible Button Component with enhanced features
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  loading?: boolean;
  loadingText?: string;
  variant?: 'default' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export function AccessibleButton({
  children,
  ariaLabel,
  ariaDescribedBy,
  loading = false,
  loadingText = 'Loading',
  disabled,
  className = '',
  variant = 'default',
  size = 'md',
  onClick,
  ...props
}: AccessibleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isLoading = loading || disabled;

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={isLoading}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      onClick={isLoading ? undefined : onClick}
      {...props}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span>{isLoading ? loadingText : children}</span>
    </button>
  );
}

// Enhanced navigation with proper ARIA labels
export function AccessibleNavigation({
  children,
  ariaLabel,
  id,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  id?: string;
}) {
  return (
    <nav
      id={id}
      aria-label={ariaLabel}
      role="navigation"
      className="relative"
    >
      {children}
    </nav>
  );
}

// Accessible dropdown menu with focus management
export function AccessibleDropdown({
  trigger,
  children,
  isOpen,
  onToggle,
  label,
  id,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  label: string;
  id?: string;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          onToggle();
          triggerRef.current?.focus();
          break;
        case 'Tab':
          // Let browser handle tab navigation within dropdown
          break;
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          id={id}
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-popover p-1 text-popover-foreground shadow-md"
        >
          {children}
        </div>
      )}
    </div>
  );
}

// Skip link for keyboard navigation
export function SkipLink({ href = '#main-content' }: { href?: string }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md transition-all"
    >
      Skip to main content
    </a>
  );
}

// Screen reader only content
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// Enhanced focus management
export function useFocusManagement() {
  const elementRef = useRef<HTMLElement>(null);

  const focusElement = () => {
    elementRef.current?.focus();
  };

  const focusFirstChild = () => {
    if (elementRef.current) {
      const firstChild = elementRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstChild?.focus();
    }
  };

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  };

  return {
    elementRef,
    focusElement,
    focusFirstChild,
    trapFocus,
  };
}

// Live region for dynamic content announcements
export function LiveRegion({ children, politeness = 'polite' }: {
  children: React.ReactNode;
  politeness?: 'polite' | 'assertive';
}) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}

// Page change announcer for SPA navigation
export function NavigationAnnouncer() {
  const pathname = usePathname();

  return (
    <LiveRegion politeness="polite">
      <div>
        Page changed to {pathname}
      </div>
    </LiveRegion>
  );
}

// Enhanced form field with accessibility
interface AccessibleFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export function AccessibleFormField({
  label,
  error,
  helpText,
  required,
  id,
  className = '',
  ...props
}: AccessibleFormFieldProps) {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={fieldId}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
        {required && <span className="text-destructive ml-1" aria-label="required">*</span>}
      </label>
      
      <input
        id={fieldId}
        className={[
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive',
          className,
        ].join(' ')}
        aria-invalid={!!error}
        aria-describedby={[
          helpText ? helpId : null,
          error ? errorId : null,
        ].filter(Boolean).join(' ') || undefined}
        aria-required={required}
        {...props}
      />

      {helpText && (
        <p id={helpId} className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
