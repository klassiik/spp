import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Sierra Property Partners",
  description: "Privacy Policy for Sierra Property Partners property management services. Learn how we collect, use, and protect your personal information.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Privacy Policy</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p className="text-lg text-muted-foreground">
              <strong>Effective Date:</strong> January 1, 2025<br />
              <strong>Last Updated:</strong> January 1, 2025
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Introduction</h2>
            <p>
              Sierra Property Partners ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website sierrapropertypartners.com or use our property management services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Inquire about our property management services</li>
              <li>Fill out contact forms on our website</li>
              <li>Schedule consultations or meetings</li>
              <li>Sign property management agreements</li>
              <li>Communicate with our team via phone, email, or other methods</li>
            </ul>
            <p>This information may include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number</li>
              <li>Property address and ownership information</li>
              <li>Financial information (for management agreements)</li>
              <li>Occupant information (for tenant management)</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p>
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and location information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website information</li>
              <li>Device identifiers</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing and managing property management services</li>
              <li>Processing applications and inquiries</li>
              <li>Communicating with property owners and tenants</li>
              <li>Processing payments and financial transactions</li>
              <li>Maintaining property records and documentation</li>
              <li>Complying with legal and regulatory requirements</li>
              <li>Improving our website and services</li>
              <li>Sending promotional communications (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Information Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.1 Third-Party Service Providers</h3>
            <p>
              We may share your information with third-party service providers who assist us in providing our services, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Property management software providers</li>
              <li>Payment processing companies</li>
              <li>Marketing and communication platforms</li>
              <li>Legal and accounting professionals</li>
              <li>Contractors and vendors (for maintenance and repairs)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.2 Legal Requirements</h3>
            <p>
              We may disclose your information when required by law, legal process, or government request, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Complying with legal obligations</li>
              <li>Protecting our rights and property</li>
              <li>Ensuring tenant and property safety</li>
              <li>Resolving disputes</li>
              <li>Cooperating with law enforcement</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Secure server infrastructure</li>
              <li>Access controls and authentication</li>
              <li>Regular security assessments</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              While we strive to protect your personal information, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Property management records are typically retained for seven years in accordance with industry standards and legal requirements.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your personal information (subject to legal requirements)</li>
              <li>Object to certain processing activities</li>
              <li>Request data portability</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website usage. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Third-Party Websites</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p><strong>Sierra Property Partners</strong><br />
              11985 Heritage Oak Place, Suite 6<br />
              Auburn, CA 95603</p>
              <p><strong>Phone:</strong> (530) 878-8860<br />
              <strong>Email:</strong> info@sierrapropertypartners.com</p>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              This Privacy Policy is effective as of January 1, 2025. By using our website and services, you acknowledge that you have read and understand this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}