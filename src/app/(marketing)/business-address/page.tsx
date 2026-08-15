import type { Metadata } from "next";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { LegalPage } from "@/components/marketing/legal-page";
import { Card, CardContent } from "@/components/ui/card";
import { businessAddressContent, businessInfo } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Business Address & Contact Information",
  description:
    "Associates Academy registered business address, trade license, official phone and email information.",
};

export default function BusinessAddressPage() {
  return (
    <LegalPage
      eyebrow={businessAddressContent.eyebrow}
      title={businessAddressContent.title}
      description="Associates Academy-এর course, payment, enrollment, digital product, refund অথবা technical support সংক্রান্ত যেকোনো বিষয়ে আমাদের সঙ্গে যোগাযোগ করতে পারেন।"
      sections={[
        {
          heading: "Associates Academy",
          paragraphs: [
            `Registered Business Name: ${businessInfo.registeredBusinessName}`,
            `Business Address: ${businessInfo.address}`,
            `Phone: ${businessInfo.phones.join(" / ")}`,
            `Email: ${businessInfo.email}`,
            `Trade License: ${businessInfo.tradeLicense}`,
            `Country: ${businessInfo.country}`,
          ],
        },
        {
          heading: "Support",
          paragraphs: [businessAddressContent.support],
        },
      ]}
      aside={
        <Card className="border-brand-navy/10 bg-brand-navy text-white">
          <CardContent className="space-y-5 p-6">
            <div className="flex gap-3">
              <ShieldCheck className="text-brand-gold mt-1 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm text-white/55">Trade License</p>
                <p className="font-semibold">{businessInfo.tradeLicense}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="text-brand-gold mt-1 h-5 w-5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm text-white/55">Phone</p>
                {businessInfo.phones.map((phone, index) => (
                  <a
                    key={phone}
                    href={businessInfo.phoneHrefs[index]}
                    className="hover:text-brand-gold block font-semibold"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="text-brand-gold mt-1 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm text-white/55">Email</p>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="hover:text-brand-gold font-semibold break-all"
                >
                  {businessInfo.email}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="text-brand-gold mt-1 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm text-white/55">Address</p>
                <p className="leading-7 font-semibold">
                  {businessInfo.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}
