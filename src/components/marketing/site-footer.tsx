import type { Route } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Mail,
  MessageCircle,
  Phone,
  PlaySquare,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { AnalyticsPreferenceTrigger } from "@/components/analytics/analytics-runtime";
import { businessInfo, complianceLinks } from "@/lib/content/legal";

const groups = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Courses", href: "/courses" },
      { label: "eBooks / Resources", href: "/ebook" },
      { label: "About Us", href: "/about" },
      { label: "Contact / Business Address", href: "/business-address" },
    ],
  },
  {
    title: "Legal & Policies",
    links: complianceLinks,
  },
] as const;

export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`bg-brand-navy relative overflow-hidden text-white ${className}`}
    >
      <div className="course-bg-dots-navy pointer-events-none absolute inset-0 opacity-50" />
      <div className="bg-brand-indigo/20 pointer-events-none absolute top-0 right-[8%] h-72 w-72 rounded-full blur-3xl" />

      <div className="section-shell relative py-12 sm:py-16 lg:py-20">
        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-brand-gold text-xs font-bold tracking-[0.22em] uppercase">
              Associates Tax Brief
            </p>
            <h2 className="font-heading mt-4 max-w-xl text-2xl leading-[1.16] font-extrabold tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
              Tax, VAT ও Compliance-এর জরুরি update, সরাসরি আপনার inbox-এ।
            </h2>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/6 p-5 sm:p-6">
            <h3 className="font-heading text-lg font-bold sm:text-xl">
              Tax Brief-এ যুক্ত হোন
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/68">
              নতুন learning resource এবং আপনার আগ্রহের Tax update পেতে interest
              নির্বাচন করে যুক্ত থাকুন।
            </p>
            <Link
              href="/#tax-brief"
              className="focus-ring clicky text-brand-navy hover:bg-brand-cream mt-4 inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold shadow-lg shadow-black/10"
            >
              Tax Brief-এ যুক্ত হোন
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className="my-9 h-px bg-white/12 sm:my-12" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_0.9fr_1.1fr] lg:gap-8">
          <div>
            <BrandLogo inverted />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Tax, VAT, Legal ও Professional Compliance শেখাকে practical,
              structured এবং accessible করে তোলা আমাদের লক্ষ্য।
            </p>
            <div className="mt-6 max-w-sm rounded-2xl border border-white/14 bg-white/5 p-4 text-sm leading-6 text-white/72">
              <div className="flex items-start gap-2.5">
                <Building2 className="text-brand-gold mt-1 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold text-white">
                    {businessInfo.registeredBusinessName}
                  </p>
                  <p className="mt-1 text-white/62">
                    {businessInfo.businessType}
                  </p>
                  <p className="mt-2 font-mono text-xs text-white/72">
                    Trade License: {businessInfo.tradeLicense}
                  </p>
                  <p className="mt-2 text-white/62">{businessInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-white/72">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as Route}
                      className="focus-ring rounded-sm hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase">
              Support
            </h3>
            <dl className="mt-5 space-y-4 text-sm leading-6 text-white/72">
              <div className="space-y-1.5">
                <dt className="sr-only">Phone</dt>
                <dd className="space-y-1.5">
                  {businessInfo.phones.map((phone, index) => (
                    <a
                      key={phone}
                      href={businessInfo.phoneHrefs[index]}
                      className="focus-ring flex w-fit items-center gap-2 rounded-sm hover:text-white"
                    >
                      <Phone className="text-brand-gold h-3.5 w-3.5" />
                      {phone}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="space-y-1.5">
                <dt className="sr-only">Email</dt>
                <dd>
                  <a
                    className="focus-ring inline-flex items-center gap-2 rounded-sm break-all hover:text-white"
                    href={`mailto:${businessInfo.email}`}
                  >
                    <Mail className="text-brand-gold h-3.5 w-3.5" />
                    {businessInfo.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/12 pt-5 text-xs text-white/58 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Associates Academy. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {complianceLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href as Route}
                className="focus-ring rounded-sm hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://facebook.com/associatesacademy"
              aria-label="Facebook"
              className="focus-ring rounded-sm hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com/@associatesacademy"
              aria-label="YouTube"
              className="focus-ring rounded-sm hover:text-white"
            >
              <PlaySquare className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/company/associatesacademy"
              aria-label="LinkedIn"
              className="focus-ring rounded-sm hover:text-white"
            >
              <BriefcaseBusiness className="h-4 w-4" />
            </a>
            <AnalyticsPreferenceTrigger className="focus-ring text-brand-navy hover:bg-brand-cream ml-1 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white shadow-lg shadow-black/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
