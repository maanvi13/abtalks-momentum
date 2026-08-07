import React from 'react';
import { MomentumCard } from '../components/dashboard/MomentumCard';
import { TodaysMission } from '../components/dashboard/TodaysMission';
import { RecruiterSnapshot } from '../components/dashboard/RecruiterSnapshot';
import { AchievementShelf } from '../components/dashboard/AchievementShelf';
import { JourneyTimeline } from '../components/dashboard/JourneyTimeline';
import { GithubHeatmap } from '../components/dashboard/GithubHeatmap';
import { GraduateCelebrationBanner } from '../components/dashboard/GraduateCelebrationBanner';
import { useDemoState } from '../context/DemoStateContext';

export const DashboardPage: React.FC = () => {
  const { student } = useDemoState();

  return (
    <div className="p-4 sm:p-5 space-y-4 animate-in fade-in duration-300">
      {/* Student Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            Hey, {student.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs text-zinc-400">{student.roleTitle || 'Developer Student'}</p>
        </div>

        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-md">
          <img
            src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={student.name}
            className="w-full h-full object-cover rounded-full bg-zinc-900"
          />
        </div>
      </div>

      {/* Special Graduate Celebration Banner (renders if Day 60 finished) */}
      <GraduateCelebrationBanner />

      {/* Main Core Widgets */}
      <MomentumCard />
      <TodaysMission />
      <RecruiterSnapshot />
      <GithubHeatmap />
      <AchievementShelf />
      <JourneyTimeline />
    </div>
  );
};
