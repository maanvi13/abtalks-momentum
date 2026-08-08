import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Sparkles, Play } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';
import { useSimulator } from '../../context/SimulatorContext';

export const Navbar: React.FC = () => {
  const { student, activeDemoMode } = useDemoState();
  const { startSimulator, isSimulating } = useSimulator();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full glass-nav px-4 py-3 flex items-center justify-between transition-all duration-300">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
            ABTalks <span className="text-blue-500 font-semibold text-xs px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">Momentum</span>
          </span>
        </div>
      </Link>

      {/* Right Action / Mini Momentum Badge & Simulator Launcher */}
      <div className="flex items-center gap-2">
        {/* Momentum Simulator Button */}
        {!isSimulating && (
          <button
            onClick={startSimulator}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500/15 to-blue-500/15 hover:from-purple-500/25 hover:to-blue-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all hover:scale-105 shadow-sm shadow-purple-500/10"
            title="Launch Interactive 60-Day Momentum Simulator"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Simulator</span>
          </button>
        )}

        {location.pathname !== '/' && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill text-xs font-semibold">
            <Flame className={`w-3.5 h-3.5 ${student.momentumScore > 70 ? 'text-amber-400 fill-amber-400/20' : 'text-blue-400'}`} />
            <span className="text-zinc-200">{student.momentumScore}%</span>
          </div>
        )}

        {/* Demo State Badge Pill */}
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
          {activeDemoMode}
        </span>
      </div>
    </header>
  );
};
