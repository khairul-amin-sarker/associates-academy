export type CourseOffer = {
  price?: number;
  originalPrice?: number;
  batchName?: string;
  startDate?: string;
  classSchedule?: string;
  registrationDeadline?: string;
  certificateIncluded?: boolean;
  recordingsIncluded?: boolean;
  communityIncluded?: boolean;
  supportText?: string;
  offerEndsAt?: string;
};

export type CourseIconName =
  | "BadgePercent"
  | "BriefcaseBusiness"
  | "Calculator"
  | "ChartNoAxesCombined"
  | "CircleCheckBig"
  | "FileCheck2"
  | "Files"
  | "FileText"
  | "House"
  | "Landmark"
  | "ReceiptText"
  | "Scale"
  | "SearchCheck"
  | "ShieldCheck"
  | "WalletCards";

export type CourseCard = {
  title: string;
  text: string;
  icon: CourseIconName;
};

export type ModuleGroup = {
  title: string;
  topics: readonly string[];
  miniFlow?: readonly string[];
};

export type CourseModule = {
  number: string;
  title: string;
  subtitle: string;
  groups: readonly ModuleGroup[];
  scheduleHighlights?: readonly { title: string; text: string }[];
  highlightLabel: string;
  highlight: string;
};

export const practicalReturnCourse = {
  slug: "practical-paper-return-e-return-filing",
  productSlug: "practical-paper-return-e-return-filing",
  name: "Practical Paper Return & E-Return Filing Course",
  assessmentYear: "2026–2027",
  financeAct: "Finance Act 2026",
  hero: {
    label: "Finance Act 2026 • Assessment Year 2026–2027",
    title:
      "Paper Return থেকে NBR E-Return—একটি Client Case শুরু থেকে শেষ পর্যন্ত হাতে-কলমে শিখুন",
    description:
      "শুধু NBR e-Return Portal-এ কোথায় click করতে হয়, সেটা শিখলেই Return Preparation শেখা হয় না।\n\nএই কোর্সে Client-এর documents দেখে Income identify করা থেকে শুরু করে Tax হিসাব, TDS/Advance Tax adjustment, Tax Rebate, IT10B, IT10BB, Paper Return এবং Final NBR e-Return Submission—পুরো কাজটি একটি বাস্তবসম্মত Client Case ধরে শেখানো হবে।",
    stats: [
      { value: "৫টি", label: "Practical Module" },
      { value: "Paper + E-Return", label: "দুইভাবেই Preparation" },
      { value: "২০২৬–২০২৭", label: "Assessment Year" },
      { value: "Start to Finish", label: "একটি Client Case" },
    ],
    workflowCards: [
      { title: "Documents যাচাই", icon: "SearchCheck" },
      { title: "Income Head নির্ধারণ", icon: "Files" },
      { title: "Tax Computation", icon: "Calculator" },
      { title: "Tax & Rebate", icon: "BadgePercent" },
      { title: "IT10B + IT10BB", icon: "WalletCards" },
      { title: "NBR e-Return Submit", icon: "FileCheck2" },
    ] satisfies readonly { title: string; icon: CourseIconName }[],
  },
  problems: [
    {
      title: "কোন Document কেন লাগবে?",
      text: "Client অনেক কাগজ দিতে পারেন। কিন্তু কোন Income-এর জন্য কোন Document বা Evidence দরকার—এটা না জানলে গুরুত্বপূর্ণ তথ্য বাদ যেতে পারে।",
      icon: "Files",
    },
    {
      title: "Income কোন Head-এ যাবে?",
      text: "Employment, Rent, Agriculture, Business, Capital Gain, Financial Assets নাকি Other Sources—ভুল Head মানেই ভুল Computation।",
      icon: "ChartNoAxesCombined",
    },
    {
      title: "সব Income-এর Tax Treatment এক নয়",
      text: "কোনো Income Taxable, কোনোটি Exempt, কোনো ক্ষেত্রে Special বা Reduced Rate প্রযোজ্য হতে পারে। আগে Income-এর nature বুঝতে হবে।",
      icon: "BadgePercent",
    },
    {
      title: "TDS আছে—কিন্তু হিসাবের সঙ্গে মিলছে তো?",
      text: "TDS Certificate, Advance Tax, Tax Liability এবং Actual Payment—সবকিছু মিলিয়ে দেখতে হয়।",
      icon: "ReceiptText",
    },
    {
      title: "Income, Expense ও Assets কি একে অন্যের সঙ্গে মিলছে?",
      text: "IT10B ও IT10BB শুধু Form পূরণ নয়। Income, Family Expenditure, Assets, Liabilities এবং Fund Source-এর মধ্যে যুক্তিসংগত মিল থাকতে হয়।",
      icon: "Scale",
    },
    {
      title: "হিসাব জানলেই Portal Entry জানা হয় না",
      text: "Working Paper-এর Figure কোন জায়গায় Paper Return বা NBR e-Return-এ যাবে—এটাও আলাদা Practical Skill।",
      icon: "FileCheck2",
    },
  ] satisfies readonly CourseCard[],
  differentiatorFlow: [
    "Documents",
    "Income Verification",
    "Tax Computation",
    "Assets & Expense Reconciliation",
    "Paper Return",
    "NBR E-Return",
  ],
  audience: [
    {
      title: "নতুন Tax Practitioner",
      text: "যারা practical client return preparation-এ confidence তৈরি করতে চান।",
      icon: "BriefcaseBusiness",
    },
    {
      title: "Income Tax Practice-এ আগ্রহী Professionals",
      text: "আইন জানেন, কিন্তু বাস্তব return preparation workflow শিখতে চান।",
      icon: "Scale",
    },
    {
      title: "Accounts & Finance Professionals",
      text: "নিজ প্রতিষ্ঠান বা client-এর income, TDS ও return information better handle করতে চান।",
      icon: "Calculator",
    },
    {
      title: "Existing Return Preparers",
      text: "Paper Return থেকে structured E-Return filing skill upgrade করতে চান।",
      icon: "FileText",
    },
    {
      title: "Tax / Accounting / Law Learners",
      text: "Theory-এর পাশাপাশি বাস্তব application দেখতে চান।",
      icon: "Landmark",
    },
    {
      title: "Client Return Handle করেন এমন Professionals",
      text: "Documents থেকে final filing পর্যন্ত systematic workflow প্রয়োজন।",
      icon: "ShieldCheck",
    },
  ] satisfies readonly CourseCard[],
  skills: [
    {
      title: "Return Filing Rules",
      text: "কার Return দিতে হবে, কখন দিতে হবে এবং Filing-এর আগে কী Check করতে হবে।",
      icon: "ShieldCheck",
    },
    {
      title: "Document Verification",
      text: "কোন Income-এর জন্য কোন Supporting Document প্রয়োজন তা বুঝতে পারবেন।",
      icon: "SearchCheck",
    },
    {
      title: "7 Heads of Income",
      text: "Income সঠিক Head-এ Identify ও Classify করতে পারবেন।",
      icon: "ChartNoAxesCombined",
    },
    {
      title: "Income Computation",
      text: "Head-wise Taxable Income হিসাব করতে পারবেন।",
      icon: "Calculator",
    },
    {
      title: "Paper Return Preparation",
      text: "Working Figure থেকে Return Form Prepare করতে পারবেন।",
      icon: "FileText",
    },
    {
      title: "NBR e-Return Filing",
      text: "Prepared Figure সঠিক জায়গায় Enter, Review ও Submit করতে পারবেন।",
      icon: "FileCheck2",
    },
    {
      title: "Tax Rebate",
      text: "Eligibility, Investment ও Rebate Calculation বুঝতে পারবেন।",
      icon: "BadgePercent",
    },
    {
      title: "TDS / Advance Tax",
      text: "Tax Credit Verify, Adjust ও Reconcile করতে পারবেন।",
      icon: "ReceiptText",
    },
    {
      title: "IT10B + IT10BB",
      text: "Assets, Liabilities ও Family Expenditure-এর Statement Prepare করতে পারবেন।",
      icon: "WalletCards",
    },
    {
      title: "Final Review & Submission",
      text: "Submit করার আগে পুরো Return Check করার একটি Clear Process তৈরি হবে।",
      icon: "CircleCheckBig",
    },
  ] satisfies readonly CourseCard[],
  modules: [
    {
      number: "01",
      title: "Return Filing Rules & Preparation Checklist",
      subtitle: "Return শুরু করার আগে কী জানা ও কী Check করা জরুরি",
      groups: [
        {
          title: "Compliance framework",
          topics: [
            "Return filing obligation — Sec. 166",
            "Assets & Liabilities Statement — Sec. 167",
            "Lifestyle / Family Expenditure Statement — Sec. 168",
            "General return filing rules — Sec. 169",
            "Return filing timeline — Sec. 170",
            "Return filing method — Sec. 170A",
            "Tax payment with return — Sec. 171",
            "Special circumstances — Sec. 172",
            "Tax & surcharge before filing — Sec. 173",
            "Late Return — Sec. 174",
            "Revised Return — Sec. 175",
            "Tax Rebate fundamentals — Sec. 78",
            "Sec. 147 & 343 practical relevance",
            "Return preparation document checklist",
            "Paper Return vs E-Return",
            "Common filing mistakes & compliance risk",
          ],
        },
      ],
      highlightLabel: "Practical Outcome",
      highlight:
        "Module শেষে Client-এর Return শুরু করার আগে কী কী Check করতে হবে—তার একটি Clear Checklist আপনার থাকবে।",
    },
    {
      number: "02",
      title: "Documents দেখে Income Identify ও Verify করা",
      subtitle:
        "Client কী বলছেন—তার পাশাপাশি Documents কী বলছে, সেটাও বুঝতে শিখুন।",
      groups: [
        {
          title: "Employment — Sec. 32–34",
          topics: [
            "Salary",
            "Allowance",
            "Bonus",
            "Employment benefits",
            "Taxable / non-taxable component",
            "Employer certificate",
            "TDS certificate",
          ],
        },
        {
          title: "Rent & Property — Sec. 35–39",
          topics: [
            "House Property",
            "Other Property",
            "Rent evidence",
            "Agreement",
            "Bank statement",
            "Relevant property documents",
          ],
        },
        {
          title: "Agricultural Income — Sec. 40–44",
          topics: [
            "Farming income",
            "Other agricultural income",
            "Relevant expenditure",
            "Supporting evidence",
          ],
        },
        {
          title: "Business & Profession — Sec. 45–56",
          topics: [
            "Business / professional income",
            "TDS-related income",
            "Special income",
            "Reduced-rate income",
            "Final-tax income",
            "Books, invoices & bank statement verification",
          ],
        },
        {
          title: "Capital Gain — Sec. 57+",
          topics: [
            "Property",
            "House / Apartment",
            "Listed shares",
            "Business undertaking",
            "Other capital gain",
            "Supporting transfer documents",
          ],
        },
        {
          title: "Financial Assets — Sec. 62–65",
          topics: [
            "Sanchaypatra",
            "Bank / FI interest or profit",
            "Bills",
            "Dividend",
            "Securities",
            "TDS evidence",
          ],
        },
        {
          title: "Other Sources — Sec. 66",
          topics: [
            "License fee",
            "Royalty",
            "Cash subsidy",
            "Meeting fee",
            "Honorarium",
            "Joint Venture profit",
            "Other income",
          ],
        },
      ],
      scheduleHighlights: [
        { title: "First Schedule", text: "Voluntary Disclosure" },
        {
          title: "Sixth Schedule",
          text: "Exemption · Deduction · Rebate",
        },
        { title: "Seventh Schedule", text: "Special Tax Rate" },
      ],
      highlightLabel: "Practical Outcome",
      highlight:
        "Client-এর Documents দেখে Income কোথা থেকে এসেছে, কোন Head-এ যাবে এবং কী Evidence প্রয়োজন—তা নির্ধারণ করতে পারবেন।",
    },
    {
      number: "03",
      title:
        "Employment, Rent & Agriculture — Paper Return + E-Return Practical",
      subtitle:
        "এখান থেকেই একটি Client Case নিয়ে Live Return Preparation শুরু।",
      groups: [
        {
          title: "Part A — NBR E-Return Portal",
          topics: [
            "Portal access",
            "Registration / Login",
            "Taxpayer profile",
            "Basic information",
            "Assessment Year / Tax Year",
            "Return preparation interface",
            "Information কোথায় enter করতে হয়",
          ],
        },
        {
          title: "Part B — Employment Income",
          topics: [
            "Government ও Non-Government employee",
            "Salary components, allowance ও bonus",
            "Benefits",
            "Exemptions / allowable components",
            "TDS",
            "Taxable employment income",
          ],
        },
        {
          title: "Part C — Rent Income",
          topics: [
            "House Property",
            "Other Property",
            "Gross Rent",
            "Allowable adjustment / deduction",
            "Net taxable rent income",
          ],
        },
        {
          title: "Part D — Agricultural Income",
          topics: [
            "Farming",
            "Other agricultural income",
            "Special agricultural income",
            "Expenditure",
            "Taxable agricultural income",
          ],
        },
      ],
      highlightLabel: "Practical Session",
      highlight:
        "Documents → Income Calculation → Paper Return → NBR e-Return Entry",
    },
    {
      number: "04",
      title: "Business, Capital Gain & Financial Assets",
      subtitle:
        "যেসব Income Head-এ Calculation ও Tax Treatment তুলনামূলক বেশি গুরুত্বপূর্ণ।",
      groups: [
        {
          title: "Part E — Business & Profession",
          topics: [
            "Business / Professional Income",
            "Business with TDS",
            "Special business income",
            "Reduced tax rate",
            "Final tax treatment",
            "Business income reconciliation",
            "TDS adjustment",
            "Accounting information বনাম taxable figure cross-check",
          ],
          miniFlow: [
            "Client Information",
            "Supporting Information",
            "TDS",
            "Return Figure",
          ],
        },
        {
          title: "Part F — Capital Gain",
          topics: [
            "Property transfer",
            "House / Apartment transfer",
            "Listed company share transfer",
            "Business undertaking transfer",
            "Other capital gain",
            "Reduced-rate capital gain",
            "Acquisition / sale information",
            "Gain calculation",
            "Relevant supporting documents",
          ],
          miniFlow: [
            "Acquisition",
            "Transfer",
            "Gain Calculation",
            "Tax Treatment",
            "Return Entry",
          ],
        },
        {
          title: "Part G — Financial Assets",
          topics: [
            "Sanchaypatra",
            "Bank / FI interest",
            "Interest on bills",
            "Dividend",
            "Securities / financial assets",
            "Reduced-rate income",
            "TDS adjustment",
          ],
        },
      ],
      highlightLabel: "Practical Outcome",
      highlight:
        "একটি Complex Income-এর Document, Calculation, Tax Treatment এবং Return Entry—চারটি অংশ একসঙ্গে মিলিয়ে কাজ করতে পারবেন।",
    },
    {
      number: "05",
      title: "Rebate, IT10B, IT10BB, Tax Payment & Final Submission",
      subtitle: "একটি Return Complete করার শেষ এবং সবচেয়ে গুরুত্বপূর্ণ ধাপ।",
      groups: [
        {
          title: "H — Other Sources",
          topics: [
            "License Fee",
            "Royalty",
            "Cash Subsidy",
            "Meeting Fee",
            "Honorarium with TDS",
            "Joint Venture Profit",
            "Other Income",
            "Tax-exempt / reduced-rate income",
          ],
        },
        {
          title: "I — Special / Additional Income",
          topics: [
            "First Schedule Voluntary Disclosure",
            "Partner Income",
            "AOP Income",
            "Income Earned Outside Bangladesh",
            "Spouse / Minor Child Income",
          ],
        },
        {
          title: "J — Tax Rebate",
          topics: [
            "Eligibility",
            "Eligible investment / expenditure",
            "Supporting documents",
            "Rebate calculation",
            "Return entry",
          ],
        },
        {
          title: "K — IT10BB",
          topics: [
            "Family expenditure",
            "Personal / living expenses",
            "Income vs expenditure reconciliation",
            "Common mistakes",
          ],
        },
        {
          title: "L — IT10B",
          topics: [
            "Cash",
            "Bank balance",
            "Sanchaypatra",
            "Shares",
            "Vehicle",
            "Land",
            "House / Apartment",
            "Other assets",
            "Loans / Liabilities",
            "Opening vs Closing position",
            "Asset reconciliation",
          ],
        },
        {
          title: "M — Tax & Payment",
          topics: [
            "Tax payable",
            "Advance Tax",
            "TDS",
            "Carry Forward",
            "Refund adjustment",
            "Online A-Challan",
            "Recognized payment",
            "Payment reconciliation",
          ],
        },
        {
          title: "N — Final Submission",
          topics: [
            "Complete return review",
            "Error checking",
            "Final submission",
            "Acknowledgement",
            "Tax Certificate",
            "Submitted Return copy",
            "Client record preservation",
          ],
        },
      ],
      highlightLabel: "Final Review Mindset",
      highlight:
        "একটি Client-এর Complete Return File Final Review করে Submit করার পুরো Process Practice করা হবে।",
    },
  ] satisfies readonly CourseModule[],
  workflow: [
    "Client Information",
    "Document Collection",
    "Income Identification",
    "Income Head Classification",
    "Income Computation",
    "Exemption / Rebate",
    "Tax Calculation",
    "TDS / Advance Tax Adjustment",
    "IT10B",
    "IT10BB",
    "Tax Payment / A-Challan",
    "Paper Return",
    "NBR E-Return",
    "Final Review & Submission",
  ],
  outcomes: [
    {
      title: "Client-এর Return শুরু থেকে Submit পর্যন্ত প্রস্তুত করতে পারবেন",
      text: "Documents থেকে Final Submission পর্যন্ত কাজটি ধাপে ধাপে Follow করতে পারবেন।",
      icon: "FileCheck2",
    },
    {
      title: "Income সঠিক Head-এ classify করতে পারবেন",
      text: "Income সঠিক Head-এ Identify ও Classify করতে পারবেন।",
      icon: "ChartNoAxesCombined",
    },
    {
      title: "Supporting Documents verify করতে পারবেন",
      text: "কোন Income-এর জন্য কোন Supporting Document প্রয়োজন তা বুঝতে পারবেন।",
      icon: "SearchCheck",
    },
    {
      title: "Paper Return ও E-Return দুটোই prepare করতে পারবেন",
      text: "Working Figure থেকে Return Form এবং NBR e-Return Entry পর্যন্ত।",
      icon: "Files",
    },
    {
      title: "IT10B ও IT10BB reconcile করতে পারবেন",
      text: "Income, Expenditure, Assets ও Liabilities-এর মধ্যে Consistency Check করতে পারবেন।",
      icon: "Scale",
    },
    {
      title: "Final Return review ও submit করতে পারবেন",
      text: "Tax Payment, Error Check, Submission, Acknowledgement ও Tax Certificate-এর রেকর্ড রাখতে পারবেন।",
      icon: "CircleCheckBig",
    },
  ] satisfies readonly CourseCard[],
  offer: {} as CourseOffer,
  faqs: [
    {
      question: "এই কোর্সটি কি শুধু E-Return শেখাবে?",
      answer:
        "না। Portal Filing পুরো Process-এর শেষ অংশ। তার আগে Client Documents, Income Identification, Tax Computation, TDS/Advance Tax, Tax Rebate, IT10B, IT10BB এবং Paper Return Preparation শেখানো হবে।",
    },
    {
      question: "Paper Return-ও কি শেখানো হবে?",
      answer:
        "হ্যাঁ। Working Calculation থেকে Paper Return Prepare করা এবং একই তথ্য NBR e-Return-এ কীভাবে ব্যবহার করবেন—দুটোই দেখানো হবে।",
    },
    {
      question: "কোন Assessment Year-এর return নিয়ে কাজ হবে?",
      answer:
        "Course Material Assessment Year 2026–2027 এবং Finance Act 2026 ভিত্তিক।",
    },
    {
      question: "Income-এর সব প্রধান Head কি থাকবে?",
      answer:
        "হ্যাঁ। Employment, Rent, Agriculture, Business & Profession, Capital Gain, Financial Assets এবং Other Sources—সব প্রধান Income Head Course Scope-এর মধ্যে রয়েছে।",
    },
    {
      question: "Business Income-এর Practical Calculation থাকবে?",
      answer:
        "হ্যাঁ। Business/Professional Income, TDS, Accounting Figure বনাম Taxable Figure Reconciliation এবং Relevant Tax Treatment দেখানো হবে।",
    },
    {
      question: "IT10B ও IT10BB শেখানো হবে?",
      answer:
        "হ্যাঁ। Assets & Liabilities এবং Family Expenditure Statement Prepare ও Reconcile করার Practical Approach শেখানো হবে।",
    },
    {
      question: "Tax Rebate ও TDS Adjustment থাকবে?",
      answer:
        "হ্যাঁ। Eligibility ও Supporting Documents থেকে শুরু করে Rebate Calculation এবং TDS/Advance Tax Adjustment পর্যন্ত দেখানো হবে।",
    },
    {
      question: "Course শেষে কী ধরনের কাজ করতে পারব?",
      answer:
        "লক্ষ্য হলো—একটি Client-এর Documents হাতে পাওয়ার পর Income Identify ও Calculate করে, Tax ও Statements মিলিয়ে Paper Return এবং NBR e-Return Final Submission পর্যন্ত পুরো Process নিজে Follow করতে পারা।",
    },
  ],
} as const;

export const practicalReturnCoursePath =
  `/courses/${practicalReturnCourse.slug}` as const;

export const practicalReturnCheckoutPath =
  `/checkout/${practicalReturnCourse.productSlug}` as const;
