import React from 'react';
import { Flame, HeartHandshake, Sparkles, Play, ShieldCheck } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';
import { useTour } from '../../context/TourContext';

export const MomentumCard: React.FC = () => {
  const { student } = useDemoState();
  const { startStateWalkthrough } = useTour();
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
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${isRecovering ? 'bg-indigo-500/15 text-indigo-400' : 'bg-blue-500/15 text-blue-400'}`}>
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Momentum Score</h2>
            <p className="text-[11px] text-zinc-400">Consistency over perfection</p>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
            isRecovering
              ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40 animate-pulse'
              : score >= 80
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
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
            <span className="text-2xl font-extrabold text-white tracking-tight">{score}%</span>
            <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold">Momentum</span>
          </div>
        </div>

        {/* Stat Breakdown Pills */}
        <div className="flex-1 space-y-2">
          <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Completed Days</span>
            <span className="font-bold text-white">{student.completedDaysCount} / 60</span>
          </div>
          <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Wins Logged</span>
            <span className="font-bold text-emerald-400">{student.winsLoggedCount}</span>
          </div>
        </div>
      </div>

      {/* Special Recovery Video / Interactive Animated Banner */}
      {isRecovering && (
        <div className="rounded-xl p-3.5 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-zinc-900 border border-indigo-500/40 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                <HeartHandshake className="w-4 h-4 animate-bounce-slow" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  <span>Getting Back On Track Showcase</span>
                  <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-1.5 py-0.2 rounded font-mono">
                    LIVE RECOVERY
                  </span>
                </h4>
                <p className="text-[10px] text-indigo-200/90">Completing 1 task today restores Momentum to 88%!</p>
              </div>
            </div>

            <button
              onClick={() => startStateWalkthrough('recovering')}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1 transition-all hover:scale-105 shrink-0"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      )}

      {/* Non-Punitive Motivational Banner */}
      <div
        className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs transition-colors ${
          isRecovering
            ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200'
            : 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
        }`}
      >
        {isRecovering ? (
          <HeartHandshake className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        ) : (
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        )}
        <p className="leading-relaxed text-[11px] font-medium">{student.momentumMessage}</p>
      </div>
    </div>
  );
};
