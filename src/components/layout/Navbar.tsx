import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Sparkles } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';
import { useSimulator } from '../../context/SimulatorContext';

export const Navbar: React.FC = () => {
  const { student, activeDemoMode } = useDemoState();
  const { startSimulator, isSimulating } = useSimulator();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full glass-nav px-3.5 sm:px-4 py-3 flex items-center justify-between transition-all duration-300">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
            ABTalks <span className="text-blue-400 font-bold text-xs px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/30">Momentum</span>
          </span>
        </div>
      </Link>

      {/* Right Action / Mini Momentum Badge & Simulator Launcher */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Momentum Simulator Button */}
        {!isSimulating && (
          <button
            onClick={startSimulator}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all hover:scale-105 shadow-sm shadow-purple-500/10"
            title="Launch Interactive 60-Day Momentum Simulator"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Simulator</span>
          </button>
        )}

        {location.pathname !== '/' && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill text-xs font-bold">
            <Flame className={`w-3.5 h-3.5 ${student.momentumScore > 70 ? 'text-amber-400 fill-amber-400/20' : 'text-blue-400'}`} />
            <span className="text-zinc-100">{student.momentumScore}%</span>
          </div>
        )}

        {/* Demo State Badge Pill */}
        <span className="hidden sm:inline-block text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
          {activeDemoMode}
        </span>
      </div>
    </header>
  );
};
