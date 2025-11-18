import { z } from 'zod';

// Enhanced validation schema with comprehensive checks
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Please enter a valid email address'),
  
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number is too long')
    .regex(
      /^[\+]?[1-9][\d]{0,15}$/,
      'Please enter a valid phone number'
    ),
  
  county: z
    .string()
    .max(50, 'County name is too long')
    .optional()
    .or(z.literal('')),
  
  city: z
    .string()
    .max(100, 'City name is too long')
    .optional()
    .or(z.literal('')),
  
  propertyType: z
    .string()
    .max(100, 'Property type is too long')
    .optional()
    .or(z.literal('')),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .refine((val) => !/<\/?[^>]+(>|$)/.test(val), {
      message: 'HTML tags are not allowed in the message',
    }),
});

// Type inference
export type ContactFormData = z.infer<typeof contactSchema>;

// Rate limiting interface
export interface RateLimitEntry {
  count: number;
  resetTime: number;
  blockedUntil?: number;
}

// In-memory rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, RateLimitEntry>();

export class RateLimiter {
  private static readonly WINDOW_SIZE = 15 * 60 * 1000; // 15 minutes
  private static readonly MAX_REQUESTS = 5; // 5 requests per window
  private static readonly BLOCK_DURATION = 30 * 60 * 1000; // 30 minutes

  static checkRateLimit(identifier: string): { allowed: boolean; resetTime: number; blockedUntil?: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    if (!entry) {
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + this.WINDOW_SIZE,
      });
      return { allowed: true, resetTime: now + this.WINDOW_SIZE };
    }

    // If currently blocked
    if (entry.blockedUntil && now < entry.blockedUntil) {
      return { 
        allowed: false, 
        resetTime: entry.resetTime, 
        blockedUntil: entry.blockedUntil 
      };
    }

    // Reset window if expired
    if (now > entry.resetTime) {
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + this.WINDOW_SIZE,
      });
      return { allowed: true, resetTime: now + this.WINDOW_SIZE };
    }

    // Check if limit exceeded
    if (entry.count >= this.MAX_REQUESTS) {
      // Block the user
      entry.blockedUntil = now + this.BLOCK_DURATION;
      rateLimitStore.set(identifier, entry);
      return { 
        allowed: false, 
        resetTime: entry.resetTime, 
        blockedUntil: entry.blockedUntil 
      };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(identifier, entry);
    
    return { allowed: true, resetTime: entry.resetTime };
  }

  static cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }
}

// Honeypot field for spam protection
export const honeypotSchema = z.object({
  website: z.string().optional(),
}).refine((data) => !data.website, {
  message: 'Spam detected',
  path: ['website'],
});

// Sanitize input function
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}
