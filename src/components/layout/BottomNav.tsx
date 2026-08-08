import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, Target, User } from 'lucide-react';
import { useDemoState } from '../../context/DemoStateContext';

export const BottomNav: React.FC = () => {
  const { student } = useDemoState();
  const currentDay = student.currentDay || 1;

  const navItems = [
    { to: '/', label: 'Overview', icon: Home },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: `/day/${currentDay}`, label: `Day ${currentDay}`, icon: Target },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-4 pb-4 pt-2 pointer-events-none">
      <div className="glass-card rounded-full p-1.5 flex items-center justify-around shadow-2xl border border-zinc-700/40 pointer-events-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 text-xs font-medium ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`
            }
          >
            <item.icon className="w-4.5 h-4.5 mb-0.5" />
            <span className="text-xs font-semibold tracking-tight">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
