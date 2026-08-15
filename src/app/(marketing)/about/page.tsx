import type { Metadata } from "next";
import Image from "next/image";
import { LegalPage } from "@/components/marketing/legal-page";
import { Card, CardContent } from "@/components/ui/card";
import { aboutContent, businessInfo } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Associates Academy সম্পর্কে জানুন: professional tax, legal and compliance education platform in Bangladesh.",
  openGraph: {
    title: "About Associates Academy",
    description:
      "Professional Tax, Legal & Compliance Education Platform in Bangladesh.",
  },
};

export default function AboutPage() {
  return (
    <LegalPage
      eyebrow={aboutContent.eyebrow}
      title={aboutContent.title}
      sections={aboutContent.sections}
      aside={
        <Card className="border-brand-navy/10 overflow-hidden bg-white/82 py-0">
          <div className="bg-brand-cream relative aspect-[4/5]">
            <Image
              src="/brand/founder.png"
              alt="Mohammad Khairul Amin Sarker"
              fill
              sizes="(max-width: 1024px) 90vw, 280px"
              className="object-cover object-top"
            />
          </div>
          <CardContent className="p-5">
            <p className="font-heading text-xl font-bold">
              {businessInfo.founderName}
            </p>
            <p className="text-brand-indigo mt-1 text-sm">
              {businessInfo.founderCredentials}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {businessInfo.founderTitle}
            </p>
          </CardContent>
        </Card>
      }
    />
  );
}
