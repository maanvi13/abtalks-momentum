import React, { useState } from 'react';
import { User, Github, Linkedin, ShieldCheck, Save, CheckCircle2 } from 'lucide-react';
import { useDemoState } from '../context/DemoStateContext';

export const ProfilePage: React.FC = () => {
  const { student, updateProfile } = useDemoState();

  const [name, setName] = useState(student.name || '');
  const [handle, setHandle] = useState(student.handle || '');
  const [roleTitle, setRoleTitle] = useState(student.roleTitle || '');
  const [bio, setBio] = useState(student.bio || '');
  const [githubUrl, setGithubUrl] = useState(student.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(student.linkedinUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      handle,
      roleTitle,
      bio,
      githubUrl,
      linkedinUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Developer Profile Setup
          </h1>
          <p className="text-xs text-zinc-400">Connect your profiles to unlock Recruiter Verification</p>
        </div>

        {student.isProfileComplete && (
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Profile Complete
          </span>
        )}
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile updated! Recruiter Snapshot state recalculated.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-5 border border-zinc-800 space-y-4 text-xs">
        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-zinc-300">Full Name</label>
          <input
            type="text"
            required
            placeholder="Aarav Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-zinc-300">Username / Handle</label>
            <input
              type="text"
              required
              placeholder="aarav_codes"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-zinc-300">Target Role Title</label>
            <input
              type="text"
              required
              placeholder="Full Stack Engineering Intern"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-zinc-300">Developer Bio</label>
          <textarea
            rows={2}
            placeholder="CS student building web applications and participating in the ABTalks 60-day challenge."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-zinc-400" />
            GitHub Profile URL
          </label>
          <input
            type="url"
            placeholder="https://github.com/your-username"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/your-username"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Details</span>
        </button>
      </form>
    </div>
  );
};
