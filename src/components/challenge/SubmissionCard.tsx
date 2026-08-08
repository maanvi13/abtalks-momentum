import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Github, Linkedin, Sparkles, CheckCircle2, HeartHandshake, AlertCircle } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';
import { useTour } from '../../context/TourContext';
import { MOOD_OPTIONS } from '../../data/mockData';
import { ChallengeTask } from '../../types';

interface SubmissionCardProps {
  task: ChallengeTask;
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({ task }) => {
  const { submitDayChallenge, student } = useDemoState();
  const { isTourActive, currentStep } = useTour();

  const [githubUrl, setGithubUrl] = useState(task.githubSubmissionUrl || student.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(task.linkedinSubmissionUrl || student.linkedinUrl || '');
  const [winLog, setWinLog] = useState(task.winLog || '');
  const [selectedMood, setSelectedMood] = useState(task.moodSelected || 'energized');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auto-Fill Form & Trigger Submission during Tour Step 7
  useEffect(() => {
    if (isTourActive && currentStep && currentStep.autoFillForm) {
      setGithubUrl('https://github.com/rohanm-dev/day-12-state-engine');
      setLinkedinUrl('https://linkedin.com/posts/rohanm-dev-day12-challenge');
      setWinLog('Mastered React Context state engines & dynamic component architecture!');
      setSelectedMood('focused');

      // Auto trigger submit after 1.2 second typing delay
      const autoSubmitTimer = setTimeout(() => {
        setIsSubmitting(true);
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#7C3AED', '#22C55E', '#F97316', '#FACC15'],
        });

        setTimeout(() => {
          submitDayChallenge({
            dayId: task.id,
            githubUrl: 'https://github.com/rohanm-dev/day-12-state-engine',
            linkedinUrl: 'https://linkedin.com/posts/rohanm-dev-day12-challenge',
            winLog: 'Mastered React Context state engines & dynamic component architecture!',
            mood: 'focused',
          });
          setIsSubmitting(false);
        }, 500);
      }, 1200);

      return () => clearTimeout(autoSubmitTimer);
    }
  }, [isTourActive, currentStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!githubUrl.trim()) {
      setErrorMsg('Please enter a GitHub repository or pull request link');
      return;
    }
    if (!linkedinUrl.trim()) {
      setErrorMsg('Please enter a LinkedIn post update link');
      return;
    }

    setIsSubmitting(true);

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#7C3AED', '#22C55E', '#F97316', '#FACC15'],
    });

    setTimeout(() => {
      submitDayChallenge({
        dayId: task.id,
        githubUrl: githubUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
        winLog: winLog.trim(),
        mood: selectedMood,
      });
      setIsSubmitting(false);

      if (!isTourActive && !student.showMilestoneCelebration) {
        setShowSuccessModal(true);
      }
    }, 400);
  };

  return (
    <div data-tour="submission-form" className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Submit Proof & Today's Win
          </h3>
          <p className="text-[11px] text-zinc-400">Lock in your progress and reflect on what you learned</p>
        </div>
        {task.isCompleted && (
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        )}
      </div>

      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* GitHub URL Input */}
        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-zinc-400" />
            GitHub Repository / Code Link <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            required
            placeholder="https://github.com/username/repo-day-12"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* LinkedIn URL Input */}
        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            LinkedIn Post Update Link <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            required
            placeholder="https://linkedin.com/posts/username-day12-challenge"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Today's Win Reflection */}
        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            Today's Win (Reflection)
          </label>
          <textarea
            rows={3}
            placeholder="What key concept clicked today? (e.g. Mastered React state context and built dynamic form handlers!)"
            value={winLog}
            onChange={(e) => setWinLog(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Mood Selector */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-zinc-300">
            How are you feeling after completing today?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MOOD_OPTIONS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  type="button"
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${
                    isSelected
                      ? mood.color + ' font-bold shadow-sm'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <span className="text-base">{mood.emoji}</span>
                  <span className="text-[11px]">{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all transform active:scale-98 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Recording Submission...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{task.isCompleted ? 'Update Day Submission' : 'Complete Day & Build Momentum'}</span>
            </>
          )}
        </button>
      </form>

      {/* Standard Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm glass-card rounded-2xl p-6 border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-white">Day {task.id} Complete! 🎉</h3>
              <p className="text-xs text-zinc-300 mt-1">
                Your momentum score increased! Great work pushing forward.
              </p>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all"
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
