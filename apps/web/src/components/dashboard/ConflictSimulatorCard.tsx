'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Zap,
  ArrowRight,
  UserCheck,
  Lock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

interface StepLog {
  id: number;
  actor: string;
  role: string;
  weight: number;
  time: string;
  janjang: number;
  priorityScore: string;
  action: 'INSERT' | 'UPDATE_OVERWRITE' | 'REJECT_STALE' | 'FINAL';
  note: string;
}

const DEMO_ROLES = [
  { nip: 'KRN-102', name: 'Dika Prasetyawan', role: 'Krani TPH', weight: 1, color: 'text-[#16A34A] bg-[#DCFCE7] dark:bg-[#064E3B]/40' },
  { nip: 'MDR-045', name: 'Rifki Hakim', role: 'Mandor Panen', weight: 2, color: 'text-[#2563EB] bg-[#DBEAFE] dark:bg-[#1E3A8A]/40' },
  { nip: 'AST-010', name: 'Ahmad Sukron', role: 'Asisten Afdeling', weight: 3, color: 'text-[#0891B2] bg-[#CFFAFE] dark:bg-[#164E63]/40' },
  { nip: 'ASK-005', name: 'Ahmad Zulkifli', role: 'Kepala Afdeling', weight: 4, color: 'text-[#D97706] bg-[#FEF3C7] dark:bg-[#78350F]/40' },
  { nip: 'MGR-001', name: 'Felich Pehagasa Ginting', role: 'Estate Manager', weight: 5, color: 'text-[#9333EA] bg-[#F3E8FF] dark:bg-[#581C87]/40' },
];

export function ConflictSimulatorCard() {
  const { user, login } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [switchingRole, setSwitchingRole] = useState<string | null>(null);

  const steps: StepLog[] = [
    {
      id: 1,
      actor: 'Dika Prasetyawan (KRN-102)',
      role: 'Krani TPH (W1)',
      weight: 1,
      time: '10:00:00',
      janjang: 80,
      priorityScore: '2.723.800.000.000',
      action: 'INSERT',
      note: 'Pencatatan fisik awal di TPH-01. Data masuk antrian lokal Isar DB saat blankspot.',
    },
    {
      id: 2,
      actor: 'Rifki Hakim (MDR-045)',
      role: 'Mandor Panen (W2)',
      weight: 2,
      time: '10:02:15',
      janjang: 95,
      priorityScore: '3.723.800.135.000',
      action: 'UPDATE_OVERWRITE',
      note: 'Mandor supervisi menemukan 15 janjang tambahan. Bobot W2 (3.72T) otomatis meng-overwrite W1 (2.72T).',
    },
    {
      id: 3,
      actor: 'Ahmad Sukron (AST-010)',
      role: 'Asisten Afdeling (W3)',
      weight: 3,
      time: '10:05:30',
      janjang: 110,
      priorityScore: '4.723.800.330.000',
      action: 'UPDATE_OVERWRITE',
      note: 'Asisten verifikasi panen menemukan tumpukan tersembunyi. Bobot W3 (4.72T) menang mutlak atas Mandor/Krani.',
    },
    {
      id: 4,
      actor: 'Dika Prasetyawan (KRN-102)',
      role: 'Krani TPH (W1 - Stale Sync)',
      weight: 1,
      time: '10:10:00',
      janjang: 80,
      priorityScore: '2.723.800.000.000',
      action: 'REJECT_STALE',
      note: 'HP Krani baru dapat sinyal dan coba sync payload lama (Score 2.72T). Server NestJS menolak (REJECT_STALE) karena database telah dikunci data W3 (Score 4.72T).',
    },
    {
      id: 5,
      actor: 'Konsensus Server NestJS + PostGIS',
      role: 'Database Single Source of Truth (SSOT)',
      weight: 5,
      time: 'Selesai',
      janjang: 110,
      priorityScore: '4.723.800.330.000 (Locked)',
      action: 'FINAL',
      note: 'Hasil akhir di PostgreSQL tetap 110 Janjang. Zero data corruption & integritas terjamin 100%!',
    },
  ];

  const handleStartSimulation = () => {
    setIsRunning(true);
    setCurrentStep(1);

    const timer1 = setTimeout(() => setCurrentStep(2), 1200);
    const timer2 = setTimeout(() => setCurrentStep(3), 2400);
    const timer3 = setTimeout(() => setCurrentStep(4), 3600);
    const timer4 = setTimeout(() => {
      setCurrentStep(5);
      setIsRunning(false);
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  const handleSwitchRole = async (nip: string) => {
    try {
      setSwitchingRole(nip);
      await login(nip, 'RahasiaKebun2026!');
    } catch {
      // ignore
    } finally {
      setSwitchingRole(null);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0A0F1D] border border-[#EAECF0] dark:border-[#1E293B] rounded-2xl p-6 shadow-xs space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAECF0] dark:border-[#1E293B] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">
                Mesin Resolusi Konflik (Weighted RBAC Consensus Engine)
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] dark:bg-[#064E3B]/60 text-[#2E7D32] dark:text-[#34D399] font-mono text-[10px] font-bold border border-[#A7F3D0] dark:border-[#059669]/40">
                Formula: Wr × 10¹² + Tms
              </span>
            </div>
            <p className="text-xs text-[#667085] dark:text-[#94A3B8] mt-0.5">
              Simulasi deterministik tabrakan data saat multi-aktor (Krani W1, Mandor W2, Asisten W3) mengedit TPH yang sama saat offline.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {currentStep > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              disabled={isRunning}
              className="px-3 py-1.5 rounded-xl border border-[#EAECF0] dark:border-[#334155] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartSimulation}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <Zap className="w-4 h-4 animate-spin" />
                <span>Mengevaluasi Konsensus…</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>{currentStep === 0 ? 'Jalankan Simulasi Tabrakan Data' : 'Uji Ulang Tabrakan Data'}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Quick Role Switcher */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#344054] dark:text-[#E2E8F0] flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#2E7D32] dark:text-[#34D399]" />
            <span>Ganti Cepat Peran Pengguna (Uji Hak Akses Web):</span>
          </span>
          <span className="text-[11px] text-[#667085] dark:text-[#94A3B8]">
            Aktif: <strong className="text-[#101828] dark:text-[#F8FAFC]">{user?.fullName} ({user?.role} - W{user?.roleWeight})</strong>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DEMO_ROLES.map((r) => {
            const isActive = user?.nip === r.nip;
            return (
              <motion.button
                key={r.nip}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSwitchRole(r.nip)}
                disabled={switchingRole !== null}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-[#2E7D32] dark:border-[#34D399] bg-[#E8F5E9]/50 dark:bg-[#064E3B]/30 ring-2 ring-[#2E7D32]/20'
                    : 'border-[#EAECF0] dark:border-[#334155] bg-[#F8F9FB] dark:bg-[#1E293B] hover:border-[#D0D5DD]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#101828] dark:text-[#F8FAFC] truncate">
                    {r.role}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-black/10 dark:bg-white/10 text-[#344054] dark:text-[#E2E8F0]">
                    W{r.weight}
                  </span>
                </div>
                <div className="text-[10px] text-[#667085] dark:text-[#94A3B8] truncate mt-1">
                  {r.name}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Simulation Timeline / Steps */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#344054] dark:text-[#E2E8F0]">
          Alur Kronologis Konsensus TPH-01:
        </h3>

        <div className="space-y-2">
          {steps.map((s, idx) => {
            const isRevealed = currentStep >= s.id;
            const isCurrent = currentStep === s.id;

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: isRevealed ? 1 : 0.45, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-[#E8F5E9] dark:bg-[#064E3B]/40 border-[#2E7D32] dark:border-[#34D399] shadow-sm'
                    : isRevealed
                    ? 'bg-[#F8F9FB] dark:bg-[#1E293B] border-[#EAECF0] dark:border-[#334155]'
                    : 'bg-[#F9FAFB]/50 dark:bg-[#1E293B]/30 border-dashed border-[#EAECF0] dark:border-[#334155]/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Left info */}
                  <div className="flex items-start sm:items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-[#0F172A] border border-[#EAECF0] dark:border-[#334155] flex items-center justify-center text-xs font-bold text-[#344054] dark:text-[#E2E8F0] shrink-0">
                      {s.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC]">
                          {s.role}
                        </span>
                        <span className="text-[11px] text-[#667085] dark:text-[#94A3B8] font-mono">
                          @{s.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#475467] dark:text-[#94A3B8] mt-0.5">
                        {s.note}
                      </p>
                    </div>
                  </div>

                  {/* Right score and action badge */}
                  <div className="flex items-center gap-2 sm:self-center self-end shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#101828] dark:text-[#F8FAFC] font-tabular">
                        {s.janjang} Janjang
                      </div>
                      <div className="text-[10px] font-mono text-[#667085] dark:text-[#94A3B8]">
                        Score: {s.priorityScore}
                      </div>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold font-mono tracking-wide ${
                        s.action === 'INSERT'
                          ? 'bg-[#E0F2FE] dark:bg-[#0369A1]/40 text-[#0369A1] dark:text-[#38BDF8] border border-[#BAE6FD]'
                          : s.action === 'UPDATE_OVERWRITE'
                          ? 'bg-[#E8F5E9] dark:bg-[#064E3B]/50 text-[#16A34A] dark:text-[#34D399] border border-[#BBF7D0]'
                          : s.action === 'REJECT_STALE'
                          ? 'bg-[#FEF2F2] dark:bg-[#7F1D1D]/50 text-[#DC2626] dark:text-[#F87171] border border-[#FECACA]'
                          : 'bg-[#F3E8FF] dark:bg-[#581C87]/50 text-[#9333EA] dark:text-[#C084FC] border border-[#E9D5FF]'
                      }`}
                    >
                      {s.action}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
