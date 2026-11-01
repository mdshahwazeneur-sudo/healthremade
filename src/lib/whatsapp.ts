/**
 * WhatsApp integration utility for Healthremade.
 * Generates curated, pre-filled WhatsApp links localized into the patient's active language.
 */

export const WHATSAPP_NUMBER = "919990045006"; // Dedicated WhatsApp Care Coordinator number

export interface WhatsAppContext {
  pageType?: 'home' | 'treatment' | 'hospital' | 'pricing' | 'doctors' | 'visa' | 'how-we-work' | 'outcomes' | 'general';
  treatmentName?: string;
  hospitalName?: string;
  city?: string;
  sourceUrl?: string;
  customMessage?: string;
  lang?: string;
}

/**
 * Helper to determine currently active language on client side
 */
export function getActiveClientLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem('healthremade_lang');
    if (saved) return saved.toLowerCase();
    // Check google translation cookie
    const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    if (match && match[1]) return match[1].toLowerCase();
  } catch (e) {
    // ignore
  }
  return 'en';
}

/**
 * Generate a localized pre-filled WhatsApp message based on context and language.
 */
export function getWhatsAppMessage(context?: WhatsAppContext): string {
  if (context?.customMessage) {
    return context.customMessage;
  }

  const lang = (context?.lang || getActiveClientLanguage()).toLowerCase();
  const treatment = context?.treatmentName;
  const hospital = context?.hospitalName;
  const city = context?.city;

  // 1. Bengali (বাংলা)
  if (lang === 'bn') {
    if (treatment && hospital) {
      return `নমস্কার Healthremade! আমি ${hospital} হাসপাতালে ${treatment} চিকিৎসার আনুমানিক খরচ এবং বিশেষজ্ঞ ডাক্তারের পরামর্শ পেতে চাই।`;
    }
    if (treatment) {
      return `নমস্কার Healthremade! আমি ভারতে ${treatment} চিকিৎসার জন্য শীর্ষ হাসপাতালের বিকল্প এবং প্যাকেজ খরচের তালিকা জানতে চাই।`;
    }
    if (hospital) {
      const cityText = city ? ` (${city})` : '';
      return `নমস্কার Healthremade! আমি ${hospital}${cityText} হাসপাতালে চিকিৎসা ও বিশেষজ্ঞ ডাক্তারের অ্যাপয়েন্টমেন্ট সম্পর্কে জানতে চাই।`;
    }
    switch (context?.pageType) {
      case 'doctors':
        return `নমস্কার Healthremade! আমি ভারতের শীর্ষ বিশেষজ্ঞ ডাক্তার ও অভিজ্ঞ সার্জনদের কাছ থেকে পরামর্শ ও দ্বিতীয় মতামত নিতে চাই।`;
      case 'pricing':
        return `নমস্কার Healthremade! আমি ভারতের ৩+ শীর্ষ স্বীকৃত হাসপাতাল থেকে চিকিৎসার বিস্তারিত খরচের তুলনা পেতে চাই।`;
      case 'visa':
        return `নমস্কার Healthremade! ভারতীয় মেডিকেল ভিসা (MED), হাসপাতালের ভিসা আমন্ত্রণপত্র এবং ভ্রমণের জন্য আমার সাহায্য প্রয়োজন।`;
      case 'how-we-work':
        return `নমস্কার Healthremade! আমি ভারতে চিকিৎসার সম্পূর্ণ প্রক্রিয়া জানতে চাই এবং কেয়ার কোঅর্ডিনেটরের সাথে কথা বলতে চাই।`;
      case 'home':
      default:
        return `নমস্কার Healthremade! আমি ভারতে চিকিৎসার জন্য হাসপাতালের পরামর্শ এবং বিনামূল্যে বিশেষজ্ঞ ডাক্তারের মতামত পেতে চাই।`;
    }
  }

  // 2. Arabic (العربية)
  if (lang === 'ar') {
    if (treatment && hospital) {
      return `مرحباً Healthremade! أود الحصول على تقدير التكلفة واستشارة طبية لـ *${treatment}* في مستشفى *${hospital}*.`;
    }
    if (treatment) {
      return `مرحباً Healthremade! أبحث عن خيارات المستشفيات وتكلفة باقة علاج *${treatment}* في الهند.`;
    }
    if (hospital) {
      const cityText = city ? ` في ${city}` : '';
      return `مرحباً Healthremade! أود الاستفسار عن العلاجات وحجز موعد طبي في مستشفى *${hospital}*${cityText}.`;
    }
    switch (context?.pageType) {
      case 'doctors':
        return `مرحباً Healthremade! أبحث عن استشارة ورأي طبي ثانٍ من كبار الجراحين والأطباء المعتمدين في الهند.`;
      case 'pricing':
        return `مرحباً Healthremade! أود الحصول على تقدير تكلفة مفصل ومقارنة بين 3+ مستشفيات هندية رائدة ومعتمدة.`;
      case 'visa':
        return `مرحباً Healthremade! أحتاج إلى مساعدة بخصوص التأشيرة الطبية الهندية (MED) وخطاب الدعوة من المستشفى وترتيبات السفر.`;
      case 'home':
      default:
        return `مرحباً Healthremade! أبحث عن العلاج الطبي في الهند. يرجى تزويدي بتوصيات المستشفيات ورأي طبي مجاني من كبار الأطباء.`;
    }
  }

  // 3. Russian (Русский)
  if (lang === 'ru') {
    if (treatment && hospital) {
      return `Здравствуйте, Healthremade! Я хочу получить предварительный расчет стоимости и консультацию по *${treatment}* в клинике *${hospital}*.`;
    }
    if (treatment) {
      return `Здравствуйте, Healthremade! Я ищу варианты клиник, врачей и стоимость лечения (*${treatment}*) в Индии.`;
    }
    if (hospital) {
      const cityText = city ? ` (${city})` : '';
      return `Здравствуйте, Healthremade! Хочу узнать о лечении и записи к врачу в клинике *${hospital}*${cityText}.`;
    }
    switch (context?.pageType) {
      case 'doctors':
        return `Здравствуйте, Healthremade! Мне нужна консультация и второе медицинское мнение от ведущих врачей и хирургов Индии.`;
      case 'pricing':
        return `Здравствуйте, Healthremade! Хочу получить сравнительный расчет стоимости лечения от 3+ ведущих аккредитованных клиник Индии.`;
      case 'visa':
        return `Здравствуйте, Healthremade! Мне требуется помощь в оформлении медицинской визы в Индию (MED) и приглашения от клиники.`;
      case 'home':
      default:
        return `Здравствуйте, Healthremade! Я ищу медицинское лечение в Индии. Пожалуйста, помогите с рекомендациями больниц и бесплатным заключением врача.`;
    }
  }

  // 4. French (Français)
  if (lang === 'fr') {
    if (treatment && hospital) {
      return `Bonjour Healthremade! Je souhaite obtenir un devis estimatif et une consultation médicale pour *${treatment}* à l'hôpital *${hospital}*.`;
    }
    if (treatment) {
      return `Bonjour Healthremade! Je recherche des options d'hôpitaux, de chirurgiens et un devis de prise en charge pour *${treatment}* en Inde.`;
    }
    if (hospital) {
      const cityText = city ? ` à ${city}` : '';
      return `Bonjour Healthremade! J'aimerais me renseigner sur les traitements et rendez-vous médicaux à l'hôpital *${hospital}*${cityText}.`;
    }
    switch (context?.pageType) {
      case 'doctors':
        return `Bonjour Healthremade! Je souhaite obtenir un deuxième avis médical auprès de chirurgiens et spécialistes accrédités en Inde.`;
      case 'pricing':
        return `Bonjour Healthremade! Je souhaite recevoir une comparaison détaillée des coûts auprès de 3+ hôpitaux indiens accrédités.`;
      case 'visa':
        return `Bonjour Healthremade! J'ai besoin d'aide pour le visa médical indien (MED), la lettre d'invitation de l'hôpital et l'organisation du voyage.`;
      case 'home':
      default:
        return `Bonjour Healthremade! Je recherche un traitement médical en Inde. Merci de m'orienter vers les meilleurs hôpitaux avec un avis médical gratuit.`;
    }
  }

  // 5. Swahili (Kiswahili)
  if (lang === 'sw') {
    if (treatment && hospital) {
      return `Habari Healthremade! Ningependa kupata makadirio ya gharama na mashauriano ya daktari kwa ajili ya *${treatment}* katika hospitali ya *${hospital}*.`;
    }
    if (treatment) {
      return `Habari Healthremade! Ninatafuta hospitali bora na makadirio ya gharama za matibabu ya *${treatment}* nchini India.`;
    }
    if (hospital) {
      return `Habari Healthremade! Ningependa kuulizia kuhusu matibabu na miadi ya daktari katika hospitali ya *${hospital}*.`;
    }
    return `Habari Healthremade! Ninatafuta matibabu nchini India. Tafadhali nisaidie kupata mapendekezo ya hospitali na maoni ya daktari bila malipo.`;
  }

  // 6. Uzbek (Oʻzbekcha)
  if (lang === 'uz') {
    if (treatment && hospital) {
      return `Assalomu alaykum Healthremade! *${hospital}* shifoxonasida *${treatment}* muolajasi bo'yicha narxlar hisobini va shifokor maslahatini olmoqchiman.`;
    }
    if (treatment) {
      return `Assalomu alaykum Healthremade! Hindistonda *${treatment}* davolanishi uchun eng yaxshi shifoxonalar va narxlar haqida ma'lumot olmoqchiman.`;
    }
    if (hospital) {
      return `Assalomu alaykum Healthremade! *${hospital}* shifoxonasida davolanish va qabulga yozilish haqida ma'lumot bera olasizmi?`;
    }
    return `Assalomu alaykum Healthremade! Hindistonda davolanish uchun shifoxonalar tavsiyasi va yetakchi shifokorlarning bepul xulosasini olishda yordam bering.`;
  }

  // 7. Romanian (Română)
  if (lang === 'ro') {
    if (treatment && hospital) {
      return `Bună ziua Healthremade! Aș dori să primesc o estimare de preț și o consultație medicală pentru *${treatment}* la spitalul *${hospital}*.`;
    }
    if (treatment) {
      return `Bună ziua Healthremade! Caut opțiuni de spitale și pachete de preț pentru *${treatment}* în India.`;
    }
    return `Bună ziua Healthremade! Caut tratament medical în India. Vă rog să mă ajutați cu recomandări de spitale și o a doua opinie medicală gratuită.`;
  }

  // 8. Portuguese (Português)
  if (lang === 'pt') {
    if (treatment && hospital) {
      return `Olá Healthremade! Gostaria de receber um orçamento e uma consulta médica para *${treatment}* no hospital *${hospital}*.`;
    }
    if (treatment) {
      return `Olá Healthremade! Procuro opções de hospitais e estimativas de custos para *${treatment}* na Índia.`;
    }
    return `Olá Healthremade! Procuro tratamento médico na Índia. Por favor, ajudem-me com recomendações de hospitais e uma opinião médica gratuita.`;
  }

  // 9. Spanish (Español)
  if (lang === 'es') {
    if (treatment && hospital) {
      return `¡Hola Healthremade! Me gustaría recibir una estimación de costos y consulta médica para *${treatment}* en el hospital *${hospital}*.`;
    }
    if (treatment) {
      return `¡Hola Healthremade! Busco opciones de hospitales y paquetes de precios para *${treatment}* en la India.`;
    }
    return `¡Hola Healthremade! Busco tratamiento médico en la India. Por favor, ayúdenme con recomendaciones de hospitales y una segunda opinión médica gratuita.`;
  }

  // 10. German (Deutsch)
  if (lang === 'de') {
    if (treatment && hospital) {
      return `Hallo Healthremade! Ich möchte einen Kostenvoranschlag und eine ärztliche Beratung für *${treatment}* im Krankenhaus *${hospital}* erhalten.`;
    }
    return `Hallo Healthremade! Ich suche eine medizinische Behandlung in Indien. Bitte unterstützen Sie mich mit Empfehlungen für Kliniken und einer kostenlosen Zweitmeinung.`;
  }

  // 11. Turkish (Türkçe)
  if (lang === 'tr') {
    if (treatment && hospital) {
      return `Merhaba Healthremade! *${hospital}* hastanesinde *${treatment}* için fiyat teklifi ve doktor danışmanlığı almak istiyorum.`;
    }
    return `Merhaba Healthremade! Hindistan'da tıbbi tedavi arıyorum. Lütfen en iyi hastane önerileri ve ücretsiz uzman doktor görüşü konusunda yardımcı olun.`;
  }

  // 12. English (en) - Default
  if (treatment && hospital) {
    return `Hello healthremade! I would like to get a cost estimate and doctor consultation for *${treatment}* at *${hospital}*.`;
  }

  if (treatment) {
    return `Hello healthremade! I am looking for hospital options, doctors, and package price estimates for *${treatment}* in India.`;
  }

  if (hospital) {
    const citySuffix = city ? ` in ${city}` : '';
    return `Hello healthremade! I would like to enquire about treatments and doctor appointments at *${hospital}*${citySuffix}.`;
  }

  switch (context?.pageType) {
    case 'doctors':
      return `Hello healthremade! I am looking for consultations and second opinions from top accredited doctors and surgeons in India.`;
    case 'pricing':
      return `Hello healthremade! I am browsing the Pricing Explorer and would like to get an itemized cost estimate from 3+ top accredited Indian hospitals.`;
    case 'visa':
      return `Hello healthremade! I need assistance with the Indian Medical Visa (MED), embassy invitation letter, and travel arrangements.`;
    case 'how-we-work':
      return `Hello healthremade! I'd like to understand the patient pathway and speak with a care coordinator about medical treatment in India.`;
    case 'outcomes':
      return `Hello healthremade! I would like to see verified patient outcomes and hospital recommendations for my medical condition.`;
    case 'home':
    default:
      return `Hello healthremade! I am seeking medical treatment in India. Please help me with hospital recommendations and a free medical opinion.`;
  }
}

/**
 * Generate a direct WhatsApp click-to-chat URL.
 */
export function getWhatsAppUrl(context?: WhatsAppContext): string {
  const message = getWhatsAppMessage(context);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
