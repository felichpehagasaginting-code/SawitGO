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
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { timeAgo, initials, formatScore } from '@/lib/format';
import type { ActivityFeedItem } from '@/lib/api/types';

interface TicketRow {
  id: string;
  subject: string;
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
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
  const priority = isStale ? 'Tinggi' : 'Sedang';
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
    status: isStale ? 'Stale Ditolak' : 'Ter-overwrite',
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
  const [filterPriority, setFilterPriority] = useState<'all' | 'Tinggi' | 'Sedang'>('all');
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

      const matchFilter = filterPriority === 'all' || t.priority === filterPriority;

      return matchSearch && matchFilter;
    });
  }, [tickets, searchQuery, filterPriority]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTickets.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTickets.map((t) => t.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] shadow-xs font-sans overflow-hidden transition-colors">
      {/* Header Controls */}
      <div className="p-6 border-b border-[#EAECF0] dark:border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">
              Daftar Eskalasi &amp; Jejak Resolusi Konflik
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3F2] dark:bg-[#7F1D1D]/40 text-[#D92D20] dark:text-[#F87171] border border-[#FECDCA] dark:border-[#DC2626]/40">
              {filteredTickets.length} insiden
            </span>
          </div>
          <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-1">
            Data mutasi konsensus offline multi-aktor berdasarkan kalkulasi Priority Score (Bobot × 10¹² + Timestamp).
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#98A2B3] dark:text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ID tiket, inisiator, TPH..."
              className="pl-9 pr-3 py-1.5 rounded-lg border border-[#EAECF0] dark:border-[#334155] bg-[#F8F9FB] dark:bg-[#1E293B] text-xs text-[#101828] dark:text-[#F8FAFC] placeholder-[#98A2B3] dark:placeholder-[#64748B] focus:outline-hidden focus:border-[#2E7D32] transition-colors w-48 sm:w-60"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EAECF0] dark:border-[#334155] bg-[#F8F9FB] dark:bg-[#1E293B] hover:bg-[#F2F4F7] dark:hover:bg-[#334155] text-xs font-medium text-[#344054] dark:text-[#E2E8F0] shadow-xs cursor-pointer transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
              <span>{filterPriority === 'all' ? 'Semua Prioritas' : `Prioritas: ${filterPriority}`}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#64748B]" />
            </button>
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 mt-1.5 z-20 bg-white dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl shadow-lg py-1 min-w-[150px]">
                  {(['all', 'Tinggi', 'Sedang'] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilterPriority(option);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer ${
                        filterPriority === option
                          ? 'text-[#2E7D32] dark:text-[#34D399] font-bold bg-[#E8F5E9]/60 dark:bg-[#064E3B]/40'
                          : 'text-[#344054] dark:text-[#E2E8F0]'
                      }`}
                    >
                      {option === 'all' ? 'Semua Prioritas' : option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#EAECF0] dark:border-[#1E293B] bg-[#F8F9FB] dark:bg-[#111827] text-[#667085] dark:text-[#94A3B8] font-semibold">
              <th className="py-3 px-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={
                    filteredTickets.length > 0 &&
                    selectedIds.length === filteredTickets.length
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-[#D0D5DD] text-[#2E7D32] focus:ring-[#2E7D32] cursor-pointer"
                />
              </th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#101828] dark:hover:text-[#F8FAFC]">
                  <span>ID &amp; Subjek Konflik</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Prioritas</th>
              <th className="py-3 px-4">Aktor / Inisiator</th>
              <th className="py-3 px-4">Status Konsensus</th>
              <th className="py-3 px-4">Waktu</th>
              <th className="py-3 px-4">Priority Score</th>
              <th className="py-3 px-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0] dark:divide-[#1E293B]">
            {isPending ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-[#98A2B3] dark:text-[#64748B]">
                  Memuat data eskalasi konflik dari backend…
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-[#D92D20] dark:text-[#F87171]">
                  Gagal memuat data eskalasi dari backend.
                </td>
              </tr>
            ) : filteredTickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-[#98A2B3] dark:text-[#64748B]">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Inbox className="w-8 h-8 text-[#D0D5DD] dark:text-[#475467]" />
                    <span>Tidak ada catatan konflik yang cocok.</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTickets.map((row) => {
                const isSelected = selectedIds.includes(row.id);

                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B]/60 transition-colors ${
                      isSelected ? 'bg-[#E8F5E9]/30 dark:bg-[#064E3B]/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(row.id)}
                        className="rounded border-[#D0D5DD] text-[#2E7D32] focus:ring-[#2E7D32] cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#101828] dark:text-[#F8FAFC]">
                        {row.id}
                      </div>
                      <div className="text-[11px] text-[#667085] dark:text-[#94A3B8] mt-0.5 max-w-sm truncate">
                        {row.subject}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-semibold flex items-center gap-1 ${row.priorityColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {row.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#E8F5E9] dark:bg-[#064E3B]/60 text-[#2E7D32] dark:text-[#34D399] font-bold text-[10px] flex items-center justify-center">
                          {row.assignedAvatar}
                        </div>
                        <div>
                          <div className="font-semibold text-[#101828] dark:text-[#F8FAFC]">
                            {row.assignedName}
                          </div>
                          <div className="text-[10px] text-[#98A2B3] dark:text-[#64748B]">
                            {row.assignedRole}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border font-mono ${row.statusColor}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#667085] dark:text-[#94A3B8] whitespace-nowrap">
                      {row.createdDate}
                    </td>
                    <td className={`py-3.5 px-4 whitespace-nowrap text-right ${row.slaDueColor}`}>
                      {row.slaDue}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="text-[#98A2B3] hover:text-[#344054] dark:hover:text-[#F8FAFC] p-1 rounded-md hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}