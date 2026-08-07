import React, { useState } from 'react';
import { Award, Trophy, Zap, Share2, Footprints, ShieldCheck, Code2, Moon, Lock, CheckCircle2 } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';

const ICON_MAP: Record<string, React.ElementType> = {
  Footprints,
  Zap,
  Share2,
  ShieldCheck,
  Code2,
  Award,
  Moon,
  Trophy,
};

const UNLOCK_REQUIREMENTS: Record<string, string> = {
  first_step: 'Complete Day 1',
  momentum_starter: 'Reach 50% Momentum',
  social_proof: 'Connect GitHub & LinkedIn',
  week_one: 'Complete 7 days',
  day_12_master: 'Submit Day 12 Challenge',
  halfway_hero: 'Complete 30 days',
  night_owl: 'Log 10 late-night wins',
  graduate_crown: 'Complete 60 days',
};

export const AchievementShelf: React.FC = () => {
  const { achievements } = useDemoState();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;

  // Sort achievements: Unlocked first, then locked
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.isUnlocked === b.isUnlocked) return 0;
    return a.isUnlocked ? -1 : 1;
  });

  const filteredAchievements = sortedAchievements.filter(ach => {
    if (filter === 'unlocked') return ach.isUnlocked;
    if (filter === 'locked') return !ach.isUnlocked;
    return true;
  });

  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Achievement Shelf</h2>
            <p className="text-[11px] text-zinc-400">Milestone badges earned through progress</p>
          </div>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
          {unlockedCount} / {achievements.length} Unlocked
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-semibold">
        {(['all', 'unlocked', 'locked'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-1.5 rounded-lg capitalize transition-all text-center text-[11px] ${
              filter === tab
                ? 'bg-zinc-800 text-white font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab} {tab === 'unlocked' ? `(${unlockedCount})` : tab === 'locked' ? `(${achievements.length - unlockedCount})` : ''}
          </button>
        ))}
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {filteredAchievements.map((ach) => {
          const IconComp = ICON_MAP[ach.iconName] || Award;
          const isUnlocked = ach.isUnlocked;
          const unlockHint = UNLOCK_REQUIREMENTS[ach.id] || 'Complete milestone';

          return (
            <div
              key={ach.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 relative ${
                isUnlocked
                  ? 'bg-zinc-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5 hover:border-amber-500/70'
                  : 'bg-zinc-950/60 border-zinc-800/80'
              }`}
            >
              {/* Badge Icon Box */}
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  isUnlocked
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-md shadow-amber-500/10'
                    : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                }`}
              >
                {isUnlocked ? <IconComp className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
              </div>

              {/* Badge Text Content */}
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className={`text-xs font-bold leading-tight ${isUnlocked ? 'text-white' : 'text-zinc-400'}`}>
                    {ach.title}
                  </h4>
                  {isUnlocked && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                </div>

                <p className="text-[11px] text-zinc-400 leading-normal">{ach.description}</p>

                {/* Status Indicator Pill */}
                <div className="pt-0.5">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      ✨ Unlocked {ach.unlockedAt ? `(${ach.unlockedAt})` : ''}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500 font-medium bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">
                      🔒 Locked • {unlockHint}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
