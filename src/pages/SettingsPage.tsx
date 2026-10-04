import React, { useState } from 'react';
import { ColorTokens, ThemeMode, ThemePalette, ProgressBarStyle, AcademicClass } from '../types/theme';
import { PALETTES } from '../theme/themeConfig';
import { ProgressVisualizer } from '../components/ProgressVisualizer';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Moon,
  Sun,
  Check,
  Settings,
  Sparkles,
  Star,
  CircleDot,
  LayoutGrid,
  Minus,
  Palette,
  ShieldCheck,
  HardDrive,
  Heart,
  CloudOff,
  GraduationCap,
  BookOpen,
  Atom,
  User,
  X,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface SettingsPageProps {
  tokens: ColorTokens;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  themePalette: ThemePalette;
  setThemePalette: (palette: ThemePalette) => void;
  progressStyle: ProgressBarStyle;
  setProgressStyle: (style: ProgressBarStyle) => void;
  selectedClass: AcademicClass;
  setSelectedClass: (cls: AcademicClass) => void;
  userName: string;
  setUserName: (name: string) => void;
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  tokens,
  themeMode,
  setThemeMode,
  themePalette,
  setThemePalette,
  progressStyle,
  setProgressStyle,
  selectedClass,
  setSelectedClass,
  userName,
  setUserName,
  onBack,
}) => {
  const [timerDuration, setTimerDuration] = useState('25');
  const [demoPercentage, setDemoPercentage] = useState(72);
  const [nameInput, setNameInput] = useState(userName);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  // Confirmation modal state for changing academic class
  const [pendingClassChange, setPendingClassChange] = useState<AcademicClass | null>(null);
  const [isRelaunching, setIsRelaunching] = useState(false);

  const handleClassCardClick = (targetClass: AcademicClass) => {
    if (targetClass === selectedClass) return;
    setPendingClassChange(targetClass);
  };

  const handleCancelClassSwitch = () => {
    if (isRelaunching) return;
    setPendingClassChange(null);
  };

  const handleConfirmClassSwitch = () => {
    if (!pendingClassChange) return;
    const target = pendingClassChange;
    setIsRelaunching(true);
    try {
      localStorage.setItem('athenaeum_selected_class', target);
    } catch (e) {
      console.error('Failed to save selected class', e);
    }
    setSelectedClass(target);

    // Smooth relaunch: reset window scroll and reload cleanly from Home
    setTimeout(() => {
      window.scrollTo(0, 0);
      window.location.reload();
    }, 450);
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed) {
      setUserName(trimmed);
      setShowSavedFeedback(true);
      setTimeout(() => setShowSavedFeedback(false), 2200);
    }
  };

  const paletteList: { id: ThemePalette; name: string; tag: string; color: string; description: string }[] = [
    {
      id: 'nordic-sage',
      name: 'Nordic Sage & Alabaster',
      tag: 'Forest Calm',
      color: '#2D5A46',
      description: 'Serene botanical greens and warm linen tones. Peaceful for long study hours.',
    },
    {
      id: 'sakura-pink',
      name: 'Sakura & Rose Quartz',
      tag: 'Charming Pink',
      color: '#D44D7D',
      description: 'Soft blossom pink, warm rose quartz, and sweet strawberry accents. Made for girls who love aesthetic study vibes.',
    },
    {
      id: 'oxford-navy',
      name: 'Oxford Navy & Ivory',
      tag: 'Scholarly Ivy',
      color: '#1E3A8A',
      description: 'Deep Cambridge collegiate navy with warm ivory surfaces and gold accents.',
    },
    {
      id: 'warm-terracotta',
      name: 'Warm Terracotta & Sand',
      tag: 'Mediterranean Clay',
      color: '#C85A32',
      description: 'Sun-warmed terracotta, baked earth clay, and desert sand tones.',
    },
    {
      id: 'lavender-wisteria',
      name: 'Lavender Mist & Wisteria',
      tag: 'Dreamy Lilac',
      color: '#7C3AED',
      description: 'Calming wisteria purple and twilight lavender mist for relaxed evening focus.',
    },
    {
      id: 'slate-monochrome',
      name: 'Architectural Slate & Charcoal',
      tag: 'Minimal Graphite',
      color: '#475569',
      description: 'Distraction-free high-contrast neutral charcoal and crisp drawing paper.',
    },
  ];

  const styleOptions: {
    id: ProgressBarStyle;
    name: string;
    description: string;
    icon: React.ReactNode;
    tag: string;
  }[] = [
    {
      id: 'star',
      name: 'Constellation Star Trail 🌟',
      description: 'A shining star glides along the path to celebrate your progress.',
      icon: <Star className="w-4 h-4 text-amber-500 fill-current" />,
      tag: 'Favorite for Students',
    },
    {
      id: 'circular',
      name: 'Radial Halo Ring ⭕',
      description: 'A circular halo dial with the completion percentage in the center.',
      icon: <CircleDot className="w-4 h-4 text-emerald-600" />,
      tag: 'Minimal & Focus',
    },
    {
      id: 'segmented',
      name: 'Level-Up XP Blocks 🎮',
      description: 'Game-style modular XP blocks that light up as you complete topics.',
      icon: <LayoutGrid className="w-4 h-4 text-teal-600" />,
      tag: 'Gamified XP',
    },
    {
      id: 'pill',
      name: 'Curved Glow Capsule 💊',
      description: 'A rounded capsule with smooth interior shimmer animation.',
      icon: <Sparkles className="w-4 h-4 text-blue-500" />,
      tag: 'Soft & Modern',
    },
    {
      id: 'straight',
      name: 'Minimal Straight Line ➖',
      description: 'A sleek, clean line bar for quiet distraction-free focus.',
      icon: <Minus className="w-4 h-4 text-slate-600" />,
      tag: 'Classic',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
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
        className="rounded-2xl p-6 sm:p-8 border shadow-xs space-y-8"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderStrong,
        }}
      >
        <div>
          <span className="text-xs font-mono uppercase tracking-wider block opacity-75" style={{ color: tokens.accentPrimary }}>
            Personal Sanctuary Customization
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-1" style={{ color: tokens.textPrimary }}>
            Theme & Study Preferences
          </h2>
          <p className="text-xs sm:text-sm font-body mt-1" style={{ color: tokens.textSecondary }}>
            Update your name, switch between Class 9th and Class 11th, customize themes, and view data storage details.
          </p>
        </div>

        {/* 0A. USER PROFILE & NAME */}
        <div className="p-5 sm:p-6 rounded-2xl border space-y-3" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle }}>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" style={{ color: tokens.accentPrimary }} />
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold" style={{ color: tokens.textPrimary }}>
                User Profile & Name
              </h3>
              <p className="text-xs" style={{ color: tokens.textSecondary }}>
                Personalize your name across greetings, cards, and workspace logs.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row gap-2 pt-1 max-w-md">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name..."
              className="flex-1 min-h-[44px] px-3.5 rounded-xl border text-xs outline-none transition-colors"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
            <button
              type="submit"
              className="min-h-[44px] px-5 rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95 shrink-0"
              style={{
                backgroundColor: tokens.accentPrimary,
                color: tokens.accentText,
              }}
            >
              Save Name
            </button>
          </form>
          {showSavedFeedback && (
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ Name updated to &ldquo;{userName}&rdquo;!
            </p>
          )}
        </div>

        {/* 0B. ACADEMIC STANDARD / CLASS SWITCHER */}
        <div className="p-5 sm:p-6 rounded-2xl border space-y-4" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" style={{ color: tokens.accentPrimary }} />
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold" style={{ color: tokens.textPrimary }}>
                  Academic Standard / Class
                </h3>
                <p className="text-xs" style={{ color: tokens.textSecondary }}>
                  Switch your workspace between Class 9th and Class 11th.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono px-2.5 py-1 rounded-md border self-start sm:self-auto font-semibold" style={{ backgroundColor: tokens.surface, borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}>
              Active: Class {selectedClass}th
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Class 9 Option */}
            <div
              onClick={() => handleClassCardClick('9')}
              className="p-4 rounded-xl border cursor-pointer transition-all duration-150 flex flex-col justify-between gap-3 select-none hover:brightness-95 active:scale-[0.99]"
              style={{
                backgroundColor: tokens.surface,
                borderColor: selectedClass === '9' ? tokens.accentPrimary : tokens.borderSubtle,
                boxShadow: selectedClass === '9' ? `0 0 0 2px ${tokens.ringColor}` : 'none',
              }}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
                    <h4 className="text-sm font-bold font-serif" style={{ color: tokens.textPrimary }}>
                      Class 9th (CBSE)
                    </h4>
                  </div>

                  <div
                    className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                    style={{
                      borderColor: selectedClass === '9' ? tokens.accentPrimary : tokens.borderStrong,
                      backgroundColor: selectedClass === '9' ? tokens.accentPrimary : 'transparent',
                    }}
                  >
                    {selectedClass === '9' && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: tokens.textSecondary }}>
                  Curated CBSE Curriculum: Complete syllabus for Mathematics, Science, Social Science, Hindi, English & Computer with dedicated notes vault.
                </p>
              </div>

              <span
                className="self-start text-[10px] font-mono px-2 py-0.5 rounded font-semibold"
                style={{
                  backgroundColor: tokens.accentSoftBg,
                  color: tokens.accentPrimary,
                }}
              >
                Sister&apos;s Sanctuary
              </span>
            </div>

            {/* Class 11 Option */}
            <div
              onClick={() => handleClassCardClick('11')}
              className="p-4 rounded-xl border cursor-pointer transition-all duration-150 flex flex-col justify-between gap-3 select-none hover:brightness-95 active:scale-[0.99]"
              style={{
                backgroundColor: tokens.surface,
                borderColor: selectedClass === '11' ? tokens.accentPrimary : tokens.borderSubtle,
                boxShadow: selectedClass === '11' ? `0 0 0 2px ${tokens.ringColor}` : 'none',
              }}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Atom className="w-4 h-4" style={{ color: tokens.accentPrimary }} />
                    <h4 className="text-sm font-bold font-serif" style={{ color: tokens.textPrimary }}>
                      Class 11th (CBSE / ISC)
                    </h4>
                  </div>

                  <div
                    className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                    style={{
                      borderColor: selectedClass === '11' ? tokens.accentPrimary : tokens.borderStrong,
                      backgroundColor: selectedClass === '11' ? tokens.accentPrimary : 'transparent',
                    }}
                  >
                    {selectedClass === '11' && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: tokens.textSecondary }}>
                  Higher scholarship workspace: Physics, Chemistry, Mathematics, Biology, English Core & Computer Science (Python).
                </p>
              </div>

              <span
                className="self-start text-[10px] font-mono px-2 py-0.5 rounded font-semibold"
                style={{
                  backgroundColor: tokens.accentSoftBg,
                  color: tokens.accentPrimary,
                }}
              >
                Senior Secondary
              </span>
            </div>
          </div>
        </div>

        {/* 1. COLOR THEME PALETTE CHOOSER (Including Sakura Pink!) */}
        <div className="p-5 sm:p-6 rounded-2xl border space-y-4" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5" style={{ color: tokens.accentPrimary }} />
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold" style={{ color: tokens.textPrimary }}>
                  Color Theme Palette
                </h3>
                <p className="text-xs" style={{ color: tokens.textSecondary }}>
                  Choose your visual aesthetic (includes Sakura Pink for aesthetic vibes).
                </p>
              </div>
            </div>

            <span className="text-xs font-mono px-2.5 py-1 rounded-md border self-start sm:self-auto font-semibold" style={{ backgroundColor: tokens.surface, borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}>
              Active: {PALETTES[themePalette]?.name}
            </span>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {paletteList.map((p) => {
              const isSelected = themePalette === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setThemePalette(p.id)}
                  className="p-4 rounded-xl border cursor-pointer transition-all duration-150 flex flex-col justify-between gap-3 select-none hover:brightness-95 active:scale-[0.99]"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: isSelected ? tokens.accentPrimary : tokens.borderSubtle,
                    boxShadow: isSelected ? `0 0 0 2px ${tokens.ringColor}` : 'none',
                  }}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-4 h-4 rounded-full border shadow-xs shrink-0"
                          style={{ backgroundColor: p.color, borderColor: 'rgba(0,0,0,0.1)' }}
                        />
                        <h4 className="text-sm font-bold font-serif" style={{ color: tokens.textPrimary }}>
                          {p.name}
                        </h4>
                      </div>

                      <div
                        className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                        style={{
                          borderColor: isSelected ? tokens.accentPrimary : tokens.borderStrong,
                          backgroundColor: isSelected ? tokens.accentPrimary : 'transparent',
                        }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed" style={{ color: tokens.textSecondary }}>
                      {p.description}
                    </p>
                  </div>

                  <span
                    className="self-start text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: tokens.accentSoftBg,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. DAY / NIGHT LIGHTING MODE */}
        <div className="p-4 sm:p-5 rounded-xl border space-y-3" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle }}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold" style={{ color: tokens.textPrimary }}>
                Lighting Mode (Day / Night)
              </h4>
              <p className="text-xs" style={{ color: tokens.textSecondary }}>
                Switch between Bright Daylight and Deep Relaxing Night
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${themeMode === 'light' ? 'font-bold' : 'opacity-70'}`}
                style={{
                  backgroundColor: themeMode === 'light' ? tokens.surface : 'transparent',
                  borderColor: themeMode === 'light' ? tokens.accentPrimary : tokens.borderSubtle,
                  color: tokens.textPrimary,
                }}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Day Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${themeMode === 'dark' ? 'font-bold' : 'opacity-70'}`}
                style={{
                  backgroundColor: themeMode === 'dark' ? tokens.surface : 'transparent',
                  borderColor: themeMode === 'dark' ? tokens.accentPrimary : tokens.borderSubtle,
                  color: tokens.textPrimary,
                }}
              >
                <Moon className="w-3.5 h-3.5 text-pink-400" />
                <span>Night Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. PROGRESS BAR STYLE SELECTOR WITH INTERACTIVE DEMO */}
        <div className="p-5 sm:p-6 rounded-2xl border space-y-5" style={{ backgroundColor: tokens.canvas, borderColor: tokens.borderSubtle }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold" style={{ color: tokens.textPrimary }}>
                Progress Bar Visual Style
              </h3>
              <p className="text-xs" style={{ color: tokens.textSecondary }}>
                Choose how syllabus progress is rendered across the entire sanctuary.
              </p>
            </div>

            <span className="text-xs font-mono px-2 py-0.5 rounded border self-start sm:self-auto" style={{ backgroundColor: tokens.surface, borderColor: tokens.borderSubtle, color: tokens.accentPrimary }}>
              Active: {styleOptions.find((o) => o.id === progressStyle)?.name}
            </span>
          </div>

          {/* Interactive Live Demo */}
          <div
            className="p-5 rounded-xl border shadow-inner flex flex-col items-center justify-center space-y-3"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
            }}
          >
            <div className="w-full flex items-center justify-between text-xs font-mono pb-2 border-b" style={{ borderColor: tokens.borderSubtle }}>
              <span style={{ color: tokens.textMuted }}>Interactive Visual Test:</span>
              <div className="flex items-center gap-2">
                <span style={{ color: tokens.textSecondary }}>Percentage:</span>
                <span className="font-bold tabular-nums" style={{ color: tokens.accentPrimary }}>{demoPercentage}%</span>
              </div>
            </div>

            <div className="w-full max-w-md py-2 flex items-center justify-center">
              <ProgressVisualizer
                percentage={demoPercentage}
                tokens={tokens}
                style={progressStyle}
                size="lg"
              />
            </div>

            <div className="w-full max-w-xs flex items-center gap-3 pt-2">
              <span className="text-[10px] font-mono opacity-60">0%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={demoPercentage}
                onChange={(e) => setDemoPercentage(Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{ accentColor: tokens.accentPrimary }}
              />
              <span className="text-[10px] font-mono opacity-60">100%</span>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {styleOptions.map((opt) => {
              const isSelected = progressStyle === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setProgressStyle(opt.id)}
                  className="p-4 rounded-xl border cursor-pointer transition-all duration-150 flex flex-col justify-between gap-3 select-none hover:brightness-95 active:scale-[0.99]"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: isSelected ? tokens.accentPrimary : tokens.borderSubtle,
                    boxShadow: isSelected ? `0 0 0 2px ${tokens.ringColor}` : 'none',
                  }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {opt.icon}
                        <h4 className="text-xs sm:text-sm font-bold font-serif" style={{ color: tokens.textPrimary }}>
                          {opt.name}
                        </h4>
                      </div>

                      <div
                        className="w-4 h-4 rounded-full border flex items-center justify-center"
                        style={{
                          borderColor: isSelected ? tokens.accentPrimary : tokens.borderStrong,
                          backgroundColor: isSelected ? tokens.accentPrimary : 'transparent',
                        }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </div>
                    </div>

                    <p className="text-[11px] leading-relaxed" style={{ color: tokens.textSecondary }}>
                      {opt.description}
                    </p>
                  </div>

                  <span
                    className="self-start text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: tokens.accentSoftBg,
                      color: tokens.accentPrimary,
                    }}
                  >
                    {opt.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. WHERE IS DATA SAVED? (Transparent Privacy Card) */}
        <div
          className="p-5 sm:p-6 rounded-2xl border space-y-3"
          style={{
            backgroundColor: tokens.canvas,
            borderColor: tokens.borderStrong,
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider" style={{ color: tokens.accentPrimary }}>
            <HardDrive className="w-4 h-4" />
            <span>Data Storage & Offline Privacy</span>
          </div>

          <h4 className="text-base sm:text-lg font-serif font-bold" style={{ color: tokens.textPrimary }}>
            Where is your study data saved?
          </h4>

          <div className="space-y-2 text-xs sm:text-sm leading-relaxed" style={{ color: tokens.textSecondary }}>
            <p>
              <strong>100% Local Device Storage (`localStorage`):</strong> All of your data &mdash; including completed syllabus stages, daily priority planning, custom theme, and progress bar choices &mdash; is saved <strong>directly on this device</strong> inside the browser.
            </p>
            <p>
              ✨ <strong>Benefits of this setup:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Zero Cloud Tracking:</strong> Completely private; no personal data or student records are sent to external servers.</li>
              <li><strong>Instant & Offline Ready:</strong> Works seamlessly even without an active internet connection.</li>
              <li><strong>Permanent across reloads:</strong> Progress persists automatically whenever you open or refresh the page.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ACADEMIC CLASS SWITCH CONFIRMATION & RELAUNCH MODAL */}
      <AnimatePresence>
        {pendingClassChange && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelClassSwitch}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-3xl border p-6 sm:p-7 shadow-2xl space-y-5"
              style={{
                backgroundColor: tokens.surface,
                borderColor: tokens.borderStrong,
              }}
            >
              {isRelaunching ? (
                <div className="py-8 text-center space-y-4">
                  <div
                    className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center border animate-spin"
                    style={{
                      backgroundColor: tokens.canvas,
                      borderColor: tokens.borderStrong,
                      color: tokens.accentPrimary,
                    }}
                  >
                    <RefreshCw className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-xl" style={{ color: tokens.textPrimary }}>
                      Relaunching Workspace...
                    </h3>
                    <p className="text-xs sm:text-sm font-body" style={{ color: tokens.textSecondary }}>
                      Switching to Class {pendingClassChange}th and relaunching fresh from the Sanctuary Home.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0"
                        style={{
                          backgroundColor: tokens.canvas,
                          borderColor: tokens.borderStrong,
                          color: tokens.accentPrimary,
                        }}
                      >
                        {pendingClassChange === '11' ? (
                          <Atom className="w-6 h-6" />
                        ) : (
                          <BookOpen className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider block font-semibold" style={{ color: tokens.accentPrimary }}>
                          Academic Class Switch
                        </span>
                        <h3 className="text-lg sm:text-xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                          Switch to Class {pendingClassChange}th?
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={handleCancelClassSwitch}
                      className="p-1.5 rounded-xl border hover:opacity-75 transition-opacity"
                      style={{
                        backgroundColor: tokens.canvas,
                        borderColor: tokens.borderSubtle,
                        color: tokens.textSecondary,
                      }}
                      aria-label="Cancel class switch"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body explanation */}
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: tokens.textSecondary }}>
                      You are about to switch your active curriculum from <strong className="font-semibold" style={{ color: tokens.textPrimary }}>Class {selectedClass}th</strong> to <strong className="font-semibold" style={{ color: tokens.accentPrimary }}>Class {pendingClassChange}th ({pendingClassChange === '11' ? 'CBSE / ISC Senior Secondary' : 'CBSE Secondary'})</strong>.
                    </p>

                    {/* Guarantees Box */}
                    <div
                      className="p-4 rounded-2xl border space-y-2.5 text-xs font-body"
                      style={{
                        backgroundColor: tokens.canvas,
                        borderColor: tokens.borderSubtle,
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span style={{ color: tokens.textPrimary }}>
                          <strong>Independent Data Vault:</strong> Your Class {selectedClass}th syllabus progress, Error Book entries, and daily goals remain safely preserved in their own separate storage.
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <RefreshCw className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span style={{ color: tokens.textPrimary }}>
                          <strong>Clean Sanctuary Relaunch:</strong> Upon confirmation, the application will refresh and relaunch directly from the Home Dashboard with Class {pendingClassChange}th subjects and study rhythm active.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCancelClassSwitch}
                      className="px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-mono transition-opacity hover:opacity-80"
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
                      onClick={handleConfirmClassSwitch}
                      className="px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xs transition-all hover:brightness-95 active:scale-95 text-white"
                      style={{
                        backgroundColor: tokens.accentPrimary,
                        borderColor: tokens.borderStrong,
                      }}
                    >
                      <span>Confirm & Relaunch Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
