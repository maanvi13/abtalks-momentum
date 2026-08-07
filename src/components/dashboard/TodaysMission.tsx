import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Target, CheckCircle2 } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';

export const TodaysMission: React.FC = () => {
  const { student, tasks } = useDemoState();
  const currentDayId = student.currentDay || 1;
  const currentTask = tasks.find(t => t.id === currentDayId) || tasks[0];
  const isCompleted = currentTask?.isCompleted;

  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-3 relative overflow-hidden group">
      {/* Background Accent Pill */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-600/20 transition-all" />

      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <Target className="w-3.5 h-3.5" />
          <span>Today's Mission — Day {currentTask.id}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{currentTask.estimatedMinutes} mins</span>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
          {currentTask.title}
        </h3>
        <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
          {currentTask.subtitle}
        </p>
      </div>

      {/* Footer CTA Button */}
      <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80">
        <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/50 font-medium">
          {currentTask.category}
        </span>

        <Link
          to={`/day/${currentTask.id}`}
          className={`flex items-center gap-1.5 text-xs font-semibold py-2 px-4 rounded-xl transition-all shadow-md ${
            isCompleted
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 hover:scale-105 active:scale-95'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Review Mission</span>
            </>
          ) : (
            <>
              <span>Start Mission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </Link>
      </div>
    </div>
  );
};
