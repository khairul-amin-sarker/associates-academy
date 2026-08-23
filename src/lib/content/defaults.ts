export type HomePageContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  founderName: string;
  founderTitle: string;
  founderBio: string;
};

export const defaultHomeContent: HomePageContent = {
  eyebrow: "Tax · VAT · Corporate Compliance · Professional Practice",
  title: "আইন শুধু জানবেন না—বাস্তবে প্রয়োগ করতে শিখুন",
  description:
    "Associates Academy-তে আয়কর, VAT, Corporate Compliance ও Professional Practice শেখানো হয় বাস্তব উদাহরণ, case-based learning, practical filing এবং updated law-এর সমন্বয়ে।",
  primaryCta: "কোর্সসমূহ দেখুন",
  secondaryCta: "Free Resources দেখুন",
  founderName: "খাইরুল আমিন সরকার",
  founderTitle: "Founder & Lead Instructor, Associates Academy",
  founderBio:
    "দীর্ঘ professional practice থেকে একটি বিষয় স্পষ্ট—শুধু আইন জানা যথেষ্ট নয়; সেই আইন বাস্তব পরিস্থিতিতে সঠিকভাবে প্রয়োগ করতে পারাটাই আসল skill। Associates Academy সেই practical gap পূরণের লক্ষ্যেই তৈরি।",
};

export const defaultCourse = {
  slug: "income-tax-working-framework",
  title: "Fundamentals of Income Tax Act, 2023",
  subtitle: "Act থেকে Return—একটি complete practical working framework",
  price: 1710,
  compareAtPrice: 3000,
  scope: [
    "Act & Basic Concepts",
    "Taxability",
    "Heads of Income",
    "Tax Computation",
    "TDS Compliance",
    "Return Preparation",
  ],
};
