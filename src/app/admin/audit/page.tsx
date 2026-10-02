'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { ShieldCheck, User, Calendar, Terminal } from 'lucide-react';

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit?limit=50');
      const data = await res.json();
      if (data.success && data.data) {
        setLogs(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="Security & System Audit Logs"
        subtitle="Chronological audit records of administrative changes, content updates, and staff actions."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        <div className="rounded-3xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Action</th>
                  <th className="p-4 font-semibold">Actor Email</th>
                  <th className="p-4 font-semibold">Target Entity</th>
                  <th className="p-4 font-semibold">Metadata Details</th>
                  <th className="p-4 font-semibold">IP Address</th>
                  <th className="p-4 font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-sans">
                      Loading security audit trail...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-sans">
                      No audit events recorded yet.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-900/40 transition">
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-md font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-800/40">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300 font-sans">{log.actorEmail}</td>
                      <td className="p-4 text-slate-400">{log.entity}</td>
                      <td className="p-4 text-slate-500 max-w-xs truncate">
                        {log.metadata ? JSON.stringify(log.metadata) : '—'}
                      </td>
                      <td className="p-4 text-slate-400">{log.ipAddress || '127.0.0.1'}</td>
                      <td className="p-4 text-slate-400 font-sans">
                        {new Date(log.createdAt).toLocaleString()}
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
