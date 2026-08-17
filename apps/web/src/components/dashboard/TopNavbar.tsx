'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Settings,
  HelpCircle,
  LayoutGrid,
  Search,
  ChevronRight,
  Sun,
  Moon,
  Server,
  ServerCrash,
  RotateCw,
  Loader2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { subscribeBackendStatus, checkBackendHealth } from '@/lib/api/client';
import { useTheme } from '@/providers/ThemeProvider';
import { useQueryClient } from '@tanstack/react-query';

interface TopNavbarProps {
  currentView?: string;
  onNotificationClick?: () => void;
  onHelpClick?: () => void;
  onSettingsClick?: () => void;
  onSearchClick?: () => void;
}

const VIEW_TITLES: Record<string, string> = {
  overview: 'Halaman Utama Dashboard',
  'data-panen': 'Data Transaksi Panen',
  'tph-queue': 'Antrean Panen TPH',
  'restan-risk': 'Risiko Restan >24 Jam',
  restan: 'Monitoring Restan & FFA',
  conflict: 'Resolusi Konflik & Priority Score',
  kemandoran: 'Kemandoran & Regu Panen',
  pemanen: 'Kemandoran & Regu Panen',
  p2p: 'Data Mule P2P & Truk',
  eudr: 'Peta Spasial EUDR',
  analitik: 'Tren BJR & Rendemen CPO',
  integrations: 'Integrasi Pabrik Kelapa Sawit (PKS)',
  'sla-ffa': 'Monitoring SLA Restan & Asam Lemak Bebas',
  'bjr-cpo': 'Tren BJR & Rendemen CPO',
  'audit-trail': 'Jejak Audit Konsensus',
  settings: 'Pengaturan Sistem & Kebun',
  help: 'Buku Panduan & SOP',
};

type ConnectionStatus = 'online' | 'offline' | 'checking';

export function TopNavbar({
  currentView = 'overview',
  onNotificationClick,
  onHelpClick,
  onSettingsClick,
  onSearchClick,
}: TopNavbarProps) {
  const { user } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');

  // Initial check and subscription
  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then((online) => {
      if (isMounted) {
        setConnectionStatus(online ? 'online' : 'offline');
      }
    });

    const unsubscribe = subscribeBackendStatus((isOnline) => {
      if (isMounted) {
        setConnectionStatus(isOnline ? 'online' : 'offline');
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleRefreshData = useCallback(async () => {
    setConnectionStatus('checking');
    try {
      const [isOnline] = await Promise.all([
        checkBackendHealth(),
        queryClient.invalidateQueries(),
      ]);
      setConnectionStatus(isOnline ? 'online' : 'offline');
    } catch {
      setConnectionStatus('offline');
    }
  }, [queryClient]);

  const pageTitle = VIEW_TITLES[currentView] ?? 'Halaman Utama Dashboard';

  return (
    <header className="h-16 bg-white dark:bg-[#050811] border-b border-[#EAECF0] dark:border-[#1E293B] flex items-center justify-between px-6 shrink-0 z-20 font-sans transition-colors">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#667085] dark:text-[#94A3B8]">
        <div className="flex items-center gap-1.5 font-medium text-[#344054] dark:text-[#E2E8F0]">
          <LayoutGrid className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
          <span>Beranda</span>
        </div>
        <ChevronRight className="w-3 h-3 text-[#D0D5DD] dark:text-[#475467]" />
        <span className="font-semibold text-[#0F172A] dark:text-white capitalize">{pageTitle}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Shortcut Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSearchClick}
          aria-label="Cari data"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#EAECF0] dark:border-[#1E293B] bg-[#F8F9FB] dark:bg-[#0A0F1D] hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-xs text-[#667085] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Cari cepat...</span>
          <span className="text-[10px] font-mono text-[#98A2B3] dark:text-[#64748B] bg-white dark:bg-[#050811] border border-[#EAECF0] dark:border-[#1E293B] px-1 rounded shadow-xs">
            ⌘K
          </span>
        </motion.button>

        {/* Theme Toggle (Sun/Moon) */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          aria-label="Ganti Tema Terang/Gelap"
          className="w-8 h-8 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#667085] dark:text-[#FDE047] hover:text-[#0F172A] flex items-center justify-center transition-colors cursor-pointer"
          title={resolvedTheme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="w-4 h-4 text-[#FDE047]" />
          ) : (
            <Moon className="w-4 h-4 text-[#667085]" />
          )}
        </motion.button>

        {/* Help Question Mark */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onHelpClick}
          aria-label="Bantuan dan Panduan"
          className="w-8 h-8 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] flex items-center justify-center transition-colors cursor-pointer"
          title="Buku Panduan &amp; SOP"
        >
          <HelpCircle className="w-4 h-4" />
        </motion.button>

        {/* Quick Settings Icon */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          onClick={onSettingsClick}
          aria-label="Pengaturan"
          className="w-8 h-8 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] flex items-center justify-center transition-colors cursor-pointer"
          title="Pengaturan Kebun &amp; Tema"
        >
          <Settings className="w-4 h-4" />
        </motion.button>

        {/* Notification Bell with Pulse Badge */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNotificationClick}
          aria-label="Pemberitahuan"
          className="w-8 h-8 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] flex items-center justify-center transition-colors relative cursor-pointer"
          title="Pemberitahuan &amp; Peringatan Restan"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D92D20] ring-2 ring-white dark:ring-[#111827]"></span>
        </motion.button>

        <div className="h-4 w-px bg-[#EAECF0] dark:bg-[#1F2937] mx-1"></div>

        {/* ======================================================== */}
        {/* BACKEND CONNECTION STATUS PILL & QUICK REFRESH BUTTON */}
        {/* ======================================================== */}
        <div className="flex items-center gap-1.5">
          {/* Status Badge */}
          <AnimatePresence mode="wait">
            {connectionStatus === 'online' && (
              <motion.div
                key="online"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#ECFDF5] dark:bg-[#064E3B]/40 text-[#027A48] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#059669]/40 shadow-2xs"
                title="Backend NestJS terhubung di port :3000 (Database PostGIS Aktif)"
              >
                <div className="relative flex items-center justify-center">
                  <Server className="w-3.5 h-3.5" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#10B981] ring-1 ring-white dark:ring-[#064E3B] animate-pulse" />
                </div>
                <span className="hidden sm:inline">Backend Terhubung</span>
              </motion.div>
            )}

            {connectionStatus === 'offline' && (
              <motion.div
                key="offline"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FEF2F2] dark:bg-[#7F1D1D]/40 text-[#B42318] dark:text-[#F87171] border border-[#FECDCA] dark:border-[#DC2626]/40 shadow-2xs"
                title="Backend terputus. Pastikan service NestJS di port :3000 sedang berjalan."
              >
                <div className="relative flex items-center justify-center">
                  <ServerCrash className="w-3.5 h-3.5 text-[#D92D20]" />
                </div>
                <span className="hidden sm:inline">Backend Terputus</span>
              </motion.div>
            )}

            {connectionStatus === 'checking' && (
              <motion.div
                key="checking"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFFBEB] dark:bg-[#78350F]/40 text-[#B45309] dark:text-[#FCD34D] border border-[#FDE68A] dark:border-[#D97706]/40 shadow-2xs"
                title="Sedang menghubungkan & memverifikasi backend server..."
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D97706] dark:text-[#FBBF24]" />
                <span className="hidden sm:inline">Menghubungkan…</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Refresh / Fetch Data Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefreshData}
            disabled={connectionStatus === 'checking'}
            aria-label="Tarik dan Segarkan Data Backend"
            className="w-7 h-7 rounded-full bg-[#F8F9FB] dark:bg-[#1E293B] border border-[#EAECF0] dark:border-[#334155] hover:bg-[#F2F4F7] dark:hover:bg-[#334155] text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] flex items-center justify-center shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
            title="Tarik dan Segarkan Data Backend"
          >
            <RotateCw
              className={`w-3.5 h-3.5 transition-transform ${connectionStatus === 'checking' ? 'animate-spin text-[#F59E0B]' : ''
                }`}
            />
          </motion.button>
        </div>

        {/* Role Pill Indicator */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSettingsClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F172A] text-white dark:bg-white dark:text-[#030712] text-[11px] font-bold border border-[#0F172A] dark:border-white shadow-2xs transition-colors cursor-pointer"
          title="Klik untuk melihat detail hak akses"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
          <span>
            {user ? `${user.role} (W${user.roleWeight})` : 'MANAGER (W5)'}
          </span>
        </motion.button>
      </div>
    </header>
  );
}