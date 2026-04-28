
import { Level, LevelConfig, LibraryItem } from './types';

export const LEVELS: LevelConfig[] = [
  {
    id: Level.BEGINNER,
    titles: {
      ar: 'المُسْتَوَى المُبْتَدِئُ (دِبْلُومُ التَّأْسِيسِ الفِقْهِيِّ)',
      fr: 'Niveau Débutant (Diplôme de Fondation Juridique)',
      en: 'Beginner Level (Diploma in Jurisprudential Foundation)'
    },
    descriptions: {
      ar: 'شَامِلٌ لِلْمَعْلُومِ مِنَ الدِّينِ بِالضَّرُورَةِ: مِنْ صِحَّةِ الِاعْتِقَادِ، وَصِفَةِ العِبَادَاتِ العَمَلِيَّةِ، وَمُحَرَّمَاتِ الجَوَارِحِ.',
      fr: 'Couvre l\'essentiel de la religion : dogme, pratique détaillée des adorations et interdits majeurs.',
      en: 'Covers the essentials of religion: creed, detailed practice of worship, and major prohibitions.'
    },
    mainTexts: {
      ar: 'المُرْشِدُ المُعِينُ (ابْنُ عَاشِرٍ) وَمُخْتَصَرُ الأَخْضَرِيِّ',
      fr: 'Al-Murshid al-Mu\'in et Mukhtasar al-Akhdari',
      en: 'Al-Murshid al-Mu\'in and Mukhtasar al-Akhdari'
    },
    mainTextBios: {
      ar: 'ابْنُ عَاشِرٍ (ت 1040 هـ): نَظَمَ أَهَمَّ مُتُونِ المَغْرِبِ فِي العَقِيدَةِ وَالفِقْهِ. الأَخْضَرِيُّ (ت 983 هـ): صَاحِبُ المُخْتَصَرِ المَشْهُورِ فِي فِقْهِ العِبَادَاتِ.',
      fr: 'Ibn Ashir (m. 1040 H) et Al-Akhdari (m. 983 H) : Les deux piliers de l\'enseignement primaire malékite.',
      en: 'Ibn Ashir (d. 1040 AH) and Al-Akhdari (d. 983 AH): The two pillars of primary Maliki education.'
    },
    topics: {
      ar: [
        'أَرْكَانُ الإِيمَانِ وَعَقِيدَةُ أَهْلِ السُّنَّةِ وَالجَمَاعَةِ',
        'أَحْكَامُ المِيَاهِ وَالنَّجَاسَاتِ وَكَيْفِيَّةُ التَّطْهِيرِ',
        'صِفَةُ الوُضُوءِ العَمَلِيَّةِ (فَرَائِضُهُ، سُنَنُهُ، وَفَضَائِلُهُ)',
        'أَحْكَامُ الغُسْلِ وَالتَّيَمُمِ وَالمَسْحِ عَلَى الخُفَّيْنِ',
        'شُرُوطُ الصَّلَاةِ وَأَوْقَاتُهَا المَفْرُوضَةُ',
        'صِفَةُ الصَّلَاةِ الكَامِلَةِ (مِنَ التَّكْبِيرِ إِلَى التَّسْلِيمِ)',
        'أَحْكَامُ سُجُودِ السَّهْوِ وَإِصْلَاحِ الخَلَلِ فِي الصَّلَاةِ',
        'فِقْهُ الصِّيَامِ وَالزَّكَاةِ (لِلْمُبْتَدِئِينَ)',
        'مُبَادِئُ المُعَامَلَاتِ الحَلَالِ وَالحَرَامِ فِي البَيْعِ',
        'كِتَابُ المَظَالِمِ: الكَبَائِرُ، حُقُوقُ العِبَادِ، وَالتَّوْبَةُ'
      ],
      fr: [
        'Piliers de la foi et dogme de Ahl al-Sunna',
        'Règles des eaux, impuretés et purification',
        'Description pratique de l\'Ablution (Wudu)',
        'Règles du Ghusl, Tayammum et essuyage des chaussettes',
        'Conditions et horaires de la prière',
        'Description complète de la prière (du Takbir au Taslim)',
        'Prosternation de l\'oubli et réparation de la prière',
        'Jurisprudence du Jeûne et de la Zakat (Débutants)',
        'Principes des transactions Halal et Haram',
        'Grands péchés, droits des serviteurs et repentir'
      ],
      en: [
        'Pillars of Faith and Creed of Ahl al-Sunna',
        'Rules of Water, Impurities, and Purification',
        'Practical Description of Ablution (Wudu)',
        'Rules of Ghusl, Tayammum, and Wiping over Socks',
        'Conditions and Timings of Prayer',
        'Complete Description of Prayer (Takbir to Taslim)',
        'Prostration of Forgetfulness and Prayer Repair',
        'Jurisprudence of Fasting and Zakat (Beginners)',
        'Principles of Halal and Haram Transactions',
        'Major Sins, Human Rights, and Repentance'
      ]
    }
  },
  {
    id: Level.INTERMEDIATE,
    titles: {
      ar: 'المُسْتَوَى المُتَوَسِّطُ (دِبْلُومُ الفَقِيهِ المُمَارِسِ)',
      fr: 'Niveau Intermédiaire (Diplôme du Juriste Praticien)',
      en: 'Intermediate Level (Practicing Jurist Diploma)'
    },
    descriptions: {
      ar: 'تَعْمِيقُ المَسَائِلِ فِي العِبَادَاتِ وَفِقْهِ الأُسْرَةِ وَالمُعَامَلَاتِ المَالِيَّةِ المَالِكِيَّةِ.',
      fr: 'Approfondissement des adorations, du droit de la famille et des transactions.',
      en: 'Deepening of worship, family law, and transactions.'
    },
    mainTexts: {
      ar: 'رِسَالَةُ ابْنِ أَبِي زَيْدٍ القَيْرَوَانِيِّ',
      fr: 'La Risala d\'Ibn Abi Zayd',
      en: 'The Risala of Ibn Abi Zayd'
    },
    mainTextBios: {
      ar: 'ابْنُ أَبِي زَيْدٍ (ت 386 هـ): يُلَقَّبُ بِمَالِكٍ الصَّغِيرِ، وَرِسَالَتُهُ هِيَ عُمْدَةُ المَذْهَبِ التَّعْلِيمِيَّةِ.',
      fr: 'Ibn Abi Zayd (m. 386 H) : Surnommé "Le petit Malik".',
      en: 'Ibn Abi Zayd (d. 386 AH): Nicknamed "The Little Malik".'
    },
    topics: {
      ar: [
        'شَرْحُ عَقِيدَةِ الرِّسَالَةِ وَتَفْصِيلُ الغَيْبِيَّاتِ',
        'أَحْكَامُ الجُمُعَةِ وَالجَمَاعَةِ وَصَلَاةِ السَّفَرِ وَالخَوْفِ',
        'فِقْهُ الزَّكَاةِ (العَيْنُ، الحَرْثُ، وَالمَاشِيَةُ)',
        'أَحْكَامُ الحَجِّ وَالعُمْرَةِ بِتَفْصِيلِ الرِّسَالَةِ',
        'كِتَابُ النِّكَاحِ وَالصَّدَاقِ وَوَلِيمَةِ العُرْسِ',
        'أَحْكَامُ الطَّلَاقِ وَالرَّجْعَةِ وَالعِدَّةِ وَالنَّفَقَةِ',
        'فِقْهُ البُيُوعِ وَالصَّرْفِ وَالسَّلَمِ وَالقِرَاضِ',
        'أَحْكَامُ الرِّبَا وَالبُيُوعِ المَنْهِيِّ عَنْهَا',
        'مَبَادِئُ المَوَارِيثِ وَالوَصَايَا وَالقِسْمَةِ',
        'الأَيْمَانُ وَالنُّذُورُ وَأَحْكَامُ الأُضْحِيَّةِ وَالعَقِيقَةِ'
      ],
      fr: [
        'Commentaire du dogme de la Risala',
        'Prière du Vendredi, en groupe, voyage et peur',
        'Jurisprudence de la Zakat (Or, agriculture, bétail)',
        'Hajj et Omra selon la Risala',
        'Mariage, dot et festin de noces',
        'Divorce, retour, retraite et pension',
        'Ventes, change, Salam et Qirad',
        'Règles de l\'usure et ventes interdites',
        'Principes des héritages et testaments',
        'Serments, vœux et sacrifices'
      ],
      en: [
        'Commentary on the Risala Creed',
        'Friday, Group, Travel, and Fear Prayers',
        'Jurisprudence of Zakat (Gold, crops, livestock)',
        'Hajj and Umrah according to the Risala',
        'Marriage, dowry, and wedding feast',
        'Divorce, return, waiting period, and alimony',
        'Sales, exchange, Salam, and Qirad',
        'Rules of Usury and forbidden sales',
        'Principles of Inheritance and Wills',
        'Oaths, Vows, and Sacrifices'
      ]
    }
  },
  {
    id: Level.ADVANCED,
    titles: {
      ar: 'المُسْتَوَى المُتْقِنُ (بَكالُورْيُوسُ الشَّرِيعَةِ المَالِكِيُّ)',
      fr: 'Niveau Avancé (Licence de Sharia Malékite)',
      en: 'Advanced Level (Maliki Sharia Bachelor)'
    },
    descriptions: {
      ar: 'دِرَاسَةُ الفِقْهِ بِالدَّلِيلِ مِنَ الكِتَابِ وَالسُّنَّةِ، مَعَ مُقَارَنَةِ المَذَاهِبِ وَأُصُولِ الِاسْتِنْبَاطِ.',
      fr: 'Étude du droit avec preuves et comparaison des écoles.',
      en: 'Study of law with evidence and comparison of schools.'
    },
    mainTexts: {
      ar: 'المُوَطَّأُ، سُنَنُ أَبِي دَاوُدَ، وَبِدَايَةُ المُجْتَهِدِ',
      fr: 'Al-Muwatta, Sunan Abi Dawud et Bidayat al-Mujtahid',
      en: 'Al-Muwatta, Sunan Abi Dawud, and Bidayat al-Mujtahid'
    },
    mainTextBios: {
      ar: 'الإِمَامُ مَالِكٌ (ت 179 هـ). ابْنُ رُشْدٍ الحَفِيدُ (ت 595 هـ): صَاحِبُ بِدَايَةِ المُجْتَهِدِ فِي الفِقْهِ المُقَارَنِ.',
      fr: 'Imam Malik et Ibn Rushd le petit.',
      en: 'Imam Malik and Ibn Rushd (Averroes).'
    },
    topics: {
      ar: [
        'أُصُولُ مَذْهَبِ مَالِكٍ وَالِاحْتِجَاجُ بِعَمَلِ أَهْلِ المَدِينَةِ',
        'أَحَادِيثُ الأَحْكَامِ مِنْ "المُوَطَّأِ" (رِوَايَةُ يَحْيَى)',
        'فِقْهُ الدَّلِيلِ فِي "سُنَنِ أَبِي دَاوُدَ"',
        'أَسْبَابُ اخْتِلَافِ الفُقَهَاءِ (تَحْلِيلُ كِتَابِ البِدَايَةِ)',
        'أَحْكَامُ الجِنَايَاتِ وَالقِصَاصِ وَالدِّيَاتِ',
        'عِلْمُ المَوَارِيثِ (التَّأْصِيلُ وَالحِسَابُ وَالمَنَاسَخَاتُ)',
        'أُصُولُ الفِقْهِ: المَصَالِحُ المُرْسَلَةُ وَسَدُّ الذَّرَائِعِ',
        'مَقَاصِدُ الشَّرِيعَةِ عِنْدَ الإِمَامِ الشَّاطِبِيِّ'
      ],
      fr: [
        'Fondements du rite et Pratique de Médine',
        'Hadiths juridiques du Muwatta',
        'Preuves juridiques dans Sunan Abi Dawud',
        'Causes de divergence des juristes',
        'Crimes, talion et prix du sang',
        'Science des héritages (Calculs avancés)',
        'Usul al-Fiqh : Intérêt général (Maslaha)',
        'Objectifs de la Charia (Maqasid)'
      ],
      en: [
        'Foundations of the Rite and Medinan Practice',
        'Legal Hadiths of the Muwatta',
        'Legal Proofs in Sunan Abi Dawud',
        'Causes of Juristic Disagreement',
        'Crimes, Retaliation, and Blood Money',
        'Science of Inheritance (Advanced Calculations)',
        'Usul al-Fiqh: Public Interest (Maslaha)',
        'Objectives of Sharia (Maqasid)'
      ]
    }
  },
  {
    id: Level.EXPERT,
    titles: {
      ar: 'المَرْحَلَةُ العَالِمِيَّةُ (دِبْلُومُ التَّخَصُّصِ وَالإِفْتَاءِ)',
      fr: 'Niveau Expert (Spécialisation et Fatwa)',
      en: 'Expert Level (Specialization and Fatwa)'
    },
    descriptions: {
      ar: 'مَرْحَلَةُ الِاجْتِهَادِ، فِقْهُ النَّوَازِلِ المُعَاصِرَةِ، وَتَخْرِيجُ الفُرُوعِ عَلَى الأُصُولِ.',
      fr: 'Phase d\'Ijtihad et cas contemporains.',
      en: 'Stage of Ijtihad and contemporary issues.'
    },
    mainTexts: {
      ar: 'المِعْيَارُ المُعْرِبُ، مَرَّاقِي السُّعُودِ، وَفُرُوقُ القَرَافِيِّ',
      fr: 'Al-Mi\'yar, Maraqi al-Su\'ud et Al-Furuq',
      en: 'Al-Mi\'yar, Maraqi al-Su\'ud, and Al-Furuq'
    },
    mainTextBios: {
      ar: 'الوَتْشَرِيسِيُّ (ت 914 هـ): جَامِعُ فَتَاوَى المَغْرِبِ وَالأَنْدَلُسِ. القَرَافِيُّ (ت 684 هـ): إِمَامُ القَوَاعِدِ.',
      fr: 'Al-Wansharisi et Al-Qarafi.',
      en: 'Al-Wansharisi and Al-Qarafi.'
    },
    topics: {
      ar: [
        'صِنَاعَةُ الفَتْوَى وَآدَابُ المُفْتِي وَالمُسْتَفْتِي',
        'آلِيَّاتُ الِاسْتِنْبَاطِ فِي "مَرَّاقِي السُّعُودِ"',
        'القَوَاعِدُ الفِقْهِيَّةُ الخَمْسُ الكُبْرَى وَتَطْبِيقَاتُهَا',
        'عِلْمُ الفُرُوقِ الفِقْهِيَّةِ (تَمْيِيزُ النَّظَائِرِ)',
        'نَوَازِلُ المَالِ وَالاِقْتِصَادِ وَالبُورْصَةِ الحَدِيثَةِ',
        'النَّوَازِلُ الطِّبِّيَّةُ (الاِسْتِنْسَاخُ وَالبَصْمَةُ الوِرَاثِيَّةُ)',
        'تَخْرِيجُ الفُرُوعِ الفِقْهِيَّةِ عَلَى القَوَاعِدِ الأُصُولِيَّةِ',
        'نِظَامُ القَضَاءِ وَطُرُقُ الإِثْبَاتِ وَالتَّوْثِيقِ الحَدِيثَةِ'
      ],
      fr: [
        'Art de la Fatwa et éthique du Mufti',
        'Mécanismes d\'inférence (Maraqi al-Su\'ud)',
        'Les cinq grandes maximes juridiques',
        'Science des distinctions (Al-Furuq)',
        'Cas financiers et bourse moderne',
        'Cas médicaux (Clonage, ADN)',
        'Déduction des branches sur les bases',
        'Système judiciaire et preuves modernes'
      ],
      en: [
        'Crafting Fatwas and Ethics of the Mufti',
        'Inference Mechanisms (Maraqi al-Su\'ud)',
        'The Five Great Legal Maxims',
        'Science of Distinctions (Al-Furuq)',
        'Financial Cases and Modern Stock Market',
        'Medical Cases (Cloning, DNA)',
        'Deriving Branches from Fundamentals',
        'Judiciary System and Modern Proofs'
      ]
    }
  }
];

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'ibn-ashir',
    titles: { ar: 'المُرْشِدُ المُعِينُ', fr: 'Le Guide Secourable', en: 'The Helpful Guide' },
    authors: { ar: 'ابْنُ عَاشِرٍ', fr: 'Ibn Ashir', en: 'Ibn Ashir' },
    authorBios: { 
      ar: 'عَبْدُ الوَاحِدِ ابْنُ عَاشِرٍ (ت 1040 هـ). فَقِيهٌ وَعَالِمٌ مَالِكِيٌّ مَغْرِبِيٌّ نَظَمَ الفِقْهَ لِتَسْهِيلِ حِفْظِهِ.',
      fr: 'Ibn Ashir (m. 1040 H). Savant marocain.',
      en: 'Ibn Ashir (d. 1040 AH). Moroccan scholar.'
    },
    recommendedEditions: { ar: 'طبعة دار الفكر', fr: 'Dar al-Fikr', en: 'Dar al-Fikr' },
    category: 'متون',
    level: Level.BEGINNER,
    descriptions: { ar: 'منظومة في العقيدة والفقه والسلوك.', fr: 'Poème sur le dogme et le droit.', en: 'Poem on creed and law.' },
    content: `يَقُولُ عَبْدُ الوَاحِدِ ابْنُ عَاشِرِ ... مُبْتَدِئاً بِاسْمِ الإِلَهِ القَادِرِ`
  }
];
