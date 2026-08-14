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
  eyebrow: "Tax · VAT · Legal · Professional Learning",
  title: "আয়কর ও Professional Compliance শেখার নির্ভরযোগ্য প্ল্যাটফর্ম",
  description: "আইন শুধু মুখস্থ নয়—বোঝা, প্রয়োগ করা এবং পেশাগত কাজে আত্মবিশ্বাসের সঙ্গে ব্যবহার করার জন্য structured learning experience।",
  primaryCta: "কোর্স দেখুন",
  secondaryCta: "eBook দেখুন",
  founderName: "খাইরুল আমিন সরকার",
  founderTitle: "Founder & Lead Instructor, Associates Academy",
  founderBio: "Income Tax, VAT ও professional compliance নিয়ে practical teaching, structured framework এবং নিয়মিত law update-এর মাধ্যমে শিক্ষার্থীদের বাস্তব কাজে প্রস্তুত করেন।",
};

export const defaultCourse = {
  slug: "income-tax-working-framework",
  title: "Fundamentals of Income Tax Act, 2023",
  subtitle: "Act থেকে Return—একটি complete practical working framework",
  price: 1710,
  compareAtPrice: 3000,
  scope: ["Act & Basic Concepts", "Taxability", "Heads of Income", "Tax Computation", "TDS Compliance", "Return Preparation"],
};
