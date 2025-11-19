import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Sierra Property Partners",
  description: "Terms of Service for Sierra Property Partners property management services. Review our terms and conditions for property management services in Northern California.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
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
            <span className="text-foreground font-medium">Terms of Service</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p className="text-lg text-muted-foreground">
              <strong>Effective Date:</strong> January 1, 2025<br />
              <strong>Last Updated:</strong> January 1, 2025
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") govern your use of the Sierra Property Partners website located at sierrapropertypartners.com (the "Service") operated by Sierra Property Partners ("we," "us," or "our"). By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Description of Services</h2>
            <p>
              Sierra Property Partners provides comprehensive property management services throughout Northern California, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Residential and commercial property management</li>
              <li>Tenant placement and leasing services</li>
              <li>Rent collection and financial reporting</li>
              <li>Maintenance and repair coordination</li>
              <li>Property inspections and compliance</li>
              <li>Legal compliance and eviction services</li>
              <li>24/7 emergency support</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Property Management Agreements</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.1 Service Agreement</h3>
            <p>
              Property management services are provided pursuant to separate written agreements between Sierra Property Partners and property owners. These Terms of Service supplement but do not replace the specific terms outlined in individual property management agreements.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.2 Scope of Authority</h3>
            <p>
              Property owners grant Sierra Property Partners specific authorities as outlined in management agreements, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Marketing and leasing properties</li>
              <li>Collecting rents and managing tenant relationships</li>
              <li>Coordinating maintenance and repairs</li>
              <li>Managing vendor relationships and contracts</li>
              <li>Providing financial reporting and accounting</li>
              <li>Ensuring legal and regulatory compliance</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Fees and Compensation</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.1 Management Fees</h3>
            <p>
              Management fees are outlined in individual property management agreements and may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Monthly management fees (typically a percentage of collected rent)</li>
              <li>Leasing fees for new tenant placement</li>
              <li>Renewal fees for lease extensions</li>
              <li>Additional fees for specialized services</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.2 Payment Terms</h3>
            <p>
              Management fees are typically deducted from monthly rental income before distribution to property owners. Late fees or additional charges may apply as outlined in management agreements.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Owner Responsibilities</h2>
            <p>Property owners agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintain properties in rentable condition</li>
              <li>Provide accurate property information and documentation</li>
              <li>Maintain appropriate insurance coverage</li>
              <li>Respond promptly to reasonable requests for decisions</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Pay management fees and expenses as outlined in agreements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              Sierra Property Partners liability is limited to the fees paid for services. We are not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acts of God or natural disasters</li>
              <li>Tenant actions or misconduct</li>
              <li>Property damage not caused by our negligence</li>
              <li>Loss of rental income due to market conditions</li>
              <li>Acts of third parties beyond our reasonable control</li>
              <li>Pre-existing property conditions or defects</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Indemnification</h2>
            <p>
              Property owners agree to indemnify and hold harmless Sierra Property Partners from any claims, damages, or expenses arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Property ownership or operation</li>
              <li>Tenant relationships and actions</li>
              <li>Property maintenance and repairs</li>
              <li>Legal proceedings related to properties</li>
              <li>Insurance claims and coverage issues</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Legal Compliance</h2>
            <p>
              Sierra Property Partners operates in compliance with all applicable laws, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>California Department of Real Estate regulations</li>
              <li>Fair Housing laws and anti-discrimination requirements</li>
              <li>Local property management ordinances</li>
              <li>Environmental and safety regulations</li>
              <li>Tax reporting and withholding requirements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Termination</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">9.1 Termination by Owner</h3>
            <p>
              Property owners may terminate management agreements as outlined in the specific terms of each agreement, typically with 30-60 days written notice.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">9.2 Termination by Company</h3>
            <p>
              Sierra Property Partners may terminate management agreements for reasons including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Non-payment of management fees</li>
              <li>Breach of agreement terms</li>
              <li>Safety concerns or legal issues</li>
              <li>Change in business circumstances</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Sierra Property Partners and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">11. Website Use</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">11.1 Permitted Use</h3>
            <p>
              You may use our website for lawful purposes only. You agree not to use the website:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>In any way that violates applicable laws or regulations</li>
              <li>To transmit harmful or offensive content</li>
              <li>To impersonate others or provide false information</li>
              <li>To interfere with website functionality</li>
              <li>To attempt unauthorized access to our systems</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">11.2 User Accounts</h3>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding your account credentials and all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">12. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">13. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">13.1 Governing Law</h3>
            <p>
              These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">13.2 Dispute Resolution</h3>
            <p>
              Any disputes arising under these Terms shall be resolved through binding arbitration in Placer County, California, in accordance with the rules of the American Arbitration Association.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">14. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">15. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">16. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p><strong>Sierra Property Partners</strong><br />
              11985 Heritage Oak Place, Suite 6<br />
              Auburn, CA 95603</p>
              <p><strong>Phone:</strong> (530) 878-8860<br />
              <strong>Email:</strong> info@sierrapropertypartners.com</p>
              <p><strong>DRE License #:</strong> 02143978</p>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              These Terms of Service are effective as of January 1, 2025. By using our website and services, you acknowledge that you have read and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}