'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import {
  FileText,
  Eye,
  MessageSquare,
  TrendingUp,
  PlusCircle,
  ArrowUpRight,
  ShieldCheck,
  FolderTree,
  Mail,
  RefreshCw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminOverviewPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [seeding, setSeeding] = useState(false);

  const fetchOverview = async (range = timeRange) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/analytics/overview?range=${range}`);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview(timeRange);
  }, [timeRange]);

  const handleRunSeed = async () => {
    setSeeding(true);
    try {
      await fetch('/api/seed', { method: 'POST' });
      await fetchOverview();
    } finally {
      setSeeding(false);
    }
  };

  const summary = data?.summary || {
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    scheduledPosts: 0,
    totalViews: 0,
    totalComments: 0,
    totalSubscribers: 0,
    totalUsers: 0,
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF8F5] text-[#121110]">
      <AdminHeader
        title={`Workstation // ${user?.name || 'Editor'}`}
        subtitle="Operational telemetry and publication metrics"
      />

      <div className="p-6 sm:p-8 space-y-8 flex-1">
        {/* Top Status & Sample Seed Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-[#E6E1D8] bg-[#F4EFE6] font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E63B19] animate-pulse" />
            <div>
              <div className="font-bold text-[#121110]">PUBLICATION STATUS: ONLINE // SYNCHRONIZED</div>
              <div className="text-[10px] text-[#78716C]">DATABASE ENGINE ATTACHED & QUERIED</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunSeed}
              disabled={seeding}
              className="px-3 py-1.5 border border-[#E6E1D8] hover:border-[#121110] bg-[#FAF8F5] text-[#121110] font-bold flex items-center gap-1.5 transition disabled:opacity-50"
              title="Reset and populate realistic articles and metrics"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${seeding ? 'animate-spin text-[#E63B19]' : ''}`} />
              <span>{seeding ? 'SEEDING DATABASE...' : 'SEED SAMPLE ESSAYS'}</span>
            </button>
            <Link
              href="/admin/posts/new"
              className="px-3.5 py-1.5 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] font-bold flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>WRITE ESSAY</span>
            </Link>
          </div>
        </div>

        {/* 4 Primary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 border border-[#E6E1D8] bg-[#F4EFE6] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#78716C] mb-2 font-mono text-[10px] uppercase tracking-wider">
              <span>Total Articles</span>
              <FileText className="w-3.5 h-3.5 text-[#121110]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#121110]">{summary.totalPosts}</div>
            <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-[#78716C]">
              <span className="text-[#121110] font-bold">{summary.publishedPosts} Published</span>
              <span>/</span>
              <span>{summary.draftPosts} Drafts</span>
            </div>
          </div>

          <div className="p-5 border border-[#E6E1D8] bg-[#F4EFE6] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#78716C] mb-2 font-mono text-[10px] uppercase tracking-wider">
              <span>Telemetry Views ({timeRange})</span>
              <Eye className="w-3.5 h-3.5 text-[#121110]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#121110]">{summary.totalViews.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-2 font-mono text-[10px] text-[#E63B19] font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>DATABASE TRACKED</span>
            </div>
          </div>

          <div className="p-5 border border-[#E6E1D8] bg-[#F4EFE6] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#78716C] mb-2 font-mono text-[10px] uppercase tracking-wider">
              <span>Reader Notes</span>
              <MessageSquare className="w-3.5 h-3.5 text-[#121110]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#121110]">{summary.totalComments}</div>
            <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-[#78716C]">
              <span className="text-[#121110] font-bold">{summary.totalComments - (summary.pendingComments || 0)} Approved</span>
              <span>/</span>
              <span>{summary.pendingComments || 0} Pending</span>
            </div>
          </div>

          <div className="p-5 border border-[#E6E1D8] bg-[#F4EFE6] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#78716C] mb-2 font-mono text-[10px] uppercase tracking-wider">
              <span>Subscribers</span>
              <Mail className="w-3.5 h-3.5 text-[#121110]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#121110]">{summary.totalSubscribers}</div>
            <div className="flex items-center gap-1 mt-2 font-mono text-[10px] text-[#78716C]">
              <span>{summary.totalUsers} registered reader profiles</span>
            </div>
          </div>
        </div>

        {/* Traffic Velocity Subdued Area Chart */}
        <div className="p-6 border border-[#E6E1D8] bg-[#F4EFE6]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest">
                TELEMETRY // TRAFFIC VELOCITY
              </div>
              <h3 className="font-serif text-xl font-bold text-[#121110]">
                Aggregated Publication Pageviews
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 border border-[#E6E1D8] font-mono text-xs">
              {['7d', '30d', '90d'].map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1 font-bold transition ${
                    timeRange === r
                      ? 'bg-[#121110] text-[#FAF8F5]'
                      : 'text-[#78716C] hover:text-[#121110]'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center font-mono text-xs text-[#78716C]">
                LOADING TELEMETRY DATA...
              </div>
            ) : data?.timeseries && data.timeseries.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.timeseries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#121110" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#121110" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6E1D8" vertical={false} />
                  <XAxis dataKey="date" stroke="#78716C" fontSize={10} fontStyle="normal" tickLine={false} />
                  <YAxis stroke="#78716C" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FAF8F5',
                      borderColor: '#121110',
                      borderRadius: '0px',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      color: '#121110',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#121110"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#viewsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center font-mono text-xs text-[#78716C]">
                NO TELEMETRY RECORDED YET. CLICK &apos;SEED SAMPLE ESSAYS&apos; ABOVE.
              </div>
            )}
          </div>
        </div>

        {/* Top Content & Management Shortcuts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top Articles Table */}
          <div className="lg:col-span-8 p-6 border border-[#E6E1D8] bg-[#F4EFE6] space-y-4">
            <div className="flex items-baseline justify-between border-b border-[#E6E1D8] pb-3">
              <div>
                <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest">
                  RANKING // POPULAR
                </div>
                <h3 className="font-serif text-lg font-bold text-[#121110]">Top Performing Essays</h3>
              </div>
              <Link href="/admin/posts" className="font-mono text-xs text-[#78716C] hover:text-[#E63B19]">
                VIEW ALL →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-[#121110]">
                <thead className="border-b border-[#E6E1D8] text-[#78716C] text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="pb-2 font-bold">Essay Title</th>
                    <th className="pb-2 font-bold">Author</th>
                    <th className="pb-2 font-bold text-right">Reads</th>
                    <th className="pb-2 font-bold text-right">Applauds</th>
                    <th className="pb-2 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E1D8]">
                  {data?.topPosts && data.topPosts.length > 0 ? (
                    data.topPosts.map((post: any) => (
                      <tr key={post.id} className="hover:bg-[#FAF8F5] transition">
                        <td className="py-3 font-serif font-bold text-sm text-[#121110] max-w-xs truncate pr-4">
                          {post.title}
                        </td>
                        <td className="py-3 text-[#57534E] text-xs">{post.author?.displayName || 'Author'}</td>
                        <td className="py-3 text-right font-bold text-[#121110]">
                          {post.viewCount.toLocaleString()}
                        </td>
                        <td className="py-3 text-right text-[#E63B19] font-medium">{post.likeCount}</td>
                        <td className="py-3 text-right">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="text-[#121110] hover:text-[#E63B19] font-bold"
                          >
                            EDIT →
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[#78716C]">
                        NO ARTICLES RECORDED IN DATABASE YET.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Management Shortcuts */}
          <div className="lg:col-span-4 p-6 border border-[#E6E1D8] bg-[#F4EFE6] space-y-4">
            <div className="border-b border-[#E6E1D8] pb-3">
              <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest">
                OPERATIONS // SHORTCUTS
              </div>
              <h3 className="font-serif text-lg font-bold text-[#121110]">Quick Actions</h3>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <Link
                href="/admin/posts/new"
                className="flex items-center justify-between p-3 border border-[#E6E1D8] bg-[#FAF8F5] hover:border-[#121110] transition group"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-4 h-4 text-[#121110]" />
                  <span className="font-bold">Write New Essay</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#78716C] group-hover:text-[#E63B19]" />
              </Link>

              <Link
                href="/admin/comments"
                className="flex items-center justify-between p-3 border border-[#E6E1D8] bg-[#FAF8F5] hover:border-[#121110] transition group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#121110]" />
                  <span className="font-bold">Moderate Reader Notes</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#78716C] group-hover:text-[#E63B19]" />
              </Link>

              <Link
                href="/admin/media"
                className="flex items-center justify-between p-3 border border-[#E6E1D8] bg-[#FAF8F5] hover:border-[#121110] transition group"
              >
                <div className="flex items-center gap-2.5">
                  <FolderTree className="w-4 h-4 text-[#121110]" />
                  <span className="font-bold">Media Repository</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#78716C] group-hover:text-[#E63B19]" />
              </Link>

              <Link
                href="/admin/seo"
                className="flex items-center justify-between p-3 border border-[#E6E1D8] bg-[#FAF8F5] hover:border-[#121110] transition group"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#121110]" />
                  <span className="font-bold">SEO & Sitemaps</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#78716C] group-hover:text-[#E63B19]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
