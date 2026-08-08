import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Rocket, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useDemoState } from '../../context/DemoStateContext';

export const MilestoneRecoveryCelebration: React.FC = () => {
  const { student, dismissMilestoneCelebration } = useDemoState();
  const navigate = useNavigate();

  const [stepIndex, setStepIndex] = useState(0);
  const targetScore = student.momentumScore || 88;
  const [displayScore, setDisplayScore] = useState(62); // Start at recovery baseline

  const messages = [
    'Every developer stumbles.',
    'But the best developers always come back.',
    'Your consistency has paid off.',
    "You're officially back on track.",
  ];

  // Fire confetti, animate score count-up, and advance messages automatically
  useEffect(() => {
    if (!student.showMilestoneCelebration) return;

    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#2563EB', '#7C3AED', '#22C55E', '#F97316', '#FACC15'],
    });

    // Dynamic count up animation from 62% to targetScore (e.g. 88%)
    const startScore = 62;
    const duration = 1600; // 1.6s
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const currentVal = Math.round(startScore + (targetScore - startScore) * progress);
      setDisplayScore(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [student.showMilestoneCelebration, targetScore]);

  if (!student.showMilestoneCelebration) return null;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const handleReturnToDashboard = () => {
    dismissMilestoneCelebration();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#09090B] via-[#09090B] to-[#121216] flex items-center justify-center p-4">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/40 text-center space-y-6 relative z-10 shadow-2xl bg-zinc-950/90"
      >
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Milestone Reached • 88%+ Momentum</span>
        </div>

        {/* Sequential Emotional Messages Reveal */}
        <div className="h-20 flex flex-col items-center justify-center space-y-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug"
            >
              "{messages[stepIndex]}"
            </motion.p>
          </AnimatePresence>

          <p className="text-xs text-zinc-400">
            {stepIndex < messages.length - 1 ? 'Perseverance over perfection...' : 'Consistency habit officially restored!'}
          </p>
        </div>

        {/* Smoothly Filling Momentum Ring with Dynamic Counter */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-zinc-800"
              strokeWidth="8"
              fill="transparent"
            />
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-emerald-400"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-white tracking-tight">{displayScore}%</span>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              {displayScore >= 88 ? 'Thriving' : 'Recovering'}
            </span>
          </div>
        </div>

        {/* Level & Milestone Badge */}
        <div className="bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">
                New Level: {displayScore >= 88 ? '🚀 Thriving' : '⚡ Rebuilding'}
              </div>
              <div className="text-[10px] text-zinc-400">Recovery cycle complete with ZERO penalty</div>
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            {displayScore}%
          </span>
        </div>

        {/* Return to Dashboard CTA */}
        <button
          onClick={handleReturnToDashboard}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <Rocket className="w-4 h-4" />
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
