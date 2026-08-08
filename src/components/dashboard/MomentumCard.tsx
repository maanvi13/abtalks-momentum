import React from 'react';
import { Flame, HeartHandshake, Sparkles, Layers } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';

export const MomentumCard: React.FC = () => {
  const { student } = useDemoState();
  const score = student.momentumScore || 0;
  const isRecovering = student.momentumStatus === 'Recovering';

  // SVG Ring calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div data-tour="momentum-card" className="glass-card rounded-2xl p-5 border border-zinc-800 relative overflow-hidden space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`p-2.5 rounded-xl ${isRecovering ? 'bg-indigo-500/15 text-indigo-400' : 'bg-blue-500/15 text-blue-400'}`}>
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Momentum Score</h2>
            <p className="text-xs text-zinc-400">Consistency over perfection</p>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border ${
            isRecovering
              ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40 animate-pulse'
              : score >= 80
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
              : 'bg-blue-500/15 text-blue-300 border-blue-500/40'
          }`}
        >
          {student.momentumStatus}
        </span>
      </div>

      {/* Center Score Ring & Stats */}
      <div className="flex items-center gap-5 pt-1">
        {/* Animated Circular Progress Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-zinc-800"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              className={`transition-all duration-1000 ease-out ${
                isRecovering ? 'stroke-indigo-500' : score >= 80 ? 'stroke-emerald-500' : 'stroke-blue-500'
              }`}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{score}%</span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Momentum</span>
          </div>
        </div>

        {/* Stat Breakdown Pills */}
        <div className="flex-1 space-y-2">
          <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-400 font-medium">Completed Days</span>
            <span className="font-extrabold text-white">{student.completedDaysCount} / 60</span>
          </div>
          <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-400 font-medium">Wins Logged</span>
            <span className="font-extrabold text-emerald-400">{student.winsLoggedCount}</span>
          </div>
        </div>
      </div>

      {/* Momentum State Allocation Ranges Legend */}
      <div className="pt-2 border-t border-zinc-800/80 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            Momentum Tiers
          </span>
          <span>Score Range</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div
            className={`p-2 rounded-xl border flex items-center justify-between transition-colors ${
              score >= 0 && score <= 25 && !isRecovering
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-200 font-bold'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
            }`}
          >
            <span>🌱 Starting</span>
            <span className="font-mono text-xs font-bold">0% – 25%</span>
          </div>

          <div
            className={`p-2 rounded-xl border flex items-center justify-between transition-colors ${
              score >= 26 && score <= 50 && !isRecovering
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-200 font-bold'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
            }`}
          >
            <span>🌤 Building</span>
            <span className="font-mono text-xs font-bold">26% – 50%</span>
          </div>

          <div
            className={`p-2 rounded-xl border flex items-center justify-between transition-colors ${
              isRecovering
                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200 font-bold'
                : score >= 51 && score <= 79
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-200 font-bold'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
            }`}
          >
            <span>{isRecovering ? '💙 Recovering' : '🔥 Growing'}</span>
            <span className="font-mono text-xs font-bold">{isRecovering ? '< 70%' : '51% – 79%'}</span>
          </div>

          <div
            className={`p-2 rounded-xl border flex items-center justify-between transition-colors ${
              score >= 80 && score <= 100 && !isRecovering
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-bold'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
            }`}
          >
            <span>🚀 Thriving</span>
            <span className="font-mono text-xs font-bold">80% – 100%</span>
          </div>
        </div>
      </div>

      {/* Non-Punitive Motivational Banner */}
      <div
        className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm transition-colors ${
          isRecovering
            ? 'bg-indigo-950/50 border-indigo-500/40 text-indigo-200'
            : 'bg-zinc-900/90 border-zinc-800 text-zinc-200'
        }`}
      >
        {isRecovering ? (
          <HeartHandshake className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        ) : (
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        )}
        <p className="leading-relaxed font-medium text-xs sm:text-sm">{student.momentumMessage}</p>
      </div>
    </div>
  );
};
