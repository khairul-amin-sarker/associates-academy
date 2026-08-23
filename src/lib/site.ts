const vercelUrl = process.env.VERCEL_URL;

export const siteConfig = {
  name: "Associates Academy",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  productionUrl: "https://www.associatesacademy.bd",
  description:
    "আয়কর, ভ্যাট, আইন ও Professional Compliance শেখার নির্ভরযোগ্য প্ল্যাটফর্ম।",
  supportEmail: "contact@associatesacademy.bd",
  securityEmail: "security@associatesacademy.bd",
  socials: {
    facebook: "https://facebook.com/associatesacademy",
    youtube: "https://youtube.com/@associatesacademy",
    linkedin: "https://linkedin.com/company/associatesacademy",
  },
} as const;

export const navItems = [
  { href: "/", label: "হোম" },
  { href: "/courses", label: "কোর্সসমূহ" },
  { href: "/resources", label: "রিসোর্স" },
  { href: "/#tax-tools", label: "ট্যাক্স টুলস" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
] as const;
