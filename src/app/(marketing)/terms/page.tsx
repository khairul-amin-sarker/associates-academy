import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { legalPages } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Associates Academy website, course, eBook and digital service terms and conditions.",
};

export default function TermsPage() {
  const page = legalPages.terms;
  return (
    <LegalPage
      eyebrow={page.eyebrow}
      title={page.title}
      description={page.description}
      lastUpdated={page.lastUpdated}
      sections={[
        ...page.intro.map((paragraph) => ({ paragraphs: [paragraph] })),
        ...page.sections,
      ]}
    />
  );
}
