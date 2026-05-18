import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MdDashboard, 
  MdReceiptLong, 
  MdCategory, 
  MdPerson, 
  MdLogout, 
  MdMenu, 
  MdClose,
  MdOutlineTrendingUp
} from 'react-icons/md';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard size={22} /> },
    { name: 'Transactions', path: '/transactions', icon: <MdReceiptLong size={22} /> },
    { name: 'Categories', path: '/categories', icon: <MdCategory size={22} /> },
    { name: 'Profile', path: '/profile', icon: <MdPerson size={22} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-indigo-500 text-white rounded-full shadow-2xl shadow-indigo-500/30 active:scale-90 transition-all"
      >
        {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
      </button>

      {/* Sidebar Content */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-80 bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-hidden group shadow-sm`}>
        {/* Subtle Detail */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-indigo-50/20 to-transparent pointer-events-none"></div>

        {/* Branding */}
        <div className="p-8 flex items-center gap-4">
          <div className="p-2 bg-indigo-600/5 rounded-xl border border-indigo-100 text-indigo-600">
            <MdDashboard size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">FinTrack</h1>
            <p className="text-xs text-slate-500 font-medium">Personal Finance</p>
          </div>
        </div>

        {/* User Card */}
        <div className="px-6 mb-8">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600/5 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-slate-900 font-semibold truncate text-sm">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email || ''}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 relative">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm group/item
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }
              `}
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* System Footer */}
        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
