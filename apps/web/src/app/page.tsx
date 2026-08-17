'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  MoreVertical,
  Sprout,
  Zap,
  Clock,
  Flame,
  Loader2,
  RefreshCw,
  Share2,
  CheckCircle2,
  Layers,
  MapPin,
  Truck,
  Users,
  Download
} from 'lucide-react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNavbar } from '@/components/dashboard/TopNavbar';
import { KpiSparklineCard } from '@/components/dashboard/KpiSparklineCard';
import { VolumeTrendChart } from '@/components/dashboard/VolumeTrendChart';
import { ActivityFeedStream } from '@/components/dashboard/ActivityFeedStream';
import { MonitoringTable } from '@/components/dashboard/MonitoringTable';
import { RestanWarningPanel } from '@/components/dashboard/RestanWarningPanel';
import { EstateMapLight } from '@/components/dashboard/EstateMapLight';
import { EudrComplianceModal } from '@/components/dashboard/EudrComplianceModal';
import { NotificationDrawerModal } from '@/components/dashboard/NotificationDrawerModal';
import { CommandPaletteModal } from '@/components/dashboard/CommandPaletteModal';
import { QuickHelpModal } from '@/components/dashboard/QuickHelpModal';
import { SettingsModal } from '@/components/dashboard/SettingsModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAuth } from '@/lib/auth/auth-context';
import { apiEndpoints } from '@/lib/api/endpoints';
import { formatNumber, formatDecimal } from '@/lib/format';

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-2xl bg-[#101828] flex items-center justify-center shadow-lg"
        >
          <Sprout className="w-6 h-6 text-[#10B981]" />
        </motion.div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#667085]">
          <Loader2 className="w-4 h-4 animate-spin text-[#2E7D32]" />
          Memverifikasi sesi…
        </div>
      </motion.div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading, user } = useAuth();

  const [currentView, setCurrentView] = useState('overview');
  const [dateRangeDays, setDateRangeDays] = useState<7 | 14 | 30>(7);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Modals state
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isEudrModalOpen, setIsEudrModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const kpiQuery = useQuery({
    queryKey: ['kpi-metrics'],
    queryFn: apiEndpoints.getKpiMetrics,
    enabled: isAuthenticated,
  });

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleRefreshAll = () => {
    queryClient.invalidateQueries();
    showNotification('✅ Seluruh data dashboard berhasil diperbarui.');
    setIsMoreActionsOpen(false);
  };

  const handleExportSummary = () => {
    const text = `SawitGO Executive Summary:
Total Janjang: ${kpiQuery.data?.totalJanjang ?? 0} Jjg
Estimasi Tonase: ${kpiQuery.data?.estimatedTonaseTon ?? 0} Ton
SLA Compliance: ${kpiQuery.data?.slaCompliancePercent ?? 0}%
Restan Overdue: ${kpiQuery.data?.restanOverdueCount ?? 0} TPH`;
    navigator.clipboard?.writeText(text);
    showNotification('📋 Ringkasan operasional berhasil disalin ke clipboard.');
    setIsMoreActionsOpen(false);
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }
  if (!isAuthenticated) {
    return null;
  }

  const kpi = kpiQuery.data;
  const kpiPending = kpiQuery.isPending;
  const kpiError = kpiQuery.isError;
  const firstName = user?.fullName?.split(' ')[0] ?? 'Pengguna';

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-[#F8F9FB] dark:bg-[#0B0F17] overflow-hidden font-sans transition-colors duration-200">
        {/* 1. LEFT SIDEBAR */}
        <Sidebar
          currentView={currentView}
          onViewChange={(view) => {
            if (view === 'help') {
              setIsHelpModalOpen(true);
            } else if (view === 'settings') {
              setIsSettingsModalOpen(true);
            } else if (view === 'eudr') {
              setIsEudrModalOpen(true);
              setCurrentView('eudr');
            } else {
              setCurrentView(view);
            }
          }}
          onSearchClick={() => setIsCommandPaletteOpen(true)}
        />

        {/* 2. MAIN APP CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Top Navbar */}
          <TopNavbar
            currentView={currentView}
            onNotificationClick={() => setIsNotificationDrawerOpen(true)}
            onHelpClick={() => setIsHelpModalOpen(true)}
            onSettingsClick={() => setIsSettingsModalOpen(true)}
            onSearchClick={() => setIsCommandPaletteOpen(true)}
          />

          {/* Toast Notification Alert with Motion */}
          <AnimatePresence>
            {actionNotice && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-18 right-8 z-50 bg-[#101828] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-white/10 text-xs font-semibold flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>{actionNotice}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scrollable Dashboard Body */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 bg-[#F8F9FB] dark:bg-[#0B0F17] transition-colors duration-200">
            {/* Greeting Hero Header with Motion */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-[#101828] dark:text-[#F8FAFC] tracking-tight font-sans">
                  Hello, {firstName} 👋
                </h1>
                <p className="text-xs lg:text-sm text-[#667085] dark:text-[#94A3B8] mt-1">
                  Berikut insight operasional perkebunan —{' '}
                  {kpiError
                    ? 'data tidak dapat dimuat dari backend.'
                    : kpi
                    ? `${formatNumber(kpi.totalTransactions)} transaksi sinkronisasi ${dateRangeDays} hari terakhir.`
                    : 'Memuat data real-time dari backend…'}
                </p>
              </div>

              {/* Date Picker & Action Dropdown */}
              <div className="flex items-center gap-2.5 relative">
                {/* Date Range Selector Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsDatePickerOpen(!isDatePickerOpen);
                      setIsMoreActionsOpen(false);
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#EAECF0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#334155] cursor-pointer shadow-xs transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#667085] dark:text-[#94A3B8]" />
                    <span>{dateRangeDays} hari terakhir</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#98A2B3] dark:text-[#64748B]" />
                  </motion.button>

                  <AnimatePresence>
                    {isDatePickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-[#1E293B] rounded-xl shadow-xl border border-[#EAECF0] dark:border-[#334155] py-1 z-30 font-sans"
                      >
                        {[
                          { label: '7 hari terakhir', val: 7 as const },
                          { label: '14 hari terakhir', val: 14 as const },
                          { label: '30 hari terakhir', val: 30 as const },
                        ].map((item) => (
                          <button
                            key={item.val}
                            onClick={() => {
                              setDateRangeDays(item.val);
                              setIsDatePickerOpen(false);
                              showNotification(`Filter diubah ke ${item.label}`);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer ${
                              dateRangeDays === item.val
                                ? 'text-[#2E7D32] dark:text-[#34D399] font-bold bg-[#E8F5E9]/50 dark:bg-[#064E3B]/40'
                                : 'text-[#344054] dark:text-[#E2E8F0]'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* More Actions Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsMoreActionsOpen(!isMoreActionsOpen);
                      setIsDatePickerOpen(false);
                    }}
                    aria-label="More actions"
                    className="w-9 h-9 rounded-xl border border-[#EAECF0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] hover:bg-[#F9FAFB] dark:hover:bg-[#334155] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </motion.button>

                  <AnimatePresence>
                    {isMoreActionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        className="absolute right-0 mt-1.5 w-52 bg-white dark:bg-[#1E293B] rounded-xl shadow-xl border border-[#EAECF0] dark:border-[#334155] py-1.5 z-30 font-sans"
                      >
                        <button
                          onClick={handleRefreshAll}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
                          <span>Muat Ulang Data (Sync)</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsEudrModalOpen(true);
                            setIsMoreActionsOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#2E7D32] dark:text-[#34D399]" />
                          <span>Buka Peta Spasial EUDR</span>
                        </button>
                        <button
                          onClick={handleExportSummary}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
                          <span>Salin Ringkasan KPI</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsHelpModalOpen(true);
                            setIsMoreActionsOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer border-t border-[#EAECF0] dark:border-[#334155] mt-1 pt-1.5"
                        >
                          <Sprout className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
                          <span>Buka Panduan SOP</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Row 1: 4 KPI Cards with Motion */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView('tph-queue')}
                className="cursor-pointer"
              >
                <KpiSparklineCard
                  title={`Total Janjang TBS (${dateRangeDays} hari)`}
                  value={kpiPending ? '—' : formatNumber(kpi?.totalJanjang ?? 0)}
                  unit="Jjg"
                  trend={
                    kpiPending
                      ? '…'
                      : `${(kpi?.janjangTrendPercent ?? 0) >= 0 ? '+' : ''}${formatDecimal(kpi?.janjangTrendPercent ?? 0)}% vs last week`
                  }
                  isPositive={(kpi?.janjangTrendPercent ?? 0) >= 0}
                  tagIcon={Sprout}
                  sparklineVariant="green"
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView('bjr-cpo')}
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
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView('conflict')}
                className="cursor-pointer"
              >
                <KpiSparklineCard
                  title="SLA Compliance Rate"
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
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView('restan-risk')}
                className="cursor-pointer"
              >
                <KpiSparklineCard
                  title="Restan Overdue (>24 Jam)"
                  value={kpiPending ? '—' : formatNumber(kpi?.restanOverdueCount ?? 0)}
                  unit="TPH"
                  trend={
                    kpiPending
                      ? '…'
                      : `FFA rata-rata ${formatDecimal(kpi?.averageFfaPercentage ?? 0, 2)}%`
                  }
                  isPositive={(kpi?.restanOverdueCount ?? 0) === 0}
                  tagIcon={Flame}
                  sparklineVariant={(kpi?.restanOverdueCount ?? 0) === 0 ? 'green' : 'red'}
                />
              </motion.div>
            </motion.div>

            {/* DYNAMIC ANIMATED VIEW ROUTING */}
            <AnimatePresence mode="wait">
              {currentView === 'overview' && (
                <motion.div
                  key="view-overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* 2:1 Grid (Volume Trend + Activity Feed) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <VolumeTrendChart />
                    </div>
                    <div className="lg:col-span-1">
                      <ActivityFeedStream />
                    </div>
                  </div>

                  {/* Live GIS Estate Map */}
                  <EstateMapLight />

                  {/* Restan Tracker + Conflict Monitoring */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <MonitoringTable />
                    </div>
                    <div className="lg:col-span-1">
                      <RestanWarningPanel />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentView === 'tph-queue' && (
                <motion.div
                  key="view-tph-queue"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center font-bold">
                        <Sprout className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Antrean Panen Seluruh TPH</h2>
                        <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Status real-time pengangkutan janjang dan stage panen lapangan</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentView('overview')}
                      className="px-3.5 py-1.5 rounded-xl border border-[#EAECF0] dark:border-[#334155] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] cursor-pointer"
                    >
                      ← Kembali ke Dashboard
                    </motion.button>
                  </div>
                  <MonitoringTable />
                  <EstateMapLight />
                </motion.div>
              )}

              {(currentView === 'restan-risk' || currentView === 'sla-ffa') && (
                <motion.div
                  key="view-restan-risk"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FEF3F2] dark:bg-[#7F1D1D]/30 text-[#D92D20] dark:text-[#F87171] flex items-center justify-center font-bold">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Monitoring Restan &amp; Asam Lemak Bebas (FFA)</h2>
                        <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Dispatch truk langsung untuk TPH dengan penumpukan &gt;24 jam</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentView('overview')}
                      className="px-3.5 py-1.5 rounded-xl border border-[#EAECF0] dark:border-[#334155] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] cursor-pointer"
                    >
                      ← Kembali ke Dashboard
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RestanWarningPanel />
                    <EstateMapLight />
                  </div>
                </motion.div>
              )}

              {(currentView === 'conflict' || currentView === 'audit-trail') && (
                <motion.div
                  key="view-conflict"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EFF8FF] dark:bg-[#1E3A8A]/30 text-[#175CD3] dark:text-[#60A5FA] flex items-center justify-center font-bold">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Audit Trail &amp; Konsensus Priority Score</h2>
                        <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Riwayat mutasi data sinkronisasi offline (INSERT, OVERWRITE, REJECT_STALE)</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentView('overview')}
                      className="px-3.5 py-1.5 rounded-xl border border-[#EAECF0] dark:border-[#334155] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] cursor-pointer"
                    >
                      ← Kembali ke Dashboard
                    </motion.button>
                  </div>
                  <MonitoringTable />
                </motion.div>
              )}

              {currentView === 'eudr' && (
                <motion.div
                  key="view-eudr"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center font-bold">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Peta Spasial EUDR &amp; Verifikasi Poligon</h2>
                        <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Koordinat WGS84 poligon blok perkebunan sawit terverifikasi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsEudrModalOpen(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#2E7D32] text-white text-xs font-semibold hover:bg-[#1B5E20] cursor-pointer flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Ekspor GeoJSON</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentView('overview')}
                        className="px-3.5 py-1.5 rounded-xl border border-[#EAECF0] dark:border-[#334155] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] cursor-pointer"
                      >
                        ← Dashboard
                      </motion.button>
                    </div>
                  </div>
                  <EstateMapLight />
                </motion.div>
              )}

              {currentView === 'p2p' && (
                <motion.div
                  key="view-p2p"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FEF6EE] dark:bg-[#7C2D12]/30 text-[#B93815] dark:text-[#FB923C] flex items-center justify-center font-bold">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Telemetri P2P Data Mule &amp; Armada Truk</h2>
                        <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Relay data panen offline via Wi-Fi Direct truk di blank spot</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentView('overview')}
                      className="px-3.5 py-1.5 rounded-xl border border-[#EAECF0] dark:border-[#334155] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] cursor-pointer"
                    >
                      ← Dashboard
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <EstateMapLight />
                    </div>
                    <div className="lg:col-span-1">
                      <ActivityFeedStream />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentView === 'pemanen' && (
                <motion.div
                  key="view-pemanen"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EFF8FF] dark:bg-[#1E3A8A]/30 text-[#175CD3] dark:text-[#60A5FA] flex items-center justify-center font-bold">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Kemandoran &amp; Produktivitas Tim Pemanen</h2>
                        <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Evaluasi pencapaian basis janjang dan grading per regu panen</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentView('overview')}
                      className="px-3.5 py-1.5 rounded-xl border border-[#EAECF0] dark:border-[#334155] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] cursor-pointer"
                    >
                      ← Dashboard
                    </motion.button>
                  </div>
                  <VolumeTrendChart />
                </motion.div>
              )}

              {currentView === 'bjr-cpo' && (
                <motion.div
                  key="view-bjr-cpo"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-[#151D2C] rounded-2xl border border-[#EAECF0] dark:border-[#1E293B]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] flex items-center justify-center font-bold">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#101828] dark:text-[#F8FAFC]">Analitik Berat Janjang Rata-rata (BJR) &amp; CPO OER</h2>
                        <p className="text-xs text-[#667085] dark:text-[#94A3B8]">Simulasi estimasi berat janjang rata-rata terhadap rendemen pabrik</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentView('overview')}
                      className="px-3.5 py-1.5 rounded-xl border border-[#EAECF0] dark:border-[#334155] text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] cursor-pointer"
                    >
                      ← Dashboard
                    </motion.button>
                  </div>
                  <VolumeTrendChart />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* Notification Drawer Modal */}
        <NotificationDrawerModal
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          onNavigateToView={(view) => {
            setCurrentView(view);
            setIsNotificationDrawerOpen(false);
          }}
        />

        {/* EUDR Compliance Modal */}
        <EudrComplianceModal
          isOpen={isEudrModalOpen}
          onClose={() => setIsEudrModalOpen(false)}
        />

        {/* Command Palette (⌘ K) Modal */}
        <CommandPaletteModal
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectView={(view) => {
            if (view === 'help') {
              setIsHelpModalOpen(true);
            } else if (view === 'settings') {
              setIsSettingsModalOpen(true);
            } else if (view === 'eudr') {
              setIsEudrModalOpen(true);
              setCurrentView('eudr');
            } else {
              setCurrentView(view);
            }
          }}
        />

        {/* Quick Help & SOP Modal */}
        <QuickHelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}