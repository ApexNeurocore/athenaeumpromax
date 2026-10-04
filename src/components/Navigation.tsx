import React from 'react';
import { ThemeMode, ColorTokens, AcademicClass } from '../types/theme';
import { Sun, Moon, GraduationCap } from 'lucide-react';

interface NavigationProps {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  tokens: ColorTokens;
  overallPercentage: number;
  selectedClass: AcademicClass;
}

export const Navigation: React.FC<NavigationProps> = ({
  themeMode,
  setThemeMode,
  tokens,
  overallPercentage,
  selectedClass,
}) => {
  return (
    <header
      className="sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-md"
      style={{
        backgroundColor: themeMode === 'light' ? 'rgba(250, 248, 245, 0.92)' : 'rgba(16, 22, 20, 0.92)',
        borderColor: tokens.borderSubtle,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single element brand title */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.accentPrimary,
            }}
          >
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1
              className="text-lg sm:text-xl font-serif font-bold tracking-tight leading-none"
              style={{ color: tokens.textPrimary }}
            >
              Athenaeum
            </h1>
            <span
              className="text-[11px] font-body block opacity-75 mt-0.5"
              style={{ color: tokens.textMuted }}
            >
              {selectedClass === '9' ? "Sister's Study Sanctuary" : 'Senior Academic Sanctuary'}
            </span>
          </div>
        </div>

        {/* Zone 2: Quiet Center / Context Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono" style={{ color: tokens.textSecondary }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accentPrimary }} />
          <span>Class {selectedClass}th Syllabus</span>
          <span aria-hidden="true" style={{ color: tokens.textMuted }}>·</span>
          <span className="font-semibold" style={{ color: tokens.textPrimary }}>{overallPercentage.toFixed(2)}% Completed</span>
        </div>

        {/* Zone 3: ALWAYS on top right corner - Dark & Light Mode Toggle ONLY (Class switch removed from header) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl border flex items-center gap-2 transition-all duration-200 hover:brightness-95 active:scale-95 shadow-xs"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
            aria-label={`Switch to ${themeMode === 'light' ? 'Night Library (Dark)' : 'Day Study (Light)'} mode`}
            title={`Switch to ${themeMode === 'light' ? 'Night Library (Dark)' : 'Day Study (Light)'} mode`}
          >
            {themeMode === 'light' ? (
              <>
                <Moon className="w-4 h-4 text-emerald-950" />
                <span className="hidden sm:inline text-xs font-medium">Night Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline text-xs font-medium">Day Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
