import React from 'react';
import { MdNotificationsNone, MdKeyboardArrowDown, MdSecurity, MdHistoryEdu } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="h-20 px-6 md:px-10 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2 lg:hidden">
        <h2 className="text-xl font-bold text-slate-900">FinTrack</h2>
      </div>
      <div className="hidden lg:block">
        <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
             <span className="text-sm font-semibold text-slate-900">{user?.name || 'User'}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-600/5 flex items-center justify-center text-indigo-600 font-bold text-lg border border-indigo-100">
             {user?.name?.[0] || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
