'use client'

import React, { useState } from 'react'
import {
  UserCheck,
  Plus,
  Shield,
  Search,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { MOCK_ADMIN_USERS, type AdminUser } from '@/data/adminData'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-brand-400" />
            User & Role-Based Access Control (RBAC)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Separate permission tiers for Super Admins, Case Managers, Hospital Partners, and Medical Reviewers.
          </p>
        </div>

        <Button variant="accent" size="sm" className="font-bold">
          <Plus className="h-3.5 w-3.5 mr-1" /> Invite Team Member
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-3.5">User & Email</th>
              <th className="p-3.5">Role Tier</th>
              <th className="p-3.5">Assigned Department</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Last Active</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-3.5">
                  <div className="font-bold text-white">{u.name}</div>
                  <div className="text-[10px] text-slate-400">{u.email}</div>
                </td>
                <td className="p-3.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'super_admin'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : u.role === 'case_manager'
                        ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                        : u.role === 'medical_reviewer'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {u.role.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="p-3.5 text-slate-300">{u.assignedDepartment}</td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </span>
                </td>
                <td className="p-3.5 text-slate-400">{u.lastActive}</td>
                <td className="p-3.5 text-right">
                  <button className="text-brand-400 hover:text-brand-300 font-semibold text-[11px] bg-slate-800 px-2.5 py-1 rounded">
                    Edit Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
