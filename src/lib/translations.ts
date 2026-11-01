/**
 * Comprehensive Multi-Lingual Translation Dictionary for Healthremade.
 * Covers full website localization across English, Bengali, Arabic, Russian, French, and Swahili.
 */

export type SupportedLocale = 'en' | 'bn' | 'ar' | 'ru' | 'fr' | 'sw' | 'uz' | 'ro' | 'pt' | 'es' | 'de' | 'tr';

export interface TranslationDictionary {
  nav: {
    home: string;
    treatments: string;
    hospitals: string;
    doctors: string;
    pricing: string;
    testimonials: string;
    blog: string;
    getQuote: string;
    emergencyHotline: string;
    subHeaderBanner: string;
    medicalCareIndia: string;
    allTreatments: string;
  };
  hero: {
    trustBadge: string;
    titlePart1: string;
    titlePart2: string;
    subtitle: string;
    searchPrompt: string;
    searchPlaceholder: string;
    searchAction: string;
    ctaQuote: string;
    ctaPricing: string;
    quickSearchLabel: string;
    bypassSurgery: string;
    kneeReplacement: string;
    liverTransplant: string;
    ivf: string;
    dentalImplants: string;
  };
  features: {
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
    feat4Title: string;
    feat4Desc: string;
  };
  quoteForm: {
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    country: string;
    phone: string;
    notes: string;
    notesPlaceholder: string;
    attachReports: string;
    attachPlaceholder: string;
    submitButton: string;
    submitting: string;
    privacyBadge: string;
    disclaimer: string;
  };
  trustMetrics: {
    bedsLabel: string;
    bedsSub: string;
    turnaroundLabel: string;
    turnaroundSub: string;
    savingsLabel: string;
    savingsSub: string;
    markupLabel: string;
    markupSub: string;
  };
  footer: {
    medicalHubs: string;
    patientTrust: string;
    travelSupport: string;
    disclaimerTitle: string;
    disclaimerText: string;
    allRightsReserved: string;
    accreditationVerified: string;
    costGuidesBannerTitle: string;
    costGuidesBannerSub: string;
    exploreCostGuides: string;
  };
  specialties: {
    cardiology: string;
    orthopaedics: string;
    oncology: string;
    transplant: string;
    neurology: string;
    fertility: string;
  };
}

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
  // ─── 1. ENGLISH ───────────────────────────────────────────
  en: {
    nav: {
      home: 'Home',
      treatments: 'Treatments',
      hospitals: 'Hospitals',
      doctors: 'Top Doctors',
      pricing: 'Pricing Explorer',
      testimonials: 'Testimonials',
      blog: 'Cost Guides & Blog',
      getQuote: 'Get Free Quote',
      emergencyHotline: 'International Patient Desk: 24/7 Response',
      subHeaderBanner: 'Free Hospital Package Quotes & Doctor Opinions in 24 Hours',
      medicalCareIndia: 'Medical Care India',
      allTreatments: 'View All Treatments →',
    },
    hero: {
      trustBadge: '⭐ Rated #1 Medical Travel Platform for India 2026',
      titlePart1: 'Get your health remade',
      titlePart2: 'in India',
      subtitle: '100% Transparent Package Pricing & JCI-Accredited Hospitals in Delhi NCR',
      searchPrompt: "I'm looking for...",
      searchPlaceholder: 'Search by treatment, doctor, hospital, or city...',
      searchAction: 'Search',
      ctaQuote: 'Get Free 3-Hospital Quote',
      ctaPricing: 'Explore Transparent Pricing',
      quickSearchLabel: 'Popular Searches:',
      bypassSurgery: 'Bypass Surgery',
      kneeReplacement: 'Knee Replacement',
      liverTransplant: 'Liver Transplant',
      ivf: 'IVF Treatment',
      dentalImplants: 'Dental Implants',
    },
    features: {
      feat1Title: 'Free Opinions from Top Doctors',
      feat1Desc: 'We share your medical reports with department chairmen and senior surgeons across 3+ hospitals to get treatment recommendations and estimates.',
      feat2Title: 'Itemized Transparent Package Quotes',
      feat2Desc: 'No hidden hospital fees or surprise surcharges. We provide clear, line-item pricing so you understand the exact inclusions before travelling.',
      feat3Title: 'Dedicated Multi-Lingual Care Manager',
      feat3Desc: 'A personal coordinator handles fast medical visa invitation letters, airport transfer logistics, and in-hospital scheduling.',
      feat4Title: 'Direct Hospital Billing Guarantee',
      feat4Desc: 'You pay the hospital directly upon admission. Healthremade charges zero patient fee and adds zero hidden commissions.',
    },
    quoteForm: {
      title: 'Get 3 Free Hospital Quotes & Treatment Plans',
      subtitle: 'Compare personalized clinical opinions, surgeon profiles, and package pricing from top accredited Indian hospitals within 24 hours.',
      fullName: 'Patient Full Name *',
      fullNamePlaceholder: 'e.g. John Doe',
      country: 'Country *',
      phone: 'WhatsApp / Phone Number *',
      notes: 'Current Symptoms / Brief Medical Summary',
      notesPlaceholder: 'Brief note on diagnosis, reports available, or preferred hospital...',
      attachReports: 'Attach Medical Reports / Prescriptions (Optional)',
      attachPlaceholder: 'Upload Scan / PDF / Image (Max 10MB)',
      submitButton: 'Get Free Quotes from 3+ Hospitals',
      submitting: 'Processing...',
      privacyBadge: '100% Free & Confidential. Quotes issued directly by partner hospitals.',
      disclaimer: 'Healthremade is a medical travel facilitator, not a healthcare provider. No direct medical advice is given.',
    },
    trustMetrics: {
      bedsLabel: 'Accredited Hospital Beds',
      bedsSub: 'JCI & NABH Certified',
      turnaroundLabel: 'Doctor Opinion Turnaround',
      turnaroundSub: 'From Senior Chairmen',
      savingsLabel: 'Average Treatment Savings',
      savingsSub: 'Vs. US & UK Pricing',
      markupLabel: 'Hidden Service Markups',
      markupSub: 'Direct Hospital Invoicing',
    },
    footer: {
      medicalHubs: 'Medical Hubs',
      patientTrust: 'Patient Trust',
      travelSupport: 'Travel & Support',
      disclaimerTitle: 'Important Medical Travel & Facilitation Disclaimer:',
      disclaimerText: 'Healthremade is an independent medical travel facilitator and discovery platform, not a hospital, clinic, or licensed healthcare provider. Treatment opinions, clinical decisions, and customized cost estimates are issued directly by verified, accredited partner hospitals and attending physicians. Healthremade does not practice medicine, provide medical diagnosis, or endorse specific clinical procedures. All travel and medical decisions should be evaluated in consultation with your primary healthcare physician.',
      allRightsReserved: 'Healthremade. All rights reserved.',
      accreditationVerified: 'Hospital accreditation verified via:',
      costGuidesBannerTitle: 'Detailed Medical Cost Guides & Procedure Walkthroughs',
      costGuidesBannerSub: 'Compare USA/UK vs India pricing for Dental Implants, Bypass Surgery, Knee Replacements, Liver Transplants, and IVF.',
      exploreCostGuides: 'Explore All Cost Guides →',
    },
    specialties: {
      cardiology: 'Cardiac Surgery (CABG / Bypass)',
      orthopaedics: 'Orthopaedics & Joint Replacement',
      oncology: 'Oncology & Cancer Treatment',
      transplant: 'Organ Transplantation',
      neurology: 'Neurology & Spine Surgery',
      fertility: 'IVF & Reproductive Medicine',
    },
  },

  // ─── 2. BENGALI (বাংলা) ──────────────────────────────────
  bn: {
    nav: {
      home: 'হোম',
      treatments: 'চিকিৎসা ও সার্জারি',
      hospitals: 'শীর্ষ হাসপাতাল',
      doctors: 'বিশেষজ্ঞ ডাক্তারগণ',
      pricing: 'চিকিৎসার খরচ',
      testimonials: 'রোগীদের অভিজ্ঞতা',
      blog: 'খরচের তালিকা ও গাইড',
      getQuote: 'বিনামূল্যে কোট নিন',
      emergencyHotline: 'আন্তর্জাতিক পেশেন্ট ডেস্ক: ২৪/৭ সরাসরি সেবা',
      subHeaderBanner: '২৪ ঘণ্টার মধ্যে ৩+ শীর্ষ হাসপাতালের প্যাকেজ খরচ ও ডাক্তারের মতামত',
      medicalCareIndia: 'মেডিকেল কেয়ার ইন্ডিয়া',
      allTreatments: 'সকল চিকিৎসা দেখুন →',
    },
    hero: {
      trustBadge: '⭐ ভারতে আন্তর্জাতিক চিকিৎসার জন্য #১ বিশ্বস্ত প্ল্যাটফর্ম ২০২৬',
      titlePart1: 'ভারতে আপনার সুস্বাস্থ্য',
      titlePart2: 'ফিরিয়ে আনুন',
      subtitle: 'দিল্লি এনসিআর-এর জেসিআই ও এনএবিএইচ স্বীকৃত শীর্ষ হাসপাতালে ১০০% স্বচ্ছ চিকিৎসা প্যাকেজ',
      searchPrompt: 'আমি খুঁজছি...',
      searchPlaceholder: 'চিকিৎসা, বিশেষজ্ঞ ডাক্তার, হাসপাতাল বা শহর দিয়ে খুঁজুন...',
      searchAction: 'অনুসন্ধান',
      ctaQuote: 'বিনামূল্যে ৩টি হাসপাতালের কোট নিন',
      ctaPricing: 'স্বচ্ছ প্যাকেজ খরচ দেখুন',
      quickSearchLabel: 'জনপ্রিয় অনুসন্ধান:',
      bypassSurgery: 'বাইপাস সার্জারি',
      kneeReplacement: 'হাঁটু প্রতিস্থাপন (Knee Replacement)',
      liverTransplant: 'লিভার প্রতিস্থাপন',
      ivf: 'আইভিএফ (IVF) বন্ধ্যাত্ব চিকিৎসা',
      dentalImplants: 'ডেন্টাল ইমপ্লান্ট',
    },
    features: {
      feat1Title: 'শীর্ষ ডাক্তারদের বিনামূল্যে মতামত',
      feat1Desc: 'আমরা আপনার মেডিকেল রিপোর্ট ৩+ শীর্ষ হাসপাতালের বিভাগীয় প্রধান ও সিনিয়র সার্জনদের কাছে পৌঁছে দিয়ে নিখরচায় চিকিৎসা পরামর্শ ও খরচের হিসাব এনে দিই।',
      feat2Title: 'স্বচ্ছ ও স্পষ্ট প্যাকেজ খরচ',
      feat2Desc: 'কোনো গোপন বা অপ্রত্যাশিত চার্জ নেই। ভ্রমণের আগেই আপনি চিকিৎসার প্রতিটি অন্তর্ভুক্তির স্পষ্ট হিসাব দেখতে পাবেন।',
      feat3Title: 'বাংলাভাষী ব্যক্তিগত কেয়ার ম্যানেজার',
      feat3Desc: 'আপনার ভিসা আমন্ত্রণপত্র (MED Visa), এয়ারপোর্ট থেকে পিকআপ এবং হাসপাতালে যাবতীয় ব্যবস্থা করার জন্য সার্বক্ষণিক ব্যক্তিগত সমন্বয়কারী।',
      feat4Title: 'হাসপাতালে সরাসরি বিল পরিশোধের নিশ্চয়তা',
      feat4Desc: 'ভর্তির সময় সম্পূর্ণ বিল সরাসরি হাসপাতালকে প্রদান করবেন। Healthremade রোগীদের কাছ থেকে কোনো কমিশন বা অতিরিক্ত ফি গ্রহণ করে না।',
    },
    quoteForm: {
      title: 'বিনামূল্যে ৩টি হাসপাতালের মতামত ও খরচের হিসাব নিন',
      subtitle: '২৪ ঘণ্টার মধ্যে ভারতের শীর্ষ স্বীকৃত হাসপাতাল থেকে বিশেষজ্ঞ চিকিৎসকের মতামত, সার্জনের তথ্য এবং সম্পূর্ণ প্যাকেজ খরচের তালিকা পান।',
      fullName: 'রোগীর সম্পূর্ণ নাম *',
      fullNamePlaceholder: 'যেমন: মোহাম্মদ করিম',
      country: 'দেশ *',
      phone: 'হোয়াটসঅ্যাপ / ফোন নম্বর *',
      notes: 'বর্তমান শারীরিক সমস্যা / পূর্বের রোগ নির্ণয়',
      notesPlaceholder: 'রোগের লক্ষণ, টেস্টের রিপোর্ট বা পছন্দের কোনো হাসপাতাল থাকলে লিখুন...',
      attachReports: 'মেডিকেল রিপোর্ট / প্রেসক্রিপশন আপলোড করুন (ঐচ্ছিক)',
      attachPlaceholder: 'রিপোর্ট স্ক্যান / PDF / ছবি আপলোড করুন (সর্বোচ্চ ১০MB)',
      submitButton: '৩+ হাসপাতাল থেকে বিনামূল্যে কোট পান',
      submitting: 'প্রক্রিয়াকরণ চলছে...',
      privacyBadge: '১০০% গোপনীয় ও বিনামূল্যে। হাসপাতালের নিজস্ব টিম সরাসরি কোট প্রদান করে।',
      disclaimer: 'Healthremade একটি আন্তর্জাতিক মেডিকেল ট্রাভেল ফ্যাসিলিটেটর, চিকিৎসা প্রতিষ্ঠান নয়। কোনো প্রত্যক্ষ ক্লিনিক্যাল চিকিৎসা প্রদান করা হয় না।',
    },
    trustMetrics: {
      bedsLabel: 'স্বীকৃত হাসপাতালের শয্যা',
      bedsSub: 'JCI এবং NABH সার্টিফাইড',
      turnaroundLabel: 'ডাক্তারের মতামত সময়সীমা',
      turnaroundSub: 'সিনিয়র চেয়ারম্যানদের থেকে',
      savingsLabel: 'গড় চিকিৎসা ব্যয় সাশ্রয়',
      savingsSub: 'ইউএস ও ইউকের খরচের তুলনায়',
      markupLabel: 'গোপন সার্ভিস চার্জ',
      markupSub: 'হাসপাতালে সরাসরি ইনভয়েস',
    },
    footer: {
      medicalHubs: 'মেডিকেল হাব',
      patientTrust: 'রোগীদের আস্থা',
      travelSupport: 'ভ্রমণ ও ভিসা সহায়তা',
      disclaimerTitle: 'মেডিকেল ট্রাভেল এবং ফ্যাসিলিটেশন বিষয়ক আইনি ঘোষণা:',
      disclaimerText: 'Healthremade একটি স্বাধীন মেডিকেল ট্রাভেল ফ্যাসিলিটেটর প্ল্যাটফর্ম, কোনো হাসপাতাল বা লাইসেন্সপ্রাপ্ত ক্লিনিক নয়। চিকিৎসার সিদ্ধান্ত ও আনুমানিক খরচ সরাসরি স্বীকৃত হাসপাতাল ও অভিজ্ঞ চিকিৎসকদের দ্বারা নির্ধারিত হয়। Healthremade সরাসরি চিকিৎসা প্রদান করে না। চিকিৎসার যে কোনো গুরুত্বপূর্ণ সিদ্ধান্ত সর্বদা বিশেষজ্ঞ চিকিৎসকের সাথে আলোচনা করে নেওয়া উচিত।',
      allRightsReserved: 'Healthremade. সর্বস্বত্ব সংরক্ষিত।',
      accreditationVerified: 'হাসপাতালের আন্তর্জাতিক স্বীকৃতি যাচাইকৃত:',
      costGuidesBannerTitle: 'চিকিৎসার বিস্তারিত খরচ নির্দেশিকা ও প্যাকেজ তুলনা',
      costGuidesBannerSub: 'বাইপাস সার্জারি, হাঁটু প্রতিস্থাপন, লিভার ট্রান্সপ্লান্ট, আইভিএফ এবং ডেন্টাল ইমপ্লান্টের তুলনামূলক খরচের তালিকা দেখুন।',
      exploreCostGuides: 'সমস্ত খরচের নির্দেশিকা দেখুন →',
    },
    specialties: {
      cardiology: 'কার্ডিয়াক সার্জারি (বাইপাস / সিএবিজি)',
      orthopaedics: 'অর্থোপেডিকস ও জয়েন্ট রিপ্লেসমেন্ট',
      oncology: 'ক্যান্সার ও অনকোলজি চিকিৎসা',
      transplant: 'অঙ্গ প্রতিস্থাপন (লিভার / কিডনি)',
      neurology: 'নিউরো ও স্পাইন সার্জারি',
      fertility: 'আইভিএফ ও ফার্টিলিটি চিকিৎসা',
    },
  },

  // ─── 3. ARABIC (العربية) ──────────────────────────────────
  ar: {
    nav: {
      home: 'الرئيسية',
      treatments: 'العلاجات والجراحة',
      hospitals: 'أفضل المستشفيات',
      doctors: 'كبار الأطباء',
      pricing: 'أسعار العلاج',
      testimonials: 'تجارب المرضى',
      blog: 'أدلة التكاليف والمدونة',
      getQuote: 'احصل على عرض سعر مجاني',
      emergencyHotline: 'مكتب المرضى الدوليين: استجابة على مدار الساعة',
      subHeaderBanner: 'عروض أسعار باقات المستشفيات ورأي الأطباء خلال 24 ساعة',
      medicalCareIndia: 'الرعاية الطبية في الهند',
      allTreatments: 'عرض جميع العلاجات ←',
    },
    hero: {
      trustBadge: '⭐ المنصة الطبية رقم 1 للسياحة العلاجية في الهند 2026',
      titlePart1: 'استعد صحتك وعافيتك',
      titlePart2: 'في الهند',
      subtitle: 'باقات علاجية شفافة بنسبة 100% في مستشفيات معتمدة دولياً (JCI) في دلهي والهند',
      searchPrompt: 'أبحث عن...',
      searchPlaceholder: 'ابحث بالاسم، التخصص، الطبيب، المستشفى أو المدينة...',
      searchAction: 'بحث',
      ctaQuote: 'احصل على 3 عروض أسعار مجانية',
      ctaPricing: 'استكشف الأسعار الشفافة',
      quickSearchLabel: 'الأكثر بحثاً:',
      bypassSurgery: 'جراحة القلب المفتوح',
      kneeReplacement: 'استبدال مفصل الركبة',
      liverTransplant: 'زراعة الكبد',
      ivf: 'أطفال الأنابيب والخصوبة',
      dentalImplants: 'زراعة الأسنان الفورية',
    },
    features: {
      feat1Title: 'آراء طبية مجانية من كبار الجراحين',
      feat1Desc: 'نشارك تقاريركم الطبية مع رؤساء الأقسام وكبار الاستشاريين في أكثر من 3 مستشفيات للحصول على خطة العلاج والتكلفة مجاناً.',
      feat2Title: 'باقات أسعار تفصيلية وواضحة',
      feat2Desc: 'بدون أي تكاليف خفية أو رسوم مفاجئة. نقدم تفاصيل بنود العلاج بالكامل قبل سفركم.',
      feat3Title: 'مدير رعاية مخصص يتحدث لغتكم',
      feat3Desc: 'منسق شخصي ينهي إجراءات التأشيرة الطبية السريعة (MED)، الاستقبال من المطار، والترجمة طوال فترة الإقامة.',
      feat4Title: 'ضمان الدفع المباشر للمستشفى',
      feat4Desc: 'تدفع فاتورتك للمستشفى مباشرة عند الدخول. Healthremade لا تفرض أي رسوم على المرضى.',
    },
    quoteForm: {
      title: 'احصل على 3 عروض أسعار وخطط علاجية مجانية',
      subtitle: 'قارن بين الآراء الطبية وخبرات الجراحين وباقات التكلفة من كبرى المستشفيات الهندية المعتمدة خلال 24 ساعة.',
      fullName: 'الاسم الكامل للمريض *',
      fullNamePlaceholder: 'مثال: أحمد عبد الله',
      country: 'الدولة *',
      phone: 'رقم الواتساب / الهاتف *',
      notes: 'الأعراض الحالية / ملخص الحالة الطبية',
      notesPlaceholder: 'اكتب نبذة عن التشخيص الحالي، التقارير المتوفرة، أو المستشفى المفضل...',
      attachReports: 'إرفاق التقارير الطبية / الفحوصات (اختياري)',
      attachPlaceholder: 'تحميل الأشعة / تقرير PDF / صورة (بحد أقصى 10 ميجابايت)',
      submitButton: 'طلب عروض أسعار مجانية من 3 مستشفيات',
      submitting: 'جاري الإرسال...',
      privacyBadge: 'خصوصية تامة 100% ومجانية. العروض تصدر مباشرة من المستشفيات.',
      disclaimer: 'Healthremade ميسر للسياحة العلاجية وليست منشأة طبية. لا تقدم استشارات تشخيصية مباشرة.',
    },
    trustMetrics: {
      bedsLabel: 'أسرّة مستشفيات معتمدة',
      bedsSub: 'معتمدة دولياً من JCI و NABH',
      turnaroundLabel: 'سرعة رد الأطباء',
      turnaroundSub: 'من رؤساء الأقسام الاستشاريين',
      savingsLabel: 'متوسط توفير التكلفة',
      savingsSub: 'مقارنة بأسعار أمريكا وأوروبا',
      markupLabel: 'رسوم خدمة خفية',
      markupSub: 'فواتير مباشرة من المستشفى',
    },
    footer: {
      medicalHubs: 'المراكز الطبية الكبرى',
      patientTrust: 'ثقة المرضى',
      travelSupport: 'السفر والتأشيرة',
      disclaimerTitle: 'إخلاء المسؤولية الطبية والقانونية:',
      disclaimerText: 'Healthremade هي منصة مستقلة لتيسير السياحة العلاجية وليست مستشفى أو عيادة مرخصة. تصدر القرارات السريرية وعروض الأسعار مباشرة من المستشفيات الشريكة والأطباء المعالجين.',
      allRightsReserved: 'Healthremade. جميع الحقوق محفوظة.',
      accreditationVerified: 'الاعتماد الدولي للمستشفيات معتمد عبر:',
      costGuidesBannerTitle: 'أدلة تكاليف العلاج ومقارنة أسعار العمليات الجراحية',
      costGuidesBannerSub: 'قارن أسعار جراحة القلب، زراعة الكبد، تغيير المفاصل، وأطفال الأنابيب في الهند.',
      exploreCostGuides: 'استكشاف جميع أدلة الأسعار ←',
    },
    specialties: {
      cardiology: 'جراحة القلب والشرايين',
      orthopaedics: 'جراحة العظام وتبديل المفاصل',
      oncology: 'علاج الأورام والسرطان',
      transplant: 'زراعة الأعضاء (الكبد والكلى)',
      neurology: 'جراحة المخ والأعصاب والعمود الفقري',
      fertility: 'علاج العقم وأطفال الأنابيب',
    },
  },

  // ─── 4. RUSSIAN (Русский) ─────────────────────────────────
  ru: {
    nav: {
      home: 'Главная',
      treatments: 'Лечение и операции',
      hospitals: 'Ведущие клиники',
      doctors: 'Лучшие врачи',
      pricing: 'Стоимость лечения',
      testimonials: 'Отзывы пациентов',
      blog: 'Цены и статьи',
      getQuote: 'Бесплатный расчет',
      emergencyHotline: 'Международный отдел: поддержка 24/7',
      subHeaderBanner: 'Пакеты лечения и второе мнение врачей за 24 часа',
      medicalCareIndia: 'Медицинский туризм в Индии',
      allTreatments: 'Все направления лечения →',
    },
    hero: {
      trustBadge: '⭐ Платформа №1 медицинского туризма в Индию 2026',
      titlePart1: 'Восстановите здоровье',
      titlePart2: 'в лучших клиниках Индии',
      subtitle: 'Прозрачные цены на пакеты лечения в клиниках с аккредитацией JCI и NABH в Дели',
      searchPrompt: 'Поиск лечения...',
      searchPlaceholder: 'Введите диагноз, врача, клинику или город...',
      searchAction: 'Найти',
      ctaQuote: 'Получить расчет из 3 клиник',
      ctaPricing: 'Сравнить стоимость лечения',
      quickSearchLabel: 'Популярное:',
      bypassSurgery: 'Аортокоронарное шунтирование',
      kneeReplacement: 'Замена коленного сустава',
      liverTransplant: 'Трансплантация печени',
      ivf: 'ЭКО и репродуктология',
      dentalImplants: 'Дентальная имплантация',
    },
    features: {
      feat1Title: 'Бесплатное второе мнение ведущих хирургов',
      feat1Desc: 'Мы передаем ваши снимки и выписки заведующим отделениями 3+ клиник для составления точной программы и сметы лечения.',
      feat2Title: 'Детализированные прозрачные сметы',
      feat2Desc: 'Никаких скрытых комиссий и непредвиденных счетов. Полная ясность всех включений до вылета.',
      feat3Title: 'Русскоязычный координатор и переводчик',
      feat3Desc: 'Помощь в оформлении медицинской визы (MED), встреча в аэропорту и сопровождение в клинике.',
      feat4Title: 'Оплата напрямую в кассу клиники',
      feat4Desc: 'Вы оплачиваете лечение в клинике при госпитализации. Healthremade не берет комиссий с пациентов.',
    },
    quoteForm: {
      title: 'Получите 3 сметы и рекомендации врачей бесплатно',
      subtitle: 'Сравните программы лечения, резюме хирургов и стоимость пакетов из лучших клиник Индии в течение 24 часов.',
      fullName: 'ФИО пациента *',
      fullNamePlaceholder: 'Например: Иванов Иван',
      country: 'Страна *',
      phone: 'WhatsApp / Телефон *',
      notes: 'Текущие симптомы и диагноз',
      notesPlaceholder: 'Кратко опишите жалобы, имеющиеся обследования или предпочтения по клинике...',
      attachReports: 'Прикрепить выписки и снимки (необязательно)',
      attachPlaceholder: 'Загрузить МРТ / КТ / PDF (макс. 10 МБ)',
      submitButton: 'Получить бесплатный расчет из 3 клиник',
      submitting: 'Отправка...',
      privacyBadge: '100% конфиденциально. Расчет составляется официальными клиниками.',
      disclaimer: 'Healthremade — сервис организации медицинского туризма, не оказывающий прямых медицинских услуг.',
    },
    trustMetrics: {
      bedsLabel: 'Коек в аккредитованных клиниках',
      bedsSub: 'Сертификация JCI и NABH',
      turnaroundLabel: 'Срок ответа консилиума',
      turnaroundSub: 'От ведущих профессоров',
      savingsLabel: 'Средняя экономия на лечении',
      savingsSub: 'По сравнению с ЕС и США',
      markupLabel: 'Скрытые наценки',
      markupSub: 'Прямой расчет с госпиталем',
    },
    footer: {
      medicalHubs: 'Медицинские центры',
      patientTrust: 'Доверие пациентов',
      travelSupport: 'Визы и перелет',
      disclaimerTitle: 'Юридическое и медицинское уведомление:',
      disclaimerText: 'Healthremade является независимым сервисом координации медицинского туризма. Все клинические заключения и программы лечения предоставляются аккредитованными клиниками-партнерами.',
      allRightsReserved: 'Healthremade. Все права защищены.',
      accreditationVerified: 'Аккредитация клиник проверена через:',
      costGuidesBannerTitle: 'Руководства по стоимости процедур и сравнение цен',
      costGuidesBannerSub: 'Сравните цены на шунтирование, протезирование суставов, трансплантацию и ЭКО в Индии.',
      exploreCostGuides: 'Смотреть все обзоры цен →',
    },
    specialties: {
      cardiology: 'Кардиохирургия и шунтирование',
      orthopaedics: 'Ортопедия и эндопротезирование',
      oncology: 'Онкология и химиотерапия',
      transplant: 'Трансплантация органов',
      neurology: 'Нейрохирургия и операции на позвоночнике',
      fertility: 'ЭКО и лечение бесплодия',
    },
  },

  // ─── 5. FRENCH (Français) ─────────────────────────────────
  fr: {
    nav: {
      home: 'Accueil',
      treatments: 'Traitements',
      hospitals: 'Hôpitaux',
      doctors: 'Chirurgiens réputés',
      pricing: 'Tarifs et forfaits',
      testimonials: 'Témoignages',
      blog: 'Guides de prix & Blog',
      getQuote: 'Devis gratuit',
      emergencyHotline: 'Bureau International des Patients : Assistance 24/7',
      subHeaderBanner: 'Devis hospitaliers et avis médical gratuit sous 24h',
      medicalCareIndia: 'Soins Médicaux en Inde',
      allTreatments: 'Voir tous les traitements →',
    },
    hero: {
      trustBadge: '⭐ Plateforme de tourisme médical N°1 en Inde 2026',
      titlePart1: 'Retrouvez votre santé',
      titlePart2: 'en Inde',
      subtitle: 'Tarifs transparents à 100% dans les meilleurs hôpitaux accrédités JCI à Delhi',
      searchPrompt: 'Je recherche...',
      searchPlaceholder: 'Rechercher par traitement, médecin, hôpital ou ville...',
      searchAction: 'Rechercher',
      ctaQuote: 'Devis gratuit de 3 hôpitaux',
      ctaPricing: 'Explorer les tarifs transparents',
      quickSearchLabel: 'Recherches populaires :',
      bypassSurgery: 'Pontage coronarien (CABG)',
      kneeReplacement: 'Prothèse totale de genou',
      liverTransplant: 'Greffe de foie',
      ivf: 'FIV & Fertilité',
      dentalImplants: 'Implants dentaires',
    },
    features: {
      feat1Title: 'Avis gratuits des meilleurs chirurgiens',
      feat1Desc: 'Nous transmettons vos rapports médicaux aux chefs de service de 3+ hôpitaux pour obtenir recommandations et devis.',
      feat2Title: 'Forfaits détaillés sans frais cachés',
      feat2Desc: 'Aucune mauvaise surprise. Vous connaissez exactement le coût et les inclusions avant votre voyage.',
      feat3Title: 'Coordinateur francophone dédié',
      feat3Desc: 'Assistance visa médical (MED), accueil à l’aéroport et accompagnement à l’hôpital.',
      feat4Title: 'Facturation directe à l’hôpital',
      feat4Desc: 'Paiement direct à la clinique lors de l’admission. Zéro commission facturée au patient.',
    },
    quoteForm: {
      title: 'Recevez 3 devis hospitaliers et avis médicaux gratuits',
      subtitle: 'Comparez sous 24h les avis de spécialistes, profils de chirurgiens et tarifs tout compris des meilleurs hôpitaux indiens.',
      fullName: 'Nom complet du patient *',
      fullNamePlaceholder: 'ex : Jean Dupont',
      country: 'Pays *',
      phone: 'Numéro WhatsApp / Téléphone *',
      notes: 'Symptômes actuels / Résumé médical',
      notesPlaceholder: 'Diagnostic actuel, examens disponibles ou préférence d’hôpital...',
      attachReports: 'Joindre rapports médicaux / scanners (facultatif)',
      attachPlaceholder: 'Téléverser scanner / PDF / image (max 10 Mo)',
      submitButton: 'Obtenir 3 devis hospitaliers gratuits',
      submitting: 'Traitement en cours...',
      privacyBadge: '100% confidentiel. Devis officiels délivrés par les hôpitaux partenaires.',
      disclaimer: 'Healthremade est un facilitateur de voyage médical et non un établissement de santé.',
    },
    trustMetrics: {
      bedsLabel: 'Lits hospitaliers accrédités',
      bedsSub: 'Certifiés JCI et NABH',
      turnaroundLabel: 'Délai d’avis médical',
      turnaroundSub: 'Par des chefs de service',
      savingsLabel: 'Économie moyenne réalisée',
      savingsSub: 'Vs. tarifs en Europe et USA',
      markupLabel: 'Frais de service cachés',
      markupSub: 'Paiement direct à l’hôpital',
    },
    footer: {
      medicalHubs: 'Pôles Médicaux',
      patientTrust: 'Confiance des Patients',
      travelSupport: 'Voyage et Visa Médical',
      disclaimerTitle: 'Avis médical et juridique important :',
      disclaimerText: 'Healthremade est une plateforme indépendante de facilitation de voyages médicaux. Les avis cliniques et estimations de tarifs sont émis directement par les hôpitaux partenaires agréés.',
      allRightsReserved: 'Healthremade. Tous droits réservés.',
      accreditationVerified: 'Accréditations vérifiées auprès de :',
      costGuidesBannerTitle: 'Guides détaillés des coûts et comparatifs d’interventions',
      costGuidesBannerSub: 'Comparez les coûts pour implants dentaires, pontage, prothèse de genou, greffe et FIV.',
      exploreCostGuides: 'Voir tous les guides de tarifs →',
    },
    specialties: {
      cardiology: 'Chirurgie cardiaque et pontage',
      orthopaedics: 'Orthopédie et prothèses articulaires',
      oncology: 'Oncologie et traitement du cancer',
      transplant: 'Greffe d’organes (foie, rein)',
      neurology: 'Neurochirurgie et colonne vertébrale',
      fertility: 'FIV et PMA',
    },
  },
};

/**
 * Get translation dictionary for given locale (with English fallback)
 */
export function getTranslation(locale: string): TranslationDictionary {
  const normalized = (locale || 'en').toLowerCase().slice(0, 2);
  return TRANSLATIONS[normalized] || TRANSLATIONS['en'];
}
