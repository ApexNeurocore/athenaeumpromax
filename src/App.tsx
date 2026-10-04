import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode, ActiveSection, ProgressBarStyle, ThemePalette, AcademicClass } from './types/theme';
import { getTokens } from './theme/themeConfig';
import { CLASS_9_SYLLABUS, SyllabusSubject, calculateSyllabusStats } from './data/class9Syllabus';
import { CLASS_11_SYLLABUS } from './data/class11Syllabus';
import { Navigation } from './components/Navigation';
import { SplashLoader } from './components/SplashLoader';
import { ClassSelectionModal } from './components/ClassSelectionModal';
import { LandingPage } from './pages/LandingPage';
import { SyllabusHubPage } from './pages/SyllabusHubPage';
import { FocusTimerPage } from './pages/FocusTimerPage';
import { DailyGoalsPage } from './pages/DailyGoalsPage';
import { NotesVaultPage } from './pages/NotesVaultPage';
import { BreathingResetPage } from './pages/BreathingResetPage';
import { SettingsPage } from './pages/SettingsPage';
import { ErrorBookPage } from './pages/ErrorBookPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // 2-second opening relaxing loading animation
  const [showSplash, setShowSplash] = useState(true);

  // User's Name (persisted - personalized across the workspace)
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('athenaeum_user_name') || '';
  });

  // Selected Class (9 or 11)
  const [selectedClass, setSelectedClass] = useState<AcademicClass>(() => {
    const saved = localStorage.getItem('athenaeum_selected_class');
    if (saved === '9' || saved === '11') return saved;
    return '9';
  });

  // First-time onboarding class selection modal (shown if user has never chosen a class or entered their name)
  const [showClassModal, setShowClassModal] = useState<boolean>(() => {
    const savedClass = localStorage.getItem('athenaeum_selected_class');
    const savedName = localStorage.getItem('athenaeum_user_name');
    return !savedClass || !savedName;
  });

  // Theme mode (light / dark)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('athenaeum_theme_mode');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  // Color Theme Palette (e.g. nordic-sage, sakura-pink, oxford-navy, etc.)
  const [themePalette, setThemePalette] = useState<ThemePalette>(() => {
    const saved = localStorage.getItem('athenaeum_theme_palette');
    if (
      saved === 'nordic-sage' ||
      saved === 'sakura-pink' ||
      saved === 'oxford-navy' ||
      saved === 'warm-terracotta' ||
      saved === 'lavender-wisteria' ||
      saved === 'slate-monochrome'
    ) {
      return saved;
    }
    return 'nordic-sage';
  });

  // Progress Bar Visual Style (persisted - defaults to Constellation Star Trail 'star')
  const [progressStyle, setProgressStyle] = useState<ProgressBarStyle>(() => {
    const saved = localStorage.getItem('athenaeum_progress_style');
    if (saved === 'straight' || saved === 'circular' || saved === 'pill' || saved === 'segmented' || saved === 'star') {
      return saved;
    }
    return 'star';
  });

  // Current active view: defaults to serene 'home' landing page
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  // Track scroll position on the home landing page so returning preserves exact scroll location
  const homeScrollPos = useRef<number>(0);

  // Set browser scroll restoration to manual
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Continuously record scroll position on the home landing page
  useEffect(() => {
    if (activeSection === 'home') {
      const handleScroll = () => {
        homeScrollPos.current = window.scrollY;
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [activeSection]);

  const handleSelectSection = (sec: ActiveSection) => {
    if (activeSection === 'home') {
      homeScrollPos.current = window.scrollY;
    }
    setActiveSection(sec);
  };

  const handleBackToHome = () => {
    setActiveSection('home');
  };

  // Ensure new section opens from the starting/top (0), and returning to home restores exact scroll position
  useEffect(() => {
    if (activeSection === 'home') {
      const savedY = homeScrollPos.current;
      window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
      const rAF = requestAnimationFrame(() => {
        window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
      });
      return () => cancelAnimationFrame(rAF);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const rAF = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
      return () => cancelAnimationFrame(rAF);
    }
  }, [activeSection]);

  // Class 9 Syllabus state (persisted with smart auto-sync for Mathematics chapters 1 to 8)
  const [class9Syllabus, setClass9Syllabus] = useState<SyllabusSubject[]>(() => {
    const saved = localStorage.getItem('athenaeum_class9_syllabus');
    if (saved) {
      try {
        const parsed: SyllabusSubject[] = JSON.parse(saved);
        const mathSubject = parsed.find((s) => s.id === 'maths');
        const needsMathsUpdate =
          !mathSubject ||
          mathSubject.chapters.length !== 14 ||
          !mathSubject.chapters.some((c) => c.id === 'math-ch-2');

        if (needsMathsUpdate) {
          const completedMap = new Map<string, { completed: boolean; completedAt?: string }>();
          parsed.forEach((sub) => {
            sub.chapters.forEach((ch) => {
              ch.stages.forEach((st) => {
                if (st.completed) {
                  completedMap.set(`${sub.id}_${ch.id}_${st.id}`, {
                    completed: true,
                    completedAt: st.completedAt,
                  });
                }
              });
            });
          });

          return CLASS_9_SYLLABUS.map((sub) => ({
            ...sub,
            chapters: sub.chapters.map((ch) => ({
              ...ch,
              stages: ch.stages.map((st) => {
                const key = `${sub.id}_${ch.id}_${st.id}`;
                const savedState = completedMap.get(key);
                if (savedState) {
                  return {
                    ...st,
                    completed: savedState.completed,
                    completedAt: savedState.completedAt,
                  };
                }
                return st;
              }),
            })),
          }));
        }
        return parsed;
      } catch {
        return CLASS_9_SYLLABUS;
      }
    }
    return CLASS_9_SYLLABUS;
  });

  // Class 11 Syllabus state (persisted with auto-sync to ensure exact NCERT chapters & stages)
  const [class11Syllabus, setClass11Syllabus] = useState<SyllabusSubject[]>(() => {
    const saved = localStorage.getItem('athenaeum_class11_syllabus');
    if (saved) {
      try {
        const parsed: SyllabusSubject[] = JSON.parse(saved);
        const expectedIds = ['physics', 'chemistry', 'maths', 'biology', 'english', 'hindi', 'cs'];
        const hasAll = expectedIds.every((id) => parsed.some((s) => s.id === id));
        if (hasAll) {
          const completedMap = new Map<string, { completed: boolean; completedAt?: string }>();
          parsed.forEach((sub) => {
            sub.chapters.forEach((ch) => {
              ch.stages.forEach((st) => {
                if (st.completed) {
                  completedMap.set(`${sub.id}_${ch.id}_${st.id}`, {
                    completed: true,
                    completedAt: st.completedAt,
                  });
                }
              });
            });
          });

          return CLASS_11_SYLLABUS.map((sub) => ({
            ...sub,
            chapters: sub.chapters.map((ch) => ({
              ...ch,
              stages: ch.stages.map((st) => {
                const key = `${sub.id}_${ch.id}_${st.id}`;
                const savedState = completedMap.get(key);
                if (savedState) {
                  return {
                    ...st,
                    completed: savedState.completed,
                    completedAt: savedState.completedAt,
                  };
                }
                return st;
              }),
            })),
          }));
        }
      } catch {
        return CLASS_11_SYLLABUS;
      }
    }
    return CLASS_11_SYLLABUS;
  });

  // Persist userName
  useEffect(() => {
    if (userName) {
      localStorage.setItem('athenaeum_user_name', userName);
    }
  }, [userName]);

  // Save selectedClass
  useEffect(() => {
    localStorage.setItem('athenaeum_selected_class', selectedClass);
  }, [selectedClass]);

  // Persist theme mode
  useEffect(() => {
    localStorage.setItem('athenaeum_theme_mode', themeMode);
  }, [themeMode]);

  // Persist theme palette
  useEffect(() => {
    localStorage.setItem('athenaeum_theme_palette', themePalette);
  }, [themePalette]);

  // Persist progress style
  useEffect(() => {
    localStorage.setItem('athenaeum_progress_style', progressStyle);
  }, [progressStyle]);

  // Persist Class 9 syllabus
  useEffect(() => {
    localStorage.setItem('athenaeum_class9_syllabus', JSON.stringify(class9Syllabus));
  }, [class9Syllabus]);

  // Persist Class 11 syllabus
  useEffect(() => {
    localStorage.setItem('athenaeum_class11_syllabus', JSON.stringify(class11Syllabus));
  }, [class11Syllabus]);

  // Active syllabus determined by selectedClass
  const activeSyllabus = selectedClass === '11' ? class11Syllabus : class9Syllabus;

  // Dynamic tokens derived from both lighting mode and color palette
  const tokens = getTokens(themeMode, themePalette);
  const stats = calculateSyllabusStats(activeSyllabus);

  // Handle first-time class onboarding selection with name
  const handleSelectFirstTimeClass = (cls: AcademicClass, name: string) => {
    setSelectedClass(cls);
    setUserName(name);
    localStorage.setItem('athenaeum_selected_class', cls);
    localStorage.setItem('athenaeum_user_name', name);
    setShowClassModal(false);
  };

  // Update username handler
  const handleUpdateUserName = (newName: string) => {
    setUserName(newName);
    localStorage.setItem('athenaeum_user_name', newName);
  };

  // Switch class handler (from Settings)
  const handleSwitchClass = (cls: AcademicClass) => {
    setSelectedClass(cls);
    localStorage.setItem('athenaeum_selected_class', cls);
  };

  // Mark stage as completed and timestamp it
  const handleCompleteStage = (subjectId: string, chapterId: string, stageId: string) => {
    const updateFn = (prev: SyllabusSubject[]) =>
      prev.map((sub) => {
        if (sub.id !== subjectId) return sub;

        const updatedChapters = sub.chapters.map((ch) => {
          if (ch.id !== chapterId) return ch;

          const updatedStages = ch.stages.map((st) => {
            if (st.id !== stageId) return st;
            return {
              ...st,
              completed: true,
              completedAt: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
            };
          });

          return { ...ch, stages: updatedStages };
        });

        return { ...sub, chapters: updatedChapters };
      });

    if (selectedClass === '11') {
      setClass11Syllabus(updateFn);
    } else {
      setClass9Syllabus(updateFn);
    }
  };

  // Reopen stage back to active
  const handleReopenStage = (subjectId: string, chapterId: string, stageId: string) => {
    const updateFn = (prev: SyllabusSubject[]) =>
      prev.map((sub) => {
        if (sub.id !== subjectId) return sub;

        const updatedChapters = sub.chapters.map((ch) => {
          if (ch.id !== chapterId) return ch;

          const updatedStages = ch.stages.map((st) => {
            if (st.id !== stageId) return st;
            return {
              ...st,
              completed: false,
              completedAt: undefined,
            };
          });

          return { ...ch, stages: updatedStages };
        });

        return { ...sub, chapters: updatedChapters };
      });

    if (selectedClass === '11') {
      setClass11Syllabus(updateFn);
    } else {
      setClass9Syllabus(updateFn);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300 antialiased"
      style={{
        backgroundColor: tokens.canvas,
        color: tokens.textPrimary,
      }}
    >
      {/* 2-Second Opening Loading Animation */}
      <AnimatePresence>
        {showSplash && (
          <SplashLoader
            tokens={tokens}
            onFinish={() => setShowSplash(false)}
          />
        )}
      </AnimatePresence>

      {/* First-Time User Class Selection Dialog */}
      <AnimatePresence>
        {!showSplash && showClassModal && (
          <ClassSelectionModal
            tokens={tokens}
            initialName={userName}
            onSelectClass={handleSelectFirstTimeClass}
          />
        )}
      </AnimatePresence>

      {/* Top Bar with ALWAYS visible Dark/Light Mode Switcher on Top Right Corner & Class indicator */}
      <Navigation
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        tokens={tokens}
        overallPercentage={stats.overallPercentage}
        selectedClass={selectedClass}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <motion.div
          key={`${activeSection}-${themePalette}-${selectedClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.14 }}
        >
          {activeSection === 'home' && (
            <LandingPage
              tokens={tokens}
              userName={userName}
              selectedClass={selectedClass}
              onSelectSection={handleSelectSection}
            />
          )}

          {activeSection === 'syllabus' && (
            <SyllabusHubPage
              tokens={tokens}
              syllabus={activeSyllabus}
              progressStyle={progressStyle}
              selectedClass={selectedClass}
              onCompleteStage={handleCompleteStage}
              onReopenStage={handleReopenStage}
              onBack={handleBackToHome}
            />
          )}

          {activeSection === 'error-book' && (
            <ErrorBookPage
              tokens={tokens}
              userName={userName}
              selectedClass={selectedClass}
              syllabus={activeSyllabus}
              onBack={handleBackToHome}
            />
          )}

          {activeSection === 'focus-timer' && (
            <FocusTimerPage
              tokens={tokens}
              onBack={handleBackToHome}
            />
          )}

          {activeSection === 'daily-goals' && (
            <DailyGoalsPage
              tokens={tokens}
              selectedClass={selectedClass}
              syllabus={activeSyllabus}
              onBack={handleBackToHome}
            />
          )}

          {activeSection === 'notes-vault' && (
            <NotesVaultPage
              tokens={tokens}
              selectedClass={selectedClass}
              onBack={handleBackToHome}
            />
          )}

          {activeSection === 'breathing' && (
            <BreathingResetPage
              tokens={tokens}
              onBack={handleBackToHome}
            />
          )}

          {activeSection === 'settings' && (
            <SettingsPage
              tokens={tokens}
              themeMode={themeMode}
              setThemeMode={setThemeMode}
              themePalette={themePalette}
              setThemePalette={setThemePalette}
              progressStyle={progressStyle}
              setProgressStyle={setProgressStyle}
              selectedClass={selectedClass}
              setSelectedClass={handleSwitchClass}
              userName={userName}
              setUserName={handleUpdateUserName}
              onBack={handleBackToHome}
            />
          )}
        </motion.div>
      </main>

      {/* Quiet, Soothing Footer */}
      <footer
        className="border-t py-6 transition-colors duration-200 mt-auto"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderSubtle,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2" style={{ color: tokens.textSecondary }}>
            <span className="font-serif font-semibold" style={{ color: tokens.textPrimary }}>
              Athenaeum
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {userName
                ? `Dedicated with love for ${userName}'s Studies`
                : (selectedClass === '9'
                    ? "Sister's Study Sanctuary · Class 9th"
                    : 'Senior Academic Workspace · Class 11th')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{themePalette.replace('-', ' ')} Theme</span>
          </div>

          <div className="flex items-center gap-3 text-xs" style={{ color: tokens.textMuted }}>
            {activeSection !== 'home' ? (
              <button
                onClick={() => setActiveSection('home')}
                className="underline hover:opacity-100"
                style={{ color: tokens.accentPrimary }}
              >
                Return to Home
              </button>
            ) : (
              <span>Take it one day at a time</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
