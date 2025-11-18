import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, RateLimiter, honeypotSchema, sanitizeInput } from "@/lib/validation/contact";

// Helper function to get client IP
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Fallback for development
  return request.headers.get('x-forwarded-for') || '127.0.0.1';
}

export async function POST(req: Request) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    const userAgent = req.headers.get('user-agent') || '';
    const identifier = `${clientIP}-${userAgent.substring(0, 50)}`; // Truncate user agent
    
    const rateLimitResult = RateLimiter.checkRateLimit(identifier);
    
    if (!rateLimitResult.allowed) {
      const now = Date.now();
      const timeLeft = rateLimitResult.blockedUntil 
        ? Math.ceil((rateLimitResult.blockedUntil - now) / 1000)
        : Math.ceil((rateLimitResult.resetTime - now) / 1000);
      
      return NextResponse.json(
        { 
          ok: false, 
          error: "Too many requests. Please try again later.",
          retryAfter: timeLeft
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': timeLeft.toString(),
          }
        }
      );
    }

    // Parse request data
    const data = await req.json();

    // Honeypot validation for spam protection
    const honeypotResult = honeypotSchema.safeParse(data);
    if (!honeypotResult.success) {
      // Silently accept to not tip off bots
      return NextResponse.json({ ok: true });
    }

    const {
      name = "",
      email = "",
      phone = "",
      county = "",
      city = "",
      propertyType = "",
      message = "",
    } = data || {};

    // Validate data with enhanced schema
    const validationResult = contactSchema.safeParse({
      name: sanitizeInput(name),
      email: email.toLowerCase().trim(),
      phone: phone.replace(/\D/g, ''), // Remove non-digits for validation
      county: county ? sanitizeInput(county) : "",
      city: city ? sanitizeInput(city) : "",
      propertyType: propertyType ? sanitizeInput(propertyType) : "",
      message: sanitizeInput(message),
    });

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { 
          ok: false, 
          errors: {
            name: errors.name?.[0],
            email: errors.email?.[0],
            phone: errors.phone?.[0],
            message: errors.message?.[0],
          }
        }, 
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Configure email transport with environment variables
    const transportHost = process.env.SMTP_HOST;
    const transportUser = process.env.SMTP_USER;
    const transportPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    // Enhanced subject and message formatting
    const subject = `New Property Management Inquiry from ${validatedData.name}${
      validatedData.city ? ` (${validatedData.city}${validatedData.county ? `, ${validatedData.county} County` : ''})` : ''
    }`;
    
    const text = [
      `=== NEW PROPERTY MANAGEMENT INQUIRY ===`,
      ``,
      `Contact Information:`,
      `Name: ${validatedData.name}`,
      `Email: ${validatedData.email}`,
      `Phone: ${validatedData.phone}`,
      ``,
      `Property Details:`,
      ...(validatedData.county ? [`County: ${validatedData.county} County`] : []),
      ...(validatedData.city ? [`City: ${validatedData.city}`] : []),
      ...(validatedData.propertyType ? [`Property Type: ${validatedData.propertyType}`] : []),
      ``,
      `Message:`,
      `${validatedData.message}`,
      ``,
      `=== END INQUIRY ===`,
      ``,
      `--- Technical Details ---`,
      `Client IP: ${clientIP}`,
      `User Agent: ${userAgent}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].filter(Boolean).join('\n');

    // Send email if SMTP is configured
    if (transportHost && transportUser && transportPass && toEmail) {
      const transporter = nodemailer.createTransport({
        host: transportHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false, // Use TLS
        auth: { 
          user: transportUser, 
          pass: transportPass 
        },
      });

      // Verify transport configuration
      await transporter.verify();

      const mailOptions = {
        from: {
          name: `Website Contact <${transportUser}>`,
          address: transportUser,
        },
        to: toEmail,
        replyTo: validatedData.email,
        subject,
        text,
        // Add HTML version for better formatting
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5530; border-bottom: 2px solid #2c5530; padding-bottom: 10px;">
              New Property Management Inquiry
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${validatedData.phone}">${validatedData.phone}</a></p>
            </div>

            ${(validatedData.county || validatedData.city || validatedData.propertyType) ? `
              <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Property Details</h3>
                ${validatedData.county ? `<p><strong>County:</strong> ${validatedData.county} County</p>` : ''}
                ${validatedData.city ? `<p><strong>City:</strong> ${validatedData.city}</p>` : ''}
                ${validatedData.propertyType ? `<p><strong>Property Type:</strong> ${validatedData.propertyType}</p>` : ''}
              </div>
            ` : ''}

            <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Message</h3>
              <p style="line-height: 1.6; white-space: pre-wrap;">${validatedData.message}</p>
            </div>

            <div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 30px; font-size: 12px; color: #666;">
              <p><strong>Technical Details:</strong></p>
              <p>Client IP: ${clientIP}</p>
              <p>User Agent: ${userAgent}</p>
              <p>Timestamp: ${new Date().toISOString()}</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      // Fallback: enhanced logging for development
      console.log("Contact form submission (development mode):", {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        county: validatedData.county,
        city: validatedData.city,
        propertyType: validatedData.propertyType,
        message: validatedData.message,
        clientIP,
        userAgent,
        timestamp: new Date().toISOString(),
      });
    }

    // Return success response
    return NextResponse.json({ 
      ok: true, 
      message: "Thank you for your inquiry. We'll get back to you within 24 hours." 
    });

  } catch (err) {
    console.error("Contact form error:", err);
    
    // Don't expose detailed error information to prevent information leakage
    return NextResponse.json(
      { 
        ok: false, 
        error: "An unexpected error occurred. Please try again later." 
      }, 
      { status: 500 }
    );
  }
}

// Optional: Add cleanup endpoint for rate limiting
export async function GET() {
  // This endpoint can be called periodically to clean up rate limit store
  RateLimiter.cleanup();
  return NextResponse.json({ ok: true, message: "Rate limit store cleaned" });
}
