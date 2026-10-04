import React from 'react';
import { ColorTokens, ProgressBarStyle } from '../types/theme';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';

interface ProgressVisualizerProps {
  percentage: number;
  tokens: ColorTokens;
  style: ProgressBarStyle;
  size?: 'sm' | 'md' | 'lg';
  showPercentageLabel?: boolean;
}

export const ProgressVisualizer: React.FC<ProgressVisualizerProps> = ({
  percentage,
  tokens,
  style,
  size = 'md',
  showPercentageLabel = true,
}) => {
  const clampedPct = Math.min(100, Math.max(0, percentage));

  // 1. CIRCULAR PROGRESS RING
  if (style === 'circular') {
    const dimension = size === 'sm' ? 84 : size === 'lg' ? 160 : 120;
    const strokeWidth = size === 'sm' ? 7 : size === 'lg' ? 12 : 9;
    const radius = (dimension - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedPct / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center p-2">
        <div className="relative flex items-center justify-center" style={{ width: dimension, height: dimension }}>
          <svg width={dimension} height={dimension} className="rotate-[-90deg]">
            {/* Background ring */}
            <circle
              cx={dimension / 2}
              cy={dimension / 2}
              r={radius}
              fill="transparent"
              stroke={tokens.progressBarBg}
              strokeWidth={strokeWidth}
            />
            {/* Animated progress ring */}
            <motion.circle
              cx={dimension / 2}
              cy={dimension / 2}
              r={radius}
              fill="transparent"
              stroke={tokens.accentPrimary}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
            />
          </svg>

          {/* Center percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              className={`font-serif font-bold tracking-tight tabular-nums ${
                size === 'sm' ? 'text-base' : size === 'lg' ? 'text-4xl' : 'text-2xl'
              }`}
              style={{ color: tokens.textPrimary }}
            >
              {clampedPct.toFixed(2)}%
            </span>
            {size !== 'sm' && (
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-60" style={{ color: tokens.textMuted }}>
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. SEGMENTED XP BLOCKS (Kids love game XP bars!)
  if (style === 'segmented') {
    const totalBlocks = 12;
    const filledBlocks = Math.round((clampedPct / 100) * totalBlocks);

    return (
      <div className="space-y-2 w-full">
        <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
          {Array.from({ length: totalBlocks }).map((_, i) => {
            const isFilled = i < filledBlocks;
            return (
              <motion.div
                key={i}
                initial={{ scaleY: 0.6, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className={`rounded-md transition-all ${
                  size === 'sm' ? 'h-3' : size === 'lg' ? 'h-6' : 'h-4'
                }`}
                style={{
                  backgroundColor: isFilled ? tokens.accentPrimary : tokens.progressBarBg,
                  boxShadow: isFilled ? `0 0 8px ${tokens.ringColor}` : 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // 3. CURVED CAPSULE / PILL BAR
  if (style === 'pill') {
    const heightClass = size === 'sm' ? 'h-3' : size === 'lg' ? 'h-7' : 'h-5';

    return (
      <div className="w-full space-y-1.5">
        <div
          className={`w-full ${heightClass} rounded-full overflow-hidden p-1 border shadow-inner relative`}
          style={{
            backgroundColor: tokens.progressBarBg,
            borderColor: tokens.borderSubtle,
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedPct}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full relative overflow-hidden flex items-center justify-end pr-2"
            style={{
              backgroundColor: tokens.accentPrimary,
            }}
          >
            {/* Soft inner glow pill reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>
    );
  }

  // 4. CONSTELLATION STAR TRAIL (with gliding star indicator!)
  if (style === 'star') {
    const heightClass = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-3';

    return (
      <div className="w-full relative pt-3 pb-1">
        {/* Track */}
        <div
          className={`w-full ${heightClass} rounded-full overflow-visible relative border`}
          style={{
            backgroundColor: tokens.progressBarBg,
            borderColor: tokens.borderSubtle,
          }}
        >
          {/* Fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedPct}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full relative"
            style={{
              backgroundColor: tokens.accentPrimary,
            }}
          >
            {/* Star Icon Gliding at the front tip */}
            <motion.div
              className="absolute -right-3 -top-2.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md bg-amber-400 text-amber-950 border border-amber-200"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // 5. DEFAULT: MINIMAL STRAIGHT LINE
  const defaultHeight = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-3';
  return (
    <div className="w-full space-y-1">
      <div
        className={`w-full ${defaultHeight} rounded-full overflow-hidden border`}
        style={{
          backgroundColor: tokens.progressBarBg,
          borderColor: tokens.borderSubtle,
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedPct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full transition-all"
          style={{
            backgroundColor: tokens.accentPrimary,
          }}
        />
      </div>
    </div>
  );
};
