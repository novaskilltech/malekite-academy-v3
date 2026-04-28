
export enum Level {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export type Language = 'ar' | 'fr' | 'en';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FiqhRiddle {
  riddle: string;
  answer: string;
}

export interface LessonContent {
  title: string;
  matn: string;
  body: string;
  detailedExamples: string[];
  fiqhIssues: string[];
  fiqhRiddles: FiqhRiddle[];
  evidence: string;
  comparativeFiqh: string;
  references: string[];
  quiz: QuizQuestion[];
}

export interface UserProgress {
  currentLevel: Level;
  completedLessons: string[];
  scores: Record<string, number>;
  certificates: Level[];
  lang: Language;
}

export interface LevelConfig {
  id: Level;
  titles: Record<Language, string>;
  descriptions: Record<Language, string>;
  mainTexts: Record<Language, string>;
  mainTextBios: Record<Language, string>;
  topics: Record<Language, string[]>;
}

export interface LibraryItem {
  id: string;
  titles: Record<Language, string>;
  authors: Record<Language, string>;
  authorBios: Record<Language, string>;
  recommendedEditions: Record<Language, string>;
  descriptions: Record<Language, string>;
  content: string; // The original Arabic text is usually preserved in religious study
  category: 'متون' | 'شروح' | 'أصول';
  level: Level;
}
