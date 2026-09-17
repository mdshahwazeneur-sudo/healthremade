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
  cloudflareStreamId: string // Cloudflare Stream Video UID
  fallbackVideoUrl: string // High-res MP4 preview stream
  quote: Record<string, string> // Translated quotes by language code
  subtitles: Record<string, SubtitleCue[]> // Dynamic synchronized subtitle tracks
  fullStory: Record<string, string>
}

export const PATIENT_TESTIMONIALS: PatientTestimonial[] = [
  {
    id: 'test_1',
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
    cloudflareStreamId: '6b24d775df5832a89045fa7d88582736',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
    cloudflareStreamId: 'c149b5c2a12903848df749c928419385',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
    cloudflareStreamId: '8f19c3b8a9201948ef12849c09182749',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
]
