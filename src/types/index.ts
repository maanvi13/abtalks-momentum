export type DemoStateMode = 'new' | 'building' | 'recovering' | 'empty' | 'graduate';

export interface StudentProfile {
  name: string;
  avatarUrl: string;
  handle: string;
  roleTitle: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  currentDay: number;
  momentumScore: number; // 0 to 100
  momentumStatus: 'Newcomer' | 'Building' | 'Recovering' | 'Thriving' | 'Mastered';
  momentumMessage: string;
  isProfileComplete: boolean;
  isGithubConnected: boolean;
  isLinkedinConnected: boolean;
  completedDaysCount: number;
  winsLoggedCount: number;
  graduateDate?: string;
  recruiterViewCount?: number;
}

export interface ChallengeTask {
  id: number;
  title: string;
  subtitle: string;
  category: 'Fundamentals' | 'Frontend' | 'Backend' | 'System Design' | 'Full Stack' | 'Portfolio';
  estimatedMinutes: number;
  description: string;
  learningObjectives: string[];
  resources: { name: string; url: string }[];
  isCompleted: boolean;
  completedAt?: string;
  githubSubmissionUrl?: string;
  linkedinSubmissionUrl?: string;
  winLog?: string;
  moodSelected?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  category: 'streak' | 'submission' | 'milestone' | 'social';
}

export interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

export interface SubmissionPayload {
  dayId: number;
  githubUrl: string;
  linkedinUrl: string;
  winLog: string;
  mood: string;
}
