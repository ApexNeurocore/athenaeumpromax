import React, { useState, useEffect } from 'react';
import { ColorTokens, AcademicClass } from '../types/theme';
import { CLASS_9_SYLLABUS, SyllabusSubject } from '../data/class9Syllabus';
import { CLASS_11_SYLLABUS } from '../data/class11Syllabus';
import {
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  BookOpen,
  Layers,
  ListTodo
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DailyGoalsPageProps {
  tokens: ColorTokens;
  selectedClass?: AcademicClass;
  syllabus?: SyllabusSubject[];
  onBack: () => void;
}

interface GoalItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  chapterTitle: string;
  stageName: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

export const DailyGoalsPage: React.FC<DailyGoalsPageProps> = ({
  tokens,
  selectedClass = '9',
  syllabus,
  onBack,
}) => {
  const activeSyllabus = syllabus && syllabus.length > 0
    ? syllabus
    : (selectedClass === '11' ? CLASS_11_SYLLABUS : CLASS_9_SYLLABUS);

  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  // Step 1: Selected Subject
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => activeSyllabus[0]?.id || 'physics');

  // Current Subject
  const activeSubject = activeSyllabus.find((s) => s.id === selectedSubjectId) || activeSyllabus[0];

  // Step 2: Selected Chapter
  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => activeSubject?.chapters[0]?.id || '');

  // Current Chapter
  const activeChapter = activeSubject?.chapters.find((c) => c.id === selectedChapterId) || activeSubject?.chapters[0];

  // Step 3: Selected Stage
  const [selectedStageId, setSelectedStageId] = useState<string>(() => activeChapter?.stages[0]?.id || '');

  // When subject changes, reset chapter and stage
  const handleSelectSubject = (subId: string) => {
    setSelectedSubjectId(subId);
    const sub = activeSyllabus.find((s) => s.id === subId);
    if (sub && sub.chapters.length > 0) {
      const firstCh = sub.chapters[0];
      setSelectedChapterId(firstCh.id);
      if (firstCh.stages.length > 0) {
        setSelectedStageId(firstCh.stages[0].id);
      }
    }
  };

  // When chapter changes, reset stage
  const handleSelectChapter = (chId: string) => {
    setSelectedChapterId(chId);
    const ch = activeSubject?.chapters.find((c) => c.id === chId);
    if (ch && ch.stages.length > 0) {
      setSelectedStageId(ch.stages[0].id);
    }
  };

  // Sync if syllabus changes
  useEffect(() => {
    if (!activeSyllabus.some((s) => s.id === selectedSubjectId)) {
      handleSelectSubject(activeSyllabus[0]?.id || '');
    }
  }, [activeSyllabus, selectedSubjectId]);

  const storageKey = selectedClass === '11' ? 'athenaeum_daily_planning_goals_11' : 'athenaeum_daily_planning_goals_9';

  // Daily goals state (empty by default, strictly user-selected)
  const [goals, setGoals] = useState<GoalItem[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Reload when switching selectedClass
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setGoals(JSON.parse(saved));
        return;
      }
      setGoals([]);
    } catch {
      setGoals([]);
    }
  }, [selectedClass, storageKey]);

  // Persist daily goals
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(goals));
  }, [goals, storageKey]);

  // Add new Goal
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubject || !activeChapter) return;

    const matchedStage = activeChapter.stages.find((s) => s.id === selectedStageId) || activeChapter.stages[0];
    if (!matchedStage) return;

    const newGoal: GoalItem = {
      id: Date.now().toString(),
      subjectCode: activeSubject.shortCode,
      subjectName: activeSubject.name,
      chapterTitle: activeChapter.title,
      stageName: matchedStage.name,
      title: `${activeChapter.title} — ${matchedStage.name}`,
      completed: false,
    };

    setGoals([newGoal, ...goals]);
  };

  // Toggle goal completion
  const handleToggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const willComplete = !g.completed;
        return {
          ...g,
          completed: willComplete,
          completedAt: willComplete
            ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            : undefined,
        };
      })
    );
  };

  // Delete goal
  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const activeGoals = goals.filter((g) => !g.completed);
  const completedGoals = goals.filter((g) => g.completed);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
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

      {/* Main Container */}
      <div
        className="rounded-2xl p-6 sm:p-8 border shadow-xs space-y-7"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderStrong,
        }}
      >
        <div>
          <span className="text-xs font-mono uppercase tracking-wider block opacity-75" style={{ color: tokens.accentPrimary }}>
            Class {selectedClass}th · Daily Study Planning
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-1" style={{ color: tokens.textPrimary }}>
            Today&apos;s Priorities & Rhythm
          </h2>
          <p className="text-xs sm:text-sm font-body mt-1" style={{ color: tokens.textSecondary }}>
            Choose your subject, pick the chapter, and select the specific stage you are conquering today.
          </p>
        </div>

        {/* 3-STEP SELECTION FORM */}
        <form onSubmit={handleAddGoal} className="space-y-5 p-5 rounded-2xl border" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle }}>
          {/* STEP 1: Select Subject */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: tokens.accentPrimary }}>
              Step 1: Choose Subject
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {activeSyllabus.map((sub) => {
                const isSelected = selectedSubjectId === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleSelectSubject(sub.id)}
                    className="min-h-[44px] px-2 py-2 rounded-xl border text-xs font-bold font-mono transition-all active:scale-95 text-center flex flex-col items-center justify-center select-none"
                    style={{
                      backgroundColor: isSelected ? tokens.accentPrimary : tokens.surface,
                      borderColor: isSelected ? tokens.accentPrimary : tokens.borderSubtle,
                      color: isSelected ? tokens.accentText : tokens.textPrimary,
                      boxShadow: isSelected ? `0 0 0 1px ${tokens.ringColor}` : 'none',
                    }}
                  >
                    <span>{sub.shortCode}</span>
                    <span className="text-[10px] font-normal opacity-80 truncate max-w-[85px]">
                      {sub.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Select Chapter */}
          {activeSubject && activeSubject.chapters.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: tokens.accentPrimary }}>
                Step 2: Choose Chapter ({activeSubject.name})
              </label>
              <div className="relative">
                <select
                  value={selectedChapterId}
                  onChange={(e) => handleSelectChapter(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 py-2 rounded-xl border text-xs font-medium outline-none cursor-pointer appearance-none transition-colors"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.borderStrong,
                    color: tokens.textPrimary,
                  }}
                >
                  {activeSubject.chapters.map((ch, idx) => (
                    <option key={ch.id} value={ch.id}>
                      {ch.number ? `Ch ${ch.number}: ` : `Unit ${idx + 1}: `} {ch.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3" style={{ color: tokens.textMuted }}>
                  <Layers className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Select Stage */}
          {activeChapter && activeChapter.stages.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: tokens.accentPrimary }}>
                Step 3: Choose Stage to Target
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activeChapter.stages.map((st) => {
                  const isSelected = selectedStageId === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStageId(st.id)}
                      className="min-h-[42px] px-3 py-2 rounded-xl border text-xs font-semibold transition-all active:scale-95 text-center flex items-center justify-center gap-1.5 select-none"
                      style={{
                        backgroundColor: isSelected ? tokens.accentPrimary : tokens.surface,
                        borderColor: isSelected ? tokens.accentPrimary : tokens.borderSubtle,
                        color: isSelected ? tokens.accentText : tokens.textPrimary,
                        boxShadow: isSelected ? `0 0 0 1px ${tokens.ringColor}` : 'none',
                      }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span>{st.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add Goal Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full min-h-[46px] px-6 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{
                backgroundColor: tokens.accentPrimary,
                color: tokens.accentText,
              }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add to Today&apos;s Priorities</span>
            </button>
          </div>
        </form>

        {/* TABS: Active Priorities vs Completed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: tokens.borderSubtle }}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('active')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'active' ? 'shadow-xs' : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: activeTab === 'active' ? tokens.canvas : 'transparent',
                  color: tokens.textPrimary,
                }}
              >
                Active Priorities ({activeGoals.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('completed')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'completed' ? 'shadow-xs' : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: activeTab === 'completed' ? tokens.canvas : 'transparent',
                  color: tokens.textPrimary,
                }}
              >
                Completed ({completedGoals.length})
              </button>
            </div>

            <span className="text-[11px] font-mono" style={{ color: tokens.textMuted }}>
              Total: {goals.length}
            </span>
          </div>

          {/* GOALS LIST */}
          <div className="space-y-2.5">
            <AnimatePresence mode="popLayout">
              {activeTab === 'active' && activeGoals.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 px-4 text-center rounded-2xl border border-dashed flex flex-col items-center justify-center space-y-2"
                  style={{ borderColor: tokens.borderSubtle }}
                >
                  <ListTodo className="w-8 h-8 opacity-40" style={{ color: tokens.accentPrimary }} />
                  <p className="text-sm font-serif font-bold" style={{ color: tokens.textPrimary }}>
                    No active priorities set today
                  </p>
                  <p className="text-xs font-body max-w-sm" style={{ color: tokens.textSecondary }}>
                    Select a subject, chapter, and stage above to add your first priority for today.
                  </p>
                </motion.div>
              )}

              {activeTab === 'completed' && completedGoals.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 px-4 text-center rounded-2xl border border-dashed flex flex-col items-center justify-center space-y-2"
                  style={{ borderColor: tokens.borderSubtle }}
                >
                  <CheckCircle2 className="w-8 h-8 opacity-40" style={{ color: tokens.accentPrimary }} />
                  <p className="text-sm font-serif font-bold" style={{ color: tokens.textPrimary }}>
                    No completed tasks yet
                  </p>
                  <p className="text-xs font-body" style={{ color: tokens.textSecondary }}>
                    Tick off your active priorities as you finish your study sessions!
                  </p>
                </motion.div>
              )}

              {(activeTab === 'active' ? activeGoals : completedGoals).map((g) => (
                <motion.div
                  key={g.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-xl border flex items-center justify-between gap-3 shadow-xs transition-colors"
                  style={{
                    backgroundColor: tokens.canvas,
                    borderColor: tokens.borderSubtle,
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => handleToggleGoal(g.id)}
                      className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                      style={{
                        borderColor: g.completed ? tokens.accentPrimary : tokens.borderStrong,
                        backgroundColor: g.completed ? tokens.accentPrimary : 'transparent',
                      }}
                      aria-label={g.completed ? 'Mark incomplete' : 'Mark completed'}
                    >
                      {g.completed && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: tokens.surface,
                            borderColor: tokens.borderSubtle,
                            color: tokens.accentPrimary,
                          }}
                        >
                          {g.subjectCode}
                        </span>
                        <span className="text-[10px] font-mono" style={{ color: tokens.textMuted }}>
                          {g.stageName}
                        </span>
                      </div>
                      <p
                        className={`text-xs font-medium mt-1 truncate ${
                          g.completed ? 'line-through opacity-60' : ''
                        }`}
                        style={{ color: tokens.textPrimary }}
                      >
                        {g.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {g.completedAt && (
                      <span className="text-[10px] font-mono opacity-60 hidden sm:inline" style={{ color: tokens.textMuted }}>
                        {g.completedAt}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteGoal(g.id)}
                      className="p-1.5 rounded-lg opacity-40 hover:opacity-100 hover:text-red-500 transition-opacity"
                      title="Delete priority"
                      aria-label="Delete priority"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
