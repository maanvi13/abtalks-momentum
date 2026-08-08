import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { TourStep } from '../types/tour';
import { useDemoState } from './DemoStateContext';
import { DemoStateMode } from '../types';

interface TourContextType {
  isTourActive: boolean;
  currentStepIndex: number;
  currentStep: TourStep | null;
  totalSteps: number;
  isEndingModalOpen: boolean;
  startTour: () => void;
  startStateWalkthrough: (mode: DemoStateMode) => void;
  stopTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  restartTour: () => void;
  closeEndingModal: () => void;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'landing-hero',
    title: 'Welcome to ABTalks Momentum',
    description: 'This platform helps students build momentum through a 60-day coding journey.',
    route: '/',
    targetAttr: 'landing-hero',
    durationMs: 4000,
    position: 'bottom',
  },
  {
    id: 'landing-comparison',
    title: 'Build Momentum, Not Pressure',
    description: 'Students complete one challenge every day, commit code to GitHub, and share their work publicly.',
    route: '/',
    targetAttr: 'landing-comparison',
    durationMs: 4000,
    position: 'top',
  },
  {
    id: 'dashboard-momentum',
    title: 'Momentum vs. Traditional Streaks',
    description: 'We replaced traditional streaks with Momentum. Momentum rewards consistency while allowing students to recover from missed days instead of starting over.',
    route: '/dashboard',
    targetAttr: 'momentum-card',
    demoState: 'building',
    durationMs: 5000,
    position: 'bottom',
  },
  {
    id: 'dashboard-timeline',
    title: '60-Day Journey Roadmap',
    description: 'Your learning journey grows every day across 60 structured engineering milestones.',
    route: '/dashboard',
    targetAttr: 'journey-timeline',
    durationMs: 4500,
    position: 'top',
  },
  {
    id: 'dashboard-recruiter',
    title: 'Verified Recruiter Snapshot',
    description: 'Students can see how recruiters currently perceive their developer profile and submission proof.',
    route: '/dashboard',
    targetAttr: 'recruiter-snapshot',
    durationMs: 4500,
    position: 'top',
  },
  {
    id: 'dashboard-achievements',
    title: 'Milestone Achievements',
    description: 'Achievements celebrate meaningful milestones instead of encouraging unhealthy streak pressure.',
    route: '/dashboard',
    targetAttr: 'achievement-shelf',
    durationMs: 4500,
    position: 'top',
  },
  {
    id: 'challenge-view',
    title: "Today's Mission — Day 12",
    description: "Hands-on challenge prompt, learning goals, resources, and proof submission form.",
    route: '/day/12',
    targetAttr: 'challenge-banner',
    durationMs: 4000,
    position: 'bottom',
  },
  {
    id: 'challenge-submission',
    title: 'Live Submission Proof & Celebration',
    description: 'Watch sample proof links and reflection wins submit live with celebratory confetti!',
    route: '/day/12',
    targetAttr: 'submission-form',
    autoFillForm: true,
    triggerSubmit: true,
    durationMs: 5500,
    position: 'top',
  },
  {
    id: 'dashboard-updated',
    title: 'Momentum Updated Live!',
    description: 'Momentum score increases live upon challenge completion and updates the timeline matrix.',
    route: '/dashboard',
    targetAttr: 'momentum-card',
    durationMs: 4000,
    position: 'bottom',
  },
  {
    id: 'state-starting',
    title: '🌱 Journey State: Starting',
    description: 'Day 1 setup state for newcomers building their initial coding routine.',
    route: '/dashboard',
    targetAttr: 'momentum-card',
    demoState: 'new',
    durationMs: 4000,
    position: 'bottom',
  },
  {
    id: 'state-recovering',
    title: '💙 Journey State: Momentum Recovering',
    description: 'Priya missed coding during exam week (momentum 62%). Watch how submitting today’s task reaches the threshold and restores her status to Thriving!',
    route: '/day/18',
    targetAttr: 'submission-form',
    demoState: 'recovering',
    autoFillForm: true,
    triggerSubmit: true,
    durationMs: 6000,
    position: 'top',
  },
  {
    id: 'state-empty',
    title: '👤 Journey State: Empty Profile',
    description: 'Displays locked recruiter snapshot with a clear, actionable profile completion checklist.',
    route: '/dashboard',
    targetAttr: 'recruiter-snapshot',
    demoState: 'empty',
    durationMs: 4000,
    position: 'top',
  },
  {
    id: 'state-graduate',
    title: '🎓 Journey State: Graduate',
    description: 'Full 60-day completion with 100% Momentum, 60-day contribution heatmap, and downloadable PDF report!',
    route: '/dashboard',
    targetAttr: 'graduate-banner',
    demoState: 'graduate',
    durationMs: 4500,
    position: 'bottom',
  },
];

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isEndingModalOpen, setIsEndingModalOpen] = useState(false);
  const { selectDemoState } = useDemoState();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = isTourActive && currentStepIndex < TOUR_STEPS.length ? TOUR_STEPS[currentStepIndex] : null;

  // Clear auto-play timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Start Guided Tour
  const startTour = () => {
    clearTimer();
    setIsEndingModalOpen(false);
    selectDemoState('building');
    setCurrentStepIndex(0);
    setIsTourActive(true);
  };

  // Start State-Specific Demo Walkthrough
  const startStateWalkthrough = (mode: DemoStateMode) => {
    clearTimer();
    setIsEndingModalOpen(false);
    selectDemoState(mode);

    // Map mode to target step index
    let stepIndex = 0;
    if (mode === 'new') stepIndex = 9;
    else if (mode === 'recovering') stepIndex = 10;
    else if (mode === 'empty') stepIndex = 11;
    else if (mode === 'graduate') stepIndex = 12;
    else if (mode === 'building') stepIndex = 2;

    setCurrentStepIndex(stepIndex);
    setIsTourActive(true);
  };

  // Stop Tour
  const stopTour = () => {
    clearTimer();
    setIsTourActive(false);
    setIsEndingModalOpen(false);
  };

  // Restart Tour
  const restartTour = () => {
    startTour();
  };

  // Close ending modal
  const closeEndingModal = () => {
    setIsEndingModalOpen(false);
    setIsTourActive(false);
  };

  // Go to Next Step
  const nextStep = () => {
    clearTimer();
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Reached the end of tour
      setIsTourActive(false);
      setIsEndingModalOpen(true);
    }
  };

  // Go to Previous Step
  const prevStep = () => {
    clearTimer();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Sync demo state changes when step specifies a demoState
  useEffect(() => {
    if (isTourActive && currentStep && currentStep.demoState) {
      selectDemoState(currentStep.demoState);
    }
  }, [isTourActive, currentStepIndex]);

  // Handle auto-play duration per step
  useEffect(() => {
    if (!isTourActive || !currentStep) return;

    const duration = currentStep.durationMs || 4000;
    timerRef.current = setTimeout(() => {
      nextStep();
    }, duration);

    return () => clearTimer();
  }, [isTourActive, currentStepIndex]);

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        currentStepIndex,
        currentStep,
        totalSteps: TOUR_STEPS.length,
        isEndingModalOpen,
        startTour,
        startStateWalkthrough,
        stopTour,
        nextStep,
        prevStep,
        restartTour,
        closeEndingModal,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};
