import React, { useState } from 'react';
import { ColorTokens, ProgressBarStyle, AcademicClass } from '../types/theme';
import { SyllabusSubject, SyllabusChapter, SyllabusStage, calculateSyllabusStats } from '../data/class9Syllabus';
import { getRandomFunnyPhrase } from '../data/funnyPhrases';
import { ProgressVisualizer } from '../components/ProgressVisualizer';
import {
  ArrowLeft,
  Target,
  Calculator,
  Atom,
  BookOpen,
  Globe,
  Feather,
  Laptop,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Smile,
  Flame,
  Laugh,
  FlaskConical,
  Dna,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SyllabusHubPageProps {
  tokens: ColorTokens;
  syllabus: SyllabusSubject[];
  progressStyle: ProgressBarStyle;
  selectedClass?: AcademicClass;
  onCompleteStage: (subjectId: string, chapterId: string, stageId: string) => void;
  onReopenStage: (subjectId: string, chapterId: string, stageId: string) => void;
  onBack: () => void;
}

interface PendingConfirmation {
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  stageId: string;
  stageName: string;
  phrase: string;
}

export const SyllabusHubPage: React.FC<SyllabusHubPageProps> = ({
  tokens,
  syllabus,
  progressStyle,
  selectedClass = '9',
  onCompleteStage,
  onReopenStage,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'completed'>('syllabus');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => syllabus[0]?.id || 'maths');
  const [expandedChapterIds, setExpandedChapterIds] = useState<Record<string, boolean>>({
    'math-ch-9': true,
    'sst-ch-1': true,
    'sci-ch-1': true,
    'eng-ch-1': true,
    'hin-ch-1': true,
    'comp-ch-1': true,
    'phy-ch-1': true,
    'chem-ch-1': true,
    'm11-ch-1': true,
    'bio-ch-1': true,
    'eng11-ch-1': true,
    'cs11-ch-1': true,
  });

  // Funny confirmation modal state
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirmation | null>(null);

  const stats = calculateSyllabusStats(syllabus);
  const activeSubject = syllabus.find((s) => s.id === selectedSubjectId) || syllabus[0] || {
    id: 'empty',
    name: 'No Subject',
    shortCode: 'NONE',
    chapters: [],
  };

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'maths':
        return <Calculator className="w-5 h-5" />;
      case 'science':
        return <Atom className="w-5 h-5" />;
      case 'physics':
        return <Atom className="w-5 h-5" />;
      case 'chemistry':
        return <FlaskConical className="w-5 h-5" />;
      case 'biology':
        return <Dna className="w-5 h-5" />;
      case 'english':
        return <BookOpen className="w-5 h-5" />;
      case 'sst':
        return <Globe className="w-5 h-5" />;
      case 'hindi':
        return <Feather className="w-5 h-5" />;
      case 'computer':
      case 'cs':
        return <Laptop className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // When student clicks a stage checkbox, open the funny confirmation modal
  const handleStageClick = (
    subject: SyllabusSubject,
    chapter: SyllabusChapter,
    stage: SyllabusStage
  ) => {
    if (stage.completed) return; // Already completed, handled in completed tab
    setPendingConfirm({
      subjectId: subject.id,
      subjectName: subject.name,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      stageId: stage.id,
      stageName: stage.name,
      phrase: getRandomFunnyPhrase(),
    });
  };

  const confirmCompletion = () => {
    if (!pendingConfirm) return;
    onCompleteStage(
      pendingConfirm.subjectId,
      pendingConfirm.chapterId,
      pendingConfirm.stageId
    );
    setPendingConfirm(null);
  };

  // Gather all completed stages across all subjects for the 'Completed' tab
  const allCompletedStages: {
    subjectId: string;
    subjectName: string;
    chapterId: string;
    chapterTitle: string;
    stage: SyllabusStage;
  }[] = [];

  syllabus.forEach((sub) => {
    sub.chapters.forEach((ch) => {
      ch.stages.forEach((st) => {
        if (st.completed) {
          allCompletedStages.push({
            subjectId: sub.id,
            subjectName: sub.name,
            chapterId: ch.id,
            chapterTitle: ch.title,
            stage: st,
          });
        }
      });
    });
  });

  return (
    <div className="space-y-8 sm:space-y-10 py-4 max-w-5xl mx-auto">
      {/* 1. Top Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
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

        <span className="text-xs font-mono font-medium" style={{ color: tokens.textMuted }}>
          Class {selectedClass}th Master Curriculum Tracker
        </span>
      </div>

      {/* 2. Overall Progress Section */}
      <section
        className="rounded-2xl p-6 sm:p-8 border shadow-xs space-y-4"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderStrong,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-1" style={{ color: tokens.accentPrimary }}>
              <Target className="w-3.5 h-3.5" />
              <span>Overall Curriculum Completion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
              Master Syllabus Progress
            </h2>
            <p className="text-xs sm:text-sm font-body mt-1" style={{ color: tokens.textSecondary }}>
              Comprehensive stage-wise completion across all {syllabus.length} Class {selectedClass}th subjects.
            </p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-serif font-bold tabular-nums" style={{ color: tokens.accentPrimary }}>
              {stats.overallPercentage.toFixed(2)}%
            </span>
            <span className="text-xs font-mono uppercase" style={{ color: tokens.textMuted }}>
              Finished
            </span>
          </div>
        </div>

        {/* Master Progress Bar */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-mono" style={{ color: tokens.textSecondary }}>
            <span>{stats.completedStages} of {stats.totalStages} Stages Completed</span>
            <span>{stats.totalStages - stats.completedStages} Stages Remaining</span>
          </div>

          <ProgressVisualizer
            percentage={stats.overallPercentage}
            tokens={tokens}
            style={progressStyle}
            size="lg"
          />
        </div>
      </section>

      {/* 3. Subject-Wise Progress Bars (6 Cards at a Glance) */}
      <section className="space-y-3">
        <h3 className="text-lg font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
          Subject-Wise Progress
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.subjectStats.map((subStat) => {
            const isSelected = selectedSubjectId === subStat.id && activeTab === 'syllabus';
            return (
              <button
                key={subStat.id}
                onClick={() => {
                  setSelectedSubjectId(subStat.id);
                  setActiveTab('syllabus');
                }}
                className="p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all active:scale-95 group"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: isSelected ? tokens.accentPrimary : tokens.borderSubtle,
                  boxShadow: isSelected ? `0 0 0 2px ${tokens.ringColor}` : 'none',
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="p-1.5 rounded-lg border"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderSubtle,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {getSubjectIcon(subStat.id)}
                  </div>
                  <span className="text-xs font-serif font-bold tabular-nums" style={{ color: tokens.accentPrimary }}>
                    {subStat.percentage.toFixed(2)}%
                  </span>
                </div>

                <div>
                  <span className="text-xs font-serif font-semibold block truncate" style={{ color: tokens.textPrimary }}>
                    {subStat.shortCode}
                  </span>
                  <span className="text-[10px] block opacity-70 truncate font-mono" style={{ color: tokens.textMuted }}>
                    {subStat.completedStages}/{subStat.totalStages} stages
                  </span>
                </div>

                {/* Micro progress bar */}
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: tokens.progressBarBg }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${subStat.percentage}%`,
                      backgroundColor: tokens.accentPrimary,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Two Major Tabs: "Syllabus & Stages" vs "Completed" */}
      <section className="space-y-6">
        <div
          className="flex items-center p-1 rounded-xl border text-xs font-medium w-full sm:w-auto inline-flex"
          style={{
            backgroundColor: tokens.canvas,
            borderColor: tokens.borderSubtle,
          }}
        >
          <button
            onClick={() => setActiveTab('syllabus')}
            className="px-5 py-2.5 rounded-lg transition-all flex items-center gap-2"
            style={{
              backgroundColor: activeTab === 'syllabus' ? tokens.surface : 'transparent',
              color: activeTab === 'syllabus' ? tokens.textPrimary : tokens.textSecondary,
              fontWeight: activeTab === 'syllabus' ? 700 : 500,
              boxShadow: activeTab === 'syllabus' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            <BookOpen className="w-4 h-4" />
            <span>Syllabus & Stages</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className="px-5 py-2.5 rounded-lg transition-all flex items-center gap-2"
            style={{
              backgroundColor: activeTab === 'completed' ? tokens.surface : 'transparent',
              color: activeTab === 'completed' ? tokens.textPrimary : tokens.textSecondary,
              fontWeight: activeTab === 'completed' ? 700 : 500,
              boxShadow: activeTab === 'completed' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed Stages</span>
            <span
              className="px-2 py-0.5 text-[10px] rounded-full font-mono font-bold"
              style={{
                backgroundColor: tokens.accentSoftBg,
                color: tokens.accentPrimary,
              }}
            >
              {allCompletedStages.length}
            </span>
          </button>
        </div>

        {/* TAB 1: SYLLABUS & ACTIVE STAGES */}
        {activeTab === 'syllabus' && (
          <div
            className="rounded-2xl p-6 sm:p-8 border shadow-xs space-y-6"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderSubtle,
            }}
          >
            {/* Subject Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: tokens.borderSubtle }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: tokens.canvas,
                    borderColor: tokens.borderStrong,
                    color: tokens.accentPrimary,
                  }}
                >
                  {getSubjectIcon(activeSubject.id)}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold" style={{ color: tokens.accentPrimary }}>
                    <span>{activeSubject.shortCode}</span>
                    {activeSubject.hindiName && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{activeSubject.hindiName}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                    {activeSubject.name}
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono block opacity-70" style={{ color: tokens.textMuted }}>
                  Chapters Enrolled
                </span>
                <span className="text-xl sm:text-2xl font-serif font-bold tabular-nums" style={{ color: tokens.accentPrimary }}>
                  {activeSubject.chapters.length} Chapters
                </span>
              </div>
            </div>

            {/* Instruction callout */}
            <p className="text-xs sm:text-sm font-body" style={{ color: tokens.textSecondary }}>
              Click on any chapter below to expand its stages (Theory, Intext Questions, Exercises, Examples).
              Tick any completed stage to verify and send it to the <strong>Completed</strong> tab.
            </p>

            {/* Chapters Accordion List */}
            <div className="space-y-4">
              {activeSubject.chapters.map((ch) => {
                const isExpanded = !!expandedChapterIds[ch.id];
                const totalStages = ch.stages.length;
                const completedInChapter = ch.stages.filter((s) => s.completed).length;
                const isChapterComplete = totalStages > 0 && completedInChapter === totalStages;

                return (
                  <div
                    key={ch.id}
                    className="rounded-xl border transition-all overflow-hidden"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderSubtle,
                    }}
                  >
                    {/* Chapter Header */}
                    <div
                      onClick={() => toggleChapter(ch.id)}
                      className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:brightness-[0.99] select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            backgroundColor: isChapterComplete ? '#10B981' : tokens.accentPrimary,
                          }}
                        />
                        <h4
                          className="text-sm sm:text-base font-serif font-bold"
                          style={{ color: tokens.textPrimary }}
                        >
                          {ch.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono" style={{ color: tokens.textMuted }}>
                          {completedInChapter} / {totalStages} Stages
                        </span>
                        <div
                          className="p-1 rounded-md border"
                          style={{
                            backgroundColor: tokens.surface,
                            borderColor: tokens.borderSubtle,
                            color: tokens.textSecondary,
                          }}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Stages List */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="px-4 pb-4 pt-1 space-y-2 border-t"
                          style={{ borderColor: tokens.borderSubtle }}
                        >
                          {ch.stages.map((st) => (
                            <div
                              key={st.id}
                              onClick={() => {
                                if (!st.completed) {
                                  handleStageClick(activeSubject, ch, st);
                                }
                              }}
                              className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors ${
                                st.completed
                                  ? 'opacity-60 bg-emerald-50/20 border-emerald-300'
                                  : 'cursor-pointer hover:brightness-95'
                              }`}
                              style={{
                                backgroundColor: st.completed ? tokens.surface : tokens.surface,
                                borderColor: st.completed ? tokens.accentPrimary : tokens.borderSubtle,
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  className="w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0"
                                  style={{
                                    backgroundColor: st.completed ? tokens.accentPrimary : 'transparent',
                                    borderColor: st.completed ? tokens.accentPrimary : tokens.borderStrong,
                                    color: tokens.accentText,
                                  }}
                                >
                                  {st.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </button>
                                <span
                                  className={`text-xs sm:text-sm font-medium ${st.completed ? 'line-through' : ''}`}
                                  style={{ color: tokens.textPrimary }}
                                >
                                  {st.name}
                                </span>
                              </div>

                              <span
                                className="text-[11px] font-mono shrink-0"
                                style={{
                                  color: st.completed ? tokens.accentPrimary : tokens.textMuted,
                                }}
                              >
                                {st.completed ? 'Completed ✨' : 'Click to Complete'}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: COMPLETED STAGES */}
        {activeTab === 'completed' && (
          <div
            className="rounded-2xl p-6 sm:p-8 border shadow-xs space-y-6"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderSubtle,
            }}
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-wider block opacity-75" style={{ color: tokens.accentPrimary }}>
                Hall of Accomplishment
              </span>
              <h3 className="text-2xl font-serif font-bold tracking-tight mt-1" style={{ color: tokens.textPrimary }}>
                Completed Stages & Tasks
              </h3>
              <p className="text-xs sm:text-sm font-body mt-1" style={{ color: tokens.textSecondary }}>
                Every single milestone you have completed is tracked here. You can reopen any stage if needed.
              </p>
            </div>

            {allCompletedStages.length > 0 ? (
              <div className="space-y-3">
                {allCompletedStages.map((item) => (
                  <div
                    key={`${item.subjectId}-${item.chapterId}-${item.stage.id}`}
                    className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderSubtle,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: tokens.accentPrimary,
                          color: tokens.accentText,
                        }}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold" style={{ color: tokens.accentPrimary }}>
                          <span>{item.subjectName.toUpperCase()}</span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate max-w-[200px]">{item.chapterTitle}</span>
                        </div>
                        <h4 className="text-sm font-semibold" style={{ color: tokens.textPrimary }}>
                          {item.stage.name}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <span className="text-[11px] font-mono" style={{ color: tokens.textMuted }}>
                        {item.stage.completedAt || 'Completed'}
                      </span>
                      <button
                        onClick={() => onReopenStage(item.subjectId, item.chapterId, item.stage.id)}
                        className="p-1.5 rounded-lg border text-xs font-mono transition-all hover:brightness-95 flex items-center gap-1"
                        style={{
                          backgroundColor: tokens.surface,
                          borderColor: tokens.borderSubtle,
                          color: tokens.textSecondary,
                        }}
                        title="Reopen stage"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span className="text-[11px]">Reopen</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="p-10 rounded-xl border text-center space-y-2"
                style={{
                  backgroundColor: tokens.canvas,
                  borderColor: tokens.borderSubtle,
                }}
              >
                <Sparkles className="w-7 h-7 mx-auto text-emerald-600" />
                <h4 className="text-base font-serif font-bold" style={{ color: tokens.textPrimary }}>
                  No completed stages yet
                </h4>
                <p className="text-xs max-w-sm mx-auto" style={{ color: tokens.textSecondary }}>
                  Go to the <strong>Syllabus & Stages</strong> tab, select your chapter, and tick your first completed stage!
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 5. Funny Engaging Confirmation Modal (100+ Funny Desi Quotes) */}
      <AnimatePresence>
        {pendingConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md w-full rounded-2xl p-6 sm:p-7 border shadow-2xl space-y-5"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderStrong,
              }}
            >
              {/* Header Icon */}
              <div className="flex items-center justify-between">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    borderColor: tokens.borderSubtle,
                    color: tokens.accentPrimary,
                  }}
                >
                  <Laugh className="w-6 h-6" />
                </div>

                <span className="text-[11px] font-mono px-2.5 py-1 rounded-md border font-semibold" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}>
                  {pendingConfirm.subjectName}
                </span>
              </div>

              {/* Funny Brother Confirmation Phrase */}
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-serif font-bold tracking-tight leading-snug" style={{ color: tokens.textPrimary }}>
                  &ldquo;{pendingConfirm.phrase}&rdquo;
                </h4>

                <p className="text-xs sm:text-sm font-body leading-relaxed pt-1" style={{ color: tokens.textSecondary }}>
                  क्या आप <strong>{pendingConfirm.stageName}</strong> ({pendingConfirm.chapterTitle}) को पूरा मार्क करके <strong>Completed</strong> में भेजना चाहती हैं?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setPendingConfirm(null)}
                  className="w-full sm:w-auto min-h-[44px] px-4 py-2 text-xs font-medium rounded-xl border transition-all hover:brightness-95 active:scale-95"
                  style={{
                    backgroundColor: tokens.canvas,
                    borderColor: tokens.borderStrong,
                    color: tokens.textSecondary,
                  }}
                >
                  रुक जाओ, दोबारा देखती हूँ (Cancel)
                </button>

                <button
                  type="button"
                  onClick={confirmCompletion}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  style={{
                    backgroundColor: tokens.accentPrimary,
                    color: tokens.accentText,
                  }}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>हाँ सच में हो गया! (Confirm)</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
