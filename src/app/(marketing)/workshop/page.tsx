import type { Metadata } from "next";
import { WorkshopLanding } from "@/components/marketing/workshop/workshop-landing";
import { workshopConfig } from "@/lib/content/workshop";
import { createPublicServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Free Income Tax Return Workshop | Paper Return to NBR E-Return | Associates Academy",
  description:
    "২৬ আগস্ট রাত ৯টায় Free Live Workshop—Paper Return থেকে NBR E-Return পর্যন্ত Complete Income Tax Return Preparation একটি practical example-এর মাধ্যমে বুঝুন।",
  alternates: {
    canonical: "/workshop",
  },
  openGraph: {
    title: "Free Income Tax Return Workshop | Paper Return to NBR E-Return",
    description:
      "২৬ আগস্ট রাত ৯টায় Free Live Workshop—Paper Return থেকে NBR E-Return পর্যন্ত Complete Income Tax Return Preparation একটি practical example-এর মাধ্যমে বুঝুন।",
    url: "/workshop",
    type: "website",
    locale: "bn_BD",
    siteName: "Associates Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Income Tax Return Workshop | Associates Academy",
    description:
      "২৬ আগস্ট রাত ৯টায় Free Live Workshop—Paper Return থেকে NBR E-Return পর্যন্ত Complete Return Preparation বুঝুন।",
  },
};

const jsonLdEvent = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Free Income Tax Return Workshop: Paper Return থেকে NBR E-Return",
  description:
    "Paper Return থেকে NBR E-Return — Complete Return Preparation বুঝুন হাতে-কলমে। ২৬ আগস্ট রাত ৯টা, Google Meet।",
  startDate: workshopConfig.startsAt,
  endDate: workshopConfig.endsAt,
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "VirtualLocation",
    url: "https://meet.google.com",
  },
  organizer: {
    "@type": "Organization",
    name: "Associates Academy",
    url: "https://associatesacademy.bd",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BDT",
    availability: "https://schema.org/InStock",
    url: "https://associatesacademy.bd/workshop",
  },
  performer: {
    "@type": "Person",
    name: "Mohammad Khairul Amin Sarker",
    jobTitle: "Income Tax Lawyer",
  },
};

export default async function WorkshopPage() {
  let initialWorkshop = undefined;

  try {
    const supabase = createPublicServerClient();
    const { data: workshop } = await supabase
      .from("workshops")
      .select("status, registration_enabled, starts_at")
      .in("slug", [
        "paper-return-to-e-return-2026-08-26",
        "paper-return-to-e-return-live-workshop",
      ])
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (workshop) {
      initialWorkshop = {
        status: workshop.status,
        registrationEnabled: workshop.registration_enabled,
        startsAt: workshop.starts_at,
      };
    }
  } catch {
    // Fall back to static config
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
      />
      <WorkshopLanding initialWorkshop={initialWorkshop} />
    </>
  );
}
