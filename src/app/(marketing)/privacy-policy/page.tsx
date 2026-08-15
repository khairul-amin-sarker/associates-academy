import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { legalPages } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Associates Academy privacy policy for account, purchase, payment, course and support information.",
};

export default function PrivacyPolicyPage() {
  const page = legalPages.privacy;
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
