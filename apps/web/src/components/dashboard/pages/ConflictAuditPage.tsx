'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Scale,
  ShieldAlert,
  GitMerge,
  Cpu,
  CheckCircle2,
  AlertOctagon,
  History
} from 'lucide-react';
import { MonitoringTable } from '../MonitoringTable';
import { ConflictSimulatorCard } from '../ConflictSimulatorCard';

export function ConflictAuditPage() {
  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0A0F1D] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#EFF8FF] dark:bg-[#1E3A8A]/40 text-[#175CD3] dark:text-[#60A5FA] flex items-center justify-center font-bold shadow-xs">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#101828] dark:text-[#F8FAFC]">
              Resolusi Konflik Multi-Jenjang &amp; Audit Trail
            </h1>
            <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-0.5">
              Konsensus LWW matematis 5 jenjang otoritas kebun, riwayat mutasi sinkronisasi, dan proteksi idempotensi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-xs font-mono font-bold text-[#2E7D32] dark:text-[#34D399] border border-[#A7F3D0]/60">
            Formula: (Role × 10¹²) + EpochMs
          </span>
        </div>
      </div>

      {/* Role Hierarchy Weights Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { role: 'Estate Manager', weight: 5, multiplier: '5×10¹²', color: 'text-[#2E7D32] bg-[#E8F5E9] border-[#A7F3D0]' },
          { role: 'Kepala Afdeling (Askep)', weight: 4, multiplier: '4×10¹²', color: 'text-[#175CD3] bg-[#EFF8FF] border-[#B2DDFF]' },
          { role: 'Asisten Lapangan', weight: 3, multiplier: '3×10¹²', color: 'text-[#5925DC] bg-[#F4F3FF] border-[#D9D6FE]' },
          { role: 'Mandor Panen', weight: 2, multiplier: '2×10¹²', color: 'text-[#B93815] bg-[#FEF6EE] border-[#F9DBAF]' },
          { role: 'Krani Timbang', weight: 1, multiplier: '1×10¹²', color: 'text-[#475467] bg-[#F2F4F7] border-[#EAECF0]' },
        ].map((item) => (
          <div
            key={item.weight}
            className="p-3 rounded-xl bg-white dark:bg-[#0A0F1D] border border-[#EAECF0] dark:border-[#1E293B] text-center"
          >
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${item.color}`}>
              W{item.weight} ({item.multiplier})
            </span>
            <p className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC] mt-1.5 truncate">
              {item.role}
            </p>
          </div>
        ))}
      </div>

      {/* Simulator Card */}
      <ConflictSimulatorCard />

      {/* Audit Trail Table Component */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#175CD3]" />
          <h2 className="text-sm font-bold text-[#101828] dark:text-[#F8FAFC]">
            Log Mutasi Sinkronisasi &amp; Tiket Resolusi Konsensus
          </h2>
        </div>
        <MonitoringTable />
      </div>
    </div>
  );
}
