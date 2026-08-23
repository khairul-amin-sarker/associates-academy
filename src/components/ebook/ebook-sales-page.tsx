"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  Layers,
  Lock,
  MessageCircle,
  ShieldCheck,
  Table2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { CheckoutConsent } from "@/components/checkout/checkout-consent";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import {
  ebook,
  ebookAudience,
  ebookDisclaimer,
  ebookEndMatter,
  ebookFaqs,
  ebookLearnings,
  ebookModules,
  ebookPreviewPages,
  ebookStats,
} from "@/lib/content/ebook";

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 overflow-x-clip px-4 py-12 sm:px-6 sm:py-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-[color:var(--navy)] uppercase ${className}`}
    >
      {children}
    </div>
  );
}

const problemItems = [
  "আয়কর আইন, ২০২৩ পুরোনো অধ্যাদেশের ধারা-বিন্যাস বদলে দিয়েছে — পুরোনো নোট আর মেলে না।",
  "TDS-এর হার, base value ও grossing-up নিয়ে বাস্তব কাজে সবচেয়ে বেশি ভুল হয়।",
  "রেয়াত, সারচার্জ ও ন্যূনতম কর — কোন ধাপে কী বসবে তা ছড়িয়ে-ছিটিয়ে থাকে।",
  "রিটার্ন, নিরূপণ, আপিল ও জরিমানার ধাপগুলো একসাথে কোথাও পাওয়া যায় না।",
] as const;

const solutionItems = [
  "নতুন আইনের কাঠামো ধরে ধারা-ভিত্তিক সাজানো ৬টি মডিউল।",
  "সম্পূর্ণ TDS Rate Matrix ও কর্তন-ধারা (৮৬–১৩৯) এক জায়গায় সারণিবদ্ধ।",
  "Base Value ও Grossing-Up — ধাপে ধাপে worked example সহ।",
  "Return → Assessment → Appeal → Penalty পুরো workflow একত্রে।",
  "৮টি তফসিলের ম্যাপ, Section Index ও বাংলা–ইংরেজি Glossary।",
] as const;

const priceFeatures = [
  { icon: BookOpen, text: "সম্পূর্ণ ১২৩ পৃষ্ঠার PDF (A4)" },
  { icon: Layers, text: "৬টি মডিউল + পরিশিষ্ট ও Section Index" },
  { icon: Table2, text: "৪০+ সারণি ও সম্পূর্ণ TDS Rate Matrix" },
  { icon: FileText, text: "১৫+ Worked Example (Base Value ও Grossing-Up সহ)" },
  { icon: Download, text: "পেমেন্টের সাথে সাথেই instant download" },
  { icon: Lock, text: "ব্যক্তিগত secure download link — ইমেইলেও পাঠানো হয়" },
] as const;

const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBanglaDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
}

function formatPrice(value: number) {
  return `৳${toBanglaDigits(value)}`;
}

export function EbookSalesPage() {
  const discount = Math.round(
    ((ebook.regularPrice - ebook.offerPrice) / ebook.regularPrice) * 100,
  );

  const openBuy = () => {
    const checkout = document.getElementById("checkout");
    if (!checkout) return;
    window.history.replaceState(null, "", "#checkout");
    checkout.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      document.getElementById("buy-name")?.focus({ preventScroll: true });
    }, 700);
  };

  return (
    <main className="ebook-page text-navy min-h-screen overflow-x-clip">
      <SiteHeader />

      <Section className="ebook-bg-dots">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Eyebrow>{ebook.edition}</Eyebrow>
            <h1 className="font-heading text-navy mt-4 text-3xl leading-tight font-extrabold sm:text-5xl">
              {ebook.title}
            </h1>
            <p className="font-heading mt-3 text-lg text-[color:var(--indigo)] sm:text-2xl">
              {ebook.subtitle}
            </p>
            <p className="text-blue mt-4 max-w-xl">
              {ebook.tagline} ১২৩ পৃষ্ঠার এই professional study companion-এ ৬টি
              কাঠামোবদ্ধ মডিউল, ৪০+ সারণি, ১৫+ Worked Example, সম্পূর্ণ TDS Rate
              Matrix, ৮টি তফসিলের ম্যাপ, Section Index ও বাংলা–ইংরেজি Glossary
              রয়েছে।
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <div className="font-heading text-navy text-4xl font-extrabold">
                {formatPrice(ebook.offerPrice)}
              </div>
              <div className="text-blue pb-1 text-lg line-through">
                {formatPrice(ebook.regularPrice)}
              </div>
              <div className="mb-1 rounded-full bg-[color:var(--gold)]/20 px-2.5 py-1 text-xs font-bold text-[color:var(--navy)]">
                {toBanglaDigits(discount)}% ছাড়
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={openBuy}
                className="ebook-shadow-lift inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--indigo)] px-6 py-4 text-base font-extrabold text-white transition hover:brightness-105 active:scale-[0.98] sm:w-auto"
              >
                এখনই ইবুকটি কিনুন <ArrowRight className="h-5 w-5 shrink-0" />
              </button>
              <a
                href="#preview"
                className="text-navy ebook-shadow-soft inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[color:var(--border)] bg-white px-6 py-4 text-base font-bold transition active:scale-[0.98] sm:w-auto"
              >
                ভিতরের পৃষ্ঠা দেখুন
              </a>
            </div>
            <p className="text-blue mt-3 flex items-start gap-2 text-sm">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                পেমেন্ট সফল হলেই ব্যক্তিগত dashboard-এ secure download access।
              </span>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[320px] sm:max-w-sm">
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[color:var(--indigo)]/10 blur-2xl" />
            <div className="ebook-shadow-lift relative -rotate-2 rounded-2xl bg-white p-2 ring-1 ring-[color:var(--border)]">
              <Image
                src="/ebook/page-1.jpg"
                alt={`${ebook.title} — eBook cover`}
                width={827}
                height={1170}
                priority
                className="h-auto w-full rounded-xl"
              />
            </div>
            <div className="relative mt-4 grid grid-cols-2 gap-2">
              {ebookStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[color:var(--border)] bg-white/80 px-3 py-2 text-center"
                >
                  <div className="font-heading text-navy text-xl font-extrabold">
                    {stat.value}
                  </div>
                  <div className="text-blue text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)] p-6">
            <h2 className="font-heading text-navy text-xl font-extrabold">
              সমস্যাটা কোথায়?
            </h2>
            <ul className="text-navy/80 mt-4 space-y-3 text-sm">
              {problemItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--destructive)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ebook-shadow-soft rounded-2xl border border-[color:var(--indigo)]/25 bg-white p-6">
            <h2 className="font-heading text-navy text-xl font-extrabold">
              এই ইবুক যেভাবে সমাধান দেয়
            </h2>
            <ul className="text-navy/80 mt-4 space-y-3 text-sm">
              {solutionItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--indigo)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="modules">
        <Eyebrow>কনটেন্ট ওভারভিউ</Eyebrow>
        <h2 className="font-heading text-navy mt-3 text-2xl font-extrabold sm:text-3xl">
          ৬টি মডিউলে সাজানো সম্পূর্ণ কাঠামো
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {ebookModules.map((module) => (
            <article
              key={module.number}
              className="ebook-shadow-soft relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white p-6"
            >
              <div className="absolute top-0 left-0 h-full w-1 bg-[color:var(--gold)]" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-heading text-sm font-extrabold text-[color:var(--gold)]">
                    মডিউল {module.number}
                  </div>
                  <h3 className="font-heading text-navy mt-1 text-lg font-extrabold">
                    {module.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-[color:var(--muted)] px-2.5 py-1 text-xs font-bold text-[color:var(--indigo)]">
                  পৃষ্ঠা {module.page}
                </span>
              </div>
              <ul className="text-navy/75 mt-4 space-y-2 text-sm">
                {module.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--indigo)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-white/70 p-6">
          <h3 className="font-heading text-navy text-base font-extrabold">
            পরিশিষ্ট ও রেফারেন্স
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {ebookEndMatter.map((item) => (
              <span
                key={item}
                className="text-navy rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1.5 text-xs font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[color:var(--navy)] text-white">
        <Eyebrow className="border-white/30 bg-white/10 text-white">
          শিখনফল
        </Eyebrow>
        <h2 className="font-heading mt-3 text-2xl font-extrabold sm:text-3xl">
          পড়া শেষে আপনি যা পারবেন
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {ebookLearnings.map((learning) => (
            <div
              key={learning}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" />
              <span className="text-white/90">{learning}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <Eyebrow>কার জন্য</Eyebrow>
        <h2 className="font-heading text-navy mt-3 text-2xl font-extrabold sm:text-3xl">
          এই ইবুকটি কাদের জন্য উপযোগী
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ebookAudience.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/60 p-5"
            >
              <h3 className="font-heading text-navy text-base font-extrabold">
                {item.title}
              </h3>
              <p className="text-blue mt-1 text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="preview" className="ebook-bg-dots">
        <Eyebrow>ভিতরের পৃষ্ঠা</Eyebrow>
        <h2 className="font-heading text-navy mt-3 text-2xl font-extrabold sm:text-3xl">
          বইয়ের বাস্তব পৃষ্ঠার প্রিভিউ
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ebookPreviewPages.map((page) => (
            <figure
              key={page.src}
              className="ebook-shadow-soft overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white"
            >
              <Image
                src={page.src}
                alt={page.caption}
                width={1075}
                height={1521}
                className="h-auto w-full"
              />
              <figcaption className="text-blue border-t border-[color:var(--border)] px-4 py-3 text-xs font-semibold">
                {page.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
          <div className="ebook-shadow-soft mx-auto w-44 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)] md:w-full">
            <Image
              src="/brand/founder.png"
              alt="মোহাম্মদ খাইরুল আমিন সরকার"
              width={1122}
              height={1402}
              className="h-auto w-full"
            />
          </div>
          <div>
            <Eyebrow>লেখক পরিচিতি</Eyebrow>
            <h2 className="font-heading text-navy mt-3 text-2xl font-extrabold">
              মোহাম্মদ খাইরুল আমিন সরকার
            </h2>
            <p className="mt-1 font-semibold text-[color:var(--indigo)]">
              Income Tax Lawyer · CEO, Associates Academy
            </p>
            <ul className="text-navy/80 mt-4 space-y-2 text-sm">
              {[
                "LLB, CA-CC, MBA (Finance)",
                "১৩+ বছরের আয়কর আইন ও প্র্যাকটিসের বাস্তব অভিজ্ঞতা",
                "২৬+ বছরের সামগ্রিক পেশাগত অভিজ্ঞতা",
                "Member, Dhaka Taxes Bar Association — Enrolment #K00646",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--indigo)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="pricing">
        <div className="ebook-shadow-lift mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white">
          <div className="bg-[color:var(--navy)] px-6 py-5 text-white">
            <div className="text-[11px] font-bold tracking-[0.18em] text-[color:var(--gold)] uppercase">
              {ebook.edition}
            </div>
            <h2 className="font-heading mt-1 text-xl font-extrabold">
              {ebook.title}
            </h2>
            <p className="text-sm text-white/70">{ebook.subtitle}</p>
          </div>
          <div className="p-6">
            <div className="flex items-end gap-3">
              <div className="font-heading text-navy text-4xl font-extrabold">
                {formatPrice(ebook.offerPrice)}
              </div>
              <div className="text-blue pb-1 text-lg line-through">
                {formatPrice(ebook.regularPrice)}
              </div>
            </div>
            <ul className="text-navy/80 mt-5 space-y-3 text-sm">
              {priceFeatures.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--indigo)]" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={openBuy}
              className="ebook-shadow-lift mt-6 w-full rounded-2xl bg-[color:var(--indigo)] px-6 py-4 text-base font-extrabold text-white transition hover:brightness-105 active:scale-[0.98]"
            >
              এখনই ইবুকটি কিনুন
            </button>
            <p className="text-blue mt-3 text-center text-xs">
              ভাষা: {ebook.language} · ফরম্যাট: {ebook.format}
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="font-heading text-navy mt-3 text-2xl font-extrabold sm:text-3xl">
          সাধারণ জিজ্ঞাসা
        </h2>
        <div className="mt-8 space-y-3">
          {ebookFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 p-5"
            >
              <summary className="font-heading text-navy flex cursor-pointer list-none items-center justify-between gap-3 text-base font-bold">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-[color:var(--indigo)] transition group-open:rotate-180" />
              </summary>
              <p className="text-navy/75 mt-3 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="bg-[color:var(--navy)] text-white">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
            আজই শুরু করুন আপনার আয়কর আইন, ২০২৩ যাত্রা
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            নাম, ইমেইল ও মোবাইল নম্বর দিয়ে নিরাপদ checkout সম্পন্ন করুন—পেমেন্ট
            verify হলেই eBook access পাবেন।
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openBuy}
              className="ebook-shadow-lift inline-flex items-center gap-2 rounded-2xl bg-[color:var(--gold)] px-7 py-4 text-base font-extrabold text-[color:var(--navy)]"
            >
              {formatPrice(ebook.offerPrice)} — ইবুকটি কিনুন
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href={`https://wa.me/${ebook.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/25 px-6 py-4 text-base font-bold text-white"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp এ প্রশ্ন করুন
            </a>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-5 text-xs leading-relaxed text-white/70">
          <strong className="text-white/90">
            আইনি দাবিত্যাগ (Disclaimer):
          </strong>{" "}
          {ebookDisclaimer}
        </p>
      </Section>

      <BuySection />
      <EbookFooter />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-white/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <div className="flex items-center gap-3">
          <div className="shrink-0 leading-tight">
            <div className="font-heading text-navy text-lg font-extrabold">
              {formatPrice(ebook.offerPrice)}
            </div>
            <div className="text-blue text-xs line-through">
              {formatPrice(ebook.regularPrice)}
            </div>
          </div>
          <button
            type="button"
            onClick={openBuy}
            className="ebook-shadow-soft min-w-0 flex-1 rounded-xl bg-[color:var(--indigo)] px-4 py-3 text-sm font-extrabold whitespace-nowrap text-white transition active:scale-[0.98]"
          >
            এখনই কিনুন
          </button>
        </div>
      </div>
    </main>
  );
}

function BuySection() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [gatewayError, setGatewayError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setGatewayError(null);

    if (form.name.trim().length < 2)
      return toast.error("আপনার পূর্ণ নাম লিখুন।");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return toast.error("সঠিক ইমেইল দিন।");
    if (form.phone.trim().length < 8)
      return toast.error("সঠিক মোবাইল নম্বর দিন।");

    setLoading(true);
    try {
      const response = await fetch("/api/payments/paystation/initiate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productSlug: "fundamentals-income-tax-ebook",
          customer: {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
          },
        }),
      });
      const data = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };
      if (response.status === 401) {
        router.push("/auth?next=%2Febook%23checkout");
        return;
      }
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? "checkout_failed");
      }
      window.location.assign(data.checkoutUrl);
    } catch {
      const message =
        "পেমেন্ট শুরু করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন অথবা WhatsApp-এ যোগাযোগ করুন।";
      setGatewayError(message);
      toast.error(message);
      setLoading(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-base text-navy outline-none transition focus:border-[color:var(--indigo)] focus:ring-2 focus:ring-[color:var(--indigo)]/15 sm:text-sm";

  return (
    <Section id="checkout" className="scroll-mt-20 bg-[color:var(--cream)]">
      <form
        onSubmit={submit}
        className="ebook-shadow-lift mx-auto w-full max-w-md rounded-3xl border border-[color:var(--border)] bg-white p-5 sm:p-6"
      >
        <h2 className="font-heading text-navy text-xl font-extrabold">
          ডিজিটাল ইবুকটি কিনুন
        </h2>
        <p className="text-blue mt-1 text-xs">
          পেমেন্টের পর সাথে সাথে download access পাবেন।
        </p>
        <p className="text-blue text-sm">
          পরিশোধযোগ্য:{" "}
          <strong className="text-navy">{formatPrice(ebook.offerPrice)}</strong>
        </p>

        <div className="mt-5 space-y-3">
          <div>
            <label htmlFor="buy-name" className="text-navy text-xs font-bold">
              পূর্ণ নাম
            </label>
            <input
              id="buy-name"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  emailRef.current?.focus();
                }
              }}
              autoComplete="name"
              enterKeyHint="next"
              placeholder="আপনার নাম"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="buy-email" className="text-navy text-xs font-bold">
              ইমেইল (ডাউনলোড লিংক এখানে যাবে)
            </label>
            <input
              id="buy-email"
              ref={emailRef}
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  phoneRef.current?.focus();
                }
              }}
              autoComplete="email"
              enterKeyHint="next"
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="buy-phone" className="text-navy text-xs font-bold">
              মোবাইল নম্বর
            </label>
            <input
              id="buy-phone"
              ref={phoneRef}
              inputMode="tel"
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
              autoComplete="tel"
              enterKeyHint="done"
              placeholder="01XXXXXXXXX"
              className={inputClass}
            />
          </div>
        </div>

        {gatewayError ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {gatewayError}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="ebook-shadow-lift mt-6 w-full rounded-2xl bg-[color:var(--indigo)] px-6 py-4 text-base font-extrabold text-white transition active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন…" : "পেমেন্ট করুন / Pay Now"}
        </button>
        <CheckoutConsent className="mt-3 text-center" />
        <p className="text-blue mt-3 text-center text-xs">
          bKash · Nagad · Rocket — পেমেন্ট server-side verify করা হয়।
        </p>
      </form>
    </Section>
  );
}

function EbookFooter() {
  return (
    <div className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-0">
      <SiteFooter />
    </div>
  );
}
