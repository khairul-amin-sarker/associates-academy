export type CourseOffer = {
  price: number;
  originalPrice: number;
  discount: number;
  batchName: string;
  startDate: string;
  classSchedule: string;
  classCount: number;
  classDuration: string;
  classTime: string;
  platform: string;
  registrationDeadline: string;
  certificateIncluded: boolean;
  recordingsIncluded: boolean;
  communityIncluded: boolean;
  supportText: string;
  offerEndsAt: string;
};

export type CourseIconName =
  | "BadgeCheck"
  | "BadgePercent"
  | "BriefcaseBusiness"
  | "Calculator"
  | "ChartNoAxesCombined"
  | "Check"
  | "CircleCheckBig"
  | "FileCheck2"
  | "Files"
  | "FileText"
  | "Landmark"
  | "ReceiptText"
  | "Scale"
  | "SearchCheck"
  | "ShieldCheck"
  | "UserCheck"
  | "Users"
  | "WalletCards";

export type CourseCard = {
  title: string;
  text: string;
  icon?: CourseIconName;
};

export type CourseModuleGroup = {
  title: string;
  topics: readonly string[];
  miniFlow?: readonly string[];
};

export type CourseModule = {
  number: string;
  title: string;
  subtitle: string;
  groups: readonly CourseModuleGroup[];
  scheduleHighlights?: readonly { title: string; text: string }[];
  highlightLabel?: string;
  highlight: string;
  tags?: readonly string[];
};

export type StudentReview = {
  id: string;
  name: string;
  role: string;
  quote: string;
  batch?: string;
  avatar?: string;
  screenshot?: string;
};

export const practicalReturnCourse = {
  slug: "practical-paper-return-e-return-filing",
  productSlug: "practical-paper-return-e-return-filing",
  name: "Practical Paper Return & E-Return Filing Course",
  assessmentYear: "2026–2027",
  financeAct: "Finance Act 2026",
  hero: {
    badge: "Assessment Year 2026–2027 · Finance Act 2026",
    title: "Practical Paper Return & E-Return Filing Course",
    descriptionParagraph1:
      "Paper Return এবং NBR E-Return—দুই পদ্ধতিতেই একটি আয়কর রিটার্ন সঠিকভাবে প্রস্তুত, যাচাই ও দাখিল করার practical process শিখুন।",
    descriptionParagraph2:
      "Client-এর documents থেকে income identify ও classify করা, প্রয়োজনীয় computation তৈরি করা, TDS ও Advance Tax সমন্বয়, Tax Rebate, IT10B ও IT10BB প্রস্তুত করা এবং return final review ও submission পর্যন্ত পুরো কাজটি বিভিন্ন practical case ও example-এর মাধ্যমে দেখানো হবে।",
    quickInfo:
      "৫টি Practical Module · Paper Return + NBR E-Return · Assessment Year 2026–2027 · Live + Recorded",
    primaryCta: "কোর্সে ভর্তি হোন",
    secondaryCta: "কারিকুলাম দেখুন",
    images: {
      paperReturn: "/course/paper-return.jpg",
      eReturnPortal: "/course/e-return-portal.png",
    },
  },
  workflow: {
    title: "একটি Return প্রস্তুতের সংক্ষিপ্ত Workflow",
    supportingSentence:
      "Client-এর তথ্য থেকে final return submission পর্যন্ত প্রতিটি ধাপ একটি complete return file-এর অংশ।",
    steps: [
      { id: "01", label: "Documents" },
      { id: "02", label: "Income Classification" },
      { id: "03", label: "Computation" },
      { id: "04", label: "Tax & Reconciliation" },
      { id: "05", label: "Paper Return / E-Return" },
      { id: "06", label: "Final Review & Submission" },
    ],
  },
  system: {
    title: "কোর্সটি যেভাবে সাজানো হয়েছে",
    items: [
      {
        title: "৫টি Practical Module",
        description:
          "Return compliance থেকে final submission পর্যন্ত ধারাবাহিকভাবে সাজানো।",
        icon: "Files",
      },
      {
        title: "Paper Return + NBR E-Return",
        description:
          "Paper Return preparation এবং NBR E-Return filing—দুই পদ্ধতিই শেখানো হবে।",
        icon: "FileCheck2",
      },
      {
        title: "Assessment Year 2026–2027",
        description:
          "Finance Act 2026 এবং সংশ্লিষ্ট return preparation framework অনুযায়ী course content।",
        icon: "Scale",
      },
      {
        title: "বিভিন্ন Practical Case",
        description:
          "একটি নির্দিষ্ট case-এর মধ্যে সীমাবদ্ধ না থেকে বিভিন্ন income source ও taxpayer situation-এর example নিয়ে কাজ করা হবে।",
        icon: "BriefcaseBusiness",
      },
    ] satisfies readonly {
      title: string;
      description: string;
      icon: CourseIconName;
    }[],
  },
  information: {
    title: "Course Information",
    paragraphs: [
      "আয়কর রিটার্ন তৈরি করতে বসলে বেশিরভাগ মানুষের সমস্যা শুরু হয় ফরমের ঘর খুঁজে পাওয়া দিয়ে নয়—সমস্যা শুরু হয় নিজের কাগজপত্রগুলো সামনে রাখার পর। বেতন আছে, ব্যাংকের মুনাফা আছে, সঞ্চয়পত্র আছে, হয়তো ভাড়া বা ব্যবসার আয়ও আছে। তখন প্রশ্ন আসে—কোন আয় কোন Head-এ যাবে? কোন document প্রয়োজন? TDS কোথায় adjust হবে? Investment-এর কতটুকু Rebate পাওয়া যাবে? IT10B-তে সম্পদ কীভাবে দেখাবেন, আবার IT10BB-তে family expenditure-এর সঙ্গে সেই হিসাব মিলবে কীভাবে? Return করতে বসে অনেক সময় দেখা যায়, একটি ঘর পূরণ করতে গিয়ে আরও তিনটি হিসাব সামনে চলে আসে।",
      "এই সমস্যাটা শুধু সাধারণ করদাতার নয়। একজন নতুন Tax Practitioner, Lawyer বা Accounts Professional আইন ও ধারা সম্পর্কে ধারণা রাখলেও client-এর file হাতে পাওয়ার পর বুঝতে পারেন—আইন জানা এবং একটি সম্পূর্ণ Return File প্রস্তুত করা এক জিনিস নয়। Client যে documents দিলেন, সেখান থেকে কোন তথ্যটি প্রয়োজন, কোন income কোথায় classify হবে, supporting evidence কী, taxable figure কীভাবে বের হবে এবং সবশেষে Income, Tax, Expenditure, Assets ও Liabilities-এর মধ্যে হিসাবটা ঠিকমতো মিলছে কি না—এই practical process-টাই আসল কাজ।",
      "এই কোর্সে সেই কাজগুলোই হাতে-কলমে করা হবে। বিভিন্ন taxpayer profile, income source এবং practical case নিয়ে documents দেখা থেকে শুরু করে Income Identification, Head-wise Computation, Tax Exemption ও Special Rate, Tax Rebate, TDS ও Advance Tax Adjustment, IT10B, IT10BB, Tax Payment, Paper Return এবং NBR E-Return preparation পর্যন্ত পুরো process দেখানো হবে। শুধু Portal-এর কোন button কোথায় আছে সেটা দেখানো নয়—Portal-এ যে figureটি বসানো হচ্ছে, সেটি কোথা থেকে এলো এবং কেন সেটি সঠিক, সেটি বোঝানোই এখানে বেশি গুরুত্বপূর্ণ।",
      "আপনি নিজের Return নিজে বুঝে প্রস্তুত করতে চান, client-এর Return handle করেন, Tax Practice শুরু করছেন, কিংবা Accounts, Finance, Law বা Business background থেকে Income Tax Return preparation-এর practical দিকটা পরিষ্কারভাবে শিখতে চান—এই course-এর লক্ষ্য হলো নতুন একটি file হাতে পাওয়ার পর কোথা থেকে শুরু করবেন, কী কী যাচাই করবেন, কীভাবে হিসাব তৈরি ও মিলাবেন এবং submit করার আগে কী check করবেন—এই working processটি তৈরি করা। আর পুরো course একটি fixed client case-এর মধ্যে আটকে থাকবে না; বিভিন্ন ধরনের taxpayer situation ও income source নিয়ে কাজ করা হবে, যাতে শেখাটা শুধু একটি example পর্যন্ত সীমাবদ্ধ না থাকে।",
    ],
    highlights: [
      { label: "Batch", value: "Batch 1" },
      { label: "Start Date", value: "29 August 2026" },
      { label: "Classes", value: "৫টি Live Class (১.৫–২ ঘণ্টা)" },
      { label: "Time & Medium", value: "রাত ৮:৩০টা · Google Meet" },
      { label: "Access", value: "Live + Recorded" },
      { label: "Course Fee", value: "৳1,600 (Regular ৳2,000)" },
    ],
  },
  reviews: [] as readonly StudentReview[],
  certificate: {
    title: "কোর্স সম্পন্ন করলে পাবেন Certificate",
    image: "/course/course-certificate.jpg",
    badge: "Verified Certificate",
    requirements: [
      "কোর্সের নির্ধারিত requirements সম্পন্ন করলে Associates Academy থেকে Course Completion Certificate প্রদান করা হবে।",
      "Certificate-এর জন্য কমপক্ষে ৮০% Live Class-এ উপস্থিত থাকতে হবে এবং course-এর সব recorded class সম্পন্ন করতে হবে।",
    ],
    verificationSystem: {
      title: "Certificate Verification System",
      description: [
        "প্রতিটি Certificate-এর authenticity যাচাই করার জন্য Associates Academy-এর Certificate Verification System রয়েছে।",
        "Certificate-এ থাকা verification information ব্যবহার করে certificateটি Associates Academy থেকে সত্যিই issue করা হয়েছে কি না যাচাই করা যাবে। ফলে certificate-এর নামে জালিয়াতি বা ভুয়া certificate ব্যবহারের ঝুঁকি কমে এবং প্রয়োজনে তৃতীয় পক্ষও এর authenticity verify করতে পারে।",
      ],
      highlight:
        "Certificate শুধু দেওয়া হবে না—এর authenticity online verification-এর মাধ্যমেও যাচাই করা যাবে।",
    },
  },
  audience: [
    {
      title: "Tax Practitioner ও Return Preparer",
      description:
        "যারা client-এর income tax return আরও structured ও practically prepare করতে চান।",
      icon: "BriefcaseBusiness",
    },
    {
      title: "Accounts & Finance Professionals",
      description:
        "যারা নিজের প্রতিষ্ঠান বা client-এর income, tax, TDS এবং return-related information handle করেন।",
      icon: "Calculator",
    },
    {
      title: "Tax, Accounting ও Law Learners",
      description:
        "যারা theory-এর পাশাপাশি income tax return-এর বাস্তব application বুঝতে চান।",
      icon: "Landmark",
    },
    {
      title: "Business Owner ও Professional",
      description:
        "যারা নিজের income tax return-এর preparation process এবং supporting information সম্পর্কে পরিষ্কার ধারণা নিতে চান।",
      icon: "Scale",
    },
    {
      title: "নিজের Return নিজে প্রস্তুত করতে চান",
      description:
        "যারা নিজের documents, income, investment, assets ও liabilities বুঝে return preparation শিখতে চান।",
      icon: "UserCheck",
    },
  ] satisfies readonly {
    title: string;
    description: string;
    icon: CourseIconName;
  }[],
  practicalLearning: {
    title: "Practicalভাবে যে কাজগুলো করবেন",
    items: [
      "Return filing-এর আগে প্রয়োজনীয় documents ও information check করা",
      "Return filing obligation ও applicable compliance requirement বোঝা",
      "Employment Income calculation",
      "Rent & Property Income calculation",
      "Agricultural Income calculation",
      "Business & Professional Income calculation",
      "Capital Gain calculation",
      "Financial Assets Income calculation",
      "Other Sources-এর Income treatment",
      "Income সঠিক Head-এ identify ও classify করা",
      "Supporting documents ও evidence verify করা",
      "Tax Exemption ও Special Tax Rate identify করা",
      "Tax Rebate calculation",
      "TDS ও Advance Tax verify ও adjust করা",
      "IT10BB — Family / Lifestyle Expenditure Statement প্রস্তুত করা",
      "IT10B — Assets & Liabilities Statement প্রস্তুত করা",
      "Income, expenditure, assets ও liabilities reconcile করা",
      "Tax Payable calculate করা",
      "Online A-Challan ও Tax Payment information handle করা",
      "Paper Return প্রস্তুত করা",
      "NBR E-Return Portal-এ তথ্য entry করা",
      "Final Return review ও error checking",
      "Return submit করে Acknowledgement, Tax Certificate ও Return Copy সংগ্রহ করা",
    ],
  },
  instructor: {
    title: "Instructor",
    name: "Mohammad Khairul Amin Sarker",
    role: "Income Tax Lawyer",
    credentials: "LLB · MBA · CA-CC",
    experience: "13+ Years of Income Tax Practice",
    position: "Trainer & CEO, Associates Academy",
    description:
      "Course-এ return preparation-এর আইনগত framework-এর পাশাপাশি বাস্তব client documents, computation, reconciliation এবং filing process-এর practical application দেখানো হবে।",
    image: "/brand/founder.png",
  },
  curriculum: {
    title: "৫টি Practical Module",
    description:
      "Course curriculum legal foundation থেকে শুরু করে complete return preparation ও final submission পর্যন্ত ধারাবাহিকভাবে সাজানো হয়েছে।",
    modules: [
      {
        number: "01",
        title: "Return Filing Compliance & Preparation Checklist",
        subtitle:
          "Return preparation শুরু করার আগে প্রয়োজনীয় legal ও compliance framework।",
        tags: ["Section 166–175", "Compliance Checklist", "Legal Basis"],
        groups: [
          {
            title: "Legal & Compliance Framework",
            topics: [
              "Return filing obligation — Section 166",
              "Assets & Liabilities — Section 167",
              "Lifestyle / Family Expenditure — Section 168",
              "Return filing rules ও documents — Section 169",
              "Filing timeline ও method — Sections 170 & 170A",
              "Tax payment ও special filing situations — Sections 171–173",
              "Late Return ও Revised Return — Sections 174–175",
              "Tax Rebate-এর basic framework",
              "Return preparation document checklist",
              "Paper Return ও E-Return preparation-এর প্রয়োজনীয়তা",
            ],
          },
        ],
        highlight:
          "Return prepare করার আগে কোন information, document এবং compliance বিষয় যাচাই করতে হবে—তার একটি structured framework তৈরি হবে।",
      },
      {
        number: "02",
        title: "Income Verification & Supporting Documents",
        subtitle:
          "Client-এর documents দেখে income identify, classify ও verify করার process।",
        tags: ["7 Heads of Income", "Evidence & TDS", "Schedules 1, 6, 7"],
        groups: [
          {
            title: "Heads of Income & Verification",
            topics: [
              "Employment — Sections 32–34",
              "Rent & Property — Sections 35–39",
              "Agricultural Income — Sections 40–44",
              "Business & Profession — Sections 45–56",
              "Capital Gain — Section 57+",
              "Financial Assets — Sections 62–65",
              "Other Sources — Section 66",
            ],
          },
          {
            title: "Supporting Documents & Special Rules",
            topics: [
              "Supporting documents ও TDS evidence verify করা",
              "Tax Exempt Income identify করা",
              "First Schedule (Voluntary Disclosure)",
              "Sixth Schedule (Exemptions & Deductions)",
              "Seventh Schedule (Special Tax Rate)",
              "Special / Reduced Tax Rate treatment",
            ],
          },
        ],
        highlight:
          "কোন income কোন Head-এ যাবে এবং সেটির পক্ষে কী supporting information প্রয়োজন—তা নির্ধারণ করতে পারবেন।",
      },
      {
        number: "03",
        title: "Paper Return & E-Return — Employment, Rent & Agriculture",
        subtitle: "এই Module থেকে practical return preparation শুরু হবে।",
        tags: ["Portal Setup", "Salary & Rent", "Agri Income", "Entry"],
        groups: [
          {
            title: "NBR E-Return Portal Setup",
            topics: [
              "Registration ও Login",
              "Taxpayer Profile setup",
              "Basic Information entry",
              "Assessment Year selection",
              "Return Preparation Interface পরিচিতি",
            ],
          },
          {
            title: "Practical Return Preparation",
            topics: [
              "Government Employee Income calculation ও entry",
              "Non-Government Employee Salary, Allowance ও Bonus",
              "Rent & Property Income ও Allowable Deductions",
              "Agricultural Income ও Expenditure calculation",
              "Taxable Income calculation ও TDS সমন্বয়",
              "Paper Return Form-এ Entry",
              "NBR E-Return Portal-এ Entry",
            ],
          },
        ],
        highlight:
          "বিভিন্ন case ও income situation ব্যবহার করে calculation থেকে return entry পর্যন্ত process দেখানো হবে।",
      },
      {
        number: "04",
        title: "Business & Profession, Capital Gain & Financial Assets",
        subtitle:
          "Comparatively complex income source-এর practical computation ও return treatment।",
        tags: ["Business & TDS", "Capital Gain", "Sanchaypatra & FI"],
        groups: [
          {
            title: "Business & Profession",
            topics: [
              "Business / Professional Income calculation",
              "Business with TDS ও Tax Credit",
              "Special / Reduced Rate Income",
              "Final Tax Treatment",
              "Business Income Reconciliation",
            ],
          },
          {
            title: "Capital Gain & Financial Assets",
            topics: [
              "Property / Flat / Land transfer-এর Capital Gain",
              "Listed Shares ও Business Undertaking transfer",
              "Sanchaypatra, Bank / FI Interest, Dividend ও Securities",
              "TDS ও Advance Tax Adjustment",
              "Relevant Tax Treatment ও Return Entry",
            ],
          },
        ],
        highlight:
          "Supporting information, computation, applicable tax treatment এবং return figure-এর মধ্যে reconciliation করতে পারবেন।",
      },
      {
        number: "05",
        title: "Other Income, Rebate, IT10BB, IT10B & Final Submission",
        subtitle: "Complete return preparation-এর final module।",
        tags: ["IT10B & IT10BB", "Rebate", "A-Challan", "Final Filing"],
        groups: [
          {
            title: "Other Income, Rebate & Statements",
            topics: [
              "Other Sources of Income ও Foreign Income",
              "Partner / AOP Income treatment",
              "Tax Rebate Eligibility, Investment ও Calculation",
              "IT10BB — Family / Lifestyle Expenditure Statement প্রস্তুত",
              "IT10B — Assets & Liabilities Statement প্রস্তুত",
              "Opening ও Closing Asset Position নির্ধারণ",
              "Asset & Fund Reconciliation",
            ],
          },
          {
            title: "Tax Payment & Final Submission",
            topics: [
              "TDS ও Advance Tax adjustment",
              "Final Tax Payable হিসাব",
              "Online A-Challan ও Tax Payment reconciliation",
              "Complete Return review ও error checking",
              "Final Submission",
              "Acknowledgement, Tax Certificate ও Return Copy সংগ্রহ",
            ],
          },
        ],
        highlight:
          "Return-এর Income, Tax, Expenditure, Assets, Liabilities এবং Payment information একসঙ্গে review করে complete Paper Return ও NBR E-Return prepare ও submit করার process বুঝতে পারবেন।",
      },
    ] satisfies readonly CourseModule[],
  },
  faqs: [
    {
      question: "এই কোর্সে কি শুধু E-Return Portal শেখানো হবে?",
      answer:
        "না। Documents verification, income identification, computation, Tax Rebate, TDS, IT10B, IT10BB, Paper Return এবং NBR E-Return—পুরো return preparation process course-এর অংশ।",
    },
    {
      question: "Paper Return কি শেখানো হবে?",
      answer:
        "হ্যাঁ। Paper Return preparation এবং NBR E-Return—দুটিই course-এর scope-এর মধ্যে থাকবে।",
    },
    {
      question: "একটি Client Case নিয়েই কি পুরো course করা হবে?",
      answer:
        "না। বিভিন্ন income source ও taxpayer situation বোঝানোর জন্য একাধিক practical case ও example ব্যবহার করা হবে।",
    },
    {
      question: "নিজের Income Tax Return তৈরি করা শেখা যাবে?",
      answer:
        "Course-এর উদ্দেশ্য হলো return preparation-এর complete process শেখানো—documents থেকে computation, statements এবং final filing পর্যন্ত। ফলে নিজের return prepare করার ক্ষেত্রেও এই knowledge ব্যবহার করা যাবে।",
    },
    {
      question: "কোন Assessment Year নিয়ে course হবে?",
      answer:
        "Assessment Year 2026–2027 এবং Finance Act 2026 ভিত্তিক course material ব্যবহার করা হবে।",
    },
    {
      question: "Business Income ও Capital Gain থাকবে?",
      answer:
        "হ্যাঁ। Business & Professional Income, Business Reconciliation, Property / Share-related Capital Gain এবং relevant tax treatment course-এর অংশ।",
    },
    {
      question: "IT10B ও IT10BB থাকবে?",
      answer:
        "হ্যাঁ। Assets & Liabilities Statement এবং Family / Lifestyle Expenditure Statement preparation ও reconciliation শেখানো হবে।",
    },
    {
      question: "Live class miss করলে কী হবে?",
      answer: "Course Live + Recorded হওয়ায় class recording পাওয়া যাবে।",
    },
    {
      question: "Certificate পাওয়া যাবে?",
      answer:
        "হ্যাঁ। Certificate eligibility-এর জন্য কমপক্ষে ৮০% live class attendance এবং সব recorded class সম্পন্ন করতে হবে।",
    },
  ],
  offer: {
    price: 1600,
    originalPrice: 2000,
    discount: 400,
    batchName: "Batch 1",
    startDate: "29 August 2026",
    classSchedule: "৫টি Live Class · Google Meet",
    classCount: 5,
    classDuration: "১.৫ থেকে ২ ঘণ্টা",
    classTime: "রাত ৮:৩০টা",
    platform: "Google Meet",
    registrationDeadline: "28 August 2026",
    certificateIncluded: true,
    recordingsIncluded: true,
    communityIncluded: true,
    supportText:
      "Payment সম্পন্ন হওয়ার পর course enrollment automatically confirm হবে।",
    offerEndsAt: "2026-08-28T23:59:59+06:00",
  } satisfies CourseOffer,
} as const;

export const practicalReturnCoursePath =
  `/courses/${practicalReturnCourse.slug}` as const;

export const practicalReturnCheckoutPath =
  `/checkout/${practicalReturnCourse.productSlug}` as const;
