import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, AlertTriangle, ArrowDown, HeartHandshake } from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const CalendarInactivityVisualizer: React.FC = () => {
  const { isSimulating, currentSimStep } = useSimulator();

  const [simulatedDropScore, setSimulatedDropScore] = useState(92);
  const [skippedDays, setSkippedDays] = useState<number[]>([]);

  useEffect(() => {
    if (!isSimulating || currentSimStep?.stepNumber !== 4) {
      setSimulatedDropScore(92);
      setSkippedDays([]);
      return;
    }

    // Step 4 Simulation sequence: Skip Day 21 (88%), Skip Day 22 (78%), Skip Day 23 (64%)
    const timer1 = setTimeout(() => {
      setSkippedDays([21]);
      setSimulatedDropScore(88);
    }, 1000);

    const timer2 = setTimeout(() => {
      setSkippedDays([21, 22]);
      setSimulatedDropScore(78);
    }, 2200);

    const timer3 = setTimeout(() => {
      setSkippedDays([21, 22, 23]);
      setSimulatedDropScore(64);
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isSimulating, currentSimStep]);

  if (!isSimulating || currentSimStep?.stepNumber !== 4) return null;

  const calendarDays = [
    { day: 19, status: 'completed' },
    { day: 20, status: 'completed' },
    { day: 21, status: skippedDays.includes(21) ? 'skipped' : 'upcoming' },
    { day: 22, status: skippedDays.includes(22) ? 'skipped' : 'upcoming' },
    { day: 23, status: skippedDays.includes(23) ? 'skipped' : 'upcoming' },
    { day: 24, status: 'upcoming' },
    { day: 25, status: 'upcoming' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -15, scale: 0.95 }}
        className="fixed top-14 sm:top-16 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-sm glass-card rounded-2xl p-3 sm:p-4 border border-amber-500/50 shadow-2xl space-y-2.5 bg-zinc-950/95"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Calendar className="w-4 h-4" />
            <span>Simulated Exam Inactivity</span>
          </div>
          <span className="text-[9px] bg-amber-500/15 text-amber-300 border border-amber-500/30 font-extrabold px-2 py-0.2 rounded-full">
            LIVE SIMULATION
          </span>
        </div>

        {/* Mini Calendar Row */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarDays.map((item) => (
            <div
              key={item.day}
              className={`p-1 sm:p-1.5 rounded-lg border text-xs flex flex-col items-center justify-center transition-all ${
                item.status === 'completed'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 font-semibold'
                  : item.status === 'skipped'
                  ? 'bg-red-500/20 border-red-500/40 text-red-300 font-extrabold shadow-md scale-105'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500'
              }`}
            >
              <span className="text-[8px] uppercase text-zinc-400 font-mono">Day</span>
              <span className={item.status === 'skipped' ? 'line-through decoration-red-500 text-red-200' : ''}>
                {item.day}
              </span>
              {item.status === 'skipped' && <span className="text-[7px] text-red-400 font-mono">SKIPPED</span>}
            </div>
          ))}
        </div>

        {/* Live Score Drop Visualizer */}
        <div className="bg-zinc-900/90 rounded-xl p-2 border border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-white">Score Drop</div>
              <div className="text-[9px] text-zinc-400">Zero streak penalty!</div>
            </div>
          </div>

          <div className="flex items-center gap-1 font-extrabold text-xs">
            <span className="text-zinc-500 line-through text-[10px]">92%</span>
            <ArrowDown className="w-3 h-3 text-amber-400 animate-bounce" />
            <span className="text-amber-400">{simulatedDropScore}%</span>
          </div>
        </div>

        {/* Encouraging Non-Punitive Philosophy Banner */}
        <div className="text-[10px] sm:text-[11px] text-indigo-200 bg-indigo-500/10 p-1.5 rounded-lg border border-indigo-500/20 flex items-center gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>"Momentum has slowed. Let's build it back together."</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
