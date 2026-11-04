import { AlertItem, Volunteer, IncidentReport, Campaign, VolunteerHourRecord, AwarenessGuide } from '../types';

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-001',
    title: 'إنذار عاجل: حريق غابات في منطقة تاكسنة',
    level: 'urgent',
    category: 'fire',
    location: 'غابات تاكسنة - ولاية جيجل',
    region: 'تاكسنة',
    timestamp: 'اليوم - 10:45',
    description: 'نشوب حريق غابي كثيف في الأحراش الجبلية بتاكسنة بفعل الرياح الجافة. فرق الحماية المدنية تتدخل حالياً للسيطرة على بؤر النيران.',
    recommendations: [
      'تجنب الاقتراب تماماً من محيط الغابة المشتعلة',
      'إخلاء المنازل والمزارع المجاورة في حال صدور توجيهات من الحماية المدنية',
      'الاتصال الفوري بالرقم الأخضر للحماية المدنية 14',
      'إغلاق النوافذ والمنافذ لتفادي استنشاق الدخان السام'
    ],
    active: true,
    source: 'الحماية المدنية وخلية الأزمة بولاية جيجل'
  },
  {
    id: 'alt-002',
    title: 'تحذير: رياح قوية وهبات سريعة متوقعة',
    level: 'warning',
    category: 'wind',
    location: 'الشريط الساحلي والمناطق المرتفعة - جيجل والعوانة',
    region: 'جيجل / العوانة',
    timestamp: 'اليوم - 08:30',
    description: 'نشرة جوية خاصة تحذر من هبوب رياح قوية تتجاوز سرعتها 75 كم/سا مع اضطراب وهيجان ملحوظ للبحر وتطاير الأجسام الخفيفة.',
    recommendations: [
      'تثبيت الأجسام القابلة للتطاير فوق أسطح المنازل والشرفات',
      'تجنب الإبحار والملاحة والصيد البحري تماماً',
      'الابتعاد عن الأشجار الكبيرة والأعمدة الكهربائية واللوحات الإشهارية',
      'الحذر الشديد أثناء قيادة المركبات على الطرقات الساحلية والجبلية'
    ],
    active: true,
    source: 'الديوان الوطني للأرصاد الجوية'
  },
  {
    id: 'alt-003',
    title: 'تنبيه: ارتفاع ملحوظ في درجات الحرارة',
    level: 'notice',
    category: 'heat',
    location: 'المناطق الداخلية والسهلية - الميلية، قاوس، العنصر',
    region: 'الميلية / قاوس',
    timestamp: 'اليوم - 08:00',
    description: 'ارتفاع قياسي في درجات الحرارة يصل إلى 41 درجة مئوية مع رطوبة منخفضة، مما يرفع احتمالية الإجهاد الحراري والحرائق العرضية.',
    recommendations: [
      'تجنب الخروج تحت أشعة الشمس المباشرة وقت الذروة (11:00 - 16:00)',
      'شرب كميات وافرة من الماء والسوائل بانتظام للأطفال وكبار السن',
      'الحرص على تهوية الأماكن المغلقة ومراقبة أجهزة التبريد',
      'عدم ترك القوارير الزجاجية أو المواد القابلة للاشتعال في السيارات'
    ],
    active: true,
    source: 'مديرية الصحة والسكان لولاية جيجل'
  },
  {
    id: 'alt-004',
    title: 'عادي: حالة جوية مستقرة ونشاط اعتيادي',
    level: 'normal',
    category: 'general',
    location: 'عموم إقليم ولاية جيجل',
    region: 'جيجل',
    timestamp: 'اليوم - 07:00',
    description: 'استقرار الأوضاع في معظم بلديات الولاية، ومواصلة برامج العمل التطوعي والأنشطة الشبابية الدورية.',
    recommendations: [
      'متابعة النشرات الدورية عبر المنصة',
      'المشاركة في المبادرات التطوعية المجتمعية',
      'تحديث بيانات التوفر داخل الحساب الشخصي'
    ],
    active: false,
    source: 'ديوان مؤسسات الشباب - جيجل'
  }
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-101',
    nationalId: 'DZ-VOL-18-0492',
    name: 'محمد بوطالب',
    phone: '05 50 12 34 56',
    email: 'm.boutaleb@sanad-alert.dz',
    wilaya: 'جيجل',
    commune: 'العوانة',
    address: 'حي الكهوف العجيبة، العوانة',
    specialty: 'first_aid',
    specialtyLabel: 'إسعافات أولية وإنقاذ',
    secondarySpecialties: ['disaster_resp', 'search_rescue'],
    rating: 4.9,
    totalHours: 1250,
    isAvailableNow: true,
    availabilitySchedule: {
      saturday: 'متاح كامل اليوم',
      sunday: 'متاح بعد 14:00',
      monday: 'غير متاح (عمل)',
      tuesday: 'متاح مساءً من 16:00',
      wednesday: 'متاح مساءً من 16:00',
      thursday: 'متاح كامل اليوم',
      friday: 'متاح صباحاً'
    },
    institution: 'ديوان مؤسسات الشباب لولاية جيجل',
    interventionsCount: 18,
    certificationsCount: 6,
    distanceMeters: 450,
    coordinates: { x: 34, y: 46 }
  },
  {
    id: 'vol-102',
    nationalId: 'DZ-VOL-18-0811',
    name: 'أحمد كواش',
    phone: '06 61 78 90 12',
    email: 'a.kouache@sanad-alert.dz',
    wilaya: 'جيجل',
    commune: 'الميلية',
    address: 'قرب المركب الرياضي الجواري حمدلو عبد السلام، الميلية',
    specialty: 'search_rescue',
    specialtyLabel: 'بحث وإنقاذ واستجابة ميدانية',
    secondarySpecialties: ['first_aid', 'logistics'],
    rating: 4.8,
    totalHours: 2640,
    isAvailableNow: true,
    availabilitySchedule: {
      saturday: 'متاح',
      sunday: 'متاح',
      monday: 'متاح بعد 15:00',
      tuesday: 'متاح بعد 15:00',
      wednesday: 'متاح',
      thursday: 'متاح',
      friday: 'متاح كامل اليوم'
    },
    institution: 'المركب الرياضي الجواري حمدلو عبد السلام الميلية',
    interventionsCount: 29,
    certificationsCount: 8,
    distanceMeters: 780,
    coordinates: { x: 78, y: 58 }
  },
  {
    id: 'vol-103',
    nationalId: 'DZ-VOL-18-0245',
    name: 'نورة دسدوس',
    phone: '07 72 34 56 78',
    email: 'n.desdous@sanad-alert.dz',
    wilaya: 'جيجل',
    commune: 'جيجل مركز',
    address: 'شارع 1 نوفمبر، وسط مدينة جيجل',
    specialty: 'psychological',
    specialtyLabel: 'دعم نفسي واجتماعي',
    secondarySpecialties: ['media_pr', 'disaster_resp'],
    rating: 5.0,
    totalHours: 5120, // Reached 5000 hours milestone!
    isAvailableNow: true,
    availabilitySchedule: {
      saturday: 'متاحة كامل اليوم',
      sunday: 'متاحة',
      monday: 'متاحة صباحاً',
      tuesday: 'متاحة مساءً',
      wednesday: 'متاحة',
      thursday: 'متاحة كامل اليوم',
      friday: 'غير متاحة'
    },
    institution: 'ديوان مؤسسات الشباب لولاية جيجل',
    interventionsCount: 42,
    certificationsCount: 11,
    distanceMeters: 1200,
    coordinates: { x: 48, y: 35 }
  },
  {
    id: 'vol-104',
    nationalId: 'DZ-VOL-18-0914',
    name: 'آية حميمد',
    phone: '05 55 99 88 77',
    email: 'a.hamimed@sanad-alert.dz',
    wilaya: 'جيجل',
    commune: 'الشقفة',
    address: 'حي الشهداء، الشقفة',
    specialty: 'environment',
    specialtyLabel: 'بيئة وتشجير واستدامة',
    secondarySpecialties: ['logistics', 'it_digital'],
    rating: 4.9,
    totalHours: 1840,
    isAvailableNow: false,
    availabilitySchedule: {
      saturday: 'متاحة',
      sunday: 'أيام الدراسة غير متاحة',
      monday: 'أيام الدراسة غير متاحة',
      tuesday: 'متاحة بعد 14:00',
      wednesday: 'أيام الدراسة غير متاحة',
      thursday: 'متاحة',
      friday: 'متاحة كامل اليوم'
    },
    institution: 'دار الشباب الشقفة',
    interventionsCount: 22,
    certificationsCount: 5,
    distanceMeters: 2400,
    coordinates: { x: 62, y: 44 }
  },
  {
    id: 'vol-105',
    nationalId: 'DZ-VOL-18-0112',
    name: 'كريم سحنون',
    phone: '06 63 11 22 33',
    email: 'k.sahnoun@sanad-alert.dz',
    wilaya: 'جيجل',
    commune: 'تاكسنة',
    address: 'المدخل الجنوبي، تاكسنة',
    specialty: 'logistics',
    specialtyLabel: 'لوجستيك وإغاثة ميدانية',
    secondarySpecialties: ['search_rescue'],
    rating: 4.7,
    totalHours: 920,
    isAvailableNow: true,
    availabilitySchedule: {
      saturday: 'متاح',
      sunday: 'متاح',
      monday: 'متاح',
      tuesday: 'متاح',
      wednesday: 'متاح',
      thursday: 'متاح',
      friday: 'متاح'
    },
    institution: 'المركب الرياضي الجواري تاكسنة',
    interventionsCount: 15,
    certificationsCount: 4,
    distanceMeters: 3100,
    coordinates: { x: 44, y: 62 }
  },
  {
    id: 'vol-106',
    nationalId: 'DZ-VOL-18-0553',
    name: 'صلاح الدين بوزيد',
    phone: '07 70 88 44 22',
    email: 's.bouzid@sanad-alert.dz',
    wilaya: 'جيجل',
    commune: 'قاوس',
    address: 'حي 20 أوت، قاوس',
    specialty: 'it_digital',
    specialtyLabel: 'إعلام آلي ورقمنة وتنسيق اتصالات',
    secondarySpecialties: ['media_pr'],
    rating: 4.9,
    totalHours: 640,
    isAvailableNow: true,
    availabilitySchedule: {
      saturday: 'متاح مسائي',
      sunday: 'متاح بعد 17:00',
      monday: 'متاح بعد 17:00',
      tuesday: 'متاح بعد 17:00',
      wednesday: 'متاح بعد 17:00',
      thursday: 'متاح',
      friday: 'متاح كامل اليوم'
    },
    institution: 'ديوان مؤسسات الشباب - قاوس',
    interventionsCount: 9,
    certificationsCount: 3,
    distanceMeters: 1800,
    coordinates: { x: 52, y: 51 }
  }
];

export const INITIAL_REPORTS: IncidentReport[] = [
  {
    id: 'rep-901',
    type: 'تصاعد أدخنة كثيفة ونار غابية',
    category: 'fire',
    location: 'منحدرات جبل قرقور - تاكسنة',
    commune: 'تاكسنة',
    description: 'شوهد انبعاث دخان كثيف وألسنة لهب تتصاعد في مرتفعات تاكسنة بالقرب من مساكن ريفية متفرقة.',
    time: '10:15',
    reporterName: 'المواطن: عبد النور ب.',
    reporterPhone: '06 62 44 55 66',
    status: 'dispatched',
    severity: 'urgent',
    coordinates: { x: 45, y: 60 }
  },
  {
    id: 'rep-902',
    type: 'انسداد بالوعات وتجمع مياه أمطار غزيرة',
    category: 'flood',
    location: 'المدخل الشرقي لبلدية الشقفة',
    commune: 'الشقفة',
    description: 'تجمع كميات كبيرة من المياه الطينية في الطريق الوطني مما تسبب في شل حركة المرور جزئياً.',
    time: '09:20',
    reporterName: 'المتطوع: فريد ز.',
    reporterPhone: '05 51 33 22 11',
    status: 'verified',
    severity: 'warning',
    coordinates: { x: 65, y: 45 }
  },
  {
    id: 'rep-903',
    type: 'سقوط عمود إنارة على حافة الطريق بسبب الرياح',
    category: 'weather',
    location: 'كورنيش العوانة - بالقرب من الميناء الترفيهي',
    commune: 'العوانة',
    description: 'سقوط جزئي لعمود كهربائي جراء هبات الرياح البحرية القوية دون تسجيل إصابات بشرية.',
    time: '08:45',
    reporterName: 'المواطنة: مريم ك.',
    status: 'dispatched',
    severity: 'notice',
    coordinates: { x: 32, y: 42 }
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp-01',
    title: 'الحملة الكبرى لغرس 3000 شجيرة بمناطق تاكسنة المتضررة',
    category: 'afforestation',
    categoryLabel: 'حملة تشجير وإعادة تأهيل',
    location: 'غابات تاكسنة - ولاية جيجل',
    commune: 'تاكسنة',
    date: 'السبت القادم 09:00',
    time: '09:00 صباحاً',
    durationHours: 6,
    neededVolunteers: 25,
    registeredVolunteers: 18,
    organizer: 'ديوان مؤسسات الشباب بالتنسيق مع محافظة الغابات',
    description: 'مبادرة شبابية تهدف إلى غرس أشجار الصنوبر والأرز في المناطق الغابية المتضررة، مع توفير كل العتاد والوجبات.',
    targetSpecialties: ['environment', 'logistics', 'first_aid'],
    status: 'upcoming',
    coordinates: { x: 43, y: 63 }
  },
  {
    id: 'cmp-02',
    title: 'مبادرة تنظيف شاطئ الكهوف العجيبة والمحيط الساحلي',
    category: 'coastal',
    categoryLabel: 'تنظيف الشواطئ وحماية البيئة',
    location: 'الكهوف العجيبة، العوانة',
    commune: 'العوانة',
    date: 'الجمعة 14:30',
    time: '14:30 بعد الزوال',
    durationHours: 4,
    neededVolunteers: 30,
    registeredVolunteers: 26,
    organizer: 'نادي رواد الساحل الشرفي - دار الشباب العوانة',
    description: 'تنظيف الشاطئ الصخري وفرز النفايات البلاستيكية لحماية التنوع البيئي والحظيرة الوطنية لتازة.',
    targetSpecialties: ['environment', 'media_pr'],
    status: 'upcoming',
    coordinates: { x: 30, y: 44 }
  },
  {
    id: 'cmp-03',
    title: 'حملة التبرع بالدم بالتنسيق مع بنك الدم ومستشفى بشير بومعزة',
    category: 'blood_donation',
    categoryLabel: 'حملة تبرع بالدم وتضامن صحي',
    location: 'المركب الرياضي الجواري حمدلو عبد السلام - الميلية',
    commune: 'الميلية',
    date: 'الإثنين 08:30',
    time: '08:30 إلى 13:00',
    durationHours: 5,
    neededVolunteers: 15,
    registeredVolunteers: 12,
    organizer: 'المركب الرياضي الجواري الميلية وجمعية أصدقاء المريض',
    description: 'تأطير واستقبال المتبرعين بالدم لفائدة مصالح الجراحة ومستشفيات الولاية بالتنسيق مع الفرق الطبية.',
    targetSpecialties: ['first_aid', 'psychological', 'logistics'],
    status: 'upcoming',
    coordinates: { x: 79, y: 57 }
  },
  {
    id: 'cmp-04',
    title: 'دورة تكوينية ميدانية: الإسعافات الأولية والتصرف أثناء الكوارث',
    category: 'first_aid_training',
    categoryLabel: 'دورات إسعاف وتدريبات كوارث',
    location: 'ديوان مؤسسات الشباب - مقر ولاية جيجل',
    commune: 'جيجل مركز',
    date: 'الثلاثاء 09:00',
    time: '09:00 إلى 15:00',
    durationHours: 6,
    neededVolunteers: 40,
    registeredVolunteers: 38,
    organizer: 'وحدة الحماية المدنية لولاية جيجل بالاشتراك مع ODEJ',
    description: 'تدريب عملي ومحاكاة حية على عمليات الإنقاذ السريع، معالجة الحروق، والإنعاش القلبي الرئوي للمتطوعين المعتمدين.',
    targetSpecialties: ['first_aid', 'disaster_resp', 'search_rescue'],
    status: 'upcoming',
    coordinates: { x: 49, y: 34 }
  }
];

export const INITIAL_HOURS_LOG: VolunteerHourRecord[] = [
  {
    id: 'hr-001',
    volunteerId: 'vol-101',
    campaignTitle: 'حملة تشجير مرتفعات تاكسنة والميلية',
    date: '2026-10-18',
    hours: 5,
    institution: 'ديوان مؤسسات الشباب جيجل',
    approved: true,
    category: 'بيئة وتشجير'
  },
  {
    id: 'hr-002',
    volunteerId: 'vol-101',
    campaignTitle: 'حملة تنظيف شواطئ العوانة وزيامة',
    date: '2026-10-25',
    hours: 4,
    institution: 'دار الشباب العوانة',
    approved: true,
    category: 'نظافة ومحيط'
  },
  {
    id: 'hr-003',
    volunteerId: 'vol-101',
    campaignTitle: 'تكوين إسعافات أولية متقدمة مع الحماية المدنية',
    date: '2026-10-30',
    hours: 20,
    institution: 'مديرية الحماية المدنية جيجل',
    approved: true,
    category: 'تكوين وتأهيل'
  },
  {
    id: 'hr-004',
    volunteerId: 'vol-101',
    campaignTitle: 'نشاط تضامني وقافلة شتوية للقرى الجبلية',
    date: '2026-11-02',
    hours: 6,
    institution: 'المركب الرياضي الجواري الميلية',
    approved: true,
    category: 'تضامن وإغاثة'
  }
];

export const AWARENESS_GUIDES: AwarenessGuide[] = [
  {
    id: 'guide-fire',
    hazardType: 'fire',
    title: 'ماذا تفعل عند اندلاع حريق غابات أو أحراش؟',
    subtitle: 'إرشادات النجاة والسلامة الميدانية المعتمدة من الحماية المدنية',
    accentColor: '#ef4444',
    instructions: {
      before: [
        'تنظيف الأعشاب الجافة ومحيط المنازل لمسافة لا تقل عن 10 أمتار',
        'عدم إشعال النار للشواء أو حرق المخلفات في الغابات في فترات الحر والرياح',
        'الاحتفاظ بوسائل إطفاء يدوية ومصادر مياه جاهزة للاستعمال السريع'
      ],
      during: [
        'الاتصال فوراً بالحماية المدنية (14) أو الرقم الأخضر (1021)',
        'الابتعاد الفوري في الاتجاه المعاكس لاتجاه الرياح والدخان',
        'تغطية الفم والأنف بقطعة قماش مبللة لتفادي الاختناق بالغازات السامة',
        'عدم محاولة النزول إلى الأودية والخنادق لأن النار تصعد للأعلى بسرعة فائقة'
      ],
      after: [
        'عدم العودة إلى مكان الحريق إلا بعد إعلان السلطات المختصة إخماده تماماً',
        'الحذر من الجمرات المتبقية تحت الرماد والأشجار الآيلة للسقوط',
        'تقديم الإسعافات الأولية للمصابين بحروق أو استنشاق دخان'
      ]
    },
    emergencyNumbers: [
      { label: 'الحماية المدنية', number: '14' },
      { label: 'الرقم الأخضر للحماية', number: '1021' },
      { label: 'الدرك الوطني', number: '1055' },
      { label: 'الشرطة', number: '1548' }
    ]
  },
  {
    id: 'guide-flood',
    hazardType: 'flood',
    title: 'ماذا تفعل أثناء الفيضانات وجريان الوديان؟',
    subtitle: 'توجيهات الحماية من السيول الجارفة وارتفاع منسوب المياه',
    accentColor: '#3b82f6',
    instructions: {
      before: [
        'متابعة النشرات الجوية الخاصة (BMS) الصادرة عن الأرصاد الجوية',
        'تفقد مجاري مياه الأمطار والبالوعات قرب السكن وتنظيفها',
        'وضع الأمتعة والأجهزة الثمينة والوثائق في الطوابق العليا'
      ],
      during: [
        'لا تعبر أبداً أي مسلك مائي أو وادٍ يجري سواءً راجلاً أو على متن سيارة',
        'قطع التيار الكهربائي والغاز فوراً عند تسرب المياه إلى المنزل',
        'الصعود إلى أعلى نقطة آمنة والتلويح لفرق الإنقاذ دون مغامرة غير محسوبة',
        'الابتعاد عن مجاري السيول والأودية حتى وإن بدت المياه ضحلة'
      ],
      after: [
        'التحقق من سلامة شبكة الكهرباء والمياه قبل تشغيلها',
        'غلي مياه الشرب أو التأكد من سلامتها لتفادي التسممات المائية',
        'تعقيم المنازل والمرافق من الأوحال والمخلفات الطينية'
      ]
    },
    emergencyNumbers: [
      { label: 'الحماية المدنية', number: '14' },
      { label: 'الدرك الوطني', number: '1055' },
      { label: 'الأشغال العمومية', number: '1022' }
    ]
  },
  {
    id: 'guide-heatwave',
    hazardType: 'heatwave',
    title: 'كيف تتعامل مع موجات الحر الشديدة؟',
    subtitle: 'تدابير الوقاية من ضربات الشمس والإجهاد الحراري في فصل الصيف',
    accentColor: '#f59e0b',
    instructions: {
      before: [
        'إغلاق الستائر والنوافذ المعرضة للشمس نهاراً وفتحها ليلاً للتهوية',
        'تجهيز قارورات الماء العذب وحفظها في متناول اليد باستمرار',
        'مراقبة كبار السن والأطفال والأشخاص المصابين بأمراض مزمنة'
      ],
      during: [
        'شرب الماء بكثرة حتى دون الشعور بالعطش الشديد',
        'تجنب الخروج والأنشطة الرياضية المرهقة وقت الذروة (11:00 إلى 17:00)',
        'ارتداء ملابس قطنية خفيفة وفاتحة اللون مع قبعة ونظارات شمسية',
        'عدم ترك الأطفال أو الحيوانات إطلاقاً داخل مركبات متوقفة تحت الشمس'
      ],
      after: [
        'في حال الشعور بدوار، غثيان أو ارتفاع حرارة الجسم: التوجه فوراً إلى الظل',
        'رش الوجه والأطراف بالماء البارد وطلب الإسعاف إذا لزم الأمر'
      ]
    },
    emergencyNumbers: [
      { label: 'الإسعاف الطبي SAMU', number: '115' },
      { label: 'الحماية المدنية', number: '14' },
      { label: 'الرقم الأخضر للصحة', number: '3030' }
    ]
  },
  {
    id: 'guide-storm',
    hazardType: 'storm',
    title: 'كيف تتصرف أثناء العواصف والرياح القوية؟',
    subtitle: 'قواعد الأمان وتجنب مخاطر تطاير الأجسام وانهيار الهياكل',
    accentColor: '#8b5cf6',
    instructions: {
      before: [
        'إحكام إغلاق الأبواب والنوافذ والستائر الخارجية',
        'تثبيت أو إنزال الأجسام والمزهريات والألواح فوق الأسطح والشرفات',
        'شحن الهواتف وتجهيز مصابيح الإنارة اليدوية تحسباً لانقطاع الكهرباء'
      ],
      during: [
        'البقاء داخل المباني الآمنة وتجنب المشي تحت الأشجار أو الأعمدة',
        'تجنب الوقوف بجانب النوافذ الزجاجية الكبيرة',
        'تخفيض سرعة السيارة أو التوقف في مكان آمن بعيداً عن المرتفعات والأودية',
        'الامتناع التام عن الخروج إلى البحر أو الصخور الساحلية لمشاهدة الأمواج'
      ],
      after: [
        'تفقد سلامة أسطح المنازل والأسلاك الكهربائية بحذر شديد',
        'إبلاغ مصالح سونلغاز أو البلدية عن أي كابلات كهربائية متدلية'
      ]
    },
    emergencyNumbers: [
      { label: 'سونلغاز (الغاز والكهرباء)', number: '3303' },
      { label: 'الحماية المدنية', number: '14' },
      { label: 'الدرك الوطني', number: '1055' }
    ]
  }
];

export const INSTITUTION_STATS = {
  activeIncidents: 3,
  availableVolunteers: 24,
  alertsToday: 12,
  totalVolunteeringHours: 14102,
  registeredVolunteersTotal: 846,
  completedCampaigns: 48,
  verifiedReportsRate: '96%',
  averageResponseTimeMin: 7
};

export const RECOGNITION_TIERS = [
  { hours: 100, title: 'متطوع مبتدئ', color: 'from-blue-500 to-cyan-500', badge: '🥉' },
  { hours: 500, title: 'متطوع نشيط', color: 'from-emerald-500 to-teal-500', badge: '🥈' },
  { hours: 1000, title: 'متطوع متميز', color: 'from-amber-500 to-yellow-500', badge: '🥇' },
  { hours: 2500, title: 'متطوع خبير', color: 'from-indigo-500 to-purple-500', badge: '💎' },
  { hours: 5000, title: 'شهادة التميز الوطني في التطوع', color: 'from-rose-500 to-red-600', badge: '🏆' },
];
