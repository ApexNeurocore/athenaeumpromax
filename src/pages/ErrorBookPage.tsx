import React, { useState, useEffect, useRef } from 'react';
import { ColorTokens, AcademicClass } from '../types/theme';
import { CLASS_9_SYLLABUS, SyllabusSubject, SyllabusChapter } from '../data/class9Syllabus';
import { CLASS_11_SYLLABUS } from '../data/class11Syllabus';
import { ErrorBookEntry, ErrorUrgency, URGENCY_LABELS } from '../types/errorBook';
import { compressImage } from '../utils/imageCompressor';
import {
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Camera,
  Image as ImageIcon,
  Upload,
  Search,
  X,
  AlertCircle,
  Sparkles,
  BookOpen,
  Atom,
  Globe2,
  Languages,
  Laptop,
  Calculator,
  ZoomIn,
  Download,
  Check,
  FileQuestion,
  Info,
  FlaskConical,
  Dna
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ErrorBookPageProps {
  tokens: ColorTokens;
  userName?: string;
  selectedClass?: AcademicClass;
  syllabus?: SyllabusSubject[];
  onBack: () => void;
}

export const ErrorBookPage: React.FC<ErrorBookPageProps> = ({
  tokens,
  userName,
  selectedClass = '9',
  syllabus,
  onBack,
}) => {
  // Explicitly ensure the active syllabus matches the selectedClass
  const activeSyllabus = selectedClass === '11'
    ? (syllabus && syllabus.length > 0 && syllabus.some((s) => s.id === 'physics') ? syllabus : CLASS_11_SYLLABUS)
    : (syllabus && syllabus.length > 0 && syllabus.some((s) => s.id === 'science' || s.id === 'sst') ? syllabus : CLASS_9_SYLLABUS);

  // Navigation states
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  // Reset subject and chapter selection when selectedClass changes
  useEffect(() => {
    setSelectedSubjectId(null);
    setSelectedChapterId(null);
    setSearchQuery('');
  }, [selectedClass]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | ErrorUrgency>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');

  const storageKey = selectedClass === '11' ? 'athenaeum_error_book_11' : 'athenaeum_error_book_9';

  // Stored error book entries
  const [entries, setEntries] = useState<ErrorBookEntry[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey) || (selectedClass === '9' ? localStorage.getItem('athenaeum_error_book') : null);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load error book entries', e);
    }
    return [];
  });

  // Reload when switching selectedClass
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey) || (selectedClass === '9' ? localStorage.getItem('athenaeum_error_book') : null);
      if (saved) {
        setEntries(JSON.parse(saved));
        return;
      }
      setEntries([]);
    } catch {
      setEntries([]);
    }
  }, [selectedClass, storageKey]);

  // Persist entries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(entries));
      if (selectedClass === '9') {
        localStorage.setItem('athenaeum_error_book', JSON.stringify(entries));
      }
    } catch (e) {
      console.error('Failed to persist error book entries', e);
    }
  }, [entries, selectedClass, storageKey]);

  // Ensure navigation between subjects and chapters starts at top 0
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedSubjectId, selectedChapterId]);

  // Form states for adding a new mistake note
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formQuestionText, setFormQuestionText] = useState('');
  const [formSolutionNote, setFormSolutionNote] = useState('');
  const [formUrgency, setFormUrgency] = useState<ErrorUrgency>('conceptual');
  const [formImageUrl, setFormImageUrl] = useState<string | null>(null);
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Lightbox modal for photos
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Subject icon helper
  const getSubjectIcon = (subId: string) => {
    switch (subId) {
      case 'maths':
        return <Calculator className="w-5 h-5" />;
      case 'science':
      case 'physics':
        return <Atom className="w-5 h-5" />;
      case 'chemistry':
        return <FlaskConical className="w-5 h-5" />;
      case 'biology':
        return <Dna className="w-5 h-5" />;
      case 'sst':
        return <Globe2 className="w-5 h-5" />;
      case 'english':
        return <BookOpen className="w-5 h-5" />;
      case 'hindi':
        return <Languages className="w-5 h-5" />;
      case 'computer':
      case 'cs':
        return <Laptop className="w-5 h-5" />;
      default:
        return <BookmarkCheck className="w-5 h-5" />;
    }
  };

  // Lookup current subject and chapter
  const currentSubject: SyllabusSubject | undefined = activeSyllabus.find((s) => s.id === selectedSubjectId);
  const currentChapter: SyllabusChapter | undefined = currentSubject?.chapters.find(
    (c) => c.id === selectedChapterId
  );

  // Handle image upload with auto-compression
  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }
    setFormError(null);
    setIsCompressingImage(true);
    try {
      const compressedDataUrl = await compressImage(file, 1200, 1200, 0.75);
      setFormImageUrl(compressedDataUrl);
    } catch (err) {
      console.error(err);
      setFormError('Could not process image. Please try again.');
    } finally {
      setIsCompressingImage(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  // Support clipboard paste of images in the form
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleImageFile(file);
          break;
        }
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormTitle('');
    setFormQuestionText('');
    setFormSolutionNote('');
    setFormUrgency('conceptual');
    setFormImageUrl(null);
    setEditingEntryId(null);
    setFormError(null);
    setIsFormOpen(false);
  };

  // Open edit mode
  const handleOpenEdit = (entry: ErrorBookEntry) => {
    setEditingEntryId(entry.id);
    setFormTitle(entry.title);
    setFormQuestionText(entry.questionText);
    setFormSolutionNote(entry.solutionNote || '');
    setFormUrgency(entry.urgency);
    setFormImageUrl(entry.imageUrl || null);
    setIsFormOpen(true);
  };

  // Save new or edited entry
  const handleSaveEntry = () => {
    if (!formTitle.trim() && !formQuestionText.trim() && !formImageUrl) {
      setFormError('Please enter a title, description, or attach a photo.');
      return;
    }

    if (!selectedSubjectId || !selectedChapterId || !currentSubject || !currentChapter) {
      setFormError('Please select a subject and chapter.');
      return;
    }

    const titleText = formTitle.trim() || 'Mistake / Question Note';

    if (editingEntryId) {
      // Update existing
      setEntries((prev) =>
        prev.map((item) =>
          item.id === editingEntryId
            ? {
                ...item,
                title: titleText,
                questionText: formQuestionText.trim(),
                solutionNote: formSolutionNote.trim() || undefined,
                urgency: formUrgency,
                imageUrl: formImageUrl || undefined,
              }
            : item
        )
      );
      showToast('Error note updated successfully ✨');
    } else {
      // Create new
      const newEntry: ErrorBookEntry = {
        id: `err-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        subjectId: selectedSubjectId,
        subjectName: currentSubject.name,
        chapterId: selectedChapterId,
        chapterTitle: currentChapter.title,
        title: titleText,
        questionText: formQuestionText.trim(),
        solutionNote: formSolutionNote.trim() || undefined,
        imageUrl: formImageUrl || undefined,
        urgency: formUrgency,
        isResolved: false,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setEntries((prev) => [newEntry, ...prev]);
      showToast('Weak question saved to Error Book ✨');
    }

    resetForm();
  };

  // Toggle resolved / mastered
  const handleToggleResolved = (id: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isResolved: !e.isResolved } : e))
    );
  };

  // Delete entry
  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setDeleteConfirmId(null);
    showToast('Entry removed from Error Book.');
  };

  // Filter entries to only match valid subjects in the active class syllabus
  const classEntries = entries.filter((entry) =>
    activeSyllabus.some((sub) => sub.id === entry.subjectId)
  );

  // Calculated counts
  const totalEntries = classEntries.length;
  const unresolvedEntries = classEntries.filter((e) => !e.isResolved).length;
  const resolvedEntries = classEntries.filter((e) => e.isResolved).length;

  const countForSubject = (subId: string) => classEntries.filter((e) => e.subjectId === subId).length;
  const countForChapter = (chId: string) => classEntries.filter((e) => e.chapterId === chId).length;

  // Filter entries in chapter view or search
  const filteredEntries = classEntries.filter((entry) => {
    const matchSubject = !selectedSubjectId || entry.subjectId === selectedSubjectId;
    const matchChapter = !selectedChapterId || entry.chapterId === selectedChapterId;
    const matchUrgency = urgencyFilter === 'all' || entry.urgency === urgencyFilter;
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'resolved' && entry.isResolved) ||
      (statusFilter === 'unresolved' && !entry.isResolved);

    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      !query ||
      entry.title.toLowerCase().includes(query) ||
      entry.questionText.toLowerCase().includes(query) ||
      entry.chapterTitle.toLowerCase().includes(query) ||
      entry.subjectName.toLowerCase().includes(query) ||
      (entry.solutionNote && entry.solutionNote.toLowerCase().includes(query));

    return matchSubject && matchChapter && matchUrgency && matchStatus && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl border shadow-lg flex items-center gap-2 text-xs sm:text-sm font-medium"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.accentPrimary,
              color: tokens.textPrimary,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for Photo Inspection */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <div
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between pb-3 text-white">
                <span className="font-serif text-sm truncate max-w-md">{lightboxImage.title}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={lightboxImage.url}
                    download="error-book-photo.jpg"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Download Photo"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl border border-white/15"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* LEVEL 1: ALL 6 SUBJECTS OVERVIEW                         */}
      {/* ========================================================= */}
      {!selectedSubjectId && (
        <div className="space-y-6 sm:space-y-8">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider transition-opacity hover:opacity-80"
              style={{ color: tokens.accentPrimary }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Sanctuary</span>
            </button>

            <span
              className="text-xs font-mono px-3 py-1 rounded-full border"
              style={{
                backgroundColor: tokens.accentSoftBg,
                borderColor: tokens.borderSubtle,
                color: tokens.accentPrimary,
              }}
            >
              Personal Mistake Vault
            </span>
          </div>

          {/* Hero Banner */}
          <div
            className="p-6 sm:p-8 rounded-3xl border shadow-xs relative overflow-hidden"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
            }}
          >
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: tokens.accentPrimary }}>
                <BookmarkCheck className="w-4 h-4" />
                <span>Class {selectedClass}th · {userName ? `${userName}'s Error Book & Weak Areas` : 'Academic Error Book & Weak Areas'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                {selectedClass === '11' ? 'Class 11 Mistake Vault' : 'Master Your Mistakes'}
              </h1>

              <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: tokens.textSecondary }}>
                {selectedClass === '11'
                  ? 'Every tricky derivation, numerical slip, or conceptual obstacle is your fastest path to a 100%. Log weak questions across Physics, Chemistry, Mathematics, Biology, English, Hindi, and Computer Science CS before exam day.'
                  : 'Every mistake is your fastest path to a 100%. Whenever you get stuck on a question, make a sign error, or encounter a tricky definition, snap a photo or type it here under its chapter. Review them before your exam to ensure zero surprises.'}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-6 pt-5 border-t grid grid-cols-3 gap-3 sm:gap-6" style={{ borderColor: tokens.borderSubtle }}>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold block" style={{ color: tokens.textPrimary }}>
                  {totalEntries}
                </span>
                <span className="text-[11px] font-body" style={{ color: tokens.textMuted }}>
                  Total Weak Items Logged
                </span>
              </div>

              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold block text-amber-600 dark:text-amber-400">
                  {unresolvedEntries}
                </span>
                <span className="text-[11px] font-body" style={{ color: tokens.textMuted }}>
                  Needs Practice
                </span>
              </div>

              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold block text-emerald-600 dark:text-emerald-400">
                  {resolvedEntries}
                </span>
                <span className="text-[11px] font-body" style={{ color: tokens.textMuted }}>
                  Mastered & Clear
                </span>
              </div>
            </div>
          </div>

          {/* Quick Universal Search across all recorded errors */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all weak questions, formulas, or mistake notes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-body focus:outline-none transition-colors"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
                color: tokens.textPrimary,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xs opacity-60 hover:opacity-100"
                style={{ color: tokens.textPrimary }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* If search query is active, show search results across all subjects */}
          {searchQuery.trim() ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs" style={{ color: tokens.textSecondary }}>
                <span>Search results ({filteredEntries.length} found)</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="underline hover:opacity-100"
                  style={{ color: tokens.accentPrimary }}
                >
                  Clear search
                </button>
              </div>

              {filteredEntries.length === 0 ? (
                <div
                  className="p-8 text-center rounded-2xl border text-xs sm:text-sm font-body"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.borderSubtle,
                    color: tokens.textMuted,
                  }}
                >
                  No mistake notes match &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-5 rounded-2xl border space-y-3 flex flex-col justify-between"
                      style={{
                        backgroundColor: tokens.surface,
                        borderColor: entry.isResolved ? tokens.borderSubtle : tokens.borderStrong,
                      }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span
                            className="px-2 py-0.5 rounded-md font-mono"
                            style={{
                              backgroundColor: URGENCY_LABELS[entry.urgency].bg,
                              color: URGENCY_LABELS[entry.urgency].text,
                            }}
                          >
                            {URGENCY_LABELS[entry.urgency].label}
                          </span>
                          <span style={{ color: tokens.textMuted }}>{entry.createdAt}</span>
                        </div>

                        <div className="text-xs font-mono opacity-80" style={{ color: tokens.accentPrimary }}>
                          {entry.subjectName} · {entry.chapterTitle}
                        </div>

                        <h3 className="font-serif font-bold text-base" style={{ color: tokens.textPrimary }}>
                          {entry.title}
                        </h3>

                        {entry.questionText && (
                          <p className="text-xs font-body leading-relaxed whitespace-pre-wrap" style={{ color: tokens.textSecondary }}>
                            {entry.questionText}
                          </p>
                        )}

                        {entry.solutionNote && (
                          <div
                            className="p-2.5 rounded-xl border text-xs font-body space-y-1"
                            style={{
                              backgroundColor: tokens.canvas,
                              borderColor: tokens.borderSubtle,
                            }}
                          >
                            <span className="font-semibold block" style={{ color: tokens.accentPrimary }}>
                              💡 Takeaway / Correct Concept:
                            </span>
                            <p style={{ color: tokens.textSecondary }}>{entry.solutionNote}</p>
                          </div>
                        )}

                        {entry.imageUrl && (
                          <div
                            onClick={() => setLightboxImage({ url: entry.imageUrl!, title: entry.title })}
                            className="relative group cursor-pointer overflow-hidden rounded-xl border max-h-40"
                            style={{ borderColor: tokens.borderSubtle }}
                          >
                            <img
                              src={entry.imageUrl}
                              alt={entry.title}
                              className="w-full h-36 object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1 font-medium">
                              <ZoomIn className="w-4 h-4" />
                              <span>View Full Photo</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: tokens.borderSubtle }}>
                        <button
                          onClick={() => handleToggleResolved(entry.id)}
                          className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
                          style={{ color: entry.isResolved ? '#16a34a' : tokens.textMuted }}
                        >
                          {entry.isResolved ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
                              <span>Mastered</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-4 h-4" />
                              <span>Mark as Mastered</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            setSelectedSubjectId(entry.subjectId);
                            setSelectedChapterId(entry.chapterId);
                          }}
                          className="text-xs font-mono underline hover:opacity-100"
                          style={{ color: tokens.accentPrimary }}
                        >
                          Go to Chapter &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Subject Cards Grid */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: tokens.textMuted }}>
                  Select a subject to open its error vault
                </span>
                <span className="text-xs font-body" style={{ color: tokens.textSecondary }}>
                  {activeSyllabus.length} Class {selectedClass}th Subjects
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {activeSyllabus.map((sub) => {
                  const errorCount = countForSubject(sub.id);
                  return (
                    <motion.div
                      key={sub.id}
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setSelectedSubjectId(sub.id);
                        setSelectedChapterId(null);
                        setSearchQuery('');
                      }}
                      className="group p-6 rounded-2xl border cursor-pointer transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between"
                      style={{
                        backgroundColor: tokens.surface,
                        borderColor: errorCount > 0 ? tokens.borderStrong : tokens.borderSubtle,
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200 group-hover:scale-105"
                            style={{
                              backgroundColor: tokens.canvas,
                              borderColor: tokens.borderStrong,
                              color: tokens.accentPrimary,
                            }}
                          >
                            {getSubjectIcon(sub.id)}
                          </div>

                          <span
                            className="text-[11px] font-mono px-2 py-0.5 rounded-md border"
                            style={{
                              backgroundColor: errorCount > 0 ? tokens.accentSoftBg : tokens.canvas,
                              borderColor: tokens.borderSubtle,
                              color: errorCount > 0 ? tokens.accentPrimary : tokens.textMuted,
                            }}
                          >
                            {errorCount === 1 ? '1 Weak Area' : `${errorCount} Weak Areas`}
                          </span>
                        </div>

                        <div>
                          <h2
                            className="text-xl font-serif font-bold tracking-tight mb-1"
                            style={{ color: tokens.textPrimary }}
                          >
                            {sub.name}
                          </h2>
                          <p className="text-xs font-body" style={{ color: tokens.textSecondary }}>
                            {sub.chapters.length} Chapters in Class {selectedClass}th Syllabus
                          </p>
                        </div>
                      </div>

                      <div
                        className="mt-6 pt-3 border-t flex items-center justify-between text-xs font-medium"
                        style={{ borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}
                      >
                        <span>Choose chapter</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* LEVEL 2: CHAPTER SELECTION FOR A SUBJECT                  */}
      {/* ========================================================= */}
      {selectedSubjectId && !selectedChapterId && currentSubject && (
        <div className="space-y-6 sm:space-y-8">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedSubjectId(null);
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider transition-opacity hover:opacity-80"
              style={{ color: tokens.accentPrimary }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to All Subjects</span>
            </button>

            <span className="text-xs font-mono" style={{ color: tokens.textMuted }}>
              {currentSubject.name} Error Vault
            </span>
          </div>

          {/* Subject Banner */}
          <div
            className="p-6 sm:p-7 rounded-3xl border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs"
                style={{
                  backgroundColor: tokens.canvas,
                  borderColor: tokens.borderStrong,
                  color: tokens.accentPrimary,
                }}
              >
                {getSubjectIcon(currentSubject.id)}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                  {currentSubject.name}
                </h1>
                <p className="text-xs sm:text-sm font-body" style={{ color: tokens.textSecondary }}>
                  Select a chapter below to log or review your mistakes, tricky sums, and camera captures.
                </p>
              </div>
            </div>

            <div
              className="px-4 py-2 rounded-xl border text-xs font-mono flex items-center gap-2"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderSubtle,
                color: tokens.textPrimary,
              }}
            >
              <span>{countForSubject(currentSubject.id)} recorded notes</span>
            </div>
          </div>

          {/* Chapter Filter Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Filter ${currentSubject.name} chapters...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-body focus:outline-none transition-colors"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
                color: tokens.textPrimary,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xs opacity-60 hover:opacity-100"
                style={{ color: tokens.textPrimary }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Chapters List */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider block" style={{ color: tokens.textMuted }}>
              Chapters in {currentSubject.name} ({currentSubject.chapters.length})
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {currentSubject.chapters
                .filter((ch) => !searchQuery || ch.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((ch, idx) => {
                  const chCount = countForChapter(ch.id);
                  return (
                    <motion.div
                      key={ch.id}
                      whileHover={{ y: -2, scale: 1.005 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setSelectedChapterId(ch.id);
                        setSearchQuery('');
                        setIsFormOpen(false);
                      }}
                      className="p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200 shadow-xs hover:shadow-md flex items-center justify-between gap-4"
                      style={{
                        backgroundColor: tokens.surface,
                        borderColor: chCount > 0 ? tokens.accentPrimary : tokens.borderSubtle,
                      }}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-semibold shrink-0 border"
                          style={{
                            backgroundColor: tokens.canvas,
                            borderColor: tokens.borderSubtle,
                            color: tokens.accentPrimary,
                          }}
                        >
                          {ch.number ? ch.number : idx + 1}
                        </span>

                        <div className="min-w-0">
                          <h3
                            className="font-serif font-semibold text-sm sm:text-base truncate"
                            style={{ color: tokens.textPrimary }}
                          >
                            {ch.title}
                          </h3>
                          <span className="text-[11px] font-body block" style={{ color: tokens.textMuted }}>
                            {ch.stages.length} syllabus subtopics
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg border font-medium"
                          style={{
                            backgroundColor: chCount > 0 ? tokens.accentSoftBg : tokens.canvas,
                            borderColor: tokens.borderSubtle,
                            color: chCount > 0 ? tokens.accentPrimary : tokens.textMuted,
                          }}
                        >
                          {chCount === 0 ? 'Clear' : `${chCount} weak`}
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-50" style={{ color: tokens.accentPrimary }} />
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LEVEL 3: INSIDE A SPECIFIC CHAPTER ERROR VAULT            */}
      {/* ========================================================= */}
      {selectedSubjectId && selectedChapterId && currentSubject && currentChapter && (
        <div className="space-y-6 sm:space-y-8">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => {
                  setSelectedSubjectId(null);
                  setSelectedChapterId(null);
                  setIsFormOpen(false);
                }}
                className="hover:underline"
                style={{ color: tokens.textMuted }}
              >
                Error Book
              </button>
              <span style={{ color: tokens.textMuted }}>/</span>
              <button
                onClick={() => {
                  setSelectedChapterId(null);
                  setIsFormOpen(false);
                }}
                className="hover:underline"
                style={{ color: tokens.accentPrimary }}
              >
                {currentSubject.name}
              </button>
              <span style={{ color: tokens.textMuted }}>/</span>
              <span className="truncate max-w-[200px] sm:max-w-xs font-semibold" style={{ color: tokens.textPrimary }}>
                {currentChapter.title}
              </span>
            </div>

            <button
              onClick={() => {
                setSelectedChapterId(null);
                setIsFormOpen(false);
              }}
              className="inline-flex items-center gap-1 text-xs font-mono transition-opacity hover:opacity-80"
              style={{ color: tokens.accentPrimary }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Chapters</span>
            </button>
          </div>

          {/* Chapter Banner & Actions */}
          <div
            className="p-6 sm:p-7 rounded-3xl border shadow-xs space-y-4"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border"
                    style={{
                      backgroundColor: tokens.accentSoftBg,
                      borderColor: tokens.borderSubtle,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {currentSubject.name}
                  </span>
                  <span className="text-xs font-mono" style={{ color: tokens.textMuted }}>
                    {countForChapter(currentChapter.id)} weak items saved
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                  {currentChapter.title}
                </h1>
              </div>

              {/* Add Note Button */}
              <button
                onClick={() => {
                  if (isFormOpen) {
                    resetForm();
                  } else {
                    resetForm();
                    setIsFormOpen(true);
                  }
                }}
                className="px-4 py-2.5 rounded-xl border font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:brightness-95 active:scale-95 shadow-xs"
                style={{
                  backgroundColor: isFormOpen ? tokens.canvas : tokens.accentPrimary,
                  borderColor: tokens.borderStrong,
                  color: isFormOpen ? tokens.textPrimary : '#ffffff',
                }}
              >
                {isFormOpen ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>Close Form</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>+ Add Weak Question</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ADD / EDIT ENTRY FORM */}
          <AnimatePresence>
            {isFormOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div
                  onPaste={handlePaste}
                  className="p-6 sm:p-7 rounded-3xl border shadow-md space-y-5"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.accentPrimary,
                  }}
                >
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: tokens.borderSubtle }}>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
                      <h2 className="font-serif font-bold text-lg" style={{ color: tokens.textPrimary }}>
                        {editingEntryId ? 'Edit Mistake Note' : 'Log New Weak Question / Tricky Concept'}
                      </h2>
                    </div>

                    <button
                      onClick={resetForm}
                      className="p-1 rounded-lg text-xs hover:opacity-75"
                      style={{ color: tokens.textMuted }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Title / Question reference */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium block" style={{ color: tokens.textPrimary }}>
                      Question Reference / Topic Title *
                    </label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder={
                        selectedClass === '11'
                          ? 'e.g. Motion in a Plane: Projectile Range derivation or Redox balancing slip'
                          : 'e.g. Ex 9.2 Question 4 (Angle Bisector Proof) or Plasmolysis in Hypotonic solution'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-body focus:outline-none transition-colors"
                      style={{
                        backgroundColor: tokens.canvas,
                        borderColor: tokens.borderStrong,
                        color: tokens.textPrimary,
                      }}
                    />
                  </div>

                  {/* Urgency selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium block" style={{ color: tokens.textPrimary }}>
                      Categorize Mistake Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(Object.keys(URGENCY_LABELS) as ErrorUrgency[]).map((urgKey) => {
                        const info = URGENCY_LABELS[urgKey];
                        const isSelected = formUrgency === urgKey;
                        return (
                          <button
                            key={urgKey}
                            type="button"
                            onClick={() => setFormUrgency(urgKey)}
                            className="px-3 py-2 rounded-xl border text-xs font-mono text-center transition-all"
                            style={{
                              backgroundColor: isSelected ? info.bg : tokens.canvas,
                              borderColor: isSelected ? info.text : tokens.borderSubtle,
                              color: isSelected ? info.text : tokens.textSecondary,
                              fontWeight: isSelected ? 600 : 400,
                            }}
                          >
                            {info.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Question details / description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium block" style={{ color: tokens.textPrimary }}>
                      What was confusing, or where did you make a mistake?
                    </label>
                    <textarea
                      rows={3}
                      value={formQuestionText}
                      onChange={(e) => setFormQuestionText(e.target.value)}
                      placeholder="Describe what was difficult, or type the question text and where you got stuck..."
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-body focus:outline-none transition-colors"
                      style={{
                        backgroundColor: tokens.canvas,
                        borderColor: tokens.borderStrong,
                        color: tokens.textPrimary,
                      }}
                    />
                  </div>

                  {/* Correct Solution / Takeaway note */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium block" style={{ color: tokens.textPrimary }}>
                      Takeaway / Correct Formula / Rule to Remember (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formSolutionNote}
                      onChange={(e) => setFormSolutionNote(e.target.value)}
                      placeholder="e.g. Always check negative signs when moving terms across the equal sign!"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-body focus:outline-none transition-colors"
                      style={{
                        backgroundColor: tokens.canvas,
                        borderColor: tokens.borderStrong,
                        color: tokens.textPrimary,
                      }}
                    />
                  </div>

                  {/* Photo Attachment Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-medium block" style={{ color: tokens.textPrimary }}>
                        Photo Capture / Screenshot (Optional)
                      </label>
                      <span className="text-[11px] font-body" style={{ color: tokens.textMuted }}>
                        Auto-compressed for instant, error-free local saving
                      </span>
                    </div>

                    {/* Hidden inputs */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <input
                      type="file"
                      ref={cameraInputRef}
                      onChange={handleFileInputChange}
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                    />

                    {formImageUrl ? (
                      <div className="relative rounded-2xl border p-3 flex items-start gap-4" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle }}>
                        <img
                          src={formImageUrl}
                          alt="Uploaded capture"
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl border"
                          style={{ borderColor: tokens.borderSubtle }}
                        />
                        <div className="space-y-2 flex-1">
                          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block font-medium">
                            ✓ Photo attached & compressed
                          </span>
                          <p className="text-[11px] font-body" style={{ color: tokens.textMuted }}>
                            You can click to preview in full screen, or replace it.
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setLightboxImage({ url: formImageUrl, title: formTitle || 'Preview' })}
                              className="px-2.5 py-1 text-xs rounded-lg border font-mono hover:opacity-80"
                              style={{ backgroundColor: tokens.surface, borderColor: tokens.borderSubtle, color: tokens.textPrimary }}
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormImageUrl(null)}
                              className="px-2.5 py-1 text-xs rounded-lg border text-red-600 border-red-200 dark:border-red-900/50 hover:bg-red-500/10 font-mono"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          disabled={isCompressingImage}
                          onClick={() => cameraInputRef.current?.click()}
                          className="p-4 rounded-2xl border border-dashed flex items-center justify-center gap-2.5 text-xs font-mono transition-all hover:brightness-95 active:scale-95"
                          style={{
                            backgroundColor: tokens.canvas,
                            borderColor: tokens.borderStrong,
                            color: tokens.textPrimary,
                          }}
                        >
                          <Camera className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
                          <span>{isCompressingImage ? 'Compressing...' : 'Take Camera Photo'}</span>
                        </button>

                        <button
                          type="button"
                          disabled={isCompressingImage}
                          onClick={() => fileInputRef.current?.click()}
                          className="p-4 rounded-2xl border border-dashed flex items-center justify-center gap-2.5 text-xs font-mono transition-all hover:brightness-95 active:scale-95"
                          style={{
                            backgroundColor: tokens.canvas,
                            borderColor: tokens.borderStrong,
                            color: tokens.textPrimary,
                          }}
                        >
                          <Upload className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
                          <span>{isCompressingImage ? 'Compressing...' : 'Upload Image / Paste (Ctrl+V)'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: tokens.borderSubtle }}>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 rounded-xl border text-xs font-mono hover:opacity-80"
                      style={{
                        backgroundColor: tokens.canvas,
                        borderColor: tokens.borderSubtle,
                        color: tokens.textSecondary,
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      disabled={isCompressingImage}
                      onClick={handleSaveEntry}
                      className="px-5 py-2.5 rounded-xl border font-medium text-xs sm:text-sm flex items-center gap-2 transition-all hover:brightness-95 active:scale-95 shadow-xs"
                      style={{
                        backgroundColor: tokens.accentPrimary,
                        borderColor: tokens.borderStrong,
                        color: '#ffffff',
                      }}
                    >
                      <Check className="w-4 h-4" />
                      <span>{editingEntryId ? 'Update Entry' : 'Save to Error Book'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Bar inside Chapter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted" style={{ color: tokens.textMuted }}>
                Filter:
              </span>
              <button
                onClick={() => setStatusFilter('all')}
                className="px-2.5 py-1 rounded-lg border text-xs font-mono transition-all"
                style={{
                  backgroundColor: statusFilter === 'all' ? tokens.accentSoftBg : tokens.surface,
                  borderColor: statusFilter === 'all' ? tokens.accentPrimary : tokens.borderSubtle,
                  color: statusFilter === 'all' ? tokens.accentPrimary : tokens.textSecondary,
                }}
              >
                All ({countForChapter(currentChapter.id)})
              </button>
              <button
                onClick={() => setStatusFilter('unresolved')}
                className="px-2.5 py-1 rounded-lg border text-xs font-mono transition-all"
                style={{
                  backgroundColor: statusFilter === 'unresolved' ? 'rgba(245, 158, 11, 0.12)' : tokens.surface,
                  borderColor: statusFilter === 'unresolved' ? '#d97706' : tokens.borderSubtle,
                  color: statusFilter === 'unresolved' ? '#d97706' : tokens.textSecondary,
                }}
              >
                Needs Review ({entries.filter((e) => e.chapterId === currentChapter.id && !e.isResolved).length})
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className="px-2.5 py-1 rounded-lg border text-xs font-mono transition-all"
                style={{
                  backgroundColor: statusFilter === 'resolved' ? 'rgba(22, 163, 74, 0.12)' : tokens.surface,
                  borderColor: statusFilter === 'resolved' ? '#16a34a' : tokens.borderSubtle,
                  color: statusFilter === 'resolved' ? '#16a34a' : tokens.textSecondary,
                }}
              >
                Mastered ({entries.filter((e) => e.chapterId === currentChapter.id && e.isResolved).length})
              </button>
            </div>

            {/* Urgency Filter Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value as any)}
                aria-label="Filter notes by urgency or mistake type"
                className="px-3 py-1 rounded-xl border text-xs font-mono focus:outline-none"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: tokens.borderSubtle,
                  color: tokens.textPrimary,
                }}
              >
                <option value="all">All Mistake Types</option>
                <option value="urgent">High Exam Priority</option>
                <option value="conceptual">Conceptual Doubt</option>
                <option value="careless">Careless Mistake</option>
                <option value="formula">Formula / Sign Error</option>
              </select>
            </div>
          </div>

          {/* List of Entries in this Chapter */}
          {filteredEntries.length === 0 ? (
            <div
              className="p-10 sm:p-12 text-center rounded-3xl border space-y-4"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <div
                className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center border"
                style={{
                  backgroundColor: tokens.canvas,
                  borderColor: tokens.borderStrong,
                  color: tokens.accentPrimary,
                }}
              >
                <BookmarkCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg" style={{ color: tokens.textPrimary }}>
                  No weak questions logged here yet
                </h3>
                <p className="text-xs sm:text-sm font-body max-w-md mx-auto" style={{ color: tokens.textSecondary }}>
                  Whenever you practice {currentChapter.title} and face an obstacle, click &ldquo;+ Add Weak Question&rdquo; to store it for fast pre-exam revision.
                </p>
              </div>

              {!isFormOpen && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="px-4 py-2 rounded-xl border text-xs font-mono transition-all hover:brightness-95"
                  style={{
                    backgroundColor: tokens.canvas,
                    borderColor: tokens.borderStrong,
                    color: tokens.accentPrimary,
                  }}
                >
                  + Add First Note
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {filteredEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  className="rounded-2xl border p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-shadow"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: entry.isResolved ? tokens.borderSubtle : tokens.borderStrong,
                  }}
                >
                  <div className="space-y-3">
                    {/* Header: Urgency pill, date, and mastered button */}
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md font-medium"
                        style={{
                          backgroundColor: URGENCY_LABELS[entry.urgency].bg,
                          color: URGENCY_LABELS[entry.urgency].text,
                        }}
                      >
                        {URGENCY_LABELS[entry.urgency].label}
                      </span>

                      <button
                        onClick={() => handleToggleResolved(entry.id)}
                        className="flex items-center gap-1.5 text-xs font-mono transition-all px-2 py-0.5 rounded-lg border hover:brightness-95"
                        style={{
                          backgroundColor: entry.isResolved ? 'rgba(22, 163, 74, 0.1)' : tokens.canvas,
                          borderColor: entry.isResolved ? '#16a34a' : tokens.borderSubtle,
                          color: entry.isResolved ? '#16a34a' : tokens.textMuted,
                        }}
                        title={entry.isResolved ? 'Mark as still needing practice' : 'Mark as mastered'}
                      >
                        {entry.isResolved ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                            <span>Mastered</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-3.5 h-3.5" />
                            <span>Unresolved</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-lg leading-snug" style={{ color: tokens.textPrimary }}>
                      {entry.title}
                    </h3>

                    {/* Description */}
                    {entry.questionText && (
                      <p className="text-xs sm:text-sm font-body leading-relaxed whitespace-pre-wrap" style={{ color: tokens.textSecondary }}>
                        {entry.questionText}
                      </p>
                    )}

                    {/* Takeaway / Solution Box */}
                    {entry.solutionNote && (
                      <div
                        className="p-3 rounded-xl border text-xs font-body space-y-1"
                        style={{
                          backgroundColor: tokens.canvas,
                          borderColor: tokens.borderSubtle,
                        }}
                      >
                        <span className="font-semibold block flex items-center gap-1.5" style={{ color: tokens.accentPrimary }}>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Key Takeaway / Formula:</span>
                        </span>
                        <p className="whitespace-pre-wrap leading-relaxed" style={{ color: tokens.textSecondary }}>
                          {entry.solutionNote}
                        </p>
                      </div>
                    )}

                    {/* Attached Photo */}
                    {entry.imageUrl && (
                      <div
                        onClick={() => setLightboxImage({ url: entry.imageUrl!, title: entry.title })}
                        className="relative group cursor-pointer overflow-hidden rounded-xl border max-h-48"
                        style={{ borderColor: tokens.borderSubtle }}
                      >
                        <img
                          src={entry.imageUrl}
                          alt={entry.title}
                          className="w-full h-44 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1.5 font-medium">
                          <ZoomIn className="w-4 h-4" />
                          <span>Click to Inspect Full Photo</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Timestamp & Actions */}
                  <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: tokens.borderSubtle }}>
                    <span className="font-mono text-[11px]" style={{ color: tokens.textMuted }}>
                      {entry.createdAt}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(entry)}
                        className="text-xs font-mono hover:underline"
                        style={{ color: tokens.textSecondary }}
                      >
                        Edit
                      </button>

                      {deleteConfirmId === entry.id ? (
                        <div className="flex items-center gap-1.5 bg-red-500/10 px-2 py-0.5 rounded-lg border border-red-500/20">
                          <span className="text-[11px] text-red-600 dark:text-red-400 font-mono">Sure?</span>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-[11px] font-bold text-red-600 hover:underline"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-[11px] text-stone-500 hover:underline"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(entry.id)}
                          className="p-1 rounded-md text-red-500/70 hover:text-red-600 hover:bg-red-500/10 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
