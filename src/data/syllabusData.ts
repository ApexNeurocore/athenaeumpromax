import { SubjectProgress, SubjectId } from '../types/theme';

export const INITIAL_SUBJECTS: SubjectProgress[] = [
  {
    id: 'maths',
    name: 'Mathematics',
    shortCode: 'MATHS',
    iconName: 'Calculator',
    colorAccent: '#2D5A46', // Primary Sage
    softBg: '#EAF2ED',
    chaptersCount: 14,
    completedChapters: 8,
    totalSubtopics: 42,
    completedSubtopics: 28,
    currentChapter: 'Chapter 9: Coordinate Geometry',
    currentTopic: 'Section Formula & Distance Derivation',
    chapters: [
      {
        id: 'math-ch-1',
        number: 1,
        title: 'Real Numbers & Fundamental Arithmetic',
        subtopics: [
          { id: 'm1-1', title: 'Euclid Division & Prime Factorization', completed: true },
          { id: 'm1-2', title: 'Irrational Numbers Proofs (√2, √3)', completed: true },
          { id: 'm1-3', title: 'Terminating & Non-Terminating Decimals', completed: true },
        ],
      },
      {
        id: 'math-ch-2',
        number: 2,
        title: 'Polynomials & Zeros Relationship',
        subtopics: [
          { id: 'm2-1', title: 'Geometrical Meaning of Zeros', completed: true },
          { id: 'm2-2', title: 'Relationship between Coefficients & Zeros', completed: true },
          { id: 'm2-3', title: 'Division Algorithm for Polynomials', completed: true },
        ],
      },
      {
        id: 'math-ch-9',
        number: 9,
        title: 'Coordinate Geometry',
        subtopics: [
          { id: 'm9-1', title: 'Distance Formula & Applications', completed: true },
          { id: 'm9-2', title: 'Section Formula & Collinearity', completed: false },
          { id: 'm9-3', title: 'Area of Triangle (Cartesian Plane)', completed: false },
        ],
      },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    shortCode: 'SCI',
    iconName: 'Atom',
    colorAccent: '#3B6B55',
    softBg: '#EDF5F1',
    chaptersCount: 16,
    completedChapters: 10,
    totalSubtopics: 50,
    completedSubtopics: 35,
    currentChapter: 'Chapter 11: Light — Reflection & Refraction',
    currentTopic: 'Refraction through Glass Prism & Snell Law',
    chapters: [
      {
        id: 'sci-ch-1',
        number: 1,
        title: 'Chemical Reactions & Equations',
        subtopics: [
          { id: 's1-1', title: 'Balancing Chemical Equations', completed: true },
          { id: 's1-2', title: 'Types of Reactions (Combination, Decomposition)', completed: true },
          { id: 's1-3', title: 'Oxidation, Reduction, Rancidity & Corrosion', completed: true },
        ],
      },
      {
        id: 'sci-ch-6',
        number: 6,
        title: 'Life Processes (Nutrition, Respiration)',
        subtopics: [
          { id: 's6-1', title: 'Autotrophic & Heterotrophic Nutrition', completed: true },
          { id: 's6-2', title: 'Human Digestive System Anatomy', completed: true },
          { id: 's6-3', title: 'Cellular Respiration & Gas Exchange', completed: true },
        ],
      },
    ],
  },
  {
    id: 'english',
    name: 'English Language & Literature',
    shortCode: 'ENG',
    iconName: 'BookMarked',
    colorAccent: '#457B64',
    softBg: '#EFF6F2',
    chaptersCount: 18,
    completedChapters: 13,
    totalSubtopics: 46,
    completedSubtopics: 34,
    currentChapter: 'First Flight: Glimpses of India',
    currentTopic: 'A Baker from Goa & Coorg Commentary',
    chapters: [
      {
        id: 'eng-ch-1',
        number: 1,
        title: 'A Letter to God (Prose)',
        subtopics: [
          { id: 'e1-1', title: 'Reading & Character Sketch of Lencho', completed: true },
          { id: 'e1-2', title: 'Thematic Analysis & Irony in Faith', completed: true },
          { id: 'e1-3', title: 'Short & Long Answer Question Practice', completed: true },
        ],
      },
    ],
  },
  {
    id: 'sst',
    name: 'Social Studies (History, Civics, Geo, Eco)',
    shortCode: 'SST',
    iconName: 'Globe',
    colorAccent: '#4D6C5E',
    softBg: '#EDF2EF',
    chaptersCount: 20,
    completedChapters: 11,
    totalSubtopics: 58,
    completedSubtopics: 33,
    currentChapter: 'History: The Rise of Nationalism in Europe',
    currentTopic: 'The Making of Nationalism & Romantic Imagination',
    chapters: [
      {
        id: 'sst-ch-1',
        number: 1,
        title: 'The Rise of Nationalism in Europe',
        subtopics: [
          { id: 'sst1-1', title: 'The French Revolution & The Idea of the Nation', completed: true },
          { id: 'sst1-2', title: 'The Making of Nationalism in Europe', completed: true },
          { id: 'sst1-3', title: 'The Age of Revolutions: 1830–1848', completed: false },
        ],
      },
    ],
  },
  {
    id: 'hindi',
    name: 'Hindi (Kshitij & Kritika)',
    shortCode: 'HINDI',
    iconName: 'Feather',
    colorAccent: '#3F6E5A',
    softBg: '#EFF5F2',
    chaptersCount: 15,
    completedChapters: 9,
    totalSubtopics: 40,
    completedSubtopics: 26,
    currentChapter: 'सूरदास के पद (Kavya Khand)',
    currentTopic: 'व्याख्या, शब्दार्थ और गोपियों का वाक्चातुर्य',
    chapters: [
      {
        id: 'hin-ch-1',
        number: 1,
        title: 'सूरदास के पद (भावार्थ व प्रश्नोत्तर)',
        subtopics: [
          { id: 'h1-1', title: 'प्रथम व द्वितीय पद का सप्रसंग भावार्थ', completed: true },
          { id: 'h1-2', title: 'उद्धव-गोपी संवाद व काव्य सौन्दर्य', completed: true },
          { id: 'h1-3', title: 'पाठ्यपुस्तक अभ्यास व व्याकरणिक प्रश्न', completed: true },
        ],
      },
    ],
  },
  {
    id: 'computer',
    name: 'Computer Applications',
    shortCode: 'COMPUTE',
    iconName: 'Laptop',
    colorAccent: '#35634F',
    softBg: '#EBF4F0',
    chaptersCount: 10,
    completedChapters: 7,
    totalSubtopics: 32,
    completedSubtopics: 24,
    currentChapter: 'HTML & CSS Styling Fundamentals',
    currentTopic: 'Tables, Forms & Responsive Grid Layouts',
    chapters: [
      {
        id: 'comp-ch-1',
        number: 1,
        title: 'Basics of Networking & Cyber Ethics',
        subtopics: [
          { id: 'c1-1', title: 'Internet Protocols & Cloud Concepts', completed: true },
          { id: 'c1-2', title: 'Information Security & Digital Footprints', completed: true },
          { id: 'c1-3', title: 'Netiquettes and Safe Browsing', completed: true },
        ],
      },
    ],
  },
];

export function calculateProgressStats(subjects: SubjectProgress[]) {
  const totalSubtopics = subjects.reduce((acc, s) => acc + s.totalSubtopics, 0);
  const completedSubtopics = subjects.reduce((acc, s) => acc + s.completedSubtopics, 0);
  const totalChapters = subjects.reduce((acc, s) => acc + s.chaptersCount, 0);
  const completedChapters = subjects.reduce((acc, s) => acc + s.completedChapters, 0);

  const overallPercentage = totalSubtopics > 0 ? Number(((completedSubtopics / totalSubtopics) * 100).toFixed(2)) : 0;

  return {
    totalSubtopics,
    completedSubtopics,
    totalChapters,
    completedChapters,
    overallPercentage,
  };
}
