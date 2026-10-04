import React, { useState, useRef } from 'react';
import { ColorTokens, AcademicClass } from '../types/theme';
import { MATHS_VAULT_CHAPTERS, MathChapterVault, MathItem } from '../data/mathsNotesVault';
import { SCIENCE_VAULT_CHAPTERS, ScienceChapterVault, ScienceItem } from '../data/scienceNotesVault';
import { ENGLISH_VAULT_CHAPTERS, EnglishChapterVault, EnglishCharacter } from '../data/englishNotesVault';
import { HINDI_VAULT_CHAPTERS, HindiChapterVault, HindiCharacter } from '../data/hindiNotesVault';
import { SST_VAULT_CHAPTERS, SstChapterVault, SstTimelineItem, SstConceptPoint } from '../data/sstNotesVault';
import {
  ArrowLeft,
  Calculator,
  Atom,
  BookOpen,
  Globe,
  Feather,
  Laptop,
  Search,
  Copy,
  Check,
  Sparkles,
  BookMarked,
  Sigma,
  HelpCircle,
  ChevronRight,
  User,
  Users,
  PenTool,
  ScrollText,
  Clock,
  Compass,
  Landmark,
  TrendingUp,
  MapPin,
  Flame,
  CheckCircle2,
  FlaskConical,
  Dna,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NotesVaultPageProps {
  tokens: ColorTokens;
  selectedClass?: AcademicClass;
  onBack: () => void;
}

export const NotesVaultPage: React.FC<NotesVaultPageProps> = ({ tokens, selectedClass = '9', onBack }) => {
  // Navigation states
  const [selectedSubject, setSelectedSubject] = useState<'maths' | 'science' | 'english' | 'hindi' | 'sst' | null>(null);
  const [selectedMathChapterId, setSelectedMathChapterId] = useState<string | null>(null);
  const [selectedScienceChapterId, setSelectedScienceChapterId] = useState<string | null>(null);
  const [selectedEnglishChapterId, setSelectedEnglishChapterId] = useState<string | null>(null);
  const [selectedHindiChapterId, setSelectedHindiChapterId] = useState<string | null>(null);
  const [selectedSstChapterId, setSelectedSstChapterId] = useState<string | null>(null);
  const [selectedClass11Subject, setSelectedClass11Subject] = useState<string | null>(null);

  // Active view inside a Math / Science chapter: 'formulas' or 'definitions'
  const [mathTab, setMathTab] = useState<'formulas' | 'definitions'>('formulas');
  const [scienceTab, setScienceTab] = useState<'formulas' | 'definitions'>('formulas');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Scroll positions to preserve exact place when user clicks "Back"
  const subjectsScrollPos = useRef<number>(0);
  const chaptersScrollPos = useRef<number>(0);

  const openSubject = (subj: 'maths' | 'science' | 'english' | 'hindi' | 'sst') => {
    subjectsScrollPos.current = window.scrollY;
    setSelectedSubject(subj);
    setSelectedMathChapterId(null);
    setSelectedScienceChapterId(null);
    setSelectedEnglishChapterId(null);
    setSelectedHindiChapterId(null);
    setSelectedSstChapterId(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const backToSubjects = () => {
    setSelectedSubject(null);
    setSearchQuery('');
    const savedY = subjectsScrollPos.current;
    setTimeout(() => {
      window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
    }, 25);
  };

  const openChapter = (
    subj: 'maths' | 'science' | 'english' | 'hindi' | 'sst',
    chapterId: string
  ) => {
    chaptersScrollPos.current = window.scrollY;
    if (subj === 'science') {
      setSelectedScienceChapterId(chapterId);
      setScienceTab('formulas');
    } else if (subj === 'maths') {
      setSelectedMathChapterId(chapterId);
      setMathTab('formulas');
    } else if (subj === 'english') {
      setSelectedEnglishChapterId(chapterId);
    } else if (subj === 'hindi') {
      setSelectedHindiChapterId(chapterId);
    } else if (subj === 'sst') {
      setSelectedSstChapterId(chapterId);
    }
    setSearchQuery('');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const backToChapters = (subj: 'maths' | 'science' | 'english' | 'hindi' | 'sst') => {
    if (subj === 'science') setSelectedScienceChapterId(null);
    else if (subj === 'maths') setSelectedMathChapterId(null);
    else if (subj === 'english') setSelectedEnglishChapterId(null);
    else if (subj === 'hindi') setSelectedHindiChapterId(null);
    else if (subj === 'sst') setSelectedSstChapterId(null);
    setSearchQuery('');
    const savedY = chaptersScrollPos.current;
    setTimeout(() => {
      window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
    }, 25);
  };

  const subjectsList = [
    {
      id: 'science' as const,
      name: 'Science',
      shortCode: 'SCIENCE',
      icon: <Atom className="w-6 h-6" />,
      chaptersCount: 13,
      status: 'Ready & Complete',
      available: true,
      description: 'NCERT Exploration · Complete 13 Chapters Definitions & Precision Formulas',
    },
    {
      id: 'maths' as const,
      name: 'Mathematics',
      shortCode: 'MATHS',
      icon: <Calculator className="w-6 h-6" />,
      chaptersCount: 14,
      status: 'Ready & Complete',
      available: true,
      description: 'NCERT Ganita Manjari · Complete 14 Chapters Definitions & Precision Formulas',
    },
    {
      id: 'sst' as const,
      name: 'Social Science (S.St)',
      shortCode: 'S.St',
      icon: <Globe className="w-6 h-6" />,
      chaptersCount: 9,
      status: 'Ready & Complete',
      available: true,
      description: 'NCERT Understanding Society · History Timelines, Geography, Civics & Economics Summaries',
    },
    {
      id: 'english' as const,
      name: 'English',
      shortCode: 'ENGLISH',
      icon: <BookOpen className="w-6 h-6" />,
      chaptersCount: 19,
      status: 'Ready & Complete',
      available: true,
      description: 'NCERT Kaveri · Authors, Poets & One-Line Character Descriptions across all Units',
    },
    {
      id: 'hindi' as const,
      name: 'Hindi (हिन्दी)',
      shortCode: 'HINDI',
      icon: <Feather className="w-6 h-6" />,
      chaptersCount: 12,
      status: 'Ready & Complete',
      available: true,
      description: 'NCERT गंगा (पाठ्यपुस्तक) · गद्य व काव्य खंड के लेखक/कवि एवं संपूर्ण पात्र परिचय',
    },
    {
      id: 'computer' as const,
      name: 'Computer Applications',
      shortCode: 'COMPUTER',
      icon: <Laptop className="w-6 h-6" />,
      chaptersCount: 6,
      status: 'Coming Next',
      available: false,
      description: 'Cyber safety, HTML code cheat-sheets & office formulas.',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // ==========================================
  // LEVEL 3 (SST): Inside an SST Chapter
  // ==========================================
  const selectedSstChapter = SST_VAULT_CHAPTERS.find((c) => c.id === selectedSstChapterId);

  if (selectedSubject === 'sst' && selectedSstChapter) {
    const isHistory = selectedSstChapter.isHistoryTimeline;

    const filteredTimeline = (selectedSstChapter.timeline || []).filter(
      (item) =>
        item.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSummaries = (selectedSstChapter.summaryPoints || []).filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.explanation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={() => backToChapters('sst')}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95 self-start"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All S.St Chapters</span>
          </button>

          <div className="text-xs font-mono" style={{ color: tokens.textMuted }}>
            <span>NCERT Understanding Society</span>
            <span className="mx-2">/</span>
            <span className="font-semibold" style={{ color: tokens.accentPrimary }}>{selectedSstChapter.discipline} · Ch. {selectedSstChapter.chapterNumber}</span>
          </div>
        </div>

        {/* Chapter Header Card */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-4"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md font-semibold border"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    borderColor: tokens.borderSubtle,
                    color: tokens.accentPrimary,
                  }}
                >
                  Chapter {selectedSstChapter.chapterNumber} · {selectedSstChapter.discipline}
                </span>

                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle, color: tokens.textSecondary }}>
                  {isHistory ? 'Chronological Exam Timeline' : 'High-Yield Exam Summary'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                {selectedSstChapter.title}
              </h2>

              <p className="text-xs sm:text-sm font-body mt-1" style={{ color: tokens.textSecondary }}>
                {selectedSstChapter.quickTagline}
              </p>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-md border shrink-0" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle, color: tokens.textSecondary }}>
              {isHistory ? `${selectedSstChapter.timeline?.length} Key Epochs` : `${selectedSstChapter.summaryPoints?.length} Core Points`}
            </span>
          </div>

          {/* Quick Search */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHistory ? 'Search timeline by era or event...' : 'Search key exam points or topics...'}
              className="w-full min-h-[38px] pl-10 pr-4 rounded-xl border text-xs outline-none"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
          </div>
        </div>

        {/* ========================================================
            HISTORY DISPLAY: CHRONOLOGICAL EXAM TIMELINE
            ======================================================== */}
        {isHistory && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: tokens.accentPrimary }}>
              <Clock className="w-4 h-4" />
              <span>Chronological Exam Revision Timeline (Quick Glance)</span>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 space-y-6" style={{ borderColor: tokens.accentPrimary }}>
              {filteredTimeline.length > 0 ? (
                filteredTimeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="relative group"
                  >
                    {/* Glowing Bullet on Timeline */}
                    <div
                      className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{
                        backgroundColor: tokens.surface,
                        borderColor: tokens.accentPrimary,
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.accentPrimary }} />
                    </div>

                    {/* Timeline Event Card */}
                    <div
                      className="p-5 rounded-2xl border shadow-xs space-y-2 transition-all hover:shadow-md"
                      style={{
                        backgroundColor: tokens.surface,
                        borderColor: tokens.borderSubtle,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span
                            className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border inline-block"
                            style={{
                              backgroundColor: tokens.accentSoftBg,
                              borderColor: tokens.borderSubtle,
                              color: tokens.accentPrimary,
                            }}
                          >
                            {item.period}
                          </span>
                          <h4 className="text-base font-serif font-bold mt-1" style={{ color: tokens.textPrimary }}>
                            {item.headline}
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopy(`${selectedSstChapter.id}-${index}`, `${item.period} — ${item.headline}: ${item.summary}`)}
                          className="p-1.5 rounded-md border text-xs font-mono transition-all hover:brightness-95 flex items-center gap-1 shrink-0"
                          style={{
                            backgroundColor: tokens.canvas,
                            borderColor: tokens.borderSubtle,
                            color: tokens.textSecondary,
                          }}
                          title="Copy timeline event"
                        >
                          {copiedId === `${selectedSstChapter.id}-${index}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: tokens.textSecondary }}>
                        {item.summary}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div
                  className="p-8 rounded-2xl border text-center space-y-2"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.borderSubtle,
                  }}
                >
                  <HelpCircle className="w-7 h-7 mx-auto opacity-50" style={{ color: tokens.textMuted }} />
                  <p className="text-sm font-serif font-semibold" style={{ color: tokens.textPrimary }}>
                    No timeline events match &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            GEOGRAPHY / CIVICS / ECONOMICS DISPLAY: HIGH-YIELD SUMMARIES
            ======================================================== */}
        {!isHistory && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: tokens.accentPrimary }}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Core Exam Summary Points (Quick Recall)</span>
            </div>

            <div className="space-y-3.5">
              {filteredSummaries.length > 0 ? (
                filteredSummaries.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="p-5 rounded-2xl border shadow-xs space-y-2.5 transition-colors"
                    style={{
                      backgroundColor: tokens.surface,
                      borderColor: tokens.borderSubtle,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {point.badge && (
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border"
                            style={{
                              backgroundColor: tokens.accentSoftBg,
                              borderColor: tokens.borderSubtle,
                              color: tokens.accentPrimary,
                            }}
                          >
                            {point.badge}
                          </span>
                        )}
                        <h4 className="text-base font-serif font-bold" style={{ color: tokens.textPrimary }}>
                          {point.title}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(`${selectedSstChapter.id}-${index}`, `${point.title}: ${point.explanation}`)}
                        className="p-1.5 rounded-md border text-xs font-mono transition-all hover:brightness-95 flex items-center gap-1 shrink-0"
                        style={{
                          backgroundColor: tokens.canvas,
                          borderColor: tokens.borderSubtle,
                          color: tokens.textSecondary,
                        }}
                        title="Copy summary point"
                      >
                        {copiedId === `${selectedSstChapter.id}-${index}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    <div
                      className="p-3.5 rounded-xl border text-xs sm:text-sm font-body leading-relaxed shadow-inner"
                      style={{
                        backgroundColor: tokens.canvas,
                        borderColor: tokens.borderSubtle,
                        color: tokens.textPrimary,
                      }}
                    >
                      {point.explanation}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div
                  className="p-8 rounded-2xl border text-center space-y-2"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.borderSubtle,
                  }}
                >
                  <HelpCircle className="w-7 h-7 mx-auto opacity-50" style={{ color: tokens.textMuted }} />
                  <p className="text-sm font-serif font-semibold" style={{ color: tokens.textPrimary }}>
                    No points match &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // LEVEL 2 (SST): All 9 S.St Chapters
  // ==========================================
  if (selectedSubject === 'sst') {
    const filteredSstChapters = SST_VAULT_CHAPTERS.filter(
      (ch) =>
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.discipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.quickTagline.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={backToSubjects}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Subjects</span>
          </button>

          <span className="text-xs font-mono font-medium" style={{ color: tokens.textMuted }}>
            9 Chapters Across 4 Disciplines
          </span>
        </div>

        {/* Header */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-3"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: tokens.accentPrimary }}>
            <Globe className="w-4 h-4" />
            <span>Class 9 Social Science Vault</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
            Understanding Society: India and Beyond
          </h2>
          <p className="text-xs sm:text-sm font-body max-w-2xl" style={{ color: tokens.textSecondary }}>
            Click any chapter below. History chapters feature <strong>chronological exam timelines</strong> for fast recall, while Geography, Civics, and Economics feature <strong>crisp, high-yield summaries</strong>.
          </p>

          {/* Search bar */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by chapter, discipline (History, Geography, etc.)..."
              className="w-full min-h-[42px] pl-10 pr-4 rounded-xl border text-xs outline-none"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Grid of SST Chapters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSstChapters.map((ch) => (
            <motion.div
              key={ch.id}
              whileHover={{ y: -2, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => openChapter('sst', ch.id)}
              className="p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between select-none shadow-xs hover:shadow-md group"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold" style={{ backgroundColor: tokens.accentSoftBg, color: tokens.accentPrimary }}>
                    Ch. {ch.chapterNumber} · {ch.discipline}
                  </span>

                  <span className="text-[10px] font-mono" style={{ color: tokens.textMuted }}>
                    {ch.isHistoryTimeline ? '⏱️ Chrono Timeline' : '📝 Core Summary'}
                  </span>
                </div>

                <h3
                  className="text-base sm:text-lg font-serif font-bold tracking-tight group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors"
                  style={{ color: tokens.textPrimary }}
                >
                  {ch.title}
                </h3>

                <p className="text-xs leading-relaxed" style={{ color: tokens.textSecondary }}>
                  {ch.quickTagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold" style={{ borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}>
                <span>{ch.isHistoryTimeline ? 'View Exam Timeline' : 'View Quick Summary'}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 3 (HINDI): Inside a Hindi Chapter
  // ==========================================
  const selectedHindiChapter = HINDI_VAULT_CHAPTERS.find((c) => c.id === selectedHindiChapterId);

  if (selectedSubject === 'hindi' && selectedHindiChapter) {
    const filteredCharacters = selectedHindiChapter.characters.filter(
      (char) =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.oneLineDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={() => backToChapters('hindi')}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95 self-start"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>वापस हिन्दी पाठ सूची में (Back)</span>
          </button>

          <div className="text-xs font-mono" style={{ color: tokens.textMuted }}>
            <span>NCERT गंगा (कक्षा 9)</span>
            <span className="mx-2">/</span>
            <span className="font-semibold" style={{ color: tokens.accentPrimary }}>{selectedHindiChapter.section} · पाठ {selectedHindiChapter.chapterNumber}</span>
          </div>
        </div>

        {/* Chapter Header Card with Author / Poet Name */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-5"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md font-semibold border"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    borderColor: tokens.borderSubtle,
                    color: tokens.accentPrimary,
                  }}
                >
                  पाठ {selectedHindiChapter.chapterNumber} · {selectedHindiChapter.genre}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle, color: tokens.textMuted }}>
                  {selectedHindiChapter.section}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                {selectedHindiChapter.title}
              </h2>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-md border shrink-0" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle, color: tokens.textSecondary }}>
              {selectedHindiChapter.characters.length} पात्र (Characters)
            </span>
          </div>

          {/* Prominent Writer / Poet Box */}
          <div
            className="p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-4 shadow-inner"
            style={{
              backgroundColor: tokens.canvas,
              borderColor: tokens.borderStrong,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center border shrink-0"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: tokens.borderSubtle,
                  color: tokens.accentPrimary,
                }}
              >
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-semibold block" style={{ color: tokens.textMuted }}>
                  रचनाकार / {selectedHindiChapter.authorTitle}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold" style={{ color: tokens.textPrimary }}>
                  {selectedHindiChapter.author}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(selectedHindiChapter.id, `${selectedHindiChapter.title} — ${selectedHindiChapter.authorTitle}: ${selectedHindiChapter.author}`)}
              className="p-1.5 rounded-md border text-xs font-mono transition-all hover:brightness-95 flex items-center gap-1 shrink-0"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
                color: tokens.textSecondary,
              }}
              title="Copy author details"
            >
              {copiedId === selectedHindiChapter.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px] hidden sm:inline">{copiedId === selectedHindiChapter.id ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="पात्र का नाम या भूमिका खोजें..."
              className="w-full min-h-[38px] pl-10 pr-4 rounded-xl border text-xs outline-none"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Characters & One-Line Descriptions */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: tokens.accentPrimary }}>
            <Users className="w-4 h-4" />
            <span>पात्र परिचय एवं एक-पंक्ति विवरण (Character Profiles)</span>
          </div>

          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((char, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="p-5 rounded-2xl border shadow-xs space-y-2 transition-colors"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: tokens.borderSubtle,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center border text-xs font-serif font-bold shrink-0"
                      style={{
                        backgroundColor: tokens.canvas,
                        borderColor: tokens.borderStrong,
                        color: tokens.accentPrimary,
                      }}
                    >
                      {index + 1}
                    </div>

                    <div>
                      <h4 className="text-base font-serif font-bold" style={{ color: tokens.textPrimary }}>
                        {char.name}
                      </h4>
                      <span className="text-[11px] font-mono opacity-75 block" style={{ color: tokens.accentPrimary }}>
                        {char.role}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(`${selectedHindiChapter.id}-${index}`, `${char.name} (${char.role}): ${char.oneLineDescription}`)}
                    className="p-1.5 rounded-md border text-xs font-mono transition-all hover:brightness-95 flex items-center gap-1 shrink-0"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderSubtle,
                      color: tokens.textSecondary,
                    }}
                    title="Copy description"
                  >
                    {copiedId === `${selectedHindiChapter.id}-${index}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-xs sm:text-sm font-body leading-relaxed shadow-inner"
                  style={{
                    backgroundColor: tokens.canvas,
                    borderColor: tokens.borderSubtle,
                    color: tokens.textPrimary,
                  }}
                >
                  {char.oneLineDescription}
                </div>
              </motion.div>
            ))
          ) : (
            <div
              className="p-8 rounded-2xl border text-center space-y-2"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <HelpCircle className="w-7 h-7 mx-auto opacity-50" style={{ color: tokens.textMuted }} />
              <p className="text-sm font-serif font-semibold" style={{ color: tokens.textPrimary }}>
                कोई पात्र नहीं मिला &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 2 (HINDI): All 12 Hindi Chapters
  // ==========================================
  if (selectedSubject === 'hindi') {
    const filteredHindiChapters = HINDI_VAULT_CHAPTERS.filter(
      (ch) =>
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.section.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={backToSubjects}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Subjects</span>
          </button>

          <span className="text-xs font-mono font-medium" style={{ color: tokens.textMuted }}>
            12 पाठ उपलब्ध (7 गद्य + 5 काव्य)
          </span>
        </div>

        {/* Header */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-3"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: tokens.accentPrimary }}>
            <Feather className="w-4 h-4" />
            <span>Class 9 Hindi (गंगा) Vault</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
            पाठ्यपुस्तक &lsquo;गंगा&rsquo; — संपूर्ण गद्य व काव्य खंड
          </h2>
          <p className="text-xs sm:text-sm font-body max-w-2xl" style={{ color: tokens.textSecondary }}>
            किसी भी पाठ पर क्लिक करके उसके <strong>लेखक/कवि का नाम</strong> तथा सभी <strong>पात्रों का सटीक एक-पंक्ति परिचय</strong> देखें।
          </p>

          {/* Search bar */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="पाठ, लेखक, विधा या खंड खोजें..."
              className="w-full min-h-[42px] pl-10 pr-4 rounded-xl border text-xs outline-none"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Grid of Hindi Chapters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredHindiChapters.map((ch) => (
            <motion.div
              key={ch.id}
              whileHover={{ y: -2, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => openChapter('hindi', ch.id)}
              className="p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between select-none shadow-xs hover:shadow-md group"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold" style={{ backgroundColor: tokens.accentSoftBg, color: tokens.accentPrimary }}>
                    पाठ {ch.chapterNumber} · {ch.section}
                  </span>

                  <span className="text-[10px] font-mono" style={{ color: tokens.textMuted }}>
                    {ch.genre}
                  </span>
                </div>

                <h3
                  className="text-base sm:text-lg font-serif font-bold tracking-tight group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors"
                  style={{ color: tokens.textPrimary }}
                >
                  {ch.title}
                </h3>

                <p className="text-xs font-mono font-medium flex items-center gap-1.5" style={{ color: tokens.textSecondary }}>
                  <PenTool className="w-3.5 h-3.5 text-amber-600" />
                  <span>{ch.authorTitle}: <strong>{ch.author}</strong></span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold" style={{ borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}>
                <span>पात्र परिचय देखें (View Characters)</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 3 (ENGLISH): Inside an English Chapter
  // ==========================================
  const selectedEnglishChapter = ENGLISH_VAULT_CHAPTERS.find((c) => c.id === selectedEnglishChapterId);

  if (selectedSubject === 'english' && selectedEnglishChapter) {
    const filteredCharacters = selectedEnglishChapter.characters.filter(
      (char) =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.oneLineDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={() => backToChapters('english')}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95 self-start"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All English Chapters</span>
          </button>

          <div className="text-xs font-mono" style={{ color: tokens.textMuted }}>
            <span>NCERT Kaveri</span>
            <span className="mx-2">/</span>
            <span className="font-semibold" style={{ color: tokens.accentPrimary }}>Unit {selectedEnglishChapter.unitNumber}</span>
          </div>
        </div>

        {/* Chapter Header Card with Writer/Poet Name */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-5"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md font-semibold border"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    borderColor: tokens.borderSubtle,
                    color: tokens.accentPrimary,
                  }}
                >
                  Unit {selectedEnglishChapter.unitNumber} · {selectedEnglishChapter.type}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                {selectedEnglishChapter.title}
              </h2>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-md border shrink-0" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle, color: tokens.textSecondary }}>
              {selectedEnglishChapter.characters.length} {selectedEnglishChapter.characters.length === 1 ? 'Character / Persona' : 'Characters'}
            </span>
          </div>

          {/* Prominent Writer / Poet Box */}
          <div
            className="p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-4 shadow-inner"
            style={{
              backgroundColor: tokens.canvas,
              borderColor: tokens.borderStrong,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center border shrink-0"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: tokens.borderSubtle,
                  color: tokens.accentPrimary,
                }}
              >
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-semibold block" style={{ color: tokens.textMuted }}>
                  {selectedEnglishChapter.authorTitle} of this {selectedEnglishChapter.type}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold" style={{ color: tokens.textPrimary }}>
                  {selectedEnglishChapter.author}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(selectedEnglishChapter.id, `${selectedEnglishChapter.title} — ${selectedEnglishChapter.authorTitle}: ${selectedEnglishChapter.author}`)}
              className="p-1.5 rounded-md border text-xs font-mono transition-all hover:brightness-95 flex items-center gap-1 shrink-0"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
                color: tokens.textSecondary,
              }}
              title="Copy author details"
            >
              {copiedId === selectedEnglishChapter.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px] hidden sm:inline">{copiedId === selectedEnglishChapter.id ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search characters or roles..."
              className="w-full min-h-[38px] pl-10 pr-4 rounded-xl border text-xs outline-none"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Characters & One-Line Descriptions */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: tokens.accentPrimary }}>
            <Users className="w-4 h-4" />
            <span>Character Profiles & One-Line Summaries</span>
          </div>

          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((char, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="p-5 rounded-2xl border shadow-xs space-y-2 transition-colors"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: tokens.borderSubtle,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center border text-xs font-serif font-bold shrink-0"
                      style={{
                        backgroundColor: tokens.canvas,
                        borderColor: tokens.borderStrong,
                        color: tokens.accentPrimary,
                      }}
                    >
                      {index + 1}
                    </div>

                    <div>
                      <h4 className="text-base font-serif font-bold" style={{ color: tokens.textPrimary }}>
                        {char.name}
                      </h4>
                      <span className="text-[11px] font-mono opacity-75 block" style={{ color: tokens.accentPrimary }}>
                        {char.role}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(`${selectedEnglishChapter.id}-${index}`, `${char.name} (${char.role}): ${char.oneLineDescription}`)}
                    className="p-1.5 rounded-md border text-xs font-mono transition-all hover:brightness-95 flex items-center gap-1 shrink-0"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderSubtle,
                      color: tokens.textSecondary,
                    }}
                    title="Copy description"
                  >
                    {copiedId === `${selectedEnglishChapter.id}-${index}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                <div
                  className="p-3.5 rounded-xl border text-xs sm:text-sm font-body leading-relaxed shadow-inner"
                  style={{
                    backgroundColor: tokens.canvas,
                    borderColor: tokens.borderSubtle,
                    color: tokens.textPrimary,
                  }}
                >
                  {char.oneLineDescription}
                </div>
              </motion.div>
            ))
          ) : (
            <div
              className="p-8 rounded-2xl border text-center space-y-2"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <HelpCircle className="w-7 h-7 mx-auto opacity-50" style={{ color: tokens.textMuted }} />
              <p className="text-sm font-serif font-semibold" style={{ color: tokens.textPrimary }}>
                No characters match &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 2 (ENGLISH): All English Chapters
  // ==========================================
  if (selectedSubject === 'english') {
    const filteredEnglishChapters = ENGLISH_VAULT_CHAPTERS.filter(
      (ch) =>
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={backToSubjects}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Subjects</span>
          </button>

          <span className="text-xs font-mono font-medium" style={{ color: tokens.textMuted }}>
            {ENGLISH_VAULT_CHAPTERS.length} Literary Works Available
          </span>
        </div>

        {/* Header */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-3"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: tokens.accentPrimary }}>
            <BookOpen className="w-4 h-4" />
            <span>Class 9 English Vault</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
            Kaveri Textbook (Units 1 to 8)
          </h2>
          <p className="text-xs sm:text-sm font-body max-w-2xl" style={{ color: tokens.textSecondary }}>
            Click on any story, poem, or play below to view the <strong>Name of the Writer / Poet</strong> and a <strong>Brief One-Line Character Description</strong> of all characters.
          </p>

          {/* Search bar */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by chapter, poem, author or genre..."
              className="w-full min-h-[42px] pl-10 pr-4 rounded-xl border text-xs outline-none"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Grid of English chapters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredEnglishChapters.map((ch) => (
            <motion.div
              key={ch.id}
              whileHover={{ y: -2, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => openChapter('english', ch.id)}
              className="p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between select-none shadow-xs hover:shadow-md group"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold" style={{ backgroundColor: tokens.accentSoftBg, color: tokens.accentPrimary }}>
                    Unit {ch.unitNumber} · {ch.type}
                  </span>

                  <span className="text-[10px] font-mono" style={{ color: tokens.textMuted }}>
                    {ch.characters.length} {ch.characters.length === 1 ? 'Persona' : 'Characters'}
                  </span>
                </div>

                <h3
                  className="text-base sm:text-lg font-serif font-bold tracking-tight group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors"
                  style={{ color: tokens.textPrimary }}
                >
                  {ch.title}
                </h3>

                <p className="text-xs font-mono font-medium flex items-center gap-1.5" style={{ color: tokens.textSecondary }}>
                  <PenTool className="w-3.5 h-3.5 text-amber-600" />
                  <span>{ch.authorTitle}: <strong>{ch.author}</strong></span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold" style={{ borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}>
                <span>View Character Descriptions</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 3 (SCIENCE): Inside a Science Chapter
  // ==========================================
  const selectedScienceChapter = SCIENCE_VAULT_CHAPTERS.find((c) => c.id === selectedScienceChapterId);

  if (selectedSubject === 'science' && selectedScienceChapter) {
    const rawItems = scienceTab === 'formulas' ? selectedScienceChapter.formulas : selectedScienceChapter.definitions;
    const items = rawItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.expression && item.expression.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={() => backToChapters('science')}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95 self-start"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Science Chapters</span>
          </button>

          <div className="text-xs font-mono" style={{ color: tokens.textMuted }}>
            <span>NCERT Exploration · Class 9 Science</span>
            <span className="mx-2">/</span>
            <span className="font-semibold" style={{ color: tokens.accentPrimary }}>Chapter {selectedScienceChapter.chapterNumber}</span>
          </div>
        </div>

        {/* Chapter Header Card */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-3"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md font-semibold border"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    borderColor: tokens.borderSubtle,
                    color: tokens.accentPrimary,
                  }}
                >
                  Chapter {selectedScienceChapter.chapterNumber} · {selectedScienceChapter.domain}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-1" style={{ color: tokens.textPrimary }}>
                {selectedScienceChapter.title}
              </h2>
              {selectedScienceChapter.subtitle && (
                <p className="text-xs sm:text-sm font-body mt-1" style={{ color: tokens.textSecondary }}>
                  {selectedScienceChapter.subtitle}
                </p>
              )}
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-md border shrink-0" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle, color: tokens.textSecondary }}>
              {selectedScienceChapter.formulas.length} Formulas · {selectedScienceChapter.definitions.length} Definitions
            </span>
          </div>

          {/* TWO-OPTION TOP BAR MENU (FORMULAS vs DEFINITIONS) */}
          <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderColor: tokens.borderSubtle }}>
            <div
              className="inline-flex p-1 rounded-xl border text-xs font-medium w-full sm:w-auto"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderSubtle,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setScienceTab('formulas');
                  setSearchQuery('');
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: scienceTab === 'formulas' ? tokens.surface : 'transparent',
                  color: scienceTab === 'formulas' ? tokens.textPrimary : tokens.textSecondary,
                  fontWeight: scienceTab === 'formulas' ? 700 : 500,
                  boxShadow: scienceTab === 'formulas' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <Sigma className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
                <span>Formulas & Results</span>
                <span
                  className="px-2 py-0.5 text-[10px] rounded-full font-mono font-bold"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    color: tokens.accentPrimary,
                  }}
                >
                  {selectedScienceChapter.formulas.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setScienceTab('definitions');
                  setSearchQuery('');
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: scienceTab === 'definitions' ? tokens.surface : 'transparent',
                  color: scienceTab === 'definitions' ? tokens.textPrimary : tokens.textSecondary,
                  fontWeight: scienceTab === 'definitions' ? 700 : 500,
                  boxShadow: scienceTab === 'definitions' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <BookMarked className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
                <span>Definitions & Concepts</span>
                <span
                  className="px-2 py-0.5 text-[10px] rounded-full font-mono font-bold"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    color: tokens.accentPrimary,
                  }}
                >
                  {selectedScienceChapter.definitions.length}
                </span>
              </button>
            </div>

            {/* In-Chapter Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${scienceTab}...`}
                className="w-full min-h-[38px] pl-8 pr-3 rounded-lg border text-xs outline-none"
                style={{
                  backgroundColor: tokens.canvas,
                  borderColor: tokens.borderStrong,
                  color: tokens.textPrimary,
                }}
              />
            </div>
          </div>
        </div>

        {/* List of Formulas or Definitions */}
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="p-5 sm:p-6 rounded-2xl border shadow-xs space-y-3 transition-colors"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: tokens.borderSubtle,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold border"
                      style={{
                        backgroundColor: tokens.accentSoftBg,
                        borderColor: tokens.borderSubtle,
                        color: tokens.accentPrimary,
                      }}
                    >
                      {item.tag || (scienceTab === 'formulas' ? 'Formula' : 'Definition')}
                    </span>

                    {item.note && (
                      <span className="text-[11px] font-mono italic text-amber-700 dark:text-amber-300 font-medium">
                        [{item.note}]
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        item.id,
                        item.expression ? `${item.name}\n${item.expression}\n${item.details}` : `${item.name}: ${item.details}`
                      )
                    }
                    className="p-1.5 rounded-md border text-xs font-mono transition-all hover:brightness-95 flex items-center gap-1 shrink-0"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderSubtle,
                      color: tokens.textSecondary,
                    }}
                    title="Copy to clipboard"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-bold" style={{ color: tokens.textPrimary }}>
                  {item.name}
                </h3>

                {item.expression && (
                  <div
                    className="p-4 rounded-xl border font-mono text-sm sm:text-base font-semibold leading-relaxed tracking-wide whitespace-pre-line shadow-inner"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderStrong,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {item.expression}
                  </div>
                )}

                <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: tokens.textSecondary }}>
                  {item.details}
                </p>
              </motion.div>
            ))
          ) : (
            <div
              className="p-8 rounded-2xl border text-center space-y-2"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <HelpCircle className="w-7 h-7 mx-auto opacity-50" style={{ color: tokens.textMuted }} />
              <p className="text-sm font-serif font-semibold" style={{ color: tokens.textPrimary }}>
                No items match &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 2 (SCIENCE): All 13 Science Chapters
  // ==========================================
  if (selectedSubject === 'science') {
    const filteredScienceChapters = SCIENCE_VAULT_CHAPTERS.filter(
      (ch) =>
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ch.subtitle && ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={backToSubjects}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Subjects</span>
          </button>

          <span className="text-xs font-mono font-medium" style={{ color: tokens.textMuted }}>
            13 Chapters Available (NCERT Exploration)
          </span>
        </div>

        {/* Header */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-3"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: tokens.accentPrimary }}>
            <Atom className="w-4 h-4" />
            <span>Class 9 Science Vault</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
            Exploration Textbook (All 13 Chapters)
          </h2>
          <p className="text-xs sm:text-sm font-body max-w-2xl" style={{ color: tokens.textSecondary }}>
            Click on any chapter below to access its official <strong>Definitions</strong> and <strong>Formulas</strong> summarized for rapid revision and high-accuracy exam mastery.
          </p>

          {/* Search bar */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters by name, discipline (Physics, Chemistry, Biology)..."
              className="w-full min-h-[42px] pl-10 pr-4 rounded-xl border text-xs outline-none"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Grid of all 13 Science Chapters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredScienceChapters.map((ch) => (
            <motion.div
              key={ch.id}
              whileHover={{ y: -2, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => openChapter('science', ch.id)}
              className="p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between select-none shadow-xs hover:shadow-md group"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold" style={{ backgroundColor: tokens.accentSoftBg, color: tokens.accentPrimary }}>
                    Chapter {ch.chapterNumber} · {ch.domain}
                  </span>

                  <span className="text-[10px] font-mono" style={{ color: tokens.textMuted }}>
                    {ch.formulas.length} Formulas · {ch.definitions.length} Defs
                  </span>
                </div>

                <h3
                  className="text-base sm:text-lg font-serif font-bold tracking-tight group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors"
                  style={{ color: tokens.textPrimary }}
                >
                  {ch.title}
                </h3>

                {ch.subtitle && (
                  <p className="text-xs leading-relaxed" style={{ color: tokens.textSecondary }}>
                    {ch.subtitle}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold" style={{ borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}>
                <span>View Formulas & Definitions</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 3 (MATHS): Inside a Maths Chapter
  // ==========================================
  const selectedMathChapter = MATHS_VAULT_CHAPTERS.find((c) => c.id === selectedMathChapterId);

  if (selectedSubject === 'maths' && selectedMathChapter) {
    const rawItems = mathTab === 'formulas' ? selectedMathChapter.formulas : selectedMathChapter.definitions;
    const items = rawItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.expression && item.expression.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={() => backToChapters('maths')}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95 self-start"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Maths Chapters</span>
          </button>

          <div className="text-xs font-mono" style={{ color: tokens.textMuted }}>
            <span>Class 9 Maths</span>
            <span className="mx-2">/</span>
            <span className="font-semibold" style={{ color: tokens.accentPrimary }}>Chapter {selectedMathChapter.chapterNumber}</span>
          </div>
        </div>

        {/* Chapter Header Card */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-3"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest font-semibold block" style={{ color: tokens.accentPrimary }}>
                NCERT Ganita Manjari · Part {selectedMathChapter.part}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-1" style={{ color: tokens.textPrimary }}>
                Ch. {selectedMathChapter.chapterNumber} | {selectedMathChapter.title}
              </h2>
              {selectedMathChapter.subtitle && (
                <p className="text-xs sm:text-sm font-body mt-1" style={{ color: tokens.textSecondary }}>
                  {selectedMathChapter.subtitle}
                </p>
              )}
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-md border shrink-0" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle, color: tokens.textSecondary }}>
              {selectedMathChapter.formulas.length} Formulas · {selectedMathChapter.definitions.length} Definitions
            </span>
          </div>

          {/* TWO-OPTION TOP BAR MENU (FORMULAS vs DEFINITIONS) */}
          <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderColor: tokens.borderSubtle }}>
            <div
              className="inline-flex p-1 rounded-xl border text-xs font-medium w-full sm:w-auto"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderSubtle,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setMathTab('formulas');
                  setSearchQuery('');
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: mathTab === 'formulas' ? tokens.surface : 'transparent',
                  color: mathTab === 'formulas' ? tokens.textPrimary : tokens.textSecondary,
                  fontWeight: mathTab === 'formulas' ? 700 : 500,
                  boxShadow: mathTab === 'formulas' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <Sigma className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
                <span>Formulas & Results</span>
                <span
                  className="px-2 py-0.5 text-[10px] rounded-full font-mono font-bold"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    color: tokens.accentPrimary,
                  }}
                >
                  {selectedMathChapter.formulas.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMathTab('definitions');
                  setSearchQuery('');
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: mathTab === 'definitions' ? tokens.surface : 'transparent',
                  color: mathTab === 'definitions' ? tokens.textPrimary : tokens.textSecondary,
                  fontWeight: mathTab === 'definitions' ? 700 : 500,
                  boxShadow: mathTab === 'definitions' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <BookMarked className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
                <span>Definitions</span>
                <span
                  className="px-2 py-0.5 text-[10px] rounded-full font-mono font-bold"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    color: tokens.accentPrimary,
                  }}
                >
                  {selectedMathChapter.definitions.length}
                </span>
              </button>
            </div>

            {/* In-Chapter Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${mathTab}...`}
                className="w-full min-h-[38px] pl-8 pr-3 rounded-lg border text-xs outline-none"
                style={{
                  backgroundColor: tokens.canvas,
                  borderColor: tokens.borderStrong,
                  color: tokens.textPrimary,
                }}
              />
            </div>
          </div>
        </div>

        {/* List of Formulas or Definitions */}
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="p-5 sm:p-6 rounded-2xl border shadow-xs space-y-3 transition-colors"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: tokens.borderSubtle,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold border"
                      style={{
                        backgroundColor: tokens.accentSoftBg,
                        borderColor: tokens.borderSubtle,
                        color: tokens.accentPrimary,
                      }}
                    >
                      {item.tag || (mathTab === 'formulas' ? 'Formula' : 'Definition')}
                    </span>

                    {item.note && (
                      <span className="text-[11px] font-serif italic text-amber-700 dark:text-amber-300 font-medium">
                        [{item.note}]
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        item.id,
                        item.expression ? `${item.name}\n${item.expression}\n${item.details}` : `${item.name}: ${item.details}`
                      )
                    }
                    className="p-1.5 rounded-md border text-xs font-mono transition-all hover:brightness-95 flex items-center gap-1 shrink-0"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderSubtle,
                      color: tokens.textSecondary,
                    }}
                    title="Copy to clipboard"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-bold" style={{ color: tokens.textPrimary }}>
                  {item.name}
                </h3>

                {item.expression && (
                  <div
                    className="p-4 rounded-xl border font-mono text-sm sm:text-base font-semibold leading-relaxed tracking-wide whitespace-pre-line shadow-inner"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderStrong,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {item.expression}
                  </div>
                )}

                <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: tokens.textSecondary }}>
                  {item.details}
                </p>
              </motion.div>
            ))
          ) : (
            <div
              className="p-8 rounded-2xl border text-center space-y-2"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <HelpCircle className="w-7 h-7 mx-auto opacity-50" style={{ color: tokens.textMuted }} />
              <p className="text-sm font-serif font-semibold" style={{ color: tokens.textPrimary }}>
                No items match &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 2 (MATHS): All 14 Maths Chapters
  // ==========================================
  if (selectedSubject === 'maths') {
    const filteredChapters = MATHS_VAULT_CHAPTERS.filter(
      (ch) =>
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ch.subtitle && ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
          <button
            onClick={backToSubjects}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Subjects</span>
          </button>

          <span className="text-xs font-mono font-medium" style={{ color: tokens.textMuted }}>
            14 Chapters Available
          </span>
        </div>

        {/* Header */}
        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-3"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: tokens.accentPrimary }}>
            <Calculator className="w-4 h-4" />
            <span>Class 9 Mathematics Vault</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
            Ganita Manjari Chapters (All 14)
          </h2>
          <p className="text-xs sm:text-sm font-body max-w-2xl" style={{ color: tokens.textSecondary }}>
            Click on any chapter below to view its complete formulas and one-line definitions transcribed with precision from the official curriculum.
          </p>

          {/* Search bar */}
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters by name or topic..."
              className="w-full min-h-[42px] pl-10 pr-4 rounded-xl border text-xs outline-none"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Grid of all 14 Chapters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredChapters.map((ch) => (
            <motion.div
              key={ch.id}
              whileHover={{ y: -2, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => openChapter('maths', ch.id)}
              className="p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between select-none shadow-xs hover:shadow-md group"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderSubtle,
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold" style={{ backgroundColor: tokens.accentSoftBg, color: tokens.accentPrimary }}>
                    Chapter {ch.chapterNumber} · Part {ch.part}
                  </span>

                  <span className="text-[10px] font-mono" style={{ color: tokens.textMuted }}>
                    {ch.formulas.length} Formulas · {ch.definitions.length} Defs
                  </span>
                </div>

                <h3
                  className="text-base sm:text-lg font-serif font-bold tracking-tight group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors"
                  style={{ color: tokens.textPrimary }}
                >
                  {ch.title}
                </h3>

                {ch.subtitle && (
                  <p className="text-xs leading-relaxed" style={{ color: tokens.textSecondary }}>
                    {ch.subtitle}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold" style={{ borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}>
                <span>View Formulas & Definitions</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 1 (CLASS 11): Class 11 Subjects & On-Hold View
  // ==========================================
  const class11SubjectsList = [
    {
      id: 'physics',
      name: 'Physics',
      shortCode: 'PHYS',
      icon: <Atom className="w-6 h-6" />,
      chaptersCount: 14,
      status: 'Framework Ready',
      description: 'Kinematics, Laws of Motion, Work-Energy, Gravitation, Thermodynamics, Oscillations & Waves',
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      shortCode: 'CHEM',
      icon: <FlaskConical className="w-6 h-6" />,
      chaptersCount: 9,
      status: 'Framework Ready',
      description: 'Atomic Structure, Bonding, Thermodynamics, Equilibrium, Redox Reactions & Organic Principles',
    },
    {
      id: 'maths',
      name: 'Mathematics',
      shortCode: 'MATHS',
      icon: <Calculator className="w-6 h-6" />,
      chaptersCount: 14,
      status: 'Framework Ready',
      description: 'Sets, Relations, Trigonometry, Complex Numbers, Combinatorics, Conics & Limits/Derivatives',
    },
    {
      id: 'biology',
      name: 'Biology',
      shortCode: 'BIO',
      icon: <Dna className="w-6 h-6" />,
      chaptersCount: 19,
      status: 'Framework Ready',
      description: 'The Living World, Cell Biology, Biomolecules, Plant Physiology & Human Physiology',
    },
    {
      id: 'english',
      name: 'English Core',
      shortCode: 'ENGLISH',
      icon: <BookOpen className="w-6 h-6" />,
      chaptersCount: 22,
      status: 'Framework Ready',
      description: 'Hornbill Prose (6), Poems (5), Writing Skills (6) & Snapshots Stories (5)',
    },
    {
      id: 'hindi',
      name: 'Hindi',
      shortCode: 'HINDI',
      icon: <Feather className="w-6 h-6" />,
      chaptersCount: 24,
      status: 'Framework Ready',
      description: 'Aroh and Vitan Prose & Poetry key summaries, themes and character insights',
    },
    {
      id: 'cs',
      name: 'Computer Science CS',
      shortCode: 'CS',
      icon: <Laptop className="w-6 h-6" />,
      chaptersCount: 11,
      status: 'Framework Ready',
      description: 'Computer Systems, Number Systems, Python Syntax, Flow of Control, Strings, Lists, Tuples & Dictionaries',
    },
  ];

  if (selectedClass === '11') {
    const active11Sub = class11SubjectsList.find((s) => s.id === selectedClass11Subject);

    if (active11Sub) {
      return (
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
          <button
            onClick={() => setSelectedClass11Subject(null)}
            className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Class 11 Subjects</span>
          </button>

          <div
            className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-4"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs"
                style={{
                  backgroundColor: tokens.canvas,
                  borderColor: tokens.borderStrong,
                  color: tokens.accentPrimary,
                }}
              >
                {active11Sub.icon}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: tokens.accentPrimary }}>
                  Class 11th · {active11Sub.shortCode}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                  {active11Sub.name} Revision Vault
                </h2>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border space-y-3"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: tokens.borderSubtle,
              }}
            >
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-amber-500">
                <Info className="w-4 h-4" />
                <span>Content & Data on Hold</span>
              </div>
              <p className="text-sm font-body leading-relaxed" style={{ color: tokens.textSecondary }}>
                The Class 11 <strong>{active11Sub.name}</strong> notes and formula deck framework is ready. As requested, all detailed notes, formulas, and revision cards are on hold. Whenever you are ready, you can ask to add chapters, formulas, and definitions!
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setSelectedClass11Subject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all hover:brightness-95 active:scale-95"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.borderStrong,
                    color: tokens.textPrimary,
                  }}
                >
                  Return to Subjects Grid
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
        <button
          onClick={onBack}
          className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
            color: tokens.textPrimary,
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div
          className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-3"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: tokens.accentPrimary }}>
            <BookMarked className="w-4 h-4" />
            <span>Class 11th · Revision & Notes Vault</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
            Select a Subject to Explore
          </h2>
          <p className="text-xs sm:text-sm font-body max-w-2xl leading-relaxed" style={{ color: tokens.textSecondary }}>
            Higher secondary core subjects for Class 11: <strong>Physics</strong>, <strong>Chemistry</strong>, <strong>Mathematics</strong>, <strong>Biology</strong>, <strong>English Core</strong>, and <strong>Computer Science</strong>. Subject structure is active; chapter contents remain on hold as requested.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {class11SubjectsList.map((sub) => (
            <motion.div
              key={sub.id}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedClass11Subject(sub.id)}
              className="p-6 rounded-2xl border flex flex-col justify-between select-none cursor-pointer transition-all hover:shadow-md"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.accentPrimary,
                boxShadow: `0 0 0 1px ${tokens.ringColor}`,
              }}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderStrong,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {sub.icon}
                  </div>

                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border"
                    style={{
                      backgroundColor: tokens.accentSoftBg,
                      borderColor: tokens.borderSubtle,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {sub.status}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold tracking-tight mb-1" style={{ color: tokens.textPrimary }}>
                  {sub.name}
                </h3>

                <p className="text-xs font-mono font-semibold mb-2" style={{ color: tokens.accentPrimary }}>
                  {sub.chaptersCount} Chapters / Units
                </p>

                <p className="text-xs leading-relaxed" style={{ color: tokens.textSecondary }}>
                  {sub.description}
                </p>
              </div>

              <div
                className="mt-6 pt-3 border-t flex items-center justify-between text-xs font-semibold"
                style={{
                  borderColor: tokens.borderSubtle,
                  color: tokens.accentPrimary,
                }}
              >
                <span>Open Revision Vault</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 1: Subject Selection (6 Subjects)
  // ==========================================
  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
      {/* Top back button */}
      <button
        onClick={onBack}
        className="min-h-[44px] px-3.5 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-semibold transition-all hover:brightness-95 active:scale-95"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderStrong,
          color: tokens.textPrimary,
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Main Sanctuary Header */}
      <div
        className="p-6 sm:p-8 rounded-2xl border shadow-xs space-y-3"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderStrong,
        }}
      >
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: tokens.accentPrimary }}>
          <BookMarked className="w-4 h-4" />
          <span>Revision & Notes Vault</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
          Select a Subject to Revise
        </h2>
        <p className="text-xs sm:text-sm font-body max-w-2xl" style={{ color: tokens.textSecondary }}>
          Choose a subject to access its chapter-by-chapter revision notes. <strong>Science</strong> (Formulas & Definitions), <strong>Mathematics</strong> (Formulas & Definitions), <strong>Social Science</strong> (Timelines & Summaries), <strong>English</strong> (Authors & Character Summaries), and <strong>Hindi</strong> (लेखक व पात्र परिचय) are fully unlocked and ready!
        </p>
      </div>

      {/* 6 Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {subjectsList.map((sub) => (
          <motion.div
            key={sub.id}
            whileHover={sub.available ? { y: -3, scale: 1.01 } : {}}
            whileTap={sub.available ? { scale: 0.99 } : {}}
            onClick={() => {
              if (sub.available) {
                openSubject(sub.id as any);
              }
            }}
            className={`p-6 rounded-2xl border flex flex-col justify-between select-none transition-all ${
              sub.available ? 'cursor-pointer hover:shadow-md' : 'opacity-70 cursor-not-allowed'
            }`}
            style={{
              backgroundColor: tokens.surface,
              borderColor: sub.available ? tokens.accentPrimary : tokens.borderSubtle,
              boxShadow: sub.available ? `0 0 0 1px ${tokens.ringColor}` : 'none',
            }}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs"
                  style={{
                    backgroundColor: tokens.canvas,
                    borderColor: tokens.borderStrong,
                    color: tokens.accentPrimary,
                  }}
                >
                  {sub.icon}
                </div>

                <span
                  className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border"
                  style={{
                    backgroundColor: sub.available ? tokens.accentSoftBg : tokens.canvas,
                    borderColor: tokens.borderSubtle,
                    color: sub.available ? tokens.accentPrimary : tokens.textMuted,
                  }}
                >
                  {sub.status}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold tracking-tight mb-1" style={{ color: tokens.textPrimary }}>
                {sub.name}
              </h3>

              <p className="text-xs font-mono font-semibold mb-2" style={{ color: tokens.accentPrimary }}>
                {sub.chaptersCount} Chapters / Units
              </p>

              <p className="text-xs leading-relaxed" style={{ color: tokens.textSecondary }}>
                {sub.description}
              </p>
            </div>

            <div
              className="mt-6 pt-3 border-t flex items-center justify-between text-xs font-semibold"
              style={{
                borderColor: tokens.borderSubtle,
                color: sub.available ? tokens.accentPrimary : tokens.textMuted,
              }}
            >
              <span>{sub.available ? 'Open Revision Vault' : 'Under Preparation'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
