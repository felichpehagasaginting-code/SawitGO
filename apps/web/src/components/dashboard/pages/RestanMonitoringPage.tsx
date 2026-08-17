'use client';

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  AlertTriangle,
  Clock,
  Truck,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  ShieldAlert,
  Building2
} from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { formatNumber, formatDecimal } from '@/lib/format';
import type { RestanWarning } from '@/lib/api/types';

export function RestanMonitoringPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'ALL' | 'RESTAN_OVERDUE' | 'CRITICAL_20H' | 'WARNING_12H'>('ALL');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const { data: restanData, isLoading, refetch } = useQuery({
    queryKey: ['restan-warnings'],
    queryFn: apiEndpoints.getRestanWarnings,
  });

  const rawWarnings: RestanWarning[] = restanData?.warningList ?? [];

  const pickupMutation = useMutation({
    mutationFn: (harvestId: string) => apiEndpoints.confirmPickup(harvestId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['restan-warnings'] });
      queryClient.invalidateQueries({ queryKey: ['tph-status'] });
      queryClient.invalidateQueries({ queryKey: ['kpi-metrics'] });
      setActionSuccess(data.message || 'Armada truk berhasil mengangkut TBS ke PKS.');
      setTimeout(() => setActionSuccess(null), 3500);
    },
  });

  const filteredWarnings = useMemo(() => {
    return rawWarnings.filter((item) => {
      const matchSearch =
        item.tphNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.blockCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSeverity = selectedSeverity === 'ALL' || item.stage === selectedSeverity;

      return matchSearch && matchSeverity;
    });
  }, [rawWarnings, searchQuery, selectedSeverity]);

  // Aggregate metrics
  const criticalCount = useMemo(() => {
    return rawWarnings.filter((w) => w.stage === 'RESTAN_OVERDUE' || w.elapsedHours >= 24).length;
  }, [rawWarnings]);

  const warningCount = useMemo(() => {
    return rawWarnings.filter((w) => w.stage === 'CRITICAL_20H' || (w.elapsedHours >= 12 && w.elapsedHours < 24)).length;
  }, [rawWarnings]);

  const totalRestanJanjang = useMemo(() => {
    return filteredWarnings.reduce((sum, w) => sum + w.janjangCount, 0);
  }, [filteredWarnings]);

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#FEF3F2] dark:bg-[#7F1D1D]/40 text-[#D92D20] dark:text-[#F87171] flex items-center justify-center font-bold shadow-xs">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC]">
              Monitoring Restan TBS &amp; Degradasi FFA (Asam Lemak Bebas)
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-0.5">
              Early warning penumpukan TBS &gt;24 jam di TPH, kalkulasi kenaikan FFA, dan dispatch armada truk ke PKS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => refetch()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#EAECF0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Segarkan</span>
          </motion.button>
        </div>
      </div>

      {/* Action Notification Banner */}
      <AnimatePresence>
        {actionSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/50 border border-[#A7F3D0] dark:border-[#059669]/50 text-xs text-[#2E7D32] dark:text-[#34D399] font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary KPI Cards for Restan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Restan Kritis (&gt;24 Jam)</span>
            <p className="text-xl font-extrabold text-[#D92D20] dark:text-[#F87171] mt-0.5">
              {formatNumber(criticalCount)} <span className="text-xs font-normal text-[#667085]">TPH</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#D92D20] dark:text-[#F87171] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Restan Waspada (12-24 Jam)</span>
            <p className="text-xl font-extrabold text-[#F79009] dark:text-[#FBBF24] mt-0.5">
              {formatNumber(warningCount)} <span className="text-xs font-normal text-[#667085]">TPH</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#FFFAEB] dark:bg-[#78350F]/30 text-[#F79009] dark:text-[#FBBF24] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Total Janjang Berisiko Restan</span>
            <p className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
              {formatNumber(totalRestanJanjang)} <span className="text-xs font-normal text-[#667085]">Jjg</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#F4F3FF] dark:bg-[#4F46E5]/20 text-[#5925DC] dark:text-[#A5B4FC] flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Formula Info Banner */}
      <div className="p-4 rounded-2xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#2E7D32] shrink-0" />
          <div>
            <span className="font-bold text-[#101828] dark:text-[#F8FAFC]">Standar Mutu PKS: </span>
            <span className="text-[#667085] dark:text-[#94A3B8]">
              Kadar Asam Lemak Bebas (ALB) maksimal 3.5%. Formula degradasi: FFA = 2.0% + (0.1% × Jam Restan).
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#B42318] dark:text-[#F87171] font-mono text-[11px] font-bold">
          Penalti Rendemen &gt;3.5%
        </span>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nomor TPH atau kode blok..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] text-xs text-[#101828] dark:text-[#F8FAFC] focus:outline-hidden focus:border-[#2E7D32]"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl px-3 py-1.5 text-xs text-[#344054] dark:text-[#E2E8F0]">
            <span className="text-[#667085] dark:text-[#94A3B8]">Tahap Kritis:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as any)}
              className="bg-transparent font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Tahap</option>
              <option value="RESTAN_OVERDUE">Kadaluarsa Restan (&gt;24 Jam)</option>
              <option value="CRITICAL_20H">Kritis (20-24 Jam)</option>
              <option value="WARNING_12H">Waspada (12-20 Jam)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Restan Data Table */}
      <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FB] dark:bg-[#1E293B] border-b border-[#EAECF0] dark:border-[#334155] text-[#667085] dark:text-[#94A3B8] font-bold">
              <tr>
                <th className="py-3 px-4">Titik TPH &amp; Blok</th>
                <th className="py-3 px-4 text-right">Janjang Restan</th>
                <th className="py-3 px-4 text-center">Durasi Penumpukan</th>
                <th className="py-3 px-4 text-center">Proyeksi ALB (FFA)</th>
                <th className="py-3 px-4 text-center">Status Risiko</th>
                <th className="py-3 px-4 text-right">Aksi Dispatch Truk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] dark:divide-[#1E293B]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#667085] dark:text-[#94A3B8]">
                    Memuat status risiko restan...
                  </td>
                </tr>
              ) : filteredWarnings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#667085] dark:text-[#94A3B8]">
                    Tidak ada TPH yang mengalami penumpukan restan pada filter ini.
                  </td>
                </tr>
              ) : (
                filteredWarnings.map((w) => {
                  const isOverdue = w.stage === 'RESTAN_OVERDUE' || w.elapsedHours >= 24;
                  const isWarning = w.stage === 'CRITICAL_20H' || w.elapsedHours >= 12;

                  return (
                    <tr key={w.harvestId} className="hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B]/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-[#101828] dark:text-[#F8FAFC]">{w.tphNumber}</p>
                        <p className="text-[11px] text-[#667085] dark:text-[#94A3B8]">
                          Blok {w.blockCode} • Estate Utama
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <p className="font-extrabold text-[#D92D20] dark:text-[#F87171]">
                          {formatNumber(w.janjangCount)} Jjg
                        </p>
                        <p className="text-[10px] text-[#667085]">
                          ~{formatDecimal((w.janjangCount * 18.5) / 1000, 2)} Ton
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`font-mono font-bold text-xs ${
                          isOverdue
                            ? 'text-[#D92D20]'
                            : isWarning
                            ? 'text-[#F79009]'
                            : 'text-[#2E7D32]'
                        }`}>
                          {w.elapsedHours} Jam
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`font-bold ${
                          w.estimatedFfaPercentage > 3.5 ? 'text-[#D92D20]' : 'text-[#344054] dark:text-[#E2E8F0]'
                        }`}>
                          {formatDecimal(w.estimatedFfaPercentage, 2)}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isOverdue
                            ? 'bg-[#FEF3F2] text-[#D92D20]'
                            : isWarning
                            ? 'bg-[#FFFAEB] text-[#B54708]'
                            : 'bg-[#E8F5E9] text-[#2E7D32]'
                        }`}>
                          {isOverdue ? 'Kritis >24 Jam' : isWarning ? 'Waspada >12 Jam' : 'Aman'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          disabled={pickupMutation.isPending}
                          onClick={() => pickupMutation.mutate(w.harvestId)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-[11px] font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Pickup Truk</span>
                        </motion.button>
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
  );
}
