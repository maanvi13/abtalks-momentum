import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ChevronLeft, X, Play } from 'lucide-react';
import { useTour } from '../../context/TourContext';

export const TourOverlay: React.FC = () => {
  const { isTourActive, currentStep, currentStepIndex, totalSteps, nextStep, prevStep, stopTour } = useTour();
  const navigate = useNavigate();
  const location = useLocation();

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Auto-navigate to step's route if different from current path
  useEffect(() => {
    if (isTourActive && currentStep && currentStep.route) {
      if (location.pathname !== currentStep.route) {
        navigate(currentStep.route);
      }
    }
  }, [isTourActive, currentStepIndex, currentStep, location.pathname, navigate]);

  // Find & measure target element position
  useEffect(() => {
    if (!isTourActive || !currentStep || !currentStep.targetAttr) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.querySelector(`[data-tour="${currentStep.targetAttr}"]`);
      if (el) {
        // Scroll into view smoothly if needed
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    const timer = setTimeout(updateRect, 300);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [isTourActive, currentStepIndex, currentStep, location.pathname]);

  if (!isTourActive || !currentStep) return null;

  // Calculate Tooltip Positioning
  let tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '90px',
  };

  if (targetRect) {
    if (currentStep.position === 'top' && targetRect.top > 250) {
      tooltipStyle = {
        position: 'fixed',
        left: `${Math.max(20, Math.min(window.innerWidth - 380, targetRect.left + targetRect.width / 2 - 180))}px`,
        top: `${Math.max(20, targetRect.top - 200)}px`,
      };
    } else if (currentStep.position === 'bottom' && targetRect.bottom < window.innerHeight - 220) {
      tooltipStyle = {
        position: 'fixed',
        left: `${Math.max(20, Math.min(window.innerWidth - 380, targetRect.left + targetRect.width / 2 - 180))}px`,
        top: `${targetRect.bottom + 16}px`,
      };
    }
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Darkened Spotlight Backdrop */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/65 backdrop-blur-[2px] pointer-events-auto"
          onClick={stopTour}
        />
      </AnimatePresence>

      {/* Target Element Spotlight Cutout Ring */}
      {targetRect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute rounded-2xl border-2 border-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.5)] pointer-events-none z-50 bg-blue-500/10"
        />
      )}

      {/* Interactive Tooltip Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          style={tooltipStyle}
          className="w-[calc(100%-32px)] max-w-sm glass-card rounded-2xl p-4 border border-blue-500/40 shadow-2xl z-50 pointer-events-auto space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Step {currentStepIndex + 1} of {totalSteps}</span>
            </div>

            {/* Persistent Skip Button */}
            <button
              onClick={stopTour}
              className="text-[11px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <span>Skip Tour</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white tracking-tight">{currentStep.title}</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">{currentStep.description}</p>
          </div>

          {/* Progress Bar & Navigation Controls */}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            {/* Step Indicators */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'w-4 bg-blue-500'
                      : idx < currentStepIndex
                      ? 'w-1.5 bg-blue-500/40'
                      : 'w-1.5 bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              {currentStepIndex > 0 && (
                <button
                  onClick={prevStep}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs transition-colors"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={nextStep}
                className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>{currentStepIndex === totalSteps - 1 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
