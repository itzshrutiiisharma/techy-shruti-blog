'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import {
  BarChart3,
  TrendingUp,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Compass,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('30d');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics/overview?range=${range}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .finally(() => setLoading(false));
  }, [range]);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="Performance & Traffic Analytics"
        subtitle="Real database metrics tracking pageviews, referral channels, and device distribution."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Time Selector Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0F172A] border border-slate-800">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Analysis Window:
          </span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {['7d', '30d', '90d', '1y'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  range === r
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Big Chart */}
        <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-6">Daily Pageviews Velocity</h3>
          <div className="h-72 w-full">
            {data?.timeseries && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.timeseries}>
                  <defs>
                    <linearGradient id="anGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818CF8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#818CF8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1120',
                      borderColor: '#334155',
                      borderRadius: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#818CF8"
                    strokeWidth={2.5}
                    fill="url(#anGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Two Column Grid: Devices & Traffic Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Devices Breakdown */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Monitor className="w-4 h-4 text-indigo-400" />
              <span>Device Distribution</span>
            </h3>
            <div className="space-y-3 pt-2">
              {data?.devices?.map((dev: any) => (
                <div key={dev.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium capitalize">{dev.name}</span>
                    <span className="text-indigo-400 font-bold">{dev.count} views</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${Math.min(100, (dev.count / (data.summary.totalViews || 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Sources Breakdown */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Traffic Inbound Channels</span>
            </h3>
            <div className="space-y-3 pt-2">
              {data?.sources?.map((src: any) => (
                <div key={src.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium capitalize">{src.name}</span>
                    <span className="text-purple-400 font-bold">{src.count} views</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${Math.min(100, (src.count / (data.summary.totalViews || 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
