import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudentProfile, ChallengeTask, Achievement, DemoStateMode, SubmissionPayload } from '../types';
import { STUDENT_PRESETS, INITIAL_ACHIEVEMENTS, getFullTasksCatalog } from '../data/mockData';

interface DemoStateContextType {
  activeDemoMode: DemoStateMode;
  student: StudentProfile;
  tasks: ChallengeTask[];
  achievements: Achievement[];
  selectDemoState: (mode: DemoStateMode) => void;
  resetToDefault: () => void;
  submitDayChallenge: (payload: SubmissionPayload) => boolean;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  getTaskById: (id: number) => ChallengeTask | undefined;
}

const STORAGE_KEY_MODE = 'abtalks_momentum_demo_mode';
const STORAGE_KEY_STUDENT = 'abtalks_momentum_student_data';
const STORAGE_KEY_TASKS = 'abtalks_momentum_tasks_data';
const STORAGE_KEY_ACHIEVEMENTS = 'abtalks_momentum_achievements_data';

const DemoStateContext = createContext<DemoStateContextType | undefined>(undefined);

export const DemoStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initial mode state
  const [activeDemoMode, setActiveDemoMode] = useState<DemoStateMode>(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY_MODE);
    return (savedMode as DemoStateMode) || 'building';
  });

  // 2. Initial student state
  const [student, setStudent] = useState<StudentProfile>(() => {
    const savedStudent = localStorage.getItem(STORAGE_KEY_STUDENT);
    if (savedStudent) {
      try { return JSON.parse(savedStudent); } catch (e) { /* ignore */ }
    }
    return STUDENT_PRESETS.building;
  });

  // 3. Initial tasks state
  const [tasks, setTasks] = useState<ChallengeTask[]>(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY_TASKS);
    if (savedTasks) {
      try { return JSON.parse(savedTasks); } catch (e) { /* ignore */ }
    }
    return getFullTasksCatalog(STUDENT_PRESETS.building.completedDaysCount);
  });

  // 4. Initial achievements state
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const savedAchievements = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    if (savedAchievements) {
      try { return JSON.parse(savedAchievements); } catch (e) { /* ignore */ }
    }
    return INITIAL_ACHIEVEMENTS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MODE, activeDemoMode);
    localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(student));
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
  }, [activeDemoMode, student, tasks, achievements]);

  // Switch demo state preset
  const selectDemoState = (mode: DemoStateMode) => {
    const presetStudent = STUDENT_PRESETS[mode];
    const presetTasks = getFullTasksCatalog(presetStudent.completedDaysCount);
    
    // Customize achievements per state
    const presetAchievements = INITIAL_ACHIEVEMENTS.map(ach => {
      if (mode === 'graduate') return { ...ach, isUnlocked: true };
      if (mode === 'new' || mode === 'empty') {
        if (ach.id === 'first_step' && mode === 'empty') return { ...ach, isUnlocked: false };
        if (ach.id === 'social_proof' && mode === 'empty') return { ...ach, isUnlocked: false };
      }
      return ach;
    });

    setActiveDemoMode(mode);
    setStudent(presetStudent);
    setTasks(presetTasks);
    setAchievements(presetAchievements);
  };

  // Reset to default active state
  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY_MODE);
    localStorage.removeItem(STORAGE_KEY_STUDENT);
    localStorage.removeItem(STORAGE_KEY_TASKS);
    localStorage.removeItem(STORAGE_KEY_ACHIEVEMENTS);
    selectDemoState('building');
  };

  // Get task helper
  const getTaskById = (id: number) => {
    return tasks.find(t => t.id === id);
  };

  // Handle live challenge submission
  const submitDayChallenge = (payload: SubmissionPayload): boolean => {
    const { dayId, githubUrl, linkedinUrl, winLog, mood } = payload;
    
    // Update task
    setTasks(prevTasks =>
      prevTasks.map(t => {
        if (t.id === dayId) {
          return {
            ...t,
            isCompleted: true,
            completedAt: new Date().toISOString().split('T')[0],
            githubSubmissionUrl: githubUrl,
            linkedinSubmissionUrl: linkedinUrl,
            winLog: winLog,
            moodSelected: mood
          };
        }
        return t;
      })
    );

    // Update student stats
    setStudent(prev => {
      const newCompletedCount = prev.completedDaysCount + (tasks.find(t => t.id === dayId)?.isCompleted ? 0 : 1);
      const newWinsCount = prev.winsLoggedCount + (winLog ? 1 : 0);
      const newMomentum = Math.min(100, prev.momentumScore + 8);
      const isGraduate = newCompletedCount >= 60;

      return {
        ...prev,
        completedDaysCount: newCompletedCount,
        winsLoggedCount: newWinsCount,
        momentumScore: isGraduate ? 100 : newMomentum,
        momentumStatus: isGraduate ? 'Mastered' : newMomentum > 80 ? 'Thriving' : 'Building',
        isGithubConnected: true,
        isLinkedinConnected: true,
        currentDay: Math.min(60, dayId + 1),
        momentumMessage: `Fantastic work completing Day ${dayId}! Your submission proof and reflection win have been recorded.`
      };
    });

    // Check unlocks
    setAchievements(prev =>
      prev.map(ach => {
        if (dayId === 12 && ach.id === 'day_12_master') {
          return { ...ach, isUnlocked: true, unlockedAt: 'Day 12' };
        }
        return ach;
      })
    );

    return true;
  };

  // Update profile details
  const updateProfile = (updated: Partial<StudentProfile>) => {
    setStudent(prev => {
      const next = { ...prev, ...updated };
      const isComplete = Boolean(next.name && next.handle && next.roleTitle && next.githubUrl && next.linkedinUrl);
      return {
        ...next,
        isProfileComplete: isComplete,
        isGithubConnected: Boolean(next.githubUrl),
        isLinkedinConnected: Boolean(next.linkedinUrl)
      };
    });
  };

  return (
    <DemoStateContext.Provider
      value={{
        activeDemoMode,
        student,
        tasks,
        achievements,
        selectDemoState,
        resetToDefault,
        submitDayChallenge,
        updateProfile,
        getTaskById
      }}
    >
      {children}
    </DemoStateContext.Provider>
  );
};

export const useDemoState = () => {
  const context = useContext(DemoStateContext);
  if (!context) {
    throw new Error('useDemoState must be used within a DemoStateProvider');
  }
  return context;
};
