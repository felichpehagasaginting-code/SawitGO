'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tag, Calendar, ArrowUpRight, ArrowDownRight, ChevronDown, BarChart3 } from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { formatNumber, formatDecimal, weekdayLabel, fullDateLabel } from '@/lib/format';

export function VolumeTrendChart() {
  const [range, setRange] = useState<7 | 30>(7);
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ['volume-trend', range],
    queryFn: () => apiEndpoints.getVolumeTrend(range),
  });

  const days = data ?? [];
  const maxJanjang = Math.max(...days.map((d) => d.totalJanjang), 1);
  const totalJanjang = days.reduce((acc, d) => acc + d.totalJanjang, 0);
  const totalTonase = days.reduce((acc, d) => acc + d.tonaseTon, 0);

  // Kalkulasi Tren Riil (Bandingkan separuh periode kedua vs pertama)
  const trendMetrics = useMemo(() => {
    if (days.length < 2) return { percent: 0, isPositive: true };

    const mid = Math.floor(days.length / 2);
    const firstHalf = days.slice(0, mid).reduce((sum, d) => sum + d.totalJanjang, 0);
    const secondHalf = days.slice(mid).reduce((sum, d) => sum + d.totalJanjang, 0);

    if (firstHalf === 0) {
      return {
        percent: secondHalf > 0 ? 100 : 0,
        isPositive: secondHalf >= 0,
      };
    }

    const pct = Math.round(((secondHalf - firstHalf) / firstHalf) * 1000) / 10;
    return {
      percent: pct,
      isPositive: pct >= 0,
    };
  }, [days]);

  const activeItem = days.find((d) => d.date === activeDate) ?? null;

  return (
    <div className="bg-white dark:bg-[#0A0F1D] rounded-2xl p-6 border border-[#EAECF0] dark:border-[#1E293B] shadow-xs flex flex-col justify-between h-full font-sans transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#F8F9FB] dark:bg-[#1E293B] text-[#667085] dark:text-[#94A3B8] flex items-center justify-center">
            <Tag className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-[#475467] dark:text-[#94A3B8]">
            Volume Panen TBS &amp; Estimasi Tonase
          </span>
        </div>

        {/* Range Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRangeOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EAECF0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-xs font-medium text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#334155] cursor-pointer shadow-xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
            <span>{range} hari terakhir</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#64748B]" />
          </button>
          {isRangeOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsRangeOpen(false)} />
              <div className="absolute right-0 mt-1.5 z-20 bg-white dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl shadow-lg py-1 min-w-[160px]">
                {([7, 30] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setRange(option);
                      setActiveDate(null);
                      setIsRangeOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer ${range === option
                        ? 'text-[#2E7D32] dark:text-[#34D399] font-bold bg-[#E8F5E9]/60 dark:bg-[#064E3B]/40'
                        : 'text-[#344054] dark:text-[#E2E8F0]'
                      }`}
                  >
                    {option} hari terakhir
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Primary KPI Header with Real Calculated Trend */}
      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-extrabold text-[#101828] dark:text-[#F8FAFC] tracking-tight font-sans">
          {isPending ? '—' : `${formatNumber(totalJanjang)} Jjg`}
        </span>
        <span className="text-sm font-semibold text-[#667085] dark:text-[#94A3B8]">
          ≈ {isPending ? '—' : `${formatDecimal(totalTonase)} Ton`}
        </span>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full border ${trendMetrics.isPositive
              ? 'text-[#10B981] bg-[#ECFDF5] dark:bg-[#064E3B]/40 border-[#A7F3D0] dark:border-[#059669]/40'
              : 'text-[#EF4444] bg-[#FEF2F2] dark:bg-[#7F1D1D]/40 border-[#FECACA] dark:border-[#DC2626]/40'
            }`}
        >
          {trendMetrics.isPositive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {trendMetrics.percent >= 0 ? `+${formatDecimal(trendMetrics.percent, 1)}%` : `${formatDecimal(trendMetrics.percent, 1)}%`}
        </span>
      </div>

      {/* Bar Chart Canvas */}
      <div className="mt-6 flex-1 min-h-[190px] flex items-end justify-between gap-2 pt-4">
        {isPending ? (
          <div className="w-full h-40 flex items-center justify-center text-xs text-[#98A2B3] dark:text-[#64748B]">
            Memuat grafik tren volume…
          </div>
        ) : isError || days.length === 0 ? (
          <div className="w-full h-40 flex flex-col items-center justify-center text-xs text-[#98A2B3] dark:text-[#64748B] gap-1">
            <BarChart3 className="w-6 h-6 text-[#D0D5DD] dark:text-[#475467]" />
            <span>Tidak ada data volume untuk rentang ini.</span>
          </div>
        ) : (
          days.map((item) => {
            const heightPercent = Math.max(Math.round((item.totalJanjang / maxJanjang) * 100), 8);
            const isSelected = activeDate === item.date;

            return (
              <div
                key={item.date}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                onClick={() => setActiveDate(isSelected ? null : item.date)}
              >
                {/* Tooltip on Hover / Click */}
                <div
                  className={`absolute -top-12 z-20 px-2.5 py-1 rounded-lg bg-[#101828] text-white text-[10px] font-semibold whitespace-nowrap pointer-events-none transition-all shadow-md ${isSelected
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                >
                  <div className="font-bold">{formatNumber(item.totalJanjang)} Jjg ({formatDecimal(item.tonaseTon)} Ton)</div>
                  <div className="text-[9px] text-[#98A2B3] font-normal">{fullDateLabel(item.date)}</div>
                </div>

                {/* Vertical Bar */}
                <div className="w-full max-w-[32px] bg-[#F8F9FB] dark:bg-[#1E293B] rounded-t-lg overflow-hidden h-36 flex items-end">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${isSelected
                        ? 'bg-[#15803D] dark:bg-[#34D399] shadow-sm'
                        : 'bg-gradient-to-t from-[#2E7D32] to-[#10B981] group-hover:from-[#1B5E20] group-hover:to-[#059669]'
                      }`}
                  />
                </div>

                {/* Day Label */}
                <span className="text-[11px] font-medium text-[#667085] dark:text-[#94A3B8] mt-2 group-hover:text-[#101828] dark:group-hover:text-[#F8FAFC] transition-colors">
                  {weekdayLabel(item.date)}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info / Selected Day Detail */}
      <div className="mt-4 pt-3 border-t border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between text-xs text-[#667085] dark:text-[#94A3B8]">
        {activeItem ? (
          <div>
            Terpilih: <span className="font-bold text-[#101828] dark:text-[#F8FAFC]">{fullDateLabel(activeItem.date)}</span> —{' '}
            <span className="font-semibold text-[#2E7D32] dark:text-[#34D399]">{formatNumber(activeItem.totalJanjang)} Janjang</span> (
            {formatDecimal(activeItem.tonaseTon)} Ton)
          </div>
        ) : (
          <span>Klik salah satu batang untuk melihat detail per hari</span>
        )}
        <span className="text-[11px] text-[#98A2B3] dark:text-[#64748B] font-mono">
          Basis: 18.5 Kg/Jjg
        </span>
      </div>
    </div>
  );
}
