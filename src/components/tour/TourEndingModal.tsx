import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, RotateCcw, Rocket, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useTour } from '../../context/TourContext';

export const TourEndingModal: React.FC = () => {
  const { isEndingModalOpen, closeEndingModal, restartTour } = useTour();
  const navigate = useNavigate();

  if (!isEndingModalOpen) return null;

  const handleStartBuilding = () => {
    closeEndingModal();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm glass-card rounded-2xl p-6 border border-blue-500/40 text-center space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 mx-auto shadow-lg shadow-blue-500/30 flex items-center justify-center">
          <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-blue-400">
            <HeartHandshake className="w-7 h-7" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-white tracking-tight">
            Thank you for taking the tour! 🎉
          </h3>
          <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
            Our goal was not simply to redesign ABTalks. <br />
            <strong className="text-white font-semibold">
              We redesigned the learning journey by replacing pressure with momentum.
            </strong>
          </p>
        </div>

        {/* Feature Checkmarks Recap */}
        <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 text-left space-y-1.5 text-[11px] text-zinc-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Sustainable Momentum Score (No zero resets)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Verified Dual Proofs & Today's Win reflections</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Verified Recruiter Snapshot & PDF Certificate</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleStartBuilding}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            <span>Start Building</span>
          </button>

          <button
            onClick={restartTour}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs border border-zinc-800 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Restart Product Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
};
