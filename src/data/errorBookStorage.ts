export interface ErrorBookItem {
  id: string;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  questionTitle: string;
  notes?: string;
  imageBase64?: string;
  category: 'Tricky Concept' | 'Calculation Mistake' | 'Formula Slip' | 'Must Revise';
  resolved: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'athenaeum_error_book_entries';

export function loadErrorBookEntries(): ErrorBookItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load error book entries from local storage', err);
    return [];
  }
}

export function saveErrorBookEntries(entries: ErrorBookItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error('Failed to save error book entries to local storage', err);
  }
}
