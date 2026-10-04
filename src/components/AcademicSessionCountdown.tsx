import React, { useState, useEffect } from 'react';
import { ColorTokens } from '../types/theme';
import { Calendar, Hourglass, Sparkles, Clock, Target, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface AcademicSessionCountdownProps {
  tokens: ColorTokens;
}

interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  monthsApprox: number;
  daysRemainder: number;
  percentElapsed: number;
  percentRemaining: number;
  startYear: number;
  endYear: number;
}

export const AcademicSessionCountdown: React.FC<AcademicSessionCountdownProps> = ({ tokens }) => {
  const [showLiveSeconds, setShowLiveSeconds] = useState(false);

  const calculateTime = (): TimeRemaining => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = Jan, 1 = Feb, 2 = Mar, 3 = Apr, etc.

    // Indian academic session: 1 April (startYear) to 1 February (endYear)
    let startYear = currentYear;
    let endYear = currentYear + 1;

    if (currentMonth < 3) {
      // If we are in Jan, Feb, or Mar, the current session began in previous year
      startYear = currentYear - 1;
      endYear = currentYear;
    }

    const startDate = new Date(startYear, 3, 1, 0, 0, 0); // 1 April 00:00:00
    const endDate = new Date(endYear, 1, 1, 0, 0, 0); // 1 February 00:00:00 (midnight)

    const totalDurationMs = endDate.getTime() - startDate.getTime();
    const nowMs = now.getTime();

    const elapsedMs = Math.max(0, nowMs - startDate.getTime());
    const remainingMs = Math.max(0, endDate.getTime() - nowMs);

    const totalDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

    const monthsApprox = Math.floor(totalDays / 30);
    const daysRemainder = totalDays % 30;

    const percentElapsed = totalDurationMs > 0 ? Math.min(100, Math.max(0, (elapsedMs / totalDurationMs) * 100)) : 0;
    const percentRemaining = Math.max(0, 100 - percentElapsed);

    return {
      totalMs: remainingMs,
      days: totalDays,
      hours,
      minutes,
      seconds,
      monthsApprox,
      daysRemainder,
      percentElapsed,
      percentRemaining,
      startYear,
      endYear,
    };
  };

  const [time, setTime] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    // Tick every second to keep the countdown perfectly fresh and accurate
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="rounded-2xl p-6 sm:p-7 border relative shadow-xs transition-all duration-300 space-y-5"
      style={{
        backgroundColor: tokens.surface,
        borderColor: tokens.borderStrong,
      }}
    >
      {/* Top Banner & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: tokens.borderSubtle }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0"
            style={{
              backgroundColor: tokens.canvas,
              borderColor: tokens.borderSubtle,
              color: tokens.accentPrimary,
            }}
          >
            <Hourglass className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: tokens.accentPrimary }}>
                Academic Horizon {time.startYear}–{time.endYear}
              </span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border hidden sm:inline-block"
                style={{
                  backgroundColor: tokens.accentSoftBg,
                  borderColor: tokens.borderSubtle,
                  color: tokens.accentPrimary,
                }}
              >
                1 April → 1 February Target
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
              Session Finish Line Countdown
            </h2>
          </div>
        </div>

        {/* Live view mode toggle */}
        <button
          type="button"
          onClick={() => setShowLiveSeconds((prev) => !prev)}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg border text-xs font-mono transition-all hover:brightness-95 active:scale-95 flex items-center gap-1.5"
          style={{
            backgroundColor: tokens.canvas,
            borderColor: tokens.borderSubtle,
            color: tokens.textSecondary,
          }}
          title={showLiveSeconds ? 'Switch to calm view (Days & Hours)' : 'View full live clock with seconds'}
        >
          <Clock className="w-3.5 h-3.5" style={{ color: tokens.accentPrimary }} />
          <span>{showLiveSeconds ? 'Calm Mode' : 'Live Clock'}</span>
        </button>
      </div>

      {/* Primary Countdown Units Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Unit 1: Months / Days Overview */}
        <div
          className="p-4 rounded-xl border flex flex-col items-center justify-center text-center shadow-xs"
          style={{
            backgroundColor: tokens.canvas,
            borderColor: tokens.borderSubtle,
          }}
        >
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-serif font-bold tabular-nums" style={{ color: tokens.accentPrimary }}>
              {time.monthsApprox}
            </span>
            <span className="text-xs font-serif font-medium" style={{ color: tokens.textSecondary }}>m</span>
            <span className="text-2xl sm:text-3xl font-serif font-bold tabular-nums ml-1" style={{ color: tokens.textPrimary }}>
              {time.daysRemainder}
            </span>
            <span className="text-xs font-serif font-medium" style={{ color: tokens.textSecondary }}>d</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider mt-1 opacity-70" style={{ color: tokens.textMuted }}>
            Approx Months & Days
          </span>
        </div>

        {/* Unit 2: Exact Total Days */}
        <div
          className="p-4 rounded-xl border flex flex-col items-center justify-center text-center shadow-xs"
          style={{
            backgroundColor: tokens.canvas,
            borderColor: tokens.borderSubtle,
          }}
        >
          <span className="text-3xl sm:text-4xl font-serif font-bold tabular-nums" style={{ color: tokens.textPrimary }}>
            {time.days}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider mt-1 opacity-70" style={{ color: tokens.textMuted }}>
            Total Days Left
          </span>
        </div>

        {/* Unit 3: Hours Remaining */}
        <div
          className="p-4 rounded-xl border flex flex-col items-center justify-center text-center shadow-xs"
          style={{
            backgroundColor: tokens.canvas,
            borderColor: tokens.borderSubtle,
          }}
        >
          <span className="text-3xl sm:text-4xl font-serif font-bold tabular-nums" style={{ color: tokens.textPrimary }}>
            {String(time.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider mt-1 opacity-70" style={{ color: tokens.textMuted }}>
            Hours Remaining
          </span>
        </div>

        {/* Unit 4: Minutes (and optional live seconds) */}
        <div
          className="p-4 rounded-xl border flex flex-col items-center justify-center text-center shadow-xs"
          style={{
            backgroundColor: tokens.canvas,
            borderColor: tokens.borderSubtle,
          }}
        >
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-serif font-bold tabular-nums" style={{ color: tokens.textPrimary }}>
              {String(time.minutes).padStart(2, '0')}
            </span>
            {showLiveSeconds && (
              <>
                <span className="text-lg opacity-40 font-mono">:</span>
                <span className="text-2xl font-serif font-bold tabular-nums" style={{ color: tokens.accentPrimary }}>
                  {String(time.seconds).padStart(2, '0')}
                </span>
              </>
            )}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider mt-1 opacity-70" style={{ color: tokens.textMuted }}>
            {showLiveSeconds ? 'Mins : Secs' : 'Minutes'}
          </span>
        </div>
      </div>

      {/* Academic Session Progress Bar with 2 Decimal Precision */}
      <div className="space-y-2 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1" style={{ color: tokens.textSecondary }}>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accentPrimary }} />
            <span>Academic Year Elapsed: <strong>{time.percentElapsed.toFixed(2)}%</strong></span>
          </div>

          <span className="opacity-80">
            {time.percentRemaining.toFixed(2)}% of Year Ahead · Ends 1 Feb 12:00 AM
          </span>
        </div>

        {/* Progress Bar Track */}
        <div
          className="w-full h-3 rounded-full overflow-hidden border shadow-inner"
          style={{
            backgroundColor: tokens.progressBarBg,
            borderColor: tokens.borderSubtle,
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${time.percentElapsed}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full relative overflow-hidden"
            style={{
              backgroundColor: tokens.accentPrimary,
            }}
          >
            {/* Subtle gentle highlight sheen */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Peaceful Reassurance Footnote */}
      <div className="pt-2 flex items-center justify-between text-xs font-body" style={{ color: tokens.textMuted }}>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Every steady hour of study brings you closer to your goals.</span>
        </span>

        <span className="font-mono text-[11px] font-semibold" style={{ color: tokens.accentPrimary }}>
          Target: 1 Feb 12:00 AM
        </span>
      </div>
    </section>
  );
};
