export type ThemeMode = 'light' | 'dark';

export type AcademicClass = '9' | '11';

export type ThemePalette =
  | 'nordic-sage'
  | 'sakura-pink'
  | 'oxford-navy'
  | 'warm-terracotta'
  | 'lavender-wisteria'
  | 'slate-monochrome';

export type ProgressBarStyle = 'straight' | 'circular' | 'pill' | 'segmented' | 'star';

export interface ColorTokens {
  canvas: string;
  surface: string;
  surfaceHover: string;
  elevated: string;
  borderSubtle: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentPrimary: string;
  accentHover: string;
  accentMuted: string;
  accentText: string;
  accentSoftBg: string;
  ringColor: string;
  tagBg: string;
  progressBarBg: string;
}

export type SubjectId = 'english' | 'maths' | 'science' | 'sst' | 'hindi' | 'computer';

export interface Subtopic {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtopics: Subtopic[];
}

export interface SubjectProgress {
  id: SubjectId;
  name: string;
  shortCode: string;
  iconName: string;
  colorAccent: string;
  softBg: string;
  chaptersCount: number;
  completedChapters: number;
  totalSubtopics: number;
  completedSubtopics: number;
  currentChapter: string;
  currentTopic: string;
  chapters: Chapter[];
}

export type ActiveSection =
  | 'home'
  | 'syllabus'
  | 'error-book'
  | 'focus-timer'
  | 'daily-goals'
  | 'notes-vault'
  | 'breathing'
  | 'settings';
