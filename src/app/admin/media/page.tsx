'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { Upload, Copy, Check, Trash2, Plus } from 'lucide-react';

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Direct URL addition modal
  const [urlInput, setUrlInput] = useState('');
  const [altTextInput, setAltTextInput] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.success && data.data) {
        setMediaList(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddRemote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;

    setUploading(true);
    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput, altText: altTextInput }),
      });
      const data = await res.json();
      if (data.success) {
        setUrlInput('');
        setAltTextInput('');
        fetchMedia();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        title="Media Library"
        subtitle="Manage image assets, CDN URLs, and article cover illustrations."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Media Add Bar */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Upload className="w-4 h-4 text-indigo-600" />
            <span>Register Image Asset / Remote URL</span>
          </h3>

          <form onSubmit={handleAddRemote} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <input
              type="text"
              required
              placeholder="Image URL (e.g. https://images.unsplash.com/...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="sm:col-span-6 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
            <input
              type="text"
              placeholder="Alt description (optional)"
              value={altTextInput}
              onChange={(e) => setAltTextInput(e.target.value)}
              className="sm:col-span-4 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={uploading}
              className="sm:col-span-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-sm shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{uploading ? 'Adding...' : 'Add Image'}</span>
            </button>
          </form>
        </div>

        {/* Media Grid */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Asset Gallery ({mediaList.length})
            </h3>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 text-xs">Loading media assets...</div>
          ) : mediaList.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              No media uploaded yet. Add an image URL above to get started.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mediaList.map((m) => (
                <div
                  key={m.id}
                  className="group relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-indigo-300 transition flex flex-col shadow-2xs"
                >
                  <div className="h-28 overflow-hidden relative bg-slate-100">
                    <img src={m.url} alt={m.altText || m.filename} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2.5 bg-white flex items-center justify-between text-xs border-t border-slate-100">
                    <span className="text-[10px] text-slate-600 truncate max-w-[80px]">
                      {m.filename}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(m.id, m.url)}
                        className="p-1 rounded text-slate-400 hover:text-indigo-600 transition"
                        title="Copy Image URL"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1 rounded text-slate-400 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
