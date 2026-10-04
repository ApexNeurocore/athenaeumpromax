import React, { useState, useEffect, useRef } from 'react';
import { ColorTokens } from '../types/theme';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, PartyPopper, Coffee, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FocusTimerPageProps {
  tokens: ColorTokens;
  onBack: () => void;
}

export const FocusTimerPage: React.FC<FocusTimerPageProps> = ({ tokens, onBack }) => {
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundMode, setSoundMode] = useState<'Quiet Library' | 'Rain on Window' | 'Cypress Breeze'>('Quiet Library');
  const [soundOn, setSoundOn] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Audio context ref for soothing chime
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play beautiful, soothing Tibetan singing bowl chime / bell sound indication
  const playSoothingChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // Gentle harmonic frequencies (528 Hz soothing Solfeggio + 660 Hz + 792 Hz)
      const frequencies = [528, 660, 792, 1056];

      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Soft, peaceful envelope: instant gentle attack, slow soothing resonance decay
        const delay = index * 0.08;
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.12 / (index + 1), now + delay + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 2.9);
      });
    } catch {
      // Audio fallback silent fail
    }
  };

  // Trigger celebratory party popper animation
  const triggerCelebration = () => {
    setShowCelebration(true);
    playSoothingChime();
    setTimeout(() => {
      setShowCelebration(false);
    }, 4500);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsRunning(false);

      if (timerMode === 'focus') {
        // 25-minute focus session finished:
        // 1. Trigger celebratory party popper animation & chime
        triggerCelebration();
        // 2. Automatically switch to 5-minute break
        setTimerMode('break');
        setSeconds(5 * 60);
      } else {
        // 5-minute break finished:
        playSoothingChime();
        setTimerMode('focus');
        setSeconds(25 * 60);
      }
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, seconds, timerMode]);

  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');

  // Generate particle popper confetti pieces
  const confettiParticles = Array.from({ length: 36 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 500,
    y: (Math.random() - 0.7) * 450,
    rot: Math.random() * 360,
    color: ['#2D5A46', '#D4AF63', '#4E8A6D', '#E29578', '#83C5BE', '#FFB703', '#52B788'][i % 7],
    size: Math.random() * 8 + 6,
  }));

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4 relative">
      {/* Party Popper Overlay Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
          >
            {/* Backdrop blur */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

            {/* Confetti particles */}
            <div className="relative">
              {confettiParticles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                  animate={{
                    x: p.x,
                    y: p.y,
                    scale: [0, 1.2, 0.9],
                    rotate: p.rot,
                  }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute rounded-sm"
                  style={{
                    width: p.size,
                    height: p.size * 1.5,
                    backgroundColor: p.color,
                  }}
                />
              ))}

              {/* Congratulatory Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative p-6 sm:p-8 rounded-2xl border shadow-xl text-center space-y-3 max-w-sm mx-auto"
                style={{
                  backgroundColor: tokens.surface,
                  borderColor: tokens.borderStrong,
                }}
              >
                <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center border shadow-xs bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <PartyPopper className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold tracking-tight" style={{ color: tokens.textPrimary }}>
                  Focus Sprint Complete! 🎉
                </h3>
                <p className="text-xs sm:text-sm font-body leading-relaxed" style={{ color: tokens.textSecondary }}>
                  Incredible focus! Your 5-minute restorative break has been automatically set. Breathe and relax.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <div className="flex items-center justify-between">
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

        {/* Quick test popper button for immediate verification */}
        <button
          onClick={triggerCelebration}
          className="min-h-[38px] px-3 py-1 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-all hover:brightness-95 active:scale-95"
          style={{
            backgroundColor: tokens.canvas,
            borderColor: tokens.borderSubtle,
            color: tokens.accentPrimary,
          }}
          title="Test party popper and soothing chime"
        >
          <PartyPopper className="w-3.5 h-3.5" />
          <span>Test Popper & Chime</span>
        </button>
      </div>

      {/* Focus Timer Card */}
      <div
        className="rounded-2xl p-6 sm:p-10 border text-center space-y-7 shadow-xs"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.borderStrong,
        }}
      >
        {/* Mode Tabs (25m Focus / 5m Break) */}
        <div
          className="inline-flex p-1 rounded-xl border text-xs font-medium"
          style={{
            backgroundColor: tokens.canvas,
            borderColor: tokens.borderSubtle,
          }}
        >
          <button
            onClick={() => {
              setIsRunning(false);
              setTimerMode('focus');
              setSeconds(25 * 60);
            }}
            className="px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
            style={{
              backgroundColor: timerMode === 'focus' ? tokens.surface : 'transparent',
              color: timerMode === 'focus' ? tokens.textPrimary : tokens.textSecondary,
              fontWeight: timerMode === 'focus' ? 700 : 500,
              boxShadow: timerMode === 'focus' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Focus Session (25 min)</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimerMode('break');
              setSeconds(5 * 60);
            }}
            className="px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
            style={{
              backgroundColor: timerMode === 'break' ? tokens.surface : 'transparent',
              color: timerMode === 'break' ? tokens.textPrimary : tokens.textSecondary,
              fontWeight: timerMode === 'break' ? 700 : 500,
              boxShadow: timerMode === 'break' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Restorative Break (5 min)</span>
          </button>
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-wider block opacity-75" style={{ color: tokens.accentPrimary }}>
            {timerMode === 'focus' ? 'Deep Study Sprint' : 'Gentle Rest Period'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-1" style={{ color: tokens.textPrimary }}>
            {timerMode === 'focus' ? '25 Minutes of Calm Focus' : '5 Minutes of Peaceful Rest'}
          </h2>
          <p className="text-xs sm:text-sm font-body mt-1" style={{ color: tokens.textSecondary }}>
            {timerMode === 'focus'
              ? 'When completed, celebratory party poppers, a soothing chime, and a 5-minute break will activate automatically.'
              : 'Relax your eyes, drink some water, and stretch. You earned this break!'}
          </p>
        </div>

        {/* Big Digital Clock */}
        <div
          className="text-7xl sm:text-8xl font-mono font-bold tracking-tighter tabular-nums py-2"
          style={{ color: tokens.textPrimary }}
        >
          {mins}:{remainder}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setIsRunning(!isRunning);
              // Ensure audio context is ready on first user gesture
              try {
                const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                if (!audioContextRef.current) audioContextRef.current = new AudioCtx();
                if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
              } catch {}
            }}
            className="min-h-[48px] px-8 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-2"
            style={{
              backgroundColor: tokens.accentPrimary,
              color: tokens.accentText,
            }}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause' : timerMode === 'focus' ? 'Start Focus (25m)' : 'Start Break (5m)'}</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setSeconds(timerMode === 'focus' ? 25 * 60 : 5 * 60);
            }}
            className="min-h-[48px] px-5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:brightness-95 flex items-center gap-2"
            style={{
              backgroundColor: tokens.canvas,
              borderColor: tokens.borderStrong,
              color: tokens.textPrimary,
            }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Ambience selector */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: tokens.borderSubtle }}>
          <div className="flex items-center gap-2" style={{ color: tokens.textSecondary }}>
            <button onClick={() => setSoundOn(!soundOn)} className="p-1 rounded hover:bg-black/5">
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4 opacity-50" />}
            </button>
            <span>Background Ambience:</span>
          </div>

          <div className="flex items-center gap-1.5">
            {(['Quiet Library', 'Rain on Window', 'Cypress Breeze'] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setSoundMode(m);
                  setSoundOn(true);
                }}
                className="px-2.5 py-1 rounded-md text-[11px] transition-all"
                style={{
                  backgroundColor: soundMode === m ? tokens.accentSoftBg : 'transparent',
                  color: soundMode === m ? tokens.accentPrimary : tokens.textSecondary,
                  fontWeight: soundMode === m ? 600 : 400,
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
