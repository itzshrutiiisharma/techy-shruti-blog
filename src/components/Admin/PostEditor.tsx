'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { slugify, calculateReadingTime } from '@/lib/slugify';
import {
  Save,
  Send,
  ArrowLeft,
  Image as ImageIcon,
  Clock,
  Search,
  CheckCircle,
  AlertCircle,
  Calendar,
  Globe,
  Share2,
} from 'lucide-react';
import Link from 'next/link';

interface PostEditorProps {
  initialData?: any;
  isEdit?: boolean;
}

export function PostEditor({ initialData, isEdit = false }: PostEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags ? initialData.tags.map((t: any) => t.name).join(', ') : ''
  );
  const [status, setStatus] = useState(initialData?.status || 'DRAFT');
  const [visibility, setVisibility] = useState(initialData?.visibility || 'PUBLIC');
  const [scheduledAt, setScheduledAt] = useState(
    initialData?.scheduledAt ? new Date(initialData.scheduledAt).toISOString().slice(0, 16) : ''
  );
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [isTrending, setIsTrending] = useState(initialData?.isTrending || false);

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');

  // UI state
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'seo'>('editor');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCategories(data.data);
          if (!categoryId && data.data.length > 0 && !isEdit) {
            setCategoryId(data.data[0].id);
          }
        }
      })
      .catch(console.error);
  }, []);

  // Update slug automatically when title changes if autoSlug enabled
  useEffect(() => {
    if (autoSlug && title) {
      setSlug(slugify(title));
    }
  }, [title, autoSlug]);

  const readingTime = calculateReadingTime(content);

  const handleSave = async (overrideStatus?: string) => {
    if (!title.trim() || !content.trim()) {
      setErrorMessage('Title and article content are required.');
      return;
    }

    setSaving(true);
    setSaveStatus('saving');
    setErrorMessage(null);

    const finalStatus = overrideStatus || status;

    const tagNames = tagsInput
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0);

    const payload = {
      title,
      slug: slug || slugify(title),
      excerpt,
      content,
      featuredImage: featuredImage || null,
      categoryId: categoryId || null,
      tagNames,
      status: finalStatus,
      visibility,
      scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      isFeatured,
      isTrending,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
    };

    try {
      const url = isEdit ? `/api/posts/${initialData.id}` : '/api/posts';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setSaveStatus('saved');
        setStatus(finalStatus);
        setTimeout(() => setSaveStatus('idle'), 3000);
        if (!isEdit) {
          router.push(`/admin/posts/${json.data.id}/edit`);
        }
      } else {
        setSaveStatus('error');
        setErrorMessage(json.error?.message || 'Failed to save post');
      }
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMessage(err.message || 'Network error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Editor Top Sticky Toolbar */}
      <div className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition"
            title="Back to Articles"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">
              {isEdit ? 'Edit Article' : 'New Article'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {status}
            </span>
          </div>

          {/* Auto-save / Status badge */}
          {saveStatus === 'saving' && (
            <span className="text-xs text-amber-600 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Saving...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              Saved
            </span>
          )}
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              activeTab === 'editor' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              activeTab === 'preview' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              activeTab === 'seo' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SEO Preview
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave('DRAFT')}
            disabled={saving}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 shadow-2xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => handleSave('PUBLISHED')}
            disabled={saving}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm shadow-indigo-600/20 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Now</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Workspace (Split Grid) */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Column: Editor or Live Preview or SEO */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'editor' && (
            <div className="space-y-4">
              {/* Title Input */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <input
                  type="text"
                  placeholder="Article Title (e.g. Distributed Consensus in Modern Edge Networks)..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent text-2xl sm:text-3xl font-extrabold text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Slug Input */}
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                <Globe className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span className="text-slate-400 font-mono">/blog/</span>
                <input
                  type="text"
                  placeholder="custom-article-slug"
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(e.target.value);
                  }}
                  className="bg-transparent text-slate-900 font-mono flex-1 focus:outline-none text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    setAutoSlug(true);
                    setSlug(slugify(title));
                  }}
                  className="text-[11px] text-indigo-600 hover:text-indigo-700 ml-2 font-semibold"
                >
                  Reset Auto
                </button>
              </div>

              {/* Excerpt */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Excerpt / Subtitle
                </label>
                <textarea
                  rows={2}
                  placeholder="Short compelling summary for editorial listings and RSS feeds..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              {/* Content Markdown Editor */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <label className="font-bold text-slate-500 uppercase tracking-wider">
                    Article Body (Markdown Supported)
                  </label>
                  <span className="text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    ~{readingTime} min read ({content.trim().split(/\s+/).filter(Boolean).length} words)
                  </span>
                </div>
                <textarea
                  rows={20}
                  placeholder="Write your in-depth architectural breakdown using Markdown...

## Section Heading

Use code blocks, lists, and blockquotes freely:

```typescript
const result = await pipeline.execute();
```"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-slate-900 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {categories.find((c) => c.id === categoryId)?.name || 'Category'}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
                  {title || 'Untitled Article'}
                </h1>
                {excerpt && <p className="text-base text-slate-600 mt-3">{excerpt}</p>}
              </div>

              {featuredImage && (
                <div className="rounded-2xl overflow-hidden max-h-96 bg-slate-100">
                  <img src={featuredImage} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Markdown Render */}
              <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
                {content || 'Start typing in the editor to see your live preview...'}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              {/* Google Search Card Preview */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  <Search className="w-4 h-4 text-indigo-600" />
                  <span>Google Search SERP Preview</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans space-y-1">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <span>shrutiblogs.com</span>
                    <span>›</span>
                    <span>blog</span>
                    <span>›</span>
                    <span className="text-indigo-600">{slug || 'article-slug'}</span>
                  </div>
                  <div className="text-base font-semibold text-blue-700 hover:underline cursor-pointer line-clamp-1">
                    {seoTitle || title || 'Shruti Blogs Article Title'}
                  </div>
                  <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {seoDescription || excerpt || 'Detailed architectural essay and deep engineering principles by Shruti Sharma.'}
                  </div>
                </div>
              </div>

              {/* Social OpenGraph Card Preview */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  <Share2 className="w-4 h-4 text-purple-600" />
                  <span>Social Share (Twitter/X & LinkedIn) Preview</span>
                </div>
                <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 max-w-md">
                  <div className="h-44 bg-slate-200 relative">
                    <img
                      src={featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'}
                      alt="OG"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-1 bg-white">
                    <span className="text-[10px] uppercase font-bold text-slate-400">SHRUTIBLOGS.COM</span>
                    <div className="text-sm font-bold text-slate-900 line-clamp-1">
                      {seoTitle || title || 'Shruti Blogs Article Title'}
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-2">
                      {seoDescription || excerpt || 'Comprehensive guide on modern architecture and engineering.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Publication Settings & Meta */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cover Image Settings */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Featured Cover Image
            </label>
            {featuredImage && (
              <div className="relative rounded-xl overflow-hidden h-36 border border-slate-200 bg-slate-100">
                <img src={featuredImage} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="relative">
              <ImageIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Category & Tags */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              >
                <option value="">Select a Category...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="Next.js, TypeScript, Architecture"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Publishing Schedule & Status */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Publishing Options
            </h4>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            {status === 'SCHEDULED' && (
              <div>
                <label className="block text-xs text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Scheduled Publication Date</span>
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-0"
                />
                <span>Feature in Hero Showcase</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="rounded border-slate-300 text-purple-600 focus:ring-0"
                />
                <span>Mark as Trending Story</span>
              </label>
            </div>
          </div>

          {/* SEO Override Fields */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              SEO Metadata Override
            </h4>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">SEO Title (Max 60 chars)</label>
              <input
                type="text"
                placeholder={title || 'Custom meta title'}
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                SEO Description (Max 160 chars)
              </label>
              <textarea
                rows={2}
                placeholder={excerpt || 'Custom meta description'}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
