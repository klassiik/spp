"use client";

import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResponsiveCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
  children?: React.ReactNode;
  featured?: boolean;
  onClick?: () => void;
  variant?: "default" | "featured" | "outline";
}

export function ResponsiveCard({
  title,
  description,
  icon: Icon,
  href,
  className,
  children,
  featured = false,
  onClick,
  variant = "default",
}: ResponsiveCardProps) {
  const baseClasses = "group hover:shadow-lg transition-all duration-300 ease-in-out";
  
  const variantClasses = {
    default: "hover:border-primary/50",
    featured: "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/70 hover:shadow-primary/10",
    outline: "border-2 hover:border-primary hover:bg-primary/5",
  };

  return (
    <Card 
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <div className={cn(
          "w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-all duration-300",
          featured 
            ? "bg-gradient-to-br from-primary to-primary/80 text-white group-hover:from-primary/90 group-hover:to-primary/70"
            : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
        )}>
          <Icon className="h-7 w-7" />
        </div>
        <CardTitle className={cn(
          "group-hover:text-primary transition-colors duration-300",
          featured && "text-primary"
        )}>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children || (
          <Button 
            asChild 
            variant="outline" 
            className={cn(
              "w-full group-hover:border-primary group-hover:text-primary transition-all duration-300",
              featured && "border-primary/20 hover:border-primary hover:bg-primary hover:text-white"
            )}
          >
            <Link href={href}>
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3 },
  gap = "md",
  className 
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: "gap-3",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-10",
  };

  const columnClasses = {
    sm: columns.sm ? `grid-cols-${columns.sm}` : "",
    md: columns.md ? `md:grid-cols-${columns.md}` : "",
    lg: columns.lg ? `lg:grid-cols-${columns.lg}` : "",
    xl: columns.xl ? `xl:grid-cols-${columns.xl}` : "",
  };

  return (
    <div className={cn(
      "grid",
      columnClasses.sm,
      columnClasses.md,
      columnClasses.lg,
      columnClasses.xl,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}

// Skeleton loader for responsive cards
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ResponsiveGrid columns={{ sm: 1, md: 2, lg: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="w-14 h-14 bg-muted rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-10 bg-muted rounded" />
          </CardContent>
        </Card>
      ))}
    </ResponsiveGrid>
  );
}

// Icon wrapper for better tree-shaking
export function IconWrapper({ 
  icon: Icon, 
  className,
  size = "default" 
}: { 
  icon: LucideIcon; 
  className?: string;
  size?: "sm" | "default" | "lg" | "xl";
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  return <Icon className={cn(sizeClasses[size], className)} />;
}
