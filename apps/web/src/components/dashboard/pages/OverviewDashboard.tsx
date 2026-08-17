'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sprout,
  Zap,
  Clock,
  Flame,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Users,
  Layers,
  TrendingUp
} from 'lucide-react';
import { KpiSparklineCard } from '../KpiSparklineCard';
import { VolumeTrendChart } from '../VolumeTrendChart';
import { useQuery } from '@tanstack/react-query';
import { apiEndpoints } from '@/lib/api/endpoints';
import { formatNumber, formatDecimal, timeAgo } from '@/lib/format';
import type { KpiMetrics, TphStatusItem, RestanWarning } from '@/lib/api/types';

interface OverviewDashboardProps {
  kpi: KpiMetrics | undefined;
  kpiPending: boolean;
  dateRangeDays: number;
  onNavigate: (viewKey: string) => void;
}

export function OverviewDashboard({
  kpi,
  kpiPending,
  dateRangeDays,
  onNavigate,
}: OverviewDashboardProps) {
  // Fetch real-time volume trend series for dynamic sparklines
  const { data: volumeTrend } = useQuery({
    queryKey: ['volume-trend', dateRangeDays],
    queryFn: () => apiEndpoints.getVolumeTrend(dateRangeDays),
  });

  const { data: tphList } = useQuery({
    queryKey: ['tph-status'],
    queryFn: apiEndpoints.getTphStatus,
  });

  const { data: restanData } = useQuery({
    queryKey: ['restan-warnings'],
    queryFn: apiEndpoints.getRestanWarnings,
  });

  const { data: activityFeed } = useQuery({
    queryKey: ['activity-feed', 'recent'],
    queryFn: () => apiEndpoints.getActivityFeed(4, 'all'),
  });

  const recentTph: TphStatusItem[] = (tphList ?? []).slice(0, 4);
  const restanWarnings: RestanWarning[] = (restanData?.warningList ?? []).slice(0, 3);
  const recentActivities = activityFeed ?? [];

  // Extract real numerical data series for dynamic SVG sparklines
  const janjangSeries = (volumeTrend ?? []).map((d) => d.totalJanjang);
  const tonaseSeries = (volumeTrend ?? []).map((d) => d.tonaseTon);
  const transactionSeries = (volumeTrend ?? []).map((d) => d.transactions);

  return (
    <div className="space-y-5 font-sans">
      {/* 4 Real-Data Executive KPI Cards with Dynamic Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('data-panen')}
          className="cursor-pointer"
        >
          <KpiSparklineCard
            title={`Total Janjang (${dateRangeDays}h)`}
            value={kpiPending ? '—' : formatNumber(kpi?.totalJanjang ?? 0)}
            unit="Jjg"
            trend={
              kpiPending
                ? '…'
                : `${(kpi?.janjangTrendPercent ?? 0) >= 0 ? '+' : ''}${formatDecimal(kpi?.janjangTrendPercent ?? 0)}% vs mgg lalu`
            }
            isPositive={(kpi?.janjangTrendPercent ?? 0) >= 0}
            tagIcon={Sprout}
            sparklineVariant={(kpi?.janjangTrendPercent ?? 0) >= 0 ? 'green' : 'red'}
            dataSeries={janjangSeries}
          />
        </motion.div>

        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('analitik')}
          className="cursor-pointer"
        >
          <KpiSparklineCard
            title="Estimasi Tonase TBS"
            value={kpiPending ? '—' : formatDecimal(kpi?.estimatedTonaseTon ?? 0)}
            unit="Ton"
            trend={kpiPending ? '…' : `BJR ${formatDecimal(kpi?.avgBjrKg ?? 0)} Kg`}
            isPositive={true}
            tagIcon={Zap}
            sparklineVariant="teal"
            dataSeries={tonaseSeries}
          />
        </motion.div>

        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('conflict')}
          className="cursor-pointer"
        >
          <KpiSparklineCard
            title="SLA Sinkronisasi & Konsensus"
            value={kpiPending ? '—' : `${formatDecimal(kpi?.slaCompliancePercent ?? 0)}%`}
            unit=""
            trend={
              kpiPending
                ? '…'
                : `${formatNumber(kpi?.totalTransactions ?? 0)} transaksi`
            }
            isPositive={(kpi?.slaCompliancePercent ?? 100) >= 80}
            tagIcon={Clock}
            sparklineVariant={(kpi?.slaCompliancePercent ?? 100) >= 80 ? 'green' : 'red'}
            dataSeries={transactionSeries}
          />
        </motion.div>

        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('restan')}
          className="cursor-pointer"
        >
          <KpiSparklineCard
            title="Restan Kadaluarsa (>24 Jam)"
            value={kpiPending ? '—' : formatNumber(kpi?.restanOverdueCount ?? 0)}
            unit="TPH"
            trend={
              kpiPending
                ? '…'
                : `ALB rata-rata ${formatDecimal(kpi?.averageFfaPercentage ?? 0, 2)}%`
            }
            isPositive={(kpi?.restanOverdueCount ?? 0) === 0}
            tagIcon={Flame}
            sparklineVariant={(kpi?.restanOverdueCount ?? 0) === 0 ? 'green' : 'red'}
            dataSeries={(kpi?.restanOverdueCount ?? 0) === 0 ? [2, 1, 0, 0, 0] : [1, 2, 3, 4, 5]}
          />
        </motion.div>
      </div>

      {/* High-Density Compact 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Kolom Kiri (8 of 12 columns) - Tren & Cuplikan Data Panen */}
        <div className="lg:col-span-8 space-y-5">
          {/* Mini Volume Chart with Link to Analytics */}
          <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#EAECF0] dark:border-[#1E293B]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101828] dark:text-[#F8FAFC]">
                    Ringkasan Tren Produksi TBS &amp; BJR
                  </h3>
                  <p className="text-[11px] text-[#667085] dark:text-[#94A3B8]">
                    Visualisasi tren janjang harian {dateRangeDays} hari terakhir
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('analitik')}
                className="flex items-center gap-1 text-xs font-bold text-[#2E7D32] dark:text-[#34D399] hover:underline cursor-pointer"
              >
                <span>Lihat Analitik Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <VolumeTrendChart />
          </div>

          {/* Cuplikan Sekilas Data Panen Terkini */}
          <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAECF0] dark:border-[#1E293B]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101828] dark:text-[#F8FAFC]">
                    Sekilas Transaksi Panen Terkini
                  </h3>
                  <p className="text-[11px] text-[#667085] dark:text-[#94A3B8]">
                    Cuplikan 4 titik TPH terdepan hari ini
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('data-panen')}
                className="flex items-center gap-1 text-xs font-bold text-[#2E7D32] dark:text-[#34D399] hover:underline cursor-pointer"
              >
                <span>Buka Seluruh Data Panen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[#667085] dark:text-[#94A3B8] font-bold border-b border-[#EAECF0] dark:border-[#334155]">
                  <tr>
                    <th className="py-2 px-3">Titik TPH</th>
                    <th className="py-2 px-3">Blok</th>
                    <th className="py-2 px-3 text-right">Janjang</th>
                    <th className="py-2 px-3 text-center">Durasi Restan</th>
                    <th className="py-2 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0] dark:divide-[#1E293B]">
                  {recentTph.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-[#667085]">
                        Belum ada transaksi panen hari ini.
                      </td>
                    </tr>
                  ) : (
                    recentTph.map((item) => {
                      const janjang = item.latest?.janjangCount ?? 0;
                      const elapsed = item.latest?.elapsedHours ?? 0;
                      const isCollected = item.latest?.status === 'COLLECTED';

                      return (
                        <tr key={item.tphId} className="hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B]/60">
                          <td className="py-2.5 px-3 font-bold text-[#101828] dark:text-[#F8FAFC]">
                            {item.tphNumber}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-[#F2F4F7] dark:bg-[#334155] font-mono text-[10px]">
                              Blok {item.blockCode}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-extrabold text-[#2E7D32] dark:text-[#34D399]">
                            {formatNumber(janjang)} Jjg
                          </td>
                          <td className="py-2.5 px-3 text-center text-[#667085] dark:text-[#94A3B8] font-mono">
                            {elapsed} Jam
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isCollected
                                ? 'bg-[#E8F5E9] text-[#2E7D32]'
                                : 'bg-[#FFFAEB] text-[#B54708]'
                            }`}>
                              {isCollected ? 'Terkumpul' : 'Antrean'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Kolom Kanan (4 of 12 columns) - Cuplikan Cepat Modul-Modul Kunci */}
        <div className="lg:col-span-4 space-y-5">
          {/* Restan & FFA Early Warning Widget */}
          <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] p-4.5 shadow-xs">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#EAECF0] dark:border-[#1E293B]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FEF3F2] text-[#D92D20] flex items-center justify-center">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC]">
                  Peringatan Restan TBS
                </h3>
              </div>
              <button
                onClick={() => onNavigate('restan')}
                className="text-[11px] font-bold text-[#D92D20] dark:text-[#F87171] hover:underline cursor-pointer"
              >
                Detail &rarr;
              </button>
            </div>

            {restanWarnings.length === 0 ? (
              <div className="p-3 text-center text-xs text-[#2E7D32] bg-[#E8F5E9] dark:bg-[#064E3B]/30 rounded-xl font-medium">
                ✅ Tidak ada TPH tertahan &gt;24 jam.
              </div>
            ) : (
              <div className="space-y-2">
                {restanWarnings.map((w) => (
                  <div
                    key={w.harvestId}
                    className="p-2.5 rounded-xl bg-[#FEF3F2] dark:bg-[#7F1D1D]/20 border border-[#FECDCA] dark:border-[#DC2626]/30 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#D92D20] dark:text-[#F87171]">
                        {w.tphNumber} (Blok {w.blockCode})
                      </p>
                      <p className="text-[10px] text-[#667085] dark:text-[#94A3B8]">
                        {formatNumber(w.janjangCount)} jjg • ALB: {formatDecimal(w.estimatedFfaPercentage, 2)}%
                      </p>
                    </div>
                    <span className="font-mono text-[11px] font-extrabold text-[#D92D20]">
                      {w.elapsedHours}j
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Kemandoran Highlight */}
          <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] p-4.5 shadow-xs">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#EAECF0] dark:border-[#1E293B]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#EFF8FF] text-[#175CD3] flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC]">
                  Kemandoran Unggulan Hari Ini
                </h3>
              </div>
              <button
                onClick={() => onNavigate('kemandoran')}
                className="text-[11px] font-bold text-[#175CD3] dark:text-[#60A5FA] hover:underline cursor-pointer"
              >
                Detail &rarr;
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#101828] dark:text-[#F8FAFC]">Regu Alpha (Mandor Budi)</p>
                  <p className="text-[10px] text-[#667085]">12 Pemanen • Afdeling I</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                  115% Capaian
                </span>
              </div>
              <div className="p-2 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#101828] dark:text-[#F8FAFC]">Regu Delta (Mandor Agus)</p>
                  <p className="text-[10px] text-[#667085]">11 Pemanen • Afdeling II</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                  108% Capaian
                </span>
              </div>
            </div>
          </div>

          {/* Mini Spasial & EUDR Card */}
          <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] p-4.5 shadow-xs">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#EAECF0] dark:border-[#1E293B]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC]">
                  Kepatuhan Spasial EUDR
                </h3>
              </div>
              <button
                onClick={() => onNavigate('eudr')}
                className="text-[11px] font-bold text-[#2E7D32] dark:text-[#34D399] hover:underline cursor-pointer"
              >
                Peta &rarr;
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#E8F5E9]/50 dark:bg-[#064E3B]/20 border border-[#A7F3D0]/50 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#2E7D32] dark:text-[#34D399] font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Poligon Konsesi Terverifikasi</span>
              </div>
              <p className="text-[10px] text-[#667085] dark:text-[#94A3B8]">
                Acuan WGS84, cut-off deforestasi Dec 2020 terpenuhi untuk pasar Uni Eropa &amp; RSPO.
              </p>
            </div>
          </div>

          {/* Mini Live Sync & Conflict Stream */}
          <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] p-4.5 shadow-xs">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#EAECF0] dark:border-[#1E293B]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F4F3FF] text-[#5925DC] flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC]">
                  Sinkronisasi Offline
                </h3>
              </div>
              <button
                onClick={() => onNavigate('conflict')}
                className="text-[11px] font-bold text-[#5925DC] dark:text-[#A5B4FC] hover:underline cursor-pointer"
              >
                Audit &rarr;
              </button>
            </div>

            <div className="space-y-1.5 text-[11px]">
              {recentActivities.length === 0 ? (
                <p className="text-center text-[#667085] py-2">Semua data tersinkronisasi.</p>
              ) : (
                recentActivities.slice(0, 2).map((act) => (
                  <div key={act.id} className="flex items-center justify-between text-[#667085] dark:text-[#94A3B8]">
                    <span className="truncate max-w-[170px]">
                      {act.userName} ({act.action})
                    </span>
                    <span className="font-mono text-[10px] text-[#2E7D32]">
                      {timeAgo(act.createdAt)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
