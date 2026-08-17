'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Zap,
  Percent,
  Layers,
  Download,
  Calendar,
  Sparkles
} from 'lucide-react';
import { VolumeTrendChart } from '../VolumeTrendChart';

export function BjrAnalyticsPage() {
  const [dateRange, setDateRange] = useState<7 | 14 | 30>(14);

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center font-bold shadow-xs">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC]">
              Analitik BJR &amp; Estimasi Rendemen CPO Pabrik (OER)
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-0.5">
              Simulasi berat janjang rata-rata, proyeksi rendemen minyak sawit mentah, dan evaluasi capaian tonase afdeling
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] rounded-xl p-1 text-xs">
            {[
              { label: '7 Hari', val: 7 as const },
              { label: '14 Hari', val: 14 as const },
              { label: '30 Hari', val: 30 as const },
            ].map((item) => (
              <button
                key={item.val}
                onClick={() => setDateRange(item.val)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  dateRange === item.val
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'text-[#667085] dark:text-[#94A3B8] hover:text-[#101828]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B]">
          <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Rata-rata BJR Kebun</span>
          <p className="text-xl font-extrabold text-[#2E7D32] dark:text-[#34D399] mt-0.5">
            18.52 <span className="text-xs font-normal text-[#667085]">Kg/Janjang</span>
          </p>
          <span className="text-[10px] text-[#2E7D32] font-semibold">+2.1% vs standar panen</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B]">
          <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Proyeksi Rendemen CPO (OER)</span>
          <p className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
            23.40%
          </p>
          <span className="text-[10px] text-[#2E7D32] font-semibold">Target pabrik: &ge;22.5%</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B]">
          <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Kernel Extraction (KER)</span>
          <p className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
            5.85%
          </p>
          <span className="text-[10px] text-[#175CD3] font-semibold">Standar: 5.5%</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#151D2C] border border-[#EAECF0] dark:border-[#1E293B]">
          <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8]">Indeks Kematangan TBS</span>
          <p className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC] mt-0.5">
            92.8%
          </p>
          <span className="text-[10px] text-[#2E7D32] font-semibold">Mutu petik optimum</span>
        </div>
      </div>

      {/* Large Volume & BJR Chart */}
      <VolumeTrendChart />
    </div>
  );
}
