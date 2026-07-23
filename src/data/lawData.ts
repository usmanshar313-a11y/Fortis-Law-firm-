import { PracticeArea, Attorney, CaseResult, Testimonial, BlogPost, CareerPosition, Language } from '../types';

export const FIRM_INFO = {
  name: "FORTIS LAW ASSOCIATES",
  tagline: "Unyielding Advocacy. Sovereign Integrity. Exceptional Legal Distinction.",
  taglineUr: "غیر متزلزل وکالت۔ اعلیٰ ترین دیانت۔ استثنائی قانونی معیار۔",
  establishedYear: 1998,
  yearsActive: "25+",
  casesHandled: "4,500+",
  clientsServed: "3,200+",
  successRate: "98.4%",
  phone: "+92 308 0291021",
  whatsapp: "https://wa.me/923080291021",
  whatsappNumber: "923080291021",
  email: "contact@fortislaw.com",
  adminEmailDefault: "admin@fortislaw.com",
  addressMain: "Fortis Tower, Level 14, Constitution Avenue, Sector F-5/1, Islamabad, Pakistan",
  developedBy: "Developed by Muhammad Daniyal Usman"
};

export const OFFICE_LOCATIONS = [
  {
    city: "Islamabad (Head Office)",
    address: "Fortis Tower, Level 14, Constitution Avenue, Sector F-5/1, Islamabad",
    phone: "+92 51 8492000",
    email: "islamabad@fortislaw.com",
    hours: "Mon - Fri: 8:30 AM - 6:30 PM | Sat: By Appointment",
    mapQuery: "Constitution Avenue Islamabad"
  },
  {
    city: "Lahore",
    address: "Suite 702, Prime Plaza, Main Boulevard Gulberg III, Lahore",
    phone: "+92 42 35789100",
    email: "lahore@fortislaw.com",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM",
    mapQuery: "Gulberg III Lahore"
  },
  {
    city: "Karachi",
    address: "Floor 9, Financial Trade Center, Main Shahrah-e-Faisal, Karachi",
    phone: "+92 21 34328800",
    email: "karachi@fortislaw.com",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM",
    mapQuery: "Shahrah e Faisal Karachi"
  }
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "corporate",
    title: "Corporate & M&A",
    titleUr: "کارپوریٹ اور ضم کاری",
    shortDesc: "Cross-border mergers, commercial contracts, regulatory compliance, and joint ventures.",
    shortDescUr: "بین الاقوامی کارپوریٹ امور، معاہدات اور ریگولیٹری قانون۔",
    fullDesc: "Fortis Law Associates represents Fortune 500 multinationals, financial institutions, and emerging tech enterprises across complex corporate restructuring, cross-border acquisitions, joint ventures, and SECP compliance.",
    iconName: "Briefcase",
    keyServices: [
      "Mergers & Acquisitions (M&A)",
      "Cross-Border Investments & FDI",
      "Corporate Governance & Compliance",
      "Shareholders Agreements & Disputes",
      "Venture Capital & Private Equity"
    ],
    faqs: [
      {
        question: "How does Fortis handle cross-border merger compliance?",
        questionUr: "فورٹس بین الاقوامی ضم کاری کی تعمیل کیسے سنبھالتا ہے؟",
        answer: "We structure multi-jurisdictional clearances with the Competition Commission, SECP, and Board of Investment to ensure seamless regulatory authorization.",
        answerUr: "ہم مسابقتی کمیشن اور ایس ای سی پی کے ساتھ تمام قانونی اور ریگولیٹری منظوریوں کا انضباط کرتے ہیں۔"
      },
      {
        question: "What is the typical timeframe for a corporate restructuring deal?",
        questionUr: "کارپوریٹ کی ازسرنو تنظیم میں کتنا وقت لگتا ہے؟",
        answer: "Depending on diligence complexity, typical transactions range from 4 to 12 weeks from initial term sheet to closing execution.",
        answerUr: "دستاویزات اور چھان بین کی پیچیدگی کے لحاظ سے معمولاً 4 سے 12 ہفتے درکار ہوتے ہیں۔"
      }
    ]
  },
  {
    id: "constitutional",
    title: "Constitutional & Public Law",
    titleUr: "آئینی و عوامی قانون",
    shortDesc: "High Court & Supreme Court writ petitions, fundamental rights enforcement, and judicial review.",
    shortDescUr: "ہائی کورٹ اور سپریم کورٹ میں آئینی رٹ درخواستیں اور عدالتی نظرثانی۔",
    fullDesc: "Our senior advocacy panel regularly appears before the High Courts and Supreme Court of Pakistan handling high-stakes Writ Petitions, public interest litigation, and statutory challenges against administrative overreach.",
    iconName: "Scale",
    keyServices: [
      "Writ Petitions (Article 199 & Article 184(3))",
      "Judicial Review of Administrative Action",
      "Regulatory Authority Challenges",
      "Fundamental Human Rights Enforcement",
      "Government Contract & Tender Disputes"
    ],
    faqs: [
      {
        question: "When can a constitutional Writ Petition be filed?",
        questionUr: "آئینی رٹ درخواست کب دائر کی جا سکتی ہے؟",
        answer: "A Writ Petition is maintainable when an administrative body acts without lawful authority or violates fundamental rights where no adequate alternative remedy exists.",
        answerUr: "رٹ درخواست اس وقت دائر کی جاتی ہے جب کوئی بااختیار ادارہ غیر قانونی اقدام کرے يا بنیادی حقوق کی خلاف ورزی ہو۔"
      }
    ]
  },
  {
    id: "banking",
    title: "Banking & Finance Law",
    titleUr: "بینکاری و مالیاتی قانون",
    shortDesc: "Syndicated financing, Islamic banking contracts, asset recovery, and State Bank compliance.",
    shortDescUr: "سنڈیکیٹڈ فنانسنگ، اسلامی بینکاری معاہدات، اور اسٹیٹ بینک ریگولیشن۔",
    fullDesc: "Advising premier commercial banks, non-banking financial institutions (NBFIs), and sovereign funds on structured trade finance, Sukuk issuances, project debt, and Banking Court recovery litigations.",
    iconName: "Building2",
    keyServices: [
      "Syndicated Debt Facilities & Loan Agreements",
      "Islamic Finance Structures & Sukuk",
      "State Bank Regulatory Advisory (PRs)",
      "Financial Debt Recovery Litigation",
      "FinTech & Digital Payments Compliance"
    ],
    faqs: [
      {
        question: "Do you advise on Islamic Banking compliance?",
        questionUr: "کیا آپ اسلامی بینکاری کے قوانین پر مشاورت دیتے ہیں؟",
        answer: "Yes, our team works alongside Shariah boards to draft Murabaha, Ijarah, and Sukuk financing instruments.",
        answerUr: "جی ہاں، ہماری ٹیم مرابحہ، اجارہ اور صکوک کے دستاویزات پر مکمل قانونی رہنمائی فراہم کرتی ہے۔"
      }
    ]
  },
  {
    id: "criminal",
    title: "White-Collar & Criminal Defense",
    titleUr: "وائٹ کالر اور مجرمانہ دفاع",
    shortDesc: "NAB, FIA, anti-money laundering (AML), tax fraud defense, and high-stakes criminal trials.",
    shortDescUr: "نیب، ایف آئی اے، اینٹی منی لانڈرنگ اور پیچیدہ مجرمانہ مقدمات کا دفاع۔",
    fullDesc: "Protecting corporate executives, public figures, and institutions facing investigations by the National Accountability Bureau (NAB), Federal Investigation Agency (FIA), and Anti-Corruption departments.",
    iconName: "ShieldAlert",
    keyServices: [
      "NAB & FIA Defense Litigation",
      "Anti-Money Laundering (AML/CFT) Compliance",
      "Bail Matters & Quashment Petitions",
      "Cybercrime & Electronic Crimes Act (PECA)",
      "Corporate Fraud Internal Investigations"
    ],
    faqs: [
      {
        question: "What immediate steps should be taken if summoned by FIA or NAB?",
        questionUr: "اگر نیب یا ایف آئی اے نوٹس دے تو فوراً کیا کرنا چاہیے؟",
        answer: "Do not issue statements without legal counsel. Contact our emergency defense line immediately to prepare protective pre-arrest bail petitions.",
        answerUr: "قانونی مشورے کے بغیر بیان دینے سے گریز کریں۔ فوری طور پر ہمارے دفاعی پینل سے رابطہ کریں تاکہ قبل از گرفتاری ضمانت حاصل کی جا سکے۔"
      }
    ]
  },
  {
    id: "ip",
    title: "Intellectual Property Law",
    titleUr: "دانشورانہ ملکیت (IP) قانون",
    shortDesc: "Trademarks, patent filings, copyright enforcement, and trade secret litigation.",
    shortDescUr: "ٹریڈ مارک، پیٹنٹ، کاپی رائٹ اور کاپی رائٹ خلاف ورزی کے خلاف کارروائی۔",
    fullDesc: "Protecting domestic and international corporate brands with the Intellectual Property Organization (IPO Pakistan), handling registration, anti-counterfeiting enforcement, and patent infringement lawsuits.",
    iconName: "Award",
    keyServices: [
      "Trademark Registration & Opposition Hearings",
      "Patent Protection & Prosecution",
      "Copyright Licensing & Infringement Injunctions",
      "Trade Secrets Protection & Non-Competes",
      "Customs Anti-Counterfeiting Seizures"
    ],
    faqs: [
      {
        question: "How long does a trademark registration take in Pakistan?",
        questionUr: "پاکستان میں ٹریڈ مارک کی رجسٹریشن میں کتنا وقت لگتا ہے؟",
        answer: "Standard trademark registration typically takes 12 to 18 months through IPO Pakistan including examination and journal publication.",
        answerUr: "آئی پی او پاکستان کے ذریعے ٹریڈ مارک کی رجسٹریشن میں معمولاً 12 سے 18 ماہ درکار ہوتے ہیں۔"
      }
    ]
  },
  {
    id: "family",
    title: "Family Law & Private Clients",
    titleUr: "خاندانی قانون و ذاتی اراضی",
    shortDesc: "Custody disputes, dissolution of marriage, inheritance settlement, and estate planning.",
    shortDescUr: "حضانت، تنسیخِ نکاح، وراثت کی تقسیم اور خاندانی جائیداد کی منتقلی۔",
    fullDesc: "Providing discreet, compassionate, and uncompromising legal representation in Family Courts for high-net-worth individuals, overseas Pakistanis, and international custody/inheritance cases.",
    iconName: "Users",
    keyServices: [
      "Child Custody & Guardianship Petitions",
      "Khula & Judicial Dissolution of Marriage",
      "Succession Certificates & Probate Administration",
      "Overseas Pakistani Family & Property Disputes",
      "High-Net-Worth Estate Distribution Trusts"
    ],
    faqs: [
      {
        question: "Can Overseas Pakistanis initiate family litigation remotely?",
        questionUr: "کیا بیرون ملک مقیم پاکستانی بغیر پاکستان آئے کارروائی کر سکتے ہیں؟",
        answer: "Yes, via a duly notarized and embassy-attested Special Power of Attorney (SPA), our firm represents clients without requiring their constant physical presence.",
        answerUr: "جی ہاں، سفارتخانے سے تصدیق شدہ پاور آف اٹارنی کے ذریعے ہم اپ کے بغیر ائے تمام قانونی کارروائی مکمل کر سکتے ہیں۔"
      }
    ]
  },
  {
    id: "realestate",
    title: "Real Estate & Property Law",
    titleUr: "رئیل اسٹیٹ و جائیداد",
    shortDesc: "Title verification, commercial leasing, land acquisition, and partition suits.",
    shortDescUr: "جائیداد کی تصدیق، تجارتی لیز، اراضی کا حصول اور تقسیم کے مقدمات۔",
    fullDesc: "Navigating complex land revenue records, CDA/RDA development approvals, title deeds diligence, and partition claims for real estate developers and institutional property owners.",
    iconName: "Landmark",
    keyServices: [
      "Property Title & Revenue Record Diligence",
      "Commercial Lease Agreements & Joint Ventures",
      "Land Acquisition & High Court Partition Suits",
      "Builder & Society Dispute Settlement",
      "Overseas Land Encroachment Recovery"
    ],
    faqs: [
      {
        question: "Why is title diligence critical before purchasing land?",
        questionUr: "جائیداد خریدنے سے پہلے دستاویزات کی جانچ کیوں ضروری ہے؟",
        answer: "To verify clear revenue ownership, check for undisclosed bank mortgages, avoid stays, and confirm development authority clearance.",
        answerUr: "تاکہ کسی بھی خفیہ بینکاری رہن، عدالتی اسٹے آرڈر يا جعلی منتقلی سے محفوظ رہا جا سکے۔"
      }
    ]
  },
  {
    id: "tax",
    title: "Taxation & Customs Law",
    titleUr: "ٹیکس و کسٹمز قانون",
    shortDesc: "FBR tax appeals, sales tax litigation, international transfer pricing, and customs duty disputes.",
    shortDescUr: "ایف بی آر ٹیکس اپیلیں، سیلز ٹیکس اور کسٹمز ڈیوٹی کے تنازعات۔",
    fullDesc: "Representing corporates and individuals before Appellate Tribunals and High Courts against FBR tax audits, arbitrary assessments, customs seizures, and international tax compliance.",
    iconName: "Receipt",
    keyServices: [
      "Income Tax & Sales Tax High Court Appeals",
      "FBR Audit Defense & Notice Responses",
      "Customs Classification & Duty Disputes",
      "International Tax Advisory & Transfer Pricing",
      "Tax Exemption & Incentive Structuring"
    ],
    faqs: [
      {
        question: "What is the timeline for challenging an FBR assessment notice?",
        questionUr: "ایف بی آر کے نوٹس کو چیلنج کرنے کی ميعاد کیا ہے؟",
        answer: "An appeal must generally be lodged with the Commissioner Inland Revenue (Appeals) within 30 days of receiving the assessment order.",
        answerUr: "آرڈر ملنے کے 30 دنوں کے اندر اندر کمشنر اپیلز کو درخواست دینا لازمی ہے۔"
      }
    ]
  }
];

export const ATTORNEYS: Attorney[] = [
  {
    id: "tariq-fortis",
    name: "Barrister Tariq Mahmood Fortis",
    nameUr: "بیرسٹر طارق محمود فورٹس",
    title: "Senior Partner & Founder",
    titleUr: "سینئر پارٹنر اور بانی",
    licenseNumber: "PBC-Senior-04812",
    email: "tariq@fortislaw.com",
    phone: "+92 308 0291021",
    specialization: "Constitutional Law, White-Collar Defense & Corporate M&A",
    education: [
      "LL.M. (Master of Laws) - Harvard Law School, USA",
      "LL.B. (Hons) - University of Oxford, UK",
      "Bar-at-Law - Honourable Society of Lincoln's Inn, London"
    ],
    barAdmissions: [
      "Senior Advocate Supreme Court of Pakistan",
      "Bar of England and Wales (Lincoln's Inn)",
      "High Court Bar Association Islamabad"
    ],
    notableCases: [
      "Lead Counsel in landmark $180M international energy arbitration before LCIA London.",
      "Successfully quashed illegal FBR tax assessment against a national telecom enterprise.",
      "Represented sovereign financial institutions in High Court writ proceedings."
    ],
    bio: "Barrister Tariq Fortis possesses over 28 years of distinguished legal experience in constitutional writ petitions, complex commercial litigations, and white-collar defense. He has served as counsel in over 400 Supreme Court proceedings.",
    bioUr: "بیرسٹر طارق فورٹس 28 سال سے زائد کا وسیع قانونی تجربہ رکھتے ہیں۔ آپ نے سپریم کورٹ آف پاکستان کے 400 سے زائد اہم مقدمات کی وکالت کی ہے۔",
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600",
    isPartner: true
  },
  {
    id: "ayesha-khan",
    name: "Ayesha Rahman Khan, Advocate",
    nameUr: "عائشہ رحمان خان، ایڈووکیٹ",
    title: "Partner - Corporate & Banking",
    titleUr: "پارٹنر - کارپوریٹ و بینکاری",
    licenseNumber: "LHC-Advocate-10924",
    email: "ayesha@fortislaw.com",
    phone: "+92 308 0291021",
    specialization: "Banking Finance, Islamic Sukuk & Project Financing",
    education: [
      "LL.M. in International Finance - London School of Economics (LSE)",
      "LL.B. (Hons) - Lahore University of Management Sciences (LUMS)"
    ],
    barAdmissions: [
      "Advocate High Court of Sindh & Punjab",
      "Member International Bar Association (IBA)"
    ],
    notableCases: [
      "Structured PKR 45 Billion syndicated Sukuk financing for major infrastructure project.",
      "Advised international consortium on acquisition of regional pharmaceutical brand."
    ],
    bio: "Ayesha Rahman Khan leads the firm's Corporate Finance group, specializing in cross-border acquisitions, regulatory banking compliance, and green energy project loans.",
    bioUr: "عائشہ رحمان خان کارپوریٹ فنانس اور بینکاری گروپ کی سربراہی کرتی ہیں اور بین الاقوامی بینکنگ قوانین میں مہارت رکھتی ہیں۔",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    isPartner: true
  },
  {
    id: "zain-al-hassan",
    name: "Zain-Ul-Hassan, Advocate Supreme Court",
    nameUr: "زین الحسن، ایڈووکیٹ سپریم کورٹ",
    title: "Partner - Criminal Defense & Litigation",
    titleUr: "پارٹنر - فوجداری دفاع و مقدمہ بازی",
    licenseNumber: "KHC-Advocate-38190",
    email: "zain@fortislaw.com",
    phone: "+92 308 0291021",
    specialization: "NAB Investigations, FIA PECA & White Collar Trial Defense",
    education: [
      "LL.M. in Criminal Justice - UCL London",
      "LL.B. - University of the Punjab"
    ],
    barAdmissions: [
      "Advocate Supreme Court of Pakistan",
      "Lahore High Court Bar Association"
    ],
    notableCases: [
      "Secured pre-arrest protective bail in a high-profile multi-billion rupee FIA inquiry.",
      "Acquitted corporate board directors in NAB accountability trial."
    ],
    bio: "Zain-Ul-Hassan is renowned for his trial strategy in complex white-collar crimes, financial corruption investigations, and criminal appellate litigation.",
    bioUr: "زین الحسن وائٹ کالر جرائم، نیب انکوائریوں اور پیچیدہ فوجداری مقدمات کے بہترین وکیل مانے جاتے ہیں۔",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    isPartner: true
  },
  {
    id: "fatima-zahra",
    name: "Fatima Zahra Chaudhry, Barrister",
    nameUr: "فاطمہ زہرہ چوہدری، بیرسٹر",
    title: "Senior Associate - Family & IP Law",
    titleUr: "سینئر ایسوسی ایٹ - خاندانی و دانشمندانہ ملکیت",
    licenseNumber: "IHC-Advocate-55201",
    email: "fatima@fortislaw.com",
    phone: "+92 308 0291021",
    specialization: "Private Clients, Overseas Custody & IP Enforcement",
    education: [
      "LL.B. (Hons) - King's College London",
      "Bar-at-Law - Gray's Inn, London"
    ],
    barAdmissions: [
      "Advocate High Court Islamabad",
      "Honourable Society of Gray's Inn"
    ],
    notableCases: [
      "Resolved cross-border child custody dispute involving Hague convention jurisdiction.",
      "Obtained High Court injunction against trademark infringement for global fashion label."
    ],
    bio: "Barrister Fatima specializes in sensitive family law disputes for high-net-worth families, international estate administration, and brand trademark protection.",
    bioUr: "بیرسٹر فاطمہ اوورسیز پاکستانیوں کے خاندانی حقوق، حضانت، اور ٹریڈ مارک کے تحفظ میں مہارت رکھتی ہیں۔",
    imageUrl: "https://images.unsplash.com/photo-1580894732413-a723597732d3?auto=format&fit=crop&q=80&w=600",
    isPartner: false
  }
];

export const CASE_RESULTS: CaseResult[] = [
  {
    id: "case-01",
    title: "Landmark $180M Sovereign Energy Arbitration",
    titleUr: "180 ملین ڈالر کا بین الاقوامی توانائی کا معاہداتی تنازعہ",
    practiceAreaId: "corporate",
    practiceAreaName: "Corporate & M&A",
    clientType: "International Energy Consortium",
    outcome: "Full Award Granted with Complete Costs",
    year: "2025",
    summary: "Secured a complete arbitral victory in London LCIA proceedings regarding power purchase agreements and sovereign guarantees.",
    summaryUr: "لندن آربٹریشن ٹربیونل میں 180 ملین ڈالر کی رقم کا تاریخی فیصلہ موکل کے حق میں حاصل کیا۔"
  },
  {
    id: "case-02",
    title: "High Court Quashment of FBR PKR 3.8 Billion Assessment",
    titleUr: "ایف بی آر کے 3.8 ارب روپے کے غیر قانونی نوٹس کی منسوخی",
    practiceAreaId: "tax",
    practiceAreaName: "Taxation & Customs Law",
    clientType: "Multinational Telecom Provider",
    outcome: "FBR Demand Notice Struck Down",
    year: "2024",
    summary: "Successfully argued before the High Court that FBR's retroactive tax demand violated statutory limitations and double taxation agreements.",
    summaryUr: "ہائی کورٹ میں ثابت کیا کہ ایف بی آر کی ٹیکس مانگ غیر قانونی اور دوہرے ٹیکس کے معاہدے کے منافی ہے۔"
  },
  {
    id: "case-03",
    title: "Pre-Arrest Supreme Court Protective Bail in NAB Inquiry",
    titleUr: "نیب تحقیقات میں سپریم کورٹ سے قبل از گرفتاری ضمانت",
    practiceAreaId: "criminal",
    practiceAreaName: "White-Collar & Criminal Defense",
    clientType: "Former Federal Minister & Corporate Chair",
    outcome: "Protective Bail Granted with Full Rights Protected",
    year: "2025",
    summary: "Demonstrated lack of prima facie evidence in a multi-billion infrastructure procurement investigation before the apex court.",
    summaryUr: "عدالتِ عظمیٰ کے سامنے نیب کی جانب سے لگائے گئے الزامات کی بے بنیاد نوعیت ثابت کی۔"
  },
  {
    id: "case-04",
    title: "Cross-Border Child Custody Repatriation Order",
    titleUr: "بین الاقوامی حد بندی میں بچے کی حضانت کا فیصلہ",
    practiceAreaId: "family",
    practiceAreaName: "Family Law & Private Clients",
    clientType: "Overseas Pakistani Client (UK Based)",
    outcome: "Custody Repatriation & Supervised Access Granted",
    year: "2024",
    summary: "Navigated international private law principles to enforce custody orders and protect minor child's welfare across jurisdictions.",
    summaryUr: "لندن میں مقیم پاکستانی موکل کے لیے بچے کی قانونی حضانت اور حقوقِ مائلہ محفوظ کروائے۔"
  },
  {
    id: "case-05",
    title: "PKR 45 Billion Syndicated Sukuk Regulatory Clearance",
    titleUr: "45 ارب روپے کی صکوک سندات کی قانونی منظوری",
    practiceAreaId: "banking",
    practiceAreaName: "Banking & Finance Law",
    clientType: "Consortium of 6 Commercial Banks",
    outcome: "Flawless Execution & SBP Approval",
    year: "2024",
    summary: "Drafted project debt documents and secured regulatory approvals for a mega highway infrastructure expansion.",
    summaryUr: "چھ بڑے کمرشل بینکوں کے اتحاد کے لیے اسلامی فنانسنگ کا بلاحسب دستاویز تیار کیا۔"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-01",
    clientName: "Shahid Ali Khan",
    clientTitle: "CEO, Apex Global Holdings",
    practiceAreaId: "corporate",
    practiceAreaName: "Corporate & M&A",
    rating: 5,
    comment: "Fortis Law Associates provided masterclass strategy during our international corporate acquisition. Barrister Tariq Fortis and his team operate with unparalleled precision.",
    commentUr: "فورٹس لا ایسوسی ایٹس نے ہمارے بین الاقوامی بزنس ڈیل میں بہترین وکالت کی۔ ان کا طرزِ عمل انتہائی پیشہ ورانہ ہے۔",
    date: "May 2025",
    isVerified: true
  },
  {
    id: "test-02",
    clientName: "Dr. Farzana Siddiqui",
    clientTitle: "Overseas Client (London)",
    practiceAreaId: "family",
    practiceAreaName: "Family Law & Private Clients",
    rating: 5,
    comment: "As an Overseas Pakistani, managing property and family settlements in Islamabad felt daunting. Fortis handled everything with complete confidentiality and integrity.",
    commentUr: "بیرونِ ملک مقیم ہونے کی وجہ سے اسلام آباد میں اراضی کا تنازعہ دشوار تھا۔ فورٹس نے بااعتماد انداز میں تمام معاملے کو سلجھایا۔",
    date: "January 2025",
    isVerified: true
  },
  {
    id: "test-03",
    clientName: "Kamran Merchant",
    clientTitle: "CFO, Horizon Logistics",
    practiceAreaId: "tax",
    practiceAreaName: "Taxation & Customs Law",
    rating: 5,
    comment: "When FBR issued an aggressive PKR 500M assessment, Fortis secured immediate High Court stay order and ultimately had the assessment quashed.",
    commentUr: "ایف بی آر کے بھاری نوٹس پر فورٹس نے فوری اسٹے حاصل کیا اور کیس فتح کروایا۔",
    date: "March 2025",
    isVerified: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-01",
    title: "Navigating Overseas Property Disputes in Pakistan: A Definitive Legal Blueprint",
    titleUr: "پاکستان میں اوورسیز پاکستانیوں کی جائیداد کے تنازعات کا حتمی قانونی حل",
    category: "Property & Real Estate",
    author: "Barrister Fatima Zahra",
    date: "June 14, 2025",
    readTime: "6 min read",
    summary: "Key statutory safeguards, Special Power of Attorney attestation, and fast-track Overseas Courts procedures.",
    content: "Overseas Pakistanis frequently encounter unlawful land grabbing and fraudulent transfers. Under recent statutory enactments and Special Overseas Courts procedures, non-resident citizens can seek fast-track injunctions and remote testimony options.",
    hasLeadMagnet: true,
    leadMagnetTitle: "Property Dispute Protection Checklist for Overseas Pakistanis (PDF)"
  },
  {
    id: "blog-02",
    title: "Understanding SECP Corporate Governance Amendments for 2025",
    titleUr: "کمپنیز یکٹ کے تحت ایس ای سی پی کارپوریٹ گورننس کی نئی ترميمات",
    category: "Corporate & Compliance",
    author: "Ayesha Rahman Khan, Advocate",
    date: "May 28, 2025",
    readTime: "8 min read",
    summary: "Critical compliance updates for ultimate beneficial ownership (UBO) filings and ESG disclosure requirements.",
    content: "The Securities and Exchange Commission of Pakistan has introduced stringent UBO reporting mandates aimed at AML compliance. Corporate boards must ensure accurate filings to avoid heavy penalty proceedings.",
    hasLeadMagnet: true,
    leadMagnetTitle: "Corporate Restructuring & Compliance Guide 2025 (PDF)"
  },
  {
    id: "blog-03",
    title: "Rights of the Custodial Parent in High Court Guardianship Proceedings",
    titleUr: "گارڈین کورٹ میں سرپرستی کے مقدمات اور بچے کے بنیادی حقوق",
    category: "Family Law",
    author: "Barrister Fatima Zahra",
    date: "April 19, 2025",
    readTime: "5 min read",
    summary: "Analyzing paramount welfare of the minor principles applied by the Supreme Court of Pakistan.",
    content: "In custody disputes, the welfare of the child remains the supreme consideration. Courts evaluate educational stability, moral atmosphere, and financial ability when granting guardianship.",
    hasLeadMagnet: true,
    leadMagnetTitle: "Family Law & Child Custody Rights Manual (PDF)"
  }
];

export const CAREER_POSITIONS: CareerPosition[] = [
  {
    id: "pos-01",
    title: "Senior Associate - Corporate & Commercial Litigation",
    location: "Islamabad Head Office",
    type: "Full-Time",
    department: "Litigation & Dispute Resolution",
    experienceRequired: "5 - 8 Years Post-Qualification Experience (PQE)",
    description: "Seeking a highly articulate Senior Associate with extensive High Court drafting experience, strong commercial acumen, and proven advocacy skills.",
    requirements: [
      "LL.B. (Hons) or Bar-at-Law from a top-tier UK/US or recognized institution.",
      "High Court Bar License with proven independent oral argument experience.",
      "Demonstrated ability to draft complex Writ Petitions, Arbitration Statements, and Commercial Pleadings."
    ]
  },
  {
    id: "pos-02",
    title: "Junior Research Associate - Constitutional & Regulatory Law",
    location: "Lahore Office",
    type: "Full-Time",
    department: "Research & Appeals",
    experienceRequired: "1 - 3 Years PQE",
    description: "Assist senior partners with landmark Supreme Court appeals, legislative drafting, and statutory research.",
    requirements: [
      "Exceptional legal research skills using Westlaw, LexisNexis, and Pakistan Law Decisions (PLD).",
      "Strong legal writing and case summary synthesis."
    ]
  }
];

export const LEAD_MAGNETS = [
  {
    id: "lm-property",
    title: "Property Dispute Protection Checklist for Overseas Pakistanis",
    description: "Comprehensive step-by-step PDF guide covering revenue title checks, Embassy power of attorney attestation, and land defense procedures.",
    filename: "Fortis_Property_Dispute_Checklist.pdf"
  },
  {
    id: "lm-corporate",
    title: "Corporate Restructuring & SECP Compliance Guide 2025",
    description: "A practical guide for directors, company secretaries, and investors navigating Pakistani corporate regulations.",
    filename: "Fortis_Corporate_Compliance_2025.pdf"
  },
  {
    id: "lm-family",
    title: "Family Law & Overseas Child Custody Manual",
    description: "Essential legal rights overview for guardianship, succession certificates, and overseas marital settlement procedures.",
    filename: "Fortis_Family_Law_Manual.pdf"
  }
];
