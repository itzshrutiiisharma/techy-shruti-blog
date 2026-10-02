'use client';

import React, { useState } from 'react';
import { Twitter, Linkedin, Link as LinkIcon, Check, Bookmark, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';

export function ShareBar({
  postId,
  title,
  slug,
  initialLikeCount = 0,
}: {
  postId: string;
  title: string;
  slug: string;
  initialLikeCount?: number;
  initialBookmarkCount?: number;
}) {
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const articleUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleBookmark = async () => {
    if (!user) {
      openModal('login');
      return;
    }
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (data.success) {
        setBookmarked(data.data.bookmarked);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(articleUrl)}&via=shrutisharma`;

  const shareLinkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl
  )}`;

  return (
    <div className="flex items-center justify-between py-3 px-5 border-y border-[#E6E1D8] bg-[#FAF8F5] text-xs font-mono text-[#121110]">
      {/* Left: Like & Bookmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 border transition ${
            liked
              ? 'bg-[#E63B19] text-[#FAF8F5] border-[#E63B19]'
              : 'border-[#E6E1D8] hover:border-[#121110] bg-[#FAF8F5] text-[#121110]'
          }`}
          title="Applaud essay"
        >
          <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
          <span className="font-bold">{likes}</span>
        </button>

        <button
          onClick={handleBookmark}
          className={`flex items-center gap-1.5 px-3 py-1.5 border transition ${
            bookmarked
              ? 'bg-[#121110] text-[#FAF8F5] border-[#121110]'
              : 'border-[#E6E1D8] hover:border-[#121110] bg-[#FAF8F5] text-[#121110]'
          }`}
          title="Save to archive"
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          <span>{bookmarked ? 'SAVED' : 'SAVE TO ARCHIVE'}</span>
        </button>
      </div>

      {/* Right: Social & Copy */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-[#78716C] text-[10px] uppercase tracking-wider">SHARE:</span>
        <a
          href={shareTwitter}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 border border-[#E6E1D8] hover:border-[#121110] hover:text-[#E63B19] transition"
          title="Share on X"
        >
          <Twitter className="w-3.5 h-3.5" />
        </a>
        <a
          href={shareLinkedin}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 border border-[#E6E1D8] hover:border-[#121110] hover:text-[#E63B19] transition"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1.5 border border-[#E6E1D8] hover:border-[#121110] transition"
          title="Copy Article URL"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#E63B19]" />
              <span className="text-[#E63B19] font-bold">COPIED</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">COPY LINK</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
