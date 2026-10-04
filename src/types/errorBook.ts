export type ErrorUrgency = 'urgent' | 'conceptual' | 'careless' | 'formula';

export interface ErrorBookEntry {
  id: string;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  title: string;
  questionText: string;
  solutionNote?: string;
  imageUrl?: string;
  urgency: ErrorUrgency;
  isResolved: boolean;
  createdAt: string;
}

export const URGENCY_LABELS: Record<ErrorUrgency, { label: string; bg: string; text: string; border: string }> = {
  urgent: {
    label: 'High Exam Priority',
    bg: 'rgba(239, 68, 68, 0.1)',
    text: '#dc2626',
    border: 'rgba(239, 68, 68, 0.25)',
  },
  conceptual: {
    label: 'Conceptual Doubt',
    bg: 'rgba(168, 85, 247, 0.1)',
    text: '#9333ea',
    border: 'rgba(168, 85, 247, 0.25)',
  },
  careless: {
    label: 'Careless Mistake',
    bg: 'rgba(245, 158, 11, 0.1)',
    text: '#d97706',
    border: 'rgba(245, 158, 11, 0.25)',
  },
  formula: {
    label: 'Formula / Sign Error',
    bg: 'rgba(59, 130, 246, 0.1)',
    text: '#2563eb',
    border: 'rgba(59, 130, 246, 0.25)',
  },
};
