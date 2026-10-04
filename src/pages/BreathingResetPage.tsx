import React, { useState, useEffect } from 'react';
import { ColorTokens } from '../types/theme';
import { ArrowLeft, Wind, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface BreathingResetPageProps {
  tokens: ColorTokens;
  onBack: () => void;
}

export const BreathingResetPage: React.FC<BreathingResetPageProps> = ({ tokens, onBack }) => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [count, setCount] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 4;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 6;
          } else {
            setPhase('Inhale');
            return 4;
          }
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="max-w-xl mx-auto space-y-8 py-4 text-center">
      <div className="text-left">
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
      </div>

      <div
        className="rounded-2xl p-8 sm:p-12 border shadow-xs space-y-8 select-none"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderStrong,
        }}
      >
        <div>
          <span className="text-xs font-mono uppercase tracking-widest block opacity-75" style={{ color: tokens.accentPrimary }}>
            2-Minute Nervous System Reset
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-1" style={{ color: tokens.textPrimary }}>
            Breathe with Ease
          </h2>
          <p className="text-xs sm:text-sm font-body mt-1" style={{ color: tokens.textSecondary }}>
            Release any tension in your shoulders and forehead. Let your thoughts settle.
          </p>
        </div>

        {/* Breathing Animation Circle */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
          <motion.div
            animate={{
              scale: phase === 'Inhale' ? 1.3 : phase === 'Hold' ? 1.3 : 1.0,
              opacity: phase === 'Inhale' ? 0.35 : phase === 'Hold' ? 0.45 : 0.2,
            }}
            transition={{ duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 4 : 6, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: tokens.accentPrimary }}
          />

          <motion.div
            animate={{
              scale: phase === 'Inhale' ? 1.15 : phase === 'Hold' ? 1.15 : 0.9,
            }}
            transition={{ duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 4 : 6, ease: 'easeInOut' }}
            className="w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center border shadow-xs"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.borderStrong,
            }}
          >
            <span className="text-lg sm:text-xl font-serif font-bold tracking-tight" style={{ color: tokens.accentPrimary }}>
              {phase}
            </span>
            <span className="text-2xl font-mono font-bold tabular-nums" style={{ color: tokens.textPrimary }}>
              {count}s
            </span>
          </motion.div>
        </div>

        <p className="text-xs font-body italic" style={{ color: tokens.textMuted }}>
          &ldquo;With every slow exhale, you regain focus and calm clarity.&rdquo;
        </p>
      </div>
    </div>
  );
};
