"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { generateFAQSchema } from "@/lib/seo/schemas";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  serviceTitle?: string;
}

export function FAQ({ faqs, serviceTitle }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateFAQSchema(
              faqs.map((faq) => ({
                question: faq.question,
                answer: faq.answer,
              })),
              serviceTitle
            )
          ),
        }}
      />

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
          <h2 className="text-2xl font-bold">
            Frequently Asked Questions
            {serviceTitle && ` about ${serviceTitle}`}
          </h2>
          <p className="text-white/90 mt-2">
            Get answers to common questions about our property management services
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6">
              <button
                className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset rounded-lg p-2 -m-2"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`mt-4 text-muted-foreground transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "opacity-100 max-h-96"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                <div className="pt-2 border-t border-border">
                  <p className="leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}