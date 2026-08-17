'use client';

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Clock,
  Flame,
  Truck,
  Loader2,
  CheckCircle2,
  Inbox
} from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { formatNumber, formatDecimal } from '@/lib/format';
import type { RestanWarning } from '@/lib/api/types';

interface StageStyle {
  label: string;
  chip: string;
  dot: string;
}

function getStageStyle(stage: string): StageStyle {
  switch (stage) {
    case 'RESTAN_OVERDUE':
      return {
        label: 'Restan Overdue (>24 jam)',
        chip: 'bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#B42318] dark:text-[#F87171] border-[#FECDCA] dark:border-[#DC2626]/40',
        dot: 'bg-[#D92D20]',
      };
    case 'CRITICAL_20H':
      return {
        label: 'Kritis (20–24 jam)',
        chip: 'bg-[#FFF4ED] dark:bg-[#7C2D12]/30 text-[#C4320A] dark:text-[#FB923C] border-[#FED7AA] dark:border-[#EA580C]/40',
        dot: 'bg-[#F79009]',
      };
    case 'WARNING_12H':
      return {
        label: 'Warning (12–20 jam)',
        chip: 'bg-[#FFFAEB] dark:bg-[#78350F]/30 text-[#B54708] dark:text-[#FBBF24] border-[#FEDF89] dark:border-[#D97706]/40',
        dot: 'bg-[#FDB022]',
      };
    default:
      return {
        label: stage,
        chip: 'bg-[#F8F9FB] dark:bg-[#1E293B] text-[#475467] dark:text-[#94A3B8] border-[#EAECF0] dark:border-[#334155]',
        dot: 'bg-[#98A2B3]',
      };
  }
}

export function RestanWarningPanel() {
  const queryClient = useQueryClient();
  const [actionErrors, setActionErrors] = useState<Record<string, string>>({});

  const { data, isPending, isError } = useQuery({
    queryKey: ['restan-warnings'],
    queryFn: apiEndpoints.getRestanWarnings,
  });

  const pickupMutation = useMutation({
    mutationFn: (harvestId: string) => apiEndpoints.confirmPickup(harvestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restan-warnings'] });
      queryClient.invalidateQueries({ queryKey: ['kpi-metrics'] });
      queryClient.invalidateQueries({ queryKey: ['activity-feed'] });
    },
    onError: (err, harvestId) => {
      setActionErrors((prev) => ({
        ...prev,
        [harvestId]: err instanceof Error ? err.message : 'Gagal konfirmasi pickup.',
      }));
    },
  });

  const response = data;
  const warnings = response?.warningList ?? [];
  const criticalCount = response?.criticalRestanCount ?? 0;

  return (
    <div className="bg-white dark:bg-[#151D2C] rounded-2xl p-6 border border-[#EAECF0] dark:border-[#1E293B] shadow-xs flex flex-col justify-between h-full font-sans transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#D92D20] dark:text-[#F87171] flex items-center justify-center">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-[#475467] dark:text-[#94A3B8]">
              Restan Risk &amp; FFA Deterioration
            </span>
          </div>

          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#B42318] dark:text-[#F87171] border border-[#FECDCA] dark:border-[#DC2626]/40">
            {criticalCount} Kritis
          </span>
        </div>

        {/* Summary Metric */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-[#101828] dark:text-[#F8FAFC] tracking-tight font-sans">
            {isPending ? '—' : formatNumber(response?.totalWarnings ?? 0)}
          </span>
          <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">
            TPH berisiko restan (&gt;12 jam)
          </span>
        </div>

        {/* Warnings List */}
        <div className="mt-4 space-y-3 max-h-[310px] overflow-y-auto pr-1">
          {isPending ? (
            <div className="py-12 text-center text-xs text-[#98A2B3] dark:text-[#64748B]">
              Memuat peringatan restan…
            </div>
          ) : isError || warnings.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-xs text-[#98A2B3] dark:text-[#64748B] gap-1.5">
              <Inbox className="w-6 h-6 text-[#D0D5DD] dark:text-[#475467]" />
              <span>Semua TPH aman. Tidak ada buah restan &gt;12 jam.</span>
            </div>
          ) : (
            warnings.map((w: RestanWarning) => {
              const style = getStageStyle(w.stage);
              const isOverdue = w.stage === 'RESTAN_OVERDUE';
              const isProcessing =
                pickupMutation.isPending &&
                pickupMutation.variables === w.harvestId;
              const errorMsg = actionErrors[w.harvestId];

              return (
                <div
                  key={w.harvestId}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isOverdue
                      ? 'bg-[#FEF3F2] dark:bg-[#7F1D1D]/20 border-[#FECDCA] dark:border-[#DC2626]/40'
                      : 'bg-[#F8F9FB] dark:bg-[#1E293B] border-[#EAECF0] dark:border-[#334155]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${style.dot} ${
                            isOverdue ? 'animate-pulse' : ''
                          }`}
                        />
                        <h4 className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC]">
                          {w.tphNumber} ({w.blockCode})
                        </h4>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full border ${style.chip}`}
                        >
                          {w.elapsedHours} jam
                        </span>
                      </div>

                      <div className="text-[11px] text-[#667085] dark:text-[#94A3B8] mt-1 flex items-center gap-2">
                        <span>{formatNumber(w.janjangCount)} Janjang</span>
                        <span>•</span>
                        <span className="font-semibold text-[#D92D20] dark:text-[#F87171]">
                          Est. FFA {formatDecimal(w.estimatedFfaPercentage, 2)}%
                        </span>
                      </div>
                    </div>

                    {/* Quick Pickup Button */}
                    <button
                      onClick={() => pickupMutation.mutate(w.harvestId)}
                      disabled={isProcessing}
                      className="px-2.5 py-1 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-[11px] font-bold transition-colors flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Truck className="w-3 h-3" />
                      )}
                      <span>Dispatch Truk</span>
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="mt-2 text-[10px] text-[#D92D20] dark:text-[#F87171] font-semibold">
                      {errorMsg}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between text-xs text-[#667085] dark:text-[#94A3B8]">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#D92D20] dark:text-[#F87171]" />
          <span>SLA Angkut: Maksimal 24 Jam</span>
        </div>
        <span className="text-[11px] text-[#98A2B3] dark:text-[#64748B]">
          Target FFA Pabrik &lt; 3.0%
        </span>
      </div>
    </div>
  );
}