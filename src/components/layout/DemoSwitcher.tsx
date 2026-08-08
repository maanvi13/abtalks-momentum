import React, { useState } from 'react';
import { Settings2, RotateCcw, X, Check, Play, Sparkles, Rocket } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';
import { useTour } from '../../context/TourContext';
import { useSimulator } from '../../context/SimulatorContext';
import { DemoStateMode } from '../../types';

export const DemoSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeDemoMode, selectDemoState, resetToDefault } = useDemoState();
  const { startStateWalkthrough, startTour } = useTour();
  const { startSimulator } = useSimulator();

  const options: { mode: DemoStateMode; label: string; icon: string; desc: string }[] = [
    { mode: 'new', label: 'New Student', icon: '🌱', desc: 'Day 1 setup, 15% initial momentum' },
    { mode: 'building', label: 'Building Momentum', icon: '🔥', desc: 'Day 12 active, 88% momentum' },
    { mode: 'recovering', label: 'Momentum Recovering', icon: '💙', desc: 'Non-punitive recovery mode after exams' },
    { mode: 'empty', label: 'Empty Profile', icon: '👤', desc: 'Locked recruiter snapshot checklist' },
    { mode: 'graduate', label: 'Graduate (Day 60)', icon: '🎓', desc: '100% completion & downloadable PDF' },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Drawer Toggle Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-pill px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-semibold shadow-2xl text-blue-400 border border-blue-500/30 hover:border-blue-500/60 transition-all hover:scale-105 active:scale-95"
      >
        <Settings2 className="w-4 h-4 animate-spin-slow" />
        <span>Demo State</span>
      </button>

      {/* Modal / Popover Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-4 sm:items-center">
          <div className="w-full max-w-sm glass-card rounded-2xl p-5 border border-zinc-700/60 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Settings2 className="w-4 h-4 text-blue-400" />
                  Select Demo Journey State
                </h3>
                <p className="text-[11px] text-zinc-400">Switch mock states or play automated simulations</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Interactive Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  startSimulator();
                }}
                className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600/40 hover:to-blue-600/40 border border-purple-500/40 text-purple-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>Play Simulator</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  startTour();
                }}
                className="py-2 px-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 text-blue-400" />
                <span>Product Tour</span>
              </button>
            </div>

            {/* List of 5 Demo States */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {options.map((opt) => {
                const isSelected = activeDemoMode === opt.mode;
                return (
                  <div
                    key={opt.mode}
                    className={`p-2 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500/50 text-white'
                        : 'bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/40'
                    }`}
                  >
                    <button
                      onClick={() => {
                        selectDemoState(opt.mode);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2.5 text-left flex-1 min-w-0"
                    >
                      <span className="text-base shrink-0">{opt.icon}</span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold flex items-center gap-1 truncate">
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3 h-3 text-blue-400 shrink-0" />}
                        </div>
                        <div className="text-[9px] text-zinc-400 truncate">{opt.desc}</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        startStateWalkthrough(opt.mode);
                      }}
                      className="ml-2 px-2 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 text-[9px] font-bold flex items-center gap-1 shrink-0 transition-all hover:scale-105"
                      title={`Play interactive walkthrough for ${opt.label}`}
                    >
                      <Play className="w-2.5 h-2.5 fill-blue-400" />
                      <span>Demo</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => {
                  resetToDefault();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-[11px] font-medium border border-zinc-700/50 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Local Storage State
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
