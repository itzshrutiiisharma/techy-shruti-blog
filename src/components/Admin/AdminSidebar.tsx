'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Tags,
  Users,
  UserCheck,
  MessageSquare,
  Mail,
  Image,
  BarChart3,
  Search,
  ShieldCheck,
  Settings,
  ArrowUpRight,
  LogOut,
  Sparkles,
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navSections = [
    {
      title: 'Main',
      items: [
        { label: 'Overview', href: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Content Engine',
      items: [
        { label: 'All Articles', href: '/admin/posts', icon: FileText },
        { label: 'Write New Post', href: '/admin/posts/new', icon: PlusCircle },
        { label: 'Categories', href: '/admin/categories', icon: FolderTree },
        { label: 'Tags', href: '/admin/tags', icon: Tags },
      ],
    },
    {
      title: 'Audience & Community',
      items: [
        { label: 'Comments Moderation', href: '/admin/comments', icon: MessageSquare },
        { label: 'Newsletter Subscribers', href: '/admin/newsletter', icon: Mail },
        { label: 'Authors', href: '/admin/authors', icon: UserCheck },
        { label: 'Users & Roles', href: '/admin/users', icon: Users },
      ],
    },
    {
      title: 'Intelligence & Ops',
      items: [
        { label: 'Media Library', href: '/admin/media', icon: Image },
        { label: 'Performance Analytics', href: '/admin/analytics', icon: BarChart3 },
        { label: 'SEO Management', href: '/admin/seo', icon: Search },
        { label: 'Security & Audit Logs', href: '/admin/audit', icon: ShieldCheck },
        { label: 'Site Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between min-h-screen text-slate-700 select-none shadow-2xs">
      {/* Top Brand */}
      <div>
        <div className="p-5 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm shadow-indigo-600/20">
              S
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition">
                SHRUTI CMS
              </div>
              <div className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                <span>Enterprise Portal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {section.title}
              </div>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* User Footer & Live Site Link */}
      <div className="p-3 border-t border-slate-100 bg-slate-50 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 hover:text-slate-950 transition shadow-2xs"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-medium">View Public Site</span>
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        {user && (
          <div className="flex items-center justify-between px-2 pt-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-xs">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 truncate text-xs">{user.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{user.role}</div>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
