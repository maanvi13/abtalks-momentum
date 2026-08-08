import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemoState } from './DemoStateContext';
import { DemoStateMode } from '../types';

export interface SimulatorStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  targetAttr: string;
  demoState?: DemoStateMode;
  durationMs: number;
  simulatedScore?: number;
  simulatedStatus?: string;
  position?: 'top' | 'bottom';
  showCalendarSkipping?: boolean;
}

export const SIMULATOR_STEPS: SimulatorStep[] = [
  {
    stepNumber: 1,
    title: 'Let\'s follow one student\'s 60-day journey',
    subtitle: 'Step 1 of 8 • Platform Philosophy',
    description: 'ABTalks isn\'t about maintaining perfect streaks. It\'s about building Momentum.',
    route: '/',
    targetAttr: 'landing-hero',
    demoState: 'new',
    durationMs: 4500,
    position: 'bottom',
  },
  {
    stepNumber: 2,
    title: '🌱 Starting the Journey',
    subtitle: 'Step 2 of 8 • Day 1 Setup',
    description: 'Every expert starts somewhere. Priya begins on Day 1 with 12% initial momentum score. Recruiter Snapshot is locked.',
    route: '/dashboard',
    targetAttr: 'momentum-card',
    demoState: 'new',
    simulatedScore: 12,
    simulatedStatus: 'Starting',
    durationMs: 4500,
    position: 'bottom',
  },
  {
    stepNumber: 3,
    title: '🌤 Building Consistency',
    subtitle: 'Step 3 of 8 • Multi-Day Progression',
    description: 'As Priya completes daily challenges, her Momentum grows: 12% ➔ 34% ➔ 58% ➔ 76% ➔ 92%! Her Recruiter Snapshot & achievements unlock!',
    route: '/dashboard',
    targetAttr: 'momentum-card',
    demoState: 'building',
    simulatedScore: 92,
    simulatedStatus: 'Thriving',
    durationMs: 5000,
    position: 'bottom',
  },
  {
    stepNumber: 4,
    title: '💙 Simulated Inactivity & Recovery Drop',
    subtitle: 'Step 4 of 8 • Exam Week Inactivity',
    description: 'Days 21, 22, and 23 skipped during college exams. Momentum drops: 92% ➔ 81% ➔ 64% (Recovering). Progress is preserved — zero streak penalty!',
    route: '/dashboard',
    targetAttr: 'momentum-card',
    demoState: 'recovering',
    simulatedScore: 64,
    simulatedStatus: 'Recovering',
    showCalendarSkipping: true,
    durationMs: 5500,
    position: 'bottom',
  },
  {
    stepNumber: 5,
    title: '🚀 Returning to Code',
    subtitle: 'Step 5 of 8 • Day 18 Submission',
    description: 'Priya returns on Day 18. Watch submission links, reflection win (\'Back on track after exams!\'), and mood submit live...',
    route: '/day/18',
    targetAttr: 'submission-form',
    demoState: 'recovering',
    durationMs: 6000,
    position: 'top',
  },
  {
    stepNumber: 6,
    title: '🎉 Recovery Milestone Reached (88%+)',
    subtitle: 'Step 6 of 8 • Milestone Celebration',
    description: 'Reaching 88% momentum triggers the full-screen celebration: "Every developer loses momentum... What matters is choosing to come back!"',
    route: '/dashboard',
    targetAttr: 'momentum-card',
    demoState: 'building',
    simulatedScore: 88,
    simulatedStatus: 'Thriving',
    durationMs: 5000,
    position: 'bottom',
  },
  {
    stepNumber: 7,
    title: '⚡ Continuous Mastery',
    subtitle: 'Step 7 of 8 • Final Push',
    description: 'With unbroken momentum, Priya powers through to Day 60 and reaches 100% Momentum Score!',
    route: '/dashboard',
    targetAttr: 'momentum-card',
    demoState: 'graduate',
    simulatedScore: 100,
    simulatedStatus: 'Mastered',
    durationMs: 4000,
    position: 'bottom',
  },
  {
    stepNumber: 8,
    title: '🎓 Graduation & Portfolio Readiness',
    subtitle: 'Step 8 of 8 • 100% Completion',
    description: 'Full 60-day contribution heatmap, verified recruiter digest, certificate preview, and PDF report download!',
    route: '/dashboard',
    targetAttr: 'graduate-banner',
    demoState: 'graduate',
    simulatedScore: 100,
    simulatedStatus: 'Graduate',
    durationMs: 5000,
    position: 'bottom',
  },
];

interface SimulatorContextType {
  isSimulating: boolean;
  currentSimStepIndex: number;
  currentSimStep: SimulatorStep | null;
  totalSimSteps: number;
  showFinalModal: boolean;
  startSimulator: () => void;
  stopSimulator: () => void;
  nextSimStep: () => void;
  prevSimStep: () => void;
  restartSimulator: () => void;
  closeFinalModal: () => void;
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

export const SimulatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentSimStepIndex, setCurrentSimStepIndex] = useState(0);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const { selectDemoState } = useDemoState();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSimStep = isSimulating && currentSimStepIndex < SIMULATOR_STEPS.length ? SIMULATOR_STEPS[currentSimStepIndex] : null;

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startSimulator = () => {
    clearTimer();
    setShowFinalModal(false);
    selectDemoState('new');
    setCurrentSimStepIndex(0);
    setIsSimulating(true);
  };

  const stopSimulator = () => {
    clearTimer();
    setIsSimulating(false);
    setShowFinalModal(false);
  };

  const restartSimulator = () => {
    startSimulator();
  };

  const closeFinalModal = () => {
    setShowFinalModal(false);
    setIsSimulating(false);
  };

  const nextSimStep = () => {
    clearTimer();
    if (currentSimStepIndex < SIMULATOR_STEPS.length - 1) {
      setCurrentSimStepIndex((prev) => prev + 1);
    } else {
      // End simulation and trigger final habit modal
      setIsSimulating(false);
      setShowFinalModal(true);
    }
  };

  const prevSimStep = () => {
    clearTimer();
    if (currentSimStepIndex > 0) {
      setCurrentSimStepIndex((prev) => prev - 1);
    }
  };

  // Sync demo state changes per step
  useEffect(() => {
    if (isSimulating && currentSimStep && currentSimStep.demoState) {
      selectDemoState(currentSimStep.demoState);
    }
  }, [isSimulating, currentSimStepIndex]);

  // Handle auto-advance duration per step
  useEffect(() => {
    if (!isSimulating || !currentSimStep) return;

    const duration = currentSimStep.durationMs || 5000;
    timerRef.current = setTimeout(() => {
      nextSimStep();
    }, duration);

    return () => clearTimer();
  }, [isSimulating, currentSimStepIndex]);

  return (
    <SimulatorContext.Provider
      value={{
        isSimulating,
        currentSimStepIndex,
        currentSimStep,
        totalSimSteps: SIMULATOR_STEPS.length,
        showFinalModal,
        startSimulator,
        stopSimulator,
        nextSimStep,
        prevSimStep,
        restartSimulator,
        closeFinalModal,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
};

export const useSimulator = () => {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
};
