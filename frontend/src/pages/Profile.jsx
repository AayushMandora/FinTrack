import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MdLogout, MdOutlineMail, MdOutlinePersonOutline, MdLockOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-50">Profile</h1>
        <p className="text-slate-400 font-medium mt-1">Manage your account details.</p>
      </div>

      <div className="card p-8 bg-slate-800 border-slate-700/50">
        <div className="flex flex-col items-center sm:flex-row gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold text-4xl border border-indigo-500/20">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-50">{user?.name || 'User Name'}</h2>
            <p className="text-slate-400 font-medium">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="label">Full Name</label>
            <div className="relative group/field">
              <MdOutlinePersonOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                className="input-field pl-11 py-3 bg-slate-900 border-slate-700 text-slate-400 focus:ring-0 cursor-not-allowed"
                value={user?.name || ''}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="label">Email Address</label>
            <div className="relative group/field">
              <MdOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="email"
                className="input-field pl-11 py-3 bg-slate-900 border-slate-700 text-slate-400 focus:ring-0 cursor-not-allowed"
                value={user?.email || ''}
                disabled
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50">
            <button className="btn btn-outline w-full py-3 mb-4 font-semibold text-slate-300">
              <MdLockOutline size={20} />
              Change Password
            </button>
            
            <button 
              onClick={handleLogout}
              className="btn w-full bg-red-500 text-white hover:bg-red-600 py-3 font-semibold shadow-md shadow-red-500/20"
            >
              <MdLogout size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
