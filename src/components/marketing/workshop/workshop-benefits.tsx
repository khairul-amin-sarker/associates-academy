import React from "react";
import { Sparkles } from "lucide-react";
import { workshopBenefits } from "@/lib/content/workshop";

export function WorkshopBenefits() {
  return (
    <section className="relative border-t border-brand-navy/10 bg-white py-14 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 xl:gap-20">
          {/* Left Column: Section Story & Editorial Narrative */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-brand-cream/60 px-3 py-1 text-xs font-bold text-brand-navy">
                <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
                <span className="tracking-[0.14em] uppercase text-[11px]">
                  WORKSHOP VALUE
                </span>
              </div>

              <h2 className="font-heading mt-4 text-2xl leading-[1.2] font-extrabold text-brand-navy sm:text-3xl lg:text-4xl">
                এই Free Workshop-এ যা যা পাবেন
              </h2>

              <p className="mt-4 text-base leading-relaxed text-brand-navy/80 sm:text-lg sm:leading-8">
                এক ঘণ্টার মধ্যে শুধু Portal দেখানো নয়—একটি Complete Return কীভাবে চিন্তা, প্রস্তুত ও review করতে হয় তার পরিষ্কার roadmap পাবেন।
              </p>
            </div>

            {/* Editorial Insight Card */}
            <div className="mt-8 rounded-2xl border border-brand-indigo/15 bg-[#f7f4ee] p-5 lg:mt-12">
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-brand-indigo">
                PRACTICAL INSIGHT
              </p>
              <p className="font-heading mt-2 text-base font-bold text-brand-navy sm:text-lg">
                NBR E-Return Portal ব্যবহার জানা আর Complete Income Tax Return Prepare করতে জানা এক জিনিস নয়।
              </p>
              <p className="mt-2 text-xs leading-5 text-brand-navy/70">
                Workshop-এ আমরা step-by-step logic এবং computation-এর reconciliation শিখব, যেন কোনো তথ্যে ভুল বা অসঙ্গতি না থাকে।
              </p>
            </div>
          </div>

          {/* Right Column: 6 Compact Editorial Benefit Rows */}
          <div className="space-y-3 sm:space-y-4">
            {workshopBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  className="group rounded-2xl border border-brand-navy/12 bg-[#fffdf9] p-4.5 sm:p-5 transition-all duration-200 hover:border-brand-indigo/30 hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-indigo/20 bg-brand-indigo/8 text-brand-indigo transition-colors group-hover:bg-brand-navy group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-heading text-base font-bold text-brand-navy sm:text-lg">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-brand-navy/75">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
