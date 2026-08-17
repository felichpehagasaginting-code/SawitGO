'use client';

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FileEdit,
  AlertTriangle,
  Star,
  CheckCircle2,
  Inbox,
  Clock
} from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { timeAgo, formatNumber } from '@/lib/format';
import type { ActivityFeedItem } from '@/lib/api/types';

type FeedFilter = 'today' | 'yesterday' | 'week';

interface ActivityStyle {
  icon: typeof FileEdit;
  iconBg: string;
  iconColor: string;
}

function getActionStyle(action: string): ActivityStyle {
  switch (action) {
    case 'REJECT_STALE':
      return {
        icon: AlertTriangle,
        iconBg: 'bg-[#FEF3F2] dark:bg-[#7F1D1D]/30',
        iconColor: 'text-[#B42318] dark:text-[#F87171]'
      };
    case 'UPDATE_OVERWRITE':
      return {
        icon: Star,
        iconBg: 'bg-[#FEF6EE] dark:bg-[#7C2D12]/30',
        iconColor: 'text-[#B93815] dark:text-[#FB923C]'
      };
    case 'INSERT':
      return {
        icon: FileEdit,
        iconBg: 'bg-[#EFF8FF] dark:bg-[#1E3A8A]/30',
        iconColor: 'text-[#175CD3] dark:text-[#60A5FA]'
      };
    default:
      return {
        icon: CheckCircle2,
        iconBg: 'bg-[#ECFDF3] dark:bg-[#064E3B]/30',
        iconColor: 'text-[#027A48] dark:text-[#34D399]'
      };
  }
}

function getTitle(item: ActivityFeedItem): string {
  const role = item.roleName ? ` (${item.roleName} W${item.roleWeight})` : '';
  switch (item.action) {
    case 'REJECT_STALE':
      return `Data Stale Ditolak${role}`;
    case 'UPDATE_OVERWRITE':
      return `Data Ter-overwrite${role}`;
    case 'INSERT':
      return `Data Panen Disinkronkan${role}`;
    default:
      return `Aktivitas Sinkronisasi${role}`;
  }
}

function getSubtitle(item: ActivityFeedItem): string {
  const location = item.tphNumber ? `${item.tphNumber} (${item.blockCode ?? 'Blok ?'})` : 'Sinkronisasi batch';
  if (item.action === 'REJECT_STALE' || item.action === 'UPDATE_OVERWRITE') {
    return `${location} • ${item.conflictReason ?? 'Resolusi konflik oleh Priority Score'}`;
  }
  return `${location} • Transaksi dicatat ke sistem`;
}

export function ActivityFeedStream() {
  const [filter, setFilter] = useState<FeedFilter>('today');

  const { data, isPending, isError } = useQuery({
    queryKey: ['activity-feed', 'all'],
    queryFn: () => apiEndpoints.getActivityFeed(30, 'all'),
  });

  const allItems = data ?? [];

  const filteredItems = useMemo(() => {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;

    return allItems.filter((item) => {
      const itemTime = new Date(item.createdAt).getTime();
      const diff = now - itemTime;

      switch (filter) {
        case 'today':
          return diff <= oneDayMs;
        case 'yesterday':
          return diff > oneDayMs && diff <= oneDayMs * 2;
        case 'week':
        default:
          return diff <= oneDayMs * 7;
      }
    });
  }, [allItems, filter]);

  return (
    <div className="bg-white dark:bg-[#0A0F1D] rounded-2xl p-6 border border-[#EAECF0] dark:border-[#1E293B] shadow-xs flex flex-col justify-between h-full font-sans transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#F8F9FB] dark:bg-[#1E293B] text-[#667085] dark:text-[#94A3B8] flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-[#475467] dark:text-[#94A3B8]">
              Arus Aktivitas Sinkronisasi Lapangan
            </span>
          </div>

          {/* Quick Date Filters */}
          <div className="flex items-center gap-1 bg-[#F8F9FB] dark:bg-[#1E293B] p-0.5 rounded-lg border border-[#EAECF0] dark:border-[#334155]">
            {(
              [
                { id: 'today', label: 'Hari Ini' },
                { id: 'yesterday', label: 'Kemarin' },
                { id: 'week', label: 'Minggu Ini' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${filter === tab.id
                    ? 'bg-white dark:bg-[#0F172A] text-[#101828] dark:text-[#F8FAFC] shadow-xs'
                    : 'text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stream List */}
        <div className="mt-4 space-y-3 max-h-[310px] overflow-y-auto pr-1">
          {isPending ? (
            <div className="py-12 text-center text-xs text-[#98A2B3] dark:text-[#64748B]">
              Memuat riwayat sinkronisasi…
            </div>
          ) : isError || filteredItems.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-xs text-[#98A2B3] dark:text-[#64748B] gap-1.5">
              <Inbox className="w-6 h-6 text-[#D0D5DD] dark:text-[#475467]" />
              <span>Tidak ada aktivitas untuk rentang waktu ini.</span>
            </div>
          ) : (
            filteredItems.map((item) => {
              const style = getActionStyle(item.action);
              const Icon = style.icon;
              const title = getTitle(item);
              const subtitle = getSubtitle(item);

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F9FB] dark:hover:bg-[#1E293B]/70 transition-colors border border-transparent hover:border-[#EAECF0] dark:hover:border-[#334155]"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${style.iconBg} ${style.iconColor} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC] truncate">
                        {title}
                      </h4>
                      <span className="text-[10px] text-[#98A2B3] dark:text-[#64748B] shrink-0 font-medium">
                        {timeAgo(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#667085] dark:text-[#94A3B8] truncate mt-0.5">
                      {subtitle}
                    </p>
                    <div className="text-[10px] text-[#98A2B3] dark:text-[#64748B] mt-1 font-mono flex items-center gap-1.5">
                      <span>Oleh: {item.userName} ({item.roleName ?? 'W' + item.roleWeight})</span>
                      <span>•</span>
                      <span>Score: {item.priorityScore}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between text-xs text-[#667085] dark:text-[#94A3B8]">
        <span>Total Terdata: {formatNumber(allItems.length)} aksi</span>
        <span className="text-[11px] text-[#98A2B3] dark:text-[#64748B]">Auto-refreshed 30s</span>
      </div>
    </div>
  );
}