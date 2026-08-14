import { InfoPage } from "@/components/marketing/info-page";
import { siteConfig } from "@/lib/site";

export default function ContactPage() { return <InfoPage eyebrow="CONTACT" title="আমাদের সঙ্গে যোগাযোগ করুন"><p>Course, payment, dashboard বা learning support-এর জন্য email করুন।</p><p><a className="font-semibold text-brand-indigo underline underline-offset-4" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a></p></InfoPage>; }
