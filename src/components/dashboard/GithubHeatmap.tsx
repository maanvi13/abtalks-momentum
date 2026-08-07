import React from 'react';
import { GitCommit, Github } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';

export const GithubHeatmap: React.FC = () => {
  const { student, tasks } = useDemoState();

  // Create 60 days contribution cells
  const contributionCells = tasks.slice(0, 60).map((t, idx) => {
    let intensity = 'bg-zinc-900 border-zinc-800';
    if (t.isCompleted) {
      // Vary green shades to look like GitHub heatmap
      if (idx % 3 === 0) intensity = 'bg-emerald-500 border-emerald-400';
      else if (idx % 2 === 0) intensity = 'bg-emerald-600 border-emerald-500';
      else intensity = 'bg-emerald-700 border-emerald-600';
    }
    return { day: t.id, completed: t.isCompleted, intensity };
  });

  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">GitHub Contribution Matrix</h2>
            <p className="text-[11px] text-zinc-400">60 days of verified commit proof</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <GitCommit className="w-3.5 h-3.5" />
          <span>{student.completedDaysCount} Contributions</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 space-y-2">
        <div className="grid grid-cols-12 gap-1.5">
          {contributionCells.map((c) => (
            <div
              key={c.day}
              title={`Day ${c.day}: ${c.completed ? '1 Contribution' : 'No submission'}`}
              className={`h-4 rounded-[4px] border ${c.intensity} transition-all hover:scale-125`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
          <span>Day 1</span>
          <span>Day 30</span>
          <span>Day 60</span>
        </div>
      </div>
    </div>
  );
};
