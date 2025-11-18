"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael R.",
    location: "Roseville, CA",
    rating: 5,
    text: "Sierra Property Partners has been managing my two rental properties in Roseville for over 2 years. Their tenant screening process is excellent - haven't had a single issue with late payments or property damage. The 24/7 maintenance response is incredible; they had a plumber out within 2 hours when we had a pipe leak at 10 PM on a weekend.",
    service: "Residential Property Management",
    date: "November 2024"
  },
  {
    id: 2,
    name: "Sarah K.",
    location: "Auburn, CA",
    rating: 5,
    text: "After struggling with property management companies that didn't understand our mountain property needs, we found Sierra Property Partners. They understand the unique challenges of managing a rental in the Sierra foothills - from winterization to dealing with seasonal renters. Our occupancy rate went from 60% to 95% under their management.",
    service: "Short-Term Rental Management",
    date: "October 2024"
  },
  {
    id: 3,
    name: "David & Jennifer L.",
    location: "Folsom, CA",
    rating: 5,
    text: "We own a duplex in Folsom and were spending way too much time dealing with tenant issues. Sierra Property Partners took over everything - from tenant placement to maintenance coordination. We love getting our monthly statements online and not having to chase down rent payments. Highly recommend for anyone in the Sacramento area.",
    service: "Residential Property Management",
    date: "September 2024"
  },
  {
    id: 4,
    name: "Robert T.",
    location: "Grass Valley, CA",
    rating: 5,
    text: "I've been a landlord for 15 years and Sierra Property Partners is by far the best management company I've worked with. Their knowledge of Nevada County rental laws and local market conditions is impressive. They increased our rental income by 15% through better tenant placement and strategic rent increases.",
    service: "Property Management & Leasing",
    date: "August 2024"
  },
  {
    id: 5,
    name: "Lisa M.",
    location: "Truckee, CA",
    rating: 5,
    text: "Managing our vacation rental in Truckee was becoming overwhelming. Sierra Property Partners handles everything - from booking coordination to housekeeping to maintenance. They've increased our bookings by 40% and our revenue has never been better. The professional service is worth every penny.",
    service: "Short-Term Rental Management",
    date: "July 2024"
  },
  {
    id: 6,
    name: "Tom & Anne W.",
    location: "Placerville, CA",
    rating: 5,
    text: "We own several rental properties in El Dorado County and needed professional management. Sierra Property Partners handles our portfolio seamlessly - from marketing vacant units to coordinating repairs with their vetted contractor network. Their monthly financial reporting is detailed and transparent.",
    service: "Portfolio Management",
    date: "June 2024"
  }
];

interface TestimonialsProps {
  maxItems?: number;
  showTitle?: boolean;
  className?: string;
}

export function Testimonials({ maxItems = 6, showTitle = true, className = "" }: TestimonialsProps) {
  const displayTestimonials = testimonials.slice(0, maxItems);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {showTitle && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            What Property Owners Say About Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real reviews from property owners across Northern California
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="h-8 w-8 text-primary opacity-50" />
                <div className="flex space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-foreground mb-6 flex-grow">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Customer Info */}
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                <div className="text-sm text-primary font-medium">{testimonial.service}</div>
                <div className="text-xs text-muted-foreground mt-1">{testimonial.date}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Google Reviews Link */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground mb-2">
          See more reviews on Google
        </p>
        <div className="flex justify-center items-center space-x-1">
          {renderStars(5)}
          <span className="text-sm font-medium text-foreground ml-2">4.9/5 stars</span>
        </div>
      </div>
    </div>
  );
}