/**
 * High-Fidelity Medical Translations Dictionary for Dynamic Entities:
 * - Doctors (designations, departments, bio snippets, surgery types)
 * - Hospitals (taglines, descriptions, cities, amenities)
 * - Procedures (taglines, overview, inclusions, recovery)
 * - Blog & Articles (common headers, table titles, recovery advice)
 */

export interface EntityTranslation {
  title?: string
  name?: string
  designation?: string
  department?: string
  cityLabel?: string
  bio?: string
  tagline?: string
  description?: string
  specialtyLabel?: string
  keyExpertise?: string[]
}

// ─── DOCTOR TRANSLATIONS ──────────────────────────────────────────────────
export const DOCTOR_TRANSLATIONS: Record<string, Record<string, Partial<EntityTranslation>>> = {
  // Bengali
  bn: {
    'dr-himanshu-gupta': {
      designation: 'সিনিয়র কনসালট্যান্ট — প্লাস্টিক ও অনকো রিকনস্ট্রাকটিভ সার্জারি',
      department: 'প্লাস্টিক ও অনকো রিকনস্ট্রাকটিভ সার্জারি',
      cityLabel: 'নতুন দিল্লি (পূসা রোড)',
      bio: 'ডাঃ হিমাংশু গুপ্ত একজন অত্যন্ত দক্ষ প্লাস্টিক ও পুনর্গঠনমূলক সার্জন, যিনি ক্যান্সার পরবর্তী অঙ্গ পুনর্গঠনে বিশেষ দক্ষ। স্তন পুনর্গঠন, মাথা ও ঘাড়ের সার্জারি এবং জটিল অনকোলজিক রিকনস্ট্রাকশনে তাঁর খ্যাতি রয়েছে।',
      keyExpertise: ['অনকো রিকনস্ট্রাকশন', 'ব্রেস্ট রিকনস্ট্রাকশন', 'হেড অ্যান্ড নেক সার্জারি', 'মাইক্রোসার্জারি'],
    },
    'dr-shruti-bhatia': {
      designation: 'সিনিয়র কনসালট্যান্ট — অবস্টেট্রিক্স, গাইনোকোলজি ও আইভিএফ',
      department: 'বন্ধ্যাত্ব নিবারণ ও আইভিএফ সেন্টার',
      cityLabel: 'নতুন দিল্লি',
      bio: 'ডাঃ শ্রুতি ভাটিয়া প্রজনন মেডিসিন এবং আইভিএফ চিকিৎসায় একজন শীর্ষ বিশেষজ্ঞ। উচ্চ সাফল্যের হার সহ তিনি উন্নত ল্যাপারোস্কোপিক ও ফার্টিলিটি চিকিৎসা প্রদান করেন।',
      keyExpertise: ['আইভিএফ (IVF) ও টেস্টটিউব বেবি', 'ল্যাপারোস্কোপিক গাইনোকোলজি', 'উচ্চ ঝুঁকিপূর্ণ মাতৃত্ব'],
    },
    'dr-rajesh-kumar-jain': {
      designation: 'চেয়ারম্যান ও চিফ কার্ডিয়াক সার্জন',
      department: 'কার্ডিওথোরাসিক ও ভাস্কুলার সার্জারি',
      cityLabel: 'গুরুগ্রাম (দিল্লি এনসিআর)',
      bio: 'ডাঃ রাজেশ কুমার জৈন ভারতের অন্যতম শীর্ষ হৃদরোগ সার্জন, যিনি ১২,০০০-এর বেশি সফল বাইপাস ও হার্ট ভালভ সার্জারি সম্পন্ন করেছেন।',
      keyExpertise: ['করোনারি আর্টারি বাইপাস (CABG)', 'হার্ট ভালভ রিপ্লেসমেন্ট', 'মিনিমালি ইনভেসিভ হার্ট সার্জারি'],
    },
  },

  // Arabic
  ar: {
    'dr-himanshu-gupta': {
      designation: 'استشاري أول — جراحة التجميل والترميم بعد الأورام',
      department: 'جراحة التجميل والترميم بعد الأورام',
      cityLabel: 'نيودلهي (طريق بوسا)',
      bio: 'الدكتور هيمانشو غوبتا جراح تجميل وترميم متقدم متخصص في جراحات إعادة بناء الثدي وترميم الرأس والرقبة بعد جراحات الأورام السرطانية وفق أعلى المعايير الدولية.',
      keyExpertise: ['ترميم ما بعد الأورام', 'إعادة بناء الثدي', 'جراحة الرأس والرقبة', 'الجراحة المجهرية الدقيقة'],
    },
    'dr-shruti-bhatia': {
      designation: 'استشارية أولى — طب النساء والتوليد وعلاج العقم وأطفال الأنابيب',
      department: 'مركز الخصوبة وعلاج العقم (IVF)',
      cityLabel: 'نيودلهي',
      bio: 'الدكتورة شروتي بهاتيا خبيرة معتمدة في تقنيات أطفال الأنابيب والحقن المجهري والمناظير النسائية مع نسب نجاح عالمية متقدمة.',
      keyExpertise: ['أطفال الأنابيب (IVF)', 'الحقن المجهري', 'جراحة المناظير النسائية'],
    },
    'dr-rajesh-kumar-jain': {
      designation: 'رئيس قسم وكبير جراحي القلب',
      department: 'جراحة القلب والصدر والأوعية الدموية',
      cityLabel: 'جوروجرام (دلهي الكبرى)',
      bio: 'الدكتور راجيش كومار جين من رواد جراحة القلب في الهند، أجرى أكثر من 12,000 جراحة قلب مفتوح وترقيع الشرايين التاجية وتبديل الصمامات القلبية.',
      keyExpertise: ['عملية قلب مفتوح وترقيع الشرايين (CABG)', 'تبديل صمامات القلب', 'جراحة القلب طفيفة التوغل'],
    },
  },

  // Russian
  ru: {
    'dr-himanshu-gupta': {
      designation: 'Старший консультант — пластическая и онкореконструктивная хирургия',
      department: 'Пластическая и реконструктивная хирургия',
      cityLabel: 'Нью-Дели (Пуса Роуд)',
      bio: 'Доктор Химаншу Гупта — ведущий специалист по восстановительной и пластической хирургии после удаления опухолей, реконструкции молочной железы и микрохирургии.',
      keyExpertise: ['Онкореконструкция', 'Реконструкция молочной железы', 'Микрохирургия'],
    },
    'dr-shruti-bhatia': {
      designation: 'Старший консультант — репродуктолог, акушер-гинеколог, ЭКО',
      department: 'Центр репродуктивной медицины и ЭКО',
      cityLabel: 'Нью-Дели',
      bio: 'Доктор Шрути Бхатия — признанный эксперт по лечению бесплодия, протоколам ЭКО и гинекологической лапароскопии с высокими показателями успешности.',
      keyExpertise: ['Программы ЭКО', 'Лечение бесплодия', 'Лапароскопия'],
    },
    'dr-rajesh-kumar-jain': {
      designation: 'Председатель и главный кардиохирург',
      department: 'Кардиоторакальная хирургия',
      cityLabel: 'Гургаон (Дели)',
      bio: 'Доктор Раджеш Кумар Джейн выполнил более 12 000 операций аортокоронарного шунтирования и замены сердечных клапанов.',
      keyExpertise: ['Шунтирование сосудов сердца (АКШ)', 'Замена клапанов сердца', 'Малоинвазивная кардиохирургия'],
    },
  },

  // French
  fr: {
    'dr-himanshu-gupta': {
      designation: 'Consultant Senior — Chirurgie Plastique et Reconstructrice Oncologique',
      department: 'Chirurgie Plastique et Reconstructrice',
      cityLabel: 'New Delhi (Pusa Road)',
      bio: 'Le Dr Himanshu Gupta est un chirurgien hautement qualifié spécialisé dans la reconstruction post-cancer, la reconstruction mammaire et la microchirurgie de précision.',
      keyExpertise: ['Reconstruction oncologique', 'Reconstruction mammaire', 'Microchirurgie'],
    },
    'dr-shruti-bhatia': {
      designation: 'Consultante Senior — Gynécologie, Obstétrique et PMA / FIV',
      department: 'Centre de Médecine Reproductive et FIV',
      cityLabel: 'New Delhi',
      bio: 'Le Dr Shruti Bhatia est une spécialiste renommée en fertilité et procréation médicalement assistée (FIV) avec d’excellents taux de réussite.',
      keyExpertise: ['Fécondation in vitro (FIV)', 'Chirurgie gynécologique', 'Grossesse à risque'],
    },
    'dr-rajesh-kumar-jain': {
      designation: 'Président et Chef de la Chirurgie Cardiaque',
      department: 'Chirurgie Cardiovasculaire et Thoracique',
      cityLabel: 'Gurugram (Région de Delhi)',
      bio: 'Le Dr Rajesh Kumar Jain a réalisé plus de 12 000 pontages coronariens et remplacements valvulaires avec des standards de renommée internationale.',
      keyExpertise: ['Pontage coronarien (CABG)', 'Remplacement de valve cardiaque', 'Chirurgie cardiaque mini-invasive'],
    },
  },
}

// ─── HOSPITAL TRANSLATIONS ────────────────────────────────────────────────
export const HOSPITAL_TRANSLATIONS: Record<string, Record<string, Partial<EntityTranslation>>> = {
  // Bengali
  bn: {
    'medanta-the-medicity': {
      tagline: '১,৬০০+ শয্যাবিশিষ্ট আন্তর্জাতিক মাল্টি-সুপার স্পেশালিটি মেডিকেল ইনস্টিটিউট',
      description: 'বিখ্যাত কার্ডিয়াক সার্জন ডাঃ নরেশ ত্রেহান কর্তৃক প্রতিষ্ঠিত মেদান্তা ভারতের অন্যতম বৃহত্তম ও মর্যাদাপূর্ণ হাসপাতাল। ৪৩ একর ক্যাম্পাস এবং ৪৫টি অত্যাধুনিক অপারেশন থিয়েটার সহ এটি জেসিআই এবং এনএবিএইচ স্বীকৃত।',
      cityLabel: 'গুরুগ্রাম (দিল্লি এনসিআর)',
    },
    'fortis-escorts-heart-institute': {
      tagline: 'এশিয়ার শীর্ষস্থানীয় আন্তর্জাতিক কার্ডিয়াক কেয়ার ও হার্ট সার্জারি ইনস্টিটিউট',
      description: 'ফোর্টিস এসকর্টস হার্ট ইনস্টিটিউট বিগত ৩ দশকের বেশি সময় ধরে কার্ডিয়াক সায়েন্সে বিশ্বমানের অগ্রদূত। প্রাপ্তবয়স্ক ও পেডিয়াট্রিক কার্ডিয়াক সার্জারিতে এর সাফল্য বিশ্বখ্যাত।',
      cityLabel: 'ওখলা, নতুন দিল্লি',
    },
    'max-super-speciality-hospital-saket': {
      tagline: 'আন্তর্জাতিক মানের কোয়াটারনারি কেয়ার ও রোবোটিক সার্জারি সেন্টার',
      description: 'ম্যাক্স সাকেত দিল্লির প্রধান মাল্টি-স্পেশালিটি হাসপাতাল যা রোবোটিক অনকোলজি, লিভার ট্রান্সপ্লান্ট, হার্ট সার্জারি এবং বোন ম্যারো ট্রান্সপ্লান্টে আন্তর্জাতিক সুনাম অর্জন করেছে।',
      cityLabel: 'সাকেত, দক্ষিণ দিল্লি',
    },
  },

  // Arabic
  ar: {
    'medanta-the-medicity': {
      tagline: 'معهد طبي رائد يضم أكثر من 1,600 سرير و45 غرفة عمليات مجهزة',
      description: 'مستشفى ميدانتا هو أحد أكبر وأعرق الصروح الطبية في الهند، أسسه جراح القلب العالمي الدكتور ناريش تريهان. معتمد دولياً من JCI وNABH ويستقبل آلاف المرضى الدوليين سنوياً.',
      cityLabel: 'جوروجرام (دلهي الكبرى)',
    },
    'fortis-escorts-heart-institute': {
      tagline: 'المركز الرائد الأول لجراحة وأمراض القلب في آسيا',
      description: 'معهد فورتيس إسكورتس للقلب يعد الرائد المعترف به عالمياً في جراحات القلب المعقدة، تبديل الصمامات، وقسطرة الشرايين منذ أكثر من 30 عاماً.',
      cityLabel: 'أوكلا، نيودلهي',
    },
    'max-super-speciality-hospital-saket': {
      tagline: 'مستشفى رائد للرعاية الطبية المتقدمة والجراحة الروبوتية المعتمدة',
      description: 'يعد مستشفى ماكس ساكيت وجهة رئيسية للمرضى الدوليين في مجالات زراعة الأعضاء، الأورام السرطانية، وجراحة العظام الروبوتية بأحدث التقنيات.',
      cityLabel: 'ساكيت، جنوب دلهي',
    },
  },

  // Russian
  ru: {
    'medanta-the-medicity': {
      tagline: 'Флагманский медицинский институт на 1600+ коек с аккредитацией JCI и NABH',
      description: 'Клиника Medanta в Гургаоне — один из крупнейших медицинских комплексов Азии с 45 операционными залами, признанный мировым лидером в трансплантологии и кардиохирургии.',
      cityLabel: 'Гургаон (Дели)',
    },
    'fortis-escorts-heart-institute': {
      tagline: 'Ведущий кардиохирургический центр Азии',
      description: 'Институт сердца Фортис Эскортс известен более 30 лет выдающимися результатами в лечении врожденных и приобретенных патологий сердца.',
      cityLabel: 'Окла, Нью-Дели',
    },
    'max-super-speciality-hospital-saket': {
      tagline: 'Центр передовой роботизированной хирургии и трансплантации',
      description: 'Больница Max Saket — флагманское учреждение с передовым отделением онкологии, нейрохирургии и ортопедии.',
      cityLabel: 'Сакет, Нью-Дели',
    },
  },

  // French
  fr: {
    'medanta-the-medicity': {
      tagline: 'Institut médical de référence de plus de 1 600 lits avec accréditations JCI et NABH',
      description: 'Fondé par le célèbre chirurgien Dr Naresh Trehan, Medanta est un hôpital quaternaire de renommée mondiale accueillant des milliers de patients internationaux par an.',
      cityLabel: 'Gurugram (Région de Delhi)',
    },
    'fortis-escorts-heart-institute': {
      tagline: 'Institut d’excellence en cardiologie et chirurgie cardiaque en Asie',
      description: 'Fortis Escorts est un pionnier international en chirurgie cardiaque adulte et pédiatrique depuis plus de trois décennies.',
      cityLabel: 'Okhla, New Delhi',
    },
    'max-super-speciality-hospital-saket': {
      tagline: 'Hôpital multi-spécialités de pointe et chirurgie robotique',
      description: 'Max Saket offre des soins d’excellence en oncologie, transplantation d’organes et chirurgie orthopédique.',
      cityLabel: 'Saket, New Delhi',
    },
  },
}

// ─── PROCEDURE TRANSLATIONS ───────────────────────────────────────────────
export const PROCEDURE_TRANSLATIONS: Record<string, Record<string, Partial<EntityTranslation>>> = {
  // Bengali
  bn: {
    'bypass-surgery': {
      name: 'করোনারি আর্টারি বাইপাস সার্জারি (CABG)',
      specialtyLabel: 'কার্ডিয়াক সার্জারি',
      tagline: 'বিশ্বমানের হৃদরোগ চিকিৎসা ও বাইপাস সার্জারি অত্যন্ত সাশ্রয়ী খরচে',
      description: 'করোনারি আর্টারি বাইপাস গ্রাফটিং (CABG) হল এমন একটি ওপেন-হার্ট সার্জারি যা ব্লকেজ হওয়া ধমনীর পাশ দিয়ে রক্তের প্রবাহ স্বাভাবিক করতে নতুন পথ তৈরি করে। ভারতের শীর্ষ হাসপাতালে আন্তর্জাতিক মানের কেয়ার পাওয়া যায় কোনো অপেক্ষার তালিকা ছাড়াই।',
    },
    'knee-replacement': {
      name: 'রোবোটিক হাঁটু প্রতিস্থাপন সার্জারি (Knee Replacement)',
      specialtyLabel: 'অর্থোপেডিকস ও জয়েন্ট রিপ্লেসমেন্ট',
      tagline: 'উন্নত রোবোটিক প্রযুক্তির সাহায্যে দীর্ঘস্থায়ী কৃত্রিম হাঁটু প্রতিস্থাপন',
      description: 'তীব্র হাঁটুর বাত এবং ক্ষয়প্রাপ্ত জয়েন্টের ব্যথা দূর করতে আধুনিক কৃত্রিম হাঁটু স্থাপন করা হয়। রোবোটিক ন্যাভিগেশনের মাধ্যমে ৯৯% নির্ভুলতা নিশ্চিত করা হয়।',
    },
    'liver-transplant': {
      name: 'লিভিং ডোনার লিভার প্রতিস্থাপন (Liver Transplant)',
      specialtyLabel: 'অঙ্গ প্রতিস্থাপন (Transplant)',
      tagline: '৯৫%+ সফলতার হার সহ আন্তর্জাতিক মানের লিভার ট্রান্সপ্লান্ট',
      description: 'ভারতের শীর্ষ ট্রান্সপ্লান্ট সেন্টারে লিভার সিরোসিস ও এন্ড-স্টেজ লিভার ফেইলিওরের জন্য জীবিত দাতার লিভার সফলভাবে প্রতিস্থাপন করা হয়।',
    },
  },

  // Arabic
  ar: {
    'bypass-surgery': {
      name: 'جراحة ترقيع الشرايين التاجية والقلب المفتوح (CABG)',
      specialtyLabel: 'جراحة القلب',
      tagline: 'جراحة قلب مفتوح بمواصفات عالمية وتكلفة مناسبة بدون قوائم انتظار',
      description: 'تعتبر عملية ترقيع مجازة الشريان التاجي (CABG) جراحة قلب مفتوح تهدف إلى استعادة تدفق الدم الطبيعي إلى عضلة القلب عبر تجاوز الشرايين المسدودة مع نسب نجاح تتجاوز 98%.',
    },
    'knee-replacement': {
      name: 'استبدال مفصل الركبة بالكامل بتقنية الروبوت',
      specialtyLabel: 'جراحة العظام والمفاصل',
      tagline: 'استعادة كامل الحركة والمرونة بدقة جراحية روبوتية متناهية',
      description: 'جراحة استبدال مفصل الركبة المتآكل بمفصل صناعي متين يدوم لأكثر من 25 عاماً تحت إشراف كبار استشاريي جراحة العظام في الهند.',
    },
    'liver-transplant': {
      name: 'زراعة الكبد من متبرع حي (Living Donor Liver Transplant)',
      specialtyLabel: 'زراعة الأعضاء',
      tagline: 'نسب نجاح عالمية تتجاوز 95% بأحدث بروتوكولات العناية المركزة',
      description: 'تعتبر الهند من أكثر الدول تفوقاً في عمليات زراعة الكبد من متبرع حي لحالات تليف الكبد وفشل الكبد المتقدم مع فريق رعاية دولي متخصص.',
    },
  },

  // Russian
  ru: {
    'bypass-surgery': {
      name: 'Аортокоронарное шунтирование сердца (АКШ / CABG)',
      specialtyLabel: 'Кардиохирургия',
      tagline: 'Высокотехнологичная кардиохирургия без очередей по доступной стоимости',
      description: 'Операция аортокоронарного шунтирования восстанавливает кровоснабжение миокарда в обход суженных коронарных артерий с использованием малоинвазивных методик.',
    },
    'knee-replacement': {
      name: 'Роботизированное эндопротезирование коленного сустава',
      specialtyLabel: 'Ортопедия и травматология',
      tagline: 'Максимальная точность установки имплантатов и быстрое восстановление',
      description: 'Замена поврежденного сустава на высококачественный протез мировых брендов (Zimmer, Stryker) с использованием роботизированной навигации.',
    },
    'liver-transplant': {
      name: 'Трансплантация печени от родственного донора',
      specialtyLabel: 'Трансплантология',
      tagline: 'Успешность более 95% в ведущих индийских центрах трансплантации',
      description: 'Высокотехнологичная пересадка доли печени при циррозе и терминальной стадии печеночной недостаточности с круглосуточным реанимационным контролем.',
    },
  },

  // French
  fr: {
    'bypass-surgery': {
      name: 'Pontage Aortocoronarien (CABG)',
      specialtyLabel: 'Chirurgie Cardiaque',
      tagline: 'Chirurgie cardiaque d’excellence sans liste d’attente et tarifs transparents',
      description: 'Le pontage aortocoronarien permet de contourner les artères obstruées pour rétablir une oxygénation optimale du muscle cardiaque.',
    },
    'knee-replacement': {
      name: 'Prothèse Totale du Genou Robotisée',
      specialtyLabel: 'Chirurgie Orthopédique',
      tagline: 'Précision millimétrique grâce à la navigation robotique avancée',
      description: 'Remplacement de l’articulation usée par un implant de dernière génération permettant une reprise rapide de la marche.',
    },
    'liver-transplant': {
      name: 'Greffe Hépatique avec Donneur Vivant',
      specialtyLabel: 'Transplantation d’organes',
      tagline: 'Taux de succès supérieur à 95% dans les meilleurs centres indiens',
      description: 'Prise en charge complète de l’insuffisance hépatique terminale par une équipe pluridisciplinaire accréditée JCI.',
    },
  },
}
