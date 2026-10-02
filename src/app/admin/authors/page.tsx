'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { UserCheck, Globe, Twitter, Github, Linkedin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/authors');
      const data = await res.json();
      if (data.success && data.data) {
        setAuthors(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="Author Profiles"
        subtitle="Manage verified editorial contributors, bios, and publication bylines."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 p-12 text-center text-slate-500 text-xs">Loading authors...</div>
          ) : (
            authors.map((author) => (
              <div
                key={author.id}
                className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={author.displayName}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">{author.displayName}</h3>
                      <Link
                        href={`/author/${author.slug}`}
                        target="_blank"
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                      >
                        <span>Public Page</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">/author/{author.slug}</div>
                    <div className="text-[11px] text-indigo-400 font-semibold mt-1">
                      {author.postCount || 0} published articles
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  {author.bio || 'No bio written yet.'}
                </p>

                {author.website && (
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    <a href={author.website} target="_blank" rel="noreferrer" className="hover:underline truncate">
                      {author.website}
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
