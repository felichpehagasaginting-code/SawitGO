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
  Loader2,
  RefreshCw,
  Share2,
  CheckCircle2,
  MapPin,
  Download
} from 'lucide-react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNavbar } from '@/components/dashboard/TopNavbar';
import { OverviewDashboard } from '@/components/dashboard/pages/OverviewDashboard';
import { HarvestDataPage } from '@/components/dashboard/pages/HarvestDataPage';
import { KemandoranPage } from '@/components/dashboard/pages/KemandoranPage';
import { RestanMonitoringPage } from '@/components/dashboard/pages/RestanMonitoringPage';
import { EudrSpatialPage } from '@/components/dashboard/pages/EudrSpatialPage';
import { ConflictAuditPage } from '@/components/dashboard/pages/ConflictAuditPage';
import { BjrAnalyticsPage } from '@/components/dashboard/pages/BjrAnalyticsPage';
import { EudrComplianceModal } from '@/components/dashboard/EudrComplianceModal';
import { NotificationDrawerModal } from '@/components/dashboard/NotificationDrawerModal';
import { CommandPaletteModal } from '@/components/dashboard/CommandPaletteModal';
import { QuickHelpModal } from '@/components/dashboard/QuickHelpModal';
import { SettingsModal } from '@/components/dashboard/SettingsModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAuth } from '@/lib/auth/auth-context';
import { apiEndpoints } from '@/lib/api/endpoints';
import { formatNumber } from '@/lib/format';

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
          onLockedClick={(minWeight, moduleName) => {
            showNotification(
              `🔒 Akses Terkunci: Modul '${moduleName}' memerlukan hak akses minimal Bobot W${minWeight}. Role aktif Anda: ${user?.role ?? 'Krani'} (W${user?.roleWeight ?? 1}).`
            );
          }}
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

          {/* Toast Notification Alert */}
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

          {/* Scrollable Main Area */}
          <main id="main-scroll-container" className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 bg-[#F8F9FB] dark:bg-[#0B0F17] transition-colors duration-200">
            {/* Header Greeting (Only shown on Overview or with view switcher) */}
            {currentView === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-[#101828] dark:text-[#F8FAFC] tracking-tight font-sans">
                    Halo, {firstName} 👋
                  </h1>
                  <p className="text-xs lg:text-sm text-[#667085] dark:text-[#94A3B8] mt-1">
                    Berikut ringkasan operasional dan kinerja perkebunan sawit hari ini —{' '}
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
                      aria-label="Menu Aksi Tambahan"
                      className="p-2 rounded-xl border border-[#EAECF0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] hover:bg-[#F9FAFB] dark:hover:bg-[#334155] cursor-pointer shadow-xs transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </motion.button>

                    <AnimatePresence>
                      {isMoreActionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          className="absolute right-0 mt-1.5 w-56 bg-white dark:bg-[#1E293B] rounded-xl shadow-xl border border-[#EAECF0] dark:border-[#334155] py-1.5 z-30 font-sans"
                        >
                          <button
                            onClick={handleRefreshAll}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
                            <span>Segarkan Data Real-Time</span>
                          </button>
                          <button
                            onClick={handleExportSummary}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
                            <span>Unduh Ringkasan Panen</span>
                          </button>
                          <button
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                navigator.clipboard?.writeText(window.location.href);
                                showNotification('🔗 Tautan dashboard disalin ke clipboard.');
                                setIsMoreActionsOpen(false);
                              }
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-[#344054] dark:text-[#E2E8F0] hover:bg-[#F8F9FB] dark:hover:bg-[#334155] transition-colors cursor-pointer"
                          >
                            <Share2 className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
                            <span>Salin Tautan Dashboard</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Primary Action Button (EUDR Modal Trigger) */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsEudrModalOpen(true)}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Ekspor GeoJSON EUDR</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* DYNAMIC INDEPENDENT VIEW ROUTING */}
            <AnimatePresence mode="wait">
              {currentView === 'overview' && (
                <motion.div
                  key="view-overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <OverviewDashboard
                    kpi={kpi}
                    kpiPending={kpiPending}
                    dateRangeDays={dateRangeDays}
                    onNavigate={(view) => setCurrentView(view)}
                  />
                </motion.div>
              )}

              {(currentView === 'tph-queue' || currentView === 'data-panen') && (
                <motion.div
                  key="view-harvest-data"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <HarvestDataPage />
                </motion.div>
              )}

              {(currentView === 'pemanen' || currentView === 'kemandoran') && (
                <motion.div
                  key="view-kemandoran"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <KemandoranPage />
                </motion.div>
              )}

              {(currentView === 'restan-risk' || currentView === 'sla-ffa' || currentView === 'restan') && (
                <motion.div
                  key="view-restan"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <RestanMonitoringPage />
                </motion.div>
              )}

              {(currentView === 'eudr' || currentView === 'spasial' || currentView === 'p2p') && (
                <motion.div
                  key="view-eudr"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <EudrSpatialPage />
                </motion.div>
              )}

              {(currentView === 'conflict' || currentView === 'audit-trail') && (
                <motion.div
                  key="view-conflict"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <ConflictAuditPage />
                </motion.div>
              )}

              {(currentView === 'bjr-cpo' || currentView === 'analitik') && (
                <motion.div
                  key="view-analytics"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <BjrAnalyticsPage />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* Global Modals */}
        <NotificationDrawerModal
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          onNavigateToView={(view) => {
            setCurrentView(view);
            setIsNotificationDrawerOpen(false);
          }}
        />

        <EudrComplianceModal
          isOpen={isEudrModalOpen}
          onClose={() => setIsEudrModalOpen(false)}
        />

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

        <QuickHelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />

        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}