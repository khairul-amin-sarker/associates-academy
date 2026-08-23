import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { AnalyticsPreferenceTrigger } from "@/components/analytics/analytics-runtime";
import { SiteHeader } from "@/components/marketing/site-header";
import { businessInfo } from "@/lib/content/legal";
export function CheckoutReferenceHeader() {
  return <SiteHeader />;
}

export function CheckoutReferenceFooter({
  courseTitle,
  courseSummary,
}: {
  courseTitle: string;
  courseSummary: string | null;
}) {
  return (
    <footer className="bg-brand-navy relative overflow-hidden text-white">
      <div className="course-bg-dots-navy pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 pt-14 pb-8 sm:grid-cols-2 lg:grid-cols-4">
        <section>
          <div className="flex items-center gap-3">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white p-2">
              <Image
                src="/brand/logo.png"
                width={72}
                height={72}
                alt="Associates Academy logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-heading font-extrabold">
                Associates Academy
              </h2>
              <p className="text-xs text-white/60">Professional Learning</p>
            </div>
          </div>
          <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/70">
            Bangla-তে প্রফেশনাল Tax, VAT ও Legal Compliance training।
          </p>
        </section>

        <section>
          <h2 className="text-xs font-bold tracking-[0.19em] text-white/64 uppercase">
            Contact
          </h2>
          <a
            href={businessInfo.phoneHrefs[0]}
            className="focus-ring hover:text-brand-gold mt-3 inline-flex items-center gap-2 rounded-md text-sm text-white"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp: {businessInfo.phones[0]}
          </a>
        </section>

        <section>
          <h2 className="text-xs font-bold tracking-[0.19em] text-white/64 uppercase">
            Legal
          </h2>
          <nav className="mt-3 grid gap-2 text-sm text-white/80">
            <Link
              href="/terms"
              className="focus-ring w-fit rounded-md hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="focus-ring w-fit rounded-md hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/refund-policy"
              className="focus-ring w-fit rounded-md hover:text-white"
            >
              Refund Policy
            </Link>
          </nav>
        </section>

        <section>
          <h2 className="text-xs font-bold tracking-[0.19em] text-white/64 uppercase">
            Course
          </h2>
          <p className="mt-3 text-sm text-white/80">{courseTitle}</p>
          {courseSummary ? (
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {courseSummary}
            </p>
          ) : null}
          <p className="mt-2 text-sm text-white/80">
            Certificate on completion
          </p>
        </section>
      </div>
      <div className="relative mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-white/10 px-4 pt-6 text-xs text-white/60">
        <p>© 2026 Associates Academy — Professional Training</p>
        <AnalyticsPreferenceTrigger className="focus-ring text-brand-navy grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white shadow-lg shadow-black/10 hover:bg-[#f1e7d6]" />
      </div>
    </footer>
  );
}
