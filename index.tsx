
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BookOpen, 
  Award, 
  CheckCircle, 
  ChevronRight, 
  ArrowRight, 
  GraduationCap, 
  Library,
  Unlock,
  Scale,
  Search,
  ShieldCheck,
  Lightbulb,
  MessageSquareQuote,
  Layers,
  PenTool,
  Monitor,
  BarChart3,
  BookMarked,
  X,
  ScrollText,
  FileText,
  User,
  ShoppingBag,
  Info,
  Quote,
  Languages,
  AlertCircle,
  RefreshCcw,
  Loader2
} from 'lucide-react';
import { Level, LessonContent, UserProgress, LibraryItem, Language } from './types';
import { LEVELS, LIBRARY_ITEMS } from './constants';
import { LOCAL_DB } from './db';

const LESSON_API_ENDPOINT = '/api/generate-lesson';

const requestGeneratedLesson = async (
  topic: string,
  levelId: Level,
  lang: Language
): Promise<LessonContent> => {
  const response = await fetch(LESSON_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic, levelId, lang }),
  });

  if (!response.ok) {
    throw new Error(`Lesson generation failed with status ${response.status}`);
  }

  return response.json();
};

const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Progress/cache persistence is optional; the UI must stay usable without it.
  }
};

const removeStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage failures in restricted browser contexts.
  }
};

const createInitialProgress = (): UserProgress => ({
  currentLevel: Level.BEGINNER,
  completedLessons: [],
  scores: {},
  certificates: [],
  lang: 'ar'
});

const loadProgress = (): UserProgress => {
  const saved = readStorage('maliki_fiqh_progress_v2_2');
  if (!saved) return createInitialProgress();

  try {
    return JSON.parse(saved);
  } catch {
    removeStorage('maliki_fiqh_progress_v2_2');
    return createInitialProgress();
  }
};

const buildOfflineLesson = (
  topic: string,
  levelId: Level,
  lang: Language
): LessonContent => {
  if (lang === 'fr') {
    return {
      title: topic,
      matn: 'Mode hors ligne : ce cours utilise une fiche locale afin que l application reste disponible sans API.',
      body: `Ce cours introduit le theme "${topic}" selon une progression academique. L objectif est de retenir les definitions, les conditions, les cas pratiques et les erreurs frequentes avant de passer a l evaluation. Pour une lecon plus detaillee, ajoutez plus tard un endpoint serveur /api/generate-lesson avec une cle API protegee cote serveur.`,
      detailedExamples: [
        `Identifier la definition principale du theme : ${topic}.`,
        'Distinguer les conditions, les obligations et les recommandations.',
        'Comparer un cas simple avec un cas limite avant de conclure.',
        'Relever les erreurs de pratique les plus frequentes.',
        'Reviser le cours puis valider les acquis avec le quiz.'
      ],
      fiqhIssues: [
        'Definition du sujet et limites du chapitre.',
        'Conditions de validite et elements obligatoires.',
        'Cas pratiques et exceptions usuelles.'
      ],
      fiqhRiddles: [
        {
          riddle: 'Quel est le premier reflexe avant de donner un jugement pratique ?',
          answer: 'Qualifier correctement le cas, puis verifier ses conditions et ses exceptions.'
        }
      ],
      evidence: 'Fiche locale : les preuves detaillees doivent etre completees par le professeur ou par le futur endpoint serveur.',
      comparativeFiqh: `Niveau ${levelId}. Les divergences sont a etudier apres la maitrise de la regle principale.`,
      references: ['Support local de revision', 'Programme academique malekite'],
      quiz: [
        {
          question: `Quel est le theme de ce cours ?`,
          options: [topic, 'Un chapitre sans rapport', 'Une question technique'],
          correctAnswer: 0,
          explanation: 'Le titre du cours indique le theme a maitriser.'
        },
        {
          question: 'Que faut-il verifier avant d appliquer une regle ?',
          options: ['Les conditions du cas', 'La couleur de la page', 'Le nombre de boutons'],
          correctAnswer: 0,
          explanation: 'Une regle s applique seulement apres qualification du cas et verification des conditions.'
        },
        {
          question: 'Pourquoi cette fiche existe-t-elle ?',
          options: ['Pour utiliser l app sans API', 'Pour exposer une cle secrete', 'Pour bloquer les cours'],
          correctAnswer: 0,
          explanation: 'Elle permet une utilisation stable sur Vercel sans backend IA.'
        }
      ]
    };
  }

  if (lang === 'en') {
    return {
      title: topic,
      matn: 'Offline mode: this lesson uses local content so the app remains usable without an API.',
      body: `This lesson introduces "${topic}" with a structured study path. Focus on definitions, required conditions, practical cases, and common mistakes before taking the assessment. A richer generated lesson can be added later through a server-side /api/generate-lesson endpoint.`,
      detailedExamples: [
        `Identify the main definition for: ${topic}.`,
        'Separate conditions, obligations, and recommendations.',
        'Compare a simple case with a borderline case.',
        'Review common practice mistakes.',
        'Study the summary, then complete the quiz.'
      ],
      fiqhIssues: [
        'Subject definition and chapter boundaries.',
        'Validity conditions and required elements.',
        'Practical cases and common exceptions.'
      ],
      fiqhRiddles: [
        {
          riddle: 'What is the first step before applying a practical ruling?',
          answer: 'Identify the case correctly, then verify its conditions and exceptions.'
        }
      ],
      evidence: 'Local study sheet: detailed evidences should be completed by a teacher or by the future server endpoint.',
      comparativeFiqh: `Level ${levelId}. Comparative details should come after mastering the main rule.`,
      references: ['Local revision sheet', 'Maliki academy curriculum'],
      quiz: [
        {
          question: 'What is this lesson about?',
          options: [topic, 'An unrelated chapter', 'A technical setting'],
          correctAnswer: 0,
          explanation: 'The lesson title identifies the subject to study.'
        },
        {
          question: 'What should be checked before applying a rule?',
          options: ['The case conditions', 'The page color', 'The number of buttons'],
          correctAnswer: 0,
          explanation: 'A rule is applied after identifying the case and checking its conditions.'
        },
        {
          question: 'Why does this local lesson exist?',
          options: ['To use the app without an API', 'To expose a secret key', 'To block lessons'],
          correctAnswer: 0,
          explanation: 'It keeps the Vercel app usable without an AI backend.'
        }
      ]
    };
  }

  return {
    title: topic,
    matn: 'وَضْعٌ مَحَلِّيٌّ: هَذَا الدَّرْسُ مُتَاحٌ دُونَ اتِّصَالٍ بِوَاجِهَةِ API.',
    body: `يُقَدِّمُ هَذَا الدَّرْسُ مَدْخَلًا مُنَظَّمًا لِمَوْضُوعِ: "${topic}". يَرْكُزُ الطَّالِبُ عَلَى تَحْرِيرِ التَّعْرِيفِ، وَضَبْطِ الشُّرُوطِ، وَفَهْمِ الأَمْثِلَةِ، وَتَجَنُّبِ الأَخْطَاءِ الشَّائِعَةِ. وَلِدَرْسٍ أَوْسَعَ، يُمْكِنُ لَاحِقًا إِضَافَةُ خَادِمٍ آمِنٍ لِـ /api/generate-lesson دُونَ كَشْفِ المِفْتَاحِ فِي المُتَصَفِّحِ.`,
    detailedExamples: [
      `تَحْدِيدُ التَّعْرِيفِ الأَسَاسِيِّ لِـ: ${topic}.`,
      'التَّمْيِيزُ بَيْنَ الشُّرُوطِ وَالفَرَائِضِ وَالمَنْدُوبَاتِ.',
      'مُقَارَنَةُ المِثَالِ الوَاضِحِ بِالحَالَةِ المُشْكِلَةِ.',
      'مُرَاجَعَةُ الأَخْطَاءِ العَمَلِيَّةِ المُتَكَرِّرَةِ.',
      'قِرَاءَةُ الخُلَاصَةِ ثُمَّ اجْتِيَازُ التَّقْوِيمِ.'
    ],
    fiqhIssues: [
      'تَحْرِيرُ مَحَلِّ البَحْثِ وَحُدُودِ البَابِ.',
      'ضَبْطُ شُرُوطِ الصِّحَّةِ وَالعَنَاصِرِ الوَاجِبَةِ.',
      'تَنْزِيلُ القَاعِدَةِ عَلَى الأَمْثِلَةِ وَالنَّوَازِلِ البَسِيطَةِ.'
    ],
    fiqhRiddles: [
      {
        riddle: 'مَا أَوَّلُ مَا يَحْتَاجُهُ الطَّالِبُ قَبْلَ تَنْزِيلِ الحُكْمِ؟',
        answer: 'تَصْوِيرُ المَسْأَلَةِ تَصْوِيرًا صَحِيحًا، ثُمَّ التَّحَقُّقُ مِنْ شُرُوطِهَا وَاسْتِثْنَاءَاتِهَا.'
      }
    ],
    evidence: 'بِطَاقَةٌ مَحَلِّيَّةٌ لِلْمُرَاجَعَةِ: تُسْتَكْمَلُ الأَدِلَّةُ المُفَصَّلَةُ مِنَ المُدَرِّسِ أَوْ مِنَ الخَادِمِ الآمِنِ لَاحِقًا.',
    comparativeFiqh: `المُسْتَوَى: ${levelId}. تُؤَخَّرُ المُقَارَنَةُ المُفَصَّلَةُ حَتَّى يَضْبِطَ الطَّالِبُ أَصْلَ المَسْأَلَةِ.`,
    references: ['بِطَاقَةُ مُرَاجَعَةٍ مَحَلِّيَّةٍ', 'مَنْهَجُ الأَكَادِيمِيَّةِ المَالِكِيَّةِ'],
    quiz: [
      {
        question: 'مَا مَوْضُوعُ هَذَا الدَّرْسِ؟',
        options: [topic, 'بَابٌ غَيْرُ مُتَعَلِّقٍ', 'إِعْدَادٌ تِقْنِيٌّ'],
        correctAnswer: 0,
        explanation: 'عُنْوَانُ الدَّرْسِ يُحَدِّدُ المَوْضُوعَ المَطْلُوبَ ضَبْطُهُ.'
      },
      {
        question: 'مَاذَا نُرَاجِعُ قَبْلَ تَطْبِيقِ القَاعِدَةِ؟',
        options: ['شُرُوطَ المَسْأَلَةِ', 'لَوْنَ الصَّفْحَةِ', 'عَدَدَ الأَزْرَارِ'],
        correctAnswer: 0,
        explanation: 'لَا يُنَزَّلُ الحُكْمُ حَتَّى تُفْهَمَ الصُّورَةُ وَتُرَاجَعَ الشُّرُوطُ.'
      },
      {
        question: 'لِمَاذَا وُضِعَ هَذَا الدَّرْسُ المَحَلِّيُّ؟',
        options: ['لِتَعْمَلَ التَّطْبِيقَةُ دُونَ API', 'لِكَشْفِ المِفْتَاحِ السِّرِّيِّ', 'لِمَنْعِ الدُّرُوسِ'],
        correctAnswer: 0,
        explanation: 'الغَرَضُ أَنْ تَبْقَى التَّطْبِيقَةُ صَالِحَةً لِلِاسْتِعْمَالِ عَلَى Vercel دُونَ خَادِمِ ذَكَاءٍ اصطِنَاعِيٍّ.'
      }
    ]
  };
};

const TRANSLATIONS = {
  ar: {
    title: 'الأَكَادِيمِيَّةُ المَالِكِيَّةُ',
    subtitle: '"عَلَى خُطَى الصَّحَابَةِ وَالسَّلَفِ الصَّالِحِ فِي العَقِيدَةِ، وَعَلَى مَذْهَبِ الإِمَامِ دَارِ الهِجْرَةِ فِي الفِقْهِ"',
    version: 'بَرْنَامَجُ الِاجْتِيَازِ الأَكَادِيمِيِّ v2.2',
    browse: 'تَصَفَّحِ المَسَاقَاتِ',
    preview: 'اسْتِعْرَاضُ المَنْهَجِ',
    average: 'المُعَدَّلُ',
    courses: 'المَسَاقَاتُ',
    bio: 'تَرْجَمَةُ مُؤَلِّفِي المَتْنِ:',
    backToCurriculum: 'العَوْدَةُ لِلْمَنْهَجِ',
    quizTitle: 'تَقْوِيمُ المَلَكَةِ الفِقْهِيَّةِ',
    submitQuiz: 'إِرْسَالُ الإِجَابَاتِ لِلتَّقْيِيمِ',
    returnToPlan: 'العَوْدَةُ لِلْخِطَّةِ الدِّرَاسِيَّةِ',
    quizSuccess: 'مُبَارَكٌ! لَقَدْ أَجَزْتَ هَذَا المَسَاقَ بِنَجَاحٍ.',
    quizFail: 'تَحْتَاجُ إِلَى إِعَادَةِ النَّظَرِ فِي هَذَا الدَّرْسِ.',
    certificateTitle: 'إِجَازَةٌ عِلْمِيَّةٌ',
    certificateCertify: 'نَشْهَدُ بِأَنَّ الطَّالِبَ قَدْ نَالَ شَرَفَ إِتْقَانِ:',
    grade: 'بِتَقْدِيرِ: مُمْتَازٍ مَعَ مَرْتَبَةِ الشَّرَفِ',
    print: 'طِبَاعَةُ الوَثِيقَةِ',
    libraryTitle: 'المَكْتَبَةُ الرَّقْمِيَّةُ',
    librarySearch: 'ابْحَثْ عَنْ مَتْنٍ، مُؤَلِّفٍ، أَوْ مَوْضُوعٍ...',
    backToLibrary: 'العَوْدَةُ لِلْخِطَّةِ الدِّرَاسِيَّةِ',
    authorBio: 'تَرْجَمَةُ المُؤَلِّفِ',
    bestEdition: 'أَحْسَنُ طَبْعَةٍ فِي السُّوقِ',
    authorNote: '💡 يُنْصَحُ بِهَذِهِ الطَّبْعَةِ لِطَالِبِ العِلْمِ لِدِقَّتِهَا وَتَحْقِيقِهَا.',
    curriculumTab: 'المَنْهَجُ',
    libraryTab: 'المَكْتَبَةُ',
    desktopTab: 'وَضْعُ الحَاسُوبِ',
    loading: 'جَارِي اسْتِحْضَارُ المَسَائِلِ...',
    designedBy: 'تَصْمِيمُ: أَبُو سُلَيْمَانَ صَلَاحُ الدِّينِ المخانت',
    explanationLabel: 'شَرْحُ المَسَائِلِ',
    applicationsLabel: 'أَمْثِلَةٌ تَطْبِيقِيَّةٌ',
    riddlesLabel: 'أَحَاجِي وَأَلْغَازٌ ذَكِيَّةٌ',
    answerLabel: 'كَشْفُ الجَوَابِ',
    hideAnswerLabel: 'إِخْفَاءُ الجَوَابِ',
    proofLabel: 'الأَدِلَّةُ وَالِاسْتِنْبَاطُ',
    comparativeLabel: 'الخِلَافُ العَالِي',
    examBtn: 'الِامْتِحَانُ التَّقْوِيمِيُّ',
    noCertificate: 'لَمْ تَجْتَزْ أَيَّ مُسْتَوًى بَعْدُ.',
    homeBtn: 'الرُّجُوعُ لِلرَّئِيسِيَّةِ',
    openBtn: 'تَصَفَّحِ المَتْنَ',
    sheikhComment: 'تَعْلِيقُ الشَّيْخِ:',
    aboutMatn: 'عَنْ هَذَا المَتْنِ:',
    errorTitle: 'فَشَلَ الِاتِّصَالُ بِالمَكْتَبَةِ',
    errorDesc: 'يَبْدُو أَنَّ هُنَاكَ ضَغْطاً عَلَى الخَادِمِ حَالِيّاً، خَاصَّةً فِي المَسَائِلِ المُعَقَّدَةِ لِلْمُتْقِنِينَ.',
    retryBtn: 'أَعِدِ المُحَاوَلَةَ'
  },
  fr: {
    title: 'ACADÉMIE MALÉKITE',
    subtitle: '"Sur les traces des Compagnons dans le dogme, et selon l\'école de l\'Imam de Médine"',
    version: 'Certification Académique v2.2',
    browse: 'Parcourir les cours',
    preview: 'Aperçu du programme',
    average: 'Moyenne',
    courses: 'Cours',
    bio: 'Biographie de l\'auteur :',
    backToCurriculum: 'Retour au programme',
    quizTitle: 'Évaluation des compétences',
    submitQuiz: 'Envoyer les réponses',
    returnToPlan: 'Retour au plan d\'étude',
    quizSuccess: 'Félicitations ! Vous avez réussi ce cours.',
    quizFail: 'Vous devez revoir cette leçon.',
    certificateTitle: 'Diplôme Académique',
    certificateCertify: 'Nous certifions que l\'étudiant a maîtrisé :',
    grade: 'Mention : Excellent avec les honneurs',
    print: 'Imprimer le document',
    libraryTitle: 'Bibliothèque Numérique',
    librarySearch: 'Rechercher...',
    backToLibrary: 'Retour',
    authorBio: 'Bio de l\'auteur',
    bestEdition: 'Meilleure édition',
    authorNote: '💡 Recommandée pour sa précision.',
    curriculumTab: 'Programme',
    libraryTab: 'Bibliothèque',
    desktopTab: 'Bureau',
    loading: 'Récupération des sciences...',
    designedBy: 'Par : Abou Souleyman',
    explanationLabel: 'Explication',
    applicationsLabel: 'Applications',
    riddlesLabel: 'Énigmes',
    answerLabel: 'Réponse',
    hideAnswerLabel: 'Cacher',
    proofLabel: 'Preuves',
    comparativeLabel: 'Divergences',
    examBtn: 'Examen',
    noCertificate: 'Aucun certificat.',
    homeBtn: 'Accueil',
    openBtn: 'Ouvrir',
    sheikhComment: 'Commentaire :',
    aboutMatn: 'À propos :',
    errorTitle: 'Erreur de connexion',
    errorDesc: 'Le serveur est surchargé, essayez à nouveau.',
    retryBtn: 'Réessayer'
  },
  en: {
    title: 'MALIKI ACADEMY',
    subtitle: '"On the path of the Companions in creed, and following the Imam of Medina"',
    version: 'Academic Certification v2.2',
    browse: 'Browse Courses',
    preview: 'Preview Curriculum',
    average: 'Average',
    courses: 'Courses',
    bio: 'Author Biography:',
    backToCurriculum: 'Back',
    quizTitle: 'Legal Assessment',
    submitQuiz: 'Submit',
    returnToPlan: 'Back to Study Plan',
    quizSuccess: 'Congratulations! You passed.',
    quizFail: 'Please review this lesson.',
    certificateTitle: 'Academic License',
    certificateCertify: 'We certify mastery of:',
    grade: 'Grade: Excellent with Honors',
    print: 'Print',
    libraryTitle: 'Digital Library',
    librarySearch: 'Search...',
    backToLibrary: 'Back',
    authorBio: 'Author Bio',
    bestEdition: 'Best Edition',
    authorNote: '💡 Recommended for scholars.',
    curriculumTab: 'Curriculum',
    libraryTab: 'Library',
    desktopTab: 'Desktop',
    loading: 'Retrieving knowledge...',
    designedBy: 'By: Abu Sulayman',
    explanationLabel: 'Explanation',
    applicationsLabel: 'Applications',
    riddlesLabel: 'Riddles',
    answerLabel: 'Answer',
    hideAnswerLabel: 'Hide',
    proofLabel: 'Proof',
    comparativeLabel: 'Divergence',
    examBtn: 'Exam',
    noCertificate: 'No certificates earned.',
    homeBtn: 'Home',
    openBtn: 'Open',
    sheikhComment: 'Sheikh\'s Comment:',
    aboutMatn: 'About:',
    errorTitle: 'Connection Error',
    errorDesc: 'Server load is high, please try again.',
    retryBtn: 'Retry'
  }
};

const App = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  const t = TRANSLATIONS[progress.lang];

  const [view, setView] = useState<'dashboard' | 'lesson' | 'quiz' | 'certificate' | 'library'>('dashboard');
  const [viewMode, setViewMode] = useState<'responsive' | 'desktop'>('responsive');
  const [activeLevel, setActiveLevel] = useState<Level>(progress.currentLevel);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showRiddleAnswers, setShowRiddleAnswers] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<LibraryItem | null>(null);

  useEffect(() => {
    writeStorage('maliki_fiqh_progress_v2_2', JSON.stringify(progress));
  }, [progress]);

  const toggleLanguage = () => {
    const order: Language[] = ['ar', 'fr', 'en'];
    const next = order[(order.indexOf(progress.lang) + 1) % order.length];
    setProgress(p => ({ ...p, lang: next }));
  };

  const generateLesson = async (topic: string, levelId: Level, forceNew: boolean = false) => {
    setLoading(true);
    setError(null);
    setCurrentTopic(topic);
    setQuizScore(null);
    setSelectedAnswers({});
    setShowRiddleAnswers({});

    const cacheKey = `cache_v2_2_${topic}_${progress.lang}`;
    
    if (!forceNew) {
      if (LOCAL_DB[topic]) {
        setLessonContent(LOCAL_DB[topic]);
        setLoading(false);
        setView('lesson');
        return;
      }
      const cached = readStorage(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setLessonContent(parsed);
          setLoading(false);
          setView('lesson');
          return;
        } catch (e) {
          removeStorage(cacheKey);
        }
      }
    }

    try {
      const data = await requestGeneratedLesson(topic, levelId, progress.lang);
      writeStorage(cacheKey, JSON.stringify(data));
      setLessonContent(data);
      setView('lesson');
      window.scrollTo(0,0);
    } catch (err) {
      console.warn('Lesson generation failed:', err);
      const offlineLesson = buildOfflineLesson(topic, levelId, progress.lang);
      writeStorage(cacheKey, JSON.stringify(offlineLesson));
      setLessonContent(offlineLesson);
      setView('lesson');
      window.scrollTo(0,0);
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = () => {
    if (!lessonContent) return;
    let correct = 0;
    lessonContent.quiz.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) correct++;
    });
    const score = Math.round((correct / lessonContent.quiz.length) * 100);
    setQuizScore(score);

    if (score >= 70 && currentTopic) {
      setProgress(p => {
        const newCompleted = p.completedLessons.includes(currentTopic) 
          ? p.completedLessons 
          : [...p.completedLessons, currentTopic];
        
        const currentLvlConfig = LEVELS.find(l => l.id === activeLevel);
        const allDone = currentLvlConfig?.topics[p.lang].every(t => newCompleted.includes(t));
        
        const newCerts = allDone && !p.certificates.includes(activeLevel) 
          ? [...p.certificates, activeLevel] 
          : p.certificates;

        return {
          ...p,
          completedLessons: newCompleted,
          scores: { ...p.scores, [currentTopic]: score },
          certificates: newCerts
        };
      });
    }
  };

  const renderDashboard = () => {
    const currentLvl = LEVELS.find(l => l.id === activeLevel)!;
    return (
      <div className={`w-full space-y-12 animate-in fade-in duration-700 pb-24 px-4 ${viewMode === 'desktop' ? 'max-w-6xl mx-auto' : ''}`}>
        <header className="text-center py-12 space-y-4">
          <div className="flex flex-col items-center gap-4">
            <span className="bg-emerald-50 text-emerald-800 px-4 py-1 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-2">
              <ShieldCheck size={14} /> {t.version}
            </span>
            <button onClick={toggleLanguage} className="bg-white border p-2 rounded-full shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 font-bold px-4">
              <Languages size={18} /> {progress.lang.toUpperCase()}
            </button>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 font-serif-arabic">{t.title}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-xl font-serif-arabic italic">{t.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEVELS.map(lvl => (
            <div 
              key={lvl.id} 
              onClick={() => setActiveLevel(lvl.id)}
              className={`p-6 rounded-3xl border-4 transition-all cursor-pointer flex flex-col justify-between h-56 ${activeLevel === lvl.id ? 'border-emerald-600 bg-white shadow-xl scale-105 z-10' : 'border-slate-100 bg-slate-50 opacity-80'}`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeLevel === lvl.id ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-400 border'}`}>
                  {lvl.id === Level.EXPERT ? <PenTool size={24} /> : <GraduationCap size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-serif-arabic leading-tight">{lvl.titles[progress.lang]}</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1 line-clamp-2">{lvl.descriptions[progress.lang]}</p>
                </div>
              </div>
              <div className={`text-xs font-black flex items-center gap-1 ${activeLevel === lvl.id ? 'text-emerald-700' : 'text-slate-400'}`}>
                {activeLevel === lvl.id ? <Unlock size={14} /> : <Search size={14} />} {activeLevel === lvl.id ? t.browse : t.preview}
              </div>
            </div>
          ))}
        </div>

        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-50 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-3xl font-black font-serif-arabic flex items-center gap-3 text-slate-900">
              <BookOpen className="text-emerald-600" /> {currentLvl.mainTexts[progress.lang]}
            </h2>
            <div className="bg-slate-50 px-4 py-2 rounded-xl flex gap-6 text-sm border">
              <div className="text-center">
                <span className="block text-slate-500 font-bold uppercase text-[9px] mb-1">{t.courses}</span>
                <span className="font-black text-emerald-700">{currentLvl.topics[progress.lang].filter(t => progress.completedLessons.includes(t)).length}/{currentLvl.topics[progress.lang].length}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 mb-8 flex gap-4 items-start shadow-sm">
             <Quote className="text-amber-800 shrink-0" size={20} />
             <p className="text-slate-800 font-serif-arabic text-lg font-bold leading-relaxed">{currentLvl.mainTextBios[progress.lang]}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentLvl.topics[progress.lang].map((topic, idx) => (
              <div 
                key={idx} 
                onClick={() => !loading && generateLesson(topic, activeLevel)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${progress.completedLessons.includes(topic) ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100 hover:border-emerald-300 hover:shadow-lg'}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm transition-colors ${progress.completedLessons.includes(topic) ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100'}`}>{idx + 1}</span>
                  <span className="font-bold font-serif-arabic text-slate-900 text-lg">{topic}</span>
                </div>
                {progress.completedLessons.includes(topic) ? <CheckCircle className="text-emerald-600" size={20} /> : <ChevronRight className="text-slate-300 group-hover:text-emerald-500" size={20} />}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const renderLesson = () => {
    if (!lessonContent) return null;
    return (
      <div className={`max-w-4xl mx-auto py-12 px-4 animate-in slide-in-from-bottom duration-500 pb-40`}>
        <button onClick={() => setView('dashboard')} className="mb-8 flex items-center gap-2 text-slate-600 font-bold hover:text-emerald-700 transition-colors">
          <ArrowRight size={20} /> {t.backToCurriculum}
        </button>
        <article className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-12 border border-slate-50">
          <h1 className="text-3xl md:text-5xl font-black font-serif-arabic text-center text-slate-900 leading-tight">{lessonContent.title}</h1>
          
          <div className="bg-amber-50/50 p-6 md:p-10 rounded-3xl border-2 border-amber-100 text-xl md:text-2xl font-serif-arabic text-center leading-[2.2] font-bold text-amber-950 shadow-inner overflow-hidden">
             <div className="max-w-[95%] mx-auto whitespace-pre-wrap">
               {lessonContent.matn}
             </div>
          </div>

          <div className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-2xl font-black font-serif-arabic text-emerald-900 border-r-4 border-emerald-600 pr-3">{t.explanationLabel}</h3>
              <p className="text-xl md:text-2xl leading-relaxed font-serif-arabic text-slate-900 whitespace-pre-line text-justify">{lessonContent.body}</p>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 shadow-sm">
                <h4 className="flex items-center gap-2 font-black text-blue-900 mb-4 text-xl"><Lightbulb size={24}/> {t.applicationsLabel}</h4>
                <ul className="space-y-3 list-disc list-inside text-lg font-serif-arabic font-bold text-slate-800">
                  {lessonContent.detailedExamples.map((ex, i) => <li key={i}>{ex}</li>)}
                </ul>
              </div>
              <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 shadow-sm">
                <h4 className="flex items-center gap-2 font-black text-emerald-900 mb-4 text-xl"><Award size={24}/> {t.proofLabel}</h4>
                <p className="text-lg font-serif-arabic font-bold text-slate-800 leading-relaxed">{lessonContent.evidence}</p>
              </div>
            </div>

            <section className="bg-slate-900 text-white p-10 rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Scale size={100} /></div>
              <h3 className="text-2xl font-black font-serif-arabic text-emerald-400 relative z-10">{t.comparativeLabel}</h3>
              <p className="text-xl font-serif-arabic leading-relaxed italic relative z-10">{lessonContent.comparativeFiqh}</p>
            </section>

            <section className="bg-amber-50/30 p-8 rounded-3xl border border-amber-100">
              <h3 className="text-xl font-black text-amber-950 font-serif-arabic mb-6 flex items-center gap-2"><MessageSquareQuote /> {t.riddlesLabel}</h3>
              <div className="grid gap-4">
                {lessonContent.fiqhRiddles.map((r, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
                    <p className="text-lg font-serif-arabic font-bold text-slate-900 mb-3 italic">"{r.riddle}"</p>
                    <button onClick={() => setShowRiddleAnswers(p => ({...p, [i]: !p[i]}))} className="text-sm font-black text-amber-800 hover:underline">
                      {showRiddleAnswers[i] ? t.hideAnswerLabel : t.answerLabel}
                    </button>
                    {showRiddleAnswers[i] && <p className="mt-3 p-4 bg-amber-50 rounded-xl font-serif-arabic font-black text-amber-950 animate-in fade-in">{r.answer}</p>}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <button onClick={() => setView('quiz')} className="group w-full py-8 bg-emerald-700 text-white rounded-3xl font-black text-2xl hover:bg-emerald-800 shadow-xl transition-all font-serif-arabic flex items-center justify-center gap-4">
            {t.examBtn} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </article>
      </div>
    );
  };

  const renderQuiz = () => {
    if (!lessonContent) return null;
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 pb-32">
        <header className="text-center space-y-4">
          <h2 className="text-3xl font-black font-serif-arabic text-slate-900">{t.quizTitle}</h2>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{lessonContent.quiz.length} أسئلة تقويمية</p>
        </header>
        
        {lessonContent.quiz.map((q, idx) => (
          <div key={idx} className={`bg-white p-8 rounded-3xl shadow-lg border-2 space-y-6 transition-all ${quizScore !== null ? (selectedAnswers[idx] === q.correctAnswer ? 'border-emerald-100' : 'border-red-100') : 'border-slate-50'}`}>
            <h4 className="text-xl font-black font-serif-arabic leading-relaxed text-slate-900">
              <span className="inline-block bg-slate-100 text-slate-700 w-8 h-8 rounded-full text-center leading-8 ml-3 text-sm font-bold">{idx + 1}</span>
              {q.question}
            </h4>
            <div className="grid gap-3">
              {q.options.map((opt, oIdx) => (
                <button 
                  key={oIdx}
                  disabled={quizScore !== null}
                  onClick={() => setSelectedAnswers(p => ({...p, [idx]: oIdx}))}
                  className={`p-5 rounded-2xl border-2 text-right font-bold font-serif-arabic text-lg transition-all ${
                    quizScore !== null 
                    ? (q.correctAnswer === oIdx ? 'bg-emerald-800 border-emerald-900 text-white shadow-lg ring-4 ring-emerald-100' : selectedAnswers[idx] === oIdx ? 'bg-red-800 border-red-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100 opacity-60')
                    : (selectedAnswers[idx] === oIdx ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-md ring-4 ring-emerald-50' : 'bg-slate-50 border-slate-100 hover:border-emerald-300 hover:bg-white text-slate-800')
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {quizScore !== null && (
              <div className="bg-slate-900 text-white p-6 rounded-2xl border-r-8 border-emerald-500 font-serif-arabic italic text-lg leading-relaxed shadow-lg animate-in slide-in-from-top-2">
                <span className="flex items-center gap-2 font-black text-emerald-400 mb-2">
                  <Info size={18} /> {t.sheikhComment}
                </span>
                {q.explanation}
              </div>
            )}
          </div>
        ))}

        {quizScore === null ? (
          <button 
            onClick={submitQuiz}
            disabled={Object.keys(selectedAnswers).length < lessonContent.quiz.length}
            className="w-full py-8 bg-slate-900 text-white rounded-3xl font-black text-2xl shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-95"
          >
            {t.submitQuiz}
          </button>
        ) : (
          <div className="space-y-4">
            <div className={`p-10 rounded-[2.5rem] text-center text-white shadow-2xl animate-in zoom-in ${quizScore >= 70 ? 'bg-emerald-600' : 'bg-red-600'}`}>
              <span className="text-7xl font-black block mb-4">{quizScore}%</span>
              <p className="font-black font-serif-arabic text-2xl">{quizScore >= 70 ? t.quizSuccess : t.quizFail}</p>
            </div>
            <button onClick={() => setView('dashboard')} className="w-full py-6 bg-slate-200 text-slate-900 rounded-2xl font-bold text-xl hover:bg-slate-300 transition-colors">{t.returnToPlan}</button>
          </div>
        )}
      </div>
    );
  };

  const renderLibrary = () => {
    return (
      <div className="w-full max-w-6xl mx-auto py-12 px-4 space-y-12 pb-32">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-black font-serif-arabic text-slate-900">{t.libraryTitle}</h1>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder={t.librarySearch}
              className="w-full py-4 pr-12 pl-6 rounded-full border-2 border-slate-100 outline-none focus:border-emerald-600 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LIBRARY_ITEMS.filter(b => b.titles[progress.lang].includes(searchTerm)).map(book => (
            <div 
              key={book.id} 
              onClick={() => setSelectedBook(book)}
              className="bg-white p-8 rounded-[2.5rem] shadow-lg border-2 border-slate-50 hover:border-emerald-600 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <ScrollText size={32} />
                </div>
                <h3 className="text-2xl font-black font-serif-arabic mb-2 text-slate-900 group-hover:text-emerald-900">{book.titles[progress.lang]}</h3>
                <p className="text-sm text-emerald-800 font-bold mb-6">{book.authors[progress.lang]}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase">{book.category}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-black text-xs">{t.openBtn} <ChevronRight size={14}/></span>
              </div>
            </div>
          ))}
        </div>

        {selectedBook && (
          <div className="fixed inset-0 bg-slate-900/60 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl rounded-[3rem] max-h-[90vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl animate-in zoom-in duration-300">
              <button onClick={() => setSelectedBook(null)} className="absolute top-8 right-8 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-all"><X /></button>
              <div className="mb-10">
                <h2 className="text-4xl font-black font-serif-arabic mb-2 text-slate-900">{selectedBook.titles[progress.lang]}</h2>
                <p className="text-emerald-800 font-bold text-xl">{selectedBook.authors[progress.lang]}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-50 p-6 rounded-3xl border">
                  <h4 className="font-black text-slate-900 mb-2 flex items-center gap-2 text-sm"><User size={16}/> {t.authorBio}</h4>
                  <p className="text-sm font-serif-arabic text-slate-700 leading-relaxed font-bold italic">{selectedBook.authorBios[progress.lang]}</p>
                </div>
                <div className="bg-emerald-50/30 p-6 rounded-3xl border border-emerald-100">
                  <h4 className="font-black text-emerald-900 mb-2 flex items-center gap-2 text-sm"><ShoppingBag size={16}/> {t.bestEdition}</h4>
                  <p className="text-sm font-serif-arabic text-emerald-900 leading-relaxed font-black">{selectedBook.recommendedEditions[progress.lang]}</p>
                </div>
              </div>

              <div className="bg-amber-50 p-6 md:p-12 rounded-[2.5rem] text-xl md:text-2xl font-serif-arabic leading-[2.4] font-bold text-amber-950 text-center border-4 border-amber-100 shadow-inner whitespace-pre-line overflow-hidden">
                <div className="max-w-[90%] mx-auto">
                  {selectedBook.content}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderError = () => (
    <div className="fixed inset-0 bg-white z-[600] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-8">
        <AlertCircle size={48} />
      </div>
      <h2 className="text-4xl font-black font-serif-arabic text-slate-900 mb-4">{t.errorTitle}</h2>
      <p className="text-xl text-slate-600 font-serif-arabic max-w-md mb-8 leading-relaxed font-bold">{error}</p>
      <button 
        onClick={() => currentTopic && generateLesson(currentTopic, activeLevel, true)}
        className="flex items-center gap-2 bg-emerald-700 text-white px-10 py-4 rounded-full font-black text-xl hover:bg-emerald-800 transition-all shadow-xl"
      >
        <RefreshCcw size={20} /> {t.retryBtn}
      </button>
      <button onClick={() => {setError(null); setView('dashboard')}} className="mt-4 text-slate-400 font-bold hover:underline">
        {t.homeBtn}
      </button>
    </div>
  );

  if (loading) return (
    <div className="fixed inset-0 bg-white/98 z-[500] flex flex-col items-center justify-center text-center p-6">
      <div className="relative">
        <div className="w-24 h-24 border-8 border-emerald-50 border-t-emerald-600 rounded-full animate-spin shadow-xl"></div>
        <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
          <Loader2 className="animate-pulse" size={32} />
        </div>
      </div>
      <h3 className="mt-10 text-3xl font-black text-slate-900 font-serif-arabic">{t.loading}</h3>
      <p className="mt-2 text-slate-400 font-serif-arabic font-bold text-lg italic">"يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ"</p>
    </div>
  );

  if (error) return renderError();

  return (
    <main className="min-h-screen bg-[#fafaf9] font-sans selection:bg-emerald-200">
      <style>{`
        .font-serif-arabic { font-family: 'Amiri', serif; }
        body { font-family: 'Noto Kufi Arabic', sans-serif; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
        .no-print { @media print { display: none !important; } }
      `}</style>

      <div className="max-w-[1400px] mx-auto min-h-screen">
        {view === 'dashboard' && renderDashboard()}
        {view === 'lesson' && renderLesson()}
        {view === 'quiz' && renderQuiz()}
        {view === 'library' && renderLibrary()}
      </div>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-2xl border-2 border-slate-100 py-4 px-10 flex gap-12 rounded-full shadow-3xl z-[200] no-print w-fit">
        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center gap-1 transition-all ${view === 'dashboard' ? 'text-emerald-700 scale-125' : 'text-slate-400 hover:text-slate-600'}`}>
          <BarChart3 size={28} />
          <span className="text-[10px] font-black font-serif-arabic">{t.curriculumTab}</span>
        </button>
        <button onClick={() => setView('library')} className={`flex flex-col items-center gap-1 transition-all ${view === 'library' ? 'text-emerald-700 scale-125' : 'text-slate-400 hover:text-slate-600'}`}>
          <BookMarked size={28} />
          <span className="text-[10px] font-black font-serif-arabic">{t.libraryTab}</span>
        </button>
        <button onClick={() => setViewMode(v => v === 'responsive' ? 'desktop' : 'responsive')} className={`flex flex-col items-center gap-1 transition-all ${viewMode === 'desktop' ? 'text-emerald-700 scale-125' : 'text-slate-400'}`}>
          <Monitor size={28} />
          <span className="text-[10px] font-black font-serif-arabic">{t.desktopTab}</span>
        </button>
      </nav>

      <div className="fixed bottom-4 left-6 text-[10px] font-bold text-slate-300 font-serif-arabic hidden md:block uppercase tracking-widest">{t.designedBy}</div>
    </main>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
