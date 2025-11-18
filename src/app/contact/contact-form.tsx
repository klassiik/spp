"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { businessInfo } from "@/lib/data/business";
import { counties, locations } from "@/lib/data/locations";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preSelectedCity = searchParams.get("city") || "";
  const preSelectedCounty = searchParams.get("county") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    county: preSelectedCounty,
    city: preSelectedCity,
    propertyType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Contact submission error", data);
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountyCities = formData.county
    ? locations.filter((loc) => loc.county === formData.county)
    : [];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Ready to get started with professional property management? Fill out the form below or give us a call.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Request a Free Consultation</CardTitle>
              <CardDescription>
                Tell us about your property and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitStatus === "success" ? (
                <div className="rounded-lg bg-green-50 p-6 text-center">
                  <h3 className="mb-2 text-lg font-semibold text-green-900">Thank You!</h3>
                  <p className="text-green-700">
                    We've received your message and will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus === "error" && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      Something went wrong sending your message. Please try again or call us at {businessInfo.phone}.
                    </div>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(530) 555-0123"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                      >
                        <SelectTrigger id="propertyType">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-family">Single-Family Home</SelectItem>
                          <SelectItem value="multi-family">Multi-Family</SelectItem>
                          <SelectItem value="condo">Condominium</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="hoa">HOA</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="county">County *</Label>
                      <Select
                        value={formData.county}
                        onValueChange={(value) => setFormData({ ...formData, county: value, city: "" })}
                        required
                      >
                        <SelectTrigger id="county">
                          <SelectValue placeholder="Select county" />
                        </SelectTrigger>
                        <SelectContent>
                          {counties.map((county) => (
                            <SelectItem key={county.slug} value={county.slug}>
                              {county.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => setFormData({ ...formData, city: value })}
                        disabled={!formData.county}
                      >
                        <SelectTrigger id="city">
                          <SelectValue placeholder={formData.county ? "Select city" : "Select county first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCountyCities.map((city) => (
                            <SelectItem key={city.slug} value={city.slug}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your property and management needs..."
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium">{businessInfo.address.street}</div>
                  <div className="text-muted-foreground">
                    {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <a href={`tel:${businessInfo.phoneRaw}`} className="text-sm text-primary hover:underline">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <a href={`mailto:${businessInfo.email}`} className="text-sm text-primary hover:underline">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium">Office Hours</div>
                  <div className="text-muted-foreground">Monday - Friday: {businessInfo.hours.monday}</div>
                  <div className="text-muted-foreground">Saturday: {businessInfo.hours.saturday}</div>
                  <div className="text-muted-foreground">Sunday: {businessInfo.hours.sunday}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                We serve 60+ communities across Northern California
              </p>
              <ul className="space-y-2 text-sm">
                {counties.map((county) => (
                  <li key={county.slug} className="text-muted-foreground">
                    • {county.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}