export const businessInfo = {
  brandName: "Associates Academy",
  tagline: "Professional Tax & Legal Education Platform",
  registeredBusinessName: "এসোসিয়েটস একাডেমী",
  businessType: "আইন উপদেষ্টা ফার্ম",
  tradeLicense: "TRAD/DNCC/007397/2026",
  address: "বাসা-৩৭৬/এ, রোড-১৮, সেকশন-৬, ব্লক-সি, মিরপুর, ঢাকা-১২১৬",
  country: "Bangladesh",
  email: "contact@associatesacademy.bd",
  phones: ["+880 1712-192758", "+88 0193-4542908"],
  phoneHrefs: ["tel:+8801712192758", "tel:+8801934542908"],
  founderName: "Mohammad Khairul Amin Sarker",
  founderCredentials: "LLB, CA-CC, MBA (Finance)",
  founderTitle:
    "Income Tax Lawyer | VAT & RJSC Consultant | Corporate Compliance Advisor",
} as const;

export const complianceLinks = [
  { label: "About Us", href: "/about" },
  { label: "Business Address", href: "/business-address" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Return & Refund Policy", href: "/refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Delivery Policy", href: "/delivery-policy" },
] as const;

export const checkoutConsentText =
  "“পেমেন্ট করুন / Pay Now” বাটনে ক্লিক করার মাধ্যমে আমি Associates Academy-এর Terms & Conditions, Return & Refund Policy এবং Privacy Policy পড়েছি এবং এসব নীতিমালায় সম্মতি প্রদান করছি।";

export type LegalSection = {
  heading?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export const aboutContent = {
  title: "About Associates Academy",
  eyebrow: "ABOUT US",
  sections: [
    {
      heading: "আমাদের সম্পর্কে",
      paragraphs: [
        "Associates Academy বাংলাদেশের পেশাজীবী, শিক্ষার্থী, করদাতা এবং Tax, Accounting, Legal ও Corporate Compliance বিষয়ে আগ্রহীদের জন্য একটি professional learning platform।",
        "আমাদের লক্ষ্য হলো জটিল আইন, বিধান এবং professional concepts-কে কেবল তাত্ত্বিকভাবে শেখানো নয়; বরং সেগুলো বাস্তব কাজের ক্ষেত্রে কীভাবে প্রয়োগ করতে হয়, তা structured ও practical learning-এর মাধ্যমে শেখানো।",
        "Associates Academy-তে আমরা বিশেষভাবে Income Tax, VAT, Corporate Compliance, Return Preparation, Practical Tax Practice এবং সংশ্লিষ্ট professional skill development-এর ওপর live course, practical training, digital learning materials, eBook এবং অন্যান্য educational resources প্রদান করি।",
        "আমাদের course ও learning materials এমনভাবে তৈরি করা হয় যাতে একজন learner আইন বা concept বোঝার পাশাপাশি বাস্তব working procedure, calculation, documentation এবং compliance process সম্পর্কেও পরিষ্কার ধারণা অর্জন করতে পারেন।",
      ],
    },
    {
      heading: "Founder & Instructor",
      paragraphs: [
        `${businessInfo.founderName}\n${businessInfo.founderCredentials}\n${businessInfo.founderTitle}`,
        "তিনি Associates Academy-এর Founder এবং দীর্ঘদিন ধরে taxation, accounting, audit ও corporate compliance-এর সঙ্গে পেশাগতভাবে যুক্ত।",
      ],
    },
    {
      heading: "Our Mission",
      paragraphs: ["আমাদের উদ্দেশ্য হলো—"],
      bullets: [
        "practical ও application-based professional education প্রদান করা;",
        "বাংলাদেশের tax ও legal professionals-এর skill development-এ সহায়তা করা;",
        "complicated tax এবং compliance বিষয়গুলো সহজ, structured ও understandable করা;",
        "professional learners-দের জন্য নির্ভরযোগ্য learning resources তৈরি করা।",
      ],
    },
    {
      heading: "Business Information",
      paragraphs: [
        `Brand Name: ${businessInfo.brandName}`,
        `Registered Business Name: ${businessInfo.registeredBusinessName}`,
        `Business Type: ${businessInfo.businessType}`,
        `Country: ${businessInfo.country}`,
        `Trade License No.: ${businessInfo.tradeLicense}`,
      ],
    },
  ] satisfies readonly LegalSection[],
} as const;

export const businessAddressContent = {
  title: "Business Address & Contact Information",
  eyebrow: "CONTACT",
  support:
    "Course enrollment, payment বা digital content access সংক্রান্ত support-এর জন্য email করার সময় সম্ভব হলে আপনার নাম, registered email/phone number, Order ID এবং Transaction ID উল্লেখ করুন। এতে দ্রুত transaction শনাক্ত করা সম্ভব হবে।",
} as const;

export const legalPages = {
  terms: {
    title: "Terms & Conditions",
    eyebrow: "LEGAL",
    lastUpdated: "15 August 2026",
    description:
      "Associates Academy-এর website, courses, digital products, eBooks এবং অন্যান্য services ব্যবহার বা purchase করার আগে অনুগ্রহ করে নিচের Terms & Conditions পড়ুন।",
    intro: [
      "Website-এ account তৈরি, course enrollment, digital product purchase অথবা payment সম্পন্ন করার মাধ্যমে আপনি এই Terms & Conditions মেনে নিচ্ছেন বলে গণ্য হবে।",
    ],
    sections: [
      {
        heading: "3.1 About the Service",
        paragraphs: [
          "Associates Academy একটি professional education ও digital learning platform। আমাদের services-এর মধ্যে থাকতে পারে:",
        ],
        bullets: [
          "Live Online Courses",
          "Recorded Courses",
          "Workshops",
          "Professional Training",
          "eBooks",
          "Downloadable Educational Materials",
          "Templates/Worksheets",
          "Course-related digital resources",
          "অন্যান্য educational services",
        ],
      },
      {
        paragraphs: [
          "প্রতিটি product বা course-এর বিস্তারিত description সংশ্লিষ্ট product/course page-এ উল্লেখ থাকবে।",
        ],
      },
      {
        heading: "3.2 Eligibility and Correct Information",
        paragraphs: [
          "Purchase বা enrollment-এর সময় customer-কে সঠিক নাম, email address, mobile number এবং প্রয়োজনীয় অন্যান্য তথ্য প্রদান করতে হবে।",
          "ভুল তথ্য দেওয়ার কারণে course access, certificate, eBook delivery বা যোগাযোগে সমস্যা হলে Associates Academy যথাসাধ্য সহায়তা করবে; তবে ভুল customer information-এর কারণে সৃষ্ট বিলম্বের দায় Academy-এর ওপর বর্তাবে না।",
        ],
      },
      {
        heading: "3.3 Pricing",
        paragraphs: [
          "Associates Academy-এর website-এ বিক্রয়যোগ্য সকল course, service ও digital product-এর মূল্য Bangladeshi Taka (BDT/৳)-তে প্রদর্শিত হবে। Discount থাকলে original price এবং discounted/current payable price স্পষ্টভাবে দেখানো হবে। Checkout page-এ payment করার আগে customer-এর Final Payable Amount প্রদর্শিত হবে। প্রযোজ্য VAT, tax বা অন্য কোনো mandatory charge থাকলে checkout-এর আগে তা স্পষ্টভাবে উল্লেখ করা হবে।",
        ],
      },
      {
        heading: "3.4 Payment",
        paragraphs: [
          "Payment আমাদের website-এ সংযুক্ত authorised payment gateway/payment service provider-এর মাধ্যমে সম্পন্ন হতে পারে। Customer-এর payment successful হওয়ার পর সংশ্লিষ্ট Order/Enrollment confirmation প্রদান করা হবে। Payment processing-এর সময় bank, card issuer, MFS provider অথবা payment gateway-এর নিজস্ব technical processing ও security checks প্রযোজ্য হতে পারে।",
        ],
      },
      {
        heading: "3.5 Failed or Incomplete Payment",
        paragraphs: [
          "Customer-এর account থেকে অর্থ কেটে নেওয়া হলেও transaction website-এ successful না দেখালে একই payment পুনরায় করার আগে আমাদের support team-এর সঙ্গে যোগাযোগ করার পরামর্শ দেওয়া হচ্ছে। Order ID, Transaction ID এবং payment-এর প্রমাণ প্রদান করলে আমরা transaction যাচাই করতে পারব।",
        ],
      },
      {
        heading: "3.6 Course Enrollment and Access",
        paragraphs: [
          "Successful payment-এর পর customer purchased course-এর জন্য enrollment/access পাওয়ার অধিকারী হবেন। Course অনুযায়ী access হতে পারে:",
        ],
        bullets: [
          "Student dashboard",
          "Live class link",
          "Learning portal",
          "Email",
          "WhatsApp/other communication platform",
          "Downloadable resources",
        ],
      },
      {
        paragraphs: [
          "Course-specific delivery method সংশ্লিষ্ট course page-এ উল্লেখ থাকবে।",
        ],
      },
      {
        heading: "3.7 Live Course Schedule",
        paragraphs: [
          "Associates Academy প্রয়োজনবোধে instructor availability, technical issue, public holiday বা অন্য যৌক্তিক কারণে live class-এর date/time পরিবর্তন করতে পারে। এমন পরিবর্তন হলে enrolled participants-কে যথাসম্ভব আগে জানানো হবে।",
        ],
      },
      {
        heading: "3.8 Digital Product and eBook",
        paragraphs: [
          "eBook এবং অন্যান্য downloadable digital products ব্যক্তিগত educational use-এর জন্য প্রদান করা হয়। Purchase-এর মাধ্যমে customer ownership of copyright অর্জন করেন না; customer কেবল ব্যক্তিগত ব্যবহারের অনুমতি পান।",
        ],
      },
      {
        heading: "3.9 Intellectual Property",
        paragraphs: [
          "Associates Academy-এর course video, presentation, eBook, PDF, worksheet, graphics, recorded class, notes, templates এবং website content অনুমতি ছাড়া copy, reproduce, redistribute, resell, publicly upload বা commercialভাবে ব্যবহার করা যাবে না।",
        ],
      },
      {
        heading: "3.10 Account Sharing",
        paragraphs: [
          "Paid course বা digital product-এর access ব্যক্তিগত এবং non-transferable, যদি সংশ্লিষ্ট product page-এ অন্যথা উল্লেখ না থাকে। একজন customer-এর course account বা purchased material অন্য ব্যক্তিকে unauthorizedভাবে প্রদান করা যাবে না।",
        ],
      },
      {
        heading: "3.11 Certificate",
        paragraphs: [
          "যেসব course-এ certificate প্রদান করা হয়, সেখানে certificate পাওয়ার জন্য attendance, assignment, assessment অথবা অন্যান্য announced requirements থাকতে পারে। Course কিনলেই স্বয়ংক্রিয়ভাবে certificate পাওয়ার নিশ্চয়তা তৈরি হয় না, যদি course-specific requirement থাকে।",
        ],
      },
      {
        heading: "3.12 Educational Disclaimer",
        paragraphs: [
          "Associates Academy-এর courses ও learning materials educational এবং professional skill-development purpose-এ প্রদান করা হয়। Tax, legal অথবা compliance-related educational content কোনো নির্দিষ্ট ব্যক্তির নির্দিষ্ট পরিস্থিতির জন্য individual professional opinion বা personalised legal/tax advice হিসেবে গণ্য করা উচিত নয়।",
        ],
      },
      {
        heading: "3.13 Refund",
        paragraphs: [
          "Refund-এর ক্ষেত্রে আমাদের Return & Refund Policy প্রযোজ্য হবে।",
        ],
      },
      {
        heading: "3.14 Changes to Services",
        paragraphs: [
          "প্রয়োজন অনুযায়ী Academy course structure, instructor, class schedule, learning platform বা supplementary materials-এর reasonable পরিবর্তন করতে পারে, তবে purchased service-এর মূল nature বজায় রাখার চেষ্টা করা হবে।",
        ],
      },
      {
        heading: "3.15 Governing Law",
        paragraphs: [
          "এই Terms & Conditions বাংলাদেশের প্রযোজ্য আইন অনুযায়ী পরিচালিত ও ব্যাখ্যা করা হবে। কোনো dispute হলে customer-কে প্রথমে Associates Academy-এর support-এর সঙ্গে যোগাযোগ করে বিষয়টি সমাধানের চেষ্টা করার অনুরোধ করা হচ্ছে।",
        ],
      },
    ] satisfies readonly LegalSection[],
  },
  refund: {
    title: "Return & Refund Policy",
    eyebrow: "LEGAL",
    lastUpdated: "15 August 2026",
    description:
      "Associates Academy professional courses, live training এবং digital products প্রদান করে। আমাদের অধিকাংশ product/service digital nature-এর হওয়ায় physical return-এর ধারণা সাধারণত প্রযোজ্য নয়। তবে নির্দিষ্ট পরিস্থিতিতে refund প্রদান করা হতে পারে।",
    sections: [
      {
        heading: "4.1 Live Course Refund",
        paragraphs: [
          "Customer যদি কোনো live course-এর enrollment cancel করতে চান, তাহলে course-এর প্রথম scheduled class শুরু হওয়ার কমপক্ষে 24 ঘণ্টা আগে refund request করলে full course fee refund-এর জন্য eligible হবেন।",
          "Course শুরু হয়ে যাওয়ার পরে course access/class access প্রদান করা হয়ে গেলে শুধুমাত্র মত পরিবর্তন, সময় না পাওয়া বা ব্যক্তিগত কারণে সাধারণত refund প্রদান করা হবে না।",
        ],
      },
      {
        heading: "4.2 Course Cancelled by Associates Academy",
        paragraphs: [
          "Associates Academy কোনো course সম্পূর্ণ cancel করলে enrolled customer-কে 100% refund অথবা customer-এর সম্মতিতে অন্য course/batch-এ transfer-এর option দেওয়া হবে। Customer-এর সম্মতি ছাড়া তাকে অন্য course-এ বাধ্যতামূলকভাবে transfer করা হবে না।",
        ],
      },
      {
        heading: "4.3 Major Rescheduling",
        paragraphs: [
          "Associates Academy কোনো course উল্লেখযোগ্য সময়ের জন্য reschedule করলে এবং নতুন schedule-এ customer attend করতে না পারলে, customer refund request করতে পারবেন।",
        ],
      },
      {
        heading: "4.4 eBook / Downloadable Digital Product",
        paragraphs: [
          "eBook, PDF, template বা downloadable digital product সফলভাবে customer-এর কাছে delivered/access provided হওয়ার পরে সাধারণ change-of-mind refund প্রযোজ্য হবে না। তবে নিচের ক্ষেত্রে customer support-এর সঙ্গে যোগাযোগ করতে পারবেন:",
        ],
        bullets: [
          "customer payment করেছেন কিন্তু product access পাননি;",
          "delivered file technically corrupted বা unusable;",
          "একই order-এর জন্য duplicate payment হয়েছে;",
          "technical error-এর কারণে ভুল product delivered হয়েছে।",
        ],
      },
      {
        paragraphs: [
          "এ ধরনের ক্ষেত্রে Associates Academy প্রয়োজন অনুযায়ী replacement access অথবা refund প্রদান করবে।",
        ],
      },
      {
        heading: "4.5 Duplicate Payment",
        paragraphs: [
          "একই purchase-এর জন্য ভুলবশত একাধিক payment successful হলে verified duplicate amount refund করা হবে।",
        ],
      },
      {
        heading: "4.6 Payment Deducted but Order Failed",
        paragraphs: [
          "Payment account থেকে deducted হলেও Associates Academy-এর system-এ order/enrollment unsuccessful থাকলে transaction যাচাই করা হবে। Payment verified হলে purchased service/product access দেওয়া হবে অথবা transaction অনুযায়ী refund initiate করা হবে।",
        ],
      },
      {
        heading: "4.7 Refund Request Procedure",
        paragraphs: [
          `Refund request পাঠাতে হবে:\nEmail: ${businessInfo.email}\nPhone: ${businessInfo.phones.join(" / ")}`,
          "Refund request-এ সম্ভব হলে দিতে হবে:",
        ],
        bullets: [
          "Customer Name",
          "Registered Email",
          "Mobile Number",
          "Product/Course Name",
          "Order ID",
          "Payment Transaction ID",
          "Payment Date",
          "Refund-এর কারণ",
        ],
      },
      {
        heading: "4.8 Refund Processing Time",
        paragraphs: [
          "Associates Academy refund request যাচাই ও approval করার পর applicable payment gateway-এর মাধ্যমে refund initiate করবে। Approved refund PayStation-এর মাধ্যমে initiate হওয়ার পর customer-এর account-এ সাধারণত 5–7 working days-এর মধ্যে credit হতে পারে। Payment method, bank, MFS provider অথবা সংশ্লিষ্ট financial institution অনুযায়ী সময় কিছুটা পরিবর্তিত হতে পারে।",
        ],
      },
    ] satisfies readonly LegalSection[],
  },
  privacy: {
    title: "Privacy Policy",
    eyebrow: "LEGAL",
    lastUpdated: "15 August 2026",
    description:
      "Associates Academy আমাদের users, learners এবং customers-এর personal information-এর privacy এবং security-কে গুরুত্ব দেয়। এই Privacy Policy-তে আমরা কী ধরনের তথ্য সংগ্রহ করতে পারি, কেন সংগ্রহ করি এবং কীভাবে ব্যবহার বা share করা হতে পারে তার বিস্তারিত দেওয়া হলো।",
    sections: [
      {
        heading: "5.1 Information We May Collect",
        paragraphs: [
          "Customer website ব্যবহার, account তৈরি বা purchase করার সময় আমরা নিচের তথ্য সংগ্রহ করতে পারি:",
          "Personal Information",
        ],
        bullets: [
          "নাম",
          "mobile number",
          "email address",
          "account/profile information",
          "billing-related information",
          "course enrollment information",
        ],
      },
      {
        paragraphs: ["Transaction Information"],
        bullets: [
          "Order ID",
          "Transaction ID/reference",
          "purchased product/course",
          "amount paid",
          "payment status",
          "payment date",
        ],
      },
      {
        paragraphs: [
          "Payment-এর sensitive credentials যেমন complete card information সাধারণত সংশ্লিষ্ট payment gateway/bank/payment service provider তাদের নিজস্ব secured payment environment-এ process করে।",
        ],
      },
      {
        heading: "5.2 Technical Information",
        paragraphs: [
          "Website security, performance এবং analytics-এর প্রয়োজনে কিছু technical information automatically collect হতে পারে, যেমন:",
        ],
        bullets: [
          "IP address",
          "browser type",
          "device type",
          "operating system",
          "website activity",
          "login information",
          "cookies অথবা similar technologies",
        ],
      },
      {
        heading: "5.3 How We Use Information",
        paragraphs: ["Collected information ব্যবহার করা হতে পারে:"],
        bullets: [
          "user account পরিচালনার জন্য;",
          "course enrollment process করার জন্য;",
          "payment/order verify করার জন্য;",
          "purchased eBook বা digital product deliver করার জন্য;",
          "live class/course information পাঠানোর জন্য;",
          "customer support প্রদানের জন্য;",
          "refund/dispute resolve করার জন্য;",
          "fraudulent বা unauthorized transaction শনাক্ত করতে;",
          "website ও services improve করতে;",
          "প্রয়োজনীয় administrative communication পাঠাতে;",
          "applicable accounting, tax, record-keeping এবং regulatory obligations পূরণ করতে।",
        ],
      },
      {
        heading: "5.4 Communication",
        paragraphs: [
          "Customer course purchase করলে Academy প্রয়োজনীয় operational communication পাঠাতে পারে, যেমন enrollment confirmation, payment confirmation, class schedule, class link, course update, certificate-related communication এবং account/security notice।",
          "Marketing বা promotional communication-এর ক্ষেত্রে customer available unsubscribe/opt-out option ব্যবহার করতে পারবেন যেখানে applicable।",
        ],
      },
      {
        heading: "5.5 Sharing of Information",
        paragraphs: [
          "Associates Academy প্রয়োজন ছাড়া customer information বিক্রি বা commercialভাবে third party-কে প্রদান করে না। তবে service পরিচালনার জন্য সীমিত তথ্য নিচের category-এর service providers-এর সঙ্গে process/share হতে পারে:",
        ],
        bullets: [
          "Payment gateway/payment processor",
          "Website hosting provider",
          "Database/cloud infrastructure provider",
          "Email provider",
          "Online class/video conferencing service",
          "Customer communication platform",
          "Accounting/compliance service provider",
        ],
      },
      {
        paragraphs: [
          "তাদের কাছে শুধুমাত্র সংশ্লিষ্ট service পরিচালনার জন্য প্রয়োজনীয় information দেওয়া হতে পারে।",
        ],
      },
      {
        heading: "5.6 Payment Information",
        paragraphs: [
          "Online payment-এর সময় customer-এর payment information authorised payment gateway এবং সংশ্লিষ্ট financial institution দ্বারা process হতে পারে। তাদের নিজস্ব security এবং privacy terms customer transaction-এর ক্ষেত্রে প্রযোজ্য হতে পারে।",
        ],
      },
      {
        heading: "5.7 Data Security",
        paragraphs: [
          "Customer information unauthorized access, misuse অথবা disclosure থেকে রক্ষা করতে আমরা reasonable administrative এবং technical security measures গ্রহণ করার চেষ্টা করি। তবে কোনো online system-এর security শতভাগ guarantee করা সম্ভব নয়।",
        ],
      },
      {
        heading: "5.8 Data Retention",
        paragraphs: [
          "Personal এবং transaction-related information service delivery, customer support, dispute resolution এবং প্রয়োজনীয় accounting/legal/compliance purpose-এর জন্য প্রয়োজনীয় সময় পর্যন্ত সংরক্ষণ করা হতে পারে।",
        ],
      },
      {
        heading: "5.9 Customer Requests",
        paragraphs: [
          `Customer তার personal information সম্পর্কে correction/update request করতে পারেন। Applicable requirements এবং legitimate record-keeping obligations সাপেক্ষে data-related request করার জন্য যোগাযোগ করা যাবে:\nEmail: ${businessInfo.email}`,
        ],
      },
      {
        heading: "5.10 Policy Changes",
        paragraphs: [
          "Service অথবা operational requirement পরিবর্তিত হলে Associates Academy এই Privacy Policy update করতে পারে। Updated version website-এ প্রকাশ করা হবে এবং “Last Updated” date পরিবর্তন করা হবে।",
        ],
      },
    ] satisfies readonly LegalSection[],
  },
  delivery: {
    title: "Delivery Policy",
    eyebrow: "DELIVERY",
    lastUpdated: "15 August 2026",
    description:
      "Associates Academy-এর অধিকাংশ services ও products digitally delivered হয়। সাধারণত কোনো physical shipping প্রয়োজন হয় না, যদি সংশ্লিষ্ট product page-এ অন্যথা উল্লেখ না থাকে।",
    sections: [
      {
        heading: "6.1 Live Course Delivery",
        paragraphs: [
          "Successful enrollment/payment-এর পর customer course অনুযায়ী নিচের এক বা একাধিক মাধ্যমে access পাবেন:",
        ],
        bullets: [
          "Associates Academy Website Dashboard",
          "Registered Email",
          "WhatsApp/communication group",
          "Live Class Link",
          "Course-specific Learning Portal",
        ],
      },
      {
        paragraphs: [
          "Course শুরু হওয়ার date ও class schedule course page অথবা enrollment communication-এ জানানো হবে।",
        ],
      },
      {
        heading: "6.2 eBook Delivery",
        paragraphs: [
          "Successful payment-এর পর purchased eBook customer-কে digital format-এ প্রদান করা হবে। Delivery হতে পারে:",
        ],
        bullets: [
          "website account/dashboard-এর মাধ্যমে;",
          "instant download link;",
          "registered email-এর মাধ্যমে;",
          "অথবা সংশ্লিষ্ট product page-এ উল্লেখিত অন্য digital method-এ।",
        ],
      },
      {
        paragraphs: [
          "কোনো physical copy courier-এর মাধ্যমে পাঠানো হবে না, যদি product page-এ স্পষ্টভাবে physical edition হিসেবে উল্লেখ না থাকে।",
        ],
      },
      {
        heading: "6.3 Other Digital Products",
        paragraphs: [
          "PDF, template, worksheet অথবা অন্য downloadable resources successful payment/order confirmation-এর পর website বা digital delivery mechanism-এর মাধ্যমে প্রদান করা হবে।",
        ],
      },
      {
        heading: "6.4 Delivery Problem",
        paragraphs: [
          `Successful payment করার পর expected digital access না পেলে customer আমাদের support-এর সঙ্গে যোগাযোগ করবেন। যোগাযোগের সময় Order ID এবং Transaction ID দিলে দ্রুত সমস্যা শনাক্ত করা সম্ভব হবে।\n\nPhone: ${businessInfo.phones.join(" / ")}\nEmail: ${businessInfo.email}`,
        ],
      },
      {
        heading: "6.5 Incorrect Customer Information",
        paragraphs: [
          "Customer ভুল email/mobile number প্রদান করলে delivery বিলম্বিত হতে পারে। এ ধরনের ক্ষেত্রে customer support-এর সঙ্গে যোগাযোগ করে তথ্য সংশোধন করতে পারবেন।",
        ],
      },
    ] satisfies readonly LegalSection[],
  },
} as const;
