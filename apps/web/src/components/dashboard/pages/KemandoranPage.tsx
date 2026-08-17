'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Award,
  TrendingUp,
  UserCheck,
  Search,
  Filter,
  Download,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { formatNumber, formatDecimal } from '@/lib/format';

interface ReguPemanenItem {
  id: string;
  reguCode: string;
  mandorName: string;
  mandorNip: string;
  assignedAfdeling: string;
  totalPemanen: number;
  activePemanen: number;
  targetBasisJanjang: number;
  realisasiJanjang: number;
  brondolanKg: number;
  mutuMatangPct: number;
  mutuMentahPct: number;
  mutuLewatMatangPct: number;
  statusKinerja: 'OPTIMAL' | 'TERCAPAI' | 'UNDERPERFORM';
}

const MOCK_KEMANDORAN_DATA: ReguPemanenItem[] = [
  {
    id: 'REG-01',
    reguCode: 'Regu Panen Alpha (A1)',
    mandorName: 'Budi Santoso (Mandor I)',
    mandorNip: '1988012015031001',
    assignedAfdeling: 'Afdeling I - Estate Bukit Makmur',
    totalPemanen: 12,
    activePemanen: 12,
    targetBasisJanjang: 1200,
    realisasiJanjang: 1380,
    brondolanKg: 2450,
    mutuMatangPct: 94.5,
    mutuMentahPct: 2.1,
    mutuLewatMatangPct: 3.4,
    statusKinerja: 'OPTIMAL',
  },
  {
    id: 'REG-02',
    reguCode: 'Regu Panen Beta (A2)',
    mandorName: 'Suparman (Mandor II)',
    mandorNip: '1990051215031002',
    assignedAfdeling: 'Afdeling I - Estate Bukit Makmur',
    totalPemanen: 10,
    activePemanen: 10,
    targetBasisJanjang: 1000,
    realisasiJanjang: 1045,
    brondolanKg: 1820,
    mutuMatangPct: 91.0,
    mutuMentahPct: 4.5,
    mutuLewatMatangPct: 4.5,
    statusKinerja: 'TERCAPAI',
  },
  {
    id: 'REG-03',
    reguCode: 'Regu Panen Gamma (B1)',
    mandorName: 'Hendra Wijaya (Mandor I)',
    mandorNip: '1986071415031003',
    assignedAfdeling: 'Afdeling II - Estate Bukit Makmur',
    totalPemanen: 14,
    activePemanen: 13,
    targetBasisJanjang: 1400,
    realisasiJanjang: 1210,
    brondolanKg: 2100,
    mutuMatangPct: 86.2,
    mutuMentahPct: 8.5,
    mutuLewatMatangPct: 5.3,
    statusKinerja: 'UNDERPERFORM',
  },
  {
    id: 'REG-04',
    reguCode: 'Regu Panen Delta (B2)',
    mandorName: 'Agus Riyadi (Mandor II)',
    mandorNip: '1992031815031004',
    assignedAfdeling: 'Afdeling II - Estate Bukit Makmur',
    totalPemanen: 11,
    activePemanen: 11,
    targetBasisJanjang: 1100,
    realisasiJanjang: 1195,
    brondolanKg: 1950,
    mutuMatangPct: 93.0,
    mutuMentahPct: 3.2,
    mutuLewatMatangPct: 3.8,
    statusKinerja: 'OPTIMAL',
  },
  {
    id: 'REG-05',
    reguCode: 'Regu Panen Epsilon (C1)',
    mandorName: 'Joko Susilo (Mandor I)',
    mandorNip: '1989110415031005',
    assignedAfdeling: 'Afdeling III - Estate Bukit Makmur',
    totalPemanen: 10,
    activePemanen: 9,
    targetBasisJanjang: 1000,
    realisasiJanjang: 1020,
    brondolanKg: 1780,
    mutuMatangPct: 89.5,
    mutuMentahPct: 5.0,
    mutuLewatMatangPct: 5.5,
    statusKinerja: 'TERCAPAI',
  },
];

export function KemandoranPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAfdeling, setSelectedAfdeling] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredRegu = useMemo(() => {
    return MOCK_KEMANDORAN_DATA.filter((r) => {
      const matchSearch =
        r.reguCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.mandorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.mandorNip.includes(searchQuery);

      const matchAfdeling = selectedAfdeling === 'ALL' || r.assignedAfdeling.includes(selectedAfdeling);
      const matchStatus = selectedStatus === 'ALL' || r.statusKinerja === selectedStatus;

      return matchSearch && matchAfdeling && matchStatus;
    });
  }, [searchQuery, selectedAfdeling, selectedStatus]);

  // Aggregate calculations
  const totalPemanenAktif = useMemo(() => {
    return filteredRegu.reduce((sum, r) => sum + r.activePemanen, 0);
  }, [filteredRegu]);

  const totalRealisasiJanjang = useMemo(() => {
    return filteredRegu.reduce((sum, r) => sum + r.realisasiJanjang, 0);
  }, [filteredRegu]);

  const avgMutuMatang = useMemo(() => {
    if (filteredRegu.length === 0) return 0;
    return filteredRegu.reduce((sum, r) => sum + r.mutuMatangPct, 0) / filteredRegu.length;
  }, [filteredRegu]);

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#EFF8FF] dark:bg-[#1E3A8A]/40 text-[#175CD3] dark:text-[#60A5FA] flex items-center justify-center font-bold shadow-xs">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC]">
              Kemandoran &amp; Produktivitas Regu Pemanen
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-0.5">
              Evaluasi target basis janjang, kehadiran tenaga kerja pemanen, dan kepatuhan grading mutu petik
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1.5 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Otoritas Mandor: W2 (2×10¹²)</span>
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Total Tenaga Pemanen Aktif</span>
            <p className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
              {formatNumber(totalPemanenAktif)} <span className="text-xs font-normal text-[#667085]">Pemanen</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#EFF8FF] dark:bg-[#1E3A8A]/30 text-[#175CD3] dark:text-[#60A5FA] flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Total Hasil Panen Kemandoran</span>
            <p className="text-xl font-extrabold text-[#2E7D32] dark:text-[#34D399] mt-0.5">
              {formatNumber(totalRealisasiJanjang)} <span className="text-xs font-normal text-[#667085]">Jjg</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Rata-rata Kepatuhan Mutu Matang</span>
            <p className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
              {formatDecimal(avgMutuMatang, 1)}%
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#FEF6EE] dark:bg-[#EA580C]/20 text-[#B93815] dark:text-[#FB923C] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama mandor atau regu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] text-xs text-[#101828] dark:text-[#F8FAFC] focus:outline-hidden focus:border-[#2E7D32]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl px-3 py-1.5 text-xs text-[#344054] dark:text-[#E2E8F0]">
            <span className="text-[#667085] dark:text-[#94A3B8]">Afdeling:</span>
            <select
              value={selectedAfdeling}
              onChange={(e) => setSelectedAfdeling(e.target.value)}
              className="bg-transparent font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Afdeling</option>
              <option value="Afdeling I">Afdeling I</option>
              <option value="Afdeling II">Afdeling II</option>
              <option value="Afdeling III">Afdeling III</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl px-3 py-1.5 text-xs text-[#344054] dark:text-[#E2E8F0]">
            <span className="text-[#667085] dark:text-[#94A3B8]">Performa:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Status</option>
              <option value="OPTIMAL">Optimal (&gt;110%)</option>
              <option value="TERCAPAI">Tercapai (100-110%)</option>
              <option value="UNDERPERFORM">Kurang (&lt;100%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regu Kemandoran Table */}
      <div className="bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FB] dark:bg-[#1E293B] border-b border-[#EAECF0] dark:border-[#334155] text-[#667085] dark:text-[#94A3B8] font-bold">
              <tr>
                <th className="py-3 px-4">Regu &amp; Mandor</th>
                <th className="py-3 px-4">Afdeling</th>
                <th className="py-3 px-4 text-center">Tenaga Kerja</th>
                <th className="py-3 px-4 text-right">Target vs Realisasi</th>
                <th className="py-3 px-4 text-center">% Capaian</th>
                <th className="py-3 px-4 text-center">Grading Buah</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] dark:divide-[#1E293B]">
              {filteredRegu.map((regu) => {
                const achievementPct = (regu.realisasiJanjang / regu.targetBasisJanjang) * 100;
                return (
                  <tr key={regu.id} className="hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#101828] dark:text-[#F8FAFC]">{regu.reguCode}</p>
                      <p className="text-[11px] text-[#667085] dark:text-[#94A3B8] mt-0.5">
                        {regu.mandorName} • NIP: {regu.mandorNip}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-[#344054] dark:text-[#E2E8F0]">
                      <span className="px-2 py-0.5 rounded bg-[#F2F4F7] dark:bg-[#334155] font-mono text-[11px]">
                        {regu.assignedAfdeling.split(' - ')[0]}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-[#101828] dark:text-[#F8FAFC]">
                        {regu.activePemanen}
                      </span>
                      <span className="text-[#667085]">/{regu.totalPemanen} Hadir</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <p className="font-extrabold text-[#2E7D32] dark:text-[#34D399]">
                        {formatNumber(regu.realisasiJanjang)} Jjg
                      </p>
                      <p className="text-[10px] text-[#667085]">Basis: {formatNumber(regu.targetBasisJanjang)} Jjg</p>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`font-bold text-xs ${
                        achievementPct >= 110
                          ? 'text-[#2E7D32] dark:text-[#34D399]'
                          : achievementPct >= 100
                          ? 'text-[#175CD3] dark:text-[#60A5FA]'
                          : 'text-[#D92D20] dark:text-[#F87171]'
                      }`}>
                        {formatDecimal(achievementPct, 1)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32]" title="Matang">
                          M: {regu.mutuMatangPct}%
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-[#FEF3F2] text-[#D92D20]" title="Mentah">
                          U: {regu.mutuMentahPct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        regu.statusKinerja === 'OPTIMAL'
                          ? 'bg-[#E8F5E9] text-[#2E7D32]'
                          : regu.statusKinerja === 'TERCAPAI'
                          ? 'bg-[#EFF8FF] text-[#175CD3]'
                          : 'bg-[#FEF3F2] text-[#D92D20]'
                      }`}>
                        {regu.statusKinerja}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
