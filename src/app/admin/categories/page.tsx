'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { FolderTree, Edit, Trash2, AlertCircle } from 'lucide-react';
import { slugify } from '@/lib/slugify';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success && data.data) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingId) {
      setSlug(slugify(val));
    }
  };

  const handleEditClick = (cat: any) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setImage(cat.image || '');
    setError(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setDescription('');
    setImage('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const url = editingId ? `/api/categories/${editingId}` : '/api/categories';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug: slug || slugify(name), description, image }),
      });

      const json = await res.json();
      if (json.success) {
        handleCancel();
        fetchCategories();
      } else {
        setError(json.error?.message || 'Failed to save category');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Associated posts will have category unset.')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        title="Category Management"
        subtitle="Organize editorial topics, slugs, and cover illustrations."
      />

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Col: Create / Edit Form */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 space-y-4 h-fit shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-indigo-600" />
            <span>{editingId ? 'Edit Category' : 'Create New Category'}</span>
          </h3>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                required
                placeholder="e.g. AI & Machine Learning"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-700 font-semibold mb-1">Slug</label>
              <input
                type="text"
                required
                placeholder="ai-machine-learning"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-700 font-semibold mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Brief summary of articles in this topic..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-700 font-semibold mb-1">Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-sm shadow-indigo-600/20 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update Category' : 'Create Category'}
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

        {/* Right Col: Categories List */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Existing Categories ({categories.length})
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-500 text-xs">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">No categories created yet.</div>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-xl object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                        <FolderTree className="w-5 h-5 text-indigo-600" />
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-900">{cat.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">/category/{cat.slug}</div>
                      <div className="text-[10px] text-indigo-600 font-semibold mt-0.5">{cat.postCount} published articles</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditClick(cat)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                      title="Edit Category"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                      title="Delete Category"
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
    </div>
  );
}
