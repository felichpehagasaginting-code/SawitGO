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
        label: 'Restan Kadaluarsa (>24 jam)',
        chip: 'bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#B42318] dark:text-[#F87171] border-[#FECDCA] dark:border-[#DC2626]/40',
        dot: 'bg-[#D92D20]',
      };
    case 'CRITICAL_20H':
      return {
        label: 'Kritis Restan (20–24 jam)',
        chip: 'bg-[#FFF4ED] dark:bg-[#7C2D12]/30 text-[#C4320A] dark:text-[#FB923C] border-[#FED7AA] dark:border-[#EA580C]/40',
        dot: 'bg-[#F79009]',
      };
    case 'WARNING_12H':
      return {
        label: 'Peringatan Restan (12–20 jam)',
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
        [harvestId]: err instanceof Error ? err.message : 'Gagal konfirmasi pengangkutan.',
      }));
    },
  });

  const response = data;
  const warnings = response?.warningList ?? [];
  const criticalCount = response?.criticalRestanCount ?? 0;

  return (
    <div className="bg-white dark:bg-[#0A0F1D] rounded-2xl p-6 border border-[#EAECF0] dark:border-[#1E293B] shadow-xs flex flex-col justify-between h-full font-sans transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#D92D20] dark:text-[#F87171] flex items-center justify-center">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-[#475467] dark:text-[#94A3B8]">
              Peringatan Risiko Restan &amp; Kenaikan ALB (FFA)
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#D92D20] dark:text-[#F87171] bg-[#FEF3F2] dark:bg-[#7F1D1D]/40 px-2 py-0.5 rounded-full border border-[#FECDCA] dark:border-[#DC2626]/40">
            {criticalCount} TPH Kritis
          </span>
        </div>

        {/* Warning List */}
        <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {isPending ? (
            <div className="py-12 text-center text-xs text-[#98A2B3] dark:text-[#64748B]">
              Memuat data risiko restan lapangan…
            </div>
          ) : isError ? (
            <div className="py-12 text-center text-xs text-[#D92D20] dark:text-[#F87171]">
              Gagal memuat status restan.
            </div>
          ) : warnings.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-xs text-[#98A2B3] dark:text-[#64748B] gap-1.5">
              <Inbox className="w-6 h-6 text-[#D0D5DD] dark:text-[#475467]" />
              <span>Semua TPH aman. Tidak ada buah restan &gt;12 jam.</span>
            </div>
          ) : (
            warnings.map((w: RestanWarning) => {
              const style = getStageStyle(w.stage);
              const isActionLoading = pickupMutation.isPending && pickupMutation.variables === w.harvestId;
              const errorMsg = actionErrors[w.harvestId];

              return (
                <div
                  key={w.harvestId}
                  className="p-3 rounded-xl border border-[#EAECF0] dark:border-[#334155] bg-[#F8F9FB] dark:bg-[#1E293B]/60 hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC]">
                          {w.tphNumber} ({w.blockCode})
                        </h4>
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border ${style.chip}`}
                        >
                          <span className={`w-1 h-1 rounded-full ${style.dot}`}></span>
                          {style.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#667085] dark:text-[#94A3B8] mt-0.5 font-medium">
                        {formatNumber(w.janjangCount)} janjang ({formatDecimal(w.janjangCount * 18.5)} kg)
                      </p>
                    </div>

                    {/* FFA Counter */}
                    <div className="text-right shrink-0">
                      <div className="text-xs font-black text-[#D92D20] dark:text-[#F87171] font-mono">
                        ALB {formatDecimal(w.estimatedFfaPercentage)}%
                      </div>
                      <div className="text-[10px] text-[#98A2B3] dark:text-[#64748B] flex items-center gap-1 justify-end">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{formatDecimal(w.elapsedHours, 1)} jam</span>
                      </div>
                    </div>
                  </div>

                  {/* Error Message if Action Failed */}
                  {errorMsg && (
                    <div className="text-[10px] text-[#D92D20] dark:text-[#F87171] font-semibold bg-[#FEF3F2] dark:bg-[#7F1D1D]/40 p-1.5 rounded-lg border border-[#FECDCA] dark:border-[#DC2626]/40">
                      {errorMsg}
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#EAECF0] dark:border-[#334155]">
                    <span className="text-[10px] text-[#667085] dark:text-[#94A3B8]">
                      Prioritas Dispatch Truk Pabrik
                    </span>
                    <button
                      onClick={() => pickupMutation.mutate(w.harvestId)}
                      disabled={isActionLoading}
                      className="px-2.5 py-1 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-[10px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      {isActionLoading ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Memproses…</span>
                        </>
                      ) : (
                        <>
                          <Truck className="w-3 h-3" />
                          <span>Dispatch Truk Angkut</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between text-[11px] text-[#667085] dark:text-[#94A3B8]">
        <span>Model Degradasi: ALB = ALB₀ + 0.08 × Jam</span>
        <span className="font-semibold text-[#D92D20] dark:text-[#F87171]">Batas Maks: 3.0%</span>
      </div>
    </div>
  );
}