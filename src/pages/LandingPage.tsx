import React, { useState } from 'react';
import { ColorTokens, ActiveSection, AcademicClass } from '../types/theme';
import { getRandomQuote } from '../data/quotes';
import { AcademicSessionCountdown } from '../components/AcademicSessionCountdown';
import {
  BarChart3,
  Timer,
  CheckCircle2,
  BookMarked,
  Wind,
  Settings,
  Sparkles,
  RefreshCw,
  Heart,
  ChevronRight,
  BookmarkCheck,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  tokens: ColorTokens;
  userName?: string;
  selectedClass: AcademicClass;
  onSelectSection: (section: ActiveSection) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  tokens,
  userName,
  selectedClass,
  onSelectSection,
}) => {
  // Random motivational quote initialized on load
  const [quote, setQuote] = useState<string>(() => getRandomQuote());
  const [isRefreshingQuote, setIsRefreshingQuote] = useState(false);

  const handleRefreshQuote = () => {
    setIsRefreshingQuote(true);
    setTimeout(() => {
      setQuote(getRandomQuote());
      setIsRefreshingQuote(false);
    }, 180);
  };

  const portalOptions = [
    {
      id: 'syllabus' as ActiveSection,
      title: 'Syllabus & Progress Hub',
      description:
        selectedClass === '9'
          ? 'Track chapters and subtopics completion across Hindi, English, Maths, Science, SST & Computer.'
          : 'Track chapters and stages completion across Physics, Chemistry, Maths, Biology, English & Computer Science.',
      icon: <BarChart3 className="w-6 h-6" />,
      badge: 'Syllabus Hub',
      highlight: true,
    },
    {
      id: 'error-book' as ActiveSection,
      title: 'The Error Book',
      description:
        selectedClass === '9'
          ? 'Store weak questions, tricky formulas, and camera snaps of mistakes by chapter to master before exams.'
          : 'Store weak questions, tricky derivations, and numerical slips by chapter across Physics, Chemistry, Maths, Biology, English, Hindi & CS.',
      icon: <BookmarkCheck className="w-6 h-6" />,
      badge: selectedClass === '11' ? 'Class 11 Mistake Vault' : 'Mistake Vault',
      highlight: true,
    },
    {
      id: 'focus-timer' as ActiveSection,
      title: 'Focus Sanctuary & Timer',
      description: '25-minute study sprints with auto 5-minute break, celebratory party poppers, and soothing chime.',
      icon: <Timer className="w-6 h-6" />,
      badge: 'Deep Study',
      highlight: false,
    },
    {
      id: 'daily-goals' as ActiveSection,
      title: 'Today’s Priorities & Rhythm',
      description: `Select Class ${selectedClass}th subjects and pick topics from syllabus dropdowns. Track active and completed goals in separate tabs.`,
      icon: <CheckCircle2 className="w-6 h-6" />,
      badge: 'Daily Intent',
      highlight: false,
    },
    {
      id: 'notes-vault' as ActiveSection,
      title: 'Quick Revision & Notes Vault',
      description:
        selectedClass === '9'
          ? 'Key formulas, definitions, chapter summaries, and quick recall cards for Class 9.'
          : 'Key formulas, definitions, chapter summaries, and quick recall cards for Class 11.',
      icon: <BookMarked className="w-6 h-6" />,
      badge: 'Recall Deck',
      highlight: false,
    },
    {
      id: 'breathing' as ActiveSection,
      title: '2-Minute Breath & Reset',
      description: 'A gentle, guided breathing exercise to dissolve exam anxiety and refresh your mind.',
      icon: <Wind className="w-6 h-6" />,
      badge: 'Peace of Mind',
      highlight: false,
    },
    {
      id: 'settings' as ActiveSection,
      title: 'Settings & Preferences',
      description: 'Switch between Class 9th & 11th, choose aesthetic themes, and adjust study styles.',
      icon: <Settings className="w-6 h-6" />,
      badge: 'Customization',
      highlight: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 sm:space-y-14 py-4 sm:py-8">
      {/* 1. Serene Greeting Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: tokens.accentPrimary }}>
          {selectedClass === '9' ? <Heart className="w-3.5 h-3.5 fill-current" /> : <GraduationCap className="w-3.5 h-3.5" />}
          <span>
            {selectedClass === '9'
              ? 'Your Quiet Academic Sanctuary · Class 9th'
              : 'Senior Academic Sanctuary · Class 11th'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight"
            style={{ color: tokens.textPrimary }}
          >
            Hi, {userName || 'Scholar'}
          </h1>

          <span className="text-xs sm:text-sm font-body opacity-75" style={{ color: tokens.textSecondary }}>
            Today · Keep your mind calm & steady
          </span>
        </div>

        <p className="text-base sm:text-lg font-body leading-relaxed max-w-2xl" style={{ color: tokens.textSecondary }}>
          Everything you need for your Class {selectedClass}th studies is prepared. Take a deep breath,
          choose what you would like to work on today, and go at your own pace.
        </p>
      </section>

      {/* 2. Inspiring Motivational Quote Card (Removed 'One of the 250+...' text) */}
      <section
        className="rounded-2xl p-6 sm:p-7 border relative shadow-xs transition-all duration-300"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderStrong,
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider" style={{ color: tokens.accentPrimary }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thought for Today</span>
          </div>

          <button
            onClick={handleRefreshQuote}
            className="p-1.5 rounded-lg border transition-all hover:brightness-95 active:scale-95 flex items-center gap-1.5 text-xs font-medium"
            style={{
              backgroundColor: tokens.canvas,
              borderColor: tokens.borderSubtle,
              color: tokens.textSecondary,
            }}
            title="Read another quote"
            aria-label="New motivational quote"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingQuote ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">New Quote</span>
          </button>
        </div>

        {/* The Quote itself */}
        <p
          className="text-lg sm:text-xl font-serif italic leading-relaxed"
          style={{ color: tokens.textPrimary }}
        >
          &ldquo;{quote}&rdquo;
        </p>

        <div className="mt-4 pt-3 border-t flex items-center justify-end text-xs" style={{ borderColor: tokens.borderSubtle }}>
          <span className="font-semibold" style={{ color: tokens.accentPrimary }}>Believe in yourself ✨</span>
        </div>
      </section>

      {/* 2.5 Calm Academic Horizon & Session Countdown Widget */}
      <AcademicSessionCountdown tokens={tokens} />

      {/* 3. The 5 to 6 Major Option Cards (Removed '6 options available' text) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider" style={{ color: tokens.textMuted }}>
            Choose an area to explore
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {portalOptions.map((opt) => (
            <motion.div
              key={opt.id}
              whileHover={{ y: -3, scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.15 }}
              onClick={() => onSelectSection(opt.id)}
              className="group rounded-2xl p-6 border cursor-pointer transition-all duration-200 flex flex-col justify-between select-none shadow-xs hover:shadow-md"
              style={{
                backgroundColor: tokens.surface,
                borderColor: opt.highlight ? tokens.accentPrimary : tokens.borderSubtle,
                boxShadow: opt.highlight ? `0 0 0 1px ${tokens.ringColor}` : 'none',
              }}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200 group-hover:scale-105"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderStrong,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {opt.icon}
                  </div>

                  <span
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border"
                    style={{
                      backgroundColor: tokens.accentSoftBg,
                      borderColor: tokens.borderSubtle,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {opt.badge}
                  </span>
                </div>

                <h2
                  className="text-xl font-serif font-bold tracking-tight mb-2 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors"
                  style={{ color: tokens.textPrimary }}
                >
                  {opt.title}
                </h2>

                <p
                  className="text-xs sm:text-sm font-body leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  {opt.description}
                </p>
              </div>

              <div
                className="mt-6 pt-3 border-t flex items-center justify-between text-xs font-medium"
                style={{ borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}
              >
                <span>Enter section</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Relaxing Footer Encouragement */}
      <section className="text-center pt-4">
        <p className="text-xs sm:text-sm font-serif italic" style={{ color: tokens.textMuted }}>
          &ldquo;Remember, learning is not a race. Calm and steady always wins.&rdquo;
        </p>
      </section>
    </div>
  );
};
