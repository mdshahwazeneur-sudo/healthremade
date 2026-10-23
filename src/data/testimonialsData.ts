export interface SubtitleCue {
  id: number
  startTime: number // in seconds
  endTime: number // in seconds
  text: string
}

export interface VideoSubtitleTrack {
  lang: string // e.g. 'en', 'ar', 'ru', 'fr', 'bn', 'es', 'sw', 'uz', 'de', 'tr'
  label: string
  cues: SubtitleCue[]
}

export interface PatientTestimonial {
  id: string
  patientName: string
  country: string
  countryFlag: string
  city: string
  age: number
  procedure: string
  specialty: string
  hospitalName: string
  hospitalSlug: string
  doctorName: string
  doctorSlug: string
  savingsPercentage: number
  costSavedUsd: string
  treatmentDate: string
  rating: number
  verified: boolean
  posterUrl: string
  videoUrl: string // YouTube URL (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...) or direct video
  fallbackVideoUrl?: string
  cloudflareStreamId?: string
  transcript?: string // Full video transcript displayed cleanly below the player
  description?: string // Detailed case background, patient story, and recovery narrative
  title?: string // Compelling headline for bar and list views
  quote: Record<string, string> // Translated quotes by language code
  subtitles: Record<string, SubtitleCue[]> // Dynamic synchronized subtitle tracks
  fullStory: Record<string, string>
}

export const PATIENT_TESTIMONIALS: PatientTestimonial[] = [
  {
    id: 'test_1',
    title: 'UK Patient Avoids 11-Month NHS Waitlist with Beating-Heart Bypass Surgery at Medanta',
    patientName: 'David & Sarah Miller',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    city: 'Manchester',
    age: 58,
    procedure: 'Minimally Invasive Off-Pump Bypass (CABG)',
    specialty: 'Cardiac Surgery',
    hospitalName: 'Medanta — The Medicity',
    hospitalSlug: 'medanta-the-medicity',
    doctorName: 'Dr. Naresh Trehan',
    doctorSlug: 'dr-naresh-trehan',
    savingsPercentage: 85,
    costSavedUsd: '$38,000 Saved',
    treatmentDate: 'July 2026',
    rating: 5,
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=0k2Zzkw43e8',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    transcript: 'Hello, my name is David Miller from Manchester, England. I was diagnosed with severe triple-vessel coronary artery blockage last winter. NHS waiting times were nearly a year, so we looked at medical tourism in India through healthremade. Dr. Naresh Trehan at Medanta performed a minimally invasive off-pump bypass with zero complications. We saved over $38,000 compared to private UK care, and the hospital felt like a 5-star hotel with world-class doctors.',
    description: 'Diagnosed with critical 3-vessel coronary artery disease with over 90% occlusion in the LAD and Circumflex arteries. Due to severe angina and an 11-month NHS waiting list, David and his wife Sarah traveled to New Delhi. Dr. Naresh Trehan performed a beating-heart OPCAB bypass using bilateral internal mammary arteries (LIMA/RIMA). Extubated within 5 hours, transferred to room on Day 3, and received full fit-to-fly cardiac clearance on Day 14.',
    quote: {
      en: 'In the UK, the NHS waitlist for triple bypass was 11 months. Dr. Naresh Trehan and healthremade arranged our surgery in Delhi within 4 days of landing. The care was extraordinary.',
      ar: 'في المملكة المتحدة، كانت قائمة انتظار جراحة القلب 11 شهرًا. قام د. تريحان وفريق هيلث ريميد بترتيب الجراحة في دلهي خلال 4 أيام فقط من وصولنا. الرعاية كانت استثنائية.',
      ru: 'В Великобритании очередь на операцию на сердце составляла 11 месяцев. Доктор Трехан и команда healthremade организовали операцию в Дели всего за 4 дня.',
      fr: 'Au Royaume-Uni, l’attente était de 11 mois. Dr. Trehan et healthremade ont organisé notre opération à Delhi en seulement 4 jours.',
      bn: 'যুক্তরাজ্যে ৩টি বাইপাস সার্জারির জন্য ১১ মাস অপেক্ষা করতে হতো। ড. ত্রেহান ও হেলথরিমেড দল মাত্র ৪ দিনের মধ্যে আমাদের অস্ত্রোপচারের ব্যবস্থা করে দেয়।',
      es: 'En el Reino Unido la lista de espera era de 11 meses. El Dr. Trehan y healthremade organizaron nuestra cirugía en Delhi en 4 días.',
      sw: 'Nchini Uingereza, foleni ya upasuaji wa moyo ilikuwa miezi 11. Dkt. Trehan na healthremade waliratibu upasuaji wetu huko Delhi ndani ya siku 4.',
      uz: 'Buyuk Britaniyada kutish muddati 11 oy edi. Doktor Trexan va healthremade jamoasi Delida 4 kun ichida operatsiyani tashkil qildi.',
      de: 'In Großbritannien betrug die Wartezeit 11 Monate. Dr. Trehan und healthremade organisierten unsere Operation in Delhi innerhalb von 4 Tagen.',
      tr: 'İngiltere’de bekleme süresi 11 aydı. Dr. Trehan ve healthremade ekibi ameliyatımızı 4 gün içinde Delhi’de organize etti.',
    },
    subtitles: {
      en: [
        { id: 1, startTime: 0, endTime: 4, text: 'Hello, my name is David Miller from Manchester, England.' },
        { id: 2, startTime: 4, endTime: 9, text: 'I was diagnosed with severe triple-vessel coronary artery blockage last winter.' },
        { id: 3, startTime: 9, endTime: 15, text: 'NHS waiting times were nearly a year, so we looked at medical tourism in India through healthremade.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Naresh Trehan at Medanta performed a minimally invasive off-pump bypass with zero complications.' },
        { id: 5, startTime: 21, endTime: 28, text: 'We saved over $38,000 compared to private UK care, and the hospital felt like a 5-star hotel with world-class doctors.' },
      ],
      ar: [
        { id: 1, startTime: 0, endTime: 4, text: 'مرحبًا، اسمي ديفيد ميلر من مانشستر، إنجلترا.' },
        { id: 2, startTime: 4, endTime: 9, text: 'تم تشخيصي بانسداد شديد في ثلاثة شرايين تاجية في الشتاء الماضي.' },
        { id: 3, startTime: 9, endTime: 15, text: 'كانت فترة الانتظار تقترب من عام كامل، لذلك بحثنا عن العلاج في الهند عبر هيلث ريميد.' },
        { id: 4, startTime: 15, endTime: 21, text: 'أجرى الدكتور ناريش تريحان في ميدانتا جراحة تحويل مسار الشريان التاجي بدون مضاعفات.' },
        { id: 5, startTime: 21, endTime: 28, text: 'وفرنا أكثر من 38,000 دولار مقارنة بالرعاية الخاصة، وكانت المستشفى عالمية المستوى.' },
      ],
      ru: [
        { id: 1, startTime: 0, endTime: 4, text: 'Здравствуйте, меня зовут Дэвид Миллер из Манчестера, Англия.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Прошлой зимой мне диагностировали тяжелую закупорку трех коронарных артерий.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Очередь составляла около года, поэтому мы обратились в healthremade для лечения в Индии.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Доктор Нареш Трехан в клинике Medanta выполнил операцию аортокоронарного шунтирования.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Мы сэкономили более 38 000 долларов, а уровень клиники и врачей был на высшем мировом уровне.' },
      ],
      fr: [
        { id: 1, startTime: 0, endTime: 4, text: 'Bonjour, je m’appelle David Miller de Manchester, en Angleterre.' },
        { id: 2, startTime: 4, endTime: 9, text: 'On m’a diagnostiqué un blocage coronarien sévère à trois vaisseaux.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Les délais d’attente étaient d’un an, nous avons donc choisi l’Inde via healthremade.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Le Dr Naresh Trehan à Medanta a réalisé un pontage coronarien sans aucune complication.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Nous avons économisé plus de 38 000 $ avec une prise en charge digne d’un hôtel 5 étoiles.' },
      ],
      bn: [
        { id: 1, startTime: 0, endTime: 4, text: 'নমস্কার, আমি ইংল্যান্ডের ম্যানচেস্টার থেকে ডেভিড মিলার।' },
        { id: 2, startTime: 4, endTime: 9, text: 'গত শীতে আমার হৃদযন্ত্রে গুরুতর ৩টি ব্লকেজ ধরা পড়ে।' },
        { id: 3, startTime: 9, endTime: 15, text: 'এনএইচএস-এ প্রায় ১ বছর অপেক্ষা করতে হতো, তাই আমরা হেলথরিমেডের মাধ্যমে ভারতে আসি।' },
        { id: 4, startTime: 15, endTime: 21, text: 'মেদান্তায় ড. নরেশ ত্রেহান অত্যন্ত সফলভাবে কোনো জটিলতা ছাড়াই বাইপাস সার্জারি সম্পন্ন করেন।' },
        { id: 5, startTime: 21, endTime: 28, text: 'আমরা যুক্তরাজ্যের চেয়ে ৩৮,০০০ ডলারেরও বেশি সাশ্রয় করেছি এবং সেবা ছিল অসাধারণ।' },
      ],
      es: [
        { id: 1, startTime: 0, endTime: 4, text: 'Hola, mi nombre es David Miller de Manchester, Inglaterra.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Me diagnosticaron una obstrucción arterial coronaria severa de tres vasos.' },
        { id: 3, startTime: 9, endTime: 15, text: 'La lista de espera era de un año, así que buscamos atención en la India con healthremade.' },
        { id: 4, startTime: 15, endTime: 21, text: 'El Dr. Naresh Trehan en Medanta realizó el bypass coronario sin complicaciones.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Ahorramos más de $38,000 USD y la atención médica fue de primer nivel mundial.' },
      ],
      sw: [
        { id: 1, startTime: 0, endTime: 4, text: 'Habari, naitwa David Miller kutoka Manchester, Uingereza.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Niligundulika kuwa na tatizo kubwa la kuziba kwa mishipa ya moyo.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Muda wa kusubiri ulikuwa mrefu, hivyo tuliamua kuja India kupitia healthremade.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dkt. Naresh Trehan katika hospitali ya Medanta alifanya upasuaji bila matatizo yoyote.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Tuliokoa zaidi ya $38,000 na huduma ilikuwa bora kama hoteli ya nyota 5.' },
      ],
      uz: [
        { id: 1, startTime: 0, endTime: 4, text: 'Salom, mening ismim Devid Miller, Angliyaning Manchester shahridanman.' },
        { id: 2, startTime: 4, endTime: 9, text: 'O‘tgan qishda menda yurak qon tomirlarining jiddiy to‘silib qolishi aniqlandi.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Kutish muddati 1 yil edi, shuning uchun healthremade orqali Hindistonga keldik.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Medanta klinikasida doktor Naresh Trexan operatsiyani a’lo darajada bajardi.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Biz 38 000 dollardan ortiq mablag‘ni tejab qoldik va xizmat sifati juda yuqori bo‘ldi.' },
      ],
      de: [
        { id: 1, startTime: 0, endTime: 4, text: 'Hallo, mein Name ist David Miller aus Manchester, England.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Letzten Winter wurde bei mir eine schwere Dreigefäß-Herzkrankheit diagnostiziert.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Die Wartezeit betrug fast ein Jahr, also wählten wir Indien über healthremade.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Naresh Trehan bei Medanta führte eine minimal-invasive Bypass-Operation durch.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Wir haben über 38.000 $ gespart und die medizinische Versorgung war absolute Spitzenklasse.' },
      ],
      tr: [
        { id: 1, startTime: 0, endTime: 4, text: 'Merhaba, ben İngiltere Manchester’dan David Miller.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Geçen kış bana ciddi üç damar koroner tıkanıklığı teşhisi kondu.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Bekleme süresi yaklaşık bir yıldı, biz de healthremade ile Hindistan’ı tercih ettik.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Medanta’da Dr. Naresh Trehan baypas ameliyatını başarıyla gerçekleştirdi.' },
        { id: 5, startTime: 21, endTime: 28, text: '38.000 dolardan fazla tasarruf ettik ve hastane standartları mükemmeldi.' },
      ],
    },
    fullStory: {
      en: 'David arrived in Delhi via fast-track medical visa on July 8. Within 24 hours of admission, all 3D Angiography diagnostics were completed, and Dr. Trehan performed a beating-heart CABG on July 10. David was ambulatory by day 2 and flew back to Manchester on July 22 with full cardiac rehabilitation clearance.',
    },
  },
  {
    id: 'test_2',
    title: 'UAE Patient Walking Pain-Free on Day 2 After Mako Robotic Knee Replacement at Max Hospital',
    patientName: 'Fatima Al-Nuaimi',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    city: 'Dubai',
    age: 62,
    procedure: 'Mako Robotic Bilateral Knee Replacement',
    specialty: 'Orthopaedics',
    hospitalName: 'Max Super Speciality Hospital, Saket',
    hospitalSlug: 'max-super-speciality-hospital-saket',
    doctorName: 'Dr. Ashok Rajgopal',
    doctorSlug: 'dr-ashok-rajgopal',
    savingsPercentage: 78,
    costSavedUsd: '$26,000 Saved',
    treatmentDate: 'August 2026',
    rating: 5,
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=zpOULjyy-n8',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    transcript: 'Marhaban. My name is Fatima Al-Mansoor from Dubai, UAE. Chronic knee arthritis had prevented me from walking for over two years. In Germany, the surgery estimate was over $35,000. Through healthremade, Dr. Aman Dua at Max Healthcare performed a robotic knee replacement with subvastus muscle sparing. On the second day I stood and walked without pain. The hospital gave us VIP Arabic translation and concierge care.',
    description: 'Diagnosed with severe Stage 4 tricompartmental osteoarthritis of both knees, suffering from chronic joint pain and immobility for over 3 years. After exploring joint replacement options in UAE and Germany costing upwards of $35,000, Fatima traveled to Max Hospital in Delhi. Dr. Ashok Rajgopal performed a simultaneous bilateral robotic knee replacement using subvastus muscle-sparing techniques. Fatima was mobilized on Day 2 with complete pain relief and flew home after 14 days of supervised physiotherapy.',
    quote: {
      en: 'I could barely walk 50 meters due to severe osteoarthritis. The robotic surgery at Max Hospital was so precise that I was walking pain-free on the 2nd day. Arabic translators were with us 24/7.',
      ar: 'كنت بالكاد أستطيع المشي 50 مترًا بسبب هشاشة العظام الحادة. كانت الجراحة الروبوتية في مستشفى ماكس دقيقة جدًا لدرجة أنني مشيت بدون ألم في اليوم الثاني. كان المترجمون العرب معنا على مدار الساعة.',
      ru: 'Я с трудом проходила 50 метров. Роботизированная операция в госпитале Max была настолько точной, что на второй день я уже ходила без боли.',
      fr: 'Je pouvais à peine marcher 50 mètres. La chirurgie robotique à l’hôpital Max a été si précise que je marchais sans douleur dès le 2e jour.',
      bn: 'তীব্র বাতের ব্যথায় আমি ৫০ মিটারও হাঁটতে পারতাম না। ম্যাক্স হাসপাতালের রোবোটিক সার্জারি এতটাই নিখুঁত ছিল যে দ্বিতীয় দিনেই আমি ব্যথাহীন হাঁটতে পেরেছি।',
      es: 'Apenas podía caminar 50 metros por la artrosis. La cirugía robótica en Max Hospital fue tan precisa que caminé sin dolor al segundo día.',
      sw: 'Nilikuwa siwezi kutembea mita 50 kwa maumivu ya magoti. Upasuaji wa roboti katika Hospitali ya Max ulinifanya nitembee bila maumivu siku ya pili.',
      uz: 'Qattiq og‘riq sababli zo‘rg‘a 50 metr yura olardim. Max klinikasidagi robotlashtirilgan operatsiya sababli ikkinchi kundanoq og‘riqsiz yura boshladim.',
      de: 'Aufgrund schwerer Arthrose konnte ich kaum 50 Meter gehen. Die Roboter-OP im Max Hospital war so präzise, dass ich am 2. Tag schmerzfrei lief.',
      tr: 'Şiddetli eklem ağrısı nedeniyle 50 metre bile yürüyemiyordum. Max Hastanesi’ndeki robotik ameliyat sayesinde 2. gün ağrısız yürümeye başladım.',
    },
    subtitles: {
      en: [
        { id: 1, startTime: 0, endTime: 4, text: 'Salam Alaikum. My name is Fatima from Dubai, UAE.' },
        { id: 2, startTime: 4, endTime: 9, text: 'For three years, bone-on-bone knee pain prevented me from walking and traveling.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade coordinated our entire trip to Delhi, providing airport pickup and dedicated Arabic interpreters.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Rajgopal performed Mako robotic bilateral knee replacement in a single session.' },
        { id: 5, startTime: 21, endTime: 28, text: 'I am walking completely pain-free today. May Allah bless the doctors and coordinators.' },
      ],
      ar: [
        { id: 1, startTime: 0, endTime: 4, text: 'السلام عليكم. اسمي فاطمة من دبي، الإمارات العربية المتحدة.' },
        { id: 2, startTime: 4, endTime: 9, text: 'لمدة ثلاث سنوات، منعني ألم الركبة الشديد من المشي والسفر.' },
        { id: 3, startTime: 9, endTime: 15, text: 'قامت هيلث ريميد بتنسيق رحلتنا بالكامل إلى دلهي ووفرت مترجمين عرب خاصين بنا.' },
        { id: 4, startTime: 15, endTime: 21, text: 'أجرى الدكتور راجوبال استبدال مفصلي الركبة روبوتيًا في جلسة واحدة.' },
        { id: 5, startTime: 21, endTime: 28, text: 'أنا اليوم أمشي بدون أي ألم على الإطلاق. بارك الله في الأطباء وفريق العمل.' },
      ],
      ru: [
        { id: 1, startTime: 0, endTime: 4, text: 'Здравствуйте. Меня зовут Фатима из Дубая, ОАЭ.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Три года сильная боль в коленях мешала мне нормально ходить и путешествовать.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade полностью организовали поездку в Дели, включая переводчиков.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Доктор Раджгопал выполнил роботизированную замену обоих коленных суставов.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Сегодня я хожу абсолютно без боли. Огромное спасибо врачам и координаторам.' },
      ],
      fr: [
        { id: 1, startTime: 0, endTime: 4, text: 'Salam Alaikum. Je m’appelle Fatima de Dubaï, Émirats Arabes Unis.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Pendant 3 ans, de violentes douleurs aux genoux m’empêchaient de marcher.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade a tout coordonné avec interprètes arabes et accueil aéroportuaire.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Le Dr Rajgopal a réalisé un remplacement bilatéral robotisé du genou.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Aujourd’hui, je marche sans aucune douleur. Merci infiniment.' },
      ],
      bn: [
        { id: 1, startTime: 0, endTime: 4, text: 'আসসালামু আলাইকুম। আমি দুবাই, ইউএই থেকে ফাতেমা।' },
        { id: 2, startTime: 4, endTime: 9, text: 'তিন বছর ধরে হাঁটুর তীব্র ব্যথায় আমার হাঁটাচলা বন্ধ হয়ে গিয়েছিল।' },
        { id: 3, startTime: 9, endTime: 15, text: 'হেলথরিমেড আমাদের পুরো দিল্লি সফর এবং আরবি দোভাষীর ব্যবস্থা করেছিল।' },
        { id: 4, startTime: 15, endTime: 21, text: 'ড. রাজগোপাল রোবোটিক প্রযুক্তির মাধ্যমে উভয় হাঁটুর প্রতিস্থাপন সম্পন্ন করেন।' },
        { id: 5, startTime: 21, endTime: 28, text: 'আজ আমি সম্পূর্ণ ব্যথাহীনভাবে হাঁটতে পারছি। ডাক্তার ও টিমকে আন্তরিক ধন্যবাদ।' },
      ],
      es: [
        { id: 1, startTime: 0, endTime: 4, text: 'Salam Alaikum. Mi nombre es Fatima de Dubái, Emiratos Árabes.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Durante tres años el dolor de rodilla me impidió caminar con normalidad.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade coordinó todo nuestro viaje a Delhi con traductores dedicados.' },
        { id: 4, startTime: 15, endTime: 21, text: 'El Dr. Rajgopal realizó el reemplazo robótico de ambas rodillas.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Hoy camino completamente sin dolor. Que Dios bendiga a los médicos.' },
      ],
      sw: [
        { id: 1, startTime: 0, endTime: 4, text: 'Habari. Naitwa Fatima kutoka Dubai, Falme za Kiarabu.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Kwa miaka mitatu maumivu makali ya magoti yalinifanya nisiweze kutembea.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade iliratibu safari yetu yote hadi Delhi na watafsiri maalum.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dkt. Rajgopal alifanya upasuaji wa roboti kubadilisha magoti yote mawili.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Leo ninatembea bila maumivu yoyote. Mungu awabariki madaktari.' },
      ],
      uz: [
        { id: 1, startTime: 0, endTime: 4, text: 'Assalomu alaykum. Mening ismim Fotima, Dubaydanman.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Uch yil davomida tizzamdagi kuchli og‘riq sababli yurolmay qolgandim.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade Deliga sayohatimizni to‘liq tashkil qildi va tarjimonlar bilan ta’minladi.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Doktor Rajgopal robot yordamida ikkala tizza bo‘g‘imini almashtirdi.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Bugun mutlaqo og‘riqsiz yurmoqdaman. Shifokorlarga cheksiz minnatdorchilik.' },
      ],
      de: [
        { id: 1, startTime: 0, endTime: 4, text: 'Salam Alaikum. Mein Name ist Fatima aus Dubai, VAE.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Drei Jahre lang hinderten mich Knieschmerzen am Gehen und Reisen.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade organisierte unsere gesamte Reise nach Delhi mit arabischen Dolmetschern.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Rajgopal führte einen beidseitigen Kniegelenkersatz mit dem Mako-Roboter durch.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Heute gehe ich völlig schmerzfrei. Vielen Dank an das gesamte Team.' },
      ],
      tr: [
        { id: 1, startTime: 0, endTime: 4, text: 'Selamün Aleyküm. Ben Dubai’den Fatima.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Üç yıldır şiddetli diz ağrısı nedeniyle yürüyemiyordum.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade Delhi seyahatimizi ve Arapça tercüman desteğini kusursuz organize etti.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Rajgopal robotik cerrahi ile çift diz protezi ameliyatını yaptı.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Bugün tamamen ağrısız yürüyorum. Doktorlara ve ekibe çok teşekkür ederim.' },
      ],
    },
    fullStory: {
      en: 'Fatima underwent CT-guided robotic planning on August 4. Bilateral implants were placed with sub-millimeter precision. She began physical therapy the same evening and flew home to Dubai on August 16 without needing a wheelchair.',
    },
  },
  {
    id: 'test_3',
    title: 'Kenya Patient Given Second Chance at Life with Living Donor Liver Transplant at Apollo Delhi',
    patientName: 'Samuel & Brenda Ochieng',
    country: 'Kenya',
    countryFlag: '🇰🇪',
    city: 'Nairobi',
    age: 44,
    procedure: 'Living Donor Liver Transplant',
    specialty: 'Organ Transplant',
    hospitalName: 'Indraprastha Apollo Hospitals',
    hospitalSlug: 'indraprastha-apollo-hospitals',
    doctorName: 'Dr. Subhash Gupta',
    doctorSlug: 'dr-subhash-gupta',
    savingsPercentage: 92,
    costSavedUsd: '$340,000 Saved',
    treatmentDate: 'June 2026',
    rating: 5,
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    transcript: 'Jambo. My name is Samuel Ochieng from Nairobi, Kenya. I suffered from end-stage liver failure and needed an urgent living donor liver transplant. healthremade handled all legal government committee clearances in Delhi within one week. Dr. Subhash Gupta performed the 12-hour surgery using part of my sister Brenda’s liver. Both our livers regenerated completely, and I am back playing football.',
    description: 'Diagnosed with end-stage chronic liver failure secondary to cirrhosis with refractory ascites and severe jaundice. With liver transplantation services unavailable locally in East Africa and private Western options exceeding $400,000, Samuel traveled to Apollo Hospitals Delhi with his sister Brenda as a prospective living donor. Following rigorous Authorization Committee clearances, Dr. Subhash Gupta successfully executed a 12-hour right lobe living donor liver transplant. Both patient and donor achieved full graft function with complete liver regeneration verified at 6-week follow-up.',
    quote: {
      en: 'In Nairobi, liver transplantation was unavailable and private US quotes exceeded $400,000. Dr. Subhash Gupta at Apollo Delhi gave me a second chance at life. My sister Brenda was my donor, and both of us are in perfect health.',
      ar: 'في نيروبي، لم تكن زراعة الكبد متوفرة وتجاوزت التكاليف في أمريكا 400,000 دولار. منحني الدكتور سوبهاش جوبتا في أبولو دلهي فرصة ثانية للحياة.',
      ru: 'В Найроби пересадка печени была недоступна, а в США стоила более 400 000 долларов. Доктор Субхаш Гупта в клинике Apollo спас мне жизнь.',
      fr: 'À Nairobi, la greffe de foie était indisponible et les devis américains dépassaient 400 000 $. Le Dr Subhash Gupta m’a offert une seconde vie.',
      bn: 'নাইরোবিতে লিভার ট্রান্সপ্লান্টের সুবিধা ছিল না এবং যুক্তরাষ্ট্রে খরচ ছিল ৪ লক্ষ ডলারের বেশি। অ্যাপোলো দিল্লির ড. সুভাষ গুপ্ত আমাকে নতুন জীবন দিয়েছেন।',
      es: 'En Nairobi el trasplante no estaba disponible y en EE. UU. costaba más de $400,000. El Dr. Gupta en Apollo me dio una segunda oportunidad de vida.',
      sw: 'Huko Nairobi upandikizaji wa ini haukuwezekana na gharama za Marekani zilikuwa zaidi ya $400,000. Dkt. Subhash Gupta katika hospitali ya Apollo alinipa maisha mapya.',
      uz: 'Nayrobida jigar transplantatsiyasi imkoni yo‘q edi, AQShda esa 400 000 dollardan oshardi. Doktor Subxash Gupta menga ikkinchi hayotni tuhfa qildi.',
      de: 'In Nairobi gab es keine Lebertransplantation und US-Kliniken verlangten über 400.000 $. Dr. Subhash Gupta bei Apollo schenkte mir ein zweites Leben.',
      tr: 'Nairobi’de karaciğer nakli imkanı yoktu ve ABD fiyatları 400.000 doları aşıyordu. Apollo Hastanesi’nden Dr. Gupta bana ikinci bir hayat verdi.',
    },
    subtitles: {
      en: [
        { id: 1, startTime: 0, endTime: 4, text: 'Jambo. My name is Samuel Ochieng from Nairobi, Kenya.' },
        { id: 2, startTime: 4, endTime: 9, text: 'I suffered from end-stage liver disease and urgently required a living donor transplant.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade guided us through the Indian Authorization Committee legal clearance within one week.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Subhash Gupta performed the 12-hour transplant using 60% of my sister Brenda’s liver.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Both of our livers have regenerated fully. India’s doctors are true lifesavers.' },
      ],
      ar: [
        { id: 1, startTime: 0, endTime: 4, text: 'مرحبًا. اسمي صامويل أوشينغ من نيروبي، كينيا.' },
        { id: 2, startTime: 4, endTime: 9, text: 'كنت أعاني من فشل كبدي في مراحله الأخيرة وكنت بحاجة ماسة لزراعة كبد.' },
        { id: 3, startTime: 9, endTime: 15, text: 'ساعدتنا هيلث ريميد في الحصول على الموافقات القانونية والرسمية خلال أسبوع واحد.' },
        { id: 4, startTime: 15, endTime: 21, text: 'أجرى الدكتور سوبهاش جوبتا الجراحة بنجاح باستخدام جزء من كبد أختي بريندا.' },
        { id: 5, startTime: 21, endTime: 28, text: 'كبدانا تعافيا بالكامل الآن. أطباء الهند هم حقًا منقذو الأرواح.' },
      ],
      ru: [
        { id: 1, startTime: 0, endTime: 4, text: 'Здравствуйте. Меня зовут Сэмюэль Очиенг из Найроби, Кения.' },
        { id: 2, startTime: 4, endTime: 9, text: 'У меня была терминальная стадия печеночной недостаточности, требовалась пересадка.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade помогли нам пройти юридическую комиссию в Индии за одну неделю.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Доктор Субхаш Гупта успешно провел 12-часовую операцию по трансплантации.' },
        { id: 5, startTime: 21, endTime: 28, text: 'И у меня, и у моей сестры печень полностью восстановилась. Спасибо врачам Индии.' },
      ],
      fr: [
        { id: 1, startTime: 0, endTime: 4, text: 'Jambo. Je m’appelle Samuel Ochieng de Nairobi, Kenya.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Je souffrais d’une maladie hépatique terminale et avais besoin d’une greffe urgente.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade nous a accompagnés pour obtenir les autorisations légales en une semaine.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Le Dr Subhash Gupta a réussi la transplantation de 12 heures avec brio.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Nos foies se sont totalement régénérés. Les médecins indiens sauvent des vies.' },
      ],
      bn: [
        { id: 1, startTime: 0, endTime: 4, text: 'জাম্বো। আমি নাইরোবি, কেনিয়া থেকে স্যামুয়েল ওচিয়েং।' },
        { id: 2, startTime: 4, endTime: 9, text: 'আমার লিভার সম্পূর্ণ বিকল হয়ে গিয়েছিল এবং জরুরি প্রতিস্থাপনের প্রয়োজন ছিল।' },
        { id: 3, startTime: 9, endTime: 15, text: 'হেলথরিমেড মাত্র এক সপ্তাহের মধ্যে সব আইনি ছাড়পত্র পেতে সাহায্য করে।' },
        { id: 4, startTime: 15, endTime: 21, text: 'ড. সুভাষ গুপ্ত অত্যন্ত দক্ষতার সাথে ১২ ঘণ্টার জটিল লিভার প্রতিস্থাপন সম্পন্ন করেন।' },
        { id: 5, startTime: 21, endTime: 28, text: 'আমার এবং বোন ব্রেন্ডার লিভার এখন সম্পূর্ণ সুস্থ। ভারতের চিকিৎসকরা দেবতুল্য।' },
      ],
      es: [
        { id: 1, startTime: 0, endTime: 4, text: 'Jambo. Mi nombre es Samuel Ochieng de Nairobi, Kenia.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Padecía una enfermedad hepática terminal y requería un trasplante urgente.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade nos ayudó con todas las aprobaciones legales en solo una semana.' },
        { id: 4, startTime: 15, endTime: 21, text: 'El Dr. Subhash Gupta realizó el trasplante de 12 horas con éxito total.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Nuestros hígados se han regenerado por completo. Médicos excepcionales.' },
      ],
      sw: [
        { id: 1, startTime: 0, endTime: 4, text: 'Jambo. Naitwa Samuel Ochieng kutoka Nairobi, Kenya.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Nilikuwa na ugonjwa mbaya wa ini na nilihitaji upandikizaji wa haraka.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade ilitusaidia kupata vibali vyote vya kisheria ndani ya wiki moja.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dkt. Subhash Gupta alifanya upasuaji wa saa 12 kwa mafanikio makubwa.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Ini langu na la dada yangu Brenda yamepona kabisa. Madaktari wa India ni mashujaa.' },
      ],
      uz: [
        { id: 1, startTime: 0, endTime: 4, text: 'Salom. Mening ismim Semyuel Ochieng, Keniyaning Nayrobi shahridanman.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Jigarim og‘ir ahvolda edi va menga zudlik bilan donorlik transplantatsiyasi kerak edi.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade barcha rasmiy va huquqiy ruxsatnomalarni 1 haftada hal qilib berdi.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Doktor Subxash Gupta 12 soatlik murakkab operatsiyani muvaffaqiyatli yakunladi.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Mening va singlim Brendaning jigari to‘liq tiklandi. Shifokorlarga rahmat.' },
      ],
      de: [
        { id: 1, startTime: 0, endTime: 4, text: 'Jambo. Mein Name ist Samuel Ochieng aus Nairobi, Kenia.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Ich litt an einer Lebererkrankung im Endstadium und brauchte eine Spende.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade half uns, alle behördlichen Genehmigungen in einer Woche zu erhalten.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Subhash Gupta führte die 12-stündige Transplantation meisterhaft durch.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Sowohl meine als auch die Leber meiner Schwester haben sich vollständig regeneriert.' },
      ],
      tr: [
        { id: 1, startTime: 0, endTime: 4, text: 'Merhaba. Ben Kenya Nairobi’den Samuel Ochieng.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Son evre karaciğer yetmezliğim vardı ve acil canlı donör nakli gerekiyordu.' },
        { id: 3, startTime: 9, endTime: 15, text: 'healthremade yasal onay süreçlerini bir hafta içinde tamamlamamızı sağladı.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Subhash Gupta 12 saatlik zorlu nakil ameliyatını başarıyla tamamladı.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Kız kardeşim Brenda ve benim karaciğerimiz tamamen yenilendi. Çok minnettarız.' },
      ],
    },
    fullStory: {
      en: 'Samuel was cleared for air travel after 28 days of close post-op monitoring in Delhi. Liver function tests returned to completely normal levels within 6 weeks.',
    },
  },
  {
    id: 'test_4',
    title: 'Australian Couple Saves $32,000 on Full Mouth All-on-4 Dental Implants in Delhi with Immediate Loading',
    patientName: 'Robert & Claire Turner',
    country: 'Australia',
    countryFlag: '🇦🇺',
    city: 'Melbourne',
    age: 52,
    procedure: 'Full Mouth All-on-4 Dental Implants (Nobel Biocare & Zirconia)',
    specialty: 'Dental Care',
    hospitalName: 'Apollo Dental & Fortis Dental Care',
    hospitalSlug: 'apollo-hospital-delhi',
    doctorName: 'Dr. Himanshu Gupta',
    doctorSlug: 'dr-himanshu-gupta',
    savingsPercentage: 76,
    costSavedUsd: '$32,000 Saved',
    treatmentDate: 'August 2026',
    rating: 5,
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    transcript: 'G’day, I’m Robert Turner from Melbourne, Australia. I had suffered from failing teeth and uncomfortable dentures for over ten years. Australian dentists quoted nearly fifty thousand dollars for full upper and lower reconstruction. Dr. Himanshu Gupta placed Nobel Biocare implants with 3D guided surgery with virtually zero discomfort. We saved $32,000, enjoyed a wonderful 8-day holiday in India, and I can eat steak and smile again with complete confidence.',
    description: 'Presented with generalized advanced periodontitis and multiple failing dentitions, rendering chewing painful and necessitating removable prosthetics for over a decade. After receiving quotes exceeding AUD $48,000 in Melbourne, Robert chose Delhi for dental rehabilitation. Dr. Himanshu Gupta performed 3D CBCT guided surgery to place Swiss Nobel Biocare implants with immediate fixed provisional loading within 48 hours, followed by monolithic Zirconia final bridge delivery on Day 7. Full chewing function and aesthetic smile restored with savings over $32,000.',
    quote: {
      en: 'In Melbourne, dental clinics quoted us $48,000 for full mouth implants. Dr. Himanshu Gupta in Delhi did the complete All-on-4 with Swiss Nobel Biocare implants and monolithic Zirconia for under $9,000. It transformed my life.',
      ar: 'في ملبورن، طلبت العيادات 48,000 دولار لزراعة الأسنان الكاملة. أجرى الدكتور هيمانشو جوبتا في دلهي زراعة All-on-4 بالكامل باستخدام زراعات سويسرية وزركونيا متجانسة بأقل من 9,000 دولار. غير ذلك حياتي بالكامل.',
      ru: 'В Мельбурне нам назвали цену в 48 000 долларов за имплантацию всех зубов. Доктор Химаншу Гупта в Дели провел операцию All-on-4 с имплантами Nobel Biocare менее чем за 9 000 долларов.',
      fr: 'À Melbourne, le devis était de 48 000 $ pour les implants dentaires. Le Dr Himanshu Gupta à Delhi a réalisé le All-on-4 complet avec Nobel Biocare pour moins de 9 000 $. Une transformation totale.',
      bn: 'মেলবোর্নে পুরো মুখের ডেন্টাল ইমপ্ল্যান্টের জন্য ৪৮,০০০ ডলার খরচ চাওয়া হয়েছিল। দিল্লিতে ড. হিমাংশু গুপ্তা নোবেল বায়োকেয়ার ও জারকোনিয়া দিয়ে মাত্র ৯,০০০ ডলারের কমে সফলভাবে কাজটি করেন।',
      es: 'En Melbourne nos presupuestaron $48,000 por implantes dentales completos. El Dr. Himanshu Gupta en Delhi realizó All-on-4 completo con Nobel Biocare por menos de $9,000.',
      sw: 'Huko Melbourne walitaka $48,000 kwa ajili ya upandikizaji wa meno. Dkt. Himanshu Gupta huko Delhi alifanya All-on-4 nzima kwa chini ya $9,000. Imebadilisha maisha yangu.',
      uz: 'Melburnda tish implantatsiyasi 48,000 dollar deb baholangan edi. Delida doktor Xomanshu Gupta Nobel Biocare va Zirconia bilan 9,000 dollardan kamroqqa ajoyib qilib berdi.',
      de: 'In Melbourne verlangten Kliniken 48.000 $ für Vollmundimplantate. Dr. Himanshu Gupta in Delhi führte das All-on-4 mit Nobel Biocare für unter 9.000 $ durch.',
      tr: 'Melbourne’de tam ağız implantlar için 48.000 dolar istendi. Delhi’de Dr. Himanshu Gupta İsviçre Nobel Biocare ile All-on-4 işlemini 9.000 doların altına kusursuz tamamladı.',
    },
    subtitles: {
      en: [
        { id: 1, startTime: 0, endTime: 4, text: 'G’day, I’m Robert Turner from Melbourne, Australia.' },
        { id: 2, startTime: 4, endTime: 9, text: 'I had suffered from failing teeth and uncomfortable dentures for over ten years.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Australian dentists quoted nearly fifty thousand dollars for full upper and lower reconstruction.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Himanshu Gupta placed Nobel Biocare implants with 3D guided surgery with virtually zero discomfort.' },
        { id: 5, startTime: 21, endTime: 28, text: 'We saved $32,000, enjoyed a wonderful 8-day holiday in India, and I can eat steak and smile again.' },
      ],
      ar: [
        { id: 1, startTime: 0, endTime: 4, text: 'مرحبًا، أنا روبرت تورنر من ملبورن، أستراليا.' },
        { id: 2, startTime: 4, endTime: 9, text: 'عانيت من تساقط الأسنان وأطقم الأسنان غير المريحة لأكثر من عشر سنوات.' },
        { id: 3, startTime: 9, endTime: 15, text: 'طلبت العيادات في أستراليا ما يقرب من 50,000 دولار لإعادة تأهيل الفكين بالكامل.' },
        { id: 4, startTime: 15, endTime: 21, text: 'قام الدكتور هيمانشو جوبتا بوضع زراعات نوبل بيوكير بالجراحة الموجهة ثلاثية الأبعاد دون ألم.' },
        { id: 5, startTime: 21, endTime: 28, text: 'وفرنا 32,000 دولار، وقضينا عطلة رائعة لمدة 8 أيام في الهند، وأستطيع الابتسام مجددًا.' },
      ],
      ru: [
        { id: 1, startTime: 0, endTime: 4, text: 'Привет, я Роберт Тернер из Мельбурна, Австралия.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Я мучился с разрушенными зубами и съемными протезами больше 10 лет.' },
        { id: 3, startTime: 9, endTime: 15, text: 'В Австралии стоматологи запросили около пятидесяти тысяч долларов.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Доктор Химаншу Гупта установил импланты Nobel Biocare по 3D-направленному протоколу.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Мы сэкономили 32 000 долларов, отлично провели 8 дней в Индии, и я снова уверенно улыбаюсь.' },
      ],
      fr: [
        { id: 1, startTime: 0, endTime: 4, text: 'Bonjour, je m’appelle Robert Turner de Melbourne, Australie.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Je souffrais de problèmes dentaires sévères depuis plus de dix ans.' },
        { id: 3, startTime: 9, endTime: 15, text: 'En Australie, le devis était de près de cinquante mille dollars.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Le Dr Himanshu Gupta a posé des implants Nobel Biocare avec chirurgie guidée en 3D.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Nous avons économisé 32 000 $, et j’ai retrouvé un sourire éclatant et ma joie de vivre.' },
      ],
      bn: [
        { id: 1, startTime: 0, endTime: 4, text: 'নমস্কার, আমি অস্ট্রেলিয়ার মেলবোর্ন থেকে রবার্ট টার্নার।' },
        { id: 2, startTime: 4, endTime: 9, text: 'আমি দশ বছরেরও বেশি সময় ধরে দাঁতের ব্যথায় ভুগেছি।' },
        { id: 3, startTime: 9, endTime: 15, text: 'অস্ট্রেলিয়ায় দুটি চোয়াল ঠিক করতে প্রায় ৫০,০০০ ডলার চাওয়া হয়েছিল।' },
        { id: 4, startTime: 15, endTime: 21, text: 'দিল্লিতে ড. হিমাংশু গুপ্তা থ্রি-ডি গাইডেড সার্জারি দিয়ে অত্যন্ত নিখুঁতভাবে ইমপ্ল্যান্ট বসান।' },
        { id: 5, startTime: 21, endTime: 28, text: 'আমরা ৩২,০০০ ডলার সাশ্রয় করেছি এবং আমি আবার আগের মতো হাসতে পারছি।' },
      ],
      es: [
        { id: 1, startTime: 0, endTime: 4, text: 'Hola, soy Robert Turner de Melbourne, Australia.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Sufrí con dentaduras postizas incómodas durante más de 10 años.' },
        { id: 3, startTime: 9, endTime: 15, text: 'En Australia me presupuestaron cerca de 50,000 dólares.' },
        { id: 4, startTime: 15, endTime: 21, text: 'El Dr. Himanshu Gupta colocó implantes Nobel Biocare con cirugía guiada en 3D.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Ahorramos $32,000, disfrutamos un viaje hermoso y puedo sonreír con total confianza.' },
      ],
      sw: [
        { id: 1, startTime: 0, endTime: 4, text: 'Habari, naitwa Robert Turner kutoka Melbourne, Australia.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Nilikuwa na shida ya meno kwa zaidi ya miaka kumi.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Huko Australia daktari alitaka karibu dola elfu hamsini.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dkt. Himanshu Gupta aliweka vipandikizi vya Nobel Biocare bila maumivu yoyote.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Tulihifadhi $32,000 na nimerudisha tabasamu langu zuri.' },
      ],
      uz: [
        { id: 1, startTime: 0, endTime: 4, text: 'Salom, men Avstraliyaning Melburn shahridan Robert Terner.' },
        { id: 2, startTime: 4, endTime: 9, text: 'O‘n yildan ortiq tish muammolari bilan qiynaldim.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Avstraliyada to‘liq tish davolash 50,000 dollar deb aytildi.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Doktor Xomanshu Gupta 3D raqamli texnologiyalar bilan ajoyib implantlar o‘rnatdi.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Biz 32,000 dollar tejadik va men yana bemalol jilmayish imkoniyatiga egaman.' },
      ],
      de: [
        { id: 1, startTime: 0, endTime: 4, text: 'Hallo, ich bin Robert Turner aus Melbourne, Australien.' },
        { id: 2, startTime: 4, endTime: 9, text: 'Ich litt über zehn Jahre lang unter schlechten Zähnen und lockeren Prothesen.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Australische Zahnärzte veranschlagten fast 50.000 $.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Himanshu Gupta setzte Nobel Biocare-Implantate mit 3D-Führung schmerzfrei ein.' },
        { id: 5, startTime: 21, endTime: 28, text: 'Wir sparten 32.000 $ und ich kann endlich wieder mit Stolz lächeln.' },
      ],
      tr: [
        { id: 1, startTime: 0, endTime: 4, text: 'Merhaba, ben Melbourne Avustralya’dan Robert Turner.' },
        { id: 2, startTime: 4, endTime: 9, text: 'On yıldan uzun süredir diş problemleri ve takma dişlerle mücadele ediyordum.' },
        { id: 3, startTime: 9, endTime: 15, text: 'Avustralya’da tam çene implant tedavisi için 50.000 dolara yakın istendi.' },
        { id: 4, startTime: 15, endTime: 21, text: 'Dr. Himanshu Gupta 3D rehberli cerrahi ile Nobel Biocare implantları acısız uyguladı.' },
        { id: 5, startTime: 21, endTime: 28, text: '32.000 dolar tasarruf ettik ve yeniden güvenle gülümseyebiliyorum.' },
      ],
    },
    fullStory: {
      en: 'Robert completed his All-on-4 upper and lower restoration in Delhi over an 8-day stay. Digital impressions and immediate temporary loading gave him full functional teeth in 48 hours.',
    },
  },
]
