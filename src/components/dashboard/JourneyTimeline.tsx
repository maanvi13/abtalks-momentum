import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';

export const JourneyTimeline: React.FC = () => {
  const { student, tasks } = useDemoState();
  const activeDay = student.currentDay || 1;

  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">60-Day Developer Journey</h2>
            <p className="text-[11px] text-zinc-400">Your step-by-step progress roadmap</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-zinc-400">
          Day {activeDay} / 60
        </span>
      </div>

      {/* 60 Days Matrix Grid (6 columns x 10 rows) */}
      <div className="space-y-2">
        <div className="grid grid-cols-10 gap-1.5 pt-1">
          {tasks.slice(0, 60).map((t) => {
            const isDone = t.isCompleted;
            const isCurrent = t.id === activeDay;

            return (
              <Link
                key={t.id}
                to={`/day/${t.id}`}
                title={`Day ${t.id}: ${t.title}`}
                className={`h-7 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                    : isCurrent
                    ? 'bg-blue-600 border border-blue-400 text-white shadow-md shadow-blue-600/30 animate-pulse'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                }`}
              >
                {t.id}
              </Link>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-zinc-400 pt-2 border-t border-zinc-800/60">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500/50 inline-block"></span>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-blue-600 border border-blue-400 inline-block"></span>
            <span>Current Day</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-zinc-900 border border-zinc-800 inline-block"></span>
            <span>Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};
