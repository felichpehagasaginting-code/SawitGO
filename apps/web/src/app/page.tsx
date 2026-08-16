'use client';

import React from 'react';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import { MetricBentoCard } from '@/components/dashboard/MetricBentoCard';
import { InteractiveEstateMap } from '@/components/dashboard/InteractiveEstateMap';
import { 
  Sprout, 
  Weight, 
  AlertCircle, 
  TrendingUp, 
  RefreshCw, 
  Radio, 
  Download,
  Flame
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <SmoothScrollProvider>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B1C15]/80 p-6 rounded-3xl border border-[#10B981]/20 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Sprout className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-white">
                  SawitGO <span className="text-[#34D399] font-normal">Command Center</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#34D399] text-[10px] font-extrabold uppercase tracking-widest border border-[#10B981]/30">
                  Live TKT-5
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Riset BPDPKS 2026–2027 | Politeknik Citra Widya Edukasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#06110D] border border-white/10 text-xs font-mono text-slate-300">
              <Radio className="w-4 h-4 text-[#10B981] animate-pulse" />
              <span>8 P2P Mesh Nodes Active</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-black font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20">
              <Download className="w-4 h-4" />
              <span>Export EUDR GeoJSON</span>
            </button>
          </div>
        </header>

        {/* 4-Card Bento Grid KPI Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricBentoCard
            title="Total Janjang Dipanen"
            value={14850}
            subtitle="Target Harian: 16.000 Janjang"
            badgeText="92.8% Target"
            icon={Sprout}
          />
          <MetricBentoCard
            title="Estimasi Tonase TBS"
            value={277.5}
            decimals={1}
            suffix="Ton"
            subtitle="Rata-rata BJR: 18.5 Kg/Janjang"
            badgeText="+14.2% vs Kemarin"
            icon={Weight}
          />
          <MetricBentoCard
            title="Estimasi Rendemen CPO"
            value={22.8}
            decimals={1}
            suffix="%"
            subtitle="Kualitas Buah Masak 95%"
            badgeText="Sangat Baik"
            icon={TrendingUp}
          />
          <MetricBentoCard
            title="Potensi Restan & FFA"
            value={1.42}
            decimals={2}
            suffix="% FFA"
            subtitle="2 TPH Tertahan > 12 Jam"
            badgeText="Perlu Angkut Segera"
            icon={Flame}
            isAlert={true}
          />
        </section>

        {/* Interactive GIS Map & Restan Breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveEstateMap />
          </div>

          {/* Sync & Conflict Resolution Feed */}
          <div className="rounded-3xl bg-[#0B1C15]/90 border border-[#10B981]/30 p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Live Ingestion & Sync Feed
                </h3>
                <RefreshCw className="w-4 h-4 text-[#10B981] animate-spin" />
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-[#06110D] border border-white/5 text-xs space-y-1">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-[#34D399] font-bold">ACCEPTED_OVERWRITE (200)</span>
                    <span className="text-slate-500">12:05:32</span>
                  </div>
                  <p className="text-white font-medium">Asisten (Score: 3.72T) mengkoreksi data Krani di TPH-01</p>
                </div>

                <div className="p-3 rounded-2xl bg-[#06110D] border border-white/5 text-xs space-y-1">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-emerald-400 font-bold">ACCEPTED_NEW (201)</span>
                    <span className="text-slate-500">12:02:18</span>
                  </div>
                  <p className="text-white font-medium">Batch 14 record panen Blok B012 masuk dari HP Mandor</p>
                </div>

                <div className="p-3 rounded-2xl bg-[#06110D] border border-white/5 text-xs space-y-1">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-rose-400 font-bold">REJECTED_STALE (409)</span>
                    <span className="text-slate-500">11:58:45</span>
                  </div>
                  <p className="text-slate-300">Data tertinggal Krani ditolak karena server memiliki versi Asisten</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <span className="text-[11px] text-slate-400">
                Idempotency Guard & Hardware AES-256 Protection Active
              </span>
            </div>
          </div>
        </section>
      </main>
    </SmoothScrollProvider>
  );
}
