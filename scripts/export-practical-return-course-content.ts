import { mkdir, writeFile } from "node:fs/promises";
import { practicalReturnCourse } from "../src/lib/content/practical-return-course";

const outputPath = "content-exports/practical-paper-return-e-return-filing.json";

const pageData = {
  returnSystem: [
    "Client Documents", "Income Identify", "Classify", "Compute",
    "Tax / Rebate", "Wealth Reconcile", "Paper Return", "E-Return",
  ],
  portalLayers: ["Documents", "Working Paper", "Tax Computation", "IT10B / IT10BB", "E-Return Portal"],
  portalLayerNotes: ["Source evidence", "Verified figures", "Tax position", "Disclosure statements", "Final data-entry layer"],
  audienceGroups: [
    { title: "Tax Practice শুরু করতে চান", description: "Theory থেকে একটি বাস্তব client file-এর structured preparation workflow-এ যেতে চান।", roles: ["নতুন Tax Practitioner", "Tax / Accounting / Law Learner"] },
    { title: "Already Accounts / Finance-এ কাজ করেন", description: "Income, TDS এবং return information আরও নির্ভুলভাবে verify ও handle করতে চান।", roles: ["Accounts Professional", "Finance Professional", "Compliance Staff"] },
    { title: "Client Return আরও professionally handle করতে চান", description: "Paper Return থেকে reconciled E-Return submission পর্যন্ত নিজের process upgrade করতে চান।", roles: ["Existing Return Preparer", "Tax Professional"] },
  ],
  clientJourney: [
    ["Client documents arrive", "Evidence ও source information গ্রহণ"],
    ["Income sources identified", "প্রতিটি income source আলাদা করা"],
    ["Taxable income calculated", "Head-wise computation তৈরি"],
    ["Tax, rebate ও TDS adjusted", "Liability ও credit reconcile"],
    ["Assets ও expenses reconciled", "IT10B / IT10BB consistency"],
    ["Paper Return prepared", "Working figure return form-এ translate"],
    ["NBR E-Return submitted", "Final review, submit ও record preserve"],
  ],
  reviewItems: ["সব income identify হয়েছে?", "সঠিক income head-এ classify হয়েছে?", "Supporting documents consistent?", "TDS / Advance Tax reflected?", "Rebate correctly calculated?", "IT10B complete?", "IT10BB complete?", "Tax payment matched?", "Assets / expenditure reconciled?", "কোনো information missing?"],
  registrationSteps: [
    ["Course Select", "Enrollment action থেকে শুরু করুন।"],
    ["Login / Register", "Account-এ login করুন অথবা নতুন account তৈরি করুন।"],
    ["Checkout", "প্রয়োজনীয় details দিয়ে order request তৈরি করুন।"],
    ["PayStation Payment", "Secure gateway-এ payment সম্পন্ন করুন।"],
    ["Verification + Dashboard", "Server verification সফল হলে access চালু হবে।"],
  ],
  anatomyLabels: ["Basic Information", "Income Computation", "TDS / AIT", "Tax Rebate", "IT10B", "IT10BB", "Tax Payment", "Paper Return", "E-Return", "Acknowledgement"],
  returnCaseVisual: {
    sections: ["Client Information", "Income Heads", "Tax Computation", "IT10B / IT10BB", "TDS / AIT", "Final Submission"],
    labels: ["PAPER RETURN", "FORM · 2026", "Taxpayer Case File", "Assessment Dossier", "Client Return File", "Evidence indexed · figures reconciled", "Ready for E-Return"],
  },
  returnFileAnatomy: { title: "একটি Complete Return File-এর ভেতরে কী কী থাকে?", description: "একটি central client record-এর পরস্পর-সংযুক্ত evidence, calculation এবং declaration layer.", dossierItems: ["Evidence Index", "Working Computation", "Statements", "Submission Record"], reviewedStamp: "REVIEWED / AY 26–27" },
  financialConsistency: {
    eyebrow: "Financial consistency test", title: "Income → Tax → Expenditure → Assets",
    availableSources: ["Declared Income", "Explained Sources"], financialApplication: ["Tax", "Family Expenditure", "Asset Growth"],
    description: "Return preparation শুধু income calculation নয়। Financial position-এর consistency establish করাও গুরুত্বপূর্ণ.", badge: "Reconciled position",
  },
  transformation: {
    title: "Course-এর আগে → Course-এর পরে",
    description: "Transformation-এর লক্ষ্য কোনো exaggerated promise নয়—একটি repeatable professional process তৈরি করা।",
    before: ["Documents আছে, sequence unclear", "Income head নিয়ে confusion", "Portal-dependent filing", "Reconciliation uncertainty", "Final review checklist নেই"],
    after: ["Structured client workflow", "Evidence-based classification", "Complete tax computation", "IT10B / IT10BB reconciliation", "Confident Paper + E-Return submission"],
    goal: "একটি real client-এর complete return independently prepare এবং submit করতে পারা",
  },
  enrollment: {
    heading: "Complete Return Preparation System",
    facts: { scope: "Paper Return + NBR E-Return", curriculum: "5টি practical module" },
    includes: ["Document Verification ও Income Classification", "Head-wise Income ও Tax Computation", "IT10B / IT10BB ও TDS / AIT Reconciliation", "Paper Return থেকে Final E-Return Submission"],
    cta: "Enrollment শুরু করুন",
  },
  finalCta: { heading: "একটি Client-এর Documents হাতে নিয়ে Complete Return File করতে প্রস্তুত?", description: "Document verification থেকে final E-Return submission পর্যন্ত practical workflow শিখুন।", cta: "Enrollment শুরু করুন" },
};

const sections = [
  { id: "hero", title: "“Paper Return” থেকে “NBR e-Return”—একটি Client Case শুরু থেকে শেষ পর্যন্ত হাতে-কলমে শিখুন", cta: ["কোর্সে ভর্তি হোন", "সম্পূর্ণ curriculum"] },
  { id: "problem", title: "রিটার্ন ফাইলিংয়ে আসল কঠিন জায়গা Portal নয়", description: "একটি সঠিক Return তৈরি করতে আইন, documents, calculation, evidence এবং financial consistency—সবকিছু একসঙ্গে কাজ করে।", closingLine: "Calculation ঠিক হলেও reconciliation ভুল হলে Return technically complete নয়।" },
  { id: "system-flow", title: "একটি Return আসলে কীভাবে তৈরি হয়?", description: "একটি continuous professional system—যেখানে প্রতিটি সিদ্ধান্ত পরের figure, statement এবং submission-কে প্রভাবিত করে।" },
  { id: "portal", title: "E-Return Portal শেখা মানেই Return Preparation শেখা নয়", description: "Portal শুধু final data-entry layer। তার আগে client-এর documents থেকে legally correct এবং financially consistent return তৈরি করতে হয়।" },
  { id: "audience", title: "কার জন্য এই practical return system?", description: "আপনার starting point আলাদা হতে পারে—কিন্তু লক্ষ্য একই: client information-কে একটি defensible return file-এ রূপান্তর করা।" },
  { id: "capability", title: "একটি Complete Return File করতে আপনি যে Capability তৈরি করবেন", description: "Preparation এবং filing—একটি complete professional file-এর দুইটি connected discipline।" },
  { id: "instructor", title: "Your Instructor", instructor: { name: "Mohammad Khairul Amin Sarker", credentials: "LLB · MBA · CA-CC", role: "Income Tax Lawyer · Trainer · CEO, Associates Academy", experience: "13 years plus income tax practice", positioning: "Return preparation শেখার সবচেয়ে কার্যকর পথ হলো একটি বাস্তব client case শুরু থেকে শেষ পর্যন্ত করা।", tags: ["Income Tax Practice", "Client Case Workflow", "Professional Review"], image: "/brand/founder.png" } },
  { id: "curriculum", title: "৫টি Module—একটি Complete Client Return Experience", description: "Legal foundation থেকে final submission পর্যন্ত প্রতিটি module একই client-file logic-এর পরের স্তর তৈরি করে।" },
  { id: "financial-consistency", ...pageData.financialConsistency },
  { id: "return-file-anatomy", ...pageData.returnFileAnatomy },
  { id: "client-journey", title: "একটি Client-এর File Course-এ কীভাবে এগোবে", description: "একটি case-এর evidence trail ধরে preparation, reconciliation এবং submission-এর পুরো story।" },
  { id: "review", title: "Submit করার আগে একজন Professional কী Check করেন?", description: "Portal-এর submit button-এর আগে একটি disciplined final review—যেখানে evidence, calculation এবং statements আবার একসঙ্গে দেখা হয়।" },
  { id: "transformation", ...pageData.transformation },
  { id: "enrollment", ...pageData.enrollment },
  { id: "registration", title: "রেজিস্ট্রেশন কীভাবে সম্পন্ন হবে?", description: "Payment result browser থেকে নয়—server verification সফল হওয়ার পর enrollment access চালু হয়।" },
  { id: "faq", title: "সাধারণ জিজ্ঞাসা", description: "Course scope, Paper Return, E-Return, income heads এবং final workflow সম্পর্কে source-backed উত্তর।" },
  { id: "final-cta", ...pageData.finalCta },
];

const exportData = {
  exportVersion: "1.0",
  exportedAt: new Date().toISOString(),
  purpose: "AI handoff for rewriting the Practical Paper Return & E-Return Filing Course landing page",
  source: {
    courseContentFile: "src/lib/content/practical-return-course.ts",
    landingPageFile: "src/components/marketing/practical-return-course-page.tsx",
    routeFile: "src/app/(marketing)/courses/[slug]/page.tsx",
    route: `/courses/${practicalReturnCourse.slug}`,
    checkoutRoute: `/checkout/${practicalReturnCourse.productSlug}`,
  },
  metadata: {
    title: "Practical Paper Return & E-Return Filing Course | Associates Academy",
    description: "Finance Act 2026 ও Assessment Year 2026–2027 ভিত্তিক practical tax return filing course—document verification, income computation, Paper Return, IT10B, IT10BB, TDS adjustment এবং NBR E-Return submission শিখুন।",
    locale: "bn_BD",
    heroImage: "/course/return-dossier-hero.png",
  },
  commerce: {
    note: "Current price and compare-at price are fetched at runtime from the published products table in Supabase.",
    fields: ["price", "regularPrice"],
    sourceTable: "products",
    productSlug: practicalReturnCourse.productSlug,
    fallbackWhenUnavailable: null,
    expectedPublishedValuesFromE2E: {
      price: 1600,
      regularPrice: 2000,
      currency: "BDT",
      provenance: "tests/e2e/public-journey.spec.ts",
    },
  },
  course: practicalReturnCourse,
  landingPage: { sections, pageData },
};

await mkdir("content-exports", { recursive: true });
await writeFile(outputPath, `${JSON.stringify(exportData, null, 2)}\n`, "utf8");
console.log(`Wrote ${outputPath}`);
