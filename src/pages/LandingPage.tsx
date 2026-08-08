import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, ShieldCheck, HeartHandshake, Trophy, CheckCircle2, XCircle, Rocket, Play } from 'lucide-react';
import { useDemoState } from '../context/DemoStateContext';
import { useSimulator } from '../context/SimulatorContext';

export const LandingPage: React.FC = () => {
  const { student } = useDemoState();
  const { startSimulator } = useSimulator();

  return (
    <div className="p-4 sm:p-5 space-y-6 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div
        data-tour="landing-hero"
        className="relative rounded-2xl p-6 bg-gradient-to-br from-blue-900/30 via-zinc-900 to-purple-900/20 border border-zinc-800 space-y-4 overflow-hidden text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABTalks 60-Day Coding Challenge Redesign</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          Build Momentum, <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Not Pressure.
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
          Designed for late-night college coders. Replaces anxiety-inducing streak maintenance with sustainable progress, wins logging, and recruiter proof.
        </p>

        {/* Hero CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 items-center justify-center">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <Rocket className="w-4 h-4" />
            <span>Start Your Journey</span>
          </Link>

          <button
            onClick={startSimulator}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-purple-900/40 via-zinc-900 to-blue-900/40 hover:from-purple-900/60 hover:to-blue-900/60 text-purple-300 font-bold text-xs border border-purple-500/40 hover:border-purple-500/80 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/15 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>✨ See Momentum in Action</span>
          </button>
        </div>
      </div>

      {/* Comparison: Traditional Streaks vs ABTalks Momentum */}
      <div data-tour="landing-comparison" className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4">
        <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400" />
          Why Redesign the Streak Model?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Traditional Streaks */}
          <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-red-400">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>Traditional Apps (Punitive)</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-zinc-400">
              <li>• Miss 1 day = Lose all streak progress</li>
              <li>• Creates guilt, burnout & abandon rate</li>
              <li>• Focuses purely on daily login checkmarks</li>
              <li>• No visible proof for recruiters</li>
            </ul>
          </div>

          {/* ABTalks Momentum */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>ABTalks Momentum (Encouraging)</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-zinc-300">
              <li>• Momentum slows down, never resets to zero</li>
              <li>• Always offers a clear recovery path</li>
              <li>• Focuses on reflection ("Today's Win")</li>
              <li>• Verified Recruiter Snapshot proof</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card p-4 rounded-xl border border-zinc-800 space-y-1.5">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 w-fit">
            <Flame className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Momentum Score</h3>
          <p className="text-[10px] text-zinc-400 leading-normal">Dynamic 0–100% score rewarding consistency.</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-zinc-800 space-y-1.5">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 w-fit">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Recruiter Snapshot</h3>
          <p className="text-[10px] text-zinc-400 leading-normal">Shareable verified dev proof for hiring managers.</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-zinc-800 space-y-1.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Today's Win</h3>
          <p className="text-[10px] text-zinc-400 leading-normal">Log daily reflections & mood tracking.</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-zinc-800 space-y-1.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 w-fit">
            <Trophy className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Achievement Shelf</h3>
          <p className="text-[10px] text-zinc-400 leading-normal">Milestone badges earned through progress.</p>
        </div>
      </div>
    </div>
  );
};
