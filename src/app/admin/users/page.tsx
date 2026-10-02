'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { Users, Shield, UserCheck, AlertTriangle } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success && data.data) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status: newStatus }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader
        title="User & Role Administration"
        subtitle="Manage permission levels (Admin, Editor, Author, Moderator, Reader) and account security."
      />

      <div className="p-6 sm:p-8 space-y-6 flex-1">
        <div className="rounded-3xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Loading user directory...
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/40 transition">
                      <td className="p-4 font-medium text-white flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                          {u.name.charAt(0)}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="p-4 text-slate-400">{u.email}</td>
                      <td className="p-4">
                        <select
                          value={u.role}
                          disabled={u.role === 'SUPER_ADMIN'}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-lg text-xs p-1.5 text-indigo-300 focus:outline-none"
                        >
                          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="EDITOR">EDITOR</option>
                          <option value="AUTHOR">AUTHOR</option>
                          <option value="MODERATOR">MODERATOR</option>
                          <option value="READER">READER</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              u.id,
                              u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
                            )
                          }
                          disabled={u.role === 'SUPER_ADMIN'}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition ${
                            u.status === 'ACTIVE'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900'
                              : 'bg-red-950/80 text-red-300 border border-red-800/40 hover:bg-red-900'
                          }`}
                        >
                          {u.status}
                        </button>
                      </td>
                      <td className="p-4 text-slate-500 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
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
