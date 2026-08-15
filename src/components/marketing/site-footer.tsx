import type { Route } from "next";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Mail,
  MessageCircle,
  Phone,
  PlaySquare,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
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

export function SiteFooter() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="section-shell grid gap-10 py-14 lg:grid-cols-[1.15fr_1.35fr_1.2fr] lg:py-18 xl:grid-cols-[1.15fr_1.2fr_1.1fr_1.35fr]">
        <div>
          <BrandLogo inverted />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            Professional Tax & Legal Education Platform
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
            Tax, VAT, Legal ও Professional Compliance শেখাকে practical,
            structured এবং accessible করে তোলা আমাদের লক্ষ্য।
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="font-heading text-brand-gold text-lg font-semibold">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/72">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href as Route} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="font-heading text-brand-gold text-lg font-semibold">
            Business Information
          </h3>
          <dl className="mt-4 space-y-3 text-sm leading-6 text-white/72">
            <div>
              <dt className="text-white/45">Registered Business:</dt>
              <dd className="font-semibold text-white">
                {businessInfo.registeredBusinessName}
              </dd>
            </div>
            <div>
              <dt className="text-white/45">Trade License:</dt>
              <dd className="font-semibold text-white">
                {businessInfo.tradeLicense}
              </dd>
            </div>
            <div>
              <dt className="text-white/45">Phone:</dt>
              <dd className="space-y-1">
                {businessInfo.phones.map((phone, index) => (
                  <a
                    key={phone}
                    href={businessInfo.phoneHrefs[index]}
                    className="flex items-center gap-2 hover:text-white"
                  >
                    <Phone className="text-brand-gold h-3.5 w-3.5" />
                    {phone}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-white/45">Email:</dt>
              <dd>
                <a
                  className="inline-flex items-center gap-2 break-all hover:text-white"
                  href={`mailto:${businessInfo.email}`}
                >
                  <Mail className="text-brand-gold h-3.5 w-3.5" />
                  {businessInfo.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-white/45">Address:</dt>
              <dd>{businessInfo.address}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Associates Academy. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com/associatesacademy"
              aria-label="Facebook"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com/@associatesacademy"
              aria-label="YouTube"
            >
              <PlaySquare className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/company/associatesacademy"
              aria-label="LinkedIn"
            >
              <BriefcaseBusiness className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
