import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, Sparkles, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface RecoveryModalProps {
  onClose: () => void;
  dayId: number;
}

export const RecoveryModal: React.FC<RecoveryModalProps> = ({ onClose, dayId }) => {
  const navigate = useNavigate();

  // Fire celebratory Hurray confetti burst on mount AFTER threshold reached
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#6366F1', '#3B82F6', '#10B981', '#F59E0B'],
    });
  }, []);

  const handleGoToDashboard = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        className="w-full max-w-sm glass-card rounded-2xl p-6 border border-emerald-500/50 shadow-2xl text-center space-y-4 relative overflow-hidden bg-gradient-to-b from-indigo-950/60 via-zinc-900 to-zinc-950"
      >
        {/* Top Decorative Ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Heart Handshake Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-indigo-600 to-blue-600 p-0.5 mx-auto shadow-xl shadow-emerald-500/30">
          <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-emerald-400">
            <HeartHandshake className="w-8 h-8 animate-bounce" />
          </div>
        </div>

        {/* Title & Threshold Reached Celebration */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-300" />
            THREHSOLD REACHED • THRIVING STATUS RESTORED
          </span>
          <h3 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Hurray! Back On Track! 🎉
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed pt-1">
            You hit the recovery threshold! Your status is officially updated from <strong className="text-amber-400">Recovering</strong> to <strong className="text-emerald-400">Thriving (88%)</strong>!
          </p>
        </div>

        {/* Animated Threshold Reached Visual Card */}
        <div className="bg-zinc-950/90 rounded-xl p-3.5 border border-emerald-500/30 text-left space-y-2.5 relative">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium">Momentum State Update:</span>
            <div className="flex items-center gap-1 font-bold">
              <span className="text-amber-400 line-through text-[11px]">62% Recovering</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-xs">88% Thriving!</span>
            </div>
          </div>

          {/* Animated Progress Bar Reaching Threshold */}
          <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: '62%' }}
              animate={{ width: '88%' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-400 rounded-full shadow-lg shadow-emerald-500/50"
            />
          </div>

          {/* Habit Loop Note */}
          <div className="flex items-center gap-2 text-[11px] text-emerald-200 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Day {dayId} proof logged. Consistency restored with ZERO penalty!</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleGoToDashboard}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-indigo-600 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>View Updated Thriving Dashboard</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs border border-zinc-800 transition-all"
          >
            Stay on Day Page
          </button>
        </div>
      </motion.div>
    </div>
  );
};
