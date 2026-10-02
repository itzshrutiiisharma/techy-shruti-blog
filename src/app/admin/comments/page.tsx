'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trash2,
  ExternalLink,
  CornerDownRight,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchComments = async () => {
    setLoading(true);
    try {
      let url = '/api/comments?limit=50';
      if (statusFilter !== 'ALL') {
        url += `&status=${statusFilter}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.data) {
        setComments(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [statusFilter]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this comment?')) return;
    try {
      const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="Comment Moderation"
        subtitle="Review, approve, reject, or filter reader discussions."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Filter Bar */}
        <div className="flex items-center gap-1 bg-[#0F172A] p-1.5 rounded-2xl border border-slate-800 text-xs w-fit">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'SPAM'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Comments Stream */}
        <div className="rounded-3xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-xl divide-y divide-slate-800/60">
          {loading ? (
            <div className="p-8 text-center text-slate-500 text-xs">Loading reader comments...</div>
          ) : comments.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">No comments found in this queue.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="p-6 hover:bg-slate-900/40 transition space-y-3">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{comment.authorName}</span>
                        {comment.authorEmail && (
                          <span className="text-[11px] text-slate-400">({comment.authorEmail})</span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                            comment.status === 'APPROVED'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                              : comment.status === 'PENDING'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                              : 'bg-red-950/80 text-red-300 border border-red-800/40'
                          }`}
                        >
                          {comment.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {comment.post && (
                    <Link
                      href={`/blog/${comment.post.slug}`}
                      target="_blank"
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 truncate max-w-xs"
                    >
                      <span>Article: {comment.post.title}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </Link>
                  )}
                </div>

                {/* Comment Content */}
                <div className="text-xs sm:text-sm text-slate-200 pl-11 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/60">
                  {comment.content}
                </div>

                {/* Action Controls */}
                <div className="flex items-center justify-end gap-2 pl-11 pt-1">
                  {comment.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'APPROVED')}
                      className="px-3 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>Approve</span>
                    </button>
                  )}

                  {comment.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'REJECTED')}
                      className="px-3 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-800/60 text-amber-300 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <XCircle className="w-3 h-3" />
                      <span>Reject</span>
                    </button>
                  )}

                  {comment.status !== 'SPAM' && (
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'SPAM')}
                      className="px-3 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-800/60 text-purple-300 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span>Spam</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-1 text-slate-500 hover:text-red-400 rounded transition ml-2"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
