'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Settings,
  HelpCircle,
  LayoutGrid,
  Wifi,
  WifiOff,
  Search,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { subscribeBackendStatus } from '@/lib/api/client';
import { useTheme } from '@/providers/ThemeProvider';

interface TopNavbarProps {
  currentView?: string;
  onNotificationClick?: () => void;
  onHelpClick?: () => void;
  onSettingsClick?: () => void;
  onSearchClick?: () => void;
}

const VIEW_TITLES: Record<string, string> = {
  overview: 'Halaman Utama Dashboard',
  'tph-queue': 'Antrean Panen TPH',
  'restan-risk': 'Risiko Restan >24 Jam',
  conflict: 'Resolusi Konflik & Priority Score',
  pemanen: 'Kemandoran & Regu Panen',
  p2p: 'Data Mule P2P & Truk',
  eudr: 'Peta Spasial EUDR',
  integrations: 'Integrasi Pabrik Kelapa Sawit (PKS)',
  'sla-ffa': 'Monitoring SLA Restan & Asam Lemak Bebas',
  'bjr-cpo': 'Tren BJR & Rendemen CPO',
  'audit-trail': 'Jejak Audit Konsensus',
  settings: 'Pengaturan Sistem & Kebun',
  help: 'Buku Panduan & SOP',
};

export function TopNavbar({
  currentView = 'overview',
  onNotificationClick,
  onHelpClick,
  onSettingsClick,
  onSearchClick,
}: TopNavbarProps) {
  const { user } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [backendOnline, setBackendOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeBackendStatus((isOnline) => setBackendOnline(isOnline));
    return unsubscribe;
  }, []);

  const pageTitle = VIEW_TITLES[currentView] ?? 'Halaman Utama Dashboard';

  return (
    <header className="h-16 bg-white dark:bg-[#111827] border-b border-[#EAECF0] dark:border-[#1F2937] flex items-center justify-between px-6 shrink-0 z-20 font-sans transition-colors">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#667085] dark:text-[#94A3B8]">
        <div className="flex items-center gap-1.5 font-medium text-[#344054] dark:text-[#E2E8F0]">
          <LayoutGrid className="w-3.5 h-3.5 text-[#667085] dark:text-[#94A3B8]" />
          <span>Beranda</span>
        </div>
        <ChevronRight className="w-3 h-3 text-[#D0D5DD] dark:text-[#475467]" />
        <span className="font-semibold text-[#101828] dark:text-[#F8FAFC] capitalize">{pageTitle}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Shortcut Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSearchClick}
          aria-label="Cari data"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#EAECF0] dark:border-[#1F2937] bg-[#F8F9FB] dark:bg-[#1E293B] hover:bg-[#F2F4F7] dark:hover:bg-[#334155] text-xs text-[#667085] dark:text-[#94A3B8] hover:text-[#101828] dark:hover:text-[#F8FAFC] transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Cari cepat...</span>
          <span className="text-[10px] font-mono text-[#98A2B3] dark:text-[#64748B] bg-white dark:bg-[#0F172A] border border-[#EAECF0] dark:border-[#334155] px-1 rounded shadow-xs">
            ⌘K
          </span>
        </motion.button>

        {/* Theme Toggle (Sun/Moon) */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          aria-label="Ganti Tema Terang/Gelap"
          className="w-8 h-8 rounded-lg hover:bg-[#F2F4F7] dark:hover:bg-[#1E293B] text-[#667085] dark:text-[#FDE047] hover:text-[#101828] flex items-center justify-center transition-colors cursor-pointer"
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

        {/* Backend Online/Offline Badge */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
            backendOnline
              ? 'bg-[#E8F5E9] dark:bg-[#064E3B]/40 text-[#2E7D32] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#059669]/40'
              : 'bg-[#FEF3F2] dark:bg-[#7F1D1D]/40 text-[#B42318] dark:text-[#F87171] border border-[#FECDCA] dark:border-[#DC2626]/40'
          }`}
          title={backendOnline ? 'Backend NestJS terhubung di :3000' : 'Backend terputus (data offline)'}
        >
          {backendOnline ? (
            <>
              <Wifi className="w-3 h-3" />
              <span className="hidden sm:inline">Backend Terhubung</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3" />
              <span className="hidden sm:inline">Mode Offline</span>
            </>
          )}
        </motion.div>

        {/* Role Pill Indicator */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSettingsClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F2F4F7] dark:bg-[#1E293B] text-[#344054] dark:text-[#E2E8F0] text-[11px] font-bold border border-[#EAECF0] dark:border-[#334155] hover:bg-[#EAECF0] dark:hover:bg-[#334155] transition-colors cursor-pointer"
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