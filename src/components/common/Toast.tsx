import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';

export const Toast: React.FC = () => {
  const { student, clearToast } = useDemoState();

  useEffect(() => {
    if (!student.toastMessage) return;

    const timer = setTimeout(() => {
      clearToast();
    }, 4000);

    return () => clearTimeout(timer);
  }, [student.toastMessage, clearToast]);

  if (!student.toastMessage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-emerald-500/50 shadow-2xl rounded-2xl py-2.5 px-4 flex items-center gap-2.5 text-xs text-white"
      >
        <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <span className="font-bold tracking-tight">{student.toastMessage}</span>
      </motion.div>
    </AnimatePresence>
  );
};
