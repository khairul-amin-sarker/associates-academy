import {
  BadgeCheck,
  CalendarDays,
  Clock,
  FileCheck2,
  FileSpreadsheet,
  HelpCircle,
  Layers,
  Scale,
  Calculator,
  type LucideIcon,
} from "lucide-react";

export const workshopConfig = {
  id: "free-return-workshop-2026-08-26",
  slug: "paper-return-to-e-return-live-workshop",
  badge: "FREE LIVE WORKSHOP",
  title: "Paper Return থেকে NBR E-Return — Complete Return Preparation বুঝুন হাতে-কলমে",
  subtitle:
    "নিজের Income Tax Return নিজে বুঝে করতে চান অথবা Client-এর Return professionally prepare করেন—একটি practical example-এর মাধ্যমে Documents থেকে Final Submission পর্যন্ত পুরো Return Preparation Process বুঝুন।",
  dateBangla: "২৬ আগস্ট ২০২৬",
  timeBangla: "রাত ৯টা",
  platform: "Google Meet",
  priceLabel: "১০০% ফ্রি",
  type: "Free Live Online Workshop",
  startsAt: "2026-08-26T21:00:00+06:00",
  endsAt: "2026-08-26T22:30:00+06:00",
  durationBangla: "প্রায় ১ ঘণ্টার Live Session হবে, শেষে Q&A থাকবে।",
  primaryCta: "ফ্রি রেজিস্ট্রেশন করুন",
  ctaMicrocopy: "কোনো ফি নেই • কোনো পাসওয়ার্ড প্রয়োজন নেই",
  whatsappCommunityUrl: "https://chat.whatsapp.com/G55U1N9p7q930xWorkshop",
} as const;

export function getWorkshopGoogleCalendarUrl(opts?: {
  title?: string;
  description?: string;
  startsAt?: string;
  endsAt?: string;
  platform?: string;
}) {
  const title = opts?.title || workshopConfig.title;
  const details =
    opts?.description ||
    "Paper Return থেকে NBR E-Return — Complete Return Preparation Live Workshop by Associates Academy. Joining link and reminder will be shared via WhatsApp.";
  const location = opts?.platform || workshopConfig.platform;

  const startDate = opts?.startsAt ? new Date(opts.startsAt) : new Date("2026-08-26T21:00:00+06:00");
  const endDate = opts?.endsAt ? new Date(opts.endsAt) : new Date("2026-08-26T22:30:00+06:00");

  const formatUtc = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const dates = `${formatUtc(startDate)}/${formatUtc(endDate)}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates,
    details,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export type WorkshopEventTile = {
  label: string;
  value: string;
  icon?: LucideIcon;
  isGoogleMeet?: boolean;
};

export const workshopEventTiles: readonly WorkshopEventTile[] = [
  {
    icon: CalendarDays,
    label: "তারিখ",
    value: workshopConfig.dateBangla,
  },
  {
    icon: Clock,
    label: "সময়",
    value: workshopConfig.timeBangla,
  },
  {
    isGoogleMeet: true,
    label: "প্ল্যাটফর্ম",
    value: workshopConfig.platform,
  },
  {
    icon: BadgeCheck,
    label: "রেজিস্ট্রেশন ফি",
    value: workshopConfig.priceLabel,
  },
] as const;

export type WorkshopBenefit = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const workshopBenefits: readonly WorkshopBenefit[] = [
  {
    id: "roadmap",
    icon: Layers,
    title: "1. Complete Return Preparation Roadmap",
    description:
      "কোথা থেকে Return Preparation শুরু করবেন এবং কোন ধাপে কী করবেন তার পরিষ্কার flow।",
  },
  {
    id: "connection",
    icon: FileSpreadsheet,
    title: "2. Paper Return → E-Return Connection",
    description:
      "Paper Return-এর তথ্য NBR E-Return Portal-এর কোন অংশে যায়—তার practical ধারণা।",
  },
  {
    id: "tax-rebate",
    icon: Calculator,
    title: "3. TDS, Rebate & Tax Computation",
    description:
      "Tax, TDS এবং eligible investment rebate কীভাবে Return-এর final position-কে প্রভাবিত করে।",
  },
  {
    id: "consistency",
    icon: Scale,
    title: "4. Assets, Liabilities & Family Expense",
    description:
      "Income, expenditure এবং wealth-এর মধ্যে consistency কেন গুরুত্বপূর্ণ তা সহজভাবে বুঝবেন।",
  },
  {
    id: "case-study",
    icon: FileCheck2,
    title: "5. Practical Example",
    description:
      "একটি বাস্তবধর্মী taxpayer scenario ধরে পুরো বিষয় explain করা হবে।",
  },
  {
    id: "live-qa",
    icon: HelpCircle,
    title: "6. Live Q&A",
    description:
      "নিজের Return বা Return Preparation নিয়ে প্রশ্ন করার সুযোগ থাকবে।",
  },
] as const;

export type LearningStep = {
  number: string;
  title: string;
  note: string;
};

export const workshopLearningSteps: readonly LearningStep[] = [
  {
    number: "০১",
    title: "Return শুরু করার আগে কী তথ্য লাগবে",
    note: "Documents & Evidence collection",
  },
  {
    number: "০২",
    title: "Income কোন Head-এ যাবে",
    note: "Salary, Business, Interest & Other Sources",
  },
  {
    number: "০৩",
    title: "Taxable Income কীভাবে তৈরি হয়",
    note: "Allowable deduction ও exemption calculation",
  },
  {
    number: "০৪",
    title: "TDS / Advance Tax কোথায় adjust হবে",
    note: "Bank, Salary ও Client deduction reconciliation",
  },
  {
    number: "০৫",
    title: "Investment Rebate কীভাবে কাজ করে",
    note: "DPS, Sanchayapatra ও Life Insurance rules",
  },
  {
    number: "০৬",
    title: "Family Expense কেন গুরুত্বপূর্ণ",
    note: "Lifestyle expenditure ও cash-outflow tracking",
  },
  {
    number: "০৭",
    title: "Assets & Liabilities কীভাবে reconcile হয়",
    note: "IT-10B Statement of Assets & Liabilities logic",
  },
  {
    number: "০৮",
    title: "Paper Return থেকে E-Return entry",
    note: "Paper format mapping into NBR E-Return Portal",
  },
  {
    number: "০৯",
    title: "Final Review & Submission",
    note: "Error check, acknowledgment ও submission readiness",
  },
] as const;

export const workshopAudienceData = {
  panelA: {
    tag: "নিজের Return-এর জন্য",
    title: "নিজের Income Tax Return নিজে বুঝতে চান",
    points: [
      "চাকরিজীবী",
      "ব্যবসায়ী / পেশাজীবী",
      "Investment / Bank Interest আছে",
      "নিজের Return বুঝে করতে চান",
      "অন্যের ওপর পুরোপুরি নির্ভর না করে Return সম্পর্কে পরিষ্কার ধারণা চান",
    ],
  },
  panelB: {
    tag: "Professional Skill-এর জন্য",
    title: "Tax / Accounts Profession-এ কাজ করেন",
    points: [
      "Income Tax Practitioner",
      "Accountant",
      "Finance Professional",
      "Lawyer",
      "Tax Practice শুরু করতে চান",
      "Client Return Preparation workflow improve করতে চান",
    ],
  },
  bridgeMessage:
    "আপনি যে group-এরই হন—workshop-এর core process একই: সঠিক তথ্য বুঝে একটি Complete Return তৈরি করা।",
} as const;

export const workshopInstructor = {
  name: "Mohammad Khairul Amin Sarker",
  subtitle: "Income Tax Lawyer",
  credentials: "LLB, CA-CC, ITP, MBA (Finance)",
  experienceStatement: "13+ Years Income Tax Practice Experience",
  affiliations: [
    "Member, Dhaka Taxes Bar Association",
    "Founder, Associates Academy",
  ],
  introCopy:
    "দীর্ঘদিনের Income Tax Practice-এর বাস্তব অভিজ্ঞতা থেকে Return Preparation-এর legal requirement, practical computation এবং filing workflow সহজভাবে শেখানো হবে।",
  imageSrc: "/brand/founder.png",
} as const;

export const workshopIntentOptions = [
  { value: "own-return-do", label: "নিজের Return নিজে করতে চাই" },
  { value: "own-return-understand", label: "নিজের Return সম্পর্কে পরিষ্কার ধারণা নিতে চাই" },
  { value: "tax-profession", label: "Income Tax Profession-এ কাজ করি" },
  { value: "accounts-finance-profession", label: "Accounts / Finance Profession-এ কাজ করি" },
  { value: "tax-practice-start", label: "Tax Practice শুরু করতে চাই" },
  { value: "other", label: "অন্যান্য" },
] as const;

export const workshopFaqs = [
  {
    question: "Workshop-টি কি সম্পূর্ণ ফ্রি?",
    answer: "হ্যাঁ, এই Live Workshop-এ রেজিস্ট্রেশনের জন্য কোনো ফি নেই।",
  },
  {
    question: "Workshop কোথায় হবে?",
    answer: "Workshop Google Meet-এর মাধ্যমে Live Online অনুষ্ঠিত হবে।",
  },
  {
    question: "Workshop কখন হবে?",
    answer: "২৬ আগস্ট ২০২৬, রাত ৯টায়।",
  },
  {
    question: "আমি Tax Professional নই। তবুও কি অংশ নিতে পারব?",
    answer:
      "অবশ্যই। নিজের Income Tax Return বুঝতে বা নিজে প্রস্তুত করতে আগ্রহী সাধারণ Taxpayer-দের জন্যও Workshop-টি তৈরি করা হয়েছে।",
  },
  {
    question: "Tax Professional হলে কী উপকার পাব?",
    answer:
      "Documents থেকে Return Preparation, computation, TDS/Rebate, Assets & Liabilities এবং E-Return entry-এর overall workflow আরও structuredভাবে বুঝতে পারবেন।",
  },
  {
    question: "Workshop-এ কি শুধু NBR E-Return Portal দেখানো হবে?",
    answer:
      "না। Portal-এর পাশাপাশি একটি Complete Return প্রস্তুত করার আগে কীভাবে information বুঝতে, classify করতে এবং reconcile করতে হয়—সেই process explain করা হবে।",
  },
  {
    question: "Laptop লাগবে কি?",
    answer: "Laptop থাকলে সঙ্গে রাখতে পারেন, তবে Workshop বুঝতে বাধ্যতামূলক নয়।",
  },
  {
    question: "রেজিস্ট্রেশনের পর কীভাবে Join করব?",
    answer:
      "Workshop joining information রেজিস্ট্রেশনে দেওয়া যোগাযোগের মাধ্যমে জানানো হবে।",
  },
  {
    question: "Workshop কতক্ষণ হবে?",
    answer: "প্রায় ১ ঘণ্টার Live Session হবে, শেষে Q&A থাকবে।",
  },
] as const;

export const workshopTrustPoints = [
  "১০০% Free Registration",
  "Live Practical Session",
  "Live Q&A",
] as const;
