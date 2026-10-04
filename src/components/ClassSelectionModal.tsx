import React, { useState } from 'react';
import { ColorTokens, AcademicClass } from '../types/theme';
import { BookOpen, Atom, Sparkles, ChevronRight, GraduationCap, User } from 'lucide-react';
import { motion } from 'motion/react';

interface ClassSelectionModalProps {
  tokens: ColorTokens;
  initialName?: string;
  onSelectClass: (cls: AcademicClass, name: string) => void;
}

export const ClassSelectionModal: React.FC<ClassSelectionModalProps> = ({
  tokens,
  initialName = '',
  onSelectClass,
}) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);

  const handleChoose = (cls: AcademicClass) => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name so we can personalize your sanctuary.');
      return;
    }
    setError(null);
    onSelectClass(cls, trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-9 relative overflow-hidden"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderStrong,
        }}
      >
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: tokens.accentPrimary }}
        />

        {/* Header */}
        <div className="text-center space-y-2.5 mb-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border"
            style={{
              backgroundColor: tokens.canvas,
              borderColor: tokens.borderSubtle,
              color: tokens.accentPrimary,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Athenaeum</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight"
            style={{ color: tokens.textPrimary }}
          >
            Begin Your Academic Journey
          </h2>

          <p
            className="text-xs sm:text-sm font-body max-w-lg mx-auto leading-relaxed"
            style={{ color: tokens.textSecondary }}
          >
            Enter your name and choose your academic standard. You can update both anytime in Settings.
          </p>
        </div>

        {/* Name Input Field */}
        <div className="mb-6 space-y-2 max-w-md mx-auto">
          <label className="text-xs font-mono font-semibold block text-left" style={{ color: tokens.textPrimary }}>
            What should we call you?
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" style={{ color: tokens.textMuted }} />
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter your name (e.g. Aryan, Ananya, Rahul...)"
              className="w-full min-h-[46px] pl-10 pr-4 rounded-xl border text-sm outline-none transition-colors shadow-inner"
              style={{
                backgroundColor: tokens.canvas,
                borderColor: error ? '#EF4444' : tokens.borderStrong,
                color: tokens.textPrimary,
              }}
            />
          </div>
          {error && (
            <p className="text-xs text-red-500 font-medium text-left">{error}</p>
          )}
        </div>

        {/* 2 Options Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
          {/* Option 1: Class 9th */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleChoose('9')}
            className="group cursor-pointer rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between select-none shadow-xs hover:shadow-lg relative overflow-hidden text-left"
            style={{
              backgroundColor: tokens.canvas,
              borderColor: tokens.borderStrong,
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.borderStrong,
                    color: tokens.accentPrimary,
                  }}
                >
                  <BookOpen className="w-6 h-6" />
                </div>

                <span
                  className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    borderColor: tokens.borderSubtle,
                    color: tokens.accentPrimary,
                  }}
                >
                  Secondary Standard
                </span>
              </div>

              <div>
                <h3
                  className="text-xl font-serif font-bold tracking-tight mb-1 group-hover:opacity-90"
                  style={{ color: tokens.textPrimary }}
                >
                  Class 9th (CBSE)
                </h3>
                <p
                  className="text-xs font-body leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  Complete CBSE curriculum: Mathematics, Science, Social Science, Hindi, English & Computer with precision revision decks.
                </p>
              </div>
            </div>

            <div
              className="mt-6 pt-3 border-t flex items-center justify-between text-xs font-semibold"
              style={{
                borderColor: tokens.borderSubtle,
                color: tokens.accentPrimary,
              }}
            >
              <span>Select Class 9th</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>

          {/* Option 2: Class 11th */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleChoose('11')}
            className="group cursor-pointer rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between select-none shadow-xs hover:shadow-lg relative overflow-hidden text-left"
            style={{
              backgroundColor: tokens.canvas,
              borderColor: tokens.borderStrong,
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.borderStrong,
                    color: tokens.accentPrimary,
                  }}
                >
                  <Atom className="w-6 h-6" />
                </div>

                <span
                  className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: tokens.accentSoftBg,
                    borderColor: tokens.borderSubtle,
                    color: tokens.accentPrimary,
                  }}
                >
                  Senior Secondary
                </span>
              </div>

              <div>
                <h3
                  className="text-xl font-serif font-bold tracking-tight mb-1 group-hover:opacity-90"
                  style={{ color: tokens.textPrimary }}
                >
                  Class 11th (CBSE)
                </h3>
                <p
                  className="text-xs font-body leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  Higher scholarship workspace: Physics, Chemistry, Mathematics, Biology, English, Hindi & Computer Science CS.
                </p>
              </div>
            </div>

            <div
              className="mt-6 pt-3 border-t flex items-center justify-between text-xs font-semibold"
              style={{
                borderColor: tokens.borderSubtle,
                color: tokens.accentPrimary,
              }}
            >
              <span>Select Class 11th</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <div
          className="pt-4 border-t text-center flex items-center justify-center gap-2 text-xs"
          style={{
            borderColor: tokens.borderSubtle,
            color: tokens.textMuted,
          }}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>You can switch your class and change your name anytime from Settings.</span>
        </div>
      </motion.div>
    </div>
  );
};
