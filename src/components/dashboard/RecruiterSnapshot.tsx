import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle, ExternalLink, ShieldCheck, Github, Linkedin, Eye } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';

export const RecruiterSnapshot: React.FC = () => {
  const { student } = useDemoState();

  // Unlock criteria
  const reqProfile = student.isProfileComplete;
  const reqGithub = Boolean(student.githubUrl);
  const reqLinkedin = Boolean(student.linkedinUrl);
  const reqChallenge = student.completedDaysCount >= 1;

  const completedReqs = [reqProfile, reqGithub, reqLinkedin, reqChallenge].filter(Boolean).length;
  const isUnlocked = completedReqs === 4;

  return (
    <div data-tour="recruiter-snapshot" className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              Recruiter Snapshot
              {isUnlocked && (
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold px-2 py-0.5 rounded-full">
                  Unlocked & Active
                </span>
              )}
            </h2>
            <p className="text-[11px] text-zinc-400">Verified portfolio digest for engineering recruiters</p>
          </div>
        </div>

        {student.recruiterViewCount !== undefined && isUnlocked && (
          <div className="flex items-center gap-1 text-xs text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 font-medium">
            <Eye className="w-3.5 h-3.5" />
            <span>{student.recruiterViewCount} views</span>
          </div>
        )}
      </div>

      {/* Unlocked State vs Locked Clear Preview */}
      {isUnlocked ? (
        <div className="bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 space-y-3">
          {/* Student Info Card */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5">
                <img
                  src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={student.name}
                  className="w-full h-full object-cover rounded-full bg-zinc-900"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{student.name}</h4>
                <p className="text-[11px] text-zinc-400">{student.roleTitle}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
              {student.completedDaysCount} Days Verified Proof
            </span>
          </div>

          {/* Social Proof Links */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href={student.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/50 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] font-medium">GitHub Profile</span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>

            <a
              href={student.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/50 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px] font-medium">LinkedIn Profile</span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
          </div>

          <div className="text-[11px] text-emerald-400/90 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Verified 100% submission proof rate. Ready for Internship & Junior Engineering interviews.</span>
          </div>
        </div>
      ) : (
        /* Clear High-Clarity Locked State with Progressive Unlock Checklist */
        <div className="rounded-xl border border-purple-500/30 p-4 space-y-3 bg-zinc-900/90 text-center">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mx-auto">
            <Lock className="w-5 h-5" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-white">Recruiter Snapshot Locked</h4>
            <p className="text-[11px] text-zinc-300 max-w-xs mx-auto mt-0.5 leading-relaxed">
              Complete your profile setup to unlock recruiter verification ({completedReqs}/4 tasks completed)
            </p>
          </div>

          {/* High-Clarity Unlock Checklist */}
          <div className="w-full space-y-2 text-left bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-[11px]">
            <div className="flex items-center justify-between text-zinc-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle className={`w-3.5 h-3.5 ${reqProfile ? 'text-emerald-400' : 'text-zinc-600'}`} />
                1. Complete Student Profile details
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle className={`w-3.5 h-3.5 ${reqGithub ? 'text-emerald-400' : 'text-zinc-600'}`} />
                2. Link GitHub Repository Account
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle className={`w-3.5 h-3.5 ${reqLinkedin ? 'text-emerald-400' : 'text-zinc-600'}`} />
                3. Link LinkedIn Profile URL
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle className={`w-3.5 h-3.5 ${reqChallenge ? 'text-emerald-400' : 'text-zinc-600'}`} />
                4. Complete your 1st coding challenge
              </span>
            </div>
          </div>

          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 py-2 px-4 rounded-xl transition-all shadow-lg shadow-purple-600/20"
          >
            Complete Profile Setup
          </Link>
        </div>
      )}
    </div>
  );
};
