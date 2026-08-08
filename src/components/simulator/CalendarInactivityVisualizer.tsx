import React, { useState, useEffect } from 'react';
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
    <div className="w-full bg-zinc-950/90 rounded-xl p-2.5 sm:p-3 border border-amber-500/40 space-y-2 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>Simulated Exam Week Inactivity</span>
        </div>
        <span className="text-[9px] bg-amber-500/15 text-amber-300 border border-amber-500/30 font-extrabold px-1.5 py-0.2 rounded">
          LIVE SIMULATION
        </span>
      </div>

      {/* Mini Calendar Row */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarDays.map((item) => (
          <div
            key={item.day}
            className={`p-1 rounded-lg border text-[10px] flex flex-col items-center justify-center transition-all ${
              item.status === 'completed'
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 font-semibold'
                : item.status === 'skipped'
                ? 'bg-red-500/20 border-red-500/40 text-red-300 font-extrabold shadow-md scale-105'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
          >
            <span className="text-[7px] uppercase text-zinc-400 font-mono">Day</span>
            <span className={item.status === 'skipped' ? 'line-through decoration-red-500 text-red-200' : ''}>
              {item.day}
            </span>
            {item.status === 'skipped' && <span className="text-[6px] text-red-400 font-mono">SKIPPED</span>}
          </div>
        ))}
      </div>

      {/* Live Score Drop Visualizer */}
      <div className="bg-zinc-900/90 rounded-xl p-2 border border-zinc-800 flex items-center justify-between text-[11px]">
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
    </div>
  );
};
