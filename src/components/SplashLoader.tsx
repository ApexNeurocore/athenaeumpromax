import React, { useEffect, useState } from 'react';
import { ColorTokens } from '../types/theme';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface SplashLoaderProps {
  tokens: ColorTokens;
  userName?: string;
  onFinish: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ tokens, userName, onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 2-second smooth timer
    const startTime = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(onFinish, 200); // Gentle 200ms settling
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none"
      style={{
        backgroundColor: tokens.canvas,
        color: tokens.textPrimary,
      }}
    >
      {/* Soothing breathing concentric circles */}
      <div className="relative flex items-center justify-center mb-8">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full"
          style={{ backgroundColor: tokens.accentPrimary }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full"
          style={{ backgroundColor: tokens.accentSoftBg }}
        />

        {/* Center Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border shadow-sm backdrop-blur-md"
          style={{
            backgroundColor: tokens.surface,
            borderColor: tokens.borderStrong,
            color: tokens.accentPrimary,
          }}
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Gentle Typography */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-2 max-w-sm"
      >
        <span
          className="text-xs font-mono uppercase tracking-widest block opacity-70"
          style={{ color: tokens.accentPrimary }}
        >
          Athenaeum Study Sanctuary
        </span>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
          {userName ? `Welcome, ${userName}` : 'Welcome to Athenaeum'}
        </h2>

        <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: tokens.textSecondary }}>
          Taking a quiet breath before we begin...
        </p>
      </motion.div>

      {/* 2-Second Calming Progress Bar */}
      <div className="w-48 sm:w-60 mt-8 space-y-2">
        <div
          className="w-full h-1 rounded-full overflow-hidden"
          style={{ backgroundColor: tokens.progressBarBg }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: tokens.accentPrimary,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono" style={{ color: tokens.textMuted }}>
          <span>Centering focus</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};
