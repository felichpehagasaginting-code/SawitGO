'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Bell,
  X,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Truck,
  Layers,
  Clock,
  ExternalLink
} from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { timeAgo, formatDecimal } from '@/lib/format';
import type { RestanWarning, ActivityFeedItem } from '@/lib/api/types';

interface NotificationDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToView?: (view: string) => void;
}

export function NotificationDrawerModal({
  isOpen,
  onClose,
  onNavigateToView,
}: NotificationDrawerModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'restan' | 'sync'>('all');
  const queryClient = useQueryClient();

  const { data: restanData } = useQuery({
    queryKey: ['restan-warnings'],
    queryFn: apiEndpoints.getRestanWarnings,
    enabled: isOpen,
  });

  const { data: activityData } = useQuery({
    queryKey: ['activity-feed', 'all'],
    queryFn: () => apiEndpoints.getActivityFeed(20, 'all'),
    enabled: isOpen,
  });

  const pickupMutation = useMutation({
    mutationFn: (harvestId: string) => apiEndpoints.confirmPickup(harvestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restan-warnings'] });
      queryClient.invalidateQueries({ queryKey: ['kpi-metrics'] });
    },
  });

  if (!isOpen) return null;

  const restanList: RestanWarning[] = restanData?.warningList ?? [];
  const activityList: ActivityFeedItem[] = activityData ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#151D2C] h-full shadow-2xl border-l border-[#EAECF0] dark:border-[#1E293B] flex flex-col animate-in slide-in-from-right duration-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between bg-white dark:bg-[#151D2C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#D92D20] dark:text-[#F87171] flex items-center justify-center font-bold relative">
              <Bell className="w-5 h-5" />
              {restanList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D92D20] text-white text-[10px] flex items-center justify-center font-bold">
                  {restanList.length}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Pemberitahuan &amp; Alert</h2>
              <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Notifikasi operasional kebun real-time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#98A2B3] dark:text-[#64748B] hover:text-[#344054] dark:hover:text-[#F8FAFC] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[#EAECF0] dark:border-[#1E293B] bg-[#F8F9FB] dark:bg-[#111827]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white dark:bg-[#1E293B] text-[#101828] dark:text-[#F8FAFC] shadow-xs border border-[#EAECF0] dark:border-[#334155]'
                : 'text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC]'
            }`}
          >
            Semua ({restanList.length + activityList.slice(0, 5).length})
          </button>
          <button
            onClick={() => setActiveTab('restan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'restan'
                ? 'bg-white dark:bg-[#1E293B] text-[#D92D20] dark:text-[#F87171] shadow-xs border border-[#EAECF0] dark:border-[#334155]'
                : 'text-[#667085] dark:text-[#94A3B8] hover:text-[#D92D20] dark:hover:text-[#F87171]'
            }`}
          >
            Restan &amp; Kritis ({restanList.length})
          </button>
          <button
            onClick={() => setActiveTab('sync')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'sync'
                ? 'bg-white dark:bg-[#1E293B] text-[#2E7D32] dark:text-[#34D399] shadow-xs border border-[#EAECF0] dark:border-[#334155]'
                : 'text-[#667085] dark:text-[#94A3B8] hover:text-[#2E7D32] dark:hover:text-[#34D399]'
            }`}
          >
            Sinkronisasi
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Section: Restan Alerts */}
          {(activeTab === 'all' || activeTab === 'restan') && restanList.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#D92D20] dark:text-[#F87171] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Peringatan Restan &gt;24 Jam</span>
              </div>
              {restanList.map((item: RestanWarning) => (
                <div
                  key={item.harvestId}
                  className="p-3.5 rounded-xl bg-[#FEF3F2] dark:bg-[#7F1D1D]/20 border border-[#FECDCA] dark:border-[#DC2626]/40 space-y-2.5 transition-all hover:shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-[#B42318] dark:text-[#F87171] flex items-center gap-1.5">
                        <span>{item.tphNumber} ({item.blockCode})</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-[#111827] text-[#B42318] dark:text-[#F87171] border border-[#FECDCA] dark:border-[#DC2626]/40">
                          {item.elapsedHours} Jam
                        </span>
                      </div>
                      <div className="text-[11px] text-[#7A271A] dark:text-[#FCA5A5] mt-0.5">
                        {item.janjangCount} Janjang • FFA: {formatDecimal(item.estimatedFfaPercentage, 2)}%
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#D92D20] shrink-0 mt-1"></span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#FECDCA]/60 dark:border-[#DC2626]/30">
                    <span className="text-[10px] text-[#7A271A] dark:text-[#FCA5A5]">
                      Stage: {item.stage}
                    </span>
                    <button
                      onClick={() => pickupMutation.mutate(item.harvestId)}
                      disabled={pickupMutation.isPending}
                      className="px-2.5 py-1 rounded-lg bg-[#D92D20] hover:bg-[#B42318] text-white text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Truck className="w-3 h-3" />
                      <span>Dispatch Truk</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section: Live Activity / Sync Notifications */}
          {(activeTab === 'all' || activeTab === 'sync') && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#667085] dark:text-[#94A3B8] flex items-center gap-1.5 pt-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Aktivitas Sinkronisasi Lapangan</span>
              </div>
              {activityList.slice(0, 8).map((item: ActivityFeedItem) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] hover:bg-white dark:hover:bg-[#1E293B]/80 hover:shadow-xs transition-all flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#EFF8FF] dark:bg-[#1E3A8A]/30 text-[#175CD3] dark:text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    {item.action === 'REJECT_STALE' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D92D20] dark:text-[#F87171]" />
                    ) : item.action === 'UPDATE_OVERWRITE' ? (
                      <Layers className="w-3.5 h-3.5 text-[#F79009] dark:text-[#FB923C]" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#027A48] dark:text-[#34D399]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC] truncate">
                      {item.tphNumber ?? 'TPH Lapangan'} — {item.action}
                    </div>
                    <div className="text-[11px] text-[#667085] dark:text-[#94A3B8] truncate">
                      {item.userName} ({item.roleName}) • {timeAgo(item.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#EAECF0] dark:border-[#1E293B] bg-[#F8F9FB] dark:bg-[#111827] flex items-center justify-between">
          <button
            onClick={() => {
              if (onNavigateToView) {
                onNavigateToView('restan-risk');
              }
              onClose();
            }}
            className="text-xs font-bold text-[#2E7D32] dark:text-[#34D399] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Buka Panel Restan Lengkap</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#101828] dark:bg-white text-white dark:text-[#101828] text-xs font-semibold hover:bg-[#1E293B] cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
