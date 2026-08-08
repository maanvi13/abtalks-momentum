import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, RotateCcw, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSimulator } from '../../context/SimulatorContext';
import { useDemoState } from '../../context/DemoStateContext';

export const SimulatorFinalModal: React.FC = () => {
  const { showFinalModal, closeFinalModal, restartSimulator } = useSimulator();
  const { selectDemoState } = useDemoState();
  const navigate = useNavigate();

  if (!showFinalModal) return null;

  const handleStartJourney = () => {
    selectDemoState('new');
    closeFinalModal();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-sm glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/50 shadow-2xl text-center space-y-5 bg-gradient-to-b from-purple-950/40 via-zinc-900 to-zinc-950 relative overflow-hidden"
      >
        {/* Top Glow Ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Badge Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-600 to-emerald-500 p-0.5 mx-auto shadow-xl shadow-purple-500/30">
          <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-purple-400">
            <HeartHandshake className="w-8 h-8 animate-bounce-slow" />
          </div>
        </div>

        {/* Titles & Core Habit Reflection Quote */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Simulation Complete</span>
          </div>

          <h2 className="text-xl font-extrabold text-white tracking-tight leading-tight">
            You didn't just finish a challenge.
          </h2>
          <p className="text-sm font-bold text-purple-300">You built a habit.</p>

          <div className="pt-2">
            <p className="text-xs text-zinc-300 italic font-serif bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 leading-relaxed">
              "Build Momentum. Not Pressure."
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleStartJourney}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            <span>Start My Journey</span>
          </button>

          <button
            onClick={() => {
              closeFinalModal();
              restartSimulator();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs border border-zinc-800 transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Momentum Simulator</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
