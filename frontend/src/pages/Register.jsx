import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdOutlineMail, MdLockOutline, MdOutlinePersonOutline } from 'react-icons/md';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match');
    }
    setLoading(true);
    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    if (success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 overflow-hidden relative">
      <div className="w-full max-w-md animate-in slide-in-from-bottom duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-4 border border-indigo-500/20 group cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/10">
            <span className="text-3xl font-bold text-indigo-500">FT</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-50">Create Account</h1>
          <p className="mt-3 text-slate-400 font-medium">Join us and start managing your finances.</p>
        </div>

        <div className="card shadow-2xl shadow-indigo-500/5 backdrop-blur-sm bg-slate-800/80 p-8 border-slate-700/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Full Name</label>
              <div className="relative group">
                <MdOutlinePersonOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="text"
                  name="name"
                  className="input-field pl-11"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="label">Email Address</label>
              <div className="relative group">
                <MdOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  className="input-field pl-11"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative group">
                <MdLockOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  className="input-field pl-11"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <div className="relative group">
                <MdLockOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  className="input-field pl-11"
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3.5 mt-2 shadow-lg shadow-indigo-500/20"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 font-medium font-sans">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:text-indigo-400 hover:underline transition-all">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
