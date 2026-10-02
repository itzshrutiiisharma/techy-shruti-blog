'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { LogOut, Bookmark, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AccountProfilePage() {
  const { user, loading, logout, isStaff } = useAuth();
  const { openModal } = useAuthModal();

  if (loading) {
    return (
      <div className="p-16 text-center font-mono text-xs text-[#78716C] bg-[#FAF8F5]">
        AUTHENTICATING READER CREDENTIALS...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 p-10 border border-[#121110] bg-[#F4EFE6] text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#121110]">Authentication Required</h2>
        <p className="font-sans text-xs text-[#57534E]">
          Please sign in to access your personal reader profile and archive settings.
        </p>
        <button
          onClick={() => openModal('login')}
          className="px-5 py-2.5 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] font-mono text-xs font-bold transition"
        >
          SIGN IN NOW
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 min-h-screen space-y-8 bg-[#FAF8F5] text-[#121110]">
      <div className="border-b border-[#121110] pb-6 space-y-2">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest">
          01 // READER PROFILE
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121110]">
          Account & Credentials
        </h1>
      </div>

      <div className="p-8 border border-[#E6E1D8] bg-[#F4EFE6] space-y-8">
        <div className="flex items-center gap-5 pb-6 border-b border-[#E6E1D8]">
          <div className="w-16 h-16 rounded-full bg-[#121110] text-[#FAF8F5] flex items-center justify-center font-mono text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#121110]">{user.name}</h2>
            <div className="font-mono text-xs text-[#78716C]">{user.email}</div>
            <span className="inline-block mt-2 px-2 py-0.5 font-mono text-[10px] font-bold uppercase bg-[#121110] text-[#FAF8F5]">
              ACCESS LEVEL: {user.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/account/bookmarks"
            className="p-5 border border-[#E6E1D8] bg-[#FAF8F5] hover:border-[#121110] text-[#121110] transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 h-4 text-[#E63B19]" />
              <span className="font-mono text-xs font-bold">YOUR ARCHIVE</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#78716C]" />
          </Link>

          {isStaff && (
            <Link
              href="/admin"
              className="p-5 border border-[#121110] bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] transition flex items-center justify-between font-mono"
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-[#FAF8F5]" />
                <span className="text-xs font-bold">EDITORIAL CMS</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#FAF8F5]" />
            </Link>
          )}
        </div>

        <div className="pt-4 border-t border-[#E6E1D8] flex justify-end">
          <button
            onClick={() => logout()}
            className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#FDEEEB] border border-[#E6E1D8] hover:border-[#E63B19] text-[#78716C] hover:text-[#E63B19] font-mono text-xs font-bold flex items-center gap-2 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
