import React, { ReactNode } from 'react';

interface MobileShellProps {
  children: ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] relative flex flex-col items-center justify-start antialiased selection:bg-blue-600/30 selection:text-white">
      {/* Subtle Background Ambient Gradients (Non-intrusive) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[350px] bg-gradient-to-t from-indigo-950/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      {/* Main Container: Mobile 390px width centered on desktop */}
      <div className="w-full max-w-[430px] min-h-screen flex flex-col relative z-10 bg-[#09090B]/90 shadow-2xl border-x border-zinc-800/40 pb-24 sm:pb-28">
        {children}
      </div>
    </div>
  );
};
