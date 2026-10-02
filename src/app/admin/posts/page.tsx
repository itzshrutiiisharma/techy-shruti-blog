'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import Link from 'next/link';
import {
  FileText,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Filter,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `/api/posts?limit=50`;
      if (statusFilter !== 'ALL') {
        url += `&status=${statusFilter}`;
      }
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.data) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="Article Management"
        subtitle="Create, edit, schedule, and moderate publication content."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F172A] border border-slate-800">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
            {['ALL', 'PUBLISHED', 'DRAFT', 'SCHEDULED', 'ARCHIVED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition"
            >
              Filter
            </button>
          </form>
        </div>

        {/* Posts Table */}
        <div className="rounded-3xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Article Title</th>
                  <th className="p-4 font-semibold">Author</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Views</th>
                  <th className="p-4 font-semibold">Published Date</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      Loading publication articles...
                    </td>
                  </tr>
                ) : posts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No articles match the current filter.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-900/40 transition">
                      <td className="p-4 font-medium text-white max-w-sm">
                        <div className="font-semibold line-clamp-1">{post.title}</div>
                        <div className="text-[10px] text-slate-500 font-mono">/blog/{post.slug}</div>
                      </td>
                      <td className="p-4 text-slate-300">
                        {post.author?.displayName || 'Unknown'}
                      </td>
                      <td className="p-4">
                        {post.category ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-800/40">
                            {post.category.name}
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            post.status === 'PUBLISHED'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                              : post.status === 'SCHEDULED'
                              ? 'bg-purple-950/80 text-purple-300 border border-purple-800/40'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 text-center font-semibold text-indigo-300">
                        {post.viewCount}
                      </td>
                      <td className="p-4 text-slate-400 text-[11px]">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {post.status === 'PUBLISHED' && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white inline-block transition"
                            title="View Public Article"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-800 text-indigo-300 hover:text-white inline-block transition"
                          title="Edit Article"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirmId(post.id)}
                          className="p-1.5 rounded-lg bg-red-950/80 border border-red-800 text-red-400 hover:text-red-200 inline-block transition"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="p-6 max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-white space-y-4">
            <h3 className="text-base font-bold text-white">Delete Article?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This action cannot be undone. This will permanently remove the article and all associated comments.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-red-600/30"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
