import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { legalPages } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Delivery Policy",
  description:
    "Associates Academy delivery policy for live courses, dashboards, eBooks and other digital materials.",
};

export default function DeliveryPolicyPage() {
  const page = legalPages.delivery;
  return (
    <LegalPage
      eyebrow={page.eyebrow}
      title={page.title}
      description={page.description}
      lastUpdated={page.lastUpdated}
      sections={page.sections}
    />
  );
}
