import React from 'react';
import { Trophy, Share2, Download, Star } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';
import { generateGraduatePdfReport } from '../../utils/generatePdfReport';

export const GraduateCelebrationBanner: React.FC = () => {
  const { student, achievements } = useDemoState();
  if (student.completedDaysCount < 60 && student.momentumStatus !== 'Mastered') return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Completed ABTalks 60-Day Momentum Challenge',
        text: 'I just completed all 60 days of the ABTalks Coding Challenge! Built 15 real projects & reached 100% Momentum.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Journey share link copied to clipboard!');
    }
  };

  const handleDownloadReport = () => {
    generateGraduatePdfReport(student, achievements);
  };

  return (
    <div data-tour="graduate-banner" className="relative rounded-2xl p-6 bg-gradient-to-br from-amber-500/15 via-purple-600/15 to-blue-600/15 border border-amber-500/40 shadow-2xl space-y-4 overflow-hidden">
      {/* Background Decorative Ambient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Trophy className="w-6 h-6 text-zinc-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-300" />
                Challenge Graduate
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white tracking-tight mt-0.5">
              60-Day Champion Transformation
            </h2>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-300 leading-relaxed relative z-10">
        Congratulations <strong className="text-white font-semibold">{student.name}</strong>! You have successfully completed all 60 continuous daily coding challenges. You built a complete recruiter-ready portfolio, logged 60 daily wins, and demonstrated world-class developer discipline.
      </p>

      {/* Grid Stats */}
      <div className="grid grid-cols-3 gap-2 relative z-10 text-center">
        <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
          <div className="text-sm font-extrabold text-amber-400">100%</div>
          <div className="text-[10px] text-zinc-400">Momentum</div>
        </div>
        <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
          <div className="text-sm font-extrabold text-emerald-400">60 / 60</div>
          <div className="text-[10px] text-zinc-400">Days Logged</div>
        </div>
        <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
          <div className="text-sm font-extrabold text-blue-400">{student.recruiterViewCount || 48} Recruiter</div>
          <div className="text-[10px] text-zinc-400">Views</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 relative z-10">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Journey</span>
        </button>

        <button
          onClick={handleDownloadReport}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs border border-zinc-700/60 transition-all hover:border-amber-500/40"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Download Journey PDF</span>
        </button>
      </div>
    </div>
  );
};
