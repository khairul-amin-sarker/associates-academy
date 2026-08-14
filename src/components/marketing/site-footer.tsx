import Link from "next/link";
import { BriefcaseBusiness, Mail, MessageCircle, PlaySquare } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { siteConfig } from "@/lib/site";

const groups = [
  { title: "শিখুন", links: [["কোর্স", "/courses"], ["eBook", "/ebook"], ["ওয়ার্কশপ", "/workshop"], ["রিসোর্স", "/resources"]] },
  { title: "একাডেমি", links: [["আমাদের সম্পর্কে", "/about"], ["সার্টিফিকেট যাচাই", "/verify"], ["যোগাযোগ", "/contact"], ["লগইন", "/auth"]] },
  { title: "নীতিমালা", links: [["Privacy", "/privacy"], ["Terms", "/terms"], ["Refund Policy", "/refund-policy"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="section-shell grid gap-10 py-14 lg:grid-cols-[1.3fr_2fr] lg:py-18">
        <div><BrandLogo inverted /><p className="mt-5 max-w-md text-sm leading-7 text-white/70">Tax, VAT, Legal ও Professional Compliance শেখাকে practical, structured এবং accessible করে তোলা আমাদের লক্ষ্য।</p><a className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white" href={`mailto:${siteConfig.supportEmail}`}><Mail className="h-4 w-4" />{siteConfig.supportEmail}</a></div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((group) => <div key={group.title}><h3 className="font-heading text-lg font-semibold text-brand-gold">{group.title}</h3><ul className="mt-4 space-y-3 text-sm text-white/70">{group.links.map(([label, href]) => <li key={href}><Link href={href} className="hover:text-white">{label}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="border-t border-white/10"><div className="section-shell flex flex-col gap-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Associates Academy. সর্বস্বত্ব সংরক্ষিত।</p><div className="flex items-center gap-4"><a href={siteConfig.socials.facebook} aria-label="Facebook"><MessageCircle className="h-4 w-4" /></a><a href={siteConfig.socials.youtube} aria-label="YouTube"><PlaySquare className="h-4 w-4" /></a><a href={siteConfig.socials.linkedin} aria-label="LinkedIn"><BriefcaseBusiness className="h-4 w-4" /></a></div></div></div>
    </footer>
  );
}
