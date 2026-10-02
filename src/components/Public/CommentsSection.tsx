'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { MessageSquare, CornerDownRight, Send, CheckCircle } from 'lucide-react';

interface CommentType {
  id: string;
  authorName: string;
  content: string;
  createdAt: string | Date;
  parentId?: string | null;
  user?: {
    id: string;
    name: string;
    avatar?: string | null;
    role?: string;
  } | null;
  replies?: CommentType[];
}

export function CommentsSection({
  postId,
  initialComments = [],
}: {
  postId: string;
  initialComments?: CommentType[];
}) {
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const handlePostComment = async (e: React.FormEvent, parentId?: string | null) => {
    e.preventDefault();
    const commentBody = parentId ? replyContent : content;
    if (!commentBody.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          parentId: parentId || null,
          authorName: user ? user.name : authorName || 'Anonymous Reader',
          authorEmail: user ? user.email : authorEmail || null,
          content: commentBody,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        if (parentId) {
          // Append to replies
          setComments((prev) =>
            prev.map((c) => {
              if (c.id === parentId) {
                return {
                  ...c,
                  replies: [...(c.replies || []), json.data],
                };
              }
              return c;
            })
          );
          setReplyingToId(null);
          setReplyContent('');
        } else {
          // Prepend to top-level
          setComments((prev) => [json.data, ...prev]);
          setContent('');
        }
        setSuccessNotice(true);
        setTimeout(() => setSuccessNotice(false), 4000);
      }
    } catch (err) {
      console.error('[Comment submit error]', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <span>Discussion ({comments.length})</span>
        </h3>
        {!user && (
          <button
            onClick={() => openModal('login')}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Sign in for verified badge
          </button>
        )}
      </div>

      {successNotice && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Your comment has been published!</span>
        </div>
      )}

      {/* Main Comment Box */}
      <form onSubmit={(e) => handlePostComment(e, null)} className="mb-10 space-y-3">
        {!user && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your name *"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
            <input
              type="email"
              placeholder="Your email (optional)"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>
        )}

        <div className="relative">
          <textarea
            rows={3}
            required
            placeholder={
              user
                ? `Leave a thoughtful reply, ${user.name}...`
                : 'Share your perspective or ask a technical question...'
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition disabled:opacity-50 shadow-sm shadow-indigo-600/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Publishing...' : 'Post Comment'}</span>
          </button>
        </div>
      </form>

      {/* Comment List */}
      {comments.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center text-slate-500 text-xs">
          Be the first to join the conversation and share your insights on this architecture.
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              {/* Comment Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {comment.user?.avatar ? (
                    <img
                      src={comment.user.avatar}
                      alt={comment.authorName}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{comment.authorName}</span>
                      {comment.user?.role && comment.user.role !== 'READER' && (
                        <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                          {comment.user.role}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setReplyingToId(replyingToId === comment.id ? null : comment.id)
                  }
                  className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-semibold"
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>

              {/* Comment Text */}
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-11">
                {comment.content}
              </div>

              {/* Nested Reply Box */}
              {replyingToId === comment.id && (
                <form
                  onSubmit={(e) => handlePostComment(e, comment.id)}
                  className="mt-4 pl-11 space-y-2 animate-fadeIn"
                >
                  <textarea
                    rows={2}
                    required
                    placeholder={`Reply to ${comment.authorName}...`}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setReplyingToId(null)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || !replyContent.trim()}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                    >
                      {submitting ? 'Sending...' : 'Reply'}
                    </button>
                  </div>
                </form>
              )}

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 pl-8 sm:pl-11 space-y-3 border-l-2 border-slate-100">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        {reply.user?.avatar ? (
                          <img
                            src={reply.user.avatar}
                            alt={reply.authorName}
                            className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-[10px]">
                            {reply.authorName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-xs font-bold text-slate-900">{reply.authorName}</span>
                        {reply.user?.role && reply.user.role !== 'READER' && (
                          <span className="px-1.5 py-0.5 text-[8px] font-extrabold uppercase bg-indigo-50 text-indigo-700 rounded">
                            {reply.user.role}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500">
                          {new Date(reply.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="text-xs text-slate-700 leading-relaxed pl-8">
                        {reply.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
