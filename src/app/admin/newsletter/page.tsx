'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { Mail, Download, CheckCircle, Clock } from 'lucide-react';

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter');
      const data = await res.json();
      if (data.success && data.data) {
        setSubscribers(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Email,Status,SubscribedAt']
        .concat(
          subscribers.map(
            (s) => `${s.email},${s.status},${new Date(s.subscribedAt).toISOString()}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `shruti-blogs-subscribers-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="Newsletter Subscribers"
        subtitle="Manage active subscribers, audience growth, and campaign export."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Export & Metrics Bar */}
        <div className="flex items-center justify-between p-6 rounded-3xl bg-[#0F172A] border border-slate-800">
          <div>
            <div className="text-2xl font-extrabold text-white">{subscribers.length}</div>
            <div className="text-xs text-slate-400">Total verified editorial subscribers</div>
          </div>

          <button
            onClick={handleExportCSV}
            disabled={subscribers.length === 0}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition shadow-md shadow-indigo-600/30 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export Subscribers CSV</span>
          </button>
        </div>

        {/* Subscribers Table */}
        <div className="rounded-3xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Subscriber Email</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Subscribed Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-500">
                      Loading subscriber list...
                    </td>
                  </tr>
                ) : subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-500">
                      No subscribers registered yet.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-900/40 transition">
                      <td className="p-4 font-medium text-white flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{sub.email}</span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            sub.status === 'ACTIVE'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">
                        {new Date(sub.subscribedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
