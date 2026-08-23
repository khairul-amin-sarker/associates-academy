import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { workshopFaqs } from "@/lib/content/workshop";

export function WorkshopFaq() {
  return (
    <section className="relative border-t border-brand-navy/10 bg-white py-14 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-brand-cream/60 px-3 py-1 text-xs font-bold text-brand-navy">
              <HelpCircle className="h-3.5 w-3.5 text-brand-gold" />
              <span className="tracking-[0.14em] uppercase text-[11px]">
                FAQ
              </span>
            </div>

            <h2 className="font-heading mt-4 text-2xl leading-tight font-extrabold text-brand-navy sm:text-3xl lg:text-4xl">
              সাধারণ জিজ্ঞাসা
            </h2>

            <p className="mt-3 text-base text-brand-navy/80 sm:text-lg">
              ওয়ার্কশপ সম্পর্কিত বহুল জিজ্ঞাসিত প্রশ্ন ও উত্তর।
            </p>
          </div>

          {/* Accessible Radix Accordion */}
          <div className="mt-10">
            <Accordion type="single" collapsible className="space-y-3">
              {workshopFaqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="rounded-2xl border border-brand-navy/12 bg-[#fffdf9] px-5 py-1 shadow-2xs transition-colors hover:border-brand-indigo/30"
                >
                  <AccordionTrigger className="font-heading text-left text-base font-bold text-brand-navy sm:text-lg py-4 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-brand-navy/80 sm:text-base pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
