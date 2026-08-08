import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ChevronLeft, X, Play } from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';

export const SimulatorOverlay: React.FC = () => {
  const {
    isSimulating,
    currentSimStep,
    currentSimStepIndex,
    totalSimSteps,
    nextSimStep,
    prevSimStep,
    stopSimulator,
  } = useSimulator();

  const navigate = useNavigate();
  const location = useLocation();

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Auto-navigate to step's route if different from current path
  useEffect(() => {
    if (isSimulating && currentSimStep && currentSimStep.route) {
      if (location.pathname !== currentSimStep.route) {
        navigate(currentSimStep.route);
      }
    }
  }, [isSimulating, currentSimStepIndex, currentSimStep, location.pathname, navigate]);

  // Find & measure target element position
  useEffect(() => {
    if (!isSimulating || !currentSimStep || !currentSimStep.targetAttr) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.querySelector(`[data-tour="${currentSimStep.targetAttr}"]`);
      if (el) {
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
  }, [isSimulating, currentSimStepIndex, currentSimStep, location.pathname]);

  if (!isSimulating || !currentSimStep) return null;

  // Calculate Tooltip Positioning
  let tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '90px',
  };

  if (targetRect) {
    if (currentSimStep.position === 'top' && targetRect.top > 250) {
      tooltipStyle = {
        position: 'fixed',
        left: `${Math.max(20, Math.min(window.innerWidth - 380, targetRect.left + targetRect.width / 2 - 180))}px`,
        top: `${Math.max(20, targetRect.top - 210)}px`,
      };
    } else if (currentSimStep.position === 'bottom' && targetRect.bottom < window.innerHeight - 230) {
      tooltipStyle = {
        position: 'fixed',
        left: `${Math.max(20, Math.min(window.innerWidth - 380, targetRect.left + targetRect.width / 2 - 180))}px`,
        top: `${targetRect.bottom + 16}px`,
      };
    }
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Darkened Backdrop Overlay - Crisp without blur filters */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 pointer-events-auto"
          onClick={stopSimulator}
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
          className="absolute rounded-2xl border-2 border-purple-500 shadow-[0_0_25px_rgba(147,51,234,0.5)] pointer-events-none z-50 bg-purple-500/10"
        />
      )}

      {/* Interactive Simulator Tooltip Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSimStepIndex}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          style={tooltipStyle}
          className="w-[calc(100%-32px)] max-w-sm bg-[#18181B] rounded-2xl p-4 border border-purple-500/50 shadow-2xl z-50 pointer-events-auto space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>{currentSimStep.subtitle}</span>
            </div>

            {/* Persistent Skip Button */}
            <button
              onClick={stopSimulator}
              className="text-[11px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <span>Skip Simulation</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white tracking-tight">{currentSimStep.title}</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">{currentSimStep.description}</p>
          </div>

          {/* Progress Bar & Navigation Controls */}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            {/* Step Dots */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalSimSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    idx === currentSimStepIndex
                      ? 'w-4 bg-purple-500'
                      : idx < currentSimStepIndex
                      ? 'w-1.5 bg-purple-500/40'
                      : 'w-1.5 bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              {currentSimStepIndex > 0 && (
                <button
                  onClick={prevSimStep}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs transition-colors"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={nextSimStep}
                className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>{currentSimStepIndex === totalSimSteps - 1 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
