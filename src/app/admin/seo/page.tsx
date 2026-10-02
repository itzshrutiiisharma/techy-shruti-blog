'use client';

import React from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { CheckCircle, ExternalLink, Code } from 'lucide-react';
import Link from 'next/link';

export default function AdminSeoPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        title="SEO & Indexing Architecture"
        subtitle="Validate metadata pipelines, OpenGraph schemas, XML sitemaps, and robots configuration."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Dynamic Sitemap</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-base font-bold text-slate-900">/sitemap.xml</div>
            <Link
              href="/sitemap.xml"
              target="_blank"
              className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-semibold"
            >
              <span>Inspect XML Feed</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Robots Directive</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-base font-bold text-slate-900">/robots.txt</div>
            <Link
              href="/robots.txt"
              target="_blank"
              className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-semibold"
            >
              <span>View Directive</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">RSS 2.0 Syndication</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-base font-bold text-slate-900">/feed.xml</div>
            <Link
              href="/feed.xml"
              target="_blank"
              className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1 font-semibold"
            >
              <span>View RSS Feed</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Structured Data Details */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Code className="w-4 h-4 text-indigo-600" />
            <span>JSON-LD Structured Data Schema Pipeline</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every published article automatically injects schema.org `BlogPosting`, `BreadcrumbList`, and `Person` markup for instant Google rich snippet qualification.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto shadow-inner">
            <pre>{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "author": {
    "@type": "Person",
    "name": "Shruti Sharma",
    "url": "https://shrutiblogs.com/author/shruti-sharma"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Shruti Blogs",
    "logo": {
      "@type": "ImageObject",
      "url": "https://shrutiblogs.com/logo.png"
    }
  }
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
