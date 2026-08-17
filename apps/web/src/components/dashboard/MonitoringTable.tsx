'use client';

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Search,
  Filter,
  MoreVertical,
  ArrowUpDown,
  AlertTriangle,
  Inbox,
  ShieldAlert
} from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { timeAgo, initials, formatScore } from '@/lib/format';
import type { ActivityFeedItem } from '@/lib/api/types';

interface TicketRow {
  id: string;
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  priorityColor: string;
  assignedName: string;
  assignedAvatar: string;
  assignedRole: string;
  status: string;
  statusColor: string;
  createdDate: string;
  slaDue: string;
  slaDueColor: string;
}

function toTicket(item: ActivityFeedItem, index: number): TicketRow {
  const isStale = item.action === 'REJECT_STALE';
  const priority = isStale ? 'High' : 'Medium';
  const subject = item.tphNumber
    ? `Konflik ${item.tphNumber} — ${item.conflictReason ?? 'Resolusi Priority Score'}`
    : item.conflictReason ?? 'Resolusi konflik sinkronisasi';

  return {
    id: `#${item.id.slice(0, 5).toUpperCase()}-${index + 1}`,
    subject: subject.length > 72 ? `${subject.slice(0, 72)}…` : subject,
    priority,
    priorityColor: isStale ? 'text-[#D92D20] dark:text-[#F87171]' : 'text-[#F79009] dark:text-[#FBBF24]',
    assignedName: item.userName,
    assignedAvatar: initials(item.userName),
    assignedRole: `${item.roleName ?? 'User'} (W${item.roleWeight})`,
    status: isStale ? 'Stale Rejected' : 'Overwritten',
    statusColor: isStale
      ? 'bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#B42318] dark:text-[#F87171] border-[#FECDCA] dark:border-[#DC2626]/40'
      : 'bg-[#FFFAEB] dark:bg-[#78350F]/30 text-[#B54708] dark:text-[#FBBF24] border-[#FEDF89] dark:border-[#D97706]/40',
    createdDate: timeAgo(item.createdAt),
    slaDue: formatScore(item.priorityScore),
    slaDueColor: isStale ? 'text-[#D92D20] dark:text-[#F87171] font-bold' : 'text-[#667085] dark:text-[#94A3B8] font-mono',
  };
}

export function MonitoringTable() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'High' | 'Medium'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: ['activity-feed', 'conflict'],
    queryFn: () => apiEndpoints.getActivityFeed(50, 'conflict'),
  });

  const rawItems = data ?? [];

  const tickets = useMemo(() => {
    return rawItems.map((item, idx) => toTicket(item, idx));
  }, [rawItems]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchSearch =
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.assignedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchPriority =
        filterPriority === 'all' ? true : t.priority === filterPriority;

      return matchSearch && matchPriority;
    });
  }, [tickets, searchQuery, filterPriority]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredTickets.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTickets.map((t) => t.id));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] shadow-xs overflow-hidden font-sans transition-colors">
      {/* Table Header & Toolbar */}
      <div className="p-6 border-b border-[#EAECF0] dark:border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">
              Resolusi Konflik &amp; Audit Trail
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F2F4F7] dark:bg-[#1E293B] text-[#344054] dark:text-[#94A3B8] border border-[#EAECF0] dark:border-[#334155]">
              {filteredTickets.length} insiden
            </span>
          </div>
          <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-1">
            Riwayat otomatis mutasi data saat tabrakan sinkronisasi offline di TPH
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#64748B] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari ID, nama, tph..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#101828] dark:text-[#F8FAFC] placeholder-[#98A2B3] dark:placeholder-[#64748B] focus:bg-white dark:focus:bg-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#2E7D32] transition-all w-48 lg:w-60"
            />
          </div>

          {/* Filter Priority Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EAECF0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-xs font-medium text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#334155] cursor-pointer transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
              <span>
                {filterPriority === 'all'
                  ? 'Semua Status'
                  : filterPriority === 'High'
                  ? 'Stale Rejection'
                  : 'Overwrite'}
              </span>
            </button>
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 mt-1.5 z-20 bg-white dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl shadow-lg py-1 min-w-[160px]">
                  {(
                    [
                      { id: 'all', label: 'Semua Status' },
                      { id: 'High', label: 'Stale Rejection (High)' },
                      { id: 'Medium', label: 'Overwrite (Medium)' },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setFilterPriority(option.id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer ${
                        filterPriority === option.id
                          ? 'text-[#2E7D32] dark:text-[#34D399] font-bold bg-[#E8F5E9]/60 dark:bg-[#064E3B]/40'
                          : 'text-[#344054] dark:text-[#E2E8F0]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table Canvas */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F9FB] dark:bg-[#111827] border-b border-[#EAECF0] dark:border-[#1E293B] text-[11px] font-bold uppercase tracking-wider text-[#667085] dark:text-[#94A3B8]">
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={
                    filteredTickets.length > 0 &&
                    selectedIds.length === filteredTickets.length
                  }
                  onChange={handleSelectAll}
                  className="rounded border-[#D0D5DD] dark:border-[#475467] text-[#2E7D32] focus:ring-[#2E7D32] cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">Subject / Insiden</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Petugas / Role</th>
              <th className="py-3 px-4">Aksi Konsensus</th>
              <th className="py-3 px-4">Waktu</th>
              <th className="py-3 px-4">Priority Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] dark:divide-[#1E293B] text-xs">
            {isPending ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#98A2B3] dark:text-[#64748B]">
                  Memuat data resolusi konflik…
                </td>
              </tr>
            ) : isError || filteredTickets.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#98A2B3] dark:text-[#64748B]">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Inbox className="w-6 h-6 text-[#D0D5DD] dark:text-[#475467]" />
                    <span>Tidak ada konflik sinkronisasi yang cocok dengan filter.</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTickets.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-[#F8F9FB] dark:hover:bg-[#1E293B]/70 transition-colors cursor-pointer ${
                      isSelected ? 'bg-[#E8F5E9]/30 dark:bg-[#064E3B]/20' : ''
                    }`}
                    onClick={() => handleSelectRow(row.id)}
                  >
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(row.id)}
                        className="rounded border-[#D0D5DD] dark:border-[#475467] text-[#2E7D32] focus:ring-[#2E7D32] cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#101828] dark:text-[#F8FAFC]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-[#98A2B3] dark:text-[#64748B] shrink-0">
                          {row.id}
                        </span>
                        <span className="truncate max-w-xs">{row.subject}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-bold flex items-center gap-1 ${row.priorityColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {row.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#E8F5E9] dark:bg-[#064E3B]/60 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center font-bold text-[10px]">
                          {row.assignedAvatar}
                        </div>
                        <div className="leading-tight">
                          <span className="font-medium text-[#101828] dark:text-[#F8FAFC]">
                            {row.assignedName}
                          </span>
                          <span className="text-[10px] text-[#667085] dark:text-[#94A3B8] block">
                            {row.assignedRole}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${row.statusColor}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#667085] dark:text-[#94A3B8] whitespace-nowrap">
                      {row.createdDate}
                    </td>
                    <td className={`py-3.5 px-4 ${row.slaDueColor}`}>
                      {row.slaDue}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 border-t border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between text-xs text-[#667085] dark:text-[#94A3B8] bg-[#F8F9FB] dark:bg-[#111827]">
        <span>
          {selectedIds.length} dari {filteredTickets.length} baris dipilih
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#98A2B3] dark:text-[#64748B]">
            Rumus: W × 1000 + Jjg × 2 + (100 - FFA)
          </span>
        </div>
      </div>
    </div>
  );
}