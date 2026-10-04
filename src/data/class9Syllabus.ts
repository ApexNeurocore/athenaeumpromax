export interface SyllabusStage {
  id: string;
  name: string;
  completed: boolean;
  completedAt?: string;
}

export interface SyllabusChapter {
  id: string;
  number?: number;
  title: string;
  stages: SyllabusStage[];
}

export interface SyllabusSubject {
  id: string;
  name: string;
  shortCode: string;
  hindiName?: string;
  chapters: SyllabusChapter[];
}

export const CLASS_9_SYLLABUS: SyllabusSubject[] = [
  {
    id: 'maths',
    name: 'Mathematics',
    shortCode: 'MATHS',
    chapters: [
      {
        id: 'math-ch-1',
        number: 1,
        title: 'Chapter 1: Orienting Yourself: The Use of Coordinates',
        stages: [
          { id: 'm1-ex-1.1', name: 'Exercise 1.1', completed: false },
          { id: 'm1-ex-1.2', name: 'Exercise 1.2', completed: false },
          { id: 'm1-tr-4', name: 'Think and Reflect - 4', completed: false },
          { id: 'm1-ex', name: 'Examples', completed: false },
          { id: 'm1-ece', name: 'End-Of-Chapter Exercise', completed: false },
        ],
      },
      {
        id: 'math-ch-2',
        number: 2,
        title: 'Chapter 2: Introduction to Linear Polynomials',
        stages: [
          { id: 'm2-ex-2.1', name: 'Exercise 2.1', completed: false },
          { id: 'm2-ex-2.2', name: 'Exercise 2.2', completed: false },
          { id: 'm2-ex-2.3', name: 'Exercise 2.3', completed: false },
          { id: 'm2-ex-2.4', name: 'Exercise 2.4', completed: false },
          { id: 'm2-ex-2.5', name: 'Exercise 2.5', completed: false },
          { id: 'm2-ex-2.6', name: 'Exercise 2.6', completed: false },
          { id: 'm2-tr-15', name: 'Think and Reflect - 15', completed: false },
          { id: 'm2-ex-16', name: 'Examples - 16', completed: false },
          { id: 'm2-ece', name: 'End-Of-Chapter Exercise', completed: false },
        ],
      },
      {
        id: 'math-ch-3',
        number: 3,
        title: 'Chapter 3: The World of Numbers',
        stages: [
          { id: 'm3-ex-3.1', name: 'Exercise 3.1', completed: false },
          { id: 'm3-ex-3.2', name: 'Exercise 3.2', completed: false },
          { id: 'm3-ex-3.3', name: 'Exercise 3.3', completed: false },
          { id: 'm3-ex-3.4', name: 'Exercise 3.4', completed: false },
          { id: 'm3-ex-3.5', name: 'Exercise 3.5', completed: false },
          { id: 'm3-tr-11', name: 'Think and Reflect - 11', completed: false },
          { id: 'm3-ex-9', name: 'Examples - 9', completed: false },
          { id: 'm3-ece', name: 'End-Of-Chapter Exercise', completed: false },
        ],
      },
      {
        id: 'math-ch-4',
        number: 4,
        title: 'Chapter 4: Exploring Algebraic Identities',
        stages: [
          { id: 'm4-ex-4.1', name: 'Exercise 4.1', completed: false },
          { id: 'm4-ex-4.2', name: 'Exercise 4.2', completed: false },
          { id: 'm4-ex-4.3', name: 'Exercise 4.3', completed: false },
          { id: 'm4-ex-4.4', name: 'Exercise 4.4', completed: false },
          { id: 'm4-ex-4.5', name: 'Exercise 4.5', completed: false },
          { id: 'm4-tr-11', name: 'Think and Reflect - 11', completed: false },
          { id: 'm4-ex-18', name: 'Examples - 18', completed: false },
          { id: 'm4-ece', name: 'End-Of-Chapter Exercise', completed: false },
        ],
      },
      {
        id: 'math-ch-5',
        number: 5,
        title: "Chapter 5: I'm Up and Down and Round and Round",
        stages: [
          { id: 'm5-ex-5.1', name: 'Exercise 5.1', completed: false },
          { id: 'm5-ex-5.2', name: 'Exercise 5.2', completed: false },
          { id: 'm5-ex-5.3', name: 'Exercise 5.3', completed: false },
          { id: 'm5-ex-5.4', name: 'Exercise 5.4', completed: false },
          { id: 'm5-ex-5.5', name: 'Exercise 5.5', completed: false },
          { id: 'm5-ex-5.6', name: 'Exercise 5.6', completed: false },
          { id: 'm5-tr-8', name: 'Think and Reflect - 8', completed: false },
          { id: 'm5-ece', name: 'End-Of-Chapter Exercise', completed: false },
        ],
      },
      {
        id: 'math-ch-6',
        number: 6,
        title: 'Chapter 6: Measuring Space: Perimeter and Area',
        stages: [
          { id: 'm6-ex-6.1', name: 'Exercise 6.1', completed: false },
          { id: 'm6-ex-6.2', name: 'Exercise 6.2', completed: false },
          { id: 'm6-ex-6.3', name: 'Exercise 6.3', completed: false },
          { id: 'm6-tr-10', name: 'Think and Reflect - 10', completed: false },
          { id: 'm6-ex-7', name: 'Examples - 7', completed: false },
          { id: 'm6-ece', name: 'End-Of-Chapter Exercise', completed: false },
        ],
      },
      {
        id: 'math-ch-7',
        number: 7,
        title: 'Chapter 7: The Mathematics of Maybe: Introduction to Probability',
        stages: [
          { id: 'm7-ex-7.1', name: 'Exercise 7.1', completed: false },
          { id: 'm7-ex-7.2', name: 'Exercise 7.2', completed: false },
          { id: 'm7-ex-7.3', name: 'Exercise 7.3', completed: false },
          { id: 'm7-ex-7.4', name: 'Exercise 7.4', completed: false },
          { id: 'm7-tr-5', name: 'Think and Reflect - 5', completed: false },
          { id: 'm7-ex-7', name: 'Example - 7', completed: false },
          { id: 'm7-ece', name: 'End-Of-Chapter Exercise', completed: false },
        ],
      },
      {
        id: 'math-ch-8',
        number: 8,
        title: 'Chapter 8: Predicting What Comes Next: Exploring Sequences and Progression',
        stages: [
          { id: 'm8-ex-8.1', name: 'Exercise 8.1', completed: false },
          { id: 'm8-ex-8.2', name: 'Exercise 8.2', completed: false },
          { id: 'm8-ex-8.3', name: 'Exercise 8.3', completed: false },
          { id: 'm8-tr-20', name: 'Think & Reflect - 20', completed: false },
          { id: 'm8-ex-10', name: 'Examples - 10', completed: false },
          { id: 'm8-ece', name: 'End-Of-Chapter Exercise', completed: false },
        ],
      },
      {
        id: 'math-ch-9',
        number: 9,
        title: 'Chapter 9: Proportions and their Converses',
        stages: [
          { id: 'm9-ex-9.1', name: 'Exercise 9.1', completed: false },
          { id: 'm9-tr-2', name: 'Think and Reflect - 2', completed: false },
          { id: 'm9-ex-5', name: 'Examples - 5', completed: false },
        ],
      },
      {
        id: 'math-ch-10',
        number: 10,
        title: 'Chapter 10: How Quantities Combine: Understanding Data',
        stages: [
          { id: 'm10-ex-10.1', name: 'Exercise 10.1', completed: false },
          { id: 'm10-ex-10.2', name: 'Exercise 10.2', completed: false },
          { id: 'm10-ex-10.3', name: 'Exercise 10.3', completed: false },
          { id: 'm10-ex-10.4', name: 'Exercise 10.4', completed: false },
          { id: 'm10-ex-10.5', name: 'Exercise 10.5', completed: false },
          { id: 'm10-tr-5', name: 'Think and Reflect - 5', completed: false },
          { id: 'm10-ex-9', name: 'Examples - 9', completed: false },
          { id: 'm10-ece', name: 'End-Of-Chapter Exercise', completed: false },
        ],
      },
      {
        id: 'math-ch-11',
        number: 11,
        title: 'Chapter 11: The World of Algorithms',
        stages: [
          { id: 'm11-ex-11.1', name: 'Exercise 11.1', completed: false },
          { id: 'm11-ex-11.2', name: 'Exercise 11.2', completed: false },
          { id: 'm11-ex-11.3', name: 'Exercise 11.3', completed: false },
          { id: 'm11-ece', name: 'ECE (End of Chapter Exercise)', completed: false },
          { id: 'm11-tr', name: 'Think and Reflect', completed: false },
        ],
      },
      {
        id: 'math-ch-12',
        number: 12,
        title: 'Chapter 12: Quadrilaterals',
        stages: [
          { id: 'm12-ex-12.1', name: 'Exercise 12.1', completed: false },
          { id: 'm12-ex-12.2', name: 'Exercise 12.2', completed: false },
          { id: 'm12-ex-12.3', name: 'Exercise 12.3', completed: false },
          { id: 'm12-ex-12.4', name: 'Exercise 12.4', completed: false },
          { id: 'm12-ece', name: 'End-Of-Chapter Exercise', completed: false },
          { id: 'm12-tr-8', name: 'Think and Reflect - 8', completed: false },
        ],
      },
      {
        id: 'math-ch-13',
        number: 13,
        title: 'Chapter 13: Two Variables, One Line',
        stages: [
          { id: 'm13-ex-13.1', name: 'Exercise 13.1', completed: false },
          { id: 'm13-ex-13.2', name: 'Exercise 13.2', completed: false },
          { id: 'm13-ex-13.3', name: 'Exercise 13.3', completed: false },
          { id: 'm13-ex-13.4', name: 'Exercise 13.4', completed: false },
          { id: 'm13-ex-13.5', name: 'Exercise 13.5', completed: false },
          { id: 'm13-ece', name: 'End-Of-Chapter Exercise', completed: false },
          { id: 'm13-tr-17', name: 'Think and Reflect - 17', completed: false },
          { id: 'm13-ex-13', name: 'Examples - 13', completed: false },
        ],
      },
      {
        id: 'math-ch-14',
        number: 14,
        title: 'Chapter 14: Math of Space: Surface Area and Volume',
        stages: [
          { id: 'm14-ex-14.1', name: 'Exercise 14.1', completed: false },
          { id: 'm14-ex-14.2', name: 'Exercise 14.2', completed: false },
          { id: 'm14-ex-14.3', name: 'Exercise 14.3', completed: false },
          { id: 'm14-ex-14.4', name: 'Exercise 14.4', completed: false },
          { id: 'm14-ece', name: 'End of Chapter Exercise', completed: false },
          { id: 'm14-tr-2', name: 'Think and Reflect - 2', completed: false },
          { id: 'm14-ex-6', name: 'Examples - 6', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sst',
    name: 'Social Studies',
    shortCode: 'S.St',
    chapters: [
      {
        id: 'sst-ch-1',
        number: 1,
        title: 'Chapter 1: Understanding Social Science',
        stages: [
          { id: 'sst1-theory', name: 'Theory', completed: false },
          { id: 'sst1-intext', name: 'Intext', completed: false },
          { id: 'sst1-ex', name: 'Exercises', completed: false },
        ],
      },
      {
        id: 'sst-ch-2',
        number: 2,
        title: "Chapter 2: Shaping of the Earth's Surface",
        stages: [
          { id: 'sst2-theory', name: 'Theory', completed: false },
          { id: 'sst2-intext-13', name: 'Intext - 13', completed: false },
          { id: 'sst2-ex', name: 'Exercises', completed: false },
        ],
      },
      {
        id: 'sst-ch-3',
        number: 3,
        title: 'Chapter 3: Atmosphere and Climate',
        stages: [
          { id: 'sst3-theory', name: 'Theory', completed: false },
          { id: 'sst3-intext-11', name: 'Intext - 11', completed: false },
          { id: 'sst3-ex', name: 'Exercises', completed: false },
        ],
      },
      {
        id: 'sst-ch-4',
        number: 4,
        title: 'Chapter 4: Early Humans and Beginning of Civilisation',
        stages: [
          { id: 'sst4-theory', name: 'Theory', completed: false },
          { id: 'sst4-intext-19', name: 'Intext - 19', completed: false },
          { id: 'sst4-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-5',
        number: 5,
        title: 'Chapter 5: State and Society up to 1000 CE',
        stages: [
          { id: 'sst5-theory', name: 'Theory', completed: false },
          { id: 'sst5-intext-11', name: 'Intext - 11', completed: false },
          { id: 'sst5-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-6',
        number: 6,
        title: 'Chapter 6: Democracy',
        stages: [
          { id: 'sst6-theory', name: 'Theory', completed: false },
          { id: 'sst6-intext-14', name: 'Intext - 14', completed: false },
          { id: 'sst6-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-7',
        number: 7,
        title: 'Chapter 7: Elections',
        stages: [
          { id: 'sst7-theory', name: 'Theory', completed: false },
          { id: 'sst7-intext-9', name: 'Intext - 9', completed: false },
          { id: 'sst7-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-8',
        number: 8,
        title: 'Chapter 8: Building Blocks in Economics: The Problem of Choice',
        stages: [
          { id: 'sst8-theory', name: 'Theory', completed: false },
          { id: 'sst8-intext-6', name: 'Intext - 6', completed: false },
          { id: 'sst8-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-9',
        number: 9,
        title: 'Chapter 9: The Puzzle Price: What Drives the Market',
        stages: [
          { id: 'sst9-theory', name: 'Theory', completed: false },
          { id: 'sst9-intext-11', name: 'Intext - 11', completed: false },
          { id: 'sst9-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-10',
        number: 10,
        title: 'Chapter 10: Oceans and Life',
        stages: [
          { id: 'sst10-theory', name: 'Theory', completed: false },
          { id: 'sst10-intext', name: 'Intext', completed: false },
          { id: 'sst10-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-11',
        number: 11,
        title: 'Chapter 11: Life on Earth',
        stages: [
          { id: 'sst11-theory', name: 'Theory', completed: false },
          { id: 'sst11-intext', name: 'Intext', completed: false },
          { id: 'sst11-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-12',
        number: 12,
        title: 'Chapter 12: Resistance and Resilience (1000 CE - 1700 CE)',
        stages: [
          { id: 'sst12-theory', name: 'Theory', completed: false },
          { id: 'sst12-intext', name: 'Intext', completed: false },
          { id: 'sst12-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-13',
        number: 13,
        title: 'Chapter 13: India and World - I (1900 BCE - 1200 CE)',
        stages: [
          { id: 'sst13-theory', name: 'Theory', completed: false },
          { id: 'sst13-intext', name: 'Intext', completed: false },
          { id: 'sst13-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-14',
        number: 14,
        title: 'Chapter 14: Authority / Governance and Public Policy',
        stages: [
          { id: 'sst14-theory', name: 'Theory', completed: false },
          { id: 'sst14-intext', name: 'Intext', completed: false },
          { id: 'sst14-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-15',
        number: 15,
        title: 'Chapter 15: From Ideas to Start Ups',
        stages: [
          { id: 'sst15-theory', name: 'Theory', completed: false },
          { id: 'sst15-intext', name: 'Intext', completed: false },
          { id: 'sst15-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sst-ch-16',
        number: 16,
        title: 'Chapter 16: Smart Ways to Manage Your Finances',
        stages: [
          { id: 'sst16-theory', name: 'Theory', completed: false },
          { id: 'sst16-intext', name: 'Intext', completed: false },
          { id: 'sst16-ex', name: 'Exercise', completed: false },
        ],
      },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    shortCode: 'SCIENCE',
    chapters: [
      {
        id: 'sci-ch-1',
        number: 1,
        title: 'Chapter 1: Exploration: Entering the World of Secondary Science',
        stages: [
          { id: 'sci1-theory', name: 'Theory', completed: false },
          { id: 'sci1-intext-103', name: 'Intext - 103', completed: false },
          { id: 'sci1-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-2',
        number: 2,
        title: 'Chapter 2: Cell: The Building Block of Life',
        stages: [
          { id: 'sci2-theory', name: 'Theory', completed: false },
          { id: 'sci2-intext-10', name: 'Intext - 10', completed: false },
          { id: 'sci2-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-3',
        number: 3,
        title: 'Chapter 3: Tissues in Action',
        stages: [
          { id: 'sci3-theory', name: 'Theory', completed: false },
          { id: 'sci3-intext-9', name: 'Intext - 9', completed: false },
          { id: 'sci3-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-4',
        number: 4,
        title: 'Chapter 4: Describing Motion Around Us',
        stages: [
          { id: 'sci4-theory', name: 'Theory', completed: false },
          { id: 'sci4-intext-7', name: 'Intext - 7', completed: false },
          { id: 'sci4-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-5',
        number: 5,
        title: 'Chapter 5: Exploring Mixtures and their Separation',
        stages: [
          { id: 'sci5-theory', name: 'Theory', completed: false },
          { id: 'sci5-intext-10', name: 'Intext - 10', completed: false },
          { id: 'sci5-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-6',
        number: 6,
        title: 'Chapter 6: How Forces Affect Motion',
        stages: [
          { id: 'sci6-theory', name: 'Theory', completed: false },
          { id: 'sci6-intext-10', name: 'Intext - 10', completed: false },
          { id: 'sci6-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-7',
        number: 7,
        title: 'Chapter 7: Work, Energy and Simple Machines',
        stages: [
          { id: 'sci7-theory', name: 'Theory', completed: false },
          { id: 'sci7-intext-13', name: 'Intext - 13', completed: false },
          { id: 'sci7-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-8',
        number: 8,
        title: 'Chapter 8: Journey Inside the Atom',
        stages: [
          { id: 'sci8-theory', name: 'Theory', completed: false },
          { id: 'sci8-intext-18', name: 'Intext - 18', completed: false },
          { id: 'sci8-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-9',
        number: 9,
        title: 'Chapter 9: Atomic Foundations of Matter',
        stages: [
          { id: 'sci9-theory', name: 'Theory', completed: false },
          { id: 'sci9-intext-27', name: 'Intext - 27', completed: false },
          { id: 'sci9-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-10',
        number: 10,
        title: 'Chapter 10: Sound Waves: Characteristics & Applications',
        stages: [
          { id: 'sci10-theory', name: 'Theory', completed: false },
          { id: 'sci10-intext-15', name: 'Intext - 15', completed: false },
          { id: 'sci10-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-11',
        number: 11,
        title: 'Chapter 11: Reproduction: How Life Continues',
        stages: [
          { id: 'sci11-theory', name: 'Theory', completed: false },
          { id: 'sci11-intext-13', name: 'Intext - 13', completed: false },
          { id: 'sci11-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-12',
        number: 12,
        title: 'Chapter 12: Patterns in Life: Diversity and Classification',
        stages: [
          { id: 'sci12-theory', name: 'Theory', completed: false },
          { id: 'sci12-intext-14', name: 'Intext - 14', completed: false },
          { id: 'sci12-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'sci-ch-13',
        number: 13,
        title: 'Chapter 13: Earth as a System: Energy, Matter and Life',
        stages: [
          { id: 'sci13-theory', name: 'Theory', completed: false },
          { id: 'sci13-intext-10', name: 'Intext - 10', completed: false },
          { id: 'sci13-ex', name: 'Exercise', completed: false },
        ],
      },
    ],
  },
  {
    id: 'english',
    name: 'English',
    shortCode: 'ENGLISH',
    chapters: [
      {
        id: 'eng-ch-1',
        number: 1,
        title: 'Chapter 1: How I Taught My Grandmother to Read',
        stages: [
          { id: 'eng1-reading', name: 'Reading', completed: false },
          { id: 'eng1-intext', name: 'Intext', completed: false },
          { id: 'eng1-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-bharat',
        title: 'Bharat Our Land (Poem / Text)',
        stages: [
          { id: 'eng-bharat-reading', name: 'Reading', completed: false },
          { id: 'eng-bharat-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-2',
        number: 2,
        title: 'Chapter 2: The Pot Maker',
        stages: [
          { id: 'eng2-reading', name: 'Reading', completed: false },
          { id: 'eng2-intext', name: 'Intext', completed: false },
          { id: 'eng2-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-gifts',
        title: 'Gifts of Grace: Honouring Our Vocations',
        stages: [
          { id: 'eng-gifts-reading', name: 'Reading', completed: false },
          { id: 'eng-gifts-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-3',
        number: 3,
        title: 'Chapter 3: Winds of Change',
        stages: [
          { id: 'eng3-reading', name: 'Reading', completed: false },
          { id: 'eng3-intext', name: 'Intext', completed: false },
          { id: 'eng3-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-canvas',
        title: 'Canvas of Soil',
        stages: [
          { id: 'eng-canvas-reading', name: 'Reading', completed: false },
          { id: 'eng-canvas-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-4',
        number: 4,
        title: 'Chapter 4: Vitamin-M',
        stages: [
          { id: 'eng4-reading', name: 'Reading', completed: false },
          { id: 'eng4-intext', name: 'Intext', completed: false },
          { id: 'eng4-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-mother',
        title: 'I Cannot Remember My Mother',
        stages: [
          { id: 'eng-mother-reading', name: 'Reading', completed: false },
          { id: 'eng-mother-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-5',
        number: 5,
        title: 'Chapter 5: The World of Limitless Possibilities',
        stages: [
          { id: 'eng5-reading', name: 'Reading', completed: false },
          { id: 'eng5-intext', name: 'Intext', completed: false },
          { id: 'eng5-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-gold',
        title: 'Nine Gold Medals',
        stages: [
          { id: 'eng-gold-reading', name: 'Reading', completed: false },
          { id: 'eng-gold-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-6',
        number: 6,
        title: 'Chapter 6: Twin Melodies',
        stages: [
          { id: 'eng6-reading', name: 'Reading', completed: false },
          { id: 'eng6-intext', name: 'Intext', completed: false },
          { id: 'eng6-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-music',
        title: 'A Friend Found in Music',
        stages: [
          { id: 'eng-music-reading', name: 'Reading', completed: false },
          { id: 'eng-music-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-7',
        number: 7,
        title: 'Chapter 7: Carrier of Words',
        stages: [
          { id: 'eng7-reading', name: 'Reading', completed: false },
          { id: 'eng7-intext', name: 'Intext', completed: false },
          { id: 'eng7-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-words',
        title: 'Words',
        stages: [
          { id: 'eng-words-reading', name: 'Reading', completed: false },
          { id: 'eng-words-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'eng-ch-8',
        number: 8,
        title: 'Chapter 8: Follow That Dream',
        stages: [
          { id: 'eng8-reading', name: 'Reading', completed: false },
          { id: 'eng8-intext', name: 'Intext', completed: false },
          { id: 'eng8-ex', name: 'Exercises', completed: false },
        ],
      },
      {
        id: 'eng-ch-believe',
        title: 'Believe in Yourself',
        stages: [
          { id: 'eng-believe-reading', name: 'Reading', completed: false },
          { id: 'eng-believe-intext', name: 'Intext', completed: false },
          { id: 'eng-believe-ex', name: 'Exercises', completed: false },
        ],
      },
    ],
  },
  {
    id: 'hindi',
    name: 'Hindi',
    shortCode: 'HINDI',
    hindiName: 'हिन्दी',
    chapters: [
      {
        id: 'hin-ch-1',
        number: 1,
        title: 'पाठ-1 :- दो बैलों की कथा',
        stages: [
          { id: 'h1-reading', name: 'पठन', completed: false },
          { id: 'h1-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-2',
        number: 2,
        title: 'पाठ-2 :- क्या लिखूँ',
        stages: [
          { id: 'h2-reading', name: 'पठन', completed: false },
          { id: 'h2-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-3',
        number: 3,
        title: 'पाठ-3 :- संवादहीन',
        stages: [
          { id: 'h3-reading', name: 'पठन', completed: false },
          { id: 'h3-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-4',
        number: 4,
        title: 'पाठ-4 :- ऐसी भी बातें होती हैं (लता मंगेशकर से साक्षात्कार)',
        stages: [
          { id: 'h4-reading', name: 'पठन', completed: false },
          { id: 'h4-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-5',
        number: 5,
        title: 'पाठ-5 :- आखिरी चट्टान तक',
        stages: [
          { id: 'h5-reading', name: 'पठन', completed: false },
          { id: 'h5-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-6',
        number: 6,
        title: 'पाठ-6 :- रीढ़ की हड्डी',
        stages: [
          { id: 'h6-reading', name: 'पठन', completed: false },
          { id: 'h6-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-7',
        number: 7,
        title: 'पाठ-7 :- मैं और मेरा देश',
        stages: [
          { id: 'h7-reading', name: 'पठन', completed: false },
          { id: 'h7-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-8',
        number: 8,
        title: 'पाठ-8 :- पद',
        stages: [
          { id: 'h8-reading', name: 'पठन', completed: false },
          { id: 'h8-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-9',
        number: 9,
        title: 'पाठ-9 :- राम-लक्ष्मण-परशुराम संवाद',
        stages: [
          { id: 'h9-reading', name: 'पठन', completed: false },
          { id: 'h9-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-10',
        number: 10,
        title: 'पाठ-10 :- भारति, जय, विजयकरे!',
        stages: [
          { id: 'h10-reading', name: 'पठन', completed: false },
          { id: 'h10-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-11',
        number: 11,
        title: 'पाठ-11 :- झाँसी की रानी',
        stages: [
          { id: 'h11-reading', name: 'पठन', completed: false },
          { id: 'h11-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
      {
        id: 'hin-ch-12',
        number: 12,
        title: 'पाठ-12 :- घर की याद',
        stages: [
          { id: 'h12-reading', name: 'पठन', completed: false },
          { id: 'h12-abhyas', name: 'अभ्यास', completed: false },
        ],
      },
    ],
  },
  {
    id: 'computer',
    name: 'Computer Applications',
    shortCode: 'COMPUTER',
    chapters: [
      {
        id: 'comp-ch-1',
        number: 1,
        title: 'Chapter 1: Basics of Information Technology & Computer Systems',
        stages: [
          { id: 'c1-theory', name: 'Theory', completed: false },
          { id: 'c1-intext', name: 'Intext', completed: false },
          { id: 'c1-lab', name: 'Practical Lab', completed: false },
          { id: 'c1-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'comp-ch-2',
        number: 2,
        title: 'Chapter 2: Cyber Safety & Digital Ethics',
        stages: [
          { id: 'c2-theory', name: 'Theory', completed: false },
          { id: 'c2-intext', name: 'Intext', completed: false },
          { id: 'c2-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'comp-ch-3',
        number: 3,
        title: 'Chapter 3: Office Tools: Word Processing & Formatting',
        stages: [
          { id: 'c3-theory', name: 'Theory', completed: false },
          { id: 'c3-intext', name: 'Intext', completed: false },
          { id: 'c3-lab', name: 'Practical Lab', completed: false },
          { id: 'c3-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'comp-ch-4',
        number: 4,
        title: 'Chapter 4: Presentation Tools & Slide Design',
        stages: [
          { id: 'c4-theory', name: 'Theory', completed: false },
          { id: 'c4-lab', name: 'Practical Lab', completed: false },
          { id: 'c4-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'comp-ch-5',
        number: 5,
        title: 'Chapter 5: Spreadsheets & Data Formulas',
        stages: [
          { id: 'c5-theory', name: 'Theory', completed: false },
          { id: 'c5-intext', name: 'Intext', completed: false },
          { id: 'c5-lab', name: 'Practical Lab', completed: false },
          { id: 'c5-ex', name: 'Exercise', completed: false },
        ],
      },
      {
        id: 'comp-ch-6',
        number: 6,
        title: 'Chapter 6: Basic HTML Coding & Web Pages',
        stages: [
          { id: 'c6-theory', name: 'Theory', completed: false },
          { id: 'c6-intext', name: 'Intext', completed: false },
          { id: 'c6-lab', name: 'Practical Lab', completed: false },
          { id: 'c6-ex', name: 'Exercise', completed: false },
        ],
      },
    ],
  },
];

export function calculateSyllabusStats(syllabus: SyllabusSubject[]) {
  let totalStages = 0;
  let completedStages = 0;

  const subjectStats = syllabus.map((sub) => {
    let subTotal = 0;
    let subCompleted = 0;

    sub.chapters.forEach((ch) => {
      ch.stages.forEach((st) => {
        subTotal += 1;
        if (st.completed) subCompleted += 1;
      });
    });

    totalStages += subTotal;
    completedStages += subCompleted;

    const percentage = subTotal > 0 ? Number(((subCompleted / subTotal) * 100).toFixed(2)) : 0;

    return {
      id: sub.id,
      name: sub.name,
      shortCode: sub.shortCode,
      hindiName: sub.hindiName,
      totalStages: subTotal,
      completedStages: subCompleted,
      percentage,
      chaptersCount: sub.chapters.length,
    };
  });

  const overallPercentage = totalStages > 0 ? Number(((completedStages / totalStages) * 100).toFixed(2)) : 0;

  return {
    totalStages,
    completedStages,
    overallPercentage,
    subjectStats,
  };
}
