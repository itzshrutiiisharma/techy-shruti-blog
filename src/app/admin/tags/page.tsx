'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { Tags, Edit, Trash2, AlertCircle } from 'lucide-react';
import { slugify } from '@/lib/slugify';

export default function AdminTagsPage() {
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tags');
      const data = await res.json();
      if (data.success && data.data) {
        setTags(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingId) {
      setSlug(slugify(val));
    }
  };

  const handleEditClick = (t: any) => {
    setEditingId(t.id);
    setName(t.name);
    setSlug(t.slug);
    setError(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const url = editingId ? `/api/tags/${editingId}` : '/api/tags';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug: slug || slugify(name) }),
      });

      const json = await res.json();
      if (json.success) {
        handleCancel();
        fetchTags();
      } else {
        setError(json.error?.message || 'Failed to save tag');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;
    try {
      const res = await fetch(`/api/tags/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTags((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        title="Tag Taxonomy"
        subtitle="Manage keyword tags, slug routing, and article associations."
      />

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Form */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 space-y-4 h-fit shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Tags className="w-4 h-4 text-pink-600" />
            <span>{editingId ? 'Edit Tag' : 'Create New Tag'}</span>
          </h3>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-700 font-semibold mb-1">Tag Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Distributed Systems"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-700 font-semibold mb-1">Slug</label>
              <input
                type="text"
                required
                placeholder="distributed-systems"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-xl transition shadow-sm shadow-pink-600/20 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update Tag' : 'Create Tag'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tags List */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Existing Tags ({tags.length})
            </h3>
          </div>

          <div className="p-4 flex flex-wrap gap-2.5">
            {loading ? (
              <div className="p-8 text-center text-slate-500 text-xs w-full">Loading tags...</div>
            ) : tags.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs w-full">No tags created yet.</div>
            ) : (
              tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs hover:border-pink-300 transition"
                >
                  <span className="font-semibold text-slate-900">#{tag.name}</span>
                  <span className="text-[10px] text-slate-500">({tag.postCount || 0})</span>
                  <button
                    onClick={() => handleEditClick(tag)}
                    className="text-slate-400 hover:text-indigo-600 transition ml-1"
                    title="Edit"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className="text-slate-400 hover:text-red-600 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
