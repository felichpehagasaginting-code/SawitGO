'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sprout,
  Search,
  Filter,
  Download,
  Calendar,
  Layers,
  ChevronDown,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';
import { apiEndpoints } from '@/lib/api/endpoints';
import { formatNumber, formatDecimal } from '@/lib/format';
import type { TphStatusItem } from '@/lib/api/types';

interface HarvestDetailModalProps {
  item: TphStatusItem | null;
  onClose: () => void;
}

function HarvestDetailModal({ item, onClose }: HarvestDetailModalProps) {
  if (!item) return null;

  const janjang = item.latest?.janjangCount ?? 0;
  const estKg = item.latest?.estimatedWeightKg ?? janjang * 18.5;
  const status = item.latest?.status ?? 'WAITING_PICKUP';
  const elapsed = item.latest?.elapsedHours ?? 0;
  const ffa = item.latest?.ffaEstimate ?? 2.0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white dark:bg-[#0A0F1D] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] shadow-2xl max-w-lg w-full p-6 text-[#101828] dark:text-[#F8FAFC]"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#EAECF0] dark:border-[#1E293B]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/50 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Detail Panen {item.tphNumber}</h3>
                <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Blok {item.blockCode} • QR: {item.qrCode}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#98A2B3] hover:text-[#344054] dark:hover:text-[#F8FAFC] hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155]">
                <span className="text-[#667085] dark:text-[#94A3B8]">Total Janjang TBS</span>
                <p className="text-base font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
                  {formatNumber(janjang)} <span className="text-xs font-normal text-[#667085]">Jjg</span>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155]">
                <span className="text-[#667085] dark:text-[#94A3B8]">Estimasi Berat</span>
                <p className="text-base font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
                  {formatDecimal(estKg)} <span className="text-xs font-normal text-[#667085]">Kg</span>
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#667085] dark:text-[#94A3B8]">Status Pengangkutan:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  status === 'COLLECTED'
                    ? 'bg-[#E8F5E9] text-[#2E7D32]'
                    : 'bg-[#FFFAEB] text-[#B54708]'
                }`}>
                  {status === 'COLLECTED' ? 'Terkumpul / Siap PKS' : 'Menunggu Angkutan'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085] dark:text-[#94A3B8]">Durasi di TPH:</span>
                <span className="font-semibold text-[#101828] dark:text-[#F8FAFC]">{elapsed} Jam</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085] dark:text-[#94A3B8]">Kadar ALB (FFA):</span>
                <span className={`font-semibold ${ffa > 3.0 ? 'text-[#D92D20]' : 'text-[#2E7D32]'}`}>
                  {formatDecimal(ffa, 2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085] dark:text-[#94A3B8]">Koordinat Spasial:</span>
                <span className="font-mono text-[#101828] dark:text-[#F8FAFC]">
                  {item.latitude.toFixed(6)}, {item.longitude.toFixed(6)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#EAECF0] dark:border-[#1E293B] flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition-all cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function HarvestDataPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'WAITING' | 'COLLECTED'>('ALL');
  const [selectedItem, setSelectedItem] = useState<TphStatusItem | null>(null);

  const { data: tphList, isLoading, refetch } = useQuery({
    queryKey: ['tph-status'],
    queryFn: apiEndpoints.getTphStatus,
  });

  const rawItems = tphList ?? [];

  // Filter logic
  const filteredData = useMemo(() => {
    return rawItems.filter((item) => {
      const matchSearch =
        item.tphNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.blockCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchBlock = selectedBlock === 'ALL' || item.blockCode === selectedBlock;
      const status = item.latest?.status ?? 'WAITING';
      const matchStatus =
        selectedStatus === 'ALL' ||
        (selectedStatus === 'COLLECTED' ? status === 'COLLECTED' : status !== 'COLLECTED');

      return matchSearch && matchBlock && matchStatus;
    });
  }, [rawItems, searchQuery, selectedBlock, selectedStatus]);

  // Unique blocks for filter dropdown
  const uniqueBlocks = useMemo(() => {
    const blocks = new Set<string>();
    rawItems.forEach((it) => blocks.add(it.blockCode));
    return Array.from(blocks);
  }, [rawItems]);

  // Summary Metrics for this page only
  const totalJanjang = useMemo(() => {
    return filteredData.reduce((acc, it) => acc + (it.latest?.janjangCount || 0), 0);
  }, [filteredData]);

  const totalTonase = useMemo(() => {
    return (totalJanjang * 18.5) / 1000;
  }, [totalJanjang]);

  const handleExportCsv = () => {
    const headers = ['TPH Number', 'Block Code', 'Janjang Count', 'Est. Kg', 'Elapsed (Hours)', 'FFA %', 'Status'];
    const rows = filteredData.map((d) => [
      d.tphNumber,
      d.blockCode,
      d.latest?.janjangCount ?? 0,
      ((d.latest?.janjangCount ?? 0) * 18.5).toFixed(1),
      d.latest?.elapsedHours ?? 0,
      (d.latest?.ffaEstimate ?? 2.0).toFixed(2),
      d.latest?.status ?? 'WAITING',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SawitGO_Data_Panen_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0A0F1D] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center font-bold shadow-xs">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC]">
              Data Transaksi Panen Kelapa Sawit
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-0.5">
              Kelola pencatatan panen TBS, kalkulasi janjang, dan status angkut per TPH secara mandiri
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
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </motion.button>
        </div>
      </div>

      {/* Mini Summary Cards (Data Panen Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0F1D] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Total TPH Terfilter</span>
            <p className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
              {formatNumber(filteredData.length)} <span className="text-xs font-normal text-[#667085]">Titik</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#F4F3FF] dark:bg-[#4F46E5]/20 text-[#5925DC] dark:text-[#A5B4FC] flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0F1D] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Total Janjang TBS</span>
            <p className="text-xl font-extrabold text-[#2E7D32] dark:text-[#34D399] mt-0.5">
              {formatNumber(totalJanjang)} <span className="text-xs font-normal text-[#667085]">Jjg</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center">
            <Sprout className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0F1D] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Estimasi Tonase (BJR 18.5 Kg)</span>
            <p className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
              {formatDecimal(totalTonase, 2)} <span className="text-xs font-normal text-[#667085]">Ton</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#FEF6EE] dark:bg-[#EA580C]/20 text-[#B93815] dark:text-[#FB923C] flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="p-4 bg-white dark:bg-[#0A0F1D] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Block Selector */}
          <div className="flex items-center gap-1.5 bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl px-3 py-1.5 text-xs text-[#344054] dark:text-[#E2E8F0]">
            <span className="text-[#667085] dark:text-[#94A3B8]">Blok:</span>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="bg-transparent font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Blok</option>
              {uniqueBlocks.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl px-3 py-1.5 text-xs text-[#344054] dark:text-[#E2E8F0]">
            <span className="text-[#667085] dark:text-[#94A3B8]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="bg-transparent font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Status</option>
              <option value="WAITING">Antrean / Belum Angkut</option>
              <option value="COLLECTED">Terkumpul (PKS)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Harvest Data Table */}
      <div className="bg-white dark:bg-[#0A0F1D] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FB] dark:bg-[#1E293B] border-b border-[#EAECF0] dark:border-[#334155] text-[#667085] dark:text-[#94A3B8] font-bold">
              <tr>
                <th className="py-3 px-4">Titik TPH</th>
                <th className="py-3 px-4">Blok Perkebunan</th>
                <th className="py-3 px-4 text-right">Jumlah Janjang</th>
                <th className="py-3 px-4 text-right">Estimasi Tonase</th>
                <th className="py-3 px-4 text-center">Durasi Restan</th>
                <th className="py-3 px-4 text-center">Status Angkut</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] dark:divide-[#1E293B]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#667085] dark:text-[#94A3B8]">
                    Memuat data transaksi panen...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#667085] dark:text-[#94A3B8]">
                    Tidak ada data panen yang sesuai kriteria filter.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const janjang = item.latest?.janjangCount ?? 0;
                  const elapsed = item.latest?.elapsedHours ?? 0;
                  const isCollected = item.latest?.status === 'COLLECTED';

                  return (
                    <tr
                      key={item.tphId}
                      className="hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B]/60 transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-[#101828] dark:text-[#F8FAFC]">
                        {item.tphNumber}
                      </td>
                      <td className="py-3 px-4 text-[#344054] dark:text-[#E2E8F0]">
                        <span className="px-2 py-0.5 rounded bg-[#F2F4F7] dark:bg-[#334155] font-mono text-[11px]">
                          Blok {item.blockCode}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-[#2E7D32] dark:text-[#34D399]">
                        {formatNumber(janjang)} Jjg
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-[#101828] dark:text-[#F8FAFC]">
                        {formatDecimal((janjang * 18.5) / 1000, 2)} Ton
                      </td>
                      <td className="py-3 px-4 text-center text-[#667085] dark:text-[#94A3B8] font-mono">
                        {elapsed} Jam
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isCollected
                              ? 'bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399]'
                              : 'bg-[#FFFAEB] dark:bg-[#78350F]/30 text-[#B54708] dark:text-[#FBBF24]'
                          }`}
                        >
                          {isCollected ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Terkumpul</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              <span>Menunggu Truk</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#EAECF0] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:bg-[#F2F4F7] text-[11px] font-semibold text-[#344054] dark:text-[#E2E8F0] cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
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

      {/* Detail Modal */}
      <HarvestDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
