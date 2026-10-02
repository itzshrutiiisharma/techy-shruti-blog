'use client';

import React, { useState } from 'react';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { useAuth } from '@/contexts/AuthContext';
import { X, Lock, Mail, User as UserIcon, ArrowRight, AlertCircle } from 'lucide-react';

export function AuthModal() {
  const { isOpen, view, closeModal, openModal } = useAuthModal();
  const { login, register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (view === 'login') {
        const result = await login(email, password);
        if (result.success) {
          closeModal();
        } else {
          setError(result.error || 'Invalid credentials');
        }
      } else {
        const result = await register(name, email, password);
        if (result.success) {
          closeModal();
        } else {
          setError(result.error || 'Failed to create account');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'reader') => {
    setError(null);
    setLoading(true);
    try {
      const demoEmail = role === 'admin' ? 'admin@shrutiblogs.com' : 'reader@shrutiblogs.com';
      const demoPassword = role === 'admin' ? 'Admin@123456' : 'Reader@123456';
      const result = await login(demoEmail, demoPassword);
      if (result.success) {
        closeModal();
      } else {
        setError(result.error || 'Demo login failed. Make sure database is seeded.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121110]/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FAF8F5] border border-[#121110] shadow-editorial p-6 sm:p-8 text-[#121110]">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 text-[#78716C] hover:text-[#121110] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Monospace Label */}
        <div className="font-mono text-[10px] text-[#E63B19] uppercase tracking-widest mb-1">
          {view === 'login' ? '01 // AUTHENTICATION' : '02 // MEMBERSHIP'}
        </div>

        {/* Header */}
        <div className="mb-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#121110]">
            {view === 'login' ? 'Access the Archive' : 'Create Reader Profile'}
          </h3>
          <p className="text-xs text-[#57534E] font-sans mt-1.5 leading-relaxed">
            {view === 'login'
              ? 'Sign in to access your personal reading list, bookmarks, and author workbench.'
              : 'Join the Shruti Blogs publication community to bookmark articles and engage in technical discussions.'}
          </p>
        </div>

        {/* 1-Click Fast Demo Logins */}
        <div className="mb-6 p-3 bg-[#F4EFE6] border border-[#E6E1D8]">
          <div className="font-mono text-[10px] uppercase font-bold text-[#78716C] tracking-wider mb-2">
            INSTANT DEMO AUTHENTICATION:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin('admin')}
              className="px-2.5 py-1.5 text-xs font-mono font-bold bg-[#FAF8F5] hover:bg-[#121110] text-[#121110] hover:text-[#FAF8F5] border border-[#E6E1D8] hover:border-[#121110] transition text-center"
            >
              👑 Staff (Admin)
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin('reader')}
              className="px-2.5 py-1.5 text-xs font-mono font-bold bg-[#FAF8F5] hover:bg-[#121110] text-[#121110] hover:text-[#FAF8F5] border border-[#E6E1D8] hover:border-[#121110] transition text-center"
            >
              📖 Reader (Priya)
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FDEEEB] border border-[#E63B19] text-[#E63B19] text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'register' && (
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider font-bold text-[#78716C] mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-3 text-[#78716C]" />
                <input
                  type="text"
                  required
                  placeholder="Shruti Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E6E1D8] text-[#121110] text-xs font-mono focus:outline-none focus:border-[#121110] transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider font-bold text-[#78716C] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[#78716C]" />
              <input
                type="email"
                required
                placeholder="name@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#E6E1D8] text-[#121110] text-xs font-mono focus:outline-none focus:border-[#121110] transition"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider font-bold text-[#78716C] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[#78716C]" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#E6E1D8] text-[#121110] text-xs font-mono focus:outline-none focus:border-[#121110] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] font-mono text-xs font-bold flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>{view === 'login' ? 'AUTHENTICATE SESSION' : 'COMPLETE REGISTRATION'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E6E1D8] text-center font-mono text-xs text-[#78716C]">
          {view === 'login' ? (
            <>
              First time here?{' '}
              <button
                type="button"
                onClick={() => openModal('register')}
                className="text-[#E63B19] hover:underline font-bold ml-1"
              >
                Create reader profile
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => openModal('login')}
                className="text-[#E63B19] hover:underline font-bold ml-1"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
