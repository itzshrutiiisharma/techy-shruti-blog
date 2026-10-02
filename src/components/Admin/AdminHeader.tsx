'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Sparkles, Bell, ExternalLink, Plus } from 'lucide-react';

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-slate-800 bg-[#0B1120]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Article</span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Live Website</span>
        </Link>
      </div>
    </header>
  );
}
