import { StudentProfile, ChallengeTask, Achievement, DemoStateMode, MoodOption } from '../types';

export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'energized', emoji: '🔥', label: 'Energized', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300' },
  { id: 'focused', emoji: '🧠', label: 'In the Zone', color: 'border-blue-500/40 bg-blue-500/10 text-blue-300' },
  { id: 'proud', emoji: '🌟', label: 'Proud', color: 'border-purple-500/40 bg-purple-500/10 text-purple-300' },
  { id: 'learning', emoji: '💡', label: 'Learned a lot', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
  { id: 'tired', emoji: '🌙', label: 'Tired but Done', color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300' },
];

export const STUDENT_PRESETS: Record<DemoStateMode, StudentProfile> = {
  new: {
    name: 'Aarav Sharma',
    handle: 'aarav_codes',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    roleTitle: 'Aspiring Full Stack Engineer',
    bio: 'Computer Science student exploring React, Node, and building modern web products.',
    githubUrl: 'https://github.com/aarav-sharma-dev',
    linkedinUrl: 'https://linkedin.com/in/aarav-sharma-dev',
    currentDay: 1,
    momentumScore: 15,
    momentumStatus: 'Newcomer',
    momentumMessage: 'Welcome to your 60-day journey! Every small step counts towards building lasting momentum.',
    isProfileComplete: true,
    isGithubConnected: true,
    isLinkedinConnected: true,
    completedDaysCount: 0,
    winsLoggedCount: 0,
  },
  building: {
    name: 'Rohan Mehta',
    handle: 'rohan_dev',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    roleTitle: 'Frontend Engineering Intern',
    bio: 'Building scalable UI components. 12 days in and loving the late-night coding flow.',
    githubUrl: 'https://github.com/rohanm-dev',
    linkedinUrl: 'https://linkedin.com/in/rohanm-dev',
    currentDay: 12,
    momentumScore: 88,
    momentumStatus: 'Thriving',
    momentumMessage: 'Outstanding momentum! You have completed 12 consecutive challenges and recruiters are noticing your work.',
    isProfileComplete: true,
    isGithubConnected: true,
    isLinkedinConnected: true,
    completedDaysCount: 12,
    winsLoggedCount: 12,
    recruiterViewCount: 14,
  },
  recovering: {
    name: 'Priya Nair',
    handle: 'priya_codes',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    roleTitle: 'Software Development Student',
    bio: 'Balancing college exams and coding. Rebuilding my coding routine step by step.',
    githubUrl: 'https://github.com/priyanair-dev',
    linkedinUrl: 'https://linkedin.com/in/priyanair-dev',
    currentDay: 18,
    momentumScore: 62,
    momentumStatus: 'Recovering',
    momentumMessage: 'Momentum slowed down after a busy week of exams — and that is completely fine! Let\'s build it back together today.',
    isProfileComplete: true,
    isGithubConnected: true,
    isLinkedinConnected: true,
    completedDaysCount: 15,
    winsLoggedCount: 14,
    recruiterViewCount: 6,
  },
  empty: {
    name: 'New Student',
    handle: 'student_99',
    avatarUrl: '',
    roleTitle: 'CS Student',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
    currentDay: 1,
    momentumScore: 5,
    momentumStatus: 'Newcomer',
    momentumMessage: 'Setup your profile links to unlock your Recruiter Snapshot and start your 60-day journey!',
    isProfileComplete: false,
    isGithubConnected: false,
    isLinkedinConnected: false,
    completedDaysCount: 0,
    winsLoggedCount: 0,
  },
  graduate: {
    name: 'Ananya Verma',
    handle: 'ananya_v',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    roleTitle: 'Full-Stack Developer & ABTalks Graduate',
    bio: 'Completed the 60-Day ABTalks Momentum Challenge. Built 15 real projects & secured 2 software engineering interviews!',
    githubUrl: 'https://github.com/ananya-verma',
    linkedinUrl: 'https://linkedin.com/in/ananya-verma',
    currentDay: 60,
    momentumScore: 100,
    momentumStatus: 'Mastered',
    momentumMessage: '🎉 Congratulations! You completed all 60 days of the ABTalks Momentum Challenge. Your growth portfolio is recruiter-ready!',
    isProfileComplete: true,
    isGithubConnected: true,
    isLinkedinConnected: true,
    completedDaysCount: 60,
    winsLoggedCount: 60,
    graduateDate: '2026-08-01',
    recruiterViewCount: 48,
  },
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_step', title: 'First Step', description: 'Completed Day 1 of the challenge', iconName: 'Footprints', isUnlocked: true, category: 'milestone', unlockedAt: 'Day 1' },
  { id: 'momentum_starter', title: 'Ignition', description: 'Reached 50% Momentum Score', iconName: 'Zap', isUnlocked: true, category: 'streak', unlockedAt: 'Day 5' },
  { id: 'social_proof', title: 'Recruiter Ready', description: 'Connected GitHub & LinkedIn profiles', iconName: 'Share2', isUnlocked: true, category: 'social', unlockedAt: 'Day 2' },
  { id: 'week_one', title: 'Week 1 Survivor', description: 'Built consistency through your first 7 days', iconName: 'ShieldCheck', isUnlocked: true, category: 'milestone', unlockedAt: 'Day 7' },
  { id: 'day_12_master', title: 'State Architect', description: 'Mastered complex React state management on Day 12', iconName: 'Code2', isUnlocked: false, category: 'submission' },
  { id: 'halfway_hero', title: 'Halfway Mark', description: 'Completed 30 days of continuous learning', iconName: 'Award', isUnlocked: false, category: 'milestone' },
  { id: 'night_owl', title: 'Late Night Builder', description: 'Logged 10 wins after 10:00 PM', iconName: 'Moon', isUnlocked: true, category: 'streak', unlockedAt: 'Day 9' },
  { id: 'graduate_crown', title: '60-Day Champion', description: 'Finished the entire ABTalks 60-Day Momentum Challenge', iconName: 'Trophy', isUnlocked: false, category: 'milestone' },
];

export const MOCK_TASKS: ChallengeTask[] = [
  {
    id: 1,
    title: 'Modern HTML5 & Semantic Web Architecture',
    subtitle: 'Build accessible, modern document structures',
    category: 'Fundamentals',
    estimatedMinutes: 30,
    description: 'Understand the power of HTML5 semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`). You will restructure a legacy unsemantic div-soup layout into a clean, accessible layout that screen readers and search engine crawlers easily parse.',
    learningObjectives: [
      'Master semantic tags for layout hierarchy',
      'Implement proper ARIA roles and labels for accessibility',
      'Optimize HTML metadata for modern SEO and social sharing tags'
    ],
    resources: [
      { name: 'MDN Semantic HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics' },
      { name: 'WebAIM Accessibility Checklist', url: 'https://webaim.org/standards/wcag/checklist' }
    ],
    isCompleted: true,
    completedAt: '2026-06-08',
  },
  {
    id: 2,
    title: 'CSS Grid & Flexbox Mastery',
    subtitle: 'Responsive layout design without frameworks',
    category: 'Frontend',
    estimatedMinutes: 45,
    description: 'Construct responsive 2D layouts using CSS Grid and 1D alignments using Flexbox. Build a responsive product dashboard card grid that scales fluidly from 320px mobile screens to 4K desktop monitors without breaking layout structure.',
    learningObjectives: [
      'Understand `grid-template-areas` and `minmax()` functions',
      'Master Flexbox alignment properties (`justify-content`, `align-items`, `gap`)',
      'Eliminate layout shifts on dynamic data rendering'
    ],
    resources: [
      { name: 'CSS Tricks Complete Guide to Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' }
    ],
    isCompleted: true,
    completedAt: '2026-06-09',
  },
  {
    id: 12,
    title: 'Interactive State Engines & Dynamic Component Architecture',
    subtitle: 'Master complex React Context, custom hooks, and persistent local state',
    category: 'Frontend',
    estimatedMinutes: 40,
    description: 'In today’s mission, you will build an interactive React State Engine. You will learn how to decouple UI rendering from complex business logic by building a centralized Context Provider that syncs live user input with persistent storage (`localStorage`).\n\nYou will build dynamic form handlers for dual URL validation (GitHub repository + LinkedIn post), reflection logs ("Today’s Win"), and mood tags. Finally, you will trigger dynamic UI micro-animations and celebratory confetti upon task completion.',
    learningObjectives: [
      'Design clean, immutable state updates in React Context without unnecessary re-renders',
      'Implement real-time form validation for GitHub and LinkedIn URLs',
      'Sync local state changes seamlessly with `localStorage` persistence',
      'Integrate celebratory animations and non-punitive UI feedback loops'
    ],
    resources: [
      { name: 'React Context API Documentation', url: 'https://react.dev/learn/passing-data-deeply-with-context' },
      { name: 'Framer Motion Animation Basics', url: 'https://www.framer.com/motion/introduction/' }
    ],
    isCompleted: false,
  },
  {
    id: 30,
    title: 'REST API Design & Express.js Backend Architecture',
    subtitle: 'Build robust API endpoints with error handling middleware',
    category: 'Backend',
    estimatedMinutes: 60,
    description: 'Design and implement RESTful API routes for user profile updates and challenge submissions. Secure routes using token authentication and structured request body validation.',
    learningObjectives: [
      'Build modular Express routers for scalable backends',
      'Implement middleware for error handling and request validation',
      'Structure clean JSON response formats'
    ],
    resources: [
      { name: 'Express.js Routing Guide', url: 'https://expressjs.com/en/guide/routing.html' }
    ],
    isCompleted: false,
  },
  {
    id: 60,
    title: 'Full-Stack Portfolio Capstone & Developer Showcase',
    subtitle: 'Deploy your capstone application and prepare for recruiter calls',
    category: 'Full Stack',
    estimatedMinutes: 90,
    description: 'Final day of the ABTalks Momentum 60-Day Challenge! Finalize your production deployment, publish your comprehensive capstone project repository, update your Recruiter Snapshot, and share your transformation journey with the developer community.',
    learningObjectives: [
      'Deploy full-stack web app on Vercel / Netlify / Render',
      'Generate comprehensive README.md with architecture diagrams and live demo links',
      'Share final 60-day developer reflection on LinkedIn and GitHub'
    ],
    resources: [
      { name: 'Vercel Deployment Docs', url: 'https://vercel.com/docs' }
    ],
    isCompleted: false,
  }
];

// Helper to generate full catalog of 60 tasks for timeline matrix
export function getFullTasksCatalog(completedCount: number): ChallengeTask[] {
  const fullTasks: ChallengeTask[] = [];
  
  for (let i = 1; i <= 60; i++) {
    const existing = MOCK_TASKS.find(t => t.id === i);
    if (existing) {
      fullTasks.push({
        ...existing,
        isCompleted: i <= completedCount
      });
    } else {
      let cat: ChallengeTask['category'] = 'Frontend';
      if (i <= 10) cat = 'Fundamentals';
      else if (i <= 25) cat = 'Frontend';
      else if (i <= 40) cat = 'Backend';
      else if (i <= 50) cat = 'System Design';
      else cat = 'Full Stack';

      fullTasks.push({
        id: i,
        title: `Day ${i}: ${cat} Concept & Hands-on Implementation`,
        subtitle: `Build practical coding competency in ${cat.toLowerCase()}`,
        category: cat,
        estimatedMinutes: 35 + (i % 25),
        description: `Day ${i} challenge of the ABTalks Momentum 60-Day Challenge. Focus on building clean, modular code practices and logging daily wins.`,
        learningObjectives: [
          `Master core principles of ${cat}`,
          'Apply production-ready coding standards',
          'Document learnings and share code proof'
        ],
        resources: [
          { name: 'ABTalks Developer Guide', url: 'https://github.com/abtalks' }
        ],
        isCompleted: i <= completedCount,
        completedAt: i <= completedCount ? `2026-07-${i < 10 ? '0' + i : i}` : undefined
      });
    }
  }
  return fullTasks;
}
