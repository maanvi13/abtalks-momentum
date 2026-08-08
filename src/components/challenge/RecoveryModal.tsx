import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, Sparkles, Flame, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecoveryModalProps {
  onClose: () => void;
  dayId: number;
}

export const RecoveryModal: React.FC<RecoveryModalProps> = ({ onClose, dayId }) => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-sm glass-card rounded-2xl p-6 border border-indigo-500/50 shadow-2xl text-center space-y-4 relative overflow-hidden bg-gradient-to-b from-indigo-950/40 via-zinc-900 to-zinc-950"
      >
        {/* Top Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Heart Handshake Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-600 p-0.5 mx-auto shadow-xl shadow-indigo-500/30">
          <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-indigo-400">
            <HeartHandshake className="w-8 h-8 animate-bounce-slow" />
          </div>
        </div>

        {/* Title & Encouraging Message */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-300" />
            Back On Track Guaranteed
          </span>
          <h3 className="text-xl font-extrabold text-white tracking-tight mt-1">
            Welcome Back On Track! 🎉
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed pt-1">
            You proved that momentum is built by <strong className="text-white">returning</strong>, not by being perfect. Missing days never erases your hard work!
          </p>
        </div>

        {/* Animated Recovery Visual Video Showcase Card */}
        <div className="bg-zinc-950/90 rounded-xl p-3.5 border border-indigo-500/30 text-left space-y-2.5 relative">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium">Momentum Score Rebuilt:</span>
            <div className="flex items-center gap-1 font-bold">
              <span className="text-zinc-400 line-through">62%</span>
              <ArrowRight className="w-3 h-3 text-indigo-400" />
              <span className="text-emerald-400">88% (Thriving!)</span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: '62%' }}
              animate={{ width: '88%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 rounded-full"
            />
          </div>

          {/* Habit Loop Visual Note */}
          <div className="flex items-center gap-2 text-[11px] text-indigo-200 bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Day {dayId} proof recorded. Consistency habit restored!</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleGoToDashboard}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>View Updated Dashboard</span>
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
