'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { Settings, Save, CheckCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('Shruti Blogs');
  const [siteTagline, setSiteTagline] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [moderationMode, setModerationMode] = useState('AUTO_APPROVE');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const d = json.data;
          if (d.site_name) setSiteName(d.site_name);
          if (d.site_tagline) setSiteTagline(d.site_tagline);
          if (d.site_description) setSiteDescription(d.site_description);
          if (d.contact_email) setContactEmail(d.contact_email);
          if (d.comments_enabled !== undefined) setCommentsEnabled(d.comments_enabled);
          if (d.comments_moderation_mode) setModerationMode(d.comments_moderation_mode);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_name: siteName,
          site_tagline: siteTagline,
          site_description: siteDescription,
          contact_email: contactEmail,
          comments_enabled: commentsEnabled,
          comments_moderation_mode: moderationMode,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        title="Site Settings & Editorial Policy"
        subtitle="Configure branding, editorial contact, moderation policies, and platform defaults."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1 max-w-4xl">
        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">Platform settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-indigo-600" />
              <span>General Publication Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  required
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact & Editorial Inquiries Email
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Site Tagline
              </label>
              <input
                type="text"
                value={siteTagline}
                onChange={(e) => setSiteTagline(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Editorial Description
              </label>
              <textarea
                rows={3}
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Community & Commenting Policy</h3>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={commentsEnabled}
                  onChange={(e) => setCommentsEnabled(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-0"
                />
                <span className="font-semibold">Enable Reader Comments on Published Articles</span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Moderation Workflow Mode
                </label>
                <select
                  value={moderationMode}
                  onChange={(e) => setModerationMode(e.target.value)}
                  className="w-full sm:w-64 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
                >
                  <option value="AUTO_APPROVE">Auto-Approve Comments</option>
                  <option value="MANUAL_REVIEW">Hold All Comments for Staff Review</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
