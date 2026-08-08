import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useDemoState } from '../context/DemoStateContext';
import { SubmissionCard } from '../components/challenge/SubmissionCard';

export const ChallengePage: React.FC = () => {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();
  const { getTaskById, tasks } = useDemoState();

  const idNumber = parseInt(dayId || '12', 10);
  const task = getTaskById(idNumber) || tasks[0];

  const prevDay = idNumber > 1 ? idNumber - 1 : null;
  const nextDay = idNumber < 60 ? idNumber + 1 : null;

  return (
    <div className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-300">
      {/* Top Header & Day Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>

        {/* Prev / Next Day controls */}
        <div className="flex items-center gap-1">
          {prevDay && (
            <button
              onClick={() => navigate(`/day/${prevDay}`)}
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all text-xs flex items-center gap-1"
              title={`Day ${prevDay}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Day {prevDay}</span>
            </button>
          )}

          {nextDay && (
            <button
              onClick={() => navigate(`/day/${nextDay}`)}
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all text-xs flex items-center gap-1"
              title={`Day ${nextDay}`}
            >
              <span>Day {nextDay}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Task Banner */}
      <div data-tour="challenge-banner" className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
            Day {task.id} — {task.category}
          </span>

          <div className="flex items-center gap-1 text-zinc-400 text-[11px] font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{task.estimatedMinutes} mins estimated</span>
          </div>
        </div>

        <div>
          <h1 className="text-lg font-extrabold text-white tracking-tight leading-snug">
            {task.title}
          </h1>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            {task.subtitle}
          </p>
        </div>

        {task.isCompleted && (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Completed & Recorded in Recruiter Snapshot proof.</span>
          </div>
        )}
      </div>

      {/* Challenge Description & Markdown Content */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-white border-b border-zinc-800 pb-2.5">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>Challenge Requirements & Overview</span>
        </div>

        <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
          {task.description}
        </p>

        {/* Learning Objectives Checklist */}
        {task.learningObjectives && task.learningObjectives.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-zinc-800/80">
            <h4 className="text-xs font-bold text-zinc-200">Learning Objectives:</h4>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {task.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resource Links */}
        {task.resources && task.resources.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-zinc-800/80">
            <h4 className="text-xs font-bold text-zinc-200">Helpful Resources:</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {task.resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-blue-400 text-[11px] font-medium transition-colors"
                >
                  <span>{res.name}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Submission Form (Dual Proof + Reflection + Mood + Confetti) */}
      <SubmissionCard task={task} />
    </div>
  );
};
